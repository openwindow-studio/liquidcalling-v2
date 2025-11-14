'use client'

import { useState, useEffect } from 'react'
import { usePrivy, useWallets } from '@privy-io/react-auth'
import { useRealPayments } from './useRealPayments'

export function useMinutesBalance() {
  const { authenticated, user, sendTransaction } = usePrivy()
  const { wallets } = useWallets()
  const {
    payWithUSDC,
    switchToNetwork,
    currentNetwork,
    usdcBalance,
    supportedNetworks,
    isReady: cryptoReady,
    refreshBalance
  } = useRealPayments()

  const [minutesBalance, setMinutesBalance] = useState(0)
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [purchaseError, setPurchaseError] = useState<Error | null>(null)

  // Load balance from localStorage on mount
  useEffect(() => {
    if (authenticated && user?.wallet?.address) {
      const stored = localStorage.getItem(`minutes_${user.wallet.address}`)
      if (stored) {
        setMinutesBalance(parseInt(stored, 10))
      } else {
        // Give new users 5 free minutes to test
        setMinutesBalance(5)
        localStorage.setItem(`minutes_${user.wallet.address}`, '5')
      }
    }
  }, [authenticated, user?.wallet?.address])

  // Save balance to localStorage whenever it changes
  const saveBalance = (newBalance: number) => {
    if (user?.wallet?.address) {
      localStorage.setItem(`minutes_${user.wallet.address}`, newBalance.toString())
      setMinutesBalance(newBalance)
    }
  }

  const buyMinutes = async (dollarsToSpend: string, paymentMethod?: string) => {
    if (!authenticated || !user?.wallet?.address) {
      setPurchaseError(new Error('Please connect your wallet first'))
      return
    }

    // Skip network validation for testing - allow all networks
    console.log('Skipping network validation for testing purposes')

    setIsPurchasing(true)
    setPurchaseError(null)

    try {
      // Calculate minutes (20 minutes per dollar at $0.05/minute)
      const dollarsNum = parseFloat(dollarsToSpend)
      const minutesToAdd = Math.floor(dollarsNum * 20) // $1 = 20 minutes

      // Use real Privy wallet transactions on testnet for testing
      const selectedMethod = paymentMethod || 'wallet'
      console.log(`Processing payment: $${dollarsToSpend} via ${selectedMethod}`)

      if (selectedMethod === 'wallet' && cryptoReady) {
        // Real USDC payment
        console.log(`Processing real USDC payment: $${dollarsToSpend}`)
        const result = await payWithUSDC(dollarsToSpend)

        if (!result) {
          throw new Error('USDC payment failed')
        }

        console.log(`✅ Real USDC payment successful on ${result.network}:`, result.hash)

        // Store transaction hash for verification
        const paymentHistory = JSON.parse(localStorage.getItem(`payments_${user.wallet.address}`) || '[]')
        paymentHistory.push({
          amount: dollarsToSpend,
          minutes: minutesToAdd,
          method: 'USDC',
          network: result.network,
          timestamp: new Date().toISOString(),
          txHash: result.hash
        })
        localStorage.setItem(`payments_${user.wallet.address}`, JSON.stringify(paymentHistory))

        // Refresh USDC balance
        refreshBalance()

      } else if (selectedMethod === 'wallet') {
        // Fallback to simulation if crypto not ready
        console.log('Crypto not ready, simulating wallet payment...')
        await new Promise(resolve => setTimeout(resolve, 1500))
        console.log('✅ Wallet payment simulation complete')
      } else {
        // For non-wallet methods, use simulation for now
        console.log(`Simulating ${selectedMethod} payment...`)
        const delay = selectedMethod === 'apple' ? 1000 : selectedMethod === 'google' ? 1200 : 1500
        await new Promise(resolve => setTimeout(resolve, delay))
        console.log(`✅ ${selectedMethod} payment simulation complete`)
      }

      // Add minutes to balance
      const newBalance = minutesBalance + minutesToAdd
      saveBalance(newBalance)

      console.log(`🎉 Successfully purchased ${minutesToAdd} minutes for $${dollarsToSpend} via ${selectedMethod}`)

      // Store payment history in localStorage for testing
      const paymentHistory = JSON.parse(localStorage.getItem(`payments_${user.wallet.address}`) || '[]')
      paymentHistory.push({
        amount: dollarsToSpend,
        minutes: minutesToAdd,
        method: selectedMethod,
        timestamp: new Date().toISOString(),
        txId: `sim_${Date.now()}_${selectedMethod}`
      })
      localStorage.setItem(`payments_${user.wallet.address}`, JSON.stringify(paymentHistory))

    } catch (error: any) {
      console.error('Purchase failed:', error)
      setPurchaseError(error)
    } finally {
      setIsPurchasing(false)
    }
  }

  const deductMinutes = (minutesToDeduct: number) => {
    if (minutesBalance >= minutesToDeduct) {
      const newBalance = minutesBalance - minutesToDeduct
      saveBalance(newBalance)
      return true
    }
    return false
  }

  const calculateMinutesFromDollars = (dollars: string): number => {
    const dollarsNum = parseFloat(dollars)
    return Math.floor(dollarsNum * 20) // $0.05 per minute = 20 minutes per dollar
  }

  const getPaymentHistory = () => {
    if (!user?.wallet?.address) return []
    const history = localStorage.getItem(`payments_${user.wallet.address}`)
    return history ? JSON.parse(history) : []
  }

  const clearPaymentHistory = () => {
    if (user?.wallet?.address) {
      localStorage.removeItem(`payments_${user.wallet.address}`)
      console.log('Payment history cleared for testing')
    }
  }

  const resetBalanceForTesting = () => {
    if (user?.wallet?.address) {
      localStorage.removeItem(`minutes_${user.wallet.address}`)
      setMinutesBalance(0)
      console.log('Balance reset to 0 for testing')
    }
  }

  return {
    minutesBalance,
    buyMinutes,
    deductMinutes,
    isPurchasing,
    purchaseError,
    calculateMinutesFromDollars,
    getPaymentHistory,
    clearPaymentHistory,
    resetBalanceForTesting,
    isReady: authenticated, // Ready when user is authenticated

    // Crypto payment info
    currentNetwork,
    usdcBalance,
    supportedNetworks,
    switchToNetwork,
    cryptoReady,
  }
}