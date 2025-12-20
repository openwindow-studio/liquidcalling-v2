import { NextRequest } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-10-29.clover',
})

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json()

    if (!amount || amount < 1) {
      return Response.json({
        error: 'Invalid amount'
      }, { status: 400 })
    }

    // Create payment intent for Stripe Elements
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        product: 'liquidcalling_minutes',
        minutes: Math.floor(amount * 20), // $0.05 per minute = 20 minutes per dollar
      }
    })

    return Response.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    })

  } catch (error: any) {
    console.error('Stripe payment intent creation failed:', error)
    return Response.json({
      error: 'Failed to create payment intent'
    }, { status: 500 })
  }
}