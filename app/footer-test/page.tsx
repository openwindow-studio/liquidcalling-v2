'use client'

import { Footer } from '../../components/Footer2'

export default function FooterTestPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F1F1F5' }}>
      {/* Test Content */}
      <div style={{
        padding: '100px 50px',
        textAlign: 'center',
        color: 'rgba(0, 0, 31, .85)',
        fontFamily: 'system-ui, sans-serif',
        fontSize: '32px',
        fontWeight: '600'
      }}>
        Footer Test Page
        <div style={{
          fontSize: '18px',
          fontWeight: '400',
          marginTop: '20px',
          opacity: 0.7
        }}>
          Scroll down to see the new footer design
        </div>
      </div>

      {/* Some content to make the page scrollable */}
      <div style={{ height: '100vh' }}></div>

      {/* Footer */}
      <Footer />
    </div>
  )
}