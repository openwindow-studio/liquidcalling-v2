import { NextRequest } from 'next/server'
import { ethers } from 'ethers'

export async function POST(request: NextRequest) {
  try {
    const { walletAddress, claimedMinutes, action } = await request.json()

    if (!walletAddress || !ethers.isAddress(walletAddress)) {
      return Response.json({
        error: 'Invalid wallet address'
      }, { status: 400 })
    }

    if (!action || !['create_call', 'join_call', 'minute_check'].includes(action)) {
      return Response.json({
        error: 'Invalid action'
      }, { status: 400 })
    }

    // Verify payments from blockchain
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'
    const verificationResponse = await fetch(`${baseUrl}/api/verify-payments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ walletAddress })
    })

    if (!verificationResponse.ok) {
      throw new Error('Payment verification service unavailable')
    }

    const { totalMinutes: actualMinutes } = await verificationResponse.json()

    // No free minutes - users must purchase via blockchain
    // Future: $1 USDC airdrop for X/Farcaster signups
    const totalAvailableMinutes = actualMinutes

    // Validation logic based on action
    let isValid = false
    let message = ''

    switch (action) {
      case 'create_call':
      case 'join_call':
        isValid = totalAvailableMinutes >= 1
        message = isValid
          ? 'Sufficient minutes to start call'
          : 'Insufficient minutes balance'
        break

      case 'minute_check':
        isValid = claimedMinutes <= totalAvailableMinutes
        message = isValid
          ? 'Minutes balance verified'
          : `Client claims ${claimedMinutes} but actual balance is ${totalAvailableMinutes}`
        break
    }

    // Log suspicious activity
    if (!isValid && claimedMinutes > totalAvailableMinutes + 10) {
      console.warn(`🚨 SUSPICIOUS ACTIVITY: Wallet ${walletAddress} claims ${claimedMinutes} minutes but only has ${totalAvailableMinutes}`)
    }

    return Response.json({
      valid: isValid,
      actualMinutes: totalAvailableMinutes,
      claimedMinutes: claimedMinutes || 0,
      discrepancy: (claimedMinutes || 0) - totalAvailableMinutes,
      message,
      freeMinutesApplied: freeMinutes,
      verification: {
        paidMinutes: actualMinutes,
        freeMinutes,
        totalMinutes: totalAvailableMinutes,
        verifiedAt: new Date().toISOString()
      }
    })

  } catch (error: any) {
    console.error('Minute validation failed:', error)
    return Response.json({
      error: 'Validation failed',
      details: error.message,
      valid: false
    }, { status: 500 })
  }
}