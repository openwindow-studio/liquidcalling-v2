'use client'

import React from 'react'

interface DemoCallModalProps {
  isOpen: boolean
  onClose: () => void
  onStartDemo: () => void
}

export function DemoCallModal({ isOpen, onClose, onStartDemo }: DemoCallModalProps) {
  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '24px',
        padding: '40px',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        textAlign: 'center'
      }}>
        {/* Demo Icon */}
        <div style={{
          width: '60px',
          height: '60px',
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px auto'
        }}>
          <svg width="24" height="30" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.00002 2V8.292C5.38869 8.7724 4.00412 9.81675 3.09948 11.2341C2.19485 12.6514 1.8306 14.347 2.07335 16.0108C2.3161 17.6746 3.14961 19.1954 4.42149 20.2952C5.69336 21.395 7.3186 22.0002 9.00002 22.0002C10.6814 22.0002 12.3067 21.395 13.5785 20.2952C14.8504 19.1954 15.6839 17.6746 15.9267 16.0108C16.1694 14.347 15.8052 12.6514 14.9005 11.2341C13.9959 9.81675 12.6113 8.7724 11 8.292V2" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 15H16" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5.5 2H12.5" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Title */}
        <h2 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#1a1a1a',
          margin: '0 0 16px 0'
        }}>
          Try Demo Mode
        </h2>

        {/* Description */}
        <p style={{
          fontSize: '16px',
          color: '#666',
          lineHeight: '1.6',
          margin: '0 0 32px 0'
        }}>
          Experience our secure calling platform with a 10-minute test session. No billing, no commitment required.
        </p>

        {/* Features */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: '32px',
          textAlign: 'left'
        }}>
          <div style={{
            padding: '12px',
            background: '#f8fafc',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{ fontSize: '16px' }}>🔒</div>
            <span style={{ fontSize: '12px', color: '#666' }}>End-to-End Encrypted</span>
          </div>
          <div style={{
            padding: '12px',
            background: '#f8fafc',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{ fontSize: '16px' }}>⏰</div>
            <span style={{ fontSize: '12px', color: '#666' }}>10 Minute Limit</span>
          </div>
          <div style={{
            padding: '12px',
            background: '#f8fafc',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{ fontSize: '16px' }}>🚫</div>
            <span style={{ fontSize: '12px', color: '#666' }}>No Billing</span>
          </div>
          <div style={{
            padding: '12px',
            background: '#f8fafc',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{ fontSize: '16px' }}>👤</div>
            <span style={{ fontSize: '12px', color: '#666' }}>Anonymous</span>
          </div>
        </div>

        {/* Buttons */}
        <div style={{
          display: 'flex',
          gap: '12px'
        }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '16px',
              background: 'transparent',
              border: '1px solid #d1d5db',
              borderRadius: '12px',
              color: '#666',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onStartDemo()
              onClose()
            }}
            style={{
              flex: 1,
              padding: '16px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
            }}
          >
            Start Demo
          </button>
        </div>
      </div>
    </div>
  )
}