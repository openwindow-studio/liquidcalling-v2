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
}

export default function useDailyReact(): UseDailyReactReturn {
  const daily = useDaily()
  const localParticipant = useLocalParticipant()
  const { present } = useParticipantCounts()
  const { microphones, setMicrophone, speakers, setSpeaker } = useDevices()
  const audioRefs = useRef<{[key: string]: HTMLAudioElement}>({})
  const [isSpeakerphone, setIsSpeakerphone] = useState(false)

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

        // Set initial audio properties for mobile
        if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          audioElement.volume = 1.0
          // Try to route to speakerphone by default on mobile
          if ('setSinkId' in audioElement && speakers && speakers.length > 0) {
            const speakerDevice = speakers.find(s => s.label.toLowerCase().includes('speaker'))
            if (speakerDevice) {
              ;(audioElement as any).setSinkId(speakerDevice.deviceId).catch((err: any) => {
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
      } else {
        console.log('⏭️ Skipping track (not remote audio):', {
          isAudio: event.track?.kind === 'audio',
          hasParticipant: !!event.participant,
          isNotLocal: !event.participant?.local
        })
      }
    }

    const handleTrackStopped = (event: any) => {
      console.log('Track stopped:', event)
      if (event.participant && !event.participant.local) {
        const participantId = event.participant.session_id
        if (audioRefs.current[participantId]) {
          audioRefs.current[participantId].pause()
          audioRefs.current[participantId].srcObject = null
          delete audioRefs.current[participantId]
          console.log('Cleaned up audio for participant:', participantId)
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
  }, [daily, speakers])

  // Auto-enable speakerphone on mobile when connected
  useEffect(() => {
    if (isConnected && /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      console.log('📱 Mobile detected, attempting to enable speakerphone')
      if (daily && speakers && speakers.length > 0) {
        const speakerDevice = speakers.find(s =>
          s.label.toLowerCase().includes('speaker') ||
          s.label.toLowerCase().includes('loudspeaker')
        )
        if (speakerDevice) {
          setSpeaker(speakerDevice.deviceId).then(() => {
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
    if (daily) {
      daily.setLocalAudio(!isMuted)
      console.log('Toggled mute:', !isMuted)
    }
  }, [daily, isMuted])

  const toggleSpeakerphone = useCallback(() => {
    if (daily && speakers && speakers.length > 0) {
      if (isSpeakerphone) {
        // Switch to earpiece/headset
        const earDevice = speakers.find(s =>
          s.label.toLowerCase().includes('earpiece') ||
          s.label.toLowerCase().includes('headset') ||
          s.deviceId === 'default'
        )
        if (earDevice) {
          setSpeaker(earDevice.deviceId).then(() => {
            setIsSpeakerphone(false)
            console.log('📞 Switched to earpiece/headset')
          }).catch(err => {
            console.warn('Could not switch to earpiece:', err)
          })
        }
      } else {
        // Switch to speakerphone
        const speakerDevice = speakers.find(s =>
          s.label.toLowerCase().includes('speaker') ||
          s.label.toLowerCase().includes('loudspeaker')
        )
        if (speakerDevice) {
          setSpeaker(speakerDevice.deviceId).then(() => {
            setIsSpeakerphone(true)
            console.log('📢 Switched to speakerphone')
          }).catch(err => {
            console.warn('Could not switch to speakerphone:', err)
          })
        }
      }
    }
  }, [daily, speakers, setSpeaker, isSpeakerphone])

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
    error: null
  }
}