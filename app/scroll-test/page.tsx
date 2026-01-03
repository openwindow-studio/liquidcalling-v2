'use client'

import { useEffect, useState } from 'react'

export default function ScrollTestPage() {
  const [pageHeight, setPageHeight] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(0)
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const updateMetrics = () => {
      setPageHeight(document.body.scrollHeight)
      setViewportHeight(window.innerHeight)
      setScrollPosition(window.scrollY)
    }

    updateMetrics()
    window.addEventListener('scroll', updateMetrics)
    window.addEventListener('resize', updateMetrics)

    return () => {
      window.removeEventListener('scroll', updateMetrics)
      window.removeEventListener('resize', updateMetrics)
    }
  }, [])

  return (
    <>
      {/* Force page to be taller than viewport */}
      <div style={{ minHeight: '200vh', background: '#F1F1F5', position: 'relative' }}>

        {/* Status panel */}
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'white',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          zIndex: 1000,
          fontSize: '14px'
        }}>
          <strong>Page Metrics:</strong>
          <div>Document Height: {pageHeight}px</div>
          <div>Viewport Height: {viewportHeight}px</div>
          <div>Scroll Position: {scrollPosition}px</div>
          <div>Can Scroll: {pageHeight > viewportHeight ? 'YES' : 'NO'}</div>
        </div>

        {/* Top section */}
        <div style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          background: 'linear-gradient(180deg, #F1F1F5 0%, #E0E0E0 100%)'
        }}>
          <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>Top of Page (100vh)</h1>
          <p style={{ fontSize: '20px' }}>Scroll down to see what's below the viewport</p>
          <div style={{ marginTop: '40px' }}>
            <button
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              style={{
                padding: '15px 30px',
                fontSize: '18px',
                background: '#007acc',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Scroll to Second Screen ↓
            </button>
          </div>
        </div>

        {/* Bottom section - BELOW THE FOLD */}
        <div style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          background: 'linear-gradient(180deg, #E0E0E0 0%, #FF6B6B 100%)'
        }}>
          <h1 style={{ fontSize: '48px', marginBottom: '20px', color: 'white' }}>BELOW THE FOLD</h1>
          <p style={{ fontSize: '24px', color: 'white' }}>This is the second viewport (100vh-200vh)</p>
          <p style={{ fontSize: '18px', color: 'white', marginTop: '20px' }}>
            If you can see this, the page IS scrollable!
          </p>

          <div style={{ marginTop: '40px' }}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{
                padding: '15px 30px',
                fontSize: '18px',
                background: 'white',
                color: '#FF6B6B',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Back to Top ↑
            </button>
          </div>

          {/* Check for any absolutely positioned elements */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'black',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px'
          }}>
            Absolute positioned element at bottom: {pageHeight - viewportHeight}px below viewport
          </div>
        </div>

        {/* All footer types to see what shows where */}
        <div className="privacy-footer">
          [PRIVACY FOOTER - Fixed]
        </div>

        <div className="landing-footer-privacy">
          [LANDING PRIVACY - Fixed Left]
        </div>

        <div className="landing-footer-pricing">
          [LANDING PRICING - Fixed Right]
        </div>
      </div>

      {/* Extra content after the main div */}
      <div style={{
        height: '500px',
        background: 'purple',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px'
      }}>
        EXTRA CONTENT OUTSIDE MAIN DIV - If you see this purple section, there's content after the main container!
      </div>
    </>
  )
}