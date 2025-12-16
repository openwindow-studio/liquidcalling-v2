import { NextRequest } from 'next/server'
import { ethers } from 'ethers'

// Network configurations for payment verification
const NETWORKS = {
  BASE: {
    rpcUrl: 'https://mainnet.base.org',
    usdcAddress: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
    treasuryWallet: process.env.NEXT_PUBLIC_BASE_TREASURY_WALLET,
    explorer: 'https://basescan.org'
  },
  HYPERLIQUID: {
    apiUrl: 'https://api.hyperliquid.xyz/info',
    treasuryWallet: process.env.NEXT_PUBLIC_HL_TREASURY_WALLET,
    explorer: 'https://hyperevmscan.io'
  }
}

// USDC Transfer event signature
const USDC_TRANSFER_TOPIC = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'

export async function POST(request: NextRequest) {
  try {
    const { walletAddress } = await request.json()

    if (!walletAddress || !ethers.isAddress(walletAddress)) {
      return Response.json({
        error: 'Invalid wallet address'
      }, { status: 400 })
    }

    // Get payments from both networks
    const [basePayments, hlPayments] = await Promise.all([
      getBasePayments(walletAddress),
      getHyperliquidPayments(walletAddress)
    ])

    const allPayments = [...basePayments, ...hlPayments]
    const totalMinutes = allPayments.reduce((sum, payment) => sum + payment.minutes, 0)

    return Response.json({
      success: true,
      totalMinutes,
      payments: allPayments,
      verification: {
        basePayments: basePayments.length,
        hlPayments: hlPayments.length,
        verifiedAt: new Date().toISOString()
      }
    })

  } catch (error: any) {
    console.error('Payment verification failed:', error)
    return Response.json({
      error: 'Verification failed',
      details: error.message
    }, { status: 500 })
  }
}

async function getBasePayments(userAddress: string): Promise<any[]> {
  try {
    const network = NETWORKS.BASE
    if (!network.treasuryWallet) {
      console.warn('Base treasury wallet not configured')
      return []
    }

    const provider = new ethers.JsonRpcProvider(network.rpcUrl)

    // Get USDC transfer logs to our treasury wallet
    const filter = {
      address: network.usdcAddress,
      topics: [
        USDC_TRANSFER_TOPIC,
        ethers.zeroPadValue(userAddress, 32), // from
        ethers.zeroPadValue(network.treasuryWallet, 32) // to
      ],
      fromBlock: -10000, // Last ~10k blocks (about 1-2 weeks)
      toBlock: 'latest'
    }

    const logs = await provider.getLogs(filter)
    const payments = []

    for (const log of logs) {
      try {
        // Decode transfer amount
        const amount = ethers.formatUnits(log.data, 6) // USDC has 6 decimals
        const minutes = Math.floor(parseFloat(amount) * 20) // $0.05 per minute = 20 minutes per dollar

        // Get block details for timestamp
        const block = await provider.getBlock(log.blockNumber)

        payments.push({
          txHash: log.transactionHash,
          network: 'Base',
          amount: parseFloat(amount),
          minutes,
          timestamp: block?.timestamp ? new Date(block.timestamp * 1000).toISOString() : null,
          blockNumber: log.blockNumber,
          verified: true
        })
      } catch (err) {
        console.error('Error processing Base log:', err)
      }
    }

    console.log(`Found ${payments.length} Base payments for ${userAddress}`)
    return payments

  } catch (error) {
    console.error('Base payment verification failed:', error)
    return []
  }
}

async function getHyperliquidPayments(userAddress: string): Promise<any[]> {
  try {
    const network = NETWORKS.HYPERLIQUID
    if (!network.treasuryWallet) {
      console.warn('Hyperliquid treasury wallet not configured')
      return []
    }

    // Query Hyperliquid API for spot transfers
    // Note: This is a simplified approach - real implementation would need
    // to query their indexer API or track transfers more comprehensively
    console.log('Hyperliquid payment verification not yet implemented - requires API integration')

    // Placeholder for now - would implement actual API calls
    return []

  } catch (error) {
    console.error('Hyperliquid payment verification failed:', error)
    return []
  }
}