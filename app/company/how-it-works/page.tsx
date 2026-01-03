'use client'

import '../../../styles/design-system.css'
import '../../../styles/liquid-layout.css'
import '../../../styles/figma-responsive.css'
import { useState } from 'react'
import { PrivyConnectButton } from '../../../components/PrivyConnectButton'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import {
  Shield,
  Zap,
  Eye,
  MousePointer,
  Link,
  Phone,
  CreditCard,
  Wallet,
  Globe,
  Lock,
  Server,
  Database,
  UserX,
  PhoneOff,
  Clock,
  FileX
} from 'lucide-react'

const StaticTorusCanvas = dynamic(() => import('../../../components/StaticTorusCanvas'), { ssr: false })

const howItWorksPageStyles = `
  .interactive-step {
    transition: all 0.3s ease;
    cursor: pointer;
    border-radius: 8px;
    padding: 24px;
  }

  .interactive-step:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateY(-2px);
  }

  .interactive-step.active {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .step-icon {
    transition: all 0.3s ease;
  }

  .interactive-step:hover .step-icon {
    transform: scale(1.1);
  }

  .comparison-table {
    width: 100%;
    border-collapse: collapse;
    margin: 40px 0;
  }

  .comparison-table td {
    padding: 16px;
    border-bottom: 1px solid rgba(31, 0, 0, 0.2);
    vertical-align: top;
  }

  .comparison-table td:first-child {
    font-family: 'Geist Mono', monospace;
    font-size: 14px;
    font-weight: 600;
    color: var(--color-primary-text);
    width: 30%;
  }

  .comparison-table td:last-child {
    font-family: var(--font-primary);
    font-size: 14px;
    color: var(--color-primary-text);
  }

  @media (max-width: 768px) {
    .how-it-works-page-container {
      height: auto !important;
      min-height: 100vh !important;
      overflow-y: auto !important;
      -webkit-overflow-scrolling: touch !important;
      position: relative !important;
    }

    body {
      overflow: auto !important;
      height: auto !important;
    }

    .steps-container {
      flex-direction: column !important;
      gap: 40px !important;
    }

    .interactive-step {
      padding: 20px;
    }

    .comparison-table td {
      padding: 12px;
      font-size: 12px;
    }

    .comparison-table td:first-child {
      width: 40%;
    }

    /* Hide middle columns on mobile for comparison table */
    .hide-on-mobile {
      display: none !important;
    }
  }
`

export default function HowItWorksPage() {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState<number | null>(null)

  const steps = [
    {
      number: '1',
      title: 'Create Room',
      description: 'Click "Create a call link". An ephemeral room is instantly generated with a unique URL.',
      icon: MousePointer,
      detail: 'Room creation happens instantly without any registration or signup process.'
    },
    {
      number: '2',
      title: 'Share Link',
      description: 'Send the link to anyone via any channel. They can join instantly from any browser.',
      icon: Link,
      detail: 'Works across all devices and browsers with no app downloads required.'
    },
    {
      number: '3',
      title: 'Start Talking',
      description: 'Click "Start Call" to begin. Voice flows through encrypted channels. Room expires when done.',
      icon: Phone,
      detail: 'End-to-end encrypted audio with automatic room cleanup after 24 hours.'
    }
  ]

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: howItWorksPageStyles }} />

      {/* Fixed Background Torus */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -10,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}>
        <StaticTorusCanvas />
      </div>

      <div className="liquid-app how-it-works-page-container" style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: 'transparent',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch'
      }}>

      {/* Logo - FIGMA RESPONSIVE */}
      <div className="figma-logo" onClick={() => router.push('/')}>Liquid Calling</div>

      {/* Try Demo Button - FIGMA RESPONSIVE */}
      <button
        onClick={() => router.push('/?demo=true')}
        className="figma-demo-button"
      >
        <span className="figma-button-text">Try Demo</span>
      </button>

      {/* Connect Wallet Button - FIGMA RESPONSIVE */}
      <div className="figma-connect-button">
        <PrivyConnectButton />
      </div>

      {/* Main Content Container */}
      <div style={{
        maxWidth: '60vw',
        margin: '0 auto',
        paddingTop: '200px',
        paddingBottom: '120px',
        position: 'relative',
        zIndex: 10,
        mixBlendMode: 'color-burn',
        color: 'rgba(0, 0, 31, .85)'
      }}>
        {/* Page Title */}
        <div style={{ marginBottom: '80px' }}>
          <h1 style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '24px',
            fontWeight: '600',
            lineHeight: '1.1',
            marginBottom: '32px',
          }}>
            How It Works
          </h1>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(31, 0, 0, 0.2)', margin: '0 0 40px 0' }} />

          <p style={{
            fontSize: '24px',
            lineHeight: '1.4',
            fontFamily: 'var(--font-primary)',
            fontWeight: '600',
            marginBottom: '24px'
          }}>
            Three Clicks to Privacy
          </p>

          <p style={{
            fontSize: '18px',
            lineHeight: '1.6',
            fontFamily: 'var(--font-primary)',
            marginBottom: '48px'
          }}>
            No phone numbers • No accounts • No trace
          </p>

          {/* Interactive Steps */}
          <div className="steps-container" style={{ display: 'flex', gap: '60px' }}>
            {steps.map((step, i) => {
              const IconComponent = step.icon
              return (
                <div
                  key={i}
                  className={`interactive-step ${activeStep === i ? 'active' : ''}`}
                  style={{ flex: 1 }}
                  onClick={() => setActiveStep(activeStep === i ? null : i)}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '16px',
                    gap: '12px'
                  }}>
                    <div style={{
                      fontSize: '32px',
                      fontWeight: '600',
                      fontFamily: 'var(--font-primary)',
                      opacity: 0.3,
                      minWidth: '40px'
                    }}>
                      {step.number}
                    </div>
                    <div className="step-icon">
                      <IconComponent size={24} />
                    </div>
                  </div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    fontFamily: 'var(--font-primary)',
                    marginBottom: '12px'
                  }}>
                    {step.title}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    lineHeight: '1.6',
                    fontFamily: 'var(--font-primary)',
                    opacity: 0.9,
                    marginBottom: activeStep === i ? '16px' : '0'
                  }}>
                    {step.description}
                  </p>
                  {activeStep === i && (
                    <div style={{
                      fontSize: '13px',
                      lineHeight: '1.5',
                      fontFamily: 'var(--font-primary)',
                      opacity: 0.7,
                      fontStyle: 'italic',
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: '12px',
                      borderRadius: '4px',
                      marginTop: '12px'
                    }}>
                      {step.detail}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(31, 0, 0, 0.2)', margin: '60px 0' }} />

        {/* Privacy Architecture */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '60px',
            padding: '60px 0',
            background: 'rgba(0, 0, 0, 0.9)',
            borderRadius: '12px',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Background pattern */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              opacity: 0.3
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                fontSize: '14px',
                fontFamily: 'Geist Mono, monospace',
                fontWeight: '500',
                letterSpacing: '1px',
                marginBottom: '20px',
                color: 'rgba(255, 255, 255, 0.7)'
              }}>
                END-TO-END ENCRYPTED
              </div>

              <h2 style={{
                fontFamily: 'var(--font-primary)',
                fontSize: '36px',
                fontWeight: '700',
                marginBottom: '20px',
                margin: '0 0 20px 0'
              }}>
                Our Privacy<br />Architecture
              </h2>

              <p style={{
                fontSize: '18px',
                lineHeight: '1.6',
                fontFamily: 'var(--font-primary)',
                marginBottom: '0',
                maxWidth: '600px',
                margin: '0 auto',
                color: 'rgba(255, 255, 255, 0.9)'
              }}>
                WebRTC end-to-end encryption with DTLS-SRTP transport. P2P voice streaming means your calls never pass through our servers.
              </p>
            </div>
          </div>

          {/* Architecture Diagram */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '60px',
            margin: '80px 0',
            flexWrap: 'wrap'
          }}>
            {/* User's Browser */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-30px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: 'Geist Mono, monospace',
                fontSize: '12px',
                fontWeight: '500',
                color: 'rgba(0, 0, 31, 0.7)',
                whiteSpace: 'nowrap'
              }}>
                ENCRYPTED WEBRTC
              </div>
              <div style={{
                width: '200px',
                height: '140px',
                border: '2px solid rgba(0, 0, 31, 0.2)',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.02)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '12px',
                  background: 'rgba(241, 241, 245, 1)',
                  padding: '4px 8px',
                  fontFamily: 'Geist Mono, monospace',
                  fontSize: '10px',
                  fontWeight: '600',
                  color: 'rgba(0, 0, 31, 0.9)',
                  borderRadius: '4px'
                }}>
                  USER'S BROWSER
                </div>
                <div style={{
                  fontSize: '32px',
                  marginBottom: '8px'
                }}>🎙️</div>
                <div style={{
                  fontFamily: 'Geist Mono, monospace',
                  fontSize: '11px',
                  textAlign: 'center',
                  lineHeight: '1.4',
                  color: 'rgba(0, 0, 31, 0.8)'
                }}>
                  P2P VOICE<br />
                  (EPHEMERAL)
                </div>
              </div>
            </div>

            {/* Arrow to Proxy */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{
                fontFamily: 'Geist Mono, monospace',
                fontSize: '10px',
                color: 'rgba(0, 0, 31, 0.6)',
                transform: 'rotate(-15deg)'
              }}>
                ENCRYPTED WEBRTC
              </div>
              <div style={{
                fontSize: '24px',
                color: 'rgba(0, 0, 31, 0.4)'
              }}>→</div>
            </div>

            {/* Signaling Server */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative'
            }}>
              <div style={{
                width: '140px',
                height: '140px',
                background: 'linear-gradient(135deg, rgba(139, 118, 92, 0.9), rgba(139, 118, 92, 0.7))',
                border: '2px solid rgba(139, 118, 92, 0.3)',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transform: 'rotate(45deg)',
                position: 'relative'
              }}>
                <div style={{
                  fontSize: '20px',
                  transform: 'rotate(-45deg)'
                }}>🔒</div>
                <div style={{
                  fontFamily: 'Geist Mono, monospace',
                  fontSize: '9px',
                  fontWeight: '600',
                  textAlign: 'center',
                  lineHeight: '1.2',
                  color: 'white',
                  transform: 'rotate(-45deg)'
                }}>
                  EPHEMERAL<br />ROOMS
                </div>
              </div>
            </div>

            {/* Arrow to WebRTC */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{
                fontFamily: 'Geist Mono, monospace',
                fontSize: '10px',
                color: 'rgba(0, 0, 31, 0.6)',
                transform: 'rotate(15deg)'
              }}>
                ENCRYPTED WEBRTC
              </div>
              <div style={{
                fontSize: '24px',
                color: 'rgba(0, 0, 31, 0.4)'
              }}>→</div>
            </div>

            {/* Peer Browser */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-30px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: 'Geist Mono, monospace',
                fontSize: '12px',
                fontWeight: '500',
                color: 'rgba(0, 0, 31, 0.7)',
                whiteSpace: 'nowrap'
              }}>
                DTLS-SRTP
              </div>
              <div style={{
                width: '200px',
                height: '140px',
                border: '2px solid rgba(0, 0, 31, 0.2)',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.02)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '12px',
                  background: 'rgba(241, 241, 245, 1)',
                  padding: '4px 8px',
                  fontFamily: 'Geist Mono, monospace',
                  fontSize: '10px',
                  fontWeight: '600',
                  color: 'rgba(0, 0, 31, 0.9)',
                  borderRadius: '4px'
                }}>
                  PEER'S BROWSER
                </div>
                <div style={{
                  fontSize: '32px',
                  marginBottom: '8px'
                }}>🎧</div>
                <div style={{
                  fontFamily: 'Geist Mono, monospace',
                  fontSize: '11px',
                  textAlign: 'center',
                  lineHeight: '1.4',
                  color: 'rgba(0, 0, 31, 0.8)'
                }}>
                  P2P VOICE<br />
                  (EPHEMERAL)
                </div>
              </div>
            </div>
          </div>

          {/* Response Arrows */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '40px 0 20px 0'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '40px',
              width: '100%',
              maxWidth: '700px',
              justifyContent: 'space-between'
            }}>
              <div style={{
                fontFamily: 'Geist Mono, monospace',
                fontSize: '10px',
                color: 'rgba(0, 0, 31, 0.6)',
                borderBottom: '1px dotted rgba(0, 0, 31, 0.3)',
                paddingBottom: '4px',
                flexGrow: 1,
                textAlign: 'center'
              }}>
                END-TO-END ENCRYPTED • P2P STREAMING • NO RECORDING
              </div>
            </div>
          </div>

        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(31, 0, 0, 0.2)', margin: '60px 0' }} />

        {/* Payment Flow */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '32px',
            color: 'var(--color-primary-text)'
          }}>
            Payment Options
          </h2>

          <div style={{ display: 'flex', gap: '60px' }}>
            <div style={{ flex: 1 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <CreditCard size={20} />
                <h3 style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: '18px',
                  fontWeight: '600',
                  margin: 0
                }}>
                  Credit Card
                </h3>
              </div>
              <ol style={{ paddingLeft: '20px' }}>
                <li style={{
                  fontSize: '16px',
                  lineHeight: '1.8',
                  fontFamily: 'var(--font-primary)',
                  marginBottom: '8px'
                }}>
                  Pay directly with credit/debit card
                </li>
                <li style={{
                  fontSize: '16px',
                  lineHeight: '1.8',
                  fontFamily: 'var(--font-primary)',
                  marginBottom: '8px'
                }}>
                  Instant activation, no wallet required
                </li>
                <li style={{
                  fontSize: '16px',
                  lineHeight: '1.8',
                  fontFamily: 'var(--font-primary)',
                  marginBottom: '8px'
                }}>
                  Stripe-secured payments
                </li>
                <li style={{
                  fontSize: '16px',
                  lineHeight: '1.8',
                  fontFamily: 'var(--font-primary)',
                  marginBottom: '8px'
                }}>
                  Per-minute billing
                </li>
              </ol>
            </div>

            <div style={{ flex: 1 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <Wallet size={20} />
                <h3 style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: '18px',
                  fontWeight: '600',
                  margin: 0
                }}>
                  Crypto Wallet
                </h3>
              </div>
              <ol style={{ paddingLeft: '20px' }}>
                <li style={{
                  fontSize: '16px',
                  lineHeight: '1.8',
                  fontFamily: 'var(--font-primary)',
                  marginBottom: '8px'
                }}>
                  Connect wallet (Hyperliquid, Base, etc.)
                </li>
                <li style={{
                  fontSize: '16px',
                  lineHeight: '1.8',
                  fontFamily: 'var(--font-primary)',
                  marginBottom: '8px'
                }}>
                  Pay with USDC or supported tokens
                </li>
                <li style={{
                  fontSize: '16px',
                  lineHeight: '1.8',
                  fontFamily: 'var(--font-primary)',
                  marginBottom: '8px'
                }}>
                  True pseudonymity
                </li>
                <li style={{
                  fontSize: '16px',
                  lineHeight: '1.8',
                  fontFamily: 'var(--font-primary)',
                  marginBottom: '8px'
                }}>
                  Auto-deduct from balance
                </li>
              </ol>
            </div>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(31, 0, 0, 0.2)', margin: '60px 0' }} />

        {/* Liquid Calling Comparison */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '32px',
            color: 'var(--color-primary-text)'
          }}>
            LiquidCalling in Comparison
          </h2>

          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <thead>
              <tr style={{
                borderBottom: '2px solid rgba(31, 0, 0, 0.3)',
                background: 'rgba(255, 255, 255, 0.05)'
              }}>
                <th style={{
                  padding: '16px',
                  textAlign: 'left',
                  fontFamily: 'Geist Mono, monospace',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: 'var(--color-primary-text)'
                }}>
                  Feature
                </th>
                <th className="hide-on-mobile" style={{
                  padding: '16px',
                  textAlign: 'left',
                  fontFamily: 'Geist Mono, monospace',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: 'var(--color-primary-text)'
                }}>
                  Signal
                </th>
                <th className="hide-on-mobile" style={{
                  padding: '16px',
                  textAlign: 'left',
                  fontFamily: 'Geist Mono, monospace',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: 'var(--color-primary-text)'
                }}>
                  Telegram/WhatsApp/Zoom
                </th>
                <th style={{
                  padding: '16px',
                  textAlign: 'left',
                  fontFamily: 'Geist Mono, monospace',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: 'var(--color-primary-text)',
                  background: 'rgba(0, 31, 0, 0.1)'
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
                <tr key={i} style={{
                  borderBottom: '1px solid rgba(31, 0, 0, 0.2)',
                  transition: 'background-color 0.2s ease'
                }}>
                  <td style={{
                    padding: '16px',
                    fontFamily: 'Geist Mono, monospace',
                    fontSize: '12px',
                    color: 'var(--color-primary-text)',
                    fontWeight: '500'
                  }}>
                    {row[0]}
                  </td>
                  <td className="hide-on-mobile" style={{
                    padding: '16px',
                    fontFamily: 'Geist Mono, monospace',
                    fontSize: '12px',
                    color: 'var(--color-primary-text)',
                    opacity: 0.7
                  }}>
                    {row[1]}
                  </td>
                  <td className="hide-on-mobile" style={{
                    padding: '16px',
                    fontFamily: 'Geist Mono, monospace',
                    fontSize: '12px',
                    color: 'var(--color-primary-text)',
                    opacity: 0.7
                  }}>
                    {row[2]}
                  </td>
                  <td style={{
                    padding: '16px',
                    fontFamily: 'Geist Mono, monospace',
                    fontSize: '12px',
                    color: 'var(--color-primary-text)',
                    fontWeight: '600',
                    background: 'rgba(0, 31, 0, 0.05)'
                  }}>
                    {row[3]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Use Cases */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '32px',
            color: 'var(--color-primary-text)'
          }}>
            Perfect For
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            {[
              {
                title: 'Sensitive Business Calls',
                description: 'Discuss deals, strategy, or confidential matters without surveillance risk.'
              },
              {
                title: 'Medical Consultations',
                description: 'Privacy-focused infrastructure for protected health conversations.'
              },
              {
                title: 'Legal Discussions',
                description: 'Attorney-client privilege with no recording or metadata.'
              },
              {
                title: 'Personal Privacy',
                description: 'Keep personal conversations truly personal, away from data harvesting.'
              },
              {
                title: 'Crypto Trading',
                description: 'Discuss positions and strategies without fear of front-running.'
              }
            ].map((useCase, i) => (
              <div key={i}>
                <h3 style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: '16px',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>
                  {useCase.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.6',
                  fontFamily: 'var(--font-primary)',
                  opacity: 0.9
                }}>
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(31, 0, 0, 0.2)', margin: '60px 0' }} />

        {/* What We Never Collect */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '32px'
          }}>
            <FileX size={24} />
            <h2 style={{
              fontFamily: 'var(--font-primary)',
              fontSize: '24px',
              fontWeight: '600',
              margin: 0,
              color: 'var(--color-primary-text)'
            }}>
              What We Never Collect
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            {[
              { icon: UserX, title: 'Personal Identifiers', description: 'No names, emails, phone numbers, or persistent user IDs' },
              { icon: PhoneOff, title: 'Call Metadata', description: 'No duration logs, participant lists, or connection records' },
              { icon: Eye, title: 'Content Monitoring', description: 'No audio recording, transcription, or conversation analysis' },
              { icon: Server, title: 'Network Tracking', description: 'No IP logging, device fingerprinting, or location data' },
              { icon: Database, title: 'Usage Patterns', description: 'No behavioral tracking or cross-session correlation' },
              { icon: Lock, title: 'Account Data', description: 'No profiles, preferences, or persistent authentication' }
            ].map((item, i) => {
              const IconComponent = item.icon
              return (
                <div key={i} style={{
                  display: 'flex',
                  gap: '16px',
                  padding: '20px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <IconComponent size={20} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <h3 style={{
                      fontFamily: 'var(--font-primary)',
                      fontSize: '16px',
                      fontWeight: '600',
                      marginBottom: '8px',
                      margin: '0 0 8px 0'
                    }}>
                      {item.title}
                    </h3>
                    <p style={{
                      fontFamily: 'var(--font-primary)',
                      fontSize: '14px',
                      lineHeight: '1.5',
                      opacity: 0.8,
                      margin: 0
                    }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(31, 0, 0, 0.2)', margin: '60px 0' }} />

        {/* Security Guarantees */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '32px',
            color: 'var(--color-primary-text)'
          }}>
            What Makes This Actually Private
          </h2>

          <table className="comparison-table">
            <tbody>
              {[
                ['No account required', 'No persistent identity to link calls together'],
                ['No phone numbers', 'No telecom records or SIM swap vulnerabilities'],
                ['Browser-based', 'No app permissions or device fingerprinting'],
                ['Ephemeral rooms', 'URLs expire, no call history exists'],
                ['P2P encryption', 'End-to-end encrypted voice channels'],
                ['Zero logs', 'No IP tracking, no metadata storage'],
                ['Crypto payments', 'Pseudonymous transactions, no KYC']
              ].map((row, i) => (
                <tr key={i}>
                  <td>{row[0]}</td>
                  <td>{row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <p style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '32px',
            fontWeight: '600',
            color: 'var(--color-primary-text)',
            marginBottom: '32px'
          }}>
            Ready to speak freely?
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
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
                fontFamily: 'var(--font-primary)',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
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
            <button
              onClick={() => router.push('/sdk')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '16px 48px',
                backgroundColor: 'transparent',
                color: 'rgba(0, 0, 31, 0.9)',
                border: '2px solid rgba(0, 0, 31, 0.9)',
                borderRadius: '4px',
                fontFamily: 'var(--font-primary)',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 31, 0.05)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <Eye size={18} />
              View SDK
            </button>
          </div>
        </div>

      </div>

      {/* Footer - positioned at bottom right */}
      <div style={{
        position: 'relative',
        right: '20px',
        bottom: '20px',
        textAlign: 'right',
        fontFamily: 'var(--font-geist-mono), monospace',
        color: 'rgba(31, 0, 0, 0.9)',
        fontSize: '10px'
      }}>
        LIQUIDCALLING ©2025
      </div>
    </div>
    </>
  )
}