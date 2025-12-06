'use client'

import '../../styles/design-system.css'
import '../../styles/liquid-layout.css'
import '../../styles/figma-responsive.css'

const footerDemoStyles = `
  .footer-demo-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 200px 20px 100px;
  }

  .hero-title {
    font-family: var(--font-primary);
    font-size: 64px;
    font-weight: 600;
    line-height: 1.1;
    color: rgba(0, 0, 31, .85);
    margin-bottom: 32px;
  }

  .hero-subtitle {
    font-family: var(--font-primary);
    font-size: 24px;
    font-weight: 600;
    line-height: 1.4;
    color: rgba(0, 0, 31, .85);
    margin-bottom: 24px;
  }

  .footer-card {
    box-sizing: border-box;
    width: calc(100% - 180px);
    max-width: 1739px;
    height: 626px;
    margin: 0 auto 0;
    background: rgba(42, 12, 12, 0.9);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(42, 12, 12, 0.9);
    border-radius: 80px;
    position: relative;
    padding: 70px 110px;
  }

  .footer-copyright {
    position: absolute;
    left: 110px;
    top: 75px;
    font-family: 'Geist Mono', monospace;
    font-weight: 600;
    font-size: 20px;
    line-height: 26px;
    color: rgba(255, 255, 255, 0.9);
  }

  .footer-help {
    position: absolute;
    left: 970px;
    top: 70px;
    font-family: 'Geist Mono', monospace;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    text-transform: uppercase;
    color: #FFFFFF;
    cursor: pointer;
  }

  .footer-socials {
    position: absolute;
    left: 970px;
    top: 170px;
    font-family: 'Geist Mono', monospace;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    text-transform: uppercase;
    color: #FFFFFF;
    cursor: pointer;
  }

  .footer-developers {
    position: absolute;
    left: 1160px;
    top: 70px;
    font-family: 'Geist Mono', monospace;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    text-transform: uppercase;
    color: #FFFFFF;
    cursor: pointer;
  }

  .footer-company {
    position: absolute;
    right: 110px;
    top: 70px;
    font-family: 'Geist Mono', monospace;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    text-transform: uppercase;
    color: #FFFFFF;
  }

  .footer-company div {
    margin-bottom: 8px;
    cursor: pointer;
    transition: opacity 0.2s;
  }

  .footer-company div:hover,
  .footer-help:hover,
  .footer-socials:hover,
  .footer-developers:hover {
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    .footer-card {
      width: calc(100% - 40px);
      height: auto;
      padding: 40px;
    }

    .footer-copyright,
    .footer-help,
    .footer-socials,
    .footer-developers,
    .footer-company {
      position: static;
      margin-bottom: 30px;
    }

    .hero-title {
      font-size: 48px;
    }
  }
`

import { PrivyConnectButton } from '../../components/PrivyConnectButton'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

const StaticTorusCanvas = dynamic(() => import('../../components/StaticTorusCanvas'), { ssr: false })

export default function FooterDemoPage() {
  const router = useRouter()

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: footerDemoStyles }} />

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

      <div className="liquid-app footer-demo-container">

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

      {/* Main Content */}
      <div className="main-content">
        <h1 className="hero-title">Call Anyone<br/>Privately<br/>With Your Wallet</h1>
        <p className="hero-subtitle">Actually private calls in 3 clicks</p>
      </div>

      {/* Footer Card */}
      <div className="footer-card">
        <div className="footer-copyright">
          LIQUIDCALLING ©2025
        </div>

        <div className="footer-help" onClick={() => window.open('https://x.com/braunschweiler', '_blank')}>
          HELP!<br/>Support
        </div>

        <div className="footer-socials" onClick={() => window.open('https://x.com/braunschweiler', '_blank')}>
          SOCIALS<br/>X
        </div>

        <div className="footer-developers" onClick={() => router.push('/sdk')}>
          DEVELOPERS<br/>SDK
        </div>

        <div className="footer-company">
          <div onClick={() => router.push('/pricing')}>PRICING</div>
          <div onClick={() => router.push('/how-it-works')}>HOW IT WORKS</div>
          <div onClick={() => router.push('/terms')}>TERMS OF SERVICE</div>
          <div onClick={() => router.push('/privacy')}>PRIVACY</div>
        </div>
      </div>

      </div>
    </>
  )
}