'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { usePrivy } from '@privy-io/react-auth'

export function HomePage() {
  const router = useRouter()
  const { ready, authenticated, user, login } = usePrivy()

  const handleStartCalling = () => {
    if (!ready) return

    if (!authenticated) {
      // Login first, then navigate to app
      login()
    } else {
      // Already logged in, go to app
      router.push('/?app=true')
    }
  }

  return (
    <div className="main">
      {/* Hero Section */}
      <section className="container" style={{ paddingTop: '100px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '50px', flexWrap: 'wrap' }}>
          {/* Left Content */}
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h1 className="h3" style={{ marginBottom: '90px' }}>
              Still Believe in<br />
              Freedom<br />
              of Speech?
            </h1>

            {/* Phone Frame */}
            <div style={{ position: 'relative', width: '244px', height: '413px' }}>
              <Image
                src="/Frame 7_3.png"
                alt="App Screenshot"
                width={244}
                height={413}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </div>

          {/* Right Content */}
          <div style={{ flex: '0 0 135px' }}>
            <p className="text-body" style={{ marginBottom: '20px' }}>
              Zero logs. Zero IP tracking.
              True end-to-end encryption
              with three levels of privacy
              for maximum security.
            </p>
            <button
              onClick={handleStartCalling}
              className="btn btn-primary"
              disabled={!ready}
            >
              {!ready ? 'Loading...' : !authenticated ? 'Start Calling' : 'Enter App'}
            </button>
          </div>
        </div>
      </section>

      {/* We Do Section */}
      <section className="container section">
        <div style={{ textAlign: 'center' }}>
          <h2 className="h2" style={{ marginBottom: '40px' }}>We do.</h2>
          <p className="h5" style={{ maxWidth: '528px', margin: '0 auto 60px' }}>
            So we enable 100% private encrypted calls with<br />
            no phone number needed. Three ways.<br />
            Three levels of privacy.
          </p>

          {/* Three Options */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            maxWidth: '600px',
            margin: '0 auto 40px'
          }}>
            <div>
              <h4 className="text-body" style={{ fontWeight: 600, marginBottom: '20px' }}>
                One Time Use
              </h4>
              <p className="text-body">
                Pay with Stripe, Apple Pay<br />
                60 minute call, $5
              </p>
              <button
                className="btn btn-primary"
                style={{ marginTop: '20px' }}
                onClick={handleStartCalling}
                disabled={!ready}
              >
                Get Privacy L2
              </button>
            </div>

            <div>
              <h4 className="text-body" style={{ fontWeight: 600, marginBottom: '20px' }}>
                Private Account
              </h4>
              <p className="text-body">
                Apple Pay, Credit Card<br />
                5 cents a minute
              </p>
              <button
                className="btn btn-primary"
                style={{ marginTop: '20px' }}
                onClick={handleStartCalling}
                disabled={!ready}
              >
                Get Privacy L1
              </button>
            </div>

            <div>
              <h4 className="text-body" style={{ fontWeight: 600, marginBottom: '20px' }}>
                Use Your Wallet
              </h4>
              <p className="text-body">
                Pay with Crypto in USDC<br />
                5 cents a minute
              </p>
              <button
                className="btn btn-primary"
                style={{ marginTop: '20px' }}
                onClick={handleStartCalling}
                disabled={!ready}
              >
                Get Privacy Max
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Talk on Recorded Lines Section */}
      <section className="container section">
        <div style={{ textAlign: 'center' }}>
          <p className="text-secondary h5" style={{ marginBottom: '20px' }}>
            No surveillance. No BS.
          </p>
          <h2 className="h2" style={{ marginBottom: '60px' }}>
            Why talk on recorded lines?
          </h2>

          {/* ASCII Diagram */}
          <pre className="text-mono-sm" style={{
            background: '#f5f5f5',
            padding: '40px 20px',
            borderRadius: '8px',
            overflowX: 'auto',
            textAlign: 'left',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
{`┌─────────────────────────────────────────────────────────────────────┐
│                           LIQUID CALLING                              │
└─────────────────────────────────────────────────────────────────────┘
          USER A                EPHEMERAL ROOM              USER B
   ┌──────────────┐           ┌──────────────┐         ┌──────────────┐
   │   Browser    │           │  Signaling   │         │   Browser    │
   │              │           │    Server    │         │              │
   │ [*] WebRTC   │◄─────────►│              │◄───────►│ [*] WebRTC   │
   │     P2P      │  Exchange │  • 24h TTL   │Exchange │     P2P      │
   │              │   SDP/ICE │  • No logs   │ SDP/ICE │              │
   │              │           │              │         │              │
   └──────────────┘           └──────────────┘         └──────────────┘
           │                                                    │
           │                                                    │
           └──────────────────────┴─────────────────────────────┘
                 Direct P2P Audio Stream
                 (End-to-End Encrypted)                                `}
          </pre>

          {/* Comparison */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            maxWidth: '600px',
            margin: '60px auto 0'
          }}>
            <div>
              <h4 className="text-mono" style={{ marginBottom: '20px' }}>US</h4>
              <div className="text-mono" style={{ color: 'rgba(0, 0, 0, 0.6)', textAlign: 'left' }}>
                ✓ NO PHONE NUMBER REQUIRED<br />
                ✓ NO IDENTITY TIED TO CALL<br />
                ✓ ZERO METADATA STORED<br />
                ✓ TRULY EPHEMERAL (24h room expiry)<br />
                ✓ NO ACCOUNTS NEEDED
              </div>
            </div>
            <div>
              <h4 className="text-mono" style={{ marginBottom: '20px' }}>THEM</h4>
              <div className="text-mono" style={{ color: 'rgba(0, 0, 0, 0.6)', textAlign: 'left' }}>
                ✗ PHONE NUMBER REQUIRED FOR REGISTRATION<br />
                ✗ IDENTITY TIED TO PHONE NUMBER<br />
                ✗ METADATA STORED<br />
                ✗ CALL RECORD RETAINED<br />
                ✗ REQUIRES ACCOUNT CREATION
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Try Liquid Calling Today Section */}
      <section className="container section">
        <div style={{ textAlign: 'center' }}>
          <h2 className="h4" style={{ marginBottom: '20px' }}>
            Try Liquid Calling Today for 5 cents
          </h2>
          <p className="text-mono" style={{ marginBottom: '30px' }}>
            WHO CARES ABOUT THE OVERTON WINDOW? DON'T GIVE UP YOUR RIGHTS
          </p>
          <button
            onClick={handleStartCalling}
            className="btn btn-primary"
            disabled={!ready}
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Perfect For Section */}
      <section className="container section">
        <h2 className="h4" style={{ marginBottom: '40px' }}>Perfect For</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '30px'
        }}>
          {[
            {
              title: 'Sensitive Business Calls',
              description: 'Discuss deals, strategy, or confidential matters without surveillance risk'
            },
            {
              title: 'Therapy and Medical Consultations',
              description: 'Privacy-focused infrastructure for protected health conversations'
            },
            {
              title: 'Legal Discussions',
              description: 'Attorney-client privilege with no recording or metadata'
            },
            {
              title: 'Personal Privacy',
              description: 'Keep personal conversations truly personal, away from data harvesting'
            },
            {
              title: 'OTC Trading',
              description: 'Discuss positions and strategies without fear of front-running or interception'
            },
            {
              title: 'Accountants',
              description: 'Speak on taxes, and other sensitive matters without worry'
            }
          ].map((item, index) => (
            <div key={index} style={{ borderTop: '1px solid #D9D9D9', paddingTop: '20px' }}>
              <h3 className="card-title">{item.title}</h3>
              <p className="card-text">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SDK Section */}
      <section className="container section" style={{ borderTop: '1px solid #D9D9D9' }}>
        <div style={{ textAlign: 'center' }}>
          <p className="text-mono text-muted" style={{ marginBottom: '10px' }}>
            {'< / >'} FOR DEVELOPERS
          </p>

          {/* ASCII Logo */}
          <pre className="text-mono-sm" style={{
            fontSize: '4px',
            lineHeight: '4px',
            color: 'rgba(0, 0, 0, 0.3)',
            margin: '30px 0',
            letterSpacing: '0'
          }}>
{`░██      ░██████ ░██████ ░██  ░██ ░██████░███████
░██      ░██  ░██ ░██  ░██ ░██  ░██ ░██  ░██    ░██
░██      ░██  ░██ ░██  ░██ ░██  ░██ ░██  ░██    ░██
░██      ░██  ░██ ░██  ░██ ░██  ░██ ░██  ░██    ░██
░██      ░██  ░██ ░██  ░██ ░██  ░██ ░██  ░██    ░██
░████████░██████  ░██████  ░██████ ░██████░███████`}
          </pre>

          <h2 className="h2" style={{ marginBottom: '20px' }}>LIQUIDCALLING SDK</h2>
          <p className="text-body" style={{ maxWidth: '400px', margin: '0 auto 30px' }}>
            Want to add crystal clear private voice calls to your site?<br />
            Truly private infrastructure in less than five minutes.
          </p>
        </div>
      </section>
    </div>
  )
}