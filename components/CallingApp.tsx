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

        {/* Main Calling Interface */}
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          background: 'white',
          borderRadius: '12px',
          padding: '40px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="h3" style={{ marginBottom: '16px' }}>Start a Private Call</h2>
            <p className="text-body text-secondary">
              Enter a room name or have someone share their link with you
            </p>
          </div>

          <div style={{
            display: 'grid',
            gap: '30px',
            gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr'
          }}>
            {/* Demo Mode Option */}
            <div style={{
              padding: '30px',
              background: '#F8F9FA',
              borderRadius: '8px',
              border: '1px solid #E9ECEF'
            }}>
              <h3 className="text-body" style={{ fontWeight: 600, marginBottom: '16px' }}>
                🎯 Try Demo Mode
              </h3>
              <p className="text-body text-secondary" style={{ marginBottom: '20px' }}>
                Test the calling interface without using minutes
              </p>
              <button
                onClick={() => setIsDemoMode(true)}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                Start Demo Call
              </button>
            </div>

            {/* Real Call Option */}
            <div style={{
              padding: '30px',
              background: '#F8F9FA',
              borderRadius: '8px',
              border: '1px solid #E9ECEF'
            }}>
              <h3 className="text-body" style={{ fontWeight: 600, marginBottom: '16px' }}>
                📞 Start Real Call
              </h3>
              <div style={{ marginBottom: '20px' }}>
                <input
                  type="text"
                  placeholder="Enter room name or ID"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #D0D7DE',
                    borderRadius: '6px',
                    fontSize: '14px',
                    marginBottom: '12px'
                  }}
                />
                <p className="text-body text-secondary" style={{ fontSize: '12px' }}>
                  Leave empty to create a random room
                </p>
              </div>
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

          {/* Demo Mode Interface */}
          {isDemoMode && (
            <div style={{
              marginTop: '40px',
              padding: '30px',
              background: '#E8F5E8',
              borderRadius: '8px',
              border: '1px solid #C3E6C3'
            }}>
              <div style={{ textAlign: 'center' }}>
                <h3 className="text-body" style={{ fontWeight: 600, marginBottom: '16px' }}>
                  🎮 Demo Mode Active
                </h3>
                <p className="text-body text-secondary" style={{ marginBottom: '20px' }}>
                  Demo calling interface would appear here. In a full implementation, this would show:
                </p>
                <ul style={{ textAlign: 'left', marginBottom: '20px' }}>
                  <li>Voice controls (mute/unmute)</li>
                  <li>Room link sharing</li>
                  <li>Participant list</li>
                  <li>Call quality indicators</li>
                  <li>End call functionality</li>
                </ul>
                <button
                  onClick={() => setIsDemoMode(false)}
                  className="btn btn-secondary"
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
      </div>
    </>
  )
}