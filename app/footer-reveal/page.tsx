'use client'

import { useState } from 'react'

export default function FooterRevealPage() {
  const [pushAmount, setPushAmount] = useState(0)

  return (
    <div style={{ minHeight: '100vh', background: '#F1F1F5' }}>
      <div style={{ padding: '20px' }}>
        <h1>Footer Reveal Test</h1>
        <p>Click buttons to push content down and reveal what's below:</p>

        <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
          <button
            onClick={() => setPushAmount(0)}
            style={{ padding: '10px 20px', background: '#007acc', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Reset (0px)
          </button>
          <button
            onClick={() => setPushAmount(200)}
            style={{ padding: '10px 20px', background: '#007acc', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Push 200px
          </button>
          <button
            onClick={() => setPushAmount(500)}
            style={{ padding: '10px 20px', background: '#007acc', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Push 500px
          </button>
          <button
            onClick={() => setPushAmount(1000)}
            style={{ padding: '10px 20px', background: '#007acc', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Push 1000px
          </button>
        </div>

        <div style={{
          height: `${pushAmount}px`,
          background: 'rgba(255, 0, 0, 0.1)',
          border: '2px dashed red',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'height 0.3s ease'
        }}>
          {pushAmount > 0 && <span>Spacer: {pushAmount}px</span>}
        </div>
      </div>

      {/* Test what footers are showing */}
      <div style={{
        position: 'fixed',
        bottom: '100px',
        right: '20px',
        background: 'white',
        padding: '10px',
        border: '2px solid black',
        fontSize: '12px',
        maxWidth: '300px'
      }}>
        <strong>Footer Detection:</strong>
        <div>app-footer-left: {document.querySelectorAll('.app-footer-left').length} found</div>
        <div>figma-footer-left: {document.querySelectorAll('.figma-footer-left').length} found</div>
        <div>figma-footer-right: {document.querySelectorAll('.figma-footer-right').length} found</div>
        <div>Current scroll: {window.pageYOffset}px</div>
      </div>

      {/* Regular footer */}
      <div className="app-footer-left">
        APP FOOTER: Zero logs. Zero IP tracking.
      </div>

      {/* Figma footers */}
      <div className="figma-footer-left">
        FIGMA LEFT FOOTER: Should this be visible?
      </div>

      <div className="figma-footer-right">
        FIGMA RIGHT FOOTER: Pay 0.05 USDC per minute...
      </div>
    </div>
  )
}