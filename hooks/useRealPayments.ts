'use client'

import { useState, useEffect } from 'react'
import { usePrivy, useWallets } from '@privy-io/react-auth'
import { ethers } from 'ethers'

// Network configurations
const SUPPORTED_NETWORKS = {
  HYPERLIQUID_TESTNET: {
    chainId: 998,
    name: 'HyperLiquid Testnet',
    rpcUrl: 'https://api.hyperliquid-testnet.xyz/evm',
    usdcAddress: '0x...', // Add actual USDC address
    treasuryWallet: process.env.NEXT_PUBLIC_HL_TREASURY_WALLET || '0x...',
  },
  BASE_MAINNET: {
    chainId: 8453,
    name: 'Base',
    rpcUrl: 'https://mainnet.base.org',
    usdcAddress: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913', // USDC on Base
    treasuryWallet: process.env.NEXT_PUBLIC_BASE_TREASURY_WALLET || '0x...',
  },
  BASE_SEPOLIA: {
    chainId: 84532,
    name: 'Base Sepolia',
    rpcUrl: 'https://sepolia.base.org',
    usdcAddress: '0x036CbD53842c5426634e7929541eC2318f3dCF7e', // USDC on Base Sepolia
    treasuryWallet: process.env.NEXT_PUBLIC_BASE_SEPOLIA_TREASURY_WALLET || '0x...',
  }
}

// ERC20 ABI for USDC transfers
const ERC20_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  'function name() view returns (string)'
]

export function useRealPayments() {
  const { authenticated, user } = usePrivy()
  const { wallets } = useWallets()
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentNetwork, setCurrentNetwork] = useState<keyof typeof SUPPORTED_NETWORKS | null>(null)
  const [usdcBalance, setUsdcBalance] = useState<string>('0')
  const [error, setError] = useState<Error | null>(null)

  const wallet = wallets[0]

  // Get current network
  const getCurrentNetwork = async () => {
    if (!wallet) return null

    try {
      const provider = await wallet.getEthersProvider()
      const network = await provider.getNetwork()
      const chainId = Number(network.chainId)

      // Find matching network
      for (const [key, config] of Object.entries(SUPPORTED_NETWORKS)) {
        if (config.chainId === chainId) {
          return key as keyof typeof SUPPORTED_NETWORKS
        }
      }
      return null
    } catch (error) {
      console.error('Failed to get network:', error)
      return null
    }
  }

  // Switch to specific network
  const switchToNetwork = async (networkKey: keyof typeof SUPPORTED_NETWORKS) => {
    if (!wallet) return false

    const config = SUPPORTED_NETWORKS[networkKey]

    try {
      await wallet.switchChain(config.chainId)
      setCurrentNetwork(networkKey)
      return true
    } catch (error) {
      console.error(`Failed to switch to ${config.name}:`, error)
      setError(error as Error)
      return false
    }
  }

  // Get USDC balance on current network
  const getUSDCBalance = async () => {
    if (!wallet || !currentNetwork) return '0'

    const config = SUPPORTED_NETWORKS[currentNetwork]
    if (!config.usdcAddress || config.usdcAddress === '0x...') {
      return '0'
    }

    try {
      const provider = await wallet.getEthersProvider()
      const signer = await provider.getSigner()
      const userAddress = await signer.getAddress()

      const usdcContract = new ethers.Contract(
        config.usdcAddress,
        ERC20_ABI,
        provider
      )

      const [balance, decimals] = await Promise.all([
        usdcContract.balanceOf(userAddress),
        usdcContract.decimals()
      ])

      return ethers.formatUnits(balance, decimals)
    } catch (error) {
      console.error('Failed to get USDC balance:', error)
      return '0'
    }
  }

  // Pay with USDC on current network
  const payWithUSDC = async (amountUSD: string) => {
    if (!wallet || !currentNetwork) {
      setError(new Error('No wallet or network selected'))
      return null
    }

    const config = SUPPORTED_NETWORKS[currentNetwork]

    if (!config.usdcAddress || config.usdcAddress === '0x...' ||
        !config.treasuryWallet || config.treasuryWallet === '0x...') {
      setError(new Error(`USDC or treasury not configured for ${config.name}`))
      return null
    }

    setIsProcessing(true)
    setError(null)

    try {
      const provider = await wallet.getEthersProvider()
      const signer = await provider.getSigner()

      const usdcContract = new ethers.Contract(
        config.usdcAddress,
        ERC20_ABI,
        signer
      )

      // Get USDC decimals (should be 6)
      const decimals = await usdcContract.decimals()
      const amountWei = ethers.parseUnits(amountUSD, decimals)

      // Check balance first
      const userAddress = await signer.getAddress()
      const balance = await usdcContract.balanceOf(userAddress)

      if (balance < amountWei) {
        throw new Error(`Insufficient USDC balance. Need ${amountUSD} USDC`)
      }

      // Execute transfer to treasury
      console.log(`Transferring ${amountUSD} USDC on ${config.name}...`)
      const tx = await usdcContract.transfer(config.treasuryWallet, amountWei)

      console.log('Transaction sent:', tx.hash)
      const receipt = await tx.wait()

      console.log('✅ Payment successful:', receipt.hash)
      return {
        hash: receipt.hash,
        network: config.name,
        amount: amountUSD
      }

    } catch (error: any) {
      console.error('Payment failed:', error)

      // Better error messages
      if (error.code === 'ACTION_REJECTED') {
        setError(new Error('Transaction rejected by user'))
      } else if (error.message.includes('insufficient funds')) {
        setError(new Error('Insufficient funds for gas fees'))
      } else if (error.message.includes('Insufficient USDC')) {
        setError(error)
      } else {
        setError(new Error(`Payment failed: ${error.message}`))
      }

      return null
    } finally {
      setIsProcessing(false)
    }
  }

  // Auto-detect network on wallet change
  useEffect(() => {
    if (wallet) {
      getCurrentNetwork().then(setCurrentNetwork)
    }
  }, [wallet])

  // Update balance when network changes
  useEffect(() => {
    if (currentNetwork) {
      getUSDCBalance().then(setUsdcBalance)
    }
  }, [currentNetwork])

  // Listen for chain changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const handleChainChanged = () => {
        getCurrentNetwork().then(setCurrentNetwork)
      }

      window.ethereum.on('chainChanged', handleChainChanged)
      return () => {
        window.ethereum.removeListener('chainChanged', handleChainChanged)
      }
    }
  }, [])

  return {
    // Payment functions
    payWithUSDC,
    switchToNetwork,

    // State
    currentNetwork,
    usdcBalance,
    isProcessing,
    error,

    // Network info
    supportedNetworks: SUPPORTED_NETWORKS,
    isReady: authenticated && !!wallet && !!currentNetwork,

    // Utils
    refreshBalance: () => getUSDCBalance().then(setUsdcBalance),
  }
}