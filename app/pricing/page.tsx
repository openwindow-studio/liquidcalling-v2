'use client'

import '../../styles/design-system.css'
import '../../styles/liquid-layout.css'
import '../../styles/figma-responsive.css'

const pricingPageStyles = `
  @media (max-width: 768px) {
    .pricing-page-container {
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

    /* Make pricing cards stack on mobile */
    .pricing-cards-container {
      flex-direction: column !important;
      gap: 30px !important;
    }

    .pricing-card {
      width: 100% !important;
    }
  }
`
import { PrivyConnectButton } from '../../components/PrivyConnectButton'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

const StaticTorusCanvas = dynamic(() => import('../../components/StaticTorusCanvas'), { ssr: false })

export default function PricingPage() {
  const router = useRouter()

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: pricingPageStyles }} />

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

      <div className="liquid-app pricing-page-container" style={{
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
        {/* PRICING Header */}
        <div style={{ marginBottom: '80px' }}>
          <h1 style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '24px',
            fontWeight: '600',
            lineHeight: '1.1',
            marginBottom: '32px',
          }}>
            Simple, Transparent Pricing
          </h1>

          <p style={{
            fontSize: '32px',
            lineHeight: '1.2',
            fontFamily: 'var(--font-primary)',
            fontWeight: '600',
            marginBottom: '24px'
          }}>
            $0.05 per minute
          </p>

          <p style={{
            fontSize: '18px',
            lineHeight: '1.6',
            fontFamily: 'var(--font-primary)',
          }}>
            No subscriptions. No hidden fees. Pay only for what you use.
          </p>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(31, 0, 0, 0.2)', margin: '60px 0' }} />

        {/* Pricing Cards */}
        <div className="pricing-cards-container" style={{
          display: 'flex',
          gap: '40px',
          marginBottom: '80px',
          justifyContent: 'space-between'
        }}>
          {/* Consumer Card */}
          <div className="pricing-card" style={{
            flex: 1,
            padding: '40px',
            border: '1px solid rgba(31, 0, 0, 0.2)',
            borderRadius: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h3 style={{
              fontFamily: 'var(--font-primary)',
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '24px'
            }}>
              Personal Use
            </h3>

            <div style={{ marginBottom: '32px' }}>
              <p style={{
                fontSize: '24px',
                fontWeight: '600',
                fontFamily: 'var(--font-primary)',
                marginBottom: '8px'
              }}>
                $5 = 100 minutes
              </p>
              <p style={{
                fontSize: '14px',
                fontFamily: 'var(--font-primary)',
                opacity: 0.8
              }}>
                Perfect for private conversations
              </p>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '32px', flex: 1 }}>
              {[
                'Pay with USDC or credit card',
                'Minutes never expire',
                'No monthly fees',
                'Anonymous calling available',
                'Browser-based, no app needed'
              ].map((item, i) => (
                <li key={i} style={{
                  fontSize: '14px',
                  lineHeight: '1.8',
                  fontFamily: 'var(--font-primary)',
                  marginBottom: '8px',
                  paddingLeft: '20px',
                  position: 'relative'
                }}>
                  <span style={{ position: 'absolute', left: 0 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <button
              onClick={() => router.push('/')}
              style={{
                width: '100%',
                padding: '12px 24px',
                backgroundColor: 'transparent',
                color: 'rgba(0, 0, 31, 0.9)',
                border: '2px solid rgba(0, 0, 31, 0.9)',
                borderRadius: '4px',
                fontFamily: 'var(--font-primary)',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Get Started
            </button>
          </div>

          {/* Business Card */}
          <div className="pricing-card" style={{
            flex: 1,
            padding: '40px',
            border: '1px solid rgba(31, 0, 0, 0.2)',
            borderRadius: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h3 style={{
              fontFamily: 'var(--font-primary)',
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '24px'
            }}>
              Business & SDK
            </h3>

            <div style={{ marginBottom: '32px' }}>
              <p style={{
                fontSize: '24px',
                fontWeight: '600',
                fontFamily: 'var(--font-primary)',
                marginBottom: '8px'
              }}>
                Volume Pricing
              </p>
              <p style={{
                fontSize: '14px',
                fontFamily: 'var(--font-primary)',
                opacity: 0.8
              }}>
                Embed private calling in your app
              </p>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '32px', flex: 1 }}>
              {[
                'SDK for seamless integration',
                'HIPAA-compliant infrastructure',
                'Custom room configurations',
                'Volume discounts available',
                'Priority support',
                'SLA guarantees'
              ].map((item, i) => (
                <li key={i} style={{
                  fontSize: '14px',
                  lineHeight: '1.8',
                  fontFamily: 'var(--font-primary)',
                  marginBottom: '8px',
                  paddingLeft: '20px',
                  position: 'relative'
                }}>
                  <span style={{ position: 'absolute', left: 0 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <button
              onClick={() => window.open('https://github.com/liquidcalling/sdk', '_blank')}
              style={{
                width: '100%',
                padding: '12px 24px',
                backgroundColor: 'rgba(0, 0, 31, 0.9)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontFamily: 'var(--font-primary)',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              View SDK Docs
            </button>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(31, 0, 0, 0.2)', margin: '60px 0' }} />

        {/* Payment Methods */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '32px',
            color: 'var(--color-primary-text)'
          }}>
            Payment Methods
          </h2>

          <div style={{ display: 'flex', gap: '60px' }}>
            <div style={{ flex: 1 }}>
              <h3 style={{
                fontFamily: 'var(--font-primary)',
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '16px'
              }}>
                Cryptocurrency
              </h3>
              <p style={{
                fontSize: '16px',
                lineHeight: '1.6',
                fontFamily: 'var(--font-primary)',
                marginBottom: '16px'
              }}>
                Pay with USDC on Base or Hyperliquid. No KYC required. Completely pseudonymous transactions.
              </p>
            </div>

            <div style={{ flex: 1 }}>
              <h3 style={{
                fontFamily: 'var(--font-primary)',
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '16px'
              }}>
                Credit Card
              </h3>
              <p style={{
                fontSize: '16px',
                lineHeight: '1.6',
                fontFamily: 'var(--font-primary)',
                marginBottom: '16px'
              }}>
                Traditional payments via Stripe. Quick and convenient for those without crypto wallets.
              </p>
            </div>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(31, 0, 0, 0.2)', margin: '60px 0' }} />

        {/* FAQ */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '32px',
            color: 'var(--color-primary-text)'
          }}>
            Frequently Asked Questions
          </h2>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontFamily: 'var(--font-primary)',
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '12px'
            }}>
              How is billing calculated?
            </h3>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.6',
              fontFamily: 'var(--font-primary)'
            }}>
              We charge per minute, not per second. Each started minute counts as a full minute. For example, a 1:30 call is billed as 2 minutes.
            </p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontFamily: 'var(--font-primary)',
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '12px'
            }}>
              Do minutes expire?
            </h3>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.6',
              fontFamily: 'var(--font-primary)'
            }}>
              No. Once purchased, minutes remain in your balance indefinitely. Use them whenever you need private calling.
            </p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontFamily: 'var(--font-primary)',
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '12px'
            }}>
              Can I get a refund?
            </h3>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.6',
              fontFamily: 'var(--font-primary)'
            }}>
              Minutes are non-refundable once purchased. We recommend starting with a small purchase to test the service.
            </p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontFamily: 'var(--font-primary)',
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '12px'
            }}>
              Why charge at all?
            </h3>
            <p style={{
              fontSize: '16px',
              lineHeight: '1.6',
              fontFamily: 'var(--font-primary)'
            }}>
              Charging per minute means we make money from usage, not from selling your data. This aligns our incentives with your privacy.
            </p>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(31, 0, 0, 0.2)', margin: '60px 0' }} />

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <p style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '24px',
            fontWeight: '600',
            color: 'var(--color-primary-text)',
            marginBottom: '32px'
          }}>
            Ready to make actually private calls?
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
              cursor: 'pointer'
            }}
          >
            Start Calling
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