'use client'

import React from 'react'
import { Header } from '../components/Header'
import { HomePage } from '../components/HomePage'
import { Footer } from '../components/Footer2'
import dynamic from 'next/dynamic'

const TorusCanvas = dynamic(() => import('../components/TorusCanvas'), { ssr: false })

export default function Home() {
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