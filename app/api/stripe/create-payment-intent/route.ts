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

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'LiquidCalling Minutes',
              description: `${Math.floor(amount * 20)} minutes of calling time`,
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.nextUrl.origin}/?payment=success`,
      cancel_url: `${request.nextUrl.origin}/?payment=cancelled`,
      metadata: {
        product: 'liquidcalling_minutes',
        minutes: Math.floor(amount * 20).toString(), // $0.05 per minute = 20 minutes per dollar
        amount: amount.toString(),
      }
    })

    return Response.json({
      sessionId: session.id,
      url: session.url
    })

  } catch (error: any) {
    console.error('Stripe checkout session creation failed:', error)
    return Response.json({
      error: 'Failed to create checkout session'
    }, { status: 500 })
  }
}