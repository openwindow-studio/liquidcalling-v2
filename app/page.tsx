'use client'

import React from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { DailyProvider } from '@daily-co/daily-react'
import { Header } from '../components/Header'
import { HomePage } from '../components/HomePage'
import { CleanCallingCard } from '../components/CleanCallingCard'
import { Footer3 } from '../components/Footer3'
import dynamic from 'next/dynamic'

const TorusCanvas = dynamic(() => import('../components/TorusCanvas'), { ssr: false })

export default function Home() {
  const { ready, authenticated } = usePrivy()

  // Show loading while Privy initializes
  if (!ready) {
    return (
      <div style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.8,
          animation: 'fadeIn 4s ease-in-out forwards'
        }}>
          <TorusCanvas />
        </div>
        <style jsx>{`
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 0.8; }
          }
        `}</style>
      </div>
    )
  }

  // Show calling card if authenticated
  if (authenticated) {
    return (
      <DailyProvider>
        <CleanCallingCard />
      </DailyProvider>
    )
  }

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
      <Footer3 />
    </>
  )
}