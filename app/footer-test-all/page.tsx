'use client'

export default function FooterTestAllPage() {
  return (
    <div style={{ minHeight: '100vh', padding: '20px', background: '#F1F1F5' }}>
      <h1>Footer System Overview</h1>
      <p>This page shows all the different footer types with their new descriptive names:</p>

      <div style={{
        background: 'white',
        padding: '20px',
        marginTop: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h2>Footer Classes Renamed:</h2>
        <ul style={{ fontSize: '14px', lineHeight: '1.8' }}>
          <li><strong>privacy-footer</strong> (was app-footer-left) - Privacy text shown on authenticated pages</li>
          <li><strong>landing-footer-privacy</strong> (was figma-footer-left) - Privacy text on landing page</li>
          <li><strong>landing-footer-pricing</strong> (was figma-footer-right) - Pricing text on landing page</li>
        </ul>

        <h3 style={{ marginTop: '20px' }}>Current Implementation:</h3>
        <ul style={{ fontSize: '14px', lineHeight: '1.8' }}>
          <li>✅ All footers use <strong>position: fixed</strong></li>
          <li>✅ Footers don\'t extend document height</li>
          <li>✅ Privy modals center correctly</li>
          <li>✅ Backward compatibility maintained (old class names still work)</li>
        </ul>
      </div>

      <div style={{
        marginTop: '40px',
        padding: '20px',
        background: 'rgba(0,0,0,0.05)',
        borderRadius: '8px'
      }}>
        <h3>Footer Preview (with descriptions):</h3>
        <p style={{ fontSize: '12px', marginBottom: '10px' }}>The footers below are positioned as they would appear in the app:</p>
      </div>

      {/* Privacy Footer (authenticated pages) */}
      <div className="privacy-footer" style={{
        border: '2px solid green',
        background: 'rgba(0, 255, 0, 0.1)'
      }}>
        [PRIVACY FOOTER] Zero logs. Zero IP tracking. Zero stored data.
      </div>

      {/* Landing page footers */}
      <div className="landing-footer-privacy" style={{
        border: '2px solid blue',
        background: 'rgba(0, 0, 255, 0.1)'
      }}>
        [LANDING PRIVACY] Zero logs. Zero IP tracking. True encryption.
      </div>

      <div className="landing-footer-pricing" style={{
        border: '2px solid orange',
        background: 'rgba(255, 165, 0, 0.1)'
      }}>
        [LANDING PRICING] Pay 0.05 USDC per minute on HyperLiquid, Base, or credit card.
      </div>

      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'white',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        maxWidth: '250px'
      }}>
        <strong>Legend:</strong>
        <div style={{ fontSize: '12px', marginTop: '10px' }}>
          <div>🟩 Green = Privacy Footer</div>
          <div>🟦 Blue = Landing Privacy</div>
          <div>🟧 Orange = Landing Pricing</div>
        </div>
      </div>
    </div>
  )
}