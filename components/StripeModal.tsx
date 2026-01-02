'use client'

import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : Promise.resolve(null)

type StripeModalProps = {
  isOpen: boolean
  onClose: () => void
  amount: string
  onSuccess: () => void
  onError: (error: string) => void
}

function CheckoutForm({ amount, onSuccess, onError, onClose }: Omit<StripeModalProps, 'isOpen'>) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)

    try {
      // Create payment intent
      const response = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseFloat(amount) })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment intent')
      }

      const cardElement = elements.getElement(CardElement)
      if (!cardElement) {
        throw new Error('Card element not found')
      }

      // Confirm payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
        }
      })

      if (error) {
        throw error
      }

      if (paymentIntent?.status === 'succeeded') {
        onSuccess()
        onClose()
      } else {
        throw new Error('Payment was not successful')
      }

    } catch (error: any) {
      console.error('Stripe payment failed:', error)
      onError(error.message || 'Payment failed')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="stripe-form">
      <div className="stripe-card-container">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
                fontFamily: 'Britti Sans Trial, sans-serif',
                iconColor: '#666ee8',
              },
              invalid: {
                color: '#9e2146',
              },
            },
            hidePostalCode: false,
          }}
        />
      </div>

      <div className="stripe-form-buttons">
        <button
          type="button"
          onClick={onClose}
          disabled={isProcessing}
          className="stripe-button stripe-button-cancel"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="stripe-button stripe-button-pay"
        >
          {isProcessing ? 'Processing...' : `Pay $${amount}`}
        </button>
      </div>
    </form>
  )
}

export function StripeModal({ isOpen, onClose, amount, onSuccess, onError }: StripeModalProps) {
  if (!isOpen) return null

  return (
    <div className="stripe-modal-overlay" onClick={onClose}>
      <div className="stripe-modal" onClick={(e) => e.stopPropagation()}>
        <div className="stripe-modal-header">
          <h3>Pay with Credit Card</h3>
          <button
            className="stripe-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="stripe-modal-content">
          <div className="stripe-amount-display">
            <span className="stripe-amount-label">Total:</span>
            <span className="stripe-amount-value">${amount} USD</span>
          </div>

          <div className="stripe-minutes-display">
            {Math.floor(parseFloat(amount) * 20)} calling minutes
          </div>

          {process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? (
            <Elements stripe={stripePromise}>
              <CheckoutForm
                amount={amount}
                onSuccess={onSuccess}
                onError={onError}
                onClose={onClose}
              />
            </Elements>
          ) : (
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <p>Stripe is not configured. Please set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}