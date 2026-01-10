'use client'

import React from 'react'
import Link from 'next/link'

export function Footer3() {
  return (
    <footer style={{
      position: 'relative',
      padding: '60px 0 40px'
    }}>
      <div style={{
        maxWidth: '750px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      }}>
        {/* Left Column - Logo and Copyright */}
        <div>
          <h1 style={{
            fontFamily: 'var(--font-britti)',
            fontWeight: 400,
            fontSize: '52px',
            lineHeight: '60px',
            letterSpacing: '-0.02em',
            color: '#000000',
            margin: '0 0 43px 0'
          }}>
            Liquid Calling
          </h1>
          <p style={{
            fontFamily: 'var(--font-britti)',
            fontWeight: 400,
            fontSize: '10px',
            lineHeight: '10px',
            color: '#000000',
            margin: 0
          }}>
            Liquid Calling © 2026
          </p>
        </div>

        {/* Middle Column - Help/Socials Links */}
        <div>
          <div style={{
            fontFamily: 'var(--font-britti)',
            fontSize: '11px',
            lineHeight: '20px',
            color: '#000000'
          }}>
            <div style={{ fontWeight: 600, marginBottom: '0px' }}>Help</div>
            <div style={{ fontWeight: 400, marginBottom: '20px' }}>Telegram Support</div>
            <div style={{ fontWeight: 600, marginBottom: '0px' }}>Socials</div>
            <div style={{ fontWeight: 400 }}>X</div>
          </div>
        </div>

        {/* Right Column - Company Links */}
        <div>
          <div style={{
            fontFamily: 'var(--font-britti)',
            fontSize: '11px',
            lineHeight: '20px',
            color: '#000000'
          }}>
            <div style={{ fontWeight: 600, marginBottom: '0px' }}>Company</div>
            <div style={{ fontWeight: 400, marginBottom: '0px' }}>How it Works</div>
            <div style={{ fontWeight: 400, marginBottom: '0px' }}>Terms of Service</div>
            <div style={{ fontWeight: 400, marginBottom: '0px' }}>Privacy Policy</div>
            <div style={{ fontWeight: 400, marginBottom: '0px' }}>Pricing</div>
            <div style={{ fontWeight: 400 }}>Developer SDK</div>
          </div>
        </div>
      </div>
    </footer>
  )
}