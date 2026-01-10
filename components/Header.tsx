'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { usePrivy } from '@privy-io/react-auth'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const { ready, authenticated, user, login, logout } = usePrivy()

  return (
    <header className="header">
      <div className="header-inner">
        {/* Logo */}
        <Link href="/" className="header-logo">
          <Image
            src="/lcarc.svg"
            alt="LC"
            width={24}
            height={24}
          />
          <span className="header-logo-text">Liquid Calling</span>
        </Link>

        {/* Navigation - Desktop */}
        <nav className="header-nav">
          <Link href="/demo" className="header-nav-link">
            Get a Demo
          </Link>
          <Link href="/sdk" className="header-nav-link">
            Developer SDK
          </Link>
          <Link href="/" className="header-nav-link">
            Try for Free
          </Link>
        </nav>

        {/* Actions */}
        <div className="header-actions">
          <Link href="/signup" className="header-nav-link">
            Sign Up
          </Link>
          <button
            onClick={() => router.push('/install')}
            className="btn btn-header btn-light btn-sm"
          >
            Instacall
          </button>
          {!ready ? (
            <button className="btn btn-header btn-sm" disabled>
              Loading...
            </button>
          ) : !authenticated ? (
            <button
              onClick={login}
              className="btn btn-header btn-sm"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => {
                // Navigate to the main app if logged in
                router.push('/?app=true')
              }}
              className="btn btn-header btn-sm"
            >
              {user?.email?.toString().split('@')[0] || 'App'}
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="header-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'white',
          borderTop: '1px solid #D9D9D9',
          padding: '20px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Link
              href="/demo"
              className="header-nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get a Demo
            </Link>
            <Link
              href="/sdk"
              className="header-nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Developer SDK
            </Link>
            <Link
              href="/"
              className="header-nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Try for Free
            </Link>
            <Link
              href="/signup"
              className="header-nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign Up
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}