'use client'

import '../../styles/design-system.css'
import '../../styles/liquid-layout.css'
import '../../styles/figma-responsive.css'

const privacyPageStyles = `
  @media (max-width: 768px) {
    .privacy-page-container {
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

    /* Hide middle columns on mobile */
    .hide-on-mobile {
      display: none !important;
    }

    /* Make tech section more mobile friendly */
    .tech-section-mobile {
      flex-direction: column !important;
      gap: 40px !important;
    }

    .tech-section-mobile > div {
      flex: none !important;
    }
  }
`
import { PrivyConnectButton } from '../../components/PrivyConnectButton'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

const StaticTorusCanvas = dynamic(() => import('../../components/StaticTorusCanvas'), { ssr: false })

export default function PrivacyPage() {
  const router = useRouter()

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: privacyPageStyles }} />

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

      <div className="liquid-app privacy-page-container" style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: 'transparent',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch'
      }}>

      {/* Logo - FIGMA RESPONSIVE - exact same as main page */}
      <div className="figma-logo" onClick={() => router.push('/')}>Liquid Calling</div>

      {/* Try Demo Button - FIGMA RESPONSIVE */}
      <button
        onClick={() => router.push('/')}
        className="figma-demo-button"
      >
        <span className="figma-button-text">Try Demo</span>
      </button>

      {/* Info Link - Desktop Only */}
      <div
        className="figma-how-it-works-link"
        onClick={() => router.push('/info')}
      >
        Info
      </div>

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
        {/* PRIVACY BY ARCHITECTURE Section */}
        <div style={{ marginBottom: '80px' }}>
          <h1 style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '24px',
            fontWeight: '600',
            lineHeight: '1.1',
            marginBottom: '32px',
          }}>
            Privacy by Architecture
          </h1>

          <p style={{
            fontSize: '18px',
            lineHeight: '1.6',
            fontFamily: 'var(--font-primary)',
            marginBottom: '24px'
          }}>
            We live in a world where you can be prosecuted for your opinions, no device is secure, and what you say on your own hardware is sold back to you.
          </p>

          <p style={{
            fontSize: '20px',
            lineHeight: '1.6',
            fontFamily: 'var(--font-primary)',
            fontWeight: '600'
          }}>
            This is wrong.
          </p>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(31, 0, 0, 0.2)', margin: '60px 0' }} />

        {/* PRIVACY BY CHOICE Section */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '24px',
            fontWeight: '600',
            lineHeight: '1.1',
            marginBottom: '32px',
          }}>
            Privacy by Choice
          </h2>

          <p style={{
            fontSize: '18px',
            lineHeight: '1.6',
            fontFamily: 'var(--font-primary)',
            marginBottom: '24px'
          }}>
            Use Liquid Calling to speak freely and leave no trace.
          </p>

          <p style={{
            fontSize: '18px',
            lineHeight: '1.6',
            fontFamily: 'var(--font-primary)',
            marginBottom: '24px'
          }}>
            We make money one way only: We charge $0.05 per minute.
          </p>

          <p style={{
            fontSize: '18px',
            lineHeight: '1.6',
            fontFamily: 'var(--font-primary)',
          }}>
            No Data Sales. No Ads. No Questions.
          </p>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(31, 0, 0, 0.2)', margin: '60px 0' }} />

        {/* Comparison Table */}
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
            borderCollapse: 'collapse'
          }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-primary-text)' }}>
                <th style={{ padding: '16px', textAlign: 'left', fontFamily: 'Geist Mono, monospace', fontSize: '14px', fontWeight: '600', color: 'var(--color-primary-text)' }}>
                  Feature
                </th>
                <th className="hide-on-mobile" style={{ padding: '16px', textAlign: 'left', fontFamily: 'Geist Mono, monospace', fontSize: '14px', fontWeight: '600', color: 'var(--color-primary-text)' }}>
                  Signal
                </th>
                <th className="hide-on-mobile" style={{ padding: '16px', textAlign: 'left', fontFamily: 'Geist Mono, monospace', fontSize: '14px', fontWeight: '600', color: 'var(--color-primary-text)' }}>
                  Telegram/WhatsApp/Zoom
                </th>
                <th style={{ padding: '16px', textAlign: 'left', fontFamily: 'Geist Mono, monospace', fontSize: '14px', fontWeight: '600', color: 'var(--color-primary-text)' }}>
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
                ['HIPAA-compliant path', 'No', 'No', 'Yes'],
                ['Runs in any browser, no install', 'No', 'No', 'Yes']
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(31, 0, 0, 0.2)' }}>
                  <td style={{ padding: '16px', fontFamily: 'Geist Mono, monospace', fontSize: '12px', color: 'var(--color-primary-text)' }}>{row[0]}</td>
                  <td className="hide-on-mobile" style={{ padding: '16px', fontFamily: 'Geist Mono, monospace', fontSize: '12px', color: 'var(--color-primary-text)' }}>{row[1]}</td>
                  <td className="hide-on-mobile" style={{ padding: '16px', fontFamily: 'Geist Mono, monospace', fontSize: '12px', color: 'var(--color-primary-text)' }}>{row[2]}</td>
                  <td style={{ padding: '16px', fontFamily: 'Geist Mono, monospace', fontSize: '12px', color: 'var(--color-primary-text)', fontWeight: '600' }}>{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* What we never collect */}
        <div style={{ marginBottom: '80px', marginTop: '80px' }}>
          <h2 style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '32px',
            color: 'var(--color-primary-text)'
          }}>
            What We Never Collect
          </h2>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-primary-text)' }}>
                <th style={{ padding: '16px', textAlign: 'left', fontFamily: 'Geist Mono, monospace', fontSize: '14px', fontWeight: '600', color: 'var(--color-primary-text)' }}>
                  We never collect or store
                </th>
                <th className="hide-on-mobile" style={{ padding: '16px', textAlign: 'left', fontFamily: 'Geist Mono, monospace', fontSize: '14px', fontWeight: '600', color: 'var(--color-primary-text)' }}>
                  Why it never exists
                </th>
                <th style={{ padding: '16px', textAlign: 'left', fontFamily: 'Geist Mono, monospace', fontSize: '14px', fontWeight: '600', color: 'var(--color-primary-text)' }}>
                  What this protects you from
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Phone numbers', 'Never asked', 'SIM swaps, telecom subpoenas'],
                ['Permanent accounts', 'None exist', 'Identity linkage forever'],
                ['Call metadata (who called whom, when, duration)', 'No database rows ever created', 'Social-graph reconstruction'],
                ['IP addresses', 'WebRTC + privacy relays; we never log', 'ISP/government correlation'],
                ['Participant lists', 'Rooms are ephemeral URLs only', 'Leaked group membership'],
                ['Cookies or fingerprints', 'None set', 'Cross-site tracking']
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(31, 0, 0, 0.2)' }}>
                  <td style={{ padding: '16px', fontFamily: 'Geist Mono, monospace', fontSize: '12px', color: 'var(--color-primary-text)' }}>{row[0]}</td>
                  <td className="hide-on-mobile" style={{ padding: '16px', fontFamily: 'Geist Mono, monospace', fontSize: '12px', color: 'var(--color-primary-text)' }}>{row[1]}</td>
                  <td style={{ padding: '16px', fontFamily: 'Geist Mono, monospace', fontSize: '12px', color: 'var(--color-primary-text)' }}>{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Technical Truth and Architecture */}
        <div style={{ marginBottom: '80px', marginTop: '80px' }}>
          <h2 style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '32px',
            color: 'var(--color-primary-text)'
          }}>
            Technical Truth and Architecture
          </h2>

          <div className="tech-section-mobile" style={{ display: 'flex', gap: '60px' }}>
            {/* Left Column */}
            <div style={{ flex: 1 }}>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {[
                  ['Zero-knowledge by design', 'No way to correlate users across sessions, even if we wanted to'],
                  ['Room creation & billing', 'lightweight Next.js API routes (only store room ID → expiry + total minutes used)'],
                  ['Authentication', 'Privy embedded wallets (optional) or completely guest'],
                  ['Payments', 'on-chain USDC (Base + Hyperliquid) or Stripe → one-way, no user records retained'],
                  ['Data persistence', 'none for participants, only aggregate minute counter per room']
                ].map(([label, desc], i) => (
                  <li key={i} style={{ marginBottom: '20px', minHeight: '80px', display: 'flex', alignItems: 'flex-start' }}>
                    <div>
                      <span style={{ fontFamily: 'Geist Mono, monospace', fontWeight: '600', fontSize: '13px', color: 'var(--color-primary-text)' }}>
                        {label} →
                      </span>
                      <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '13px', color: 'var(--color-primary-text)', marginLeft: '8px' }}>
                        {desc}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column */}
            <div style={{ flex: 1 }}>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {[
                  ['Media & signaling', 'WebRTC (HIPAA/SOC-2, zero-logs tier)'],
                  ['Ephemeral rooms', 'URLs expire automatically, no permanent chat history or participant records'],
                  ['No surveillance surface', "Can't be compelled to hand over data that doesn't exist"],
                  ['Cryptographic payments', 'Blockchain transactions are public but pseudonymous, no KYC required'],
                  ['Incident response', "Even in a breach scenario, there's no user data to compromise"]
                ].map(([label, desc], i) => (
                  <li key={i} style={{ marginBottom: '20px', minHeight: '80px', display: 'flex', alignItems: 'flex-start' }}>
                    <div>
                      <span style={{ fontFamily: 'Geist Mono, monospace', fontWeight: '600', fontSize: '13px', color: 'var(--color-primary-text)' }}>
                        {label} →
                      </span>
                      <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: '13px', color: 'var(--color-primary-text)', marginLeft: '8px' }}>
                        {desc}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(31, 0, 0, 0.2)', margin: '60px 0' }} />

        {/* Bottom statement */}
        <p style={{
          fontFamily: 'var(--font-primary)',
          fontSize: '32px',
          fontWeight: '600',
          color: 'var(--color-primary-text)',
          textAlign: 'center',
          marginBottom: '80px'
        }}>
          Speak freely. Pay almost nothing. Leave no trace.
        </p>

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