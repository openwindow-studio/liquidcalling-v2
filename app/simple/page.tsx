'use client'

import { useState } from 'react'
import { DailyProvider } from '@daily-co/daily-react'
import useDailyReact from '../../hooks/useDailyReact'

function SimpleCallPage() {
  const [roomUrl, setRoomUrl] = useState('')
  const [callStatus, setCallStatus] = useState('idle')

  const {
    isConnected,
    isMuted,
    participantCount,
    createRoom,
    joinRoom,
    leaveRoom,
    toggleMute,
    error
  } = useDailyReact()

  const handleCreateRoom = async () => {
    setCallStatus('creating')
    const url = await createRoom()
    if (url) {
      setRoomUrl(url)
      setCallStatus('created')
    } else {
      setCallStatus('error')
    }
  }

  const handleJoinRoom = async () => {
    if (!roomUrl) return
    setCallStatus('joining')
    try {
      await joinRoom(roomUrl)
      setCallStatus('connected')
    } catch (err) {
      setCallStatus('error')
    }
  }

  const handleLeaveRoom = () => {
    leaveRoom()
    setCallStatus('idle')
    setRoomUrl('')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Simple Daily.co Test</h1>

        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">Status: {callStatus}</p>
            <p className="text-sm text-gray-600 mb-2">Connected: {isConnected ? 'Yes' : 'No'}</p>
            <p className="text-sm text-gray-600 mb-2">Participants: {participantCount}</p>
            <p className="text-sm text-gray-600 mb-2">Muted: {isMuted ? 'Yes' : 'No'}</p>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded">
              Error: {error}
            </div>
          )}

          {callStatus === 'idle' && (
            <button
              onClick={handleCreateRoom}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Create Room
            </button>
          )}

          {callStatus === 'created' && roomUrl && (
            <div className="space-y-3">
              <div className="bg-gray-100 p-3 rounded text-sm">
                <p className="font-medium mb-1">Room URL:</p>
                <p className="break-all">{roomUrl}</p>
              </div>
              <button
                onClick={handleJoinRoom}
                className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
              >
                Join Room
              </button>
            </div>
          )}

          {callStatus === 'connected' && (
            <div className="space-y-3">
              <div className="bg-green-100 text-green-700 p-3 rounded text-center">
                Connected to Daily.co room!
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={toggleMute}
                  className={`flex-1 py-2 px-4 rounded ${
                    isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
                  } text-white`}
                >
                  {isMuted ? 'Unmute' : 'Mute'}
                </button>
                <button
                  onClick={handleLeaveRoom}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                >
                  Leave
                </button>
              </div>
            </div>
          )}

          {callStatus === 'error' && (
            <div className="space-y-3">
              <div className="bg-red-100 text-red-700 p-3 rounded text-center">
                Failed to create/join room
              </div>
              <button
                onClick={() => setCallStatus('idle')}
                className="w-full bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function SimplePage() {
  return (
    <DailyProvider>
      <SimpleCallPage />
    </DailyProvider>
  )
}