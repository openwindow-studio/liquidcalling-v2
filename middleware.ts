import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory rate limiting (for MVP - use Redis/Upstash in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

// Rate limit configurations
const RATE_LIMITS = {
  '/api/verify-payments': { requests: 10, windowMs: 60000 }, // 10 requests per minute
  '/api/validate-minutes': { requests: 20, windowMs: 60000 }, // 20 requests per minute
  '/api/call-session': { requests: 30, windowMs: 60000 }, // 30 requests per minute
  '/api/daily/create-room': { requests: 5, windowMs: 60000 }, // 5 rooms per minute
  '/api/stripe/create-payment-intent': { requests: 10, windowMs: 60000 } // 10 payments per minute
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Only apply rate limiting to API routes
  if (!pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // Get rate limit config for this endpoint
  const rateLimitConfig = Object.entries(RATE_LIMITS).find(([path]) =>
    pathname.startsWith(path)
  )?.[1]

  if (!rateLimitConfig) {
    // No rate limit configured for this endpoint
    return NextResponse.next()
  }

  // Generate key from IP and user agent (simple fingerprinting)
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
  const userAgent = request.headers.get('user-agent') || 'unknown'
  const key = `${ip}:${userAgent.slice(0, 50)}:${pathname}`

  const now = Date.now()
  const windowMs = rateLimitConfig.windowMs
  const maxRequests = rateLimitConfig.requests

  // Clean up expired entries periodically
  if (Math.random() < 0.01) { // 1% chance to cleanup on each request
    const entries = Array.from(rateLimitMap.entries())
    for (const [k, v] of entries) {
      if (now > v.resetTime) {
        rateLimitMap.delete(k)
      }
    }
  }

  // Get current rate limit state
  const current = rateLimitMap.get(key)

  if (!current || now > current.resetTime) {
    // First request in window or window expired
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + windowMs
    })
    return NextResponse.next()
  }

  if (current.count >= maxRequests) {
    // Rate limit exceeded
    console.warn(`🚨 Rate limit exceeded for ${pathname}: ${key}`)

    return Response.json({
      error: 'Rate limit exceeded',
      message: `Too many requests. Limit: ${maxRequests} per ${windowMs/1000}s`,
      retryAfter: Math.ceil((current.resetTime - now) / 1000)
    }, {
      status: 429,
      headers: {
        'Retry-After': Math.ceil((current.resetTime - now) / 1000).toString(),
        'X-RateLimit-Limit': maxRequests.toString(),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': current.resetTime.toString()
      }
    })
  }

  // Increment counter
  current.count += 1
  rateLimitMap.set(key, current)

  // Add rate limit headers to response
  const response = NextResponse.next()
  response.headers.set('X-RateLimit-Limit', maxRequests.toString())
  response.headers.set('X-RateLimit-Remaining', (maxRequests - current.count).toString())
  response.headers.set('X-RateLimit-Reset', current.resetTime.toString())

  return response
}

export const config = {
  matcher: [
    '/api/:path*'
  ]
}