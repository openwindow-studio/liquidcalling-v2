'use client'

import { useState, useEffect } from 'react'

export default function BrowserCompatibilityWarning() {
  const [showWarning, setShowWarning] = useState(false)
  const [browserName, setBrowserName] = useState('')

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    const isArc = userAgent.includes('arc')
    const isBrave = navigator.brave !== undefined

    if (isArc) {
      setBrowserName('Arc')
      setShowWarning(true)
    } else if (isBrave) {
      setBrowserName('Brave')
      setShowWarning(true)
    }
  }, [])

  if (!showWarning) return null

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: 'rgba(255, 255, 255, 0.95)',
      border: '2px solid #FFA500',
      borderRadius: '12px',
      padding: '16px 20px',
      maxWidth: '320px',
      zIndex: 9999,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '8px'
      }}>
        <div style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#FF8C00',
          fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif"
        }}>
          {browserName} Browser Detected
        </div>
        <button
          onClick={() => setShowWarning(false)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            padding: '0',
            color: '#666'
          }}
        >
          ×
        </button>
      </div>
      <div style={{
        fontSize: '13px',
        lineHeight: '1.4',
        color: '#333',
        fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif"
      }}>
        If you experience SSL or connection issues, try:
        <br />
        • Disabling {browserName} Shields/blocking
        <br />
        • Using Chrome or Safari
        <br />
        • Hard refresh (Cmd+Shift+R)
      </div>
    </div>
  )
}