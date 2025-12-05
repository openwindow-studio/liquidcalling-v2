'use client'

import '../../styles/design-system.css'
import '../../styles/liquid-layout.css'
import '../../styles/figma-responsive.css'

const howItWorksPageStyles = `
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

    /* Make steps stack on mobile */
    .steps-container {
      flex-direction: column !important;
      gap: 40px !important;
    }
  }
`
import { PrivyConnectButton } from '../../components/PrivyConnectButton'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

const StaticTorusCanvas = dynamic(() => import('../../components/StaticTorusCanvas'), { ssr: false })

export default function HowItWorksPage() {
  const router = useRouter()

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
        onClick={() => router.push('/')}
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
        {/* HOW IT WORKS Header */}
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

          <p style={{
            fontSize: '24px',
            lineHeight: '1.4',
            fontFamily: 'var(--font-primary)',
            fontWeight: '600',
            marginBottom: '24px'
          }}>
            Actually private calls in 3 clicks
          </p>

          <p style={{
            fontSize: '18px',
            lineHeight: '1.6',
            fontFamily: 'var(--font-primary)',
          }}>
            No phone numbers. No accounts. No trace.
          </p>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(31, 0, 0, 0.2)', margin: '60px 0' }} />

        {/* 3 Steps */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '48px',
            color: 'var(--color-primary-text)'
          }}>
            Three Clicks to Privacy
          </h2>

          <div className="steps-container" style={{ display: 'flex', gap: '60px' }}>
            {[
              {
                number: '1',
                title: 'Create Room',
                description: 'Click "Create a call link". An ephemeral room is instantly generated with a unique URL.'
              },
              {
                number: '2',
                title: 'Share Link',
                description: 'Send the link to anyone via any channel. They can join instantly from any browser.'
              },
              {
                number: '3',
                title: 'Start Talking',
                description: 'Click "Start Call" to begin. Voice flows through encrypted WebRTC channels. Room expires when done.'
              }
            ].map((step, i) => (
              <div key={i} style={{ flex: 1 }}>
                <div style={{
                  fontSize: '48px',
                  fontWeight: '600',
                  fontFamily: 'var(--font-primary)',
                  marginBottom: '16px',
                  opacity: 0.3
                }}>
                  {step.number}
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
                  opacity: 0.9
                }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(31, 0, 0, 0.2)', margin: '60px 0' }} />

        {/* Technical Architecture */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '32px',
            color: 'var(--color-primary-text)'
          }}>
            Technical Architecture
          </h2>

          <div style={{ marginBottom: '40px' }}>
            <h3 style={{
              fontFamily: 'Geist Mono, monospace',
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '16px'
            }}>
              WebRTC Infrastructure
            </h3>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.6',
              fontFamily: 'var(--font-primary)',
              marginBottom: '24px'
            }}>
              Peer-to-peer encrypted voice channels. Audio streams directly between participants without passing through our servers. HIPAA-compliant, SOC-2 certified infrastructure with zero-logs configuration.
            </p>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h3 style={{
              fontFamily: 'Geist Mono, monospace',
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '16px'
            }}>
              Ephemeral Rooms
            </h3>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.6',
              fontFamily: 'var(--font-primary)',
              marginBottom: '24px'
            }}>
              Each room is a unique, temporary URL that expires after 24 hours. No persistent storage, no call history, no metadata. When the room expires, it's as if the conversation never existed.
            </p>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h3 style={{
              fontFamily: 'Geist Mono, monospace',
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '16px'
            }}>
              Zero-Knowledge Design
            </h3>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.6',
              fontFamily: 'var(--font-primary)',
              marginBottom: '24px'
            }}>
              We never see: who you call, when you call, how long you talk, or what you say. The only data point: aggregate minutes used per room for billing. No user correlation possible across sessions.
            </p>
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
              <h3 style={{
                fontFamily: 'var(--font-primary)',
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '16px'
              }}>
                With Wallet (Recommended)
              </h3>
              <ol style={{ paddingLeft: '20px' }}>
                <li style={{
                  fontSize: '16px',
                  lineHeight: '1.8',
                  fontFamily: 'var(--font-primary)',
                  marginBottom: '8px'
                }}>
                  Connect wallet (Privy embedded or external)
                </li>
                <li style={{
                  fontSize: '16px',
                  lineHeight: '1.8',
                  fontFamily: 'var(--font-primary)',
                  marginBottom: '8px'
                }}>
                  Buy minutes with USDC or credit card
                </li>
                <li style={{
                  fontSize: '16px',
                  lineHeight: '1.8',
                  fontFamily: 'var(--font-primary)',
                  marginBottom: '8px'
                }}>
                  Minutes stored in your wallet balance
                </li>
                <li style={{
                  fontSize: '16px',
                  lineHeight: '1.8',
                  fontFamily: 'var(--font-primary)',
                  marginBottom: '8px'
                }}>
                  Auto-deduct as you talk
                </li>
              </ol>
            </div>

            <div style={{ flex: 1 }}>
              <h3 style={{
                fontFamily: 'var(--font-primary)',
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '16px'
              }}>
                Without Wallet (Demo)
              </h3>
              <ol style={{ paddingLeft: '20px' }}>
                <li style={{
                  fontSize: '16px',
                  lineHeight: '1.8',
                  fontFamily: 'var(--font-primary)',
                  marginBottom: '8px'
                }}>
                  Click "Try Demo"
                </li>
                <li style={{
                  fontSize: '16px',
                  lineHeight: '1.8',
                  fontFamily: 'var(--font-primary)',
                  marginBottom: '8px'
                }}>
                  Get 10 minutes free to test
                </li>
                <li style={{
                  fontSize: '16px',
                  lineHeight: '1.8',
                  fontFamily: 'var(--font-primary)',
                  marginBottom: '8px'
                }}>
                  Full privacy, no tracking
                </li>
                <li style={{
                  fontSize: '16px',
                  lineHeight: '1.8',
                  fontFamily: 'var(--font-primary)',
                  marginBottom: '8px'
                }}>
                  Connect wallet anytime to continue
                </li>
              </ol>
            </div>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(31, 0, 0, 0.2)', margin: '60px 0' }} />

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
                description: 'HIPAA-compliant infrastructure for protected health conversations.'
              },
              {
                title: 'Legal Discussions',
                description: 'Attorney-client privilege with no recording or metadata.'
              },
              {
                title: 'Whistleblowing',
                description: 'Speak to journalists or authorities without identity exposure.'
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

          <table style={{
            width: '100%',
            borderCollapse: 'collapse'
          }}>
            <tbody>
              {[
                ['No account required', 'No persistent identity to link calls together'],
                ['No phone numbers', 'No telecom records or SIM swap vulnerabilities'],
                ['Browser-based', 'No app permissions or device fingerprinting'],
                ['Ephemeral rooms', 'URLs expire, no call history exists'],
                ['WebRTC encryption', 'End-to-end encrypted voice channels'],
                ['Zero logs', 'No IP tracking, no metadata storage'],
                ['Crypto payments', 'Pseudonymous transactions, no KYC'],
                ['Open source SDK', 'Verify the privacy claims yourself']
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(31, 0, 0, 0.2)' }}>
                  <td style={{
                    padding: '16px',
                    fontFamily: 'Geist Mono, monospace',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: 'var(--color-primary-text)'
                  }}>
                    {row[0]}
                  </td>
                  <td style={{
                    padding: '16px',
                    fontFamily: 'var(--font-primary)',
                    fontSize: '14px',
                    color: 'var(--color-primary-text)'
                  }}>
                    {row[1]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(31, 0, 0, 0.2)', margin: '60px 0' }} />

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
          <button
            onClick={() => router.push('/')}
            style={{
              padding: '16px 48px',
              backgroundColor: 'rgba(0, 0, 31, 0.9)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontFamily: 'var(--font-primary)',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              marginRight: '16px'
            }}
          >
            Start Calling
          </button>
          <button
            onClick={() => window.open('https://github.com/liquidcalling/sdk', '_blank')}
            style={{
              padding: '16px 48px',
              backgroundColor: 'transparent',
              color: 'rgba(0, 0, 31, 0.9)',
              border: '2px solid rgba(0, 0, 31, 0.9)',
              borderRadius: '4px',
              fontFamily: 'var(--font-primary)',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            View SDK
          </button>
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