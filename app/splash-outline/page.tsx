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

export default function SplashOutline() {
  const router = useRouter()

  return (
    <div style={{
      minHeight: '100vh',
      padding: '40px 20px',
      background: '#FAFAFA',
      color: '#333'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        {/* Section I: Header/Hero */}
        <section style={{ marginBottom: '60px' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            marginBottom: '24px',
            color: '#111'
          }}>
            LiquidCalling: Private Voice Calls for the Modern Internet
          </h1>

          <div style={{
            background: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '20px'
          }}>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.6',
              margin: 0
            }}>
              <strong>One-liner:</strong> Burner identity voice calls in 5 clicks or 30 seconds. No phone numbers. No data stored. No logs.
            </p>
          </div>

          <div style={{
            background: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '20px'
          }}>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.6',
              margin: 0
            }}>
              <strong>Pitch:</strong> We've built the most private voice calling system on the internet. True end-to-end encryption, WebRTC peer-to-peer connections, ephemeral rooms that expire in 24 hours. No accounts, no phone numbers, no metadata—just instant, secure voice calls that leave no trace.
            </p>
          </div>
        </section>

        {/* Section II: Privacy Architecture */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '32px',
            color: '#111'
          }}>
            Our Privacy Architecture
          </h2>

          {/* Technical Architecture */}
          <div style={{
            background: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '30px',
            marginBottom: '32px'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '24px',
              color: '#333'
            }}>
              Technical Architecture
            </h3>

            {/* Architecture Diagram */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
              marginBottom: '24px'
            }}>
              {/* User's Browser */}
              <div style={{
                textAlign: 'center',
                padding: '20px',
                background: '#f8f8f8',
                borderRadius: '8px'
              }}>
                <Mic size={24} style={{ margin: '0 auto 8px', display: 'block' }} />
                <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>USER'S BROWSER</div>
                <div style={{ fontSize: '11px', color: '#666' }}>P2P VOICE</div>
              </div>

              {/* Signaling Server */}
              <div style={{
                textAlign: 'center',
                padding: '20px',
                background: '#8B7C5C',
                borderRadius: '8px',
                color: '#fff'
              }}>
                <Lock size={24} style={{ margin: '0 auto 8px', display: 'block' }} />
                <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>EPHEMERAL ROOMS</div>
                <div style={{ fontSize: '11px', opacity: 0.9 }}>24-HOUR EXPIRY</div>
              </div>

              {/* Peer's Browser */}
              <div style={{
                textAlign: 'center',
                padding: '20px',
                background: '#f8f8f8',
                borderRadius: '8px'
              }}>
                <Headphones size={24} style={{ margin: '0 auto 8px', display: 'block' }} />
                <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>PEER'S BROWSER</div>
                <div style={{ fontSize: '11px', color: '#666' }}>P2P VOICE</div>
              </div>
            </div>

            {/* Key Features List */}
            <div style={{
              display: 'grid',
              gap: '12px'
            }}>
              <div style={{ fontSize: '14px' }}>
                • <strong>End-to-end encrypted</strong> - WebRTC with DTLS-SRTP transport
              </div>
              <div style={{ fontSize: '14px' }}>
                • <strong>P2P voice streaming</strong> - Direct browser-to-browser, no server recording
              </div>
              <div style={{ fontSize: '14px' }}>
                • <strong>Ephemeral rooms</strong> - Auto-expire after 24 hours
              </div>
            </div>
          </div>

          {/* Zero Knowledge */}
          <div style={{
            background: 'linear-gradient(135deg, #667EEA, #764BA2)',
            color: '#fff',
            borderRadius: '8px',
            padding: '30px',
            textAlign: 'center'
          }}>
            <h3 style={{
              fontSize: '22px',
              fontWeight: '600',
              marginBottom: '16px'
            }}>
              Zero Knowledge Calls
            </h3>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.6'
            }}>
              Your voice goes directly peer to peer. We never store or see anything.
            </p>
          </div>
        </section>

        {/* Section III: Payment Options */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '32px',
            color: '#111'
          }}>
            Payment Options
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px'
          }}>
            {/* Credit Card */}
            <div style={{
              background: '#fff',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              padding: '24px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <CreditCard size={20} />
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  margin: 0
                }}>
                  Credit Card
                </h3>
              </div>

              <ol style={{
                paddingLeft: '20px',
                margin: 0,
                fontSize: '14px',
                lineHeight: '1.8'
              }}>
                <li>Pay directly with credit/debit card</li>
                <li>Instant activation, no wallet required</li>
                <li>Stripe-secured payments</li>
                <li>Per-minute billing</li>
              </ol>
            </div>

            {/* Crypto Wallet */}
            <div style={{
              background: '#fff',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              padding: '24px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <Wallet size={20} />
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  margin: 0
                }}>
                  Crypto Wallet
                </h3>
              </div>

              <ol style={{
                paddingLeft: '20px',
                margin: 0,
                fontSize: '14px',
                lineHeight: '1.8'
              }}>
                <li>Connect wallet (Hyperliquid, Base, etc.)</li>
                <li>Pay with USDC or supported tokens</li>
                <li>True pseudonymity</li>
                <li>Auto-deduct from balance</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Section IV: Comparison Chart */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '32px',
            color: '#111'
          }}>
            LiquidCalling in Comparison
          </h2>

          <div style={{
            background: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '24px',
            overflowX: 'auto'
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

          {/* Use Cases */}
          <div style={{
            marginTop: '32px',
            background: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '24px'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '16px',
              color: '#333'
            }}>
              Perfect For
            </h3>
            <ul style={{
              paddingLeft: '20px',
              margin: 0,
              fontSize: '14px',
              lineHeight: '1.8'
            }}>
              <li>Sensitive business calls – discuss deals, strategy, or confidential matters without surveillance risk.</li>
              <li>Medical consultations – privacy-focused infrastructure for protected health conversations.</li>
              <li>Legal discussions – attorney-client privilege with no recording or metadata.</li>
              <li>Personal privacy – keep personal conversations truly personal, away from data harvesting.</li>
              <li>Crypto trading – discuss positions and strategies without fear of front-running.</li>
            </ul>
          </div>
        </section>

        {/* Section V: For Developers */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '32px',
            color: '#111'
          }}>
            For Developers: LiquidCalling Embed SDK
          </h2>

          <div style={{
            background: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '24px'
          }}>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.6',
              marginBottom: '20px'
            }}>
              <strong>For Developers:</strong> The most private, embeddable voice calling modal in the world. Zero logs, true E2EE, HIPAA-compliant infrastructure.
            </p>

            <pre style={{
              background: '#f5f5f5',
              padding: '16px',
              borderRadius: '4px',
              overflow: 'auto',
              fontSize: '13px',
              fontFamily: 'monospace'
            }}>
{`// 3-line integration
<LiquidCallingModal
  onCallEnd={(duration) => console.log(duration)}
/>`}
            </pre>

            <div style={{
              marginTop: '20px'
            }}>
              <button style={{
                background: '#8B7C5C',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                View SDK Documentation
              </button>
            </div>
          </div>
        </section>

        {/* Section VI: Why LiquidCalling */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '32px',
            color: '#111'
          }}>
            Why LiquidCalling?
          </h2>

          <div style={{
            display: 'grid',
            gap: '16px',
            marginBottom: '32px'
          }}>
            {[
              'Zero logs, no IP tracking, no stored data',
              'Voice-only mode means no cameras',
              '3-line integration, works instantly',
              'HIPAA-compliant infrastructure',
              'No user wallets/KYC required'
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: '#fff',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '16px'
              }}>
                <CheckCircle size={20} color="#059669" />
                <span style={{ fontSize: '14px' }}>{item}</span>
              </div>
            ))}
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #667EEA, #764BA2)',
            color: '#fff',
            borderRadius: '8px',
            padding: '32px',
            textAlign: 'center'
          }}>
            <p style={{
              fontSize: '18px',
              fontWeight: '600',
              lineHeight: '1.6',
              margin: 0
            }}>
              Ultimately: say whatever you want to without fear of surveillance
              like on Telegram, Signal, or a cell phone
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}