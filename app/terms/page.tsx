'use client'

import '../../styles/design-system.css'
import '../../styles/liquid-layout.css'
import '../../styles/figma-responsive.css'

const termsPageStyles = `
  @media (max-width: 768px) {
    .terms-page-container {
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
  }
`
import { PrivyConnectButton } from '../../components/PrivyConnectButton'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

const StaticTorusCanvas = dynamic(() => import('../../components/StaticTorusCanvas'), { ssr: false })

export default function TermsPage() {
  const router = useRouter()

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: termsPageStyles }} />

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

      <div className="liquid-app terms-page-container" style={{
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
        {/* TERMS OF SERVICE Header */}
        <div style={{ marginBottom: '80px' }}>
          <h1 style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '24px',
            fontWeight: '600',
            lineHeight: '1.1',
            marginBottom: '32px',
          }}>
            Terms of Service
          </h1>

          <p style={{
            fontSize: '18px',
            lineHeight: '1.6',
            fontFamily: 'var(--font-primary)',
            marginBottom: '24px'
          }}>
            Effective Date: January 1, 2025
          </p>
        </div>

        {/* Core Terms Section */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '24px',
            fontWeight: '600',
            lineHeight: '1.1',
            marginBottom: '32px',
          }}>
            Simple Terms for Private Calling
          </h2>

          <p style={{
            fontSize: '18px',
            lineHeight: '1.6',
            fontFamily: 'var(--font-primary)',
            marginBottom: '24px'
          }}>
            <strong>What we provide:</strong> Ephemeral, encrypted voice calling at $0.05 per minute.
          </p>

          <p style={{
            fontSize: '18px',
            lineHeight: '1.6',
            fontFamily: 'var(--font-primary)',
            marginBottom: '24px'
          }}>
            <strong>What we don't do:</strong> Store your calls, track your identity, or sell your data.
          </p>

          <p style={{
            fontSize: '18px',
            lineHeight: '1.6',
            fontFamily: 'var(--font-primary)',
            marginBottom: '24px'
          }}>
            <strong>What you can't do:</strong> Use this service for illegal activities, harassment, or emergency calls (call 911 for emergencies).
          </p>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(31, 0, 0, 0.2)', margin: '60px 0' }} />

        {/* Service Description */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '24px',
            fontWeight: '600',
            lineHeight: '1.1',
            marginBottom: '32px',
          }}>
            Service Description
          </h2>

          <ul style={{ listStyle: 'none', padding: 0 }}>
            {[
              'Browser-based voice calling with no app installation required',
              'Rooms expire automatically with no persistent storage',
              'WebRTC encrypted channels (HIPAA/SOC-2 compliant infrastructure)',
              'Pay-per-minute model with no subscription or hidden fees',
              'Optional wallet connection - works completely anonymous'
            ].map((item, i) => (
              <li key={i} style={{
                fontSize: '18px',
                lineHeight: '1.8',
                fontFamily: 'var(--font-primary)',
                marginBottom: '16px',
                paddingLeft: '24px',
                position: 'relative'
              }}>
                <span style={{ position: 'absolute', left: 0 }}>•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(31, 0, 0, 0.2)', margin: '60px 0' }} />

        {/* Acceptable Use */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '32px',
            color: 'var(--color-primary-text)'
          }}>
            Acceptable Use Policy
          </h2>

          <p style={{
            fontSize: '18px',
            lineHeight: '1.6',
            fontFamily: 'var(--font-primary)',
            marginBottom: '24px'
          }}>
            <strong>Prohibited uses:</strong>
          </p>

          <ul style={{ listStyle: 'none', padding: 0 }}>
            {[
              'Illegal activities or planning thereof',
              'Harassment, threats, or abuse',
              'Emergency services (this is NOT a 911 replacement)',
              'Automated calling or spam',
              'Attempting to record or intercept other users\' calls',
              'Circumventing the payment system'
            ].map((item, i) => (
              <li key={i} style={{
                fontSize: '18px',
                lineHeight: '1.8',
                fontFamily: 'var(--font-primary)',
                marginBottom: '16px',
                paddingLeft: '24px',
                position: 'relative'
              }}>
                <span style={{ position: 'absolute', left: 0 }}>•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(31, 0, 0, 0.2)', margin: '60px 0' }} />

        {/* Payment Terms */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '32px',
            color: 'var(--color-primary-text)'
          }}>
            Payment & Refunds
          </h2>

          <p style={{
            fontSize: '18px',
            lineHeight: '1.6',
            fontFamily: 'var(--font-primary)',
            marginBottom: '24px'
          }}>
            <strong>Pricing:</strong> $0.05 USD per minute, charged per minute (not per second).
          </p>

          <p style={{
            fontSize: '18px',
            lineHeight: '1.6',
            fontFamily: 'var(--font-primary)',
            marginBottom: '24px'
          }}>
            <strong>Payment methods:</strong> USDC on Base/Hyperliquid, or credit card via Stripe.
          </p>

          <p style={{
            fontSize: '18px',
            lineHeight: '1.6',
            fontFamily: 'var(--font-primary)',
            marginBottom: '24px'
          }}>
            <strong>Refunds:</strong> Minutes are non-refundable once purchased. Unused minutes remain in your wallet balance indefinitely.
          </p>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(31, 0, 0, 0.2)', margin: '60px 0' }} />

        {/* Liability & Warranties */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '32px',
            color: 'var(--color-primary-text)'
          }}>
            Disclaimers & Limitations
          </h2>

          <p style={{
            fontSize: '18px',
            lineHeight: '1.6',
            fontFamily: 'var(--font-primary)',
            marginBottom: '24px'
          }}>
            <strong>No emergency services:</strong> This is not a replacement for traditional phone service. Do not use for emergency calls.
          </p>

          <p style={{
            fontSize: '18px',
            lineHeight: '1.6',
            fontFamily: 'var(--font-primary)',
            marginBottom: '24px'
          }}>
            <strong>Service availability:</strong> Provided "as is" without warranties. We don't guarantee 100% uptime.
          </p>

          <p style={{
            fontSize: '18px',
            lineHeight: '1.6',
            fontFamily: 'var(--font-primary)',
            marginBottom: '24px'
          }}>
            <strong>Limitation of liability:</strong> Our liability is limited to the amount you've paid us in the past 30 days.
          </p>

          <p style={{
            fontSize: '18px',
            lineHeight: '1.6',
            fontFamily: 'var(--font-primary)',
            marginBottom: '24px'
          }}>
            <strong>Indemnification:</strong> You agree to hold us harmless from any claims arising from your use of the service.
          </p>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(31, 0, 0, 0.2)', margin: '60px 0' }} />

        {/* Governing Law */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '32px',
            color: 'var(--color-primary-text)'
          }}>
            Legal Stuff
          </h2>

          <p style={{
            fontSize: '18px',
            lineHeight: '1.6',
            fontFamily: 'var(--font-primary)',
            marginBottom: '24px'
          }}>
            <strong>Changes to terms:</strong> We may update these terms. Continued use means acceptance.
          </p>

          <p style={{
            fontSize: '18px',
            lineHeight: '1.6',
            fontFamily: 'var(--font-primary)',
            marginBottom: '24px'
          }}>
            <strong>Governing law:</strong> These terms are governed by the laws of Delaware, USA.
          </p>

          <p style={{
            fontSize: '18px',
            lineHeight: '1.6',
            fontFamily: 'var(--font-primary)',
            marginBottom: '24px'
          }}>
            <strong>Contact:</strong> Questions? Reach out via GitHub Issues.
          </p>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(31, 0, 0, 0.2)', margin: '60px 0' }} />

        {/* Bottom statement */}
        <p style={{
          fontFamily: 'var(--font-primary)',
          fontSize: '20px',
          fontWeight: '600',
          color: 'var(--color-primary-text)',
          textAlign: 'center',
          marginBottom: '80px'
        }}>
          By using Liquid Calling, you agree to these terms.
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