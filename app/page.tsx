'use client'

import { usePrivy } from '@privy-io/react-auth'
import React, { useState, useEffect, useRef } from 'react'
import { DailyProvider, useDaily } from '@daily-co/daily-react'
import useDailyReact from '../hooks/useDailyReact'
import { useMinutesBalance } from '../hooks/useMinutesBalance'
import { useRealPayments } from '../hooks/useRealPayments'
import { useServerValidation } from '../hooks/useServerValidation'
import { PrivyConnectButton } from '../components/PrivyConnectButton'
import { PaymentUI } from '../components/PaymentUI'
import dynamic from 'next/dynamic'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { Footer } from '../components/Footer'
import { Footer as Footer2 } from '../components/Footer2'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Mic,
  Lock,
  Headphones,
  CreditCard,
  Wallet,
  Code2,
  Shield,
  ArrowRight,
  CheckCircle,
  Users,
  Phone,
  Eye
} from 'lucide-react'
import BrowserCompatibilityWarning from '../components/BrowserCompatibilityWarning'

const TorusCanvas = dynamic(() => import('../components/TorusCanvas'), { ssr: false })

// Splash Outline2 Sections Component
function SplashOutline2Sections() {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1150)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const glassStyle = {
    background: 'radial-gradient(90.16% 143.01% at 15.32% 21.04%, rgba(165, 239, 255, 0.2) 0%, rgba(110, 191, 244, 0.0447917) 77.08%, rgba(70, 144, 213, 0) 100%)',
    border: '5px solid #FFFFFF',
    borderRadius: '59px',
    backdropFilter: 'blur(40px)',
    backgroundBlendMode: 'overlay, normal'
  }

  const glassCardStyle = {
    background: 'radial-gradient(90.16% 143.01% at 15.32% 21.04%, rgba(165, 239, 255, 0.2) 0%, rgba(110, 191, 244, 0.0447917) 77.08%, rgba(70, 144, 213, 0) 100%)',
    backdropFilter: 'blur(40px)',
    borderRadius: '32px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    backgroundBlendMode: 'overlay, normal'
  }

  return (
    <>
      <BrowserCompatibilityWarning />
      {/* 1. Zero Knowledge Calls Section */}
      <section style={{
        padding: '160px 20px 100px 20px',
        background: 'transparent',
        position: 'relative',
        minHeight: '800px',
        zIndex: 10
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative'
        }}>
          {/* Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '100px',
            position: 'relative'
          }}>
            {/* ASCII Art Background */}
            <pre style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: 'clamp(4px, 2vw, 12px)',
              lineHeight: '1.2',
              color: 'rgba(0, 0, 0, 0.08)',
              fontFamily: 'monospace',
              whiteSpace: 'pre',
              zIndex: 0,
              pointerEvents: 'none',
              letterSpacing: '0'
            }}>
{`
                ▒▒░░░░  ░░░░░░░░░░░░▒▒▒▒
            ▒▒▒▒░░░░░░░░▒▒▓▓██▓▓██▒▒░░  ░░▒▒░░
        ░░▒▒  ░░      ▒▒████████████████▒▒  ░░▒▒
        ▓▓  ░░░░    ▒▒▒▒      ░░▒▒▒▒▓▓████▓▓  ░░▒▒
      ██░░  ░░    ░░                  ░░▓▓██▓▓  ░░▒▒
    ▓▓░░  ░░                              ░░▓▓▒▒  ░░▒▒
  ░░██    ░░                                ░░░░░░  ▒▒░░
  ▓▓▓▓  ░░  ░░                                  ░░    ▓▓
  ▓▓░░  ▒▒░░                                      ░░  ░░▓▓
  ░░░░  ▒▒░░                                        ░░  ▒▒
    ░░  ▒▒▒▒                                        ░░░░░░░░░░░░░░
    ░░  ░░▓▓                                    ░░░░░░░░░░░░░░░░░░░░
  ░░      ▓▓░░                      ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
  ░░  ░░  ░░▓▓            ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
  ░░    ░░  ▒▒░░░░    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
        ░░▒▒▒▒▒▒░░          ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒░░░░░░░░
    ░░  ░░▒▒▒▒▒▒▒▒              ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒░░░░░░
    ░░    ▒▒▒▒▒▒▒▒░░              ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒░░░░
    ░░    ░░▒▒▒▒▒▒▒▒                ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒░░░░░░
  ░░        ▒▒▒▒▒▒▒▒░░                    ░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒░░▒▒
  ░░        ░░▒▒▒▒▒▒▒▒                          ░░░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒░░
░░░░░░      ░░▒▒▒▒▒▒▒▒░░                ░░░░░░░░          ░░░░░░░░░░░░▒▒▒▒▒▒▒▒
░░░░░░░░      ░░▒▒▒▒▒▒▒▒        ░░░░░░░░            ░░  ░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒░░
░░░░░░        ░░▒▒▒▒▒▒▒▒░░    ░░        ░░      ░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒
  ░░░░░░        ▒▒▓▓▒▒▒▒░░      ░░░░░░░░░░  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒░░
  ░░░░░░        ░░▒▒▒▒▒▒▒▒      ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒
  ░░░░░░        ░░▒▒▒▒▒▒▒▒░░    ░░░░░░  ░░░░░░░░  ░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒
  ░░░░░░          ▒▒▒▒▒▒▒▒░░      ░░░░      ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▓▓▒▒
    ░░░░░░        ░░▓▓▒▒▒▒▒▒░░      ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▓▓░░
    ░░░░░░          ▒▒▓▓▒▒▒▒░░    ░░░░    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▓▓▒▒
    ░░░░░░░░        ░░▓▓▒▒▒▒▒▒░░        ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▓▓▒▒
      ░░░░░░░░      ░░▒▒▓▓▒▒▒▒░░  ░░    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒▓▓
      ░░░░░░░░░░      ░░▓▓▓▓▒▒▒▒░░      ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒░░▒▒▒▒▓▓▒▒
        ░░░░░░░░      ░░▒▒▓▓▒▒▒▒░░        ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▓▓░░
        ▒▒░░░░░░░░░░    ▒▒▓▓▓▓▒▒▒▒░░      ░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▒▒▓▓
        ░░░░░░░░░░░░░░  ░░▓▓▓▓▒▒▒▒░░        ░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓░░
          ▒▒░░░░░░░░░░    ▒▒▓▓▓▓▒▒░░        ░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓
          ░░░░░░░░░░░░░░  ░░▓▓▓▓▒▒▒▒░░░░░░▒▒▒▒▒▒▒▒▒▒░░▒▒▒▒▒▒▒▒▒▒▒▒▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓
            ▒▒░░░░░░░░░░  ░░▒▒▓▓▓▓▒▒▒▒▒▒▒▒▒▒░░▒▒▒▒▒▒▒▒▒▒▒▒▓▓▒▒▒▒▓▓▓▓▒▒░░▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓
            ░░▒▒░░░░░░░░░░  ░░▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▒▒▒▒▒▒▒▒▓▓░░░░▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓░░
              ▒▒░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▓▓▒▒▒▒▓▓▓▓▒▒░░░░▒▒▒▒░░░░▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓
              ▒▒▒▒░░░░░░░░░░░░▒▒▒▒▒▒▓▓▓▓▓▓░░░░▒▒▒▒▒▒░░▓▓▓▓▒▒░░▒▒▓▓▓▓▒▒▒▒▒▒▒▒▓▓▒▒▓▓▓▓▓▓▓▓▓▓
              ░░▒▒░░░░░░░░░░▒▒▒▒▒▒░░▓▓▓▓▒▒░░░░▓▓▓▓▒▒░░██▒▒▒▒▒▒██▓▓▓▓▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▒▒▓▓
                ▒▒░░░░░░░░▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓░░▒▒▒▒▓▓▒▒▒▒▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓██▓▓▓▓▒▒▒▒▓▓
                ░░▒▒░░░░▒▒▓▓▒▒▓▓▒▒▓▓▒▒▓▓▒▒▒▒▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒░░░░
                  ▒▒░░▒▒▓▓▒▒▒▒▓▓▒▒██▓▓▓▓▒▒▒▒▓▓▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▒▒▒▒▓▓▒▒░░
                  ▒▒▒▒▓▓▓▓▒▒▒▒▒▒▓▓▓▓▓▓▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░
                  ░░▒▒▓▓██▓▓▒▒▒▒▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒░░
                    ▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░
                    ░░▓▓▓▓▓▓▓▓▓▓▒▒▒▒▓▓▒▒░░
                      ▒▒▓▓▓▓▒▒▓▓▒▒`}
            </pre>

            <div style={{
              fontSize: '14px',
              fontWeight: '500',
              letterSpacing: '0.1em',
              color: '#666666',
              marginBottom: '20px',
              fontFamily: "var(--font-geist-mono), 'SF Mono', Monaco, monospace",
              textTransform: 'uppercase',
              position: 'relative',
              zIndex: 1
            }}>
              WHY LIQUID CALLING?
            </div>
            <h2 style={{
              fontSize: 'clamp(40px, 8vw, 80px)',
              fontWeight: '700',
              color: '#000000',
              letterSpacing: '-0.02em',
              fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif",
              margin: '0 0 32px 0',
              position: 'relative',
              zIndex: 1
            }}>
              Zero Knowledge Calls
            </h2>
            <div style={{
              fontSize: '20px',
              lineHeight: '32px',
              color: '#000000',
              fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif",
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Crystal clear audio with no drops, distortion, or robotic artifacts. And your voice goes directly peer to peer with complete privacy - we never store or see anything.
            </div>
          </div>

          {/* Polished Diagram */}
          <div style={{
            width: '100%',
            height: '300px',
            background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8))',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            color: '#ffffff',
            marginBottom: '100px',
            fontFamily: 'monospace',
            position: 'relative',
            overflow: 'hidden'
          } as React.CSSProperties}>
            {/* Terminal-style ASCII diagram */}
            <pre style={{
              color: '#ffffff',
              fontSize: isMobile ? '8px' : '14px',
              lineHeight: '1.3',
              textAlign: 'center',
              margin: 0,
              whiteSpace: 'pre'
            }}>
{`+─────────────────+       +─────────────────+       +─────────────────+
|   USER BROWSER  |       | EPHEMERAL ROOMS |       |   PEER BROWSER  |
|                 |       |                 |       |                 |
|  [*] E2E WEBRTC | <---> |   [X] 24h TTL   | <---> |  [*] E2E WEBRTC |
|                 |       |                 |       |                 |
| Status: CONN    |       |  No logs stored |       | Status: CONN    |
+─────────────────+       +─────────────────+       +─────────────────+`}
            </pre>
          </div>

          {/* CTA Section */}
          <div style={{
            textAlign: 'center'
          }}>
            <button
              onClick={() => router.push('/')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '16px 48px',
                backgroundColor: 'rgba(0, 0, 31, 0.9)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                margin: '0 auto'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 31, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <Phone size={18} />
              Start Calling
            </button>
          </div>
        </div>
      </section>

      {/* 2. Payment Options Section */}
      <section style={{
        padding: '120px 20px',
        background: '#E8E8ED'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          marginBottom: '80px',
          position: 'relative'
        }}>
          {/* ASCII Art Background - Payment Options */}
          <pre style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 'clamp(2px, 0.8vw, 6px)',
            lineHeight: '1',
            color: 'rgba(0, 0, 0, 0.08)',
            fontFamily: 'monospace',
            whiteSpace: 'pre',
            zIndex: 0,
            pointerEvents: 'none',
            letterSpacing: '0',
            overflow: 'hidden',
            width: '100%',
            textAlign: 'center'
          }}>
{`                                                                                          ░░░░
                                                                                  ░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒
                                                                            ░░▒▒▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▒▒░░
                                                                        ░░▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒░░
                                                                  ▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░
                                                      ░░▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░
                                              ░░▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒░░
                                    ░░░░▒▒▒▒▒▒▒▒▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒░░
                            ░░▒▒▒▒▒▒▒▒▒▒▓▓▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
                    ░░▒▒▒▒▒▒▒▒▓▓▒▒▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒░░
              ░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒░░
          ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒░░
      ░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒░░
      ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    ▒▒▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒
  ▒▒▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒
  ▒▒▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
    ▒▒▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒`}
          </pre>
          <div style={{
            fontSize: '12px',
            fontWeight: '500',
            letterSpacing: '0.1em',
            color: '#666666',
            marginBottom: '20px',
            fontFamily: "var(--font-geist-mono), 'SF Mono', Monaco, monospace",
            textTransform: 'uppercase',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1
          }}>
            PAY JUST 5 CENTS PER MINUTE
          </div>
          <h2 style={{
            fontSize: 'clamp(32px, 6vw, 64px)',
            fontWeight: '700',
            color: '#000000',
            letterSpacing: '-0.02em',
            fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif",
            textAlign: 'center',
            position: 'relative',
            zIndex: 1
          }}>
            Payment Options
          </h2>
        </div>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '24px' : '40px'
        }}>
          {/* Credit Card */}
          <div style={{
            background: 'radial-gradient(90.16% 143.01% at 15.32% 21.04%, #F4FBFE 0%, rgba(244, 251, 254, 0.5) 77.08%, rgba(244, 251, 254, 0) 100%)',
            backdropFilter: 'blur(40px)',
            borderRadius: '32px',
            border: '5px solid #FFFFFF',
            padding: '40px',
            position: 'relative'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div style={{
                background: '#000000',
                borderRadius: '50%',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CreditCard size={20} color="#FFFFFF" />
              </div>
              <h3 style={{
                fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: '600',
                fontSize: '20px',
                color: '#000000',
                margin: 0
              }}>
                Credit Card
              </h3>
            </div>
            <p style={{
              fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: '15px',
              lineHeight: '24px',
              color: '#666666',
              margin: 0
            }}>
              Pay directly with credit/debit card. Instant activation, no wallet required. Stripe-secured payments. Per-minute billing.
            </p>
          </div>

          {/* Wallet */}
          <div style={{
            background: 'radial-gradient(90.16% 143.01% at 15.32% 21.04%, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.8) 77.08%, rgba(0, 0, 0, 0.6) 100%)',
            backdropFilter: 'blur(40px)',
            borderRadius: '32px',
            border: '5px solid #FFFFFF',
            padding: '40px',
            position: 'relative'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div style={{
                background: '#FFFFFF',
                borderRadius: '50%',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Wallet size={20} color="#000000" />
              </div>
              <h3 style={{
                fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: '600',
                fontSize: '20px',
                color: '#FFFFFF',
                margin: 0
              }}>
                Wallet
              </h3>
            </div>
            <p style={{
              fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: '15px',
              lineHeight: '24px',
              color: '#CCCCCC',
              margin: 0
            }}>
              Connect wallet (Hyperliquid, Base, etc.). Pay with USDC or supported tokens. True pseudonymity. Auto-deduct from balance.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Comparison Chart Section */}
      <section style={{
        padding: '120px 20px',
        background: '#F1F1F5'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            background: '#1a1a1a',
            borderRadius: '24px',
            padding: '48px',
            overflow: 'hidden'
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '400',
              color: '#c5dde0',
              fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif",
              marginBottom: '48px',
              margin: '0 0 48px 0'
            }}>
              Liquid Calling in Comparison
            </h2>

            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '14px',
                color: '#FFFFFF'
              }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>
                    <th style={{
                      textAlign: 'left',
                      padding: '16px 20px',
                      fontWeight: '400',
                      fontFamily: "var(--font-geist-mono), 'SF Mono', Monaco, monospace",
                      color: '#c5dde0'
                    }}>
                      Feature
                    </th>
                    {!isMobile && (
                      <th style={{
                        textAlign: 'left',
                        padding: '16px 20px',
                        fontWeight: '400',
                        fontFamily: "var(--font-geist-mono), 'SF Mono', Monaco, monospace",
                        color: '#c5dde0'
                      }}>
                        Signal
                      </th>
                    )}
                    {!isMobile && (
                      <th style={{
                        textAlign: 'left',
                        padding: '16px 20px',
                        fontWeight: '400',
                        fontFamily: "var(--font-geist-mono), 'SF Mono', Monaco, monospace",
                        color: '#c5dde0'
                      }}>
                        Telegram/WhatsApp/Zoom
                      </th>
                    )}
                    <th style={{
                      textAlign: 'left',
                      padding: '16px 20px',
                      fontWeight: '400',
                      fontFamily: "var(--font-geist-mono), 'SF Mono', Monaco, monospace",
                      color: '#c5dde0'
                    }}>
                      Liquid Calling
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Requires phone number', 'Yes (mandatory)', 'Yes', 'Never'],
                    ['Subpoena can reveal identity', 'Yes (phone + last login)', 'Yes (everything)', 'No data exists'],
                    ['Can prove a call happened', 'Yes (metadata)', 'Yes', 'No'],
                    ['Burner identity in < 30 s', 'Impossible', 'Impossible', 'Yes – new wallet or incognito tab'],
                    ['Anonymous call in 5 clicks', 'No', 'No', 'Yes'],
                    ['Runs in any browser, no install', 'No', 'No', 'Yes']
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: i < 5 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none' }}>
                      <td style={{
                        padding: '16px 20px',
                        fontWeight: '400',
                        fontFamily: "var(--font-geist-mono), 'SF Mono', Monaco, monospace",
                        color: '#c2d9dc'
                      }}>
                        {row[0]}
                      </td>
                      {!isMobile && (
                        <td style={{
                          padding: '16px 20px',
                          fontFamily: "var(--font-geist-mono), 'SF Mono', Monaco, monospace",
                          fontWeight: '400',
                          color: '#7f7f7f'
                        }}>
                          {row[1]}
                        </td>
                      )}
                      {!isMobile && (
                        <td style={{
                          padding: '16px 20px',
                          fontFamily: "var(--font-geist-mono), 'SF Mono', Monaco, monospace",
                          fontWeight: '400',
                          color: '#7f7f7f'
                        }}>
                          {row[2]}
                        </td>
                      )}
                      <td style={{
                        padding: '16px 20px',
                        fontWeight: '400',
                        fontFamily: "var(--font-geist-mono), 'SF Mono', Monaco, monospace",
                        color: '#c2d9dc'
                      }}>
                        {row[3]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Perfect For Section */}
      <section style={{
        padding: '80px 20px 120px 20px',
        background: '#f5f5f5',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          marginBottom: '80px',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: 'clamp(32px, 6vw, 48px)',
            fontWeight: '700',
            color: '#333333',
            letterSpacing: '-0.01em',
            fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif"
          }}>
            Perfect For
          </h2>
        </div>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: isMobile ? '16px' : '32px'
        }}>
          {/* Sensitive Business Calls */}
          <div style={{
            ...glassCardStyle,
            padding: isMobile ? '20px' : '32px',
            textAlign: 'left'
          }}>
            <h3 style={{
              fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif",
              fontStyle: 'normal',
              fontWeight: '600',
              fontSize: '18px',
              lineHeight: '24px',
              letterSpacing: '0.02em',
              color: '#333333',
              margin: '0 0 16px 0'
            }}>
              Sensitive Business Calls
            </h3>
            <p style={{
              fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif",
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: '15px',
              lineHeight: '24px',
              letterSpacing: '0.01em',
              color: '#333333',
              margin: 0
            }}>
              Discuss deals, strategy, or confidential matters without surveillance risk
            </p>
          </div>

          {/* Medical Consultations */}
          <div style={{
            ...glassCardStyle,
            padding: isMobile ? '20px' : '32px',
            textAlign: 'left'
          }}>
            <h3 style={{
              fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif",
              fontStyle: 'normal',
              fontWeight: '600',
              fontSize: '18px',
              lineHeight: '24px',
              letterSpacing: '0.02em',
              color: '#333333',
              margin: '0 0 16px 0'
            }}>
              Medical Consultations
            </h3>
            <p style={{
              fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif",
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: '15px',
              lineHeight: '24px',
              letterSpacing: '0.01em',
              color: '#333333',
              margin: 0
            }}>
              Privacy-focused infrastructure for protected health conversations
            </p>
          </div>

          {/* Legal Discussions */}
          <div style={{
            ...glassCardStyle,
            padding: isMobile ? '20px' : '32px',
            textAlign: 'left'
          }}>
            <h3 style={{
              fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif",
              fontStyle: 'normal',
              fontWeight: '600',
              fontSize: '18px',
              lineHeight: '24px',
              letterSpacing: '0.02em',
              color: '#333333',
              margin: '0 0 16px 0'
            }}>
              Legal Discussions
            </h3>
            <p style={{
              fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif",
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: '15px',
              lineHeight: '24px',
              letterSpacing: '0.01em',
              color: '#333333',
              margin: 0
            }}>
              Attorney-client privilege with no recording or metadata
            </p>
          </div>

          {/* Personal Privacy */}
          <div style={{
            ...glassCardStyle,
            padding: isMobile ? '20px' : '32px',
            textAlign: 'left'
          }}>
            <h3 style={{
              fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif",
              fontStyle: 'normal',
              fontWeight: '600',
              fontSize: '18px',
              lineHeight: '24px',
              letterSpacing: '0.02em',
              color: '#333333',
              margin: '0 0 16px 0'
            }}>
              Personal Privacy
            </h3>
            <p style={{
              fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif",
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: '15px',
              lineHeight: '24px',
              letterSpacing: '0.01em',
              color: '#333333',
              margin: 0
            }}>
              Keep personal conversations truly personal, away from data harvesting
            </p>
          </div>

          {/* OTC Trading */}
          <div style={{
            ...glassCardStyle,
            padding: isMobile ? '20px' : '32px',
            textAlign: 'left'
          }}>
            <h3 style={{
              fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif",
              fontStyle: 'normal',
              fontWeight: '600',
              fontSize: '18px',
              lineHeight: '24px',
              letterSpacing: '0.02em',
              color: '#333333',
              margin: '0 0 16px 0'
            }}>
              OTC Trading
            </h3>
            <p style={{
              fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif",
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: '15px',
              lineHeight: '24px',
              letterSpacing: '0.01em',
              color: '#333333',
              margin: 0
            }}>
              Coordinate large block trades and discuss pricing without surveillance
            </p>
          </div>

          {/* Accountants */}
          <div style={{
            ...glassCardStyle,
            padding: isMobile ? '20px' : '32px',
            textAlign: 'left'
          }}>
            <h3 style={{
              fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif",
              fontStyle: 'normal',
              fontWeight: '600',
              fontSize: '18px',
              lineHeight: '24px',
              letterSpacing: '0.02em',
              color: '#333333',
              margin: '0 0 16px 0'
            }}>
              Accountants
            </h3>
            <p style={{
              fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif",
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: '15px',
              lineHeight: '24px',
              letterSpacing: '0.01em',
              color: '#333333',
              margin: 0
            }}>
              Discuss sensitive financial matters and client information with complete confidentiality
            </p>
          </div>
        </div>

      </section>

      {/* 5. Our Privacy Architecture Section - Grey Container with Legs */}
      <section style={{
        padding: '0',
        background: '#f5f5f5',
        position: 'relative'
      }}>
        {/* Left leg */}
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 'calc((100% - 1400px) / 2 + 100px)',
          height: '100px',
          background: '#f5f5f5'
        }} />

        {/* Right leg */}
        <div style={{
          position: 'absolute',
          right: 0,
          top: 0,
          width: 'calc((100% - 1400px) / 2 + 100px)',
          height: '100px',
          background: '#f5f5f5'
        }} />

        {/* White inner container with rounded top corners */}
        <div style={{
          padding: isMobile ? '120px 20px 30px 20px' : '120px 20px 80px 20px',
          maxWidth: '1400px',
          margin: '0 auto',
          background: '#fff',
          borderRadius: '100px 100px 0 0',
          position: 'relative',
          minHeight: isMobile ? '620px' : '850px'
        }}>
        {!isMobile ? (
          <>
            {/* Desktop Layout */}
            {/* Title on the left */}
            <h1 style={{
              position: 'absolute',
              width: '480px',
              height: '160px',
              left: '50%',
              top: '100px',
              transform: 'translateX(-530px)',
              fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif",
              fontStyle: 'normal',
              fontWeight: '700',
              fontSize: '72px',
              lineHeight: '76px',
              textAlign: 'left',
              color: '#000000',
              letterSpacing: '-0.02em'
            }}>
              Our Privacy Architecture
            </h1>

            {/* END-TO-END ENCRYPTED label */}
            <div style={{
              position: 'absolute',
              width: '286px',
              height: '20px',
              left: '680px',
              top: '140px',
              fontFamily: "var(--font-geist-mono), 'SF Mono', Monaco, monospace",
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: '14px',
              lineHeight: '20px',
              letterSpacing: '0.1em',
              color: '#666666',
              textTransform: 'uppercase'
            }}>
              END-TO-END ENCRYPTED
            </div>

            {/* Description text */}
            <p style={{
              position: 'absolute',
              width: '490px',
              height: '96px',
              left: '680px',
              top: '180px',
              fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif",
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: '22px',
              lineHeight: '32px',
              color: '#333333'
            }}>
              WebRTC end-to-end encryption with DTLS-SRTP transport. P2P voice streaming means your calls never pass through our servers.
            </p>
          </>
        ) : (
          <>
            {/* Mobile Layout - Stacked */}
            <div style={{
              padding: '40px 20px',
              textAlign: 'left'
            }}>
              {/* Title */}
              <h1 style={{
                fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                fontStyle: 'normal',
                fontWeight: '700',
                fontSize: 'clamp(32px, 8vw, 48px)',
                lineHeight: '1.1',
                textAlign: 'left',
                color: '#000000',
                letterSpacing: '-0.02em',
                marginBottom: '32px'
              }}>
                Our Privacy Architecture
              </h1>

              {/* END-TO-END ENCRYPTED label */}
              <div style={{
                fontFamily: "var(--font-geist-mono), 'SF Mono', Monaco, monospace",
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: '12px',
                lineHeight: '20px',
                letterSpacing: '0.1em',
                color: '#666666',
                textTransform: 'uppercase',
                marginBottom: '16px'
              }}>
                END-TO-END ENCRYPTED
              </div>

              {/* Description text */}
              <p style={{
                fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '18px',
                lineHeight: '28px',
                color: '#333333',
                margin: 0,
                maxWidth: '100%'
              }}>
                WebRTC end-to-end encryption with DTLS-SRTP transport. P2P voice streaming means your calls never pass through our servers.
              </p>
            </div>
          </>
        )}

        {/* Architecture Diagram Image Placeholder */}
        <div style={{
          position: 'absolute',
          width: isMobile ? 'calc(100% - 40px)' : '1060px',
          height: isMobile ? '200px' : '400px',
          left: '50%',
          top: isMobile ? '400px' : '340px',
          transform: 'translateX(-50%)',
          background: '#F5F5F5',
          borderRadius: '20px',
          border: '1px solid #E0E0E0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          {/* Simple diagram representation */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '90%',
            height: '70%'
          }}>
            {/* User's Browser */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: isMobile ? '6px' : '12px'
            }}>
              <div style={{
                fontSize: isMobile ? '8px' : '12px',
                fontWeight: '600',
                padding: isMobile ? '2px 6px' : '4px 12px',
                background: '#E5E7EB',
                borderRadius: '4px'
              }}>
                USER'S BROWSER
              </div>
              <Mic size={isMobile ? 20 : 32} color="#6B7280" />
              <div style={{ fontSize: isMobile ? '8px' : '11px', textAlign: 'center', color: '#6B7280' }}>
                P2P VOICE<br />(EPHEMERAL)
              </div>
            </div>

            {/* Arrows */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: isMobile ? '10px' : '20px' }}>
              <ArrowRight size={isMobile ? 16 : 24} color="#6B7280" />
              <ArrowRight size={isMobile ? 16 : 24} color="#6B7280" style={{ transform: 'rotate(180deg)' }} />
            </div>

            {/* Ephemeral Rooms (Diamond) */}
            <div style={{
              width: isMobile ? '70px' : '120px',
              height: isMobile ? '70px' : '120px',
              background: '#4D4DB3',
              transform: 'rotate(45deg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: isMobile ? '10px' : '16px',
              position: 'relative'
            }}>
              <div style={{
                transform: 'rotate(-45deg)',
                textAlign: 'center',
                color: '#fff'
              }}>
                <Lock size={isMobile ? 14 : 24} style={{ margin: `0 auto ${isMobile ? '4px' : '8px'}` }} />
                <div style={{ fontSize: isMobile ? '7px' : '12px', fontWeight: '600' }}>
                  EPHEMERAL<br />ROOMS
                </div>
                <div style={{ fontSize: isMobile ? '6px' : '10px', opacity: 0.9 }}>
                  24-HOUR EXPIRY
                </div>
              </div>
            </div>

            {/* Arrows */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: isMobile ? '10px' : '20px' }}>
              <ArrowRight size={isMobile ? 16 : 24} color="#6B7280" />
              <ArrowRight size={isMobile ? 16 : 24} color="#6B7280" style={{ transform: 'rotate(180deg)' }} />
            </div>

            {/* Peer's Browser */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: isMobile ? '6px' : '12px'
            }}>
              <div style={{
                fontSize: isMobile ? '8px' : '12px',
                fontWeight: '600',
                padding: isMobile ? '2px 6px' : '4px 12px',
                background: '#E5E7EB',
                borderRadius: '4px'
              }}>
                PEER'S BROWSER
              </div>
              <Headphones size={isMobile ? 20 : 32} color="#6B7280" />
              <div style={{ fontSize: isMobile ? '8px' : '11px', textAlign: 'center', color: '#6B7280' }}>
                P2P VOICE<br />(EPHEMERAL)
              </div>
            </div>
          </div>
        </div>

        </div>
      </section>

      {/* 6. Developers Section */}
      <section style={{
        padding: isMobile ? '80px 20px 80px 20px' : '160px 20px 160px 20px',
        background: '#1a1a1a'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '12px',
            fontWeight: '500',
            letterSpacing: '0.1em',
            color: '#c5dde0',
            marginBottom: '30px',
            fontFamily: "var(--font-geist-mono), 'SF Mono', Monaco, monospace",
            textTransform: 'uppercase'
          }}>
            &lt; / &gt; FOR DEVELOPERS
          </div>

          <pre style={{
            fontFamily: "var(--font-geist-mono), 'SF Mono', Monaco, monospace",
            fontSize: isMobile ? 'clamp(1px, 0.8vw, 6px)' : 'clamp(6px, 0.9vw, 9px)',
            lineHeight: '1.1',
            color: '#c5dde0',
            whiteSpace: 'pre',
            margin: '0 0 40px 0',
            letterSpacing: '0px',
            overflow: 'auto',
            width: '100%',
            maxWidth: 'calc(100vw - 40px)',
            transform: isMobile ? 'scaleX(0.8)' : 'none',
            transformOrigin: 'center',
            boxSizing: 'border-box'
          }}>
{`░██         ░██████  ░██████   ░██     ░██ ░██████░███████     ░██████     ░███    ░██         ░██         ░██████░███    ░██   ░██████       ░██████   ░███████   ░██     ░██
░██           ░██   ░██   ░██  ░██     ░██   ░██  ░██   ░██   ░██   ░██   ░██░██   ░██         ░██           ░██  ░████   ░██  ░██   ░██     ░██   ░██  ░██   ░██  ░██    ░██
░██           ░██  ░██     ░██ ░██     ░██   ░██  ░██    ░██ ░██         ░██  ░██  ░██         ░██           ░██  ░██░██  ░██ ░██           ░██         ░██    ░██ ░██   ░██
░██           ░██  ░██     ░██ ░██     ░██   ░██  ░██    ░██ ░██        ░█████████ ░██         ░██           ░██  ░██ ░██ ░██ ░██  █████     ░████████  ░██    ░██ ░███████
░██           ░██  ░██     ░██ ░██     ░██   ░██  ░██    ░██ ░██        ░██    ░██ ░██         ░██           ░██  ░██  ░██░██ ░██     ██            ░██ ░██    ░██ ░██   ░██
░██           ░██   ░██   ░██   ░██   ░██    ░██  ░██   ░██   ░██   ░██ ░██    ░██ ░██         ░██           ░██  ░██   ░████  ░██  ░███     ░██   ░██  ░██   ░██  ░██    ░██
░██████████ ░██████  ░██████     ░██████   ░██████░███████     ░██████  ░██    ░██ ░██████████ ░██████████ ░██████░██    ░███   ░█████░█      ░██████   ░███████   ░██     ░██`}
          </pre>


          <p style={{
            fontSize: isMobile ? '12px' : '16px',
            lineHeight: isMobile ? '20px' : '32px',
            color: '#c5dde0',
            fontFamily: "var(--font-geist-mono), 'SF Mono', Monaco, monospace",
            marginBottom: '32px',
            maxWidth: '600px',
            margin: '0 auto 32px auto',
            textTransform: 'uppercase'
          }}>
            THE MOST PRIVATE, EMBEDDABLE VOICE MODAL IN THE WORLD.<br />
            TRULY PRIVATE INFRASTRUCTURE IN LESS THAN FIVE MINUTES.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={() => router.push('/sdk')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '16px 48px',
                backgroundColor: '#FFFFFF',
                color: '#000000',
                border: 'none',
                borderRadius: '4px',
                fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <Eye size={18} />
              View SDK
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer2 />
    </>
  )
}

function HomeContent() {
  const { ready, authenticated, user, login, logout } = usePrivy()
  const router = useRouter()
  const searchParams = useSearchParams()
  const isConnected = authenticated
  const address = user?.wallet?.address
  const [mounted, setMounted] = useState(false)
  const [recipient, setRecipient] = useState('')
  const [isInCall, setIsInCall] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [callStatus, setCallStatus] = useState<string>('idle')
  const [sessionId, setSessionId] = useState<string | null>(null)
  // Removed deposit modal - no smart contract deployed yet
  const [callLink, setCallLink] = useState<string | null>(null)
  const [showCallLinkModal, setShowCallLinkModal] = useState(false)
  const [recipientJoined, setRecipientJoined] = useState(false)
  const [participantCount, setParticipantCount] = useState(0)
  const [roomId, setRoomId] = useState<string | null>(null)
  const [localAudioLevel, setLocalAudioLevel] = useState(0)
  const [remoteAudioLevel, setRemoteAudioLevel] = useState(0)
  const [isSpeaking, setIsSpeaking] = useState(false)

  // Demo mode state
  const [isDemoMode, setIsDemoMode] = useState(false)

  // Mic permission state
  const [micPermission, setMicPermission] = useState<'granted' | 'denied' | 'prompt' | 'checking'>('prompt')
  const [showMicInstruction, setShowMicInstruction] = useState(false)

  // Mark as mounted on client and check for demo URL parameter
  useEffect(() => {
    setMounted(true)

    // Check if demo mode should be enabled from URL parameter
    if (searchParams.get('demo') === 'true') {
      setIsDemoMode(true)
      // Clean up URL without refreshing page
      window.history.replaceState({}, '', '/')
    }
  }, [searchParams])

  // Handle demo mode changes
  const handleSetDemoMode = (value: boolean) => {
    // If exiting demo mode and in a call, end the call first
    if (!value && isInCall) {
      leaveRoom()
      setIsInCall(false)
      setCallDuration(0)
      setCallStatus('idle')
      setCallLink('')
    }
    setIsDemoMode(value)
  }

  const checkMicPermission = async () => {
    // Ensure we're in the browser
    if (typeof window === 'undefined') return

    setMicPermission('checking')
    try {
      const result = await navigator.permissions.query({ name: 'microphone' as PermissionName })
      setMicPermission(result.state as any)

      result.addEventListener('change', () => {
        setMicPermission(result.state as any)
      })
    } catch (error) {
      console.error('Permission check failed:', error)
      setMicPermission('prompt')
    }
  }

  const requestMicPermission = async () => {
    // Ensure we're in the browser
    if (typeof window === 'undefined') return

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      setMicPermission('granted')
      // Stop the test stream
      stream.getTracks().forEach(track => track.stop())
    } catch (error) {
      console.error('Mic permission denied:', error)
      setMicPermission('denied')
    }
  }

  // Check mic permission on mount (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      checkMicPermission()
    }
  }, [])

  // Daily.co React hooks
  const {
    isConnected: audioConnected,
    isMuted,
    participantCount: dailyParticipantCount,
    createRoom,
    joinRoom,
    leaveRoom,
    toggleMute: toggleWebRTCMute,
    toggleSpeakerphone,
    isSpeakerphone,
    error: audioError,
    audioLevels
  } = useDailyReact()

  // Get Daily instance directly
  const daily = useDaily()

  // Minutes balance hooks
  const {
    minutesBalance,
    buyMinutes,
    deductMinutes,
    isPurchasing,
    purchaseError,
    calculateMinutesFromDollars,
    getPaymentHistory,
    clearPaymentHistory,
    resetBalanceForTesting,
    isReady: paymentReady,
  } = useMinutesBalance()

  // Real payments hooks
  const {
    payWithUSDC,
    switchToNetwork,
    currentNetwork,
    usdcBalance,
    supportedNetworks,
    isReady: cryptoReady,
    isNetworkSupported,
    refreshBalance
  } = useRealPayments()

  // Server validation hooks
  const {
    validateMinutes,
    startCallSession,
    endCallSession,
    sendHeartbeat,
    isValidating,
    lastValidation,
    currentSession,
    hasDiscrepancy,
    serverMinutes
  } = useServerValidation()

  // Combined buy minutes function that handles real crypto payments
  const handleBuyMinutes = async (amount: string, method?: string) => {
    console.log(`🔥 handleBuyMinutes called:`, { amount, method, cryptoReady, currentNetwork })

    if (method === 'wallet' && cryptoReady) {
      // Real USDC payment
      console.log(`🚀 Initiating real USDC payment for $${amount} via wallet on ${currentNetwork}`)
      const result = await payWithUSDC(amount)
      console.log(`📋 Payment result:`, result)
      if (result) {
        // Add minutes to balance after successful payment
        const minutesToAdd = Math.floor(parseFloat(amount) * 20) // $1 = 20 minutes

        // Update minutes balance in state and localStorage
        if (user?.wallet?.address) {
          const currentBalance = minutesBalance
          const newBalance = currentBalance + minutesToAdd

          // Update localStorage
          localStorage.setItem(`minutes_${user.wallet.address}`, newBalance.toString())

          // Store payment history
          const paymentHistory = JSON.parse(localStorage.getItem(`payments_${user.wallet.address}`) || '[]')
          paymentHistory.push({
            amount: amount,
            minutes: minutesToAdd,
            method: 'wallet',
            timestamp: new Date().toISOString(),
            txId: result.hash,
            network: result.network
          })
          localStorage.setItem(`payments_${user.wallet.address}`, JSON.stringify(paymentHistory))

          console.log(`✅ Real USDC payment successful: +${minutesToAdd} minutes (Tx: ${result.hash})`)
          console.log(`💰 Balance updated: ${currentBalance} → ${newBalance} minutes`)

          // Trigger real-time balance update without page refresh
          console.log('🚀 Dispatching minutes-updated event...')
          window.dispatchEvent(new Event('minutes-updated'))
        }

        // Refresh USDC balance to show updated amount
        await refreshBalance()

        console.log(`🎉 Payment completed without page refresh!`)
      }
    } else {
      // Use the original buyMinutes for simulation
      await buyMinutes(amount, method)
    }
  }

  // Timer for call duration - simplified
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isInCall) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isInCall])

  // Track the last minute we deducted to prevent double deductions
  const [lastDeductedMinute, setLastDeductedMinute] = useState(0)

  // Handle minute deduction and server validation
  useEffect(() => {
    // Calculate which minute we're in
    const currentMinute = Math.floor(callDuration / 60)

    // Only process if we've moved to a new minute and haven't processed this minute yet
    if (currentMinute > 0 && currentMinute > lastDeductedMinute && !isDemoMode && isConnected && isInCall) {
      setLastDeductedMinute(currentMinute)

      // For server-tracked sessions, use heartbeat validation
      if (currentSession) {
        sendHeartbeat(currentMinute).then(result => {
          if (result.shouldEndCall) {
            console.log('Server requested call termination - insufficient minutes')
            alert('Call ended - insufficient minutes balance (verified by server)')
            handleEndCall()
          }
        }).catch(error => {
          console.error('Heartbeat validation failed:', error)
          // Don't end call on network errors, but warn
          console.warn('Unable to verify minutes with server, continuing call...')
        })
      } else {
        // Fallback to client-side deduction for demo/legacy mode
        const deductionSuccess = deductMinutes(1)
        if (!deductionSuccess) {
          console.log('Out of minutes - ending call (client-side check)')
          alert('Call ended - insufficient minutes balance')
          handleEndCall()
        }
      }
    }

    // Auto-end call after 10 minutes in demo mode
    if (isDemoMode && callDuration >= 600 && isInCall) {
      handleEndCall()
    }
  }, [callDuration, isDemoMode, isConnected, deductMinutes, isInCall, lastDeductedMinute, currentSession, sendHeartbeat])

  // Real audio detection using audioLevels from useDailyReact
  useEffect(() => {
    if (!audioConnected || isMuted) {
      setIsSpeaking(false)
      return
    }

    // Check local participant audio level from useDailyReact
    const localLevel = audioLevels['local'] || 0
    const speakingThreshold = 3  // Same threshold as useDailyReact but different scale
    const speaking = localLevel > speakingThreshold

    console.log('🎤 Audio level from useDailyReact:', localLevel, 'Speaking:', speaking)
    setIsSpeaking(speaking)
  }, [audioConnected, isMuted, audioLevels])

  // Demo mode speaking animation - use same simple approach as regular mode
  useEffect(() => {
    if (!isDemoMode || !isInCall) {
      return
    }

    console.log('🎭 Setting up demo mode speaking animation')

    // In demo mode, simulate speaking with same pattern as regular audio detection
    const speakingInterval = setInterval(() => {
      if (!isMuted) {
        // Simple boolean toggle like regular mode, not complex timing
        setIsSpeaking(true)
      }
    }, 2000) // Every 2 seconds

    const stopSpeakingInterval = setInterval(() => {
      setIsSpeaking(false)
    }, 2500) // Turn off 0.5 seconds later

    return () => {
      clearInterval(speakingInterval)
      clearInterval(stopSpeakingInterval)
    }
  }, [isDemoMode, isInCall, isMuted])

  // Use Daily participant count
  useEffect(() => {
    if (dailyParticipantCount > 0) {
      setParticipantCount(dailyParticipantCount)
    }
  }, [dailyParticipantCount])

  // Handle window close/refresh for call initiator - end call for everyone
  useEffect(() => {
    if (isInCall) {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        // End the call when the initiator closes the window
        handleEndCall()

        // Show confirmation dialog
        e.preventDefault()
        e.returnValue = ''
        return ''
      }

      window.addEventListener('beforeunload', handleBeforeUnload)

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload)
      }
    }
  }, [isInCall])

  // Hide mic instruction when permission is granted
  useEffect(() => {
    if (micPermission === 'granted') {
      setShowMicInstruction(false)
    }
  }, [micPermission])

  const createCallLink = async () => {
    if (!isConnected && !isDemoMode) {
      alert('Connect wallet first')
      return
    }

    // Request mic permission if not already granted
    if (micPermission !== 'granted') {
      await requestMicPermission()
      // Wait a moment for permission state to update
      await new Promise(resolve => setTimeout(resolve, 100))

      // Re-check permission by trying to get media stream
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        stream.getTracks().forEach(track => track.stop())
      } catch (err) {
        alert('Microphone permission is required to create calls')
        return
      }
    }

    // Check minutes balance for connected users (not demo mode)
    if (isConnected && !isDemoMode) {
      try {
        // Validate with server before allowing call creation
        const validation = await validateMinutes(minutesBalance, 'create_call')

        if (!validation.valid) {
          alert(`Insufficient minutes balance. Server shows you have ${validation.actualMinutes} minutes.`)
          return
        }

        // Warn if there's a discrepancy between client and server
        if (validation.discrepancy > 5) {
          console.warn(`⚠️ Minutes discrepancy detected - updating client from server`)
          // Update localStorage to match server
          if (user?.wallet?.address) {
            localStorage.setItem(`minutes_${user.wallet.address}`, validation.actualMinutes.toString())
            // Trigger balance update
            window.dispatchEvent(new Event('minutes-updated'))
          }
        }
      } catch (error: any) {
        alert(`Unable to verify minutes balance: ${error.message}`)
        return
      }
    }

    try {
      // Set loading state
      setCallStatus('creating-room')

      // Create Daily.co room
      console.log('Creating Daily.co room...')
      const roomUrl = await createRoom()
      console.log('Room URL received:', roomUrl)

      if (!roomUrl) {
        throw new Error('Failed to create room - no URL returned')
      }

      // Extract room ID from URL for the shareable link
      const roomId = roomUrl.split('/').pop()
      if (!roomId) {
        throw new Error('Invalid room URL received: ' + roomUrl)
      }
      setRoomId(roomId)

      // Store the full room URL for joining
      sessionStorage.setItem('currentRoomUrl', roomUrl)
      sessionStorage.setItem('currentRoomId', roomId)

      // Create shareable link
      const link = `${window.location.origin}/call/${roomId}`
      setCallLink(link)
      setShowCallLinkModal(true)

      console.log('Room setup complete:', { roomUrl, roomId, link })

      // Reset status
      setCallStatus('idle')

    } catch (error: any) {
      console.error('Failed to create call:', error)
      alert(`Failed to create call: ${error.message}`)
      setCallStatus('idle')
    }
  }

  const handleCall = async () => {
    // Get the stored room URL and ID
    const storedRoomUrl = sessionStorage.getItem('currentRoomUrl')
    const storedRoomId = sessionStorage.getItem('currentRoomId')

    console.log('Attempting to join:', { storedRoomUrl, storedRoomId, roomId })

    if (!storedRoomUrl && !roomId) {
      alert('Please create a call link first')
      return
    }

    try {
      setCallStatus('initializing')

      // Use stored URL or construct from roomId
      let roomUrlToJoin = storedRoomUrl
      if (!roomUrlToJoin && roomId) {
        roomUrlToJoin = `https://immaterial.daily.co/${roomId}`
        console.log('Constructed room URL from ID:', roomUrlToJoin)
      }

      if (!roomUrlToJoin) {
        throw new Error('No room URL available')
      }

      // Start server session tracking (for non-demo mode)
      if (isConnected && !isDemoMode && roomId) {
        try {
          const session = await startCallSession(roomId)
          console.log(`✅ Server session started: ${session.sessionId}`)
        } catch (error: any) {
          console.error('Failed to start server session:', error)
          if (error.message.includes('Insufficient minutes')) {
            alert('Insufficient minutes balance verified by server')
            return
          }
          // Continue with call even if session tracking fails
          console.warn('Continuing call without server session tracking')
        }
      }

      // Join Daily.co room using the full URL
      console.log('Joining room with URL:', roomUrlToJoin)
      await joinRoom(roomUrlToJoin)

      setCallStatus('in-room')
      setIsInCall(true)
      setCallDuration(0)

      console.log('Host joined Daily room:', roomId)

    } catch (error: any) {
      console.error('Failed to join call room:', error)
      alert(`Failed to join call room: ${error.message}`)
      setCallStatus('idle')
    }
  }


  const handleEndCall = async () => {
    try {
      // End server session tracking
      if (currentSession && !isDemoMode) {
        const minutesUsed = Math.ceil(callDuration / 60)
        await endCallSession(minutesUsed)
        console.log(`📞 Server session ended with ${minutesUsed} minutes used`)
      }

      // Leave Daily.co room
      leaveRoom()

      // Reset state
      setIsInCall(false)
      setCallDuration(0)
      setCallStatus('idle')
      setSessionId(null)
      setCallLink(null)
      setRoomId(null)
      setParticipantCount(0)
      setLastDeductedMinute(0) // Reset the minute tracker

      // Clear stored room data
      sessionStorage.removeItem('currentRoomUrl')
      sessionStorage.removeItem('currentRoomId')

    } catch (error) {
      console.error('Error ending call:', error)
    }
  }


  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Show torus immediately as loader instead of loading screen
  if (!mounted) {
    return (
      <div className="liquid-app">
        <TorusCanvas />
      </div>
    )
  }

  if (isInCall) {
    return (
      <div className="liquid-app">
        <TorusCanvas />
        {/* Logo - FIGMA RESPONSIVE */}
        <div className="figma-logo" onClick={() => handleSetDemoMode(false)}>Liquid Calling</div>

        {/* Try Demo Button - FIGMA RESPONSIVE */}
        {isDemoMode && (
          <button
            onClick={() => handleSetDemoMode(false)}
            className="figma-demo-button figma-exit-demo-button"
          >
            <span className="figma-button-text">Exit Demo</span>
          </button>
        )}

        {/* Connect Button - FIGMA RESPONSIVE */}
        <div className="figma-connect-button">
          <PrivyConnectButton />
        </div>

        {/* Main Card - FIGMA RESPONSIVE */}
        <div className="figma-main-card">
          {/* Demo Mode Banner - FIGMA RESPONSIVE */}
          {isDemoMode && !isConnected && (
            <div className="card-banner">
              <div className="figma-demo-icon">
                <svg width="10" height="12" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.00002 2V8.292C5.38869 8.7724 4.00412 9.81675 3.09948 11.2341C2.19485 12.6514 1.8306 14.347 2.07335 16.0108C2.3161 17.6746 3.14961 19.1954 4.42149 20.2952C5.69336 21.395 7.3186 22.0002 9.00002 22.0002C10.6814 22.0002 12.3067 21.395 13.5785 20.2952C14.8504 19.1954 15.6839 17.6746 15.9267 16.0108C16.1694 14.347 15.8052 12.6514 14.9005 11.2341C13.9959 9.81675 12.6113 8.7724 11 8.292V2" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 15H16" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5.5 2H12.5" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="card-banner-text">Demo Mode • No Billing • 10 Minute Test Mode</span>
            </div>
          )}

          {/* Connected Banner - FIGMA RESPONSIVE */}
          {isConnected && !isDemoMode && (
            <div className="card-banner-wallet">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m11 17 2 2a1 1 0 1 0 3-3"/>
                <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/>
                <path d="m21 3 1 11h-2"/>
                <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/>
                <path d="M3 4h8"/>
              </svg>
              <span>Connected</span>
              <div className="connected-circle">•</div>
              <span>Locked In</span>
            </div>
          )}

          {/* Content inside the glass card */}
          <div className="figma-main-card-content">
            {/* 1. Demo mode banner (already handled above) */}

            {/* 2. Minutes Balance Section - Show for connected users during calls */}
            {isConnected && !isDemoMode && (
              <div>
                <PaymentUI
                  minutesBalance={minutesBalance}
                  buyMinutes={handleBuyMinutes}
                  isPurchasing={isPurchasing}
                  calculateMinutesFromDollars={calculateMinutesFromDollars}
                  currentNetwork={currentNetwork}
                  usdcBalance={usdcBalance}
                  supportedNetworks={supportedNetworks}
                  switchToNetwork={switchToNetwork}
                  cryptoReady={cryptoReady}
                  isNetworkSupported={isNetworkSupported}
                />

                {/* Server validation status */}
                {hasDiscrepancy && lastValidation && (
                  <div style={{
                    fontSize: '11px',
                    color: 'rgba(255, 200, 100, 0.8)',
                    textAlign: 'center',
                    marginTop: '8px',
                    padding: '4px 8px',
                    background: 'rgba(255, 200, 100, 0.1)',
                    borderRadius: '6px',
                    border: '1px solid rgba(255, 200, 100, 0.2)'
                  }}>
                    ⚠️ Server verification: You have {lastValidation.actualMinutes} minutes (corrected from client)
                  </div>
                )}

                {currentSession && (
                  <div style={{
                    fontSize: '10px',
                    color: 'rgba(100, 255, 100, 0.7)',
                    textAlign: 'center',
                    marginTop: '4px'
                  }}>
                    🛡️ Server-validated session: {currentSession.sessionId.slice(-8)}
                  </div>
                )}
              </div>
            )}

            {/* 3. Timer (same height as "Room created!" status) */}
            <div className="figma-call-timer">
              {formatDuration(callDuration)}
            </div>

            {/* 4. Copy Room Link Button */}
            <button
              onClick={() => {
                if (callLink) {
                  navigator.clipboard.writeText(callLink)
                  alert('Room link copied!')
                }
              }}
              className="figma-copy-room-link"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
              </svg>
              <span>Copy Room Link</span>
            </button>

            {/* 5. In Room ~ X Participants - moved here from below */}
            <div className="figma-participant-count">
              In Room ~ {participantCount} Participant{participantCount !== 1 ? 's' : ''}
            </div>

            {/* 6. Participant Dots Display */}
            <div className="figma-participant-dots-container">
              <div className="participant-dots">
                {[...Array(Math.min(participantCount, 3))].map((_, i) => {
                  const isLocal = i === 0
                  const isParticipantSpeaking = isLocal ? isSpeaking : false // Only local for now
                  return (
                    <div
                      key={i}
                      className={`participant-dot ${
                        isParticipantSpeaking ? 'participant-dot--speaking' : ''
                      } ${isMuted && isLocal ? 'participant-dot--muted' : ''}`}
                      onClick={isLocal ? () => {
                        console.log('🔇 In-call dot clicked, current mute state:', isMuted)
                        toggleWebRTCMute()
                      } : undefined}
                      style={{ cursor: isLocal ? 'pointer' : 'default' }}
                      title={isLocal ? (isMuted ? 'Click to unmute' : 'Click to mute') : ''}
                    />
                  )
                })}
              </div>
            </div>

            {/* 7. End Call Button */}
            <button
              onClick={handleEndCall}
              className="call-action-button call-button--red"
            >
              <span className="figma-button-text">End Call</span>
            </button>

            {/* Card Footer Messages */}
            {isDemoMode && (
              <div className="card-footer">
                <p className="card-footer-title">
                  Connect for Unlimited Use
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }


  // Show welcome/landing page for non-connected users
  if (!isConnected && !isDemoMode) {
    return (
      <>
      <div className="liquid-app">
        <TorusCanvas />
        {/* Logo - FIGMA RESPONSIVE */}
        <div className="figma-logo" onClick={() => window.location.reload()}>Liquid Calling</div>


        {/* Try Demo Button - FIGMA RESPONSIVE */}
        <button
          onClick={() => handleSetDemoMode(true)}
          className="figma-demo-button"
        >
          <span className="figma-button-text">Try Demo</span>
        </button>

        {/* Connect Button - FIGMA RESPONSIVE */}
        <div className="figma-connect-button">
          <PrivyConnectButton />
        </div>

        {/* Hero Section - FIGMA RESPONSIVE */}
        <div className="figma-hero-section">
          <h1 className="figma-hero-title">Actually Private Calls</h1>
          <p className="figma-hero-subtitle">The only way to make instant, 100% private, untraceable, encrypted calls without a phone number.</p>
          <button
            onClick={login}
            className="figma-cta-button"
          >
            <span className="figma-cta-text">Start your call</span>
            <div className="figma-cta-icon">
              <svg width="20" height="16" viewBox="0 0 37 31" fill="none">
                <path d="M18.5 24.5V31" stroke="#010101" strokeWidth="2" strokeLinecap="round"/>
                <path d="M32 12V15.5C32 18.5 30.5 21.3 28 23.5C25.5 25.7 22 27 18.5 27C15 27 11.5 25.7 9 23.5C6.5 21.3 5 18.5 5 15.5V12" stroke="#010101" strokeWidth="2" strokeLinecap="round"/>
                <path d="M24 6C24 3 21.5 0.5 18.5 0.5C15.5 0.5 13 3 13 6V18C13 21 15.5 23.5 18.5 23.5C21.5 23.5 24 21 24 18V6Z" stroke="#010101" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </button>
        </div>

        {/* Footer - FIGMA RESPONSIVE */}
        <div className="figma-footer-left">
          Zero logs. Zero IP tracking. Zero stored data. True end-to-end encryption. EU-US Data Privacy Framework certified.
        </div>

        <div className="figma-footer-right">
          Pay 0.05 USDC per minute on HyperLiquid, Base, or your credit card. Speak freely. No KYC. No data collection. Just secure calls.
        </div>

      </div>

      {/* Splash Outline2 Content - Full featured landing sections */}
      <div style={{
        background: 'linear-gradient(0deg, #F1F1F5, #F1F1F5)',
        fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif"
      }}>
        <SplashOutline2Sections />
      </div>

      </>
    )
  }

  // Show main app interface for connected users or demo mode
  return (
    <>
    <div className="liquid-app">
      <TorusCanvas />
      {/* Logo - FIGMA RESPONSIVE */}
      <div className="figma-logo" onClick={() => handleSetDemoMode(false)}>Liquid Calling</div>

      {/* Try Demo Button - FIGMA RESPONSIVE */}
      {isDemoMode && (
        <button
          onClick={() => handleSetDemoMode(false)}
          className="figma-demo-button figma-exit-demo-button"
        >
          <span className="figma-button-text">Exit Demo</span>
        </button>
      )}

      {/* Connect Button - FIGMA RESPONSIVE */}
      <div className="figma-connect-button">
        <PrivyConnectButton />
      </div>

      {/* Main Card - FIGMA RESPONSIVE */}
      <div className="figma-main-card">
        {/* Demo Mode Banner */}
        {isDemoMode && !isConnected && (
          <div className="card-banner">
            <div className="figma-demo-icon">
              <svg width="10" height="12" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.00002 2V8.292C5.38869 8.7724 4.00412 9.81675 3.09948 11.2341C2.19485 12.6514 1.8306 14.347 2.07335 16.0108C2.3161 17.6746 3.14961 19.1954 4.42149 20.2952C5.69336 21.395 7.3186 22.0002 9.00002 22.0002C10.6814 22.0002 12.3067 21.395 13.5785 20.2952C14.8504 19.1954 15.6839 17.6746 15.9267 16.0108C16.1694 14.347 15.8052 12.6514 14.9005 11.2341C13.9959 9.81675 12.6113 8.7724 11 8.292V2" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 15H16" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.5 2H12.5" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="card-banner-text">Demo Mode • No Billing • 10 Minute Test Mode</span>
          </div>
        )}

        {/* Connected Banner */}
        {isConnected && !isDemoMode && (
          <div className="card-banner-wallet">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m11 17 2 2a1 1 0 1 0 3-3"/>
              <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/>
              <path d="m21 3 1 11h-2"/>
              <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/>
              <path d="M3 4h8"/>
            </svg>
            <span>Connected</span>
            <div className="connected-circle">•</div>
            <span>Locked In</span>
          </div>
        )}

        {/* Content inside the glass card will go here */}
        <div className="figma-main-card-content">

          {/* Minutes Balance Section - Only show for connected users */}
          {isConnected && !isDemoMode && (
            <div>
              <PaymentUI
                minutesBalance={minutesBalance}
                buyMinutes={handleBuyMinutes}
                isPurchasing={isPurchasing}
                calculateMinutesFromDollars={calculateMinutesFromDollars}
                currentNetwork={currentNetwork}
                usdcBalance={usdcBalance}
                supportedNetworks={supportedNetworks}
                switchToNetwork={switchToNetwork}
                cryptoReady={cryptoReady}
                isNetworkSupported={isNetworkSupported}
              />

              {/* Server validation status */}
              {hasDiscrepancy && lastValidation && (
                <div style={{
                  fontSize: '11px',
                  color: 'rgba(255, 200, 100, 0.8)',
                  textAlign: 'center',
                  marginTop: '8px',
                  padding: '4px 8px',
                  background: 'rgba(255, 200, 100, 0.1)',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 200, 100, 0.2)'
                }}>
                  ⚠️ Server verification: You have {lastValidation.actualMinutes} minutes
                </div>
              )}

              {isValidating && (
                <div style={{
                  fontSize: '10px',
                  color: 'rgba(100, 100, 255, 0.7)',
                  textAlign: 'center',
                  marginTop: '4px'
                }}>
                  🔍 Validating with server...
                </div>
              )}
            </div>
          )}


          {/* Status */}
          {callLink && (
            <div className="figma-room-status">
              <p className="figma-room-status-text">
                Room created! Share the link to invite others.
              </p>
              <button
                onClick={() => {
                  if (callLink) {
                    navigator.clipboard.writeText(callLink)
                    alert('Room link copied!')
                  }
                }}
                className="figma-copy-link-button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                </svg>
                <span>Copy room link</span>
              </button>
            </div>
          )}

          {/* Participant Dots Display - Replace Mic Button */}
          <div className="figma-participant-dots-container">
            {/* Show dots based on participants */}
            {participantCount === 0 ? (
              // No participants yet - show placeholder dots
              <div className="participant-dots">
                <div className="participant-dot participant-dot--inactive"></div>
              </div>
            ) : (
              // Show actual participant dots
              <div className="participant-dots">
                {[...Array(Math.min(participantCount, 3))].map((_, i) => {
                  const isLocal = i === 0
                  const isParticipantSpeaking = isLocal ? isSpeaking : false // Only local for now

                  return (
                    <div
                      key={i}
                      className={`participant-dot ${
                        isParticipantSpeaking ? 'participant-dot--speaking' : ''
                      } ${isMuted && isLocal ? 'participant-dot--muted' : ''}`}
                      onClick={isLocal ? () => {
                        console.log('🔇 Dot clicked, current mute state:', isMuted)
                        toggleWebRTCMute()
                      } : undefined}
                      style={{ cursor: isLocal ? 'pointer' : 'default' }}
                      title={isLocal ? (isMuted ? 'Click to unmute' : 'Click to mute') : ''}
                    />
                  )
                })}
              </div>
            )}
          </div>

          {/* Call Actions */}
          <div className="call-actions-container">
            {!callLink ? (
              <button
                onClick={createCallLink}
                disabled={callStatus !== 'idle'}
                className="call-action-button call-button--white"
              >
                {callStatus === 'creating-room' ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <div className="loading-dots"></div>
                    <span className="figma-button-text">One moment, we are securing your room</span>
                  </div>
                ) : (
                  <span className="figma-button-text">Create a call link and share it with anyone</span>
                )}
              </button>
            ) : (
              <button
                onClick={handleCall}
                disabled={callStatus === 'initializing'}
                className="call-action-button call-button--green"
              >
                <span className="figma-button-text">{callStatus === 'initializing' ? 'Joining room...' : 'Start Call'}</span>
              </button>
            )}

            {/* Mobile-only Speakerphone Toggle - Show when call is active */}
            {callLink && audioConnected && /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && (
              <button
                onClick={toggleSpeakerphone}
                className={`call-action-button ${isSpeakerphone ? 'call-button--green' : 'call-button--white'}`}
              >
                <span className="figma-button-text">
                  {isSpeakerphone ? '📢 Speaker On' : '📞 Speaker Off'}
                </span>
              </button>
            )}
          </div>

          {/* Error Display */}
          {audioError && (
            <div className="figma-error-message">
              {audioError}
            </div>
          )}

          

          {/* Card Footer Messages */}
          {isDemoMode && (
            <div className="card-footer">
              <p className="card-footer-title">
                Connect for Unlimited Use
              </p>
            </div>
          )}

        </div>
      </div>

    </div>

    </>
  )
}

export default function Home() {
  return (
    <>
      <ErrorBoundary
        fallback={
          <div className="liquid-app">
            <TorusCanvas />
            <div className="figma-logo">Liquid Calling</div>
            <div className="figma-main-card">
              <div className="figma-main-card-content">
                <p>Voice calling temporarily unavailable</p>
                <p style={{ fontSize: '14px', opacity: 0.7, marginTop: '10px' }}>
                  WebRTC not supported in this environment. Please try a different browser or device.
                </p>
              </div>
            </div>
          </div>
        }
      >
        <div style={{ minHeight: '100vh', position: 'relative' }} className="mobile-taller-viewport">
          <DailyProvider>
            <HomeContent />
          </DailyProvider>
        </div>
      </ErrorBoundary>
    </>
  )
}