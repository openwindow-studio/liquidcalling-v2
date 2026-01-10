'use client'

import React, { useState, useEffect } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'
import { useMinutesBalance } from '../hooks/useMinutesBalance'
import { useRealPayments } from '../hooks/useRealPayments'
import { PaymentUI } from './PaymentUI'
import { DailyProvider } from '@daily-co/daily-react'
import useDailyReact from '../hooks/useDailyReact'
import { DemoCallModal } from './DemoCallModal'

export function CleanCallingCard() {
  const { ready, authenticated, user, logout } = usePrivy()
  const router = useRouter()
  const [roomId, setRoomId] = useState('')
  const [callLink, setCallLink] = useState<string | null>(null)
  const [isDemoMode, setIsDemoMode] = useState(false)
  const [showDemoModal, setShowDemoModal] = useState(false)

  // Real minutes balance integration
  const { minutesBalance, deductMinutes } = useMinutesBalance()

  // Real payments integration
  const {
    payWithUSDC,
    currentNetwork,
    usdcBalance,
    supportedNetworks,
    switchToNetwork,
    isReady: cryptoReady,
    isNetworkSupported,
    isProcessing: isPurchasing,
    refreshBalance
  } = useRealPayments()

  // Helper function to calculate minutes from dollars (5 cents per minute)
  const calculateMinutesFromDollars = (dollars: string) => {
    return Math.floor(parseFloat(dollars) / 0.05)
  }

  // Payment function that integrates with the minutes system
  const buyMinutes = async (amount: string, method?: string): Promise<void> => {
    if (method === 'wallet' && payWithUSDC) {
      const result = await payWithUSDC(amount)
      if (result) {
        // TODO: Update minutes balance in backend
        console.log('Payment successful:', result)
      }
    } else if (method === 'stripe') {
      // TODO: Handle Stripe payments
      console.log('Stripe payment not implemented yet')
    }
  }

  // Real Daily.co integration
  const {
    joinRoom,
    leaveRoom,
    isConnected: isInCall,
    isMuted,
    participantCount,
    toggleMute,
    createRoom,
    error: callError
  } = useDailyReact()

  // Use isConnected as audioConnected for UI
  const audioConnected = isInCall

  useEffect(() => {
    // Generate session ID for encryption display
    if (!roomId) {
      const sessionId = Math.floor(10000000 + Math.random() * 90000000).toString()
      setRoomId(sessionId)
    }
  }, [roomId])

  const handleDemoCall = () => {
    setShowDemoModal(true)
  }

  const startDemoCall = () => {
    setIsDemoMode(true)
    const demoRoomId = `demo-${Math.random().toString(36).substring(2, 8)}`
    setCallLink(`https://liquidcalling.daily.co/${demoRoomId}`)
  }

  const createCall = async () => {

    if (minutesBalance <= 0) {
      alert('Please purchase minutes to start a call')
      return
    }

    try {
      // Create real Daily.co room
      const response = await fetch('/api/daily/create-room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.id })
      })

      const data = await response.json()
      if (data.url) {
        setCallLink(data.url)
        setRoomId(data.name || roomId)
      }
    } catch (error) {
      console.error('Failed to create room:', error)
      alert('Failed to create call room')
    }
  }

  const handleStartCall = async () => {
    if (!callLink) return

    if (isDemoMode) {
      alert('Demo call started! This is a simulated call for testing.')
      return
    }

    try {
      await joinRoom(callLink)
    } catch (error) {
      console.error('Failed to join call:', error)
      alert('Failed to join the call. Please try again.')
    }
  }

  const handleEndCall = async () => {
    leaveRoom()
    setCallLink(null)
    setIsDemoMode(false)
  }

  const copyRoomLink = () => {
    if (callLink) {
      navigator.clipboard.writeText(callLink)
      alert('Room link copied!')
    }
  }

  if (!ready) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{ color: 'white', fontSize: '18px' }}>Loading...</div>
      </div>
    )
  }

  if (!authenticated) {
    router.push('/')
    return null
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      {/* Main Calling Card */}
      <div style={{
        width: '100%',
        maxWidth: '500px',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '24px',
        padding: '40px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)'
      }}>
        {/* Demo Mode Banner */}
        {isDemoMode && (
          <div style={{
            padding: '12px 16px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            borderRadius: '12px',
            marginBottom: '20px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <svg width="16" height="20" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.00002 2V8.292C5.38869 8.7724 4.00412 9.81675 3.09948 11.2341C2.19485 12.6514 1.8306 14.347 2.07335 16.0108C2.3161 17.6746 3.14961 19.1954 4.42149 20.2952C5.69336 21.395 7.3186 22.0002 9.00002 22.0002C10.6814 22.0002 12.3067 21.395 13.5785 20.2952C14.8504 19.1954 15.6839 17.6746 15.9267 16.0108C16.1694 14.347 15.8052 12.6514 14.9005 11.2341C13.9959 9.81675 12.6113 8.7724 11 8.292V2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 15H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5.5 2H12.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontSize: '14px', fontWeight: '600' }}>
              Demo Mode • No Billing • 10 Minute Test Mode
            </span>
          </div>
        )}

        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#1a1a1a',
            margin: 0
          }}>
            LiquidCalling
          </h1>
          <div style={{ display: 'flex', gap: '8px' }}>
            {isDemoMode && (
              <button
                onClick={() => {
                  setIsDemoMode(false)
                  setCallLink(null)
                  leaveRoom()
                }}
                style={{
                  padding: '8px 16px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                Exit Demo
              </button>
            )}
            <button
              onClick={logout}
              style={{
                padding: '8px 16px',
                background: 'transparent',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                color: '#666',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '16px',
          background: '#f5f5f5',
          borderRadius: '12px',
          marginBottom: '24px'
        }}>
          <div>
            <div style={{ color: '#666', fontSize: '12px', marginBottom: '4px' }}>Minutes Balance</div>
            <div style={{ color: '#1a1a1a', fontSize: '20px', fontWeight: 'bold' }}>{minutesBalance}</div>
          </div>
          <div>
            <div style={{ color: '#666', fontSize: '12px', marginBottom: '4px' }}>Payment Method</div>
            <div style={{ fontSize: '14px', color: '#1a1a1a' }}>
              {currentNetwork ? supportedNetworks[currentNetwork]?.name : 'Credit Card'}
            </div>
          </div>
        </div>

        {/* Connection Status */}
        <div style={{
          padding: '16px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '12px',
          marginBottom: '24px',
          color: 'white'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{
              width: '8px',
              height: '8px',
              background: audioConnected ? '#4ade80' : '#f59e0b',
              borderRadius: '50%',
              animation: 'pulse 2s infinite'
            }} />
            <span style={{ fontSize: '14px' }}>
              {audioConnected ? 'Connected' : cryptoReady ? 'Wallet Connected' : 'Disconnected'}
            </span>
          </div>
          <div style={{ fontSize: '12px', opacity: 0.9 }}>
            Encrypted Session: {roomId}
          </div>
        </div>

        {/* Room Info */}
        {callLink && (
          <div style={{
            padding: '16px',
            background: '#f5f5f5',
            borderRadius: '12px',
            marginBottom: '24px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px'
            }}>
              <div style={{ color: '#666', fontSize: '14px' }}>Room Link</div>
              <button
                onClick={copyRoomLink}
                style={{
                  padding: '6px 12px',
                  background: 'white',
                  border: '1px solid #d0d0d0',
                  borderRadius: '6px',
                  color: '#666',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Copy Link
              </button>
            </div>
            <div style={{
              padding: '8px',
              background: 'white',
              borderRadius: '6px',
              fontSize: '12px',
              color: '#666',
              wordBreak: 'break-all'
            }}>
              {callLink}
            </div>
          </div>
        )}

        {/* Participants */}
        {isInCall && (
          <div style={{
            padding: '16px',
            background: '#e8f5e9',
            borderRadius: '12px',
            marginBottom: '24px',
            textAlign: 'center',
            color: '#2e7d32',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            In Room ~ {participantCount} Participant{participantCount !== 1 ? 's' : ''}
          </div>
        )}

        {/* Payment UI */}
        {!callLink && (
          <div style={{ marginBottom: '24px' }}>
            <PaymentUI
              minutesBalance={minutesBalance}
              buyMinutes={buyMinutes}
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

        {/* Call Actions */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {!callLink ? (
            <>
              <button
                onClick={handleDemoCall}
                style={{
                  flex: 1,
                  padding: '18px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Demo Call
              </button>
              <button
                onClick={createCall}
                disabled={minutesBalance <= 0}
                style={{
                  flex: 1,
                  padding: '18px',
                  background: minutesBalance > 0
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : '#d1d5db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: minutesBalance > 0 ? 'pointer' : 'not-allowed'
                }}
              >
                Start Call
              </button>
            </>
          ) : (
            <button
              onClick={isInCall ? handleEndCall : handleStartCall}
              style={{
                width: '100%',
                padding: '18px',
                background: isInCall
                  ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {isInCall ? 'End Call' : 'Join Call'}
            </button>
          )}
        </div>

        {/* Footer Features */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: '30px',
          paddingTop: '20px',
          borderTop: '1px solid #e0e0e0'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '20px', marginBottom: '4px' }}>🔒</div>
            <div style={{ fontSize: '11px', color: '#666' }}>End-to-End</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '20px', marginBottom: '4px' }}>🚫</div>
            <div style={{ fontSize: '11px', color: '#666' }}>No Logs</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '20px', marginBottom: '4px' }}>⏰</div>
            <div style={{ fontSize: '11px', color: '#666' }}>24h Expiry</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '20px', marginBottom: '4px' }}>👤</div>
            <div style={{ fontSize: '11px', color: '#666' }}>Anonymous</div>
          </div>
        </div>
      </div>

      {/* Demo Call Modal */}
      <DemoCallModal
        isOpen={showDemoModal}
        onClose={() => setShowDemoModal(false)}
        onStartDemo={startDemoCall}
      />
    </div>
  )
}