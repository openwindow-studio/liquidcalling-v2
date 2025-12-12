'use client'

import '../../styles/design-system.css'
import '../../styles/liquid-layout.css'
import '../../styles/figma-responsive.css'

const sdkPageStyles = `
  @media (max-width: 768px) {
    .sdk-page-container {
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

    .code-block {
      overflow-x: auto !important;
      -webkit-overflow-scrolling: touch !important;
    }

    .integration-cards {
      flex-direction: column !important;
      gap: 30px !important;
    }
  }
`
import { PrivyConnectButton } from '../../components/PrivyConnectButton'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

const StaticTorusCanvas = dynamic(() => import('../../components/StaticTorusCanvas'), { ssr: false })

export default function SDKPage() {
  const router = useRouter()

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: sdkPageStyles }} />

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

      <div className="liquid-app sdk-page-container" style={{
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
        {/* SDK Header */}
        <div style={{ marginBottom: '80px' }}>
          <h1 style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '24px',
            fontWeight: '600',
            lineHeight: '1.1',
            marginBottom: '32px',
          }}>
            LiquidCalling Embed SDK
          </h1>

          <p style={{
            fontSize: '18px',
            lineHeight: '1.6',
            fontFamily: 'var(--font-primary)',
            marginBottom: '24px'
          }}>
            The most private, embeddable voice calling modal in the world. Zero logs, true E2EE, HIPAA-compliant infrastructure.
          </p>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(31, 0, 0, 0.2)', margin: '60px 0' }} />

        {/* Why LiquidCalling */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '32px',
            color: 'var(--color-primary-text)'
          }}>
            Why LiquidCalling?
          </h2>

          <ul style={{ listStyle: 'none', padding: 0, marginBottom: '24px' }}>
            {[
              'Zero logs, no IP tracking, no stored data',
              'Voice-only mode means no cameras',
              '3-line integration, works instantly',
              'HIPAA-compliant infrastructure',
              'No user wallets/KYC required'
            ].map((item, i) => (
              <li key={i} style={{
                fontSize: '16px',
                lineHeight: '1.8',
                fontFamily: 'var(--font-primary)',
                marginBottom: '12px',
                paddingLeft: '20px',
                position: 'relative'
              }}>
                <span style={{ position: 'absolute', left: 0 }}>•</span>
                {item}
              </li>
            ))}
          </ul>

          <p style={{
            fontSize: '16px',
            lineHeight: '1.6',
            fontFamily: 'var(--font-primary)',
            fontWeight: '600'
          }}>
            Ultimately: say whatever you want to without fear of surveillance like on Telegram, Signal, or a cell phone
          </p>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(31, 0, 0, 0.2)', margin: '60px 0' }} />

        {/* Basic Integration */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '32px',
            color: 'var(--color-primary-text)'
          }}>
            Basic Integration
          </h2>

          <div style={{ marginBottom: '60px' }}>
            <h3 style={{
              fontFamily: 'var(--font-primary)',
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '12px'
            }}>
              Static Room (Same room always)
            </h3>
            <p style={{
              fontSize: '14px',
              lineHeight: '1.6',
              fontFamily: 'var(--font-primary)',
              marginBottom: '20px',
              opacity: 0.9
            }}>
              Perfect for: Office hours, team channels, community spaces
            </p>
            <div className="code-block" style={{
              backgroundColor: 'rgba(0, 0, 31, 0.05)',
              padding: '20px',
              borderRadius: '4px',
              fontFamily: 'Geist Mono, monospace',
              fontSize: '13px',
              overflow: 'auto'
            }}>
              <pre style={{ margin: 0 }}>{`<div id="liquid-room"></div>
<script src="https://sdk.liquidcalling.com/sdk.js"></script>
<script>
  LiquidCalling.init({
    roomId: "support-office",  // Fixed ID - everyone joins same room
    apiKey: "your-api-key"
  });
</script>`}</pre>
            </div>
          </div>

          <div style={{ marginBottom: '60px' }}>
            <h3 style={{
              fontFamily: 'var(--font-primary)',
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '12px'
            }}>
              Dynamic Room (Different room per session)
            </h3>
            <p style={{
              fontSize: '14px',
              lineHeight: '1.6',
              fontFamily: 'var(--font-primary)',
              marginBottom: '20px',
              opacity: 0.9
            }}>
              Perfect for: Games, support tickets, consultations, temporary meetings
            </p>
            <div className="code-block" style={{
              backgroundColor: 'rgba(0, 0, 31, 0.05)',
              padding: '20px',
              borderRadius: '4px',
              fontFamily: 'Geist Mono, monospace',
              fontSize: '13px',
              overflow: 'auto'
            }}>
              <pre style={{ margin: 0 }}>{`<div id="liquid-room"></div>
<script src="https://sdk.liquidcalling.com/sdk.js"></script>
<script>
  // Get session ID from your app (URL param, database, state, etc.)
  const sessionId = new URLSearchParams(window.location.search).get('session');

  LiquidCalling.init({
    roomId: \`session-\${sessionId}\`,  // Dynamic ID based on context
    apiKey: "your-api-key"
  });
</script>`}</pre>
            </div>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(31, 0, 0, 0.2)', margin: '60px 0' }} />

        {/* Understanding roomId */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '32px',
            color: 'var(--color-primary-text)'
          }}>
            Understanding roomId
          </h2>

          <p style={{
            fontSize: '16px',
            lineHeight: '1.6',
            fontFamily: 'var(--font-primary)',
            marginBottom: '32px'
          }}>
            The roomId determines which users can talk together. Think of it as a unique identifier for each conversation space.
          </p>

          <div style={{ marginBottom: '40px' }}>
            <h3 style={{
              fontFamily: 'var(--font-primary)',
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '16px'
            }}>
              Dynamic Rooms (Generated per session)
            </h3>
            <div className="code-block" style={{
              backgroundColor: 'rgba(0, 0, 31, 0.05)',
              padding: '20px',
              borderRadius: '4px',
              fontFamily: 'Geist Mono, monospace',
              fontSize: '13px',
              overflow: 'auto',
              marginBottom: '16px'
            }}>
              <pre style={{ margin: 0 }}>{`// Generate unique ID for each session
const sessionId = \`room-\${Date.now()}-\${Math.random().toString(36).substr(2, 9)}\`;

LiquidCalling.init({
  roomId: sessionId,  // e.g., "room-1732067890-k3j9x2"
  apiKey: "your-api-key"
});`}</pre>
            </div>
            <p style={{
              fontSize: '14px',
              lineHeight: '1.6',
              fontFamily: 'var(--font-primary)',
              opacity: 0.9
            }}>
              Use cases: Multi-player games, temporary support sessions, one-time consultations
            </p>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h3 style={{
              fontFamily: 'var(--font-primary)',
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '16px'
            }}>
              Static Rooms (Fixed identifier)
            </h3>
            <div className="code-block" style={{
              backgroundColor: 'rgba(0, 0, 31, 0.05)',
              padding: '20px',
              borderRadius: '4px',
              fontFamily: 'Geist Mono, monospace',
              fontSize: '13px',
              overflow: 'auto',
              marginBottom: '16px'
            }}>
              <pre style={{ margin: 0 }}>{`// Use a fixed room ID
LiquidCalling.init({
  roomId: "support-team-alpha",  // Same ID every time
  apiKey: "your-api-key"
});`}</pre>
            </div>
            <p style={{
              fontSize: '14px',
              lineHeight: '1.6',
              fontFamily: 'var(--font-primary)',
              opacity: 0.9
            }}>
              Use cases: Persistent team channels, office hours, community spaces
            </p>
          </div>

          <p style={{
            fontSize: '16px',
            lineHeight: '1.6',
            fontFamily: 'var(--font-primary)',
            fontWeight: '600'
          }}>
            Key principle: Same roomId = users join together. Different roomId = separate conversations.
          </p>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(31, 0, 0, 0.2)', margin: '60px 0' }} />

        {/* SDK API Methods */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '32px',
            color: 'var(--color-primary-text)'
          }}>
            SDK API Methods
          </h2>

          <div className="code-block" style={{
            backgroundColor: 'rgba(0, 0, 31, 0.05)',
            padding: '20px',
            borderRadius: '4px',
            fontFamily: 'Geist Mono, monospace',
            fontSize: '13px',
            overflow: 'auto'
          }}>
            <pre style={{ margin: 0 }}>{`// Control methods
LiquidCalling.joinCall()     // Programmatically join
LiquidCalling.leaveCall()    // Programmatically leave
LiquidCalling.mute()         // Mute microphone
LiquidCalling.unmute()       // Unmute microphone
LiquidCalling.endCall()      // End the call
LiquidCalling.setVolume(0.8) // Set volume (0-1)

// Event handlers
onReady: () => {},
onError: (error) => {},
onParticipantJoined: (data) => {},
onParticipantLeft: (data) => {},
onMuteChanged: (data) => {},
onCallEnded: () => {}`}</pre>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(31, 0, 0, 0.2)', margin: '60px 0' }} />

        {/* Live Demo */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '32px',
            color: 'var(--color-primary-text)'
          }}>
            Live Demo
          </h2>

          <p style={{
            fontSize: '16px',
            lineHeight: '1.6',
            fontFamily: 'var(--font-primary)',
          }}>
            Try the demo <a href="https://sdk.liquidcalling.com/demo.html" target="_blank" rel="noopener noreferrer" style={{
              color: 'rgba(0, 0, 31, 0.9)',
              textDecoration: 'underline'
            }}>here</a>
          </p>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(31, 0, 0, 0.2)', margin: '60px 0' }} />

        {/* Technical Details */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '32px',
            color: 'var(--color-primary-text)'
          }}>
            Technical Details
          </h2>

          <ul style={{ listStyle: 'none', padding: 0 }}>
            {[
              'Size: <6KB gzipped JavaScript',
              'Isolation: Runs in iframe for security',
              'Framework: Vanilla JS, works with React/Vue/Angular',
              'Audio: Real-time voice activity detection',
              'Privacy: PostMessage API, no DOM access',
              'CDN: Global edge deployment via Vercel'
            ].map((item, i) => (
              <li key={i} style={{
                fontSize: '16px',
                lineHeight: '1.8',
                fontFamily: 'var(--font-primary)',
                marginBottom: '12px',
                paddingLeft: '20px',
                position: 'relative'
              }}>
                <span style={{ position: 'absolute', left: 0 }}>•</span>
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            ))}
          </ul>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(31, 0, 0, 0.2)', margin: '60px 0' }} />

        {/* Pricing */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '32px',
            color: 'var(--color-primary-text)'
          }}>
            Pricing
          </h2>

          <p style={{
            fontSize: '16px',
            lineHeight: '1.6',
            fontFamily: 'var(--font-primary)',
            marginBottom: '24px'
          }}>
            Simple per-minute billing to project owners only:
          </p>

          <ul style={{ listStyle: 'none', padding: 0 }}>
            {[
              '$0.03 per participant-minute',
              'No charges to end users',
              'Monthly billing, 30-day terms',
              'First 100 minutes free for testing',
              'Fixed monthly rates also available'
            ].map((item, i) => (
              <li key={i} style={{
                fontSize: '16px',
                lineHeight: '1.8',
                fontFamily: 'var(--font-primary)',
                marginBottom: '12px',
                paddingLeft: '20px',
                position: 'relative'
              }}>
                <span style={{ position: 'absolute', left: 0 }}>•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(31, 0, 0, 0.2)', margin: '60px 0' }} />

        {/* Get Started */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '32px',
            color: 'var(--color-primary-text)'
          }}>
            Get Started
          </h2>

          <p style={{
            fontSize: '16px',
            lineHeight: '1.6',
            fontFamily: 'var(--font-primary)',
            marginBottom: '24px'
          }}>
            <strong>Integration Support:</strong> We handle the first 30-50 customers personally
          </p>

          <p style={{
            fontSize: '16px',
            lineHeight: '1.6',
            fontFamily: 'var(--font-primary)',
            marginBottom: '24px'
          }}>
            Ready to integrate? Contact us for your API key and we'll have you up and running in &lt;10 minutes.
          </p>

          <p style={{
            fontSize: '16px',
            lineHeight: '1.6',
            fontFamily: 'var(--font-primary)',
            marginBottom: '8px'
          }}>
            <strong>X:</strong> <a href="https://x.com/braunschweiler" target="_blank" rel="noopener noreferrer" style={{
              color: 'rgba(0, 0, 31, 0.9)',
              textDecoration: 'underline'
            }}>
              x.com/braunschweiler
            </a>
          </p>

          <p style={{
            fontSize: '16px',
            lineHeight: '1.6',
            fontFamily: 'var(--font-primary)',
          }}>
            <strong>Telegram:</strong> <a href="https://t.me/braunschweiler" target="_blank" rel="noopener noreferrer" style={{
              color: 'rgba(0, 0, 31, 0.9)',
              textDecoration: 'underline'
            }}>
              @braunschweiler
            </a>
          </p>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(31, 0, 0, 0.2)', margin: '60px 0' }} />

        {/* Design Resources */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '32px',
            color: 'var(--color-primary-text)'
          }}>
            Design Resources
          </h2>

          <p style={{
            fontSize: '16px',
            lineHeight: '1.6',
            fontFamily: 'var(--font-primary)',
          }}>
            For additional modals, please see our Figma design file here: <a href="https://www.figma.com/design/1z8kk7ZnBaJkIsU5QE8vX4/liquidcalling_modals?node-id=1-35&t=DjP0nQmRc2m0BkdS-1" target="_blank" rel="noopener noreferrer" style={{
              color: 'rgba(0, 0, 31, 0.9)',
              textDecoration: 'underline'
            }}>
              Figma Designs
            </a>
          </p>
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