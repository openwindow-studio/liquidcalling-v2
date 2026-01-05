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
  Phone
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
        padding: '160px 20px 160px 20px',
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
            marginBottom: '120px',
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
{`┌─────────────┐    ┌─────────────────┐    ┌─────────────┐
│  YOUR VOICE │◄──►│ EPHEMERAL ROOMS │◄──►│ THEIR VOICE │
│     P2P     │    │   24HR EXPIRY   │    │     P2P     │
└─────────────┘    └─────────────────┘    └─────────────┘
                             │
                         E2E WEBRTC
                      ↓ DTLS-SRTP ↓
                   Voice Stream Direct`}
            </pre>
          </div>

          {/* CTA Section */}
          <div style={{
            textAlign: 'center'
          }}>
            <button
              onClick={() => router.push('/call')}
              style={{
                ...glassStyle,
                padding: '20px 60px',
                fontSize: '20px',
                fontWeight: '600',
                color: '#000000',
                fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                cursor: 'pointer'
              }}
            >
              Start a Call
            </button>
          </div>
        </div>
      </section>

      {/* 2. Payment Options Section */}
      <section style={{
        padding: '160px 20px 160px 20px',
        background: '#FFFFFF',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          marginBottom: '80px'
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: '500',
            letterSpacing: '0.1em',
            color: '#666666',
            marginBottom: '16px',
            fontFamily: "'Geist Mono', monospace",
            textTransform: 'uppercase'
          }}>
            PAYMENT OPTIONS
          </div>
          <h2 style={{
            fontSize: 'clamp(32px, 6vw, 64px)',
            fontWeight: '700',
            color: '#000000',
            letterSpacing: '-0.02em',
            fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif"
          }}>
            Payment Options
          </h2>
        </div>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
          gap: '48px'
        }}>
          {/* Credit Card */}
          <div style={{
            ...glassCardStyle,
            padding: '40px',
            position: 'relative'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <CreditCard size={28} color="#000000" />
              <h3 style={{
                fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                fontStyle: 'normal',
                fontWeight: '600',
                fontSize: '18px',
                lineHeight: '24px',
                letterSpacing: '0.02em',
                color: '#000000',
                margin: 0,
                paddingTop: '8px'
              }}>
                Credit Card
              </h3>
            </div>
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
              Pay directly with credit/debit card. Instant activation, no wallet required. Stripe-secured payments. Per-minute billing.
            </p>
          </div>

          {/* Crypto Wallet */}
          <div style={{
            ...glassCardStyle,
            padding: '40px',
            background: 'linear-gradient(135deg, #4D4DB3 0%, #8B7C5C 100%)',
            position: 'relative'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <Wallet size={28} color="#FFFFFF" />
              <h3 style={{
                fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                fontStyle: 'normal',
                fontWeight: '600',
                fontSize: '18px',
                lineHeight: '24px',
                letterSpacing: '0.02em',
                color: '#FFFFFF',
                margin: 0,
                paddingTop: '8px'
              }}>
                Crypto Wallet
              </h3>
            </div>
            <p style={{
              fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif",
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: '15px',
              lineHeight: '24px',
              letterSpacing: '0.01em',
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
        padding: '160px 20px',
        maxWidth: '1200px',
        margin: '0 auto',
        background: '#F1F1F5'
      }}>
        <div style={{
          fontSize: '14px',
          fontWeight: '500',
          letterSpacing: '0.1em',
          color: '#666666',
          marginBottom: '16px',
          fontFamily: "'Geist Mono', monospace",
          textTransform: 'uppercase'
        }}>
          COMPARISON CHART
        </div>
        <h2 style={{
          fontSize: 'clamp(32px, 6vw, 48px)',
          fontWeight: '700',
          color: '#4D4DB3',
          letterSpacing: '-0.01em',
          fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif"
        }}>
          LiquidCalling in Comparison
        </h2>

        <div style={{
          background: '#fff',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          padding: '24px',
          overflowX: 'auto',
          marginTop: '48px'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '14px'
          }}>
            <thead>
              <tr>
                <th style={{
                  textAlign: 'left',
                  padding: '12px',
                  borderBottom: '2px solid #e0e0e0',
                  fontWeight: '600'
                }}>
                  Feature
                </th>
                <th style={{
                  textAlign: 'left',
                  padding: '12px',
                  borderBottom: '2px solid #e0e0e0',
                  fontWeight: '600'
                }}>
                  Signal
                </th>
                <th style={{
                  textAlign: 'left',
                  padding: '12px',
                  borderBottom: '2px solid #e0e0e0',
                  fontWeight: '600'
                }}>
                  Telegram/WhatsApp/Zoom
                </th>
                <th style={{
                  textAlign: 'left',
                  padding: '12px',
                  borderBottom: '2px solid #e0e0e0',
                  fontWeight: '600',
                  background: '#8B7C5C',
                  color: '#fff'
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
                <tr key={i}>
                  <td style={{
                    padding: '12px',
                    borderBottom: '1px solid #e0e0e0',
                    fontWeight: '500'
                  }}>
                    {row[0]}
                  </td>
                  <td style={{
                    padding: '12px',
                    borderBottom: '1px solid #e0e0e0'
                  }}>
                    {row[1]}
                  </td>
                  <td style={{
                    padding: '12px',
                    borderBottom: '1px solid #e0e0e0'
                  }}>
                    {row[2]}
                  </td>
                  <td style={{
                    padding: '12px',
                    borderBottom: '1px solid #e0e0e0',
                    background: '#8B7C5C',
                    color: '#fff',
                    fontWeight: '500'
                  }}>
                    {row[3]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Perfect For Section */}
      <section style={{
        padding: '160px 20px 160px 20px',
        background: '#FFFFFF'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          marginBottom: '80px'
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: '500',
            letterSpacing: '0.1em',
            color: '#666666',
            marginBottom: '16px',
            fontFamily: "'Geist Mono', monospace",
            textTransform: 'uppercase'
          }}>
            USE CASES
          </div>
          <h2 style={{
            fontSize: 'clamp(32px, 6vw, 48px)',
            fontWeight: '700',
            color: '#4D4DB3',
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
              color: '#4D4DB3',
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
              color: '#4D4DB3',
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
              color: '#4D4DB3',
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
              color: '#4D4DB3',
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
              color: '#4D4DB3',
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
              color: '#4D4DB3',
              margin: 0
            }}>
              Attorney-client privilege with no recording or metadata.
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
              color: '#4D4DB3',
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
              color: '#4D4DB3',
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
              color: '#4D4DB3',
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
              color: '#4D4DB3',
              margin: 0
            }}>
              Discuss positions and strategies without fear of front-running or interception.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Our Privacy Architecture Section */}
      <section style={{
        padding: '120px 20px 200px 20px',
        maxWidth: '1400px',
        margin: '0 auto',
        background: '#fff',
        position: 'relative',
        minHeight: '900px'
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
          height: '547px',
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

        {/* DTLS-SRTP label under diagram */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '700px',
          transform: 'translateX(-50%)',
          fontSize: '12px',
          fontWeight: '600',
          color: '#6B7280'
        }}>
          DTLS-SRTP
        </div>
      </section>

      {/* 6. Developers Section */}
      <section style={{
        padding: '160px 20px 160px 20px',
        background: '#F1F1F5'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: '500',
            letterSpacing: '0.2em',
            opacity: 0.9,
            marginBottom: '30px',
            fontFamily: "'Geist Mono', monospace",
            textTransform: 'uppercase'
          }}>
            FOR DEVELOPERS
          </div>

          <pre style={{
            fontFamily: 'Consolas, Monaco, "Courier New", Courier, monospace',
            fontSize: 'clamp(3px, 0.8vw, 8px)',
            lineHeight: '1.0',
            color: '#FFFFFF',
            whiteSpace: 'pre',
            margin: '0 0 40px 0',
            letterSpacing: '0px',
            overflow: 'hidden'
          }}>
{`░██         ░██████  ░██████   ░██     ░██ ░██████░███████     ░██████     ░███    ░██         ░██         ░██████░███    ░██   ░██████       ░██████   ░███████   ░██     ░██
░██           ░██   ░██   ░██  ░██     ░██   ░██  ░██   ░██   ░██   ░██   ░██░██   ░██         ░██           ░██  ░████   ░██  ░██   ░██     ░██   ░██  ░██   ░██  ░██    ░██
░██           ░██  ░██     ░██ ░██     ░██   ░██  ░██    ░██ ░██         ░██  ░██  ░██         ░██           ░██  ░██░██  ░██ ░██           ░██         ░██    ░██ ░██   ░██
░██           ░██ ░██       ░██░██     ░██   ░██  ░██     ░██░██         ░██   ░██ ░██         ░██           ░██  ░██ ░██ ░██ ░██   ░██████░██   ░██████░██     ░██░██████
░██           ░██ ░██       ░██░██     ░██   ░██  ░██     ░██░██         ░██    ░██░██         ░██           ░██  ░██  ░██░██ ░██         ░██░██    ░█████░██     ░██░██   ░██
░██           ░██ ░██       ░██░██     ░██   ░██  ░██     ░██░██         ░██     ░██░██         ░██           ░██  ░██   ░███  ░██   ░██   ░██░██   ░██ ░██░██     ░██░██    ░██
░███████      ░██  ░██████   ░██ ░██████    ░██  ░███████   ░██████   ░██      ░██░███████     ░███████      ░██  ░██    ░██   ░██████       ░██████   ░███████   ░██     ░██`}
          </pre>

          <h2 style={{
            fontSize: 'clamp(32px, 6vw, 64px)',
            fontWeight: '700',
            color: '#000000',
            letterSpacing: '-0.02em',
            fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif",
            margin: '0 0 40px 0'
          }}>
            LiquidCalling Embed SDK
          </h2>

          <p style={{
            fontSize: 'clamp(16px, 3vw, 20px)',
            lineHeight: '1.6',
            color: '#333333',
            fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif",
            marginBottom: '40px',
            maxWidth: '800px',
            margin: '0 auto 40px auto'
          }}>
            The most private, embeddable voice calling modal in the world. Zero logs, true E2EE, HIPAA-compliant infrastructure.
          </p>

          <pre style={{
            background: '#f5f5f5',
            padding: '32px',
            borderRadius: '16px',
            overflow: 'auto',
            fontSize: '16px',
            fontFamily: 'monospace',
            textAlign: 'left',
            marginBottom: '40px',
            maxWidth: '600px',
            margin: '0 auto 40px auto'
          }}>
{`// 3-line integration
<LiquidCallingModal
  onCallEnd={(duration) => console.log(duration)}
/>`}
          </pre>

          <button style={{
            ...glassStyle,
            padding: '16px 32px',
            fontSize: '16px',
            fontWeight: '600',
            color: '#000000',
            fontFamily: "'Britti Sans', -apple-system, BlinkMacSystemFont, sans-serif",
            cursor: 'pointer'
          }}>
            View SDK Documentation
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}