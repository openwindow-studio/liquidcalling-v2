import { NextRequest } from 'next/server'
import { ethers } from 'ethers'
import { createClient } from 'redis'

// Session TTL: 24 hours (in seconds)
const SESSION_TTL = 60 * 60 * 24

// Initialize Redis client (singleton pattern for serverless)
let redisClient: ReturnType<typeof createClient> | null = null

async function getRedis() {
  if (!redisClient) {
    const redisUrl = process.env.REDIS_URL
    if (!redisUrl) {
      throw new Error('REDIS_URL environment variable not set')
    }
    
    redisClient = createClient({ url: redisUrl })
    
    redisClient.on('error', (err) => {
      console.error('Redis Client Error', err)
      redisClient = null // Reset on error
    })
    
    await redisClient.connect()
  }
  
  return redisClient
}

interface CallSession {
  sessionId: string
  walletAddress: string
  roomId: string
  startedAt: string
  endedAt?: string
  minutesUsed: number
  isActive: boolean
}

// Helper to get base URL from request
function getBaseUrl(request: NextRequest): string {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  // For local dev, extract from request headers
  const host = request.headers.get('host') || 'localhost:3000'
  const protocol = host.includes('localhost') ? 'http' : 'https'
  return `${protocol}://${host}`
}

export async function POST(request: NextRequest) {
  try {
    const { action, walletAddress, roomId, sessionId, minutesUsed } = await request.json()

    if (!action || !['start', 'end', 'heartbeat'].includes(action)) {
      return Response.json({ error: 'Invalid action' }, { status: 400 })
    }

    const baseUrl = getBaseUrl(request)

    switch (action) {
      case 'start':
        return await startSession(walletAddress, roomId, baseUrl)
      case 'end':
        return await endSession(sessionId, minutesUsed)
      case 'heartbeat':
        return await updateHeartbeat(sessionId, minutesUsed, baseUrl)
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

async function startSession(walletAddress: string, roomId: string, baseUrl: string) {
  if (!walletAddress || !ethers.isAddress(walletAddress)) {
    return Response.json({ error: 'Invalid wallet address' }, { status: 400 })
  }

  if (!roomId) {
    return Response.json({ error: 'Room ID required' }, { status: 400 })
  }

  // Validate user has sufficient minutes first
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

async function updateHeartbeat(sessionId: string, currentMinutesUsed: number, baseUrl: string) {
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

// Redis storage helpers
async function saveSession(session: CallSession) {
  const redis = await getRedis()
  const key = `call_session:${session.sessionId}`
  await redis.setEx(key, SESSION_TTL, JSON.stringify(session))
}

async function loadSession(sessionId: string): Promise<CallSession | null> {
  const redis = await getRedis()
  const key = `call_session:${sessionId}`
  const data = await redis.get(key)
  return data ? JSON.parse(data) : null
}
