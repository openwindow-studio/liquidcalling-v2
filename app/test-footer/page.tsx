'use client'

import { PrivyConnectButton } from '../../components/PrivyConnectButton'

export default function TestFooterPage() {
  return (
    <div style={{ minHeight: '100vh', padding: '20px', background: '#f5f5f5' }}>
      <h1 style={{ marginBottom: '20px' }}>Footer Fix Test Page</h1>

      <div style={{ marginBottom: '20px' }}>
        <h2>Privy Modal Test</h2>
        <p>Click the connect button to test modal centering:</p>
        <div style={{
          width: '200px',
          height: '60px',
          background: 'rgba(165, 239, 255, 0.2)',
          border: '3px solid #FFFFFF',
          borderRadius: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <PrivyConnectButton />
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Document Height Check</h2>
        <button
          onClick={() => {
            const height = document.body.scrollHeight
            const viewport = window.innerHeight
            const docHeight = document.documentElement.scrollHeight
            alert(`Body Height: ${height}px\nViewport Height: ${viewport}px\nDocument Height: ${docHeight}px\n\nFixed footer should NOT extend document height.`)
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007acc',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Check Document Height
        </button>
      </div>

      <div style={{
        height: '100px',
        background: '#ddd',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        Some content that would normally push footer down
      </div>

      <div style={{
        height: '200px',
        background: '#eee',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        More content - footer should remain fixed at bottom
      </div>

      {/* Test footer - should be fixed at bottom */}
      <div className="app-footer-left">
        FIXED FOOTER TEST: Zero logs. Zero IP tracking. Fixed positioning test.
      </div>
    </div>
  )
}