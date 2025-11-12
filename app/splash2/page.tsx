'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { useState, useEffect } from 'react'
import { DailyProvider } from '@daily-co/daily-react'
import useDailyReact from '../../hooks/useDailyReact'
import dynamic from 'next/dynamic'

const BubblesBackground = dynamic(() => import('../../components/BubblesBackground'), { ssr: false })

function Splash2Content() {
  const { address, isConnected } = useAccount()
  const [mounted, setMounted] = useState(false)
  const [recipient, setRecipient] = useState('')
  const [isInCall, setIsInCall] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [callStatus, setCallStatus] = useState<string>('idle')
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [callLink, setCallLink] = useState<string | null>(null)
  const [showCallLinkModal, setShowCallLinkModal] = useState(false)
  const [recipientJoined, setRecipientJoined] = useState(false)
  const [participantCount, setParticipantCount] = useState(0)
  const [roomId, setRoomId] = useState<string | null>(null)
  const [localAudioLevel, setLocalAudioLevel] = useState(0)
  const [remoteAudioLevel, setRemoteAudioLevel] = useState(0)

  // Demo mode state
  const [isDemoMode, setIsDemoMode] = useState(false)

  // Mic permission state
  const [micPermission, setMicPermission] = useState<'granted' | 'denied' | 'prompt' | 'checking'>('prompt')

  // Mark as mounted on client
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle demo mode changes
  const handleSetDemoMode = (value: boolean) => {
    setIsDemoMode(value)
  }

  const checkMicPermission = async () => {
    if (typeof window === 'undefined') return

    setMicPermission('checking')
    try {
      const result = await navigator.permissions.query({ name: 'microphone' as PermissionName })
      setMicPermission(result.state as any)

      result.addEventListener('change', () => {
        setMicPermission(result.state as any)
      })
    } catch (error) {
      console.error('Permission check failed:', error)
      setMicPermission('prompt')
    }
  }

  const requestMicPermission = async () => {
    if (typeof window === 'undefined') return

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      setMicPermission('granted')
      stream.getTracks().forEach(track => track.stop())
    } catch (error) {
      console.error('Mic permission denied:', error)
      setMicPermission('denied')
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      checkMicPermission()
    }
  }, [])

  // Daily.co React hooks
  const {
    isConnected: audioConnected,
    isMuted,
    participantCount: dailyParticipantCount,
    createRoom,
    joinRoom,
    leaveRoom,
    toggleMute: toggleWebRTCMute,
    error: audioError
  } = useDailyReact()

  // Timer for call duration with 10-minute limit
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isInCall) {
      interval = setInterval(() => {
        setCallDuration(prev => {
          const newDuration = prev + 1
          if (newDuration >= 600) {
            handleEndCall()
            return prev
          }
          return newDuration
        })
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

  useEffect(() => {
    if (dailyParticipantCount > 0) {
      setParticipantCount(dailyParticipantCount)
    }
  }, [dailyParticipantCount])

  const createCallLink = async () => {
    if (!isConnected && !isDemoMode) {
      alert('Connect your wallet first')
      return
    }

    if (micPermission !== 'granted') {
      alert('Microphone permission is required to create calls')
      return
    }

    try {
      setCallStatus('creating-room')

      console.log('Creating Daily.co room...')
      const roomUrl = await createRoom()
      console.log('Room URL received:', roomUrl)

      if (!roomUrl) {
        throw new Error('Failed to create room - no URL returned')
      }

      const roomId = roomUrl.split('/').pop()
      if (!roomId) {
        throw new Error('Invalid room URL received: ' + roomUrl)
      }
      setRoomId(roomId)

      sessionStorage.setItem('currentRoomUrl', roomUrl)
      sessionStorage.setItem('currentRoomId', roomId)

      const link = `${window.location.origin}/call/${roomId}`
      setCallLink(link)
      setShowCallLinkModal(true)

      console.log('Room setup complete:', { roomUrl, roomId, link })

      setCallStatus('idle')

    } catch (error: any) {
      console.error('Failed to create call:', error)
      alert(`Failed to create call: ${error.message}`)
      setCallStatus('idle')
    }
  }

  const handleCall = async () => {
    const storedRoomUrl = sessionStorage.getItem('currentRoomUrl')
    const storedRoomId = sessionStorage.getItem('currentRoomId')

    console.log('Attempting to join:', { storedRoomUrl, storedRoomId, roomId })

    if (!storedRoomUrl && !roomId) {
      alert('Please create a call link first')
      return
    }

    try {
      setCallStatus('initializing')

      let roomUrlToJoin = storedRoomUrl
      if (!roomUrlToJoin && roomId) {
        roomUrlToJoin = `https://immaterial.daily.co/${roomId}`
        console.log('Constructed room URL from ID:', roomUrlToJoin)
      }

      if (!roomUrlToJoin) {
        throw new Error('No room URL available')
      }

      console.log('Joining room with URL:', roomUrlToJoin)
      await joinRoom(roomUrlToJoin)

      setCallStatus('in-room')
      setIsInCall(true)
      setCallDuration(0)

      console.log('Host joined Daily room:', roomId)

    } catch (error: any) {
      console.error('Failed to join call room:', error)
      alert(`Failed to join call room: ${error.message}`)
      setCallStatus('idle')
    }
  }

  const handleEndCall = async () => {
    try {
      leaveRoom()

      setIsInCall(false)
      setCallDuration(0)
      setCallStatus('idle')
      setSessionId(null)
      setCallLink(null)
      setRoomId(null)
      setParticipantCount(0)

      sessionStorage.removeItem('currentRoomUrl')
      sessionStorage.removeItem('currentRoomId')

    } catch (error) {
      console.error('Error ending call:', error)
    }
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  if (isInCall) {
    return (
      <div className="liquid-app">
        <BubblesBackground />

        <div className="figma-logo" onClick={() => handleSetDemoMode(false)}>Liquid Calling</div>

        {isDemoMode && (
          <button
            onClick={() => handleSetDemoMode(false)}
            className="figma-demo-button"
          >
            <span className="figma-button-text">Exit Demo</span>
          </button>
        )}

        <div className="figma-connect-button">
          <ConnectButton.Custom>
            {({ account, chain, openAccountModal, openConnectModal, mounted }) => {
              const ready = mounted
              const connected = ready && account && chain
              return (
                <div {...(!ready && { 'aria-hidden': true })}>
                  {(() => {
                    if (!connected) {
                      return (
                        <button onClick={openConnectModal} type="button" className="rainbow-connect-button">
                          Connect
                        </button>
                      )
                    }
                    return (
                      <button onClick={openAccountModal} type="button" className="rainbow-connect-button">
                        {account.displayName}
                      </button>
                    )
                  })()}
                </div>
              )
            }}
          </ConnectButton.Custom>
        </div>

        <div className="figma-main-card">
          {isDemoMode && !isConnected && (
            <div className="figma-demo-banner">
              <div className="figma-demo-icon">
                <svg width="10" height="12" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.00002 2V8.292C5.38869 8.7724 4.00412 9.81675 3.09948 11.2341C2.19485 12.6514 1.8306 14.347 2.07335 16.0108C2.3161 17.6746 3.14961 19.1954 4.42149 20.2952C5.69336 21.395 7.3186 22.0002 9.00002 22.0002C10.6814 22.0002 12.3067 21.395 13.5785 20.2952C14.8504 19.1954 15.6839 17.6746 15.9267 16.0108C16.1694 14.347 15.8052 12.6514 14.9005 11.2341C13.9959 9.81675 12.6113 8.7724 11 8.292V2" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 15H16" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5.5 2H12.5" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="figma-demo-banner-text">Demo Mode • No Billing • 10 Minute Test Mode</span>
            </div>
          )}

          <div className="figma-main-card-content">
            <button
              onClick={() => {
                if (callLink) {
                  navigator.clipboard.writeText(callLink)
                  alert('Room link copied!')
                }
              }}
              className="figma-copy-room-link"
            >
              Copy Room Link
            </button>

            <div className="figma-call-timer">
              {formatDuration(callDuration)}
            </div>

            <div className="figma-mic-container">
              <button
                onClick={toggleWebRTCMute}
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

            <button
              onClick={handleEndCall}
              className="figma-cta-button figma-button--red"
            >
              <span className="figma-button-text">End Call</span>
            </button>

            <div className="figma-participant-count">
              In Room ~ {participantCount} Participant{participantCount !== 1 ? 's' : ''}
            </div>

            {isDemoMode && (
              <div className="figma-connect-wallet-banner">
                <strong>Connect for Unlimited Use</strong>
              </div>
            )}

            {isDemoMode && (
              <button
                onClick={() => handleSetDemoMode(false)}
                className="figma-exit-demo-button"
              >
                Exit Demo
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (!mounted) {
    return <div className="liquid-app">Loading...</div>
  }

  if (!isConnected && !isDemoMode) {
    return (
      <div className="liquid-app">
        <BubblesBackground />

        <div className="figma-logo" onClick={() => window.location.reload()}>Liquid Calling</div>

        <button
          onClick={() => handleSetDemoMode(true)}
          className="figma-demo-button"
        >
          <span className="figma-button-text">Try Demo</span>
        </button>

        <div className="figma-connect-button">
          <ConnectButton.Custom>
            {({ account, chain, openAccountModal, openConnectModal, mounted }) => {
              const ready = mounted
              const connected = ready && account && chain
              return (
                <div {...(!ready && { 'aria-hidden': true })}>
                  {(() => {
                    if (!connected) {
                      return (
                        <button onClick={openConnectModal} type="button" className="rainbow-connect-button">
                          Connect
                        </button>
                      )
                    }
                    return (
                      <button onClick={openAccountModal} type="button" className="rainbow-connect-button">
                        {account.displayName}
                      </button>
                    )
                  })()}
                </div>
              )
            }}
          </ConnectButton.Custom>
        </div>

        <h1 className="figma-hero-title">Actually Private<br/>Voice Calls</h1>

        <button
          onClick={() => handleSetDemoMode(true)}
          className="figma-cta-button"
        >
          <span className="figma-cta-text">Connect your wallet to start your call</span>
          <div className="figma-cta-icon">
            <svg width="20" height="16" viewBox="0 0 37 31" fill="none">
              <path d="M18.5 24.5V31" stroke="#010101" strokeWidth="2" strokeLinecap="round"/>
              <path d="M32 12V15.5C32 18.5 30.5 21.3 28 23.5C25.5 25.7 22 27 18.5 27C15 27 11.5 25.7 9 23.5C6.5 21.3 5 18.5 5 15.5V12" stroke="#010101" strokeWidth="2" strokeLinecap="round"/>
              <path d="M24 6C24 3 21.5 0.5 18.5 0.5C15.5 0.5 13 3 13 6V18C13 21 15.5 23.5 18.5 23.5C21.5 23.5 24 21 24 18V6Z" stroke="#010101" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </button>

        <div className="figma-footer-left">
          Zero logs. Zero IP tracking. Zero stored data. True end-to-end encryption & HIPAA compliant. EU-US Data Privacy Framework certified.
        </div>

        <div className="figma-footer-right">
          Pay .05 USDC per minute on HyperLiquid and speak freely. No KYC. No data collection. Just secure calls.
        </div>

        <div className="figma-copyright">
          LIQUIDCALLING ©2025
        </div>
      </div>
    )
  }

  return (
    <div className="liquid-app">
      <BubblesBackground />

      <div className="figma-logo" onClick={() => handleSetDemoMode(false)}>Liquid Calling</div>

      {isDemoMode && (
        <button
          onClick={() => handleSetDemoMode(false)}
          className="figma-demo-button"
        >
          <span className="figma-button-text">Exit Demo</span>
        </button>
      )}

      <div className="figma-connect-button">
        <ConnectButton.Custom>
          {({ account, chain, openAccountModal, openConnectModal, mounted }) => {
            const ready = mounted
            const connected = ready && account && chain
            return (
              <div {...(!ready && { 'aria-hidden': true })}>
                {(() => {
                  if (!connected) {
                    return (
                      <button onClick={openConnectModal} type="button" className="rainbow-connect-button">
                        Connect
                      </button>
                    )
                  }
                  return (
                    <button onClick={openAccountModal} type="button" className="rainbow-connect-button">
                      {account.displayName}
                    </button>
                  )
                })()}
              </div>
            )
          }}
        </ConnectButton.Custom>
      </div>

      <div className="figma-main-card">
        {isDemoMode && !isConnected && (
          <div className="figma-demo-banner">
            <div className="figma-demo-icon">
              <svg width="10" height="12" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.00002 2V8.292C5.38869 8.7724 4.00412 9.81675 3.09948 11.2341C2.19485 12.6514 1.8306 14.347 2.07335 16.0108C2.3161 17.6746 3.14961 19.1954 4.42149 20.2952C5.69336 21.395 7.3186 22.0002 9.00002 22.0002C10.6814 22.0002 12.3067 21.395 13.5785 20.2952C14.8504 19.1954 15.6839 17.6746 15.9267 16.0108C16.1694 14.347 15.8052 12.6514 14.9005 11.2341C13.9959 9.81675 12.6113 8.7724 11 8.292V2" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 15H16" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.5 2H12.5" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="figma-demo-banner-text">Demo Mode • No Billing • 10 Minute Test Mode</span>
          </div>
        )}

        <div className="figma-main-card-content">
          <div className="figma-mic-container">
            <button
              onClick={micPermission === 'granted' ? toggleWebRTCMute : requestMicPermission}
              className={`micro-icon ${
                micPermission === 'granted'
                  ? (isMuted ? 'micro-icon--muted' : 'micro-icon--unmuted')
                  : 'micro-icon--permission-needed'
              }`}
            >
              <svg width="18" height="24" viewBox="0 0 34 48" fill="none">
                <path d="M17 39V46" stroke="black" strokeWidth="3" strokeLinecap="round"/>
                <path d="M32 19V23.4444C32 27.57 30.4196 31.5267 27.6066 34.4439C24.7936 37.3611 20.9782 39 17 39C13.0218 39 9.20644 37.3611 6.3934 34.4439C3.58035 31.5267 2 27.57 2 23.4444V19" stroke="black" strokeWidth="3" strokeLinecap="round"/>
                <path d="M24 8.69231C24 4.99625 20.866 2 17 2C13.134 2 10 4.99625 10 8.69231V24.3077C10 28.0038 13.134 31 17 31C20.866 31 24 28.0038 24 24.3077V8.69231Z" stroke="black" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {!callLink ? (
            <button
              onClick={createCallLink}
              disabled={callStatus !== 'idle' || micPermission !== 'granted'}
              className="figma-cta-button figma-button--white"
            >
              {callStatus === 'creating-room' ? (
                <>
                  <div className="loading-dots"></div>
                  <span className="figma-button-text">One moment, we are securing your room</span>
                </>
              ) : (
                <span className="figma-button-text">Create a call link and share it with anyone</span>
              )}
            </button>
          ) : (
            <button
              onClick={handleCall}
              disabled={callStatus === 'initializing'}
              className="figma-cta-button figma-button--green"
            >
              <span className="figma-button-text">{callStatus === 'initializing' ? 'Joining room...' : 'Start Call'}</span>
            </button>
          )}

          {audioError && (
            <div className="figma-error-message">
              {audioError}
            </div>
          )}

          {callLink && (
            <div className="figma-room-status">
              <p className="figma-room-status-text">
                Room created! Share the link to invite others.
              </p>
              <button
                onClick={() => {
                  if (callLink) {
                    navigator.clipboard.writeText(callLink)
                    alert('Room link copied!')
                  }
                }}
                className="figma-copy-link-button"
              >
                📋 Copy room link
              </button>
            </div>
          )}
        </div>
      </div>

      {isDemoMode && (
        <div className="figma-demo-footer">
          <p className="figma-demo-footer-title">
            Connect for Unlimited Use
          </p>
          <button
            onClick={() => handleSetDemoMode(false)}
            className="figma-exit-demo-button"
          >
            Exit Demo
          </button>
        </div>
      )}
    </div>
  )
}

export default function Splash2() {
  return (
    <DailyProvider>
      <Splash2Content />
    </DailyProvider>
  )
}