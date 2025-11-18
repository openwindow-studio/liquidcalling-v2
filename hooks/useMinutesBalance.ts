'use client'

import { useState, useEffect } from 'react'
import { usePrivy, useWallets, useFundWallet } from '@privy-io/react-auth'

interface UseMinutesBalanceProps {
  realPaymentFunction?: (amount: string) => Promise<any>
}

export function useMinutesBalance(props?: UseMinutesBalanceProps) {
  const { authenticated, user, sendTransaction } = usePrivy()
  const { wallets } = useWallets()
  const { fundWallet } = useFundWallet()

  const [minutesBalance, setMinutesBalance] = useState(0)
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [purchaseError, setPurchaseError] = useState<Error | null>(null)

  // Load balance from localStorage on mount and when storage changes
  const loadBalance = () => {
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
  }

  useEffect(() => {
    loadBalance()
  }, [authenticated, user?.wallet?.address])

  // Listen for storage changes to update balance in real-time
  useEffect(() => {
    const handleStorageChange = () => {
      console.log('🔄 Minutes balance update event triggered')
      if (authenticated && user?.wallet?.address) {
        const stored = localStorage.getItem(`minutes_${user.wallet.address}`)
        if (stored) {
          const newBalance = parseInt(stored, 10)
          console.log(`📊 Updating minutes balance: ${minutesBalance} → ${newBalance}`)
          setMinutesBalance(newBalance)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    // Also listen for custom events from the same tab
    window.addEventListener('minutes-updated', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('minutes-updated', handleStorageChange)
    }
  }, [authenticated, user?.wallet?.address, minutesBalance])

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

    setIsPurchasing(true)
    setPurchaseError(null)

    try {
      // Calculate minutes (20 minutes per dollar at $0.05/minute)
      const dollarsNum = parseFloat(dollarsToSpend)
      const minutesToAdd = Math.floor(dollarsNum * 20) // $1 = 20 minutes

      const selectedMethod = paymentMethod || 'wallet'
      console.log(`Processing payment: $${dollarsToSpend} via ${selectedMethod}`)

      if (selectedMethod === 'wallet' && props?.realPaymentFunction) {
        // Use real USDC payment
        console.log('Processing real USDC payment...')
        const paymentResult = await props.realPaymentFunction(dollarsToSpend)

        if (!paymentResult) {
          throw new Error('Payment failed - no transaction hash received')
        }

        console.log(`✅ Real USDC payment successful:`, paymentResult)
      } else if (selectedMethod === 'privy') {
        // Use Privy's fund wallet for credit card payments
        console.log('Processing credit card payment via Privy...')

        try {
          // Get user's wallet address
          const walletAddress = user?.wallet?.address
          if (!walletAddress) {
            throw new Error('No wallet address found')
          }

          // Open Privy's funding modal with MoonPay for credit card payment
          // The user will complete payment in the modal, then we check if successful
          const result = await fundWallet({
            address: walletAddress,
            options: {
              // MoonPay options for credit card payment
              quoteCurrencyAmount: parseFloat(dollarsToSpend),
              paymentMethod: 'credit_debit_card'
            }
          })

          if (result) {
            console.log(`✅ Credit card payment successful via Privy/MoonPay`)
          } else {
            throw new Error('Credit card payment was cancelled or failed')
          }
        } catch (error: any) {
          console.error('Credit card payment failed:', error)
          throw new Error(`Credit card payment failed: ${error.message}`)
        }
      } else {
        // For other methods, use simulation
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
  }
}