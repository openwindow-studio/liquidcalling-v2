'use client'

import { useState } from 'react'

const fontStyles = `
  @font-face {
    font-family: 'Starling';
    src: url('/Starling-Book.woff2') format('woff2'),
         url('/Starling-Book.woff') format('woff');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Starling';
    src: url('/Starling-Bold.woff2') format('woff2'),
         url('/Starling-Bold.woff') format('woff');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
`

export default function FontComparePage() {
  const [useStarling, setUseStarling] = useState(false)

  const currentFont = useStarling ? "'Starling', sans-serif" : "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif"

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: fontStyles }} />

      <div style={{
        padding: '40px',
        background: '#F1F1F5',
        minHeight: '100vh'
      }}>
        {/* Toggle Button */}
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <button
            onClick={() => setUseStarling(!useStarling)}
            style={{
              padding: '12px 24px',
              background: useStarling ? '#000' : '#007acc',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              fontFamily: currentFont
            }}
          >
            Currently: {useStarling ? 'Starling' : 'Britti Sans'}
          </button>
        </div>

        {/* Sample Content */}
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Logo */}
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            fontFamily: currentFont,
            marginBottom: '60px'
          }}>
            Liquid Calling
          </h1>

          {/* Hero Headline */}
          <h2 style={{
            fontSize: 'clamp(40px, 8vw, 80px)',
            fontWeight: '700',
            color: '#000000',
            letterSpacing: '-0.02em',
            fontFamily: currentFont,
            margin: '0 0 32px 0',
            lineHeight: '1.1'
          }}>
            Zero Knowledge Calls
          </h2>

          {/* Subtitle */}
          <p style={{
            fontSize: '20px',
            lineHeight: '32px',
            color: '#000000',
            fontFamily: currentFont,
            maxWidth: '600px',
            marginBottom: '60px',
            fontWeight: '400'
          }}>
            Crystal clear audio with no drops, distortion, or robotic artifacts. And your voice goes directly peer to peer with complete privacy - we never store or see anything.
          </p>

          {/* Section Headers */}
          <h3 style={{
            fontSize: 'clamp(32px, 6vw, 64px)',
            fontWeight: '700',
            color: '#000000',
            letterSpacing: '-0.02em',
            fontFamily: currentFont,
            marginTop: '80px',
            marginBottom: '40px'
          }}>
            Payment Options
          </h3>

          {/* Card Example */}
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '40px',
            marginBottom: '40px'
          }}>
            <h4 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#000000',
              fontFamily: currentFont,
              marginBottom: '16px'
            }}>
              Credit Card
            </h4>
            <p style={{
              fontSize: '15px',
              lineHeight: '24px',
              color: '#666666',
              fontFamily: currentFont,
              fontWeight: '400'
            }}>
              Pay directly with credit/debit card. Instant activation. Stripe-secured payments. Per-minute billing.
            </p>
          </div>

          {/* Button Examples */}
          <div style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
            <button style={{
              padding: '16px 32px',
              background: '#000',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              fontFamily: currentFont,
              cursor: 'pointer'
            }}>
              Start a Call
            </button>

            <button style={{
              padding: '16px 32px',
              background: 'transparent',
              color: '#000',
              border: '2px solid #000',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              fontFamily: currentFont,
              cursor: 'pointer'
            }}>
              Learn More
            </button>
          </div>

          {/* Small Text Examples */}
          <div style={{ marginTop: '60px' }}>
            <p style={{
              fontSize: '12px',
              fontWeight: '500',
              letterSpacing: '0.1em',
              color: '#666666',
              fontFamily: "var(--font-geist-mono), 'SF Mono', Monaco, monospace",
              textTransform: 'uppercase',
              marginBottom: '20px'
            }}>
              MONOSPACE TEXT (UNCHANGED)
            </p>

            <p style={{
              fontSize: '14px',
              lineHeight: '1.6',
              color: '#333',
              fontFamily: currentFont,
              fontWeight: '400'
            }}>
              Regular body text at 14px. Zero logs. Zero IP tracking. Zero stored data. True end-to-end encryption.
            </p>

            <p style={{
              fontSize: '10px',
              color: '#999',
              fontFamily: currentFont,
              marginTop: '20px',
              fontWeight: '400'
            }}>
              LIQUIDCALLING ©2025 - Footer text example
            </p>
          </div>

          {/* Character Comparison */}
          <div style={{
            marginTop: '80px',
            background: 'white',
            padding: '40px',
            borderRadius: '12px'
          }}>
            <h3 style={{
              fontFamily: currentFont,
              fontSize: '24px',
              marginBottom: '20px',
              fontWeight: '600'
            }}>
              Character Set Test
            </h3>
            <p style={{ fontFamily: currentFont, fontSize: '48px', letterSpacing: '0.1em', fontWeight: '400' }}>
              AaBbCcDdEeFfGg
            </p>
            <p style={{ fontFamily: currentFont, fontSize: '48px', letterSpacing: '0.1em', fontWeight: '700' }}>
              AaBbCcDdEeFfGg
            </p>
            <p style={{ fontFamily: currentFont, fontSize: '36px' }}>
              1234567890
            </p>
            <p style={{ fontFamily: currentFont, fontSize: '36px' }}>
              !@#$%^&*()
            </p>
          </div>
        </div>
      </div>
    </>
  )
}