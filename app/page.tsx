'use client'

import { usePrivy } from '@privy-io/react-auth'
import { useState, useEffect } from 'react'
import { DailyProvider } from '@daily-co/daily-react'
import useDailyReact from '../hooks/useDailyReact'
import { useMinutesBalance } from '../hooks/useMinutesBalance'
import { useRealPayments } from '../hooks/useRealPayments'
import { PrivyConnectButton } from '../components/PrivyConnectButton'
import { PaymentUI } from '../components/PaymentUI'
import dynamic from 'next/dynamic'
import { ErrorBoundary } from '../components/ErrorBoundary'

const TorusCanvas = dynamic(() => import('../components/TorusCanvas'), { ssr: false })

function HomeContent() {
  const { ready, authenticated, user, login, logout } = usePrivy()
  const isConnected = authenticated
  const address = user?.wallet?.address
  const [mounted, setMounted] = useState(false)
  const [recipient, setRecipient] = useState('')
  const [isInCall, setIsInCall] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [callStatus, setCallStatus] = useState<string>('idle')
  const [sessionId, setSessionId] = useState<string | null>(null)
  // Removed deposit modal - no smart contract deployed yet
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
  const [showMicInstruction, setShowMicInstruction] = useState(false)

  // Mark as mounted on client
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle demo mode changes
  const handleSetDemoMode = (value: boolean) => {
    // If exiting demo mode and in a call, end the call first
    if (!value && isInCall) {
      leaveRoom()
      setIsInCall(false)
      setCallDuration(0)
      setCallStatus('idle')
      setCallLink('')
    }
    setIsDemoMode(value)
  }

  const checkMicPermission = async () => {
    // Ensure we're in the browser
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
    // Ensure we're in the browser
    if (typeof window === 'undefined') return

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      setMicPermission('granted')
      // Stop the test stream
      stream.getTracks().forEach(track => track.stop())
    } catch (error) {
      console.error('Mic permission denied:', error)
      setMicPermission('denied')
    }
  }

  // Check mic permission on mount (client-side only)
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

  // Minutes balance hooks
  const {
    minutesBalance,
    buyMinutes,
    deductMinutes,
    isPurchasing,
    purchaseError,
    calculateMinutesFromDollars,
    getPaymentHistory,
    clearPaymentHistory,
    resetBalanceForTesting,
    isReady: paymentReady,
  } = useMinutesBalance()

  // Real payments hooks
  const {
    payWithUSDC,
    switchToNetwork,
    currentNetwork,
    usdcBalance,
    supportedNetworks,
    isReady: cryptoReady,
    isNetworkSupported,
    refreshBalance
  } = useRealPayments()

  // Combined buy minutes function that handles real crypto payments
  const handleBuyMinutes = async (amount: string, method?: string) => {
    console.log(`🔥 handleBuyMinutes called:`, { amount, method, cryptoReady, currentNetwork })

    if (method === 'wallet' && cryptoReady) {
      // Real USDC payment
      console.log(`🚀 Initiating real USDC payment for $${amount} via wallet on ${currentNetwork}`)
      const result = await payWithUSDC(amount)
      console.log(`📋 Payment result:`, result)
      if (result) {
        // Add minutes to balance after successful payment
        const minutesToAdd = Math.floor(parseFloat(amount) * 20) // $1 = 20 minutes

        // Update minutes balance in state and localStorage
        if (user?.wallet?.address) {
          const currentBalance = minutesBalance
          const newBalance = currentBalance + minutesToAdd

          // Update localStorage
          localStorage.setItem(`minutes_${user.wallet.address}`, newBalance.toString())

          // Store payment history
          const paymentHistory = JSON.parse(localStorage.getItem(`payments_${user.wallet.address}`) || '[]')
          paymentHistory.push({
            amount: amount,
            minutes: minutesToAdd,
            method: 'wallet',
            timestamp: new Date().toISOString(),
            txId: result.hash,
            network: result.network
          })
          localStorage.setItem(`payments_${user.wallet.address}`, JSON.stringify(paymentHistory))

          console.log(`✅ Real USDC payment successful: +${minutesToAdd} minutes (Tx: ${result.hash})`)
          console.log(`💰 Balance updated: ${currentBalance} → ${newBalance} minutes`)

          // Trigger real-time balance update without page refresh
          console.log('🚀 Dispatching minutes-updated event...')
          window.dispatchEvent(new Event('minutes-updated'))
        }

        // Refresh USDC balance to show updated amount
        await refreshBalance()

        console.log(`🎉 Payment completed without page refresh!`)
      }
    } else {
      // Use the original buyMinutes for simulation
      await buyMinutes(amount, method)
    }
  }

  // Timer for call duration - simplified
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isInCall) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isInCall])

  // Track the last minute we deducted to prevent double deductions
  const [lastDeductedMinute, setLastDeductedMinute] = useState(0)

  // Handle minute deduction and auto-end logic separately
  useEffect(() => {
    // Calculate which minute we're in
    const currentMinute = Math.floor(callDuration / 60)

    // Only deduct if we've moved to a new minute and haven't deducted for this minute yet
    if (currentMinute > 0 && currentMinute > lastDeductedMinute && !isDemoMode && isConnected && isInCall) {
      const deductionSuccess = deductMinutes(1)
      setLastDeductedMinute(currentMinute)

      if (!deductionSuccess) {
        // Out of minutes - end call
        console.log('Out of minutes - ending call')
        alert('Call ended - insufficient minutes balance')
        handleEndCall()
      }
    }

    // Auto-end call after 10 minutes in demo mode
    if (isDemoMode && callDuration >= 600 && isInCall) {
      handleEndCall()
    }
  }, [callDuration, isDemoMode, isConnected, deductMinutes, isInCall, lastDeductedMinute])

  // Simulate audio levels for demo (will be replaced with real levels from Daily hooks)
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

  // Use Daily participant count
  useEffect(() => {
    if (dailyParticipantCount > 0) {
      setParticipantCount(dailyParticipantCount)
    }
  }, [dailyParticipantCount])

  // Handle window close/refresh for call initiator - end call for everyone
  useEffect(() => {
    if (isInCall) {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        // End the call when the initiator closes the window
        handleEndCall()

        // Show confirmation dialog
        e.preventDefault()
        e.returnValue = ''
        return ''
      }

      window.addEventListener('beforeunload', handleBeforeUnload)

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload)
      }
    }
  }, [isInCall])

  // Hide mic instruction when permission is granted
  useEffect(() => {
    if (micPermission === 'granted') {
      setShowMicInstruction(false)
    }
  }, [micPermission])

  const createCallLink = async () => {
    if (!isConnected && !isDemoMode) {
      alert('Connect wallet first')
      return
    }

    if (micPermission !== 'granted') {
      alert('Microphone permission is required to create calls')
      return
    }

    // Check minutes balance for connected users (not demo mode)
    if (isConnected && !isDemoMode && minutesBalance < 1) {
      alert('Insufficient minutes balance. Please purchase minutes to start a call.')
      return
    }

    try {
      // Set loading state
      setCallStatus('creating-room')

      // Create Daily.co room
      console.log('Creating Daily.co room...')
      const roomUrl = await createRoom()
      console.log('Room URL received:', roomUrl)

      if (!roomUrl) {
        throw new Error('Failed to create room - no URL returned')
      }

      // Extract room ID from URL for the shareable link
      const roomId = roomUrl.split('/').pop()
      if (!roomId) {
        throw new Error('Invalid room URL received: ' + roomUrl)
      }
      setRoomId(roomId)

      // Store the full room URL for joining
      sessionStorage.setItem('currentRoomUrl', roomUrl)
      sessionStorage.setItem('currentRoomId', roomId)

      // Create shareable link
      const link = `${window.location.origin}/call/${roomId}`
      setCallLink(link)
      setShowCallLinkModal(true)

      console.log('Room setup complete:', { roomUrl, roomId, link })

      // Reset status
      setCallStatus('idle')

    } catch (error: any) {
      console.error('Failed to create call:', error)
      alert(`Failed to create call: ${error.message}`)
      setCallStatus('idle')
    }
  }

  const handleCall = async () => {
    // Get the stored room URL and ID
    const storedRoomUrl = sessionStorage.getItem('currentRoomUrl')
    const storedRoomId = sessionStorage.getItem('currentRoomId')

    console.log('Attempting to join:', { storedRoomUrl, storedRoomId, roomId })

    if (!storedRoomUrl && !roomId) {
      alert('Please create a call link first')
      return
    }

    try {
      setCallStatus('initializing')

      // Use stored URL or construct from roomId
      let roomUrlToJoin = storedRoomUrl
      if (!roomUrlToJoin && roomId) {
        roomUrlToJoin = `https://immaterial.daily.co/${roomId}`
        console.log('Constructed room URL from ID:', roomUrlToJoin)
      }

      if (!roomUrlToJoin) {
        throw new Error('No room URL available')
      }

      // Join Daily.co room using the full URL
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
      // Leave Daily.co room
      leaveRoom()

      // Reset state
      setIsInCall(false)
      setCallDuration(0)
      setCallStatus('idle')
      setSessionId(null)
      setCallLink(null)
      setRoomId(null)
      setParticipantCount(0)
      setLastDeductedMinute(0) // Reset the minute tracker

      // Clear stored room data
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

  // Show torus immediately as loader instead of loading screen
  if (!mounted) {
    return (
      <div className="liquid-app">
        <TorusCanvas />
      </div>
    )
  }

  if (isInCall) {
    return (
      <div className="liquid-app">
        <TorusCanvas />
        {/* Logo - FIGMA RESPONSIVE */}
        <div className="figma-logo" onClick={() => handleSetDemoMode(false)}>Liquid Calling</div>

        {/* Try Demo Button - FIGMA RESPONSIVE */}
        {isDemoMode && (
          <button
            onClick={() => handleSetDemoMode(false)}
            className="figma-demo-button"
          >
            <span className="figma-button-text">Exit Demo</span>
          </button>
        )}

        {/* Connect Button - FIGMA RESPONSIVE */}
        <div className="figma-connect-button">
          <PrivyConnectButton />
        </div>

        {/* Main Card - FIGMA RESPONSIVE */}
        <div className="figma-main-card">
          {/* Demo Mode Banner - FIGMA RESPONSIVE */}
          {isDemoMode && !isConnected && (
            <div className="card-banner">
              <div className="figma-demo-icon">
                <svg width="10" height="12" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.00002 2V8.292C5.38869 8.7724 4.00412 9.81675 3.09948 11.2341C2.19485 12.6514 1.8306 14.347 2.07335 16.0108C2.3161 17.6746 3.14961 19.1954 4.42149 20.2952C5.69336 21.395 7.3186 22.0002 9.00002 22.0002C10.6814 22.0002 12.3067 21.395 13.5785 20.2952C14.8504 19.1954 15.6839 17.6746 15.9267 16.0108C16.1694 14.347 15.8052 12.6514 14.9005 11.2341C13.9959 9.81675 12.6113 8.7724 11 8.292V2" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 15H16" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5.5 2H12.5" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="card-banner-text">Demo Mode • No Billing • 10 Minute Test Mode</span>
            </div>
          )}

          {/* Connected Banner - FIGMA RESPONSIVE */}
          {isConnected && !isDemoMode && (
            <div className="card-banner-wallet">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m11 17 2 2a1 1 0 1 0 3-3"/>
                <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/>
                <path d="m21 3 1 11h-2"/>
                <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/>
                <path d="M3 4h8"/>
              </svg>
              <span>Connected</span>
              <div className="connected-circle">•</div>
              <span>Locked In</span>
            </div>
          )}

          {/* Content inside the glass card */}
          <div className="figma-main-card-content">
            {/* 1. Demo mode banner (already handled above) */}

            {/* 2. Minutes Balance Section - Show for connected users during calls */}
            {isConnected && !isDemoMode && (
              <div style={{ marginTop: '24px' }}>
                <PaymentUI
                  minutesBalance={minutesBalance}
                  buyMinutes={handleBuyMinutes}
                  isPurchasing={isPurchasing}
                  calculateMinutesFromDollars={calculateMinutesFromDollars}
                  currentNetwork={currentNetwork}
                  usdcBalance={usdcBalance}
                  supportedNetworks={supportedNetworks}
                  switchToNetwork={switchToNetwork}
                  cryptoReady={cryptoReady}
                  isNetworkSupported={isNetworkSupported}
                />
              </div>
            )}

            {/* 3. Timer (same height as "Room created!" status) */}
            <div className="figma-call-timer">
              {formatDuration(callDuration)}
            </div>

            {/* 4. Copy Room Link Button */}
            <button
              onClick={() => {
                if (callLink) {
                  navigator.clipboard.writeText(callLink)
                  alert('Room link copied!')
                }
              }}
              className="figma-copy-room-link"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
              </svg>
              <span>Copy Room Link</span>
            </button>

            {/* 5. End Call Button */}
            <button
              onClick={handleEndCall}
              className="call-action-button call-button--red"
            >
              <span className="figma-button-text">End Call</span>
            </button>

            {/* 7. In Room ~ 3 Participants */}
            <div className="figma-participant-count">
              In Room ~ {participantCount} Participant{participantCount !== 1 ? 's' : ''}
            </div>

            {/* Card Footer Messages */}
            {isDemoMode && (
              <div className="card-footer">
                <p className="card-footer-title">
                  Connect for Unlimited Use
                </p>
              </div>
            )}
          </div>
        </div>
        {/* App footer elements */}
        <div className="app-footer-left">
          Zero logs. Zero IP tracking. Zero stored data. True end-to-end encryption & HIPAA compliant. EU-US Data Privacy Framework certified.
        </div>
        <div className="app-copyright">
          LIQUIDCALLING ©2025
        </div>
      </div>
    )
  }


  // Show welcome/landing page for non-connected users
  if (!isConnected && !isDemoMode) {
    return (
      <div className="liquid-app">
        <TorusCanvas />
        {/* Logo - FIGMA RESPONSIVE */}
        <div className="figma-logo" onClick={() => window.location.reload()}>Liquid Calling</div>

        {/* Try Demo Button - FIGMA RESPONSIVE */}
        <button
          onClick={() => handleSetDemoMode(true)}
          className="figma-demo-button"
        >
          <span className="figma-button-text">Try Demo</span>
        </button>

        {/* Connect Button - FIGMA RESPONSIVE */}
        <div className="figma-connect-button">
          <PrivyConnectButton />
        </div>

        {/* Hero Title - FIGMA RESPONSIVE */}
        <h1 className="figma-hero-title">Call Anyone<br/>Privately<br/>With Your Wallet</h1>

        {/* Main CTA Button - FIGMA RESPONSIVE */}
        <button
          onClick={login}
          className="figma-cta-button"
        >
          <span className="figma-cta-text">Connect to start your call</span>
          <div className="figma-cta-icon">
            <svg width="20" height="16" viewBox="0 0 37 31" fill="none">
              <path d="M18.5 24.5V31" stroke="#010101" strokeWidth="2" strokeLinecap="round"/>
              <path d="M32 12V15.5C32 18.5 30.5 21.3 28 23.5C25.5 25.7 22 27 18.5 27C15 27 11.5 25.7 9 23.5C6.5 21.3 5 18.5 5 15.5V12" stroke="#010101" strokeWidth="2" strokeLinecap="round"/>
              <path d="M24 6C24 3 21.5 0.5 18.5 0.5C15.5 0.5 13 3 13 6V18C13 21 15.5 23.5 18.5 23.5C21.5 23.5 24 21 24 18V6Z" stroke="#010101" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </button>

        {/* Footer - FIGMA RESPONSIVE */}
        <div className="figma-footer-left">
          Zero logs. Zero IP tracking. Zero stored data. True end-to-end encryption & HIPAA compliant. EU-US Data Privacy Framework certified.
        </div>

        <div className="figma-footer-right">
          Pay 0.05 USDC per minute on HyperLiquid, Base, or your credit card. Speak freely. No KYC. No data collection. Just secure calls.
        </div>

        <div className="figma-copyright">
          LIQUIDCALLING ©2025
        </div>
      </div>
    )
  }

  // Show main app interface for connected users or demo mode
  return (
    <div className="liquid-app">
      <TorusCanvas />
      {/* Logo - FIGMA RESPONSIVE */}
      <div className="figma-logo" onClick={() => handleSetDemoMode(false)}>Liquid Calling</div>

      {/* Try Demo Button - FIGMA RESPONSIVE */}
      {isDemoMode && (
        <button
          onClick={() => handleSetDemoMode(false)}
          className="figma-demo-button"
        >
          <span className="figma-button-text">Exit Demo</span>
        </button>
      )}

      {/* Connect Button - FIGMA RESPONSIVE */}
      <div className="figma-connect-button">
        <PrivyConnectButton />
      </div>

      {/* Main Card - FIGMA RESPONSIVE */}
      <div className="figma-main-card">
        {/* Demo Mode Banner */}
        {isDemoMode && !isConnected && (
          <div className="card-banner">
            <div className="figma-demo-icon">
              <svg width="10" height="12" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.00002 2V8.292C5.38869 8.7724 4.00412 9.81675 3.09948 11.2341C2.19485 12.6514 1.8306 14.347 2.07335 16.0108C2.3161 17.6746 3.14961 19.1954 4.42149 20.2952C5.69336 21.395 7.3186 22.0002 9.00002 22.0002C10.6814 22.0002 12.3067 21.395 13.5785 20.2952C14.8504 19.1954 15.6839 17.6746 15.9267 16.0108C16.1694 14.347 15.8052 12.6514 14.9005 11.2341C13.9959 9.81675 12.6113 8.7724 11 8.292V2" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 15H16" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.5 2H12.5" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="card-banner-text">Demo Mode • No Billing • 10 Minute Test Mode</span>
          </div>
        )}

        {/* Connected Banner */}
        {isConnected && !isDemoMode && (
          <div className="card-banner-wallet">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m11 17 2 2a1 1 0 1 0 3-3"/>
              <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/>
              <path d="m21 3 1 11h-2"/>
              <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/>
              <path d="M3 4h8"/>
            </svg>
            <span>Connected</span>
            <div className="connected-circle">•</div>
            <span>Locked In</span>
          </div>
        )}

        {/* Content inside the glass card will go here */}
        <div className="figma-main-card-content">

          {/* Minutes Balance Section - Only show for connected users */}
          {isConnected && !isDemoMode && (
            <PaymentUI
              minutesBalance={minutesBalance}
              buyMinutes={handleBuyMinutes}
              isPurchasing={isPurchasing}
              calculateMinutesFromDollars={calculateMinutesFromDollars}
              currentNetwork={currentNetwork}
              usdcBalance={usdcBalance}
              supportedNetworks={supportedNetworks}
              switchToNetwork={switchToNetwork}
              cryptoReady={cryptoReady}
              isNetworkSupported={isNetworkSupported}
            />
          )}


          {/* Status */}
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
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                </svg>
                <span>Copy room link</span>
              </button>
            </div>
          )}

          {/* Mic Permission Button */}
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

          {/* Call Actions */}
          <div style={{ position: 'relative' }}>
            {!callLink ? (
              <button
                onClick={() => {
                  if (micPermission !== 'granted') {
                    setShowMicInstruction(true)
                  } else {
                    createCallLink()
                  }
                }}
                disabled={callStatus !== 'idle'}
                className="call-action-button call-button--white"
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
                className="call-action-button call-button--green"
              >
                <span className="figma-button-text">{callStatus === 'initializing' ? 'Joining room...' : 'Start Call'}</span>
              </button>
            )}

            {/* Mic Instruction Message */}
            {showMicInstruction && (
              <div className="figma-mic-instruction">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-icon">
                  <path d="M22 14a8 8 0 0 1-8 8"/>
                  <path d="M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/>
                  <path d="M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1"/>
                  <path d="M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10"/>
                  <path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>
                </svg>
                Press the microphone button to enable audio
              </div>
            )}
          </div>

          {/* Error Display */}
          {audioError && (
            <div className="figma-error-message">
              {audioError}
            </div>
          )}

          

          {/* Card Footer Messages */}
          {isDemoMode && (
            <div className="card-footer">
              <p className="card-footer-title">
                Connect for Unlimited Use
              </p>
            </div>
          )}

          {/* Wallet Connected Footer */}
          {isConnected && !isDemoMode && (
            <div className="card-footer-wallet">
              Unlimited Use
            </div>
          )}
        </div>
      </div>
      {/* App footer elements */}
      <div className="app-footer-left">
        Zero logs. Zero IP tracking. Zero stored data. True end-to-end encryption & HIPAA compliant. EU-US Data Privacy Framework certified.
      </div>
      <div className="app-copyright">
        LIQUIDCALLING ©2025
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <ErrorBoundary
      fallback={
        <div className="liquid-app">
          <TorusCanvas />
          <div className="figma-logo">Liquid Calling</div>
          <div className="figma-main-card">
            <div className="figma-main-card-content">
              <p>Voice calling temporarily unavailable</p>
              <p style={{ fontSize: '14px', opacity: 0.7, marginTop: '10px' }}>
                WebRTC not supported in this environment. Please try a different browser or device.
              </p>
            </div>
          </div>
        </div>
      }
    >
      <DailyProvider>
        <HomeContent />
      </DailyProvider>
    </ErrorBoundary>
  )
}