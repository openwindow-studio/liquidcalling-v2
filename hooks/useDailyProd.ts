'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import DailyIframe from '@daily-co/daily-js'

interface UseDailyProdReturn {
  isConnected: boolean
  isMuted: boolean
  error: string | null
  participantCount: number
  callDuration: number
  createRoom: () => Promise<string | null>
  joinRoom: (roomUrl: string) => Promise<void>
  leaveRoom: () => void
  toggleMute: () => void
}

export default function useDailyProd(): UseDailyProdReturn {
  const [isConnected, setIsConnected] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [participantCount, setParticipantCount] = useState(0)
  const [callDuration, setCallDuration] = useState(0)

  const callObject = useRef<any>(null)
  const startTime = useRef<number | null>(null)
  const durationInterval = useRef<NodeJS.Timeout | null>(null)

  const createRoom = useCallback(async (): Promise<string | null> => {
    try {
      setError(null)

      // Create room via our API
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
      setError('Failed to create room')
      return null
    }
  }, [])

  const joinRoom = useCallback(async (roomUrl: string) => {
    try {
      setError(null)

      // Request microphone permissions first
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true })
        console.log('Microphone permission granted')
      } catch (permError) {
        console.error('Microphone permission denied:', permError)
        setError('Microphone permission denied. Please allow microphone access.')
        return
      }

      // Create Daily call object
      callObject.current = DailyIframe.createCallObject({
        audioSource: true,
        videoSource: false, // Audio only
      })

      // Set up event listeners
      callObject.current
        .on('joined-meeting', (event: any) => {
          console.log('Joined Daily room', event)
          setIsConnected(true)
          startTime.current = Date.now()

          // Ensure audio is on by default
          callObject.current.setLocalAudio(true)
          setIsMuted(false)

          // Start duration timer
          durationInterval.current = setInterval(() => {
            if (startTime.current) {
              setCallDuration(Math.floor((Date.now() - startTime.current) / 1000))
            }
          }, 1000)

          // Update participant count (include local participant)
          const participants = callObject.current?.participants()
          const localParticipant = callObject.current?.localParticipant()
          const totalCount = Object.keys(participants || {}).length + (localParticipant ? 1 : 0)
          setParticipantCount(totalCount)

          console.log('Participants:', participants, 'Local:', localParticipant, 'Total:', totalCount)
        })
        .on('participant-joined', (event: any) => {
          console.log('Participant joined:', event.participant.user_id)
          const participants = callObject.current?.participants()
          const localParticipant = callObject.current?.localParticipant()
          const totalCount = Object.keys(participants || {}).length + (localParticipant ? 1 : 0)
          setParticipantCount(totalCount)
        })
        .on('participant-left', (event: any) => {
          console.log('Participant left:', event.participant.user_id)
          const participants = callObject.current?.participants()
          const localParticipant = callObject.current?.localParticipant()
          const totalCount = Object.keys(participants || {}).length + (localParticipant ? 1 : 0)
          setParticipantCount(totalCount)
        })
        .on('error', (error: any) => {
          console.error('Daily error:', error)
          setError(`Call error: ${error.errorMsg || error.message || 'Unknown error'}`)
        })
        .on('left-meeting', () => {
          console.log('Left meeting')
          setIsConnected(false)
          setParticipantCount(0)
          if (durationInterval.current) {
            clearInterval(durationInterval.current)
            durationInterval.current = null
          }
        })
        .on('camera-error', (event: any) => {
          console.error('Camera error (ignored for audio-only):', event)
        })
        .on('mic-error', (event: any) => {
          console.error('Microphone error:', event)
          setError('Microphone error. Check your microphone permissions.')
        })

      // Join the room
      console.log('Joining room:', roomUrl)
      await callObject.current.join({ url: roomUrl })

    } catch (err) {
      console.error('Failed to join room:', err)
      setError(`Failed to join call: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }, [])

  const leaveRoom = useCallback(() => {
    if (callObject.current) {
      callObject.current.leave()
      callObject.current.destroy()
      callObject.current = null
    }

    if (durationInterval.current) {
      clearInterval(durationInterval.current)
      durationInterval.current = null
    }

    setIsConnected(false)
    setParticipantCount(0)
    setCallDuration(0)
    startTime.current = null
  }, [])

  const toggleMute = useCallback(() => {
    if (callObject.current) {
      const currentAudioState = callObject.current.localAudio()
      const newMutedState = currentAudioState
      callObject.current.setLocalAudio(!newMutedState)
      setIsMuted(newMutedState)
      console.log('Toggled mute:', newMutedState ? 'muted' : 'unmuted')
    }
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (callObject.current) {
        callObject.current.destroy()
      }
      if (durationInterval.current) {
        clearInterval(durationInterval.current)
      }
    }
  }, [])

  return {
    isConnected,
    isMuted,
    error,
    participantCount,
    callDuration,
    createRoom,
    joinRoom,
    leaveRoom,
    toggleMute
  }
}