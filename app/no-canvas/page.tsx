'use client'

import { usePrivy } from '@privy-io/react-auth'
import { PrivyConnectButton } from '../../components/PrivyConnectButton'

export default function NoCanvasPage() {
  const { authenticated } = usePrivy()

  return (
    <div className="liquid-app" style={{ background: '#F1F1F5' }}>
      {/* No TorusCanvas - just test the UI */}

      {/* Logo */}
      <div className="figma-logo">Liquid Calling</div>

      {/* Connect Button */}
      <div className="figma-connect-button">
        <PrivyConnectButton />
      </div>

      {/* Main Card */}
      <div className="figma-main-card">
        <div className="figma-main-card-content">
          <h2 style={{ color: 'white', textAlign: 'center' }}>No Canvas Test</h2>
          <p style={{ color: 'white', textAlign: 'center' }}>
            {authenticated ? 'You are connected!' : 'Please connect your wallet'}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="app-footer-left">
        NO CANVAS TEST: Zero logs. Zero IP tracking. Fixed footer test.
      </div>
    </div>
  )
}