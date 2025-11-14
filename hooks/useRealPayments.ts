'use client'

import { useState, useEffect } from 'react'
import { usePrivy, useWallets } from '@privy-io/react-auth'
import { ethers } from 'ethers'

// Network configurations
const SUPPORTED_NETWORKS = {
  // HYPERLIQUID_TESTNET: {
  //   chainId: 998,
  //   name: 'HyperLiquid Testnet',
  //   rpcUrl: 'https://api.hyperliquid-testnet.xyz/evm',
  //   nativeCurrency: {
  //     name: 'Ethereum',
  //     symbol: 'ETH',
  //     decimals: 18
  //   },
  //   usdcAddress: '0xd9CBEC81df392A88AEff575E962d149d57F4d6bc', // USDC on HyperLiquid testnet
  //   treasuryWallet: process.env.NEXT_PUBLIC_HL_TREASURY_WALLET || '0x...',
  // },
  BASE_MAINNET: {
    chainId: 8453,
    name: 'Base',
    rpcUrl: 'https://mainnet.base.org',
    blockExplorer: 'https://basescan.org',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18
    },
    usdcAddress: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913', // USDC on Base
    treasuryWallet: process.env.NEXT_PUBLIC_BASE_TREASURY_WALLET || '0x...',
  },
  BASE_SEPOLIA: {
    chainId: 84532,
    name: 'Base Sepolia',
    rpcUrl: 'https://base-sepolia-rpc.publicnode.com',
    blockExplorer: 'https://sepolia.basescan.org',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18
    },
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
      // Use the correct Privy wallet API
      const provider = await wallet.getEthereumProvider()
      if (!provider) {
        console.warn('No ethereum provider available')
        return null
      }

      const chainId = await provider.request({ method: 'eth_chainId' })
      const chainIdNum = parseInt(chainId, 16)

      console.log(`Current chain ID: ${chainId} (${chainIdNum})`)

      // Find matching network
      for (const [key, config] of Object.entries(SUPPORTED_NETWORKS)) {
        if (config.chainId === chainIdNum) {
          console.log(`Matched network: ${key} (${config.name})`)
          return key as keyof typeof SUPPORTED_NETWORKS
        }
      }

      console.warn(`Unknown network with chain ID: ${chainIdNum}`)
      return null
    } catch (error) {
      console.error('Failed to get network:', error)

      // Don't set error state for HyperLiquid RPC issues - just log and continue
      if (error.message?.includes('RPC endpoint returned too many errors')) {
        console.warn('HyperLiquid RPC temporarily unavailable, but network switching still works')
        return null
      }

      setError(new Error('Failed to detect current network. Please try reconnecting your wallet.'))
      return null
    }
  }

  // Switch to specific network
  const switchToNetwork = async (networkKey: keyof typeof SUPPORTED_NETWORKS) => {
    if (!wallet) {
      setError(new Error('No wallet connected'))
      return false
    }

    const config = SUPPORTED_NETWORKS[networkKey]
    console.log(`Attempting to switch to ${config.name} (Chain ID: ${config.chainId})`)

    try {
      // Clear any previous errors
      setError(null)

      // Use the ethereum provider to switch chains
      const provider = await wallet.getEthereumProvider()
      if (!provider) {
        throw new Error('Wallet provider not available')
      }

      try {
        // Try to switch to the chain
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${config.chainId.toString(16)}` }]
        })
        console.log(`✅ Successfully switched to ${config.name}`)
        setCurrentNetwork(networkKey)
        return true
      } catch (switchError: any) {
        // If switch fails (4902 = chain not added), try to add the network first
        if (switchError.code === 4902) {
          try {
            const addChainParams: any = {
              chainId: `0x${config.chainId.toString(16)}`,
              chainName: config.name,
              rpcUrls: [config.rpcUrl],
              nativeCurrency: config.nativeCurrency || {
                name: 'Ethereum',
                symbol: 'ETH',
                decimals: 18
              }
            }

            // Add block explorer if available
            if (config.blockExplorer) {
              addChainParams.blockExplorerUrls = [config.blockExplorer]
            }

            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [addChainParams]
            })
            setCurrentNetwork(networkKey)
            return true
          } catch (addError) {
            console.error(`Failed to add network ${config.name}:`, addError)
            setError(new Error(`Failed to add ${config.name}. Please add manually.`))
            return false
          }
        } else {
          console.error(`Failed to switch to ${config.name}:`, switchError)

          // Don't show error for RPC issues, just warn user
          if (switchError.message?.includes('RPC endpoint returned too many errors')) {
            console.warn(`${config.name} RPC temporarily unavailable. Network switch may have succeeded anyway.`)
            // Optimistically set the network - the actual switch might have worked
            setTimeout(() => getCurrentNetwork().then(setCurrentNetwork), 1000)
          } else {
            setError(new Error(`Failed to switch to ${config.name}.`))
          }
          return false
        }
      }
    } catch (error: any) {
      console.error(`Network switch error for ${config.name}:`, error)
      setError(error)
      return false
    }
  }

  // Get USDC balance on current network
  const getUSDCBalance = async () => {
    if (!wallet || !currentNetwork) {
      console.log('No wallet or network for balance check')
      return '0'
    }

    const config = SUPPORTED_NETWORKS[currentNetwork]
    if (!config.usdcAddress || config.usdcAddress === '0x...') {
      console.log('No USDC address configured for', currentNetwork)
      return '0'
    }

    try {
      const provider = await wallet.getEthereumProvider()
      const accounts = await provider.request({ method: 'eth_accounts' })
      const userAddress = accounts[0]

      console.log(`💰 Checking USDC balance on ${currentNetwork} for ${userAddress}`)
      console.log(`📄 USDC contract: ${config.usdcAddress}`)

      if (!userAddress) return '0'

      // Use ethers with the raw provider
      const ethersProvider = new ethers.BrowserProvider(provider)
      const usdcContract = new ethers.Contract(
        config.usdcAddress,
        ERC20_ABI,
        ethersProvider
      )

      const [balance, decimals] = await Promise.all([
        usdcContract.balanceOf(userAddress),
        usdcContract.decimals()
      ])

      const formattedBalance = ethers.formatUnits(balance, decimals)
      console.log(`💵 Raw balance: ${balance.toString()}, Decimals: ${decimals}, Formatted: ${formattedBalance}`)

      return formattedBalance
    } catch (error) {
      console.error('Failed to get USDC balance:', error)

      // For HyperLiquid RPC issues, return 0 but don't block the UI
      if (error.message?.includes('RPC endpoint returned too many errors') ||
          error.message?.includes('missing revert data')) {
        console.warn('RPC issue detected, balance check failed but network switching still works')
        return '0'
      }

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
      const provider = await wallet.getEthereumProvider()
      const accounts = await provider.request({ method: 'eth_accounts' })
      const userAddress = accounts[0]

      if (!userAddress) {
        throw new Error('No wallet address found')
      }

      // Use ethers with the raw provider
      const ethersProvider = new ethers.BrowserProvider(provider)
      const signer = await ethersProvider.getSigner()

      const usdcContract = new ethers.Contract(
        config.usdcAddress,
        ERC20_ABI,
        signer
      )

      // Get USDC decimals (should be 6)
      const decimals = await usdcContract.decimals()
      const amountWei = ethers.parseUnits(amountUSD, decimals)

      // Check balance first
      const balance = await usdcContract.balanceOf(userAddress)
      const formattedBalance = ethers.formatUnits(balance, decimals)

      console.log(`💰 Payment balance check:`)
      console.log(`   User: ${userAddress}`)
      console.log(`   USDC Contract: ${config.usdcAddress}`)
      console.log(`   Raw Balance: ${balance.toString()}`)
      console.log(`   Formatted Balance: ${formattedBalance} USDC`)
      console.log(`   Required: ${amountUSD} USDC`)
      console.log(`   Amount Wei: ${amountWei.toString()}`)

      if (balance < amountWei) {
        throw new Error(`Insufficient USDC balance. Have ${formattedBalance} USDC, need ${amountUSD} USDC`)
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
      getCurrentNetwork().then(network => {
        console.log('Detected network:', network)
        setCurrentNetwork(network)
      })
    }
  }, [wallet])

  // Update balance when network changes
  useEffect(() => {
    if (currentNetwork) {
      console.log('Network changed to:', currentNetwork)
      getUSDCBalance().then(setUsdcBalance)
    }
  }, [currentNetwork])

  // Debug crypto ready state
  useEffect(() => {
    const cryptoReady = authenticated && !!wallet && !!currentNetwork &&
                       currentNetwork in SUPPORTED_NETWORKS &&
                       SUPPORTED_NETWORKS[currentNetwork].usdcAddress !== '0x...' &&
                       SUPPORTED_NETWORKS[currentNetwork].treasuryWallet !== '0x...'

    console.log('Crypto ready check:', {
      authenticated,
      wallet: !!wallet,
      currentNetwork,
      isSupported: currentNetwork ? currentNetwork in SUPPORTED_NETWORKS : false,
      hasUSDC: currentNetwork ? SUPPORTED_NETWORKS[currentNetwork]?.usdcAddress !== '0x...' : false,
      hasTreasury: currentNetwork ? SUPPORTED_NETWORKS[currentNetwork]?.treasuryWallet !== '0x...' : false,
      cryptoReady
    })
  }, [authenticated, wallet, currentNetwork])

  // Listen for chain changes
  useEffect(() => {
    if (typeof window !== 'undefined' && wallet) {
      const handleChainChanged = () => {
        console.log('Chain changed, detecting new network...')
        getCurrentNetwork().then(network => {
          console.log('New network detected:', network)
          setCurrentNetwork(network)
        }).catch(error => {
          console.error('Error detecting network change:', error)
        })
      }

      // Try to use wallet provider's event system instead of global ethereum
      const setupChainListener = async () => {
        try {
          const provider = await wallet.getEthereumProvider()
          if (provider && provider.on) {
            provider.on('chainChanged', handleChainChanged)
            return () => {
              if (provider.removeListener) {
                provider.removeListener('chainChanged', handleChainChanged)
              }
            }
          }
        } catch (error) {
          console.error('Failed to setup chain listener:', error)
        }
        return undefined
      }

      let cleanup: (() => void) | undefined
      setupChainListener().then(cleanupFn => {
        cleanup = cleanupFn
      })

      return () => {
        if (cleanup) cleanup()
      }
    }
  }, [wallet])

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
    isReady: authenticated && !!wallet && !!currentNetwork &&
             currentNetwork in SUPPORTED_NETWORKS &&
             SUPPORTED_NETWORKS[currentNetwork].usdcAddress !== '0x...' &&
             SUPPORTED_NETWORKS[currentNetwork].treasuryWallet !== '0x...',

    // Separate flag for when network is supported but balance unavailable due to RPC issues
    isNetworkSupported: !!currentNetwork && currentNetwork in SUPPORTED_NETWORKS,

    // Utils
    refreshBalance: () => {
      console.log('🔄 Manually refreshing USDC balance...')
      return getUSDCBalance().then(balance => {
        console.log(`🔄 Balance refresh result: ${balance}`)
        setUsdcBalance(balance)
        return balance
      })
    },
  }
}