'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { usePrivy } from '@privy-io/react-auth'
import { Header } from '../components/Header'
import { HomePage } from '../components/HomePage'
import { CallingApp } from '../components/CallingApp'
import { Footer } from '../components/Footer2'
import dynamic from 'next/dynamic'

const TorusCanvas = dynamic(() => import('../components/TorusCanvas'), { ssr: false })

export default function Home() {
  const searchParams = useSearchParams()
  const { ready, authenticated } = usePrivy()
  const [showApp, setShowApp] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if we should show the app based on URL params or auth state
    if (searchParams.get('app') === 'true' || (ready && authenticated)) {
      setShowApp(true)
    }
  }, [searchParams, ready, authenticated])

  // Show loading while Privy initializes
  if (!mounted || !ready) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#F1F1F5'
      }}>
        <div className="text-body">Loading...</div>
      </div>
    )
  }

  // Show calling app if authenticated or app=true in URL
  if (showApp && authenticated) {
    return <CallingApp />
  }

  // Show marketing page
  return (
    <>
      {/* 3D Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        opacity: 0.3
      }}>
        <TorusCanvas />
      </div>

      {/* Main Content */}
      <Header />
      <HomePage />
      <Footer />
    </>
  )
}