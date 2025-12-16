import { NextRequest } from 'next/server'
import { ethers } from 'ethers'
import { writeFile, readFile, mkdir } from 'fs/promises'
import path from 'path'

// Simple file-based session storage (for MVP - replace with database later)
const SESSION_DIR = '/tmp/call-sessions'

interface CallSession {
  sessionId: string
  walletAddress: string
  roomId: string
  startedAt: string
  endedAt?: string
  minutesUsed: number
  isActive: boolean
}

export async function POST(request: NextRequest) {
  try {
    const { action, walletAddress, roomId, sessionId, minutesUsed } = await request.json()

    if (!action || !['start', 'end', 'heartbeat'].includes(action)) {
      return Response.json({ error: 'Invalid action' }, { status: 400 })
    }

    switch (action) {
      case 'start':
        return await startSession(walletAddress, roomId)
      case 'end':
        return await endSession(sessionId, minutesUsed)
      case 'heartbeat':
        return await updateHeartbeat(sessionId, minutesUsed)
      default:
        return Response.json({ error: 'Unknown action' }, { status: 400 })
    }

  } catch (error: any) {
    console.error('Call session error:', error)
    return Response.json({
      error: 'Session management failed',
      details: error.message
    }, { status: 500 })
  }
}

async function startSession(walletAddress: string, roomId: string) {
  if (!walletAddress || !ethers.isAddress(walletAddress)) {
    return Response.json({ error: 'Invalid wallet address' }, { status: 400 })
  }

  if (!roomId) {
    return Response.json({ error: 'Room ID required' }, { status: 400 })
  }

  // Validate user has sufficient minutes first
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'
  const validation = await fetch(`${baseUrl}/api/validate-minutes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      walletAddress,
      action: 'create_call'
    })
  })

  const validationResult = await validation.json()
  if (!validationResult.valid) {
    return Response.json({
      error: 'Insufficient minutes',
      details: validationResult.message
    }, { status: 402 }) // Payment Required
  }

  // Create session
  const sessionId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  const session: CallSession = {
    sessionId,
    walletAddress,
    roomId,
    startedAt: new Date().toISOString(),
    minutesUsed: 0,
    isActive: true
  }

  await saveSession(session)

  console.log(`📞 Call session started: ${sessionId} for wallet ${walletAddress}`)

  return Response.json({
    success: true,
    sessionId,
    startedAt: session.startedAt,
    availableMinutes: validationResult.actualMinutes
  })
}

async function endSession(sessionId: string, minutesUsed: number = 0) {
  if (!sessionId) {
    return Response.json({ error: 'Session ID required' }, { status: 400 })
  }

  try {
    const session = await loadSession(sessionId)
    if (!session) {
      return Response.json({ error: 'Session not found' }, { status: 404 })
    }

    // Update session
    session.endedAt = new Date().toISOString()
    session.minutesUsed = Math.max(session.minutesUsed, minutesUsed)
    session.isActive = false

    await saveSession(session)

    console.log(`📞 Call session ended: ${sessionId} - ${session.minutesUsed} minutes used`)

    return Response.json({
      success: true,
      sessionId,
      endedAt: session.endedAt,
      minutesUsed: session.minutesUsed,
      duration: new Date(session.endedAt).getTime() - new Date(session.startedAt).getTime()
    })

  } catch (error: any) {
    return Response.json({
      error: 'Failed to end session',
      details: error.message
    }, { status: 500 })
  }
}

async function updateHeartbeat(sessionId: string, currentMinutesUsed: number) {
  if (!sessionId) {
    return Response.json({ error: 'Session ID required' }, { status: 400 })
  }

  try {
    const session = await loadSession(sessionId)
    if (!session || !session.isActive) {
      return Response.json({ error: 'Invalid or inactive session' }, { status: 404 })
    }

    // Update minutes used
    session.minutesUsed = Math.max(session.minutesUsed, currentMinutesUsed)
    await saveSession(session)

    // Verify user still has sufficient minutes
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'
    const validation = await fetch(`${baseUrl}/api/validate-minutes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        walletAddress: session.walletAddress,
        claimedMinutes: session.minutesUsed,
        action: 'minute_check'
      })
    })

    const validationResult = await validation.json()

    return Response.json({
      success: true,
      sessionValid: validationResult.valid,
      minutesUsed: session.minutesUsed,
      remainingMinutes: Math.max(0, validationResult.actualMinutes - session.minutesUsed),
      shouldEndCall: !validationResult.valid
    })

  } catch (error: any) {
    return Response.json({
      error: 'Failed to update heartbeat',
      details: error.message
    }, { status: 500 })
  }
}

// File storage helpers (replace with database later)
async function saveSession(session: CallSession) {
  try {
    await mkdir(SESSION_DIR, { recursive: true })
    const filePath = path.join(SESSION_DIR, `${session.sessionId}.json`)
    await writeFile(filePath, JSON.stringify(session, null, 2))
  } catch (error) {
    console.error('Failed to save session:', error)
  }
}

async function loadSession(sessionId: string): Promise<CallSession | null> {
  try {
    const filePath = path.join(SESSION_DIR, `${sessionId}.json`)
    const data = await readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return null
  }
}