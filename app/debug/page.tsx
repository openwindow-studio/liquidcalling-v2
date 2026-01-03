'use client'

export default function DebugPage() {
  return (
    <div style={{
      position: 'relative',
      zIndex: 999,
      background: 'white',
      padding: '20px',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: 'black', fontSize: '24px' }}>Debug Page</h1>
      <p style={{ color: 'black' }}>If you can see this, the app is working.</p>
      <p style={{ color: 'black' }}>If the main page is blank, there's a CSS issue.</p>

      <div style={{
        background: 'red',
        color: 'white',
        padding: '10px',
        margin: '10px 0'
      }}>
        Red test box - should be visible
      </div>

      <button
        onClick={() => window.location.href = '/'}
        style={{
          background: 'blue',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Go to Main Page
      </button>

      {/* Test footer */}
      <div className="app-footer-left">
        DEBUG FOOTER TEST
      </div>
    </div>
  )
}