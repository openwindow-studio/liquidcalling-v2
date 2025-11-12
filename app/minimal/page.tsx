'use client'

import { useState, useEffect, useRef } from 'react'
import DailyIframe from '@daily-co/daily-js'

export default function MinimalPage() {
  const [roomUrl, setRoomUrl] = useState('')
  const [callStatus, setCallStatus] = useState('idle')
  const [isConnected, setIsConnected] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [participantCount, setParticipantCount] = useState(0)
  const [error, setError] = useState('')

  const dailyRef = useRef<any>(null)

  useEffect(() => {
    // Clean up on unmount
    return () => {
      if (dailyRef.current) {
        dailyRef.current.destroy()
      }
    }
  }, [])

  const resetState = () => {
    setIsConnected(false)
    setIsMuted(false)
    setParticipantCount(0)
    setError('')
  }

  const createRoom = async () => {
    setCallStatus('creating')
    setError('')
    resetState()

    try {
      const response = await fetch('/api/daily/create-room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      const result = await response.json()

      if (result.success) {
        setRoomUrl(result.roomUrl)
        setCallStatus('created')
        console.log('Created room:', result.roomUrl)
      } else {
        setError(result.error || 'Failed to create room')
        setCallStatus('error')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create room')
      setCallStatus('error')
      console.error('Error creating room:', err)
    }
  }

  const joinRoom = async () => {
    if (!roomUrl) return

    setCallStatus('joining')
    setError('')
    resetState()

    try {
      // Create Daily call object - only create if it doesn't exist
      if (!dailyRef.current) {
        dailyRef.current = DailyIframe.createCallObject()
      } else {
        // If already exists, leave any existing call first
        try {
          await dailyRef.current.leave()
        } catch (e) {
          // Ignore leave errors
        }
      }

      // Set up event listeners (Daily.js handles duplicates automatically)
      dailyRef.current.on('joined-meeting', () => {
        console.log('Successfully joined meeting')
        setIsConnected(true)
        setCallStatus('connected')
      })

      dailyRef.current.on('participant-counts-updated', (event: any) => {
        console.log('Participant count:', event.participantCounts.present)
        setParticipantCount(event.participantCounts.present)
      })

      dailyRef.current.on('left-meeting', () => {
        console.log('Left meeting')
        setIsConnected(false)
        setCallStatus('idle')
        setParticipantCount(0)
      })

      dailyRef.current.on('error', (event: any) => {
        console.error('Daily error:', event)
        setError(`Daily.co error: ${event.errorMsg}`)
        setCallStatus('error')
      })

      // Join the room
      await dailyRef.current.join({ url: roomUrl })

    } catch (err: any) {
      setError(err.message || 'Failed to join room')
      setCallStatus('error')
      console.error('Error joining room:', err)
    }
  }

  const leaveRoom = () => {
    if (dailyRef.current) {
      dailyRef.current.leave()
    }
  }

  const toggleMute = () => {
    if (dailyRef.current) {
      const newMutedState = !isMuted
      dailyRef.current.setLocalAudio(!newMutedState)
      setIsMuted(newMutedState)
      console.log('Muted:', newMutedState)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Minimal Daily.co Test</h1>
        <p className="text-sm text-gray-600 mb-4">Direct Daily.js integration without React hooks</p>

        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">Status: <span className="font-medium">{callStatus}</span></p>
            <p className="text-sm text-gray-600 mb-2">Connected: <span className="font-medium">{isConnected ? 'Yes' : 'No'}</span></p>
            <p className="text-sm text-gray-600 mb-2">Participants: <span className="font-medium">{participantCount}</span></p>
            <p className="text-sm text-gray-600 mb-2">Muted: <span className="font-medium">{isMuted ? 'Yes' : 'No'}</span></p>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded text-sm">
              <strong>Error:</strong> {error}
            </div>
          )}

          {roomUrl && (
            <div className="bg-gray-100 p-3 rounded text-sm">
              <p className="font-medium mb-1">Room URL:</p>
              <p className="break-all text-xs">{roomUrl}</p>
            </div>
          )}

          <div className="space-y-3">
            {callStatus === 'idle' && (
              <button
                onClick={createRoom}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Create Room
              </button>
            )}

            {(callStatus === 'created' || callStatus === 'error') && roomUrl && (
              <button
                onClick={joinRoom}
                className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
              >
                Join Room
              </button>
            )}

            {callStatus === 'connected' && (
              <div className="space-y-3">
                <div className="bg-green-100 text-green-700 p-3 rounded text-center text-sm">
                  🎉 Connected to Daily.co room!
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={toggleMute}
                    className={`flex-1 py-2 px-4 rounded text-white text-sm ${
                      isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
                    }`}
                  >
                    {isMuted ? 'Unmute' : 'Mute'}
                  </button>
                  <button
                    onClick={leaveRoom}
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 text-sm"
                  >
                    Leave
                  </button>
                </div>
              </div>
            )}

            {callStatus === 'joining' && (
              <div className="text-center text-sm text-gray-600">
                Joining room...
              </div>
            )}

            {callStatus === 'creating' && (
              <div className="text-center text-sm text-gray-600">
                Creating room...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}