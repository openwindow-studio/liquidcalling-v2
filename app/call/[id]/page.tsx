'use client'

import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { DailyProvider } from '@daily-co/daily-react'
import useDailyReact from '../../../hooks/useDailyReact'

function CallPageContent() {
  const params = useParams()
  const searchParams = useSearchParams()
  const callId = Array.isArray(params.id) ? params.id[0] : params.id
  const fromAddress = searchParams.get('from')
  const toAddress = searchParams.get('to')
  const sessionId = searchParams.get('session')

  const [callStatus, setCallStatus] = useState<string>('joining')
  const [isInCall, setIsInCall] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [participantCount, setParticipantCount] = useState(0)
  const [localAudioLevel, setLocalAudioLevel] = useState(0)
  const [remoteAudioLevel, setRemoteAudioLevel] = useState(0)

  const {
    isConnected: audioConnected,
    isMuted,
    participantCount: dailyParticipantCount,
    createRoom,
    joinRoom,
    leaveRoom,
    toggleMute,
    error: audioError
  } = useDailyReact()

  // Timer for call duration
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isInCall) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isInCall])

  // Simulate audio levels for demo
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isInCall && !isMuted) {
      interval = setInterval(() => {
        setLocalAudioLevel(Math.floor(Math.random() * 10))
        if (callStatus === 'connected') {
          setRemoteAudioLevel(Math.floor(Math.random() * 8))
        }
      }, 200)
    } else {
      setLocalAudioLevel(0)
      setRemoteAudioLevel(0)
    }
    return () => clearInterval(interval)
  }, [isInCall, isMuted, callStatus])

  // Auto-join room on mount
  useEffect(() => {
    const autoJoinRoom = async () => {
      if (callId) {
        try {
          setCallStatus('joining')
          console.log('Starting join process for room:', callId)

          // Join Daily.co room using the room ID from URL
          // The room URL format from Daily.co API response
          const roomUrl = `https://immaterial.daily.co/${callId}`
          console.log('About to call joinRoom with URL:', roomUrl)

          await joinRoom(roomUrl)

          console.log('joinRoom completed successfully')
          setCallStatus('in-room')
          setIsInCall(true)
          console.log('Recipient joined Daily room:', roomUrl)

        } catch (error) {
          console.error('Failed to join room - Full error:', error)
          setCallStatus('error')
        }
      }
    }

    autoJoinRoom()
  }, [callId, joinRoom])

  // Use Daily participant count
  useEffect(() => {
    if (dailyParticipantCount > 0) {
      setParticipantCount(dailyParticipantCount)
    }
  }, [dailyParticipantCount])

  const handleEndCall = async () => {
    try {
      // Leave Daily.co room
      leaveRoom()

      // Reset state
      setIsInCall(false)
      setCallDuration(0)
      setCallStatus('ended')
    } catch (error) {
      console.error('Error ending call:', error)
    }
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  if (isInCall) {
    return (
      <div className="liquid-app">
        {/* Logo - FIGMA RESPONSIVE */}
        <div className="figma-logo">Liquid Calling</div>

        {/* Main Card - FIGMA RESPONSIVE */}
        <div className="figma-main-card">
          {/* Content inside the glass card */}
          <div className="figma-main-card-content">

            {/* Timer in Geist Mono */}
            <div className="figma-call-timer">
              {formatDuration(callDuration)}
            </div>

            {/* Mic icon for muting */}
            <div className="figma-mic-container">
              <button
                onClick={toggleMute}
                className={`micro-icon ${
                  isMuted ? 'micro-icon--muted' : 'micro-icon--unmuted'
                }`}
              >
                <svg width="18" height="24" viewBox="0 0 34 48" fill="none">
                  <path d="M17 39V46" stroke="black" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M32 19V23.4444C32 27.57 30.4196 31.5267 27.6066 34.4439C24.7936 37.3611 20.9782 39 17 39C13.0218 39 9.20644 37.3611 6.3934 34.4439C3.58035 31.5267 2 27.57 2 23.4444V19" stroke="black" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M24 8.69231C24 4.99625 20.866 2 17 2C13.134 2 10 4.99625 10 8.69231V24.3077C10 28.0038 13.134 31 17 31C20.866 31 24 28.0038 24 24.3077V8.69231Z" stroke="black" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Leave Call Button */}
            <button
              onClick={handleEndCall}
              className="figma-cta-button figma-button--red"
            >
              <span className="figma-button-text">Leave Call</span>
            </button>

            {/* Participant Count */}
            <div className="figma-participant-count">
              In Room ~ {participantCount} Participant{participantCount !== 1 ? 's' : ''}
            </div>

            {/* Status Display */}
            {callStatus === 'joining' && (
              <div className="figma-participant-count">Joining room...</div>
            )}
            {callStatus === 'in-room' && (
              <div className="figma-participant-count">Connected • Free for you</div>
            )}
            {audioError && (
              <div className="figma-error-message">
                {audioError}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="liquid-app">
      {/* Logo - FIGMA RESPONSIVE */}
      <div className="figma-logo">Liquid Calling</div>

      {/* Main Card - FIGMA RESPONSIVE */}
      <div className="figma-main-card">
        <div className="figma-main-card-content">

          {callStatus === 'joining' && (
            <>
              <h2 className="figma-card-title">Joining room...</h2>
              <p className="figma-card-subtitle">Setting up audio</p>
              <div className="figma-mic-container">
                <div className="micro-icon micro-icon--permission-needed">
                  <svg width="18" height="24" viewBox="0 0 34 48" fill="none">
                    <path d="M17 39V46" stroke="black" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M32 19V23.4444C32 27.57 30.4196 31.5267 27.6066 34.4439C24.7936 37.3611 20.9782 39 17 39C13.0218 39 9.20644 37.3611 6.3934 34.4439C3.58035 31.5267 2 27.57 2 23.4444V19" stroke="black" strokeWidth="3" strokeLinecap="round"/>
                    <path d="M24 8.69231C24 4.99625 20.866 2 17 2C13.134 2 10 4.99625 10 8.69231V24.3077C10 28.0038 13.134 31 17 31C20.866 31 24 28.0038 24 24.3077V8.69231Z" stroke="black" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </>
          )}

          {callStatus === 'error' && (
            <>
              <h2 className="figma-card-title" style={{ color: '#ff6b6b' }}>Failed to join</h2>
              <p className="figma-card-subtitle">Check your microphone permissions</p>
              <button
                onClick={() => window.location.reload()}
                className="figma-cta-button figma-button--white"
              >
                <span className="figma-button-text">Try again</span>
              </button>
            </>
          )}

          {callStatus === 'ended' && (
            <>
              <h2 className="figma-card-title">Call ended</h2>
              <button
                onClick={() => window.close()}
                className="figma-cta-button figma-button--white"
              >
                <span className="figma-button-text">Close window</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CallPage() {
  return (
    <DailyProvider>
      <CallPageContent />
    </DailyProvider>
  )
}