'use client'

import { useState } from 'react'
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
import { useRouter } from 'next/navigation'
import { Footer } from '../../components/Footer2'

export default function SplashOutline() {
  const router = useRouter()

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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(0deg, #F1F1F5, #F1F1F5)',
      color: 'rgba(31, 0, 0, 0.9)',
      fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      {/* 1. Zero Knowledge Calls Section */}
      <section style={{
        padding: '160px 20px 100px 20px',
        background: '#F1F1F5',
        position: 'relative',
        minHeight: '800px'
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
              fontSize: '12px',
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
              fontFamily: "'Geist Mono', monospace",
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
          }}>
            {/* Terminal-style ASCII diagram */}
            <pre style={{
              color: '#ffffff',
              fontSize: '14px',
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
          marginBottom: '80px'
        }}>
          <div style={{
            fontSize: '12px',
            fontWeight: '500',
            letterSpacing: '0.1em',
            color: '#666666',
            marginBottom: '20px',
            fontFamily: "'Geist Mono', monospace",
            textTransform: 'uppercase',
            textAlign: 'center'
          }}>
            PAY JUST 5 CENTS PER MINUTE
          </div>
          <h2 style={{
            fontSize: 'clamp(32px, 6vw, 64px)',
            fontWeight: '700',
            color: '#000000',
            letterSpacing: '-0.02em',
            fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif",
            textAlign: 'center'
          }}>
            Payment Options
          </h2>
        </div>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px'
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

          {/* Crypto Wallet */}
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
                Crypto Wallet
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
              LiquidCalling in Comparison
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
                      fontFamily: "'Geist Mono', monospace",
                      color: '#c5dde0'
                    }}>
                      Feature
                    </th>
                    <th style={{
                      textAlign: 'left',
                      padding: '16px 20px',
                      fontWeight: '400',
                      fontFamily: "'Geist Mono', monospace",
                      color: '#c5dde0'
                    }}>
                      Signal
                    </th>
                    <th style={{
                      textAlign: 'left',
                      padding: '16px 20px',
                      fontWeight: '400',
                      fontFamily: "'Geist Mono', monospace",
                      color: '#c5dde0'
                    }}>
                      Telegram/WhatsApp/Zoom
                    </th>
                    <th style={{
                      textAlign: 'left',
                      padding: '16px 20px',
                      fontWeight: '400',
                      fontFamily: "'Geist Mono', monospace",
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
                        fontFamily: "'Geist Mono', monospace",
                        color: '#c2d9dc'
                      }}>
                        {row[0]}
                      </td>
                      <td style={{
                        padding: '16px 20px',
                        fontFamily: "'Geist Mono', monospace",
                        fontWeight: '400',
                        color: '#7f7f7f'
                      }}>
                        {row[1]}
                      </td>
                      <td style={{
                        padding: '16px 20px',
                        fontFamily: "'Geist Mono', monospace",
                        fontWeight: '400',
                        color: '#7f7f7f'
                      }}>
                        {row[2]}
                      </td>
                      <td style={{
                        padding: '16px 20px',
                        fontWeight: '400',
                        fontFamily: "'Geist Mono', monospace",
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '32px'
        }}>
          {/* Sensitive Business Calls */}
          <div style={{
            ...glassCardStyle,
            padding: '32px',
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
            padding: '32px',
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
            padding: '32px',
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
            padding: '32px',
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
            padding: '32px',
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
            padding: '32px',
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
          padding: '120px 20px 120px 20px',
          maxWidth: '1400px',
          margin: '0 auto',
          background: '#fff',
          borderRadius: '100px 100px 0 0',
          position: 'relative',
          minHeight: '850px'
        }}>
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
          fontFamily: "'Geist Mono', monospace",
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
          width: '565px',
          height: '96px',
          left: '680px',
          top: '160px',
          fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif",
          fontStyle: 'normal',
          fontWeight: '400',
          fontSize: '22px',
          lineHeight: '32px',
          color: '#333333'
        }}>
          WebRTC end-to-end encryption with DTLS-SRTP transport. P2P voice streaming means your calls never pass through our servers.
        </p>

        {/* Architecture Diagram Image Placeholder */}
        <div style={{
          position: 'absolute',
          width: '1060px',
          height: '400px',
          left: '50%',
          top: '340px',
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
              gap: '12px'
            }}>
              <div style={{
                fontSize: '12px',
                fontWeight: '600',
                padding: '4px 12px',
                background: '#E5E7EB',
                borderRadius: '6px'
              }}>
                USER'S BROWSER
              </div>
              <Mic size={32} color="#6B7280" />
              <div style={{ fontSize: '11px', textAlign: 'center', color: '#6B7280' }}>
                P2P VOICE<br />(EPHEMERAL)
              </div>
            </div>

            {/* Arrows */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <ArrowRight size={24} color="#6B7280" />
              <ArrowRight size={24} color="#6B7280" style={{ transform: 'rotate(180deg)' }} />
            </div>

            {/* Ephemeral Rooms (Diamond) */}
            <div style={{
              width: '120px',
              height: '120px',
              background: '#4D4DB3',
              transform: 'rotate(45deg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '16px',
              position: 'relative'
            }}>
              <div style={{
                transform: 'rotate(-45deg)',
                textAlign: 'center',
                color: '#fff'
              }}>
                <Lock size={24} style={{ margin: '0 auto 8px' }} />
                <div style={{ fontSize: '12px', fontWeight: '600' }}>
                  EPHEMERAL<br />ROOMS
                </div>
                <div style={{ fontSize: '10px', opacity: 0.9 }}>
                  24-HOUR EXPIRY
                </div>
              </div>
            </div>

            {/* Arrows */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <ArrowRight size={24} color="#6B7280" />
              <ArrowRight size={24} color="#6B7280" style={{ transform: 'rotate(180deg)' }} />
            </div>

            {/* Peer's Browser */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                fontSize: '12px',
                fontWeight: '600',
                padding: '4px 12px',
                background: '#E5E7EB',
                borderRadius: '6px'
              }}>
                PEER'S BROWSER
              </div>
              <Headphones size={32} color="#6B7280" />
              <div style={{ fontSize: '11px', textAlign: 'center', color: '#6B7280' }}>
                P2P VOICE<br />(EPHEMERAL)
              </div>
            </div>
          </div>
        </div>

        </div>
      </section>

      {/* 6. Developers Section */}
      <section style={{
        padding: '160px 20px 160px 20px',
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
            fontFamily: "'Geist Mono', monospace",
            textTransform: 'uppercase'
          }}>
            &lt; / &gt; FOR DEVELOPERS
          </div>

          <pre style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: 'clamp(6px, 0.9vw, 9px)',
            lineHeight: '1.1',
            color: '#c5dde0',
            whiteSpace: 'pre',
            margin: '0 0 40px 0',
            letterSpacing: '0px',
            overflow: 'hidden'
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
            fontSize: '16px',
            lineHeight: '32px',
            color: '#c5dde0',
            fontFamily: "'Geist Mono', monospace",
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
      <Footer />
    </div>
  )
}