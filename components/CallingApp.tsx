'use client'

import React, { useState } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'
import { PrivyConnectButton } from './PrivyConnectButton'
import { PaymentUI } from './PaymentUI'
import BrowserCompatibilityWarning from './BrowserCompatibilityWarning'

export function CallingApp() {
  const { ready, authenticated, user, logout } = usePrivy()
  const router = useRouter()
  const [recipient, setRecipient] = useState('')
  const [isDemoMode, setIsDemoMode] = useState(false)

  if (!ready) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#F1F1F5'
      }}>
        <div className="text-body">Loading...</div>
      </div>
    )
  }

  if (!authenticated) {
    router.push('/')
    return null
  }

  return (
    <>
      <BrowserCompatibilityWarning />
      <div style={{
        minHeight: '100vh',
        background: '#F1F1F5',
        padding: '20px'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px',
          maxWidth: '800px',
          margin: '0 auto 40px'
        }}>
          <div>
            <h1 className="h4">Liquid Calling</h1>
            <p className="text-body text-secondary">
              Welcome back, {user?.email?.toString() || 'User'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              onClick={() => router.push('/')}
              className="btn btn-outline"
            >
              ← Back to Home
            </button>
            <PrivyConnectButton />
          </div>
        </div>

        {/* Calling Card Interface */}
        <div style={{
          maxWidth: '420px',
          margin: '0 auto',
          background: 'white',
          borderRadius: '24px',
          padding: '0',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          border: '1px solid var(--color-border)'
        }}>
          {/* Header Section */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '32px',
            textAlign: 'center',
            color: 'white',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              fontSize: '12px',
              opacity: 0.8
            }}>
              Liquid Calling
            </div>
            <div style={{
              fontSize: '14px',
              opacity: 0.9,
              marginBottom: '8px'
            }}>
              Private Call Interface
            </div>
            <h2 className="h3" style={{ color: 'white', marginBottom: '16px' }}>
              Start Secure Call
            </h2>
            {/* Status Indicator */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.2)',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '12px'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#4ade80',
                animation: 'pulse 2s infinite'
              }}></div>
              End-to-End Encrypted
            </div>
          </div>

          {/* Main Content */}
          <div style={{ padding: '32px' }}>
            {/* Room Input */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: 600,
                marginBottom: '8px',
                color: 'var(--color-gray-dark)'
              }}>
                Room Name (Optional)
              </label>
              <input
                type="text"
                placeholder="Leave empty for random room"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                style={{
                  width: '100%',
                  padding: '16px',
                  border: '2px solid var(--color-border)',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontFamily: 'var(--font-geist)',
                  transition: 'border-color 0.2s ease',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--color-black)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--color-border)'
                }}
              />
            </div>

            {/* Call Actions */}
            <div style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '24px'
            }}>
              <button
                onClick={() => setIsDemoMode(true)}
                className="btn btn-outline"
                style={{
                  flex: 1,
                  padding: '16px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 600
                }}
              >
                Demo Mode
              </button>
              <button
                className="btn btn-primary"
                style={{
                  flex: 2,
                  padding: '16px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none'
                }}
                onClick={() => {
                  console.log('Starting call for:', recipient || 'random room')
                }}
              >
                Start Call
              </button>
            </div>

            {/* Payment Section */}
            <div style={{
              background: '#f8fafc',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid var(--color-border)'
            }}>
              <PaymentUI
                minutesBalance={0}
                buyMinutes={async (amount: string, method?: string) => {
                  console.log('Buying minutes:', amount, method)
                  console.log('Creating call for:', recipient || 'random room')
                }}
                isPurchasing={false}
                calculateMinutesFromDollars={(dollars: string) => Math.floor(parseFloat(dollars) / 0.05)}
                currentNetwork="BASE"
                usdcBalance="0.00"
                supportedNetworks={{ BASE: { name: 'Base', chainId: 8453 } }}
                switchToNetwork={async (network: any) => {
                  console.log('Switching to network:', network)
                  return true
                }}
                cryptoReady={false}
                isNetworkSupported={false}
              />
            </div>
          </div>

          {/* Footer */}
          <div style={{
            padding: '20px 32px',
            background: '#f8fafc',
            borderTop: '1px solid var(--color-border)',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              fontSize: '11px',
              color: 'var(--color-gray-medium)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                🔒 No Logs
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                🚫 No IPs
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                ⏰ 24h Expiry
              </div>
            </div>
          </div>
        </div>

        {/* Demo Mode Interface */}
        {isDemoMode && (
          <div style={{
            maxWidth: '420px',
            margin: '40px auto 0',
            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)',
            borderRadius: '24px',
            padding: '32px',
            border: '2px solid #e0e7ff',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(59, 130, 246, 0.1)',
                padding: '8px 16px',
                borderRadius: '20px',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#3b82f6',
                  animation: 'pulse 2s infinite'
                }}></div>
                Demo Mode Active
              </div>

              <h3 className="h4" style={{ marginBottom: '16px', color: '#1e40af' }}>
                Calling Interface Preview
              </h3>

              {/* Mock Call Interface */}
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '24px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ marginBottom: '20px' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    margin: '0 auto 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '24px',
                    fontWeight: 'bold'
                  }}>
                    {recipient || 'Demo'}
                  </div>
                  <p className="text-body" style={{ color: '#6b7280', marginBottom: '8px' }}>
                    {recipient || 'Demo Room'}
                  </p>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '12px',
                    color: '#10b981'
                  }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#10b981',
                      animation: 'pulse 2s infinite'
                    }}></div>
                    Encrypted Connection
                  </div>
                </div>

                {/* Mock Controls */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '16px',
                  marginBottom: '16px'
                }}>
                  {['🎤', '🔇', '📞'].map((icon, i) => (
                    <div key={i} style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: i === 2 ? '#ef4444' : '#f3f4f6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}>
                      {icon}
                    </div>
                  ))}
                </div>

                <p className="text-body text-secondary" style={{ fontSize: '11px' }}>
                  This simulates the actual calling interface with voice controls,
                  encrypted connection status, and call management.
                </p>
              </div>

              <button
                onClick={() => setIsDemoMode(false)}
                className="btn btn-outline"
                style={{
                  borderRadius: '12px',
                  padding: '12px 24px'
                }}
              >
                Exit Demo
              </button>
            </div>
          </div>
        )}

          {/* Features Info */}
          <div style={{ marginTop: '40px', borderTop: '1px solid #E9ECEF', paddingTop: '30px' }}>
            <h3 className="text-body" style={{ fontWeight: 600, marginBottom: '20px' }}>
              Your Privacy Features
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px'
            }}>
              <div>
                <h4 className="text-body" style={{ fontWeight: 600, marginBottom: '8px' }}>
                  🔒 End-to-End Encryption
                </h4>
                <p className="text-body text-secondary">
                  All calls are encrypted and private
                </p>
              </div>
              <div>
                <h4 className="text-body" style={{ fontWeight: 600, marginBottom: '8px' }}>
                  🚫 No Phone Numbers
                </h4>
                <p className="text-body text-secondary">
                  No personal info required
                </p>
              </div>
              <div>
                <h4 className="text-body" style={{ fontWeight: 600, marginBottom: '8px' }}>
                  ⏰ Ephemeral Rooms
                </h4>
                <p className="text-body text-secondary">
                  Rooms expire after 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}