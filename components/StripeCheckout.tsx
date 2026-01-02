'use client'

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : Promise.resolve(null)

type StripeCheckoutProps = {
  amount: string
  onSuccess: () => void
  onError: (error: string) => void
}

export function StripeCheckout({ amount, onSuccess, onError }: StripeCheckoutProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handleStripePayment = async () => {
    try {
      setIsProcessing(true)

      // Create payment intent
      const response = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseFloat(amount) })
      })

      const { clientSecret } = await response.json()

      if (!clientSecret) {
        throw new Error('Failed to create payment intent')
      }

      const stripe = await stripePromise
      if (!stripe) {
        throw new Error('Stripe failed to load')
      }

      // Note: redirectToCheckout is deprecated in newer Stripe versions
      // This component is kept for reference but not currently used
      throw new Error('StripeCheckout component is deprecated - use checkout sessions instead')

    } catch (error: any) {
      console.error('Stripe payment failed:', error)
      onError(error.message || 'Payment failed')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <button
      onClick={handleStripePayment}
      disabled={isProcessing}
      style={{
        padding: '6px 16px',
        backgroundColor: 'rgba(249, 255, 250, 0.47)',
        border: '2px solid rgba(209, 209, 209, 0.69)',
        borderRadius: '10px',
        cursor: 'pointer',
        opacity: isProcessing ? 0.6 : 1,
        fontSize: '14px',
        fontWeight: '400',
        whiteSpace: 'nowrap',
        fontFamily: 'Britti Sans Trial, sans-serif'
      }}
    >
      <span style={{
        color: 'rgba(0, 0, 0, 0.8)',
        mixBlendMode: 'color-burn',
        position: 'relative',
        zIndex: 10
      }}>
        {isProcessing ? 'Processing...' : `Pay $${amount} with Card`}
      </span>
    </button>
  )
}