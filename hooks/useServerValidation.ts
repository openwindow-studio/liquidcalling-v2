'use client'

import { useState, useEffect } from 'react'
import { usePrivy } from '@privy-io/react-auth'

interface ServerValidationResult {
  valid: boolean
  actualMinutes: number
  claimedMinutes: number
  discrepancy: number
  message: string
  verification: {
    paidMinutes: number
    freeMinutes: number
    totalMinutes: number
    verifiedAt: string
  }
}

interface CallSession {
  sessionId: string
  startedAt: string
  availableMinutes: number
}

export function useServerValidation() {
  const { authenticated, user } = usePrivy()
  const [isValidating, setIsValidating] = useState(false)
  const [lastValidation, setLastValidation] = useState<ServerValidationResult | null>(null)
  const [currentSession, setCurrentSession] = useState<CallSession | null>(null)

  // Validate user's claimed minutes against blockchain
  const validateMinutes = async (claimedMinutes: number, action: 'create_call' | 'join_call' | 'minute_check' = 'minute_check') => {
    if (!authenticated || !user?.wallet?.address) {
      throw new Error('User not authenticated')
    }

    setIsValidating(true)

    try {
      const response = await fetch('/api/validate-minutes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletAddress: user.wallet.address,
          claimedMinutes,
          action
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Validation failed')
      }

      const result: ServerValidationResult = await response.json()
      setLastValidation(result)

      // Log discrepancies for monitoring
      if (result.discrepancy > 5) {
        console.warn(`🚨 Client-server minute discrepancy: ${result.discrepancy} minutes`, {
          claimed: result.claimedMinutes,
          actual: result.actualMinutes,
          wallet: user.wallet.address
        })
      }

      return result

    } catch (error: any) {
      console.error('Server validation failed:', error)
      throw error
    } finally {
      setIsValidating(false)
    }
  }

  // Start a call session with server tracking
  const startCallSession = async (roomId: string): Promise<CallSession> => {
    if (!authenticated || !user?.wallet?.address) {
      throw new Error('User not authenticated')
    }

    try {
      const response = await fetch('/api/call-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'start',
          walletAddress: user.wallet.address,
          roomId
        })
      })

      if (!response.ok) {
        const error = await response.json()
        if (response.status === 402) {
          throw new Error('Insufficient minutes balance')
        }
        throw new Error(error.message || 'Failed to start session')
      }

      const session: CallSession = await response.json()
      setCurrentSession(session)

      console.log(`✅ Call session started with server tracking: ${session.sessionId}`)
      return session

    } catch (error: any) {
      console.error('Failed to start call session:', error)
      throw error
    }
  }

  // End call session
  const endCallSession = async (minutesUsed: number) => {
    if (!currentSession) {
      console.warn('No active session to end')
      return
    }

    try {
      const response = await fetch('/api/call-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'end',
          sessionId: currentSession.sessionId,
          minutesUsed
        })
      })

      if (response.ok) {
        const result = await response.json()
        console.log(`✅ Call session ended: ${result.minutesUsed} minutes used`)
      }

    } catch (error) {
      console.error('Failed to end call session:', error)
    } finally {
      setCurrentSession(null)
    }
  }

  // Send periodic heartbeat during calls
  const sendHeartbeat = async (currentMinutesUsed: number) => {
    if (!currentSession) {
      return { sessionValid: false, shouldEndCall: true }
    }

    try {
      const response = await fetch('/api/call-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'heartbeat',
          sessionId: currentSession.sessionId,
          minutesUsed: currentMinutesUsed
        })
      })

      if (response.ok) {
        const result = await response.json()

        if (result.shouldEndCall) {
          console.warn('⚠️ Server requested call termination - insufficient minutes')
        }

        return {
          sessionValid: result.sessionValid,
          shouldEndCall: result.shouldEndCall,
          remainingMinutes: result.remainingMinutes
        }
      }

      return { sessionValid: false, shouldEndCall: true }

    } catch (error) {
      console.error('Heartbeat failed:', error)
      return { sessionValid: false, shouldEndCall: false } // Don't kill call on network errors
    }
  }

  // Auto-validate on mount for authenticated users
  useEffect(() => {
    if (authenticated && user?.wallet?.address) {
      // Get current claimed minutes from localStorage
      const stored = localStorage.getItem(`minutes_${user.wallet.address}`)
      if (stored) {
        const claimedMinutes = parseInt(stored, 10)
        validateMinutes(claimedMinutes).catch(console.error)
      }
    }
  }, [authenticated, user?.wallet?.address])

  return {
    validateMinutes,
    startCallSession,
    endCallSession,
    sendHeartbeat,
    isValidating,
    lastValidation,
    currentSession,

    // Helper methods
    // Only show discrepancy warning if:
    // 1. Server has minutes but client claims significantly more (suspicious)
    // 2. OR discrepancy is very large (> 20 minutes)
    // Don't warn if server is 0 and client has small amount (probably test data or Stripe payment)
    hasDiscrepancy: lastValidation 
      ? (lastValidation.actualMinutes > 0 && lastValidation.discrepancy > 10) || lastValidation.discrepancy > 20
      : false,
    serverMinutes: lastValidation?.actualMinutes || 0,
    isSessionActive: !!currentSession
  }
}