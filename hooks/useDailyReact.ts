'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useDaily, useLocalParticipant, useParticipantCounts, useDevices } from '@daily-co/daily-react'

interface UseDailyReactReturn {
  isConnected: boolean
  isMuted: boolean
  participantCount: number
  createRoom: () => Promise<string | null>
  joinRoom: (roomUrl: string) => Promise<void>
  leaveRoom: () => void
  toggleMute: () => void
  toggleSpeakerphone: () => void
  isSpeakerphone: boolean
  error: string | null
  onParticipantLeft?: (participantCount: number) => void
  setOnParticipantLeft: (callback: (participantCount: number) => void) => void
  audioLevels: { [key: string]: number }
}

export default function useDailyReact(): UseDailyReactReturn {
  const daily = useDaily()
  const localParticipant = useLocalParticipant()
  const { present } = useParticipantCounts()
  const { microphones, setMicrophone, speakers, setSpeaker } = useDevices()
  const audioRefs = useRef<{[key: string]: HTMLAudioElement}>({})
  const [isSpeakerphone, setIsSpeakerphone] = useState(false)
  const [onParticipantLeftCallback, setOnParticipantLeftCallback] = useState<((count: number) => void) | null>(null)
  const [audioLevels, setAudioLevels] = useState<{ [key: string]: number }>({})
  const audioAnalyzers = useRef<{ [key: string]: { analyser: AnalyserNode, context: AudioContext } }>({})
  const animationFrames = useRef<{ [key: string]: number }>({})

  // Try alternative approach: monitor the actual microphone stream
  const monitorLocalAudioLevel = useCallback(async () => {
    if (!daily) return

    try {
      console.log('🎤 Attempting to monitor local audio - trying microphone stream approach')

      // First try the SDK approach
      const participants = daily.participants()
      const localParticipant = Object.values(participants).find((p: any) => p.local)

      if (!localParticipant?.tracks?.audio?.persistentTrack) {
        console.log('No persistent track available, trying alternative approaches...')

        // Alternative 1: Try to get the stream from navigator.mediaDevices directly
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true
            }
          })

          const audioTrack = stream.getAudioTracks()[0]
          if (audioTrack) {
            console.log('✅ Got direct microphone stream for monitoring')
            setupAudioAnalyzer(stream, '🎤 Direct mic stream')
            return
          }
        } catch (micErr) {
          console.log('Direct mic access failed:', micErr)
        }

        // Alternative 2: Try Daily's localAudio method if available
        if ((daily as any).localAudio) {
          console.log('Trying Daily localAudio method...')
          const localAudio = (daily as any).localAudio()
          if (localAudio) {
            const stream = new MediaStream([localAudio])
            setupAudioAnalyzer(stream, '🎤 Daily localAudio')
            return
          }
        }

        console.log('❌ No audio track available yet - all methods failed')
        return
      }

      // Original SDK approach - but let's test if it's working first
      const audioTrack = localParticipant.tracks.audio.persistentTrack
      const stream = new MediaStream([audioTrack])

      console.log('🔍 Persistent track analysis:', {
        track: audioTrack,
        enabled: audioTrack.enabled,
        readyState: audioTrack.readyState,
        muted: audioTrack.muted,
        label: audioTrack.label,
        streamActive: stream.active,
        streamTracks: stream.getTracks().length
      })

      // Always try the direct microphone approach since persistent track keeps failing
      console.log('🎤 Persistent track found but forcing direct microphone approach due to RMS = 0 issue')
      try {
        const directStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          }
        })

        console.log('✅ Got direct microphone stream, using this instead of persistent track')

        // Test: Check if the microphone stream has any audio tracks and their properties
        const audioTracks = directStream.getAudioTracks()
        const trackDetails = audioTracks.map(track => ({
          enabled: track.enabled,
          muted: track.muted,
          readyState: track.readyState,
          label: track.label,
          settings: track.getSettings()
        }))

        console.log('🔍 Direct microphone analysis:')
        console.log('  - streamActive:', directStream.active)
        console.log('  - trackCount:', audioTracks.length)
        console.log('  - track details:', trackDetails)

        // Additional check: Test if we can see any volume levels at the system level
        if (audioTracks.length > 0) {
          const track = audioTracks[0]
          console.log('🎤 Primary microphone track:')
          console.log('  - enabled:', track.enabled)
          console.log('  - muted:', track.muted)
          console.log('  - readyState:', track.readyState)
          console.log('  - label:', track.label)
          console.log('  - constraints:', track.getConstraints())
          console.log('  - settings:', track.getSettings())
          console.log('  - capabilities:', track.getCapabilities())
        }

        setupAudioAnalyzer(directStream, '🎤 Direct mic (forced)')

        // Also set up the persistent track for comparison
        setupAudioAnalyzer(stream, '🎤 SDK persistent track (comparison)', 'persistent')
        return
      } catch (micErr) {
        console.log('Direct mic failed, falling back to persistent track:', micErr)
        setupAudioAnalyzer(stream, '🎤 SDK persistent track')
      }

    } catch (err) {
      console.error('❌ Could not set up audio monitoring for local participant:', err)
    }

    function setupAudioAnalyzer(stream: MediaStream, source: string, key: string = 'local') {
      try {
        // Create audio analyzer (exact same as SDK)
        const ctx = new AudioContext()
        const sourceNode = ctx.createMediaStreamSource(stream)
        const analyzer = ctx.createAnalyser()
        analyzer.fftSize = 128
        analyzer.smoothingTimeConstant = 0.2  // Same as SDK
        sourceNode.connect(analyzer)

        audioAnalyzers.current[key] = { analyser: analyzer, context: ctx }

        const bufferLength = analyzer.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)

        const checkAudioLevel = () => {
          if (!audioAnalyzers.current[key]) return

          analyzer.getByteTimeDomainData(dataArray)

          let sum = 0
          let min = 255, max = 0
          for (let i = 0; i < bufferLength; i++) {
            const raw = dataArray[i]
            min = Math.min(min, raw)
            max = Math.max(max, raw)
            const sample = (raw - 128) / 128
            sum += sample * sample
          }
          const rms = Math.sqrt(sum / bufferLength)

          // TEMPORARY: If all samples are 128 (silence), simulate some speaking for testing
          if (min === 128 && max === 128 && key === 'local' && Math.random() < 0.001) {
            // Very rarely simulate speaking to test the UI
            console.log('🧪 SIMULATION: Adding fake speaking event since microphone shows all silence')
            setAudioLevels(prev => ({
              ...prev,
              ['local']: 5 // Fake level for testing
            }))
            setTimeout(() => {
              setAudioLevels(prev => ({
                ...prev,
                ['local']: 0 // Reset to silent
              }))
            }, 1000)
          }

          // Debug: show raw data analysis
          if (Math.random() < 0.1) { // Only log 10% of the time to avoid spam
            console.log(`${source} DEBUG:`, {
              bufferLength,
              rawDataRange: `${min}-${max}`,
              centerValue: 128,
              sumSquares: sum.toFixed(6),
              rms: rms.toFixed(6),
              firstFewSamples: Array.from(dataArray.slice(0, 8)),
              contextState: analyzer.context?.state,
              trackEnabled: stream?.active
            })
          }

          // Use same threshold as SDK
          const speakingThreshold = 0.01
          const isSpeaking = rms > speakingThreshold

          console.log(`${source} RMS:`, rms.toFixed(4), 'Speaking:', isSpeaking, `(range: ${min}-${max})`)

          // Convert to level for UI (only for the main local key)
          if (key === 'local') {
            const level = Math.min(10, Math.floor(rms * 100))

            setAudioLevels(prev => ({
              ...prev,
              ['local']: level
            }))
          }

          animationFrames.current[key] = requestAnimationFrame(checkAudioLevel)
        }

        console.log(`✅ Audio monitoring set up successfully - ${source}`)

        // Try to resume audio context if it's suspended
        if (ctx.state === 'suspended') {
          console.log(`🔊 AudioContext suspended for ${source}, attempting to resume...`)
          ctx.resume().then(() => {
            console.log(`✅ AudioContext resumed for ${source}`)
            checkAudioLevel()
          }).catch(err => {
            console.error(`❌ Failed to resume AudioContext for ${source}:`, err)
            checkAudioLevel()
          })
        } else {
          console.log(`🔊 AudioContext state for ${source}:`, ctx.state)
          checkAudioLevel()
        }
      } catch (setupErr) {
        console.error(`❌ Failed to setup analyzer for ${source}:`, setupErr)
      }
    }
  }, [daily])

  // Helper function for remote participants
  const monitorRemoteAudioLevel = useCallback((participantId: string, track: MediaStreamTrack) => {
    console.log('🎤 Setting up remote audio monitoring for:', participantId)
    try {
      const context = new AudioContext()
      const source = context.createMediaStreamSource(new MediaStream([track]))
      const analyser = context.createAnalyser()
      analyser.fftSize = 128
      analyser.smoothingTimeConstant = 0.2
      source.connect(analyser)

      audioAnalyzers.current[participantId] = { analyser, context }

      const bufferLength = analyser.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)

      const checkAudioLevel = () => {
        if (!audioAnalyzers.current[participantId]) return

        analyser.getByteTimeDomainData(dataArray)

        let sum = 0
        for (let i = 0; i < bufferLength; i++) {
          const sample = (dataArray[i] - 128) / 128
          sum += sample * sample
        }
        const rms = Math.sqrt(sum / bufferLength)
        const level = Math.min(10, Math.floor(rms * 100))

        setAudioLevels(prev => ({
          ...prev,
          [participantId]: level
        }))

        animationFrames.current[participantId] = requestAnimationFrame(checkAudioLevel)
      }

      console.log('✅ Remote audio monitoring set up successfully for:', participantId)
      checkAudioLevel()
    } catch (err) {
      console.error('❌ Could not set up remote audio monitoring for', participantId, err)
    }
  }, [])

  const isConnected = daily?.meetingState() === 'joined-meeting'
  const isMuted = localParticipant?.audio === false

  // Use Daily.js direct approach for audio track handling
  useEffect(() => {
    if (!daily) return

    const handleTrackStarted = (event: any) => {
      console.log('=== TRACK STARTED EVENT ===')
      console.log('Full event:', event)
      console.log('Track details:', {
        kind: event.track?.kind,
        enabled: event.track?.enabled,
        readyState: event.track?.readyState,
        id: event.track?.id
      })
      console.log('Participant details:', {
        local: event.participant?.local,
        user_name: event.participant?.user_name,
        session_id: event.participant?.session_id
      })

      if (event.track && event.track.kind === 'audio' && event.participant && !event.participant.local) {
        console.log('🎵 SETTING UP REMOTE AUDIO for participant:', event.participant.user_name || event.participant.session_id)

        // Create dedicated audio element for this participant
        const participantId = event.participant.session_id
        if (!audioRefs.current[participantId]) {
          console.log('📻 Creating new audio element for participant:', participantId)
          const audio = new Audio()
          audio.autoplay = true
          audio.volume = 1.0
          // Set playsInline for mobile browsers (using bracket notation for TypeScript)
          ;(audio as any).playsInline = true

          // Add event listeners for debugging
          audio.onloadstart = () => console.log('🔊 Audio element load started for:', participantId)
          audio.oncanplay = () => console.log('🔊 Audio element can play for:', participantId)
          audio.onplay = () => console.log('🔊 Audio element playing for:', participantId)
          audio.onerror = (err) => console.error('🔊 Audio element error for:', participantId, err)

          audioRefs.current[participantId] = audio
        }

        const audioElement = audioRefs.current[participantId]
        const stream = new MediaStream([event.track])

        console.log('🔊 Setting audio stream for participant:', participantId)
        console.log('Stream details:', {
          active: stream.active,
          tracks: stream.getTracks().map(t => ({ kind: t.kind, enabled: t.enabled, readyState: t.readyState }))
        })

        audioElement.srcObject = stream

        // Monitor remote participant's audio level
        monitorRemoteAudioLevel(participantId, event.track)

        // Set initial audio properties for mobile
        if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          audioElement.volume = 1.0
          // Try to route to speakerphone by default on mobile
          if ('setSinkId' in audioElement && speakers && speakers.length > 0) {
            const speakerDevice = speakers.find(s =>
              s.device && s.device.label && s.device.label.toLowerCase().includes('speaker')
            )
            if (speakerDevice) {
              ;(audioElement as any).setSinkId(speakerDevice.device.deviceId).catch((err: any) => {
                console.warn('Could not set speaker device:', err)
              })
            }
          }
        }

        // Explicitly play the audio with better error handling
        audioElement.play().then(() => {
          console.log('✅ Successfully playing remote audio for:', event.participant.user_name || participantId)
        }).catch(err => {
          console.error('❌ Failed to play remote audio for:', participantId, err)
          // Try to play again after a short delay
          setTimeout(() => {
            console.log('🔄 Retrying audio play for:', participantId)
            audioElement.play().catch(retryErr => {
              console.error('❌ Retry failed for:', participantId, retryErr)
            })
          }, 500)
        })
      } else if (event.track && event.track.kind === 'audio' && event.participant && event.participant.local) {
        // Local participant audio will be handled separately using Daily participant approach
        console.log('Local audio track detected, will monitor using Daily participant approach')
      } else {
        console.log('⏭️ Skipping track (not audio):', {
          isAudio: event.track?.kind === 'audio',
          hasParticipant: !!event.participant,
          isLocal: event.participant?.local
        })
      }
    }

    const handleTrackStopped = (event: any) => {
      console.log('Track stopped:', event)
      if (event.participant) {
        const participantId = event.participant.session_id

        // Clean up audio monitoring
        if (audioAnalyzers.current[participantId]) {
          if (animationFrames.current[participantId]) {
            cancelAnimationFrame(animationFrames.current[participantId])
            delete animationFrames.current[participantId]
          }
          audioAnalyzers.current[participantId].context.close()
          delete audioAnalyzers.current[participantId]
        }

        // Clean up audio levels state
        setAudioLevels(prev => {
          const newLevels = { ...prev }
          delete newLevels[participantId]
          return newLevels
        })

        if (!event.participant.local) {
          if (audioRefs.current[participantId]) {
            audioRefs.current[participantId].pause()
            audioRefs.current[participantId].srcObject = null
            delete audioRefs.current[participantId]
            console.log('Cleaned up audio for participant:', participantId)
          }
        }
      }
    }

    const handleParticipantLeft = (event: any) => {
      console.log('Participant left:', event)
      if (event.participant && !event.participant.local) {
        const participantId = event.participant.session_id
        if (audioRefs.current[participantId]) {
          audioRefs.current[participantId].pause()
          audioRefs.current[participantId].srcObject = null
          delete audioRefs.current[participantId]
          console.log('Cleaned up audio for left participant:', participantId)
        }

        // Call the callback with updated participant count
        if (onParticipantLeftCallback && daily) {
          const currentParticipants = Object.keys(daily.participants()).length
          console.log('Participant left, current count:', currentParticipants)
          onParticipantLeftCallback(currentParticipants)
        }
      }
    }

    // Register event listeners
    daily.on('track-started', handleTrackStarted)
    daily.on('track-stopped', handleTrackStopped)
    daily.on('participant-left', handleParticipantLeft)

    return () => {
      // Cleanup
      daily.off('track-started', handleTrackStarted)
      daily.off('track-stopped', handleTrackStopped)
      daily.off('participant-left', handleParticipantLeft)

      // Clean up all audio elements
      Object.values(audioRefs.current).forEach(audio => {
        audio.pause()
        audio.srcObject = null
      })
      audioRefs.current = {}
    }
  }, [daily, speakers, monitorRemoteAudioLevel])

  // Monitor local audio levels (same approach as SDK)
  useEffect(() => {
    if (!isConnected || isMuted || !daily) {
      // Clean up local audio monitoring when disconnected or muted
      if (audioAnalyzers.current['local']) {
        if (animationFrames.current['local']) {
          cancelAnimationFrame(animationFrames.current['local'])
          delete animationFrames.current['local']
        }
        audioAnalyzers.current['local'].context.close()
        delete audioAnalyzers.current['local']
      }
      setAudioLevels(prev => {
        const newLevels = { ...prev }
        delete newLevels['local']
        return newLevels
      })
      return
    }

    // Wait a bit for Daily.co to fully set up the audio track (same as SDK)
    const timeout = setTimeout(monitorLocalAudioLevel, 500)

    return () => {
      clearTimeout(timeout)
      if (animationFrames.current['local']) {
        cancelAnimationFrame(animationFrames.current['local'])
        delete animationFrames.current['local']
      }
      if (audioAnalyzers.current['local']) {
        audioAnalyzers.current['local'].context.close()
        delete audioAnalyzers.current['local']
      }
    }
  }, [isConnected, isMuted, daily, monitorLocalAudioLevel])

  // Auto-enable speakerphone on mobile when connected
  useEffect(() => {
    if (isConnected && /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      console.log('📱 Mobile detected, attempting to enable speakerphone')
      if (daily && speakers && speakers.length > 0) {
        const speakerDevice = speakers.find(s =>
          s.device && s.device.label && (
            s.device.label.toLowerCase().includes('speaker') ||
            s.device.label.toLowerCase().includes('loudspeaker')
          )
        )
        if (speakerDevice) {
          setSpeaker(speakerDevice.device.deviceId).then(() => {
            setIsSpeakerphone(true)
            console.log('📢 Speakerphone enabled automatically on mobile')
          }).catch(err => {
            console.warn('Could not enable speakerphone:', err)
          })
        }
      }
    }
  }, [isConnected, daily, speakers, setSpeaker])

  const createRoom = useCallback(async (): Promise<string | null> => {
    try {
      // Create room via our API (same as before)
      const response = await fetch('/api/daily/create-room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      const result = await response.json()
      if (!result.success) {
        throw new Error(result.error)
      }

      return result.roomUrl

    } catch (err) {
      console.error('Failed to create room:', err)
      return null
    }
  }, [])

  const joinRoom = useCallback(async (roomUrl: string) => {
    if (!daily) return

    try {
      // Leave any existing meeting first
      if (daily.meetingState() !== 'left-meeting') {
        await daily.leave()
        console.log('Left previous Daily room before joining new one')
      }

      // Get available audio devices for debugging
      try {
        const devices = await navigator.mediaDevices.enumerateDevices()
        const audioInputs = devices.filter(d => d.kind === 'audioinput')
        console.log('Available audio input devices:', audioInputs.map(d => ({ label: d.label, deviceId: d.deviceId })))
      } catch (err) {
        console.warn('Could not enumerate devices:', err)
      }

      // Request audio permissions with specific constraints
      try {
        const constraints = {
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
            // Explicitly request default microphone (not phone/bluetooth)
            deviceId: { ideal: 'default' }
          }
        }
        console.log('Requesting audio with constraints:', constraints)

        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        console.log('Audio permissions granted, stream tracks:', stream.getTracks().map(t => ({
          kind: t.kind,
          label: t.label,
          deviceId: t.getSettings().deviceId,
          enabled: t.enabled
        })))

        // Close the test stream
        stream.getTracks().forEach(track => track.stop())
      } catch (permErr) {
        console.error('Audio permission denied:', permErr)
        throw new Error('Microphone access is required for voice calls')
      }

      // Join with more explicit audio configuration
      console.log('Joining Daily room with explicit audio settings...')
      await daily.join({
        url: roomUrl,
        audioSource: true,
        videoSource: false,
        subscribeToTracksAutomatically: true
      })
      console.log('Joined Daily room successfully')

      // Log meeting state after joining
      setTimeout(() => {
        console.log('Post-join meeting state:', daily.meetingState())
        console.log('Post-join participants:', daily.participants())
      }, 1000)

    } catch (err) {
      console.error('Failed to join room:', err)
      throw err
    }
  }, [daily])

  const leaveRoom = useCallback(() => {
    if (daily) {
      daily.leave()
      console.log('Left Daily room')
    }
  }, [daily])

  const toggleMute = useCallback(() => {
    console.log('🔇 Toggle mute called, current state:', { isMuted, hasDaily: !!daily })
    if (daily) {
      // If currently muted, unmute (set audio to true). If unmuted, mute (set audio to false)
      const shouldEnableAudio = isMuted
      daily.setLocalAudio(shouldEnableAudio)
      console.log('🔇 Set local audio to:', shouldEnableAudio, '(was muted:', isMuted, ') -> will be muted:', !shouldEnableAudio)
    } else {
      console.error('❌ No Daily instance available for mute toggle')
    }
  }, [daily, isMuted])

  const toggleSpeakerphone = useCallback(() => {
    console.log('toggleSpeakerphone called, current state:', isSpeakerphone)
    console.log('Available speakers:', speakers)

    // Simple toggle for state tracking even if device switching isn't supported
    setIsSpeakerphone(!isSpeakerphone)

    if (daily && speakers && speakers.length > 0) {
      if (isSpeakerphone) {
        // Switch to earpiece/headset
        const earDevice = speakers.find(s =>
          s.device && (
            (s.device.label && (
              s.device.label.toLowerCase().includes('earpiece') ||
              s.device.label.toLowerCase().includes('headset')
            )) ||
            s.device.deviceId === 'default'
          )
        )
        if (earDevice) {
          setSpeaker(earDevice.device.deviceId).then(() => {
            console.log('📞 Switched to earpiece/headset')
          }).catch(err => {
            console.warn('Could not switch to earpiece:', err)
          })
        } else {
          console.log('No earpiece device found, toggled state only')
        }
      } else {
        // Switch to speakerphone
        const speakerDevice = speakers.find(s =>
          s.device && s.device.label && (
            s.device.label.toLowerCase().includes('speaker') ||
            s.device.label.toLowerCase().includes('loudspeaker')
          )
        )
        if (speakerDevice) {
          setSpeaker(speakerDevice.device.deviceId).then(() => {
            console.log('📢 Switched to speakerphone')
          }).catch(err => {
            console.warn('Could not switch to speakerphone:', err)
          })
        } else {
          console.log('No speaker device found, toggled state only')
        }
      }
    } else {
      console.log('No Daily instance or speakers available, toggled state only')
    }
  }, [daily, speakers, setSpeaker, isSpeakerphone])

  const setOnParticipantLeft = useCallback((callback: (count: number) => void) => {
    setOnParticipantLeftCallback(() => callback)
  }, [])

  return {
    isConnected,
    isMuted: isMuted || false,
    participantCount: present,
    createRoom,
    joinRoom,
    leaveRoom,
    toggleMute,
    toggleSpeakerphone,
    isSpeakerphone,
    error: null,
    setOnParticipantLeft,
    audioLevels
  }
}