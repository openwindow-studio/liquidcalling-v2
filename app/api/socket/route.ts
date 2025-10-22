import { NextRequest } from 'next/server'

const connections = new Map<string, Set<any>>()

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const address = searchParams.get('address')

  if (!address) {
    return new Response('Missing address', { status: 400 })
  }

  // Server-Sent Events for real-time communication
  const encoder = new TextEncoder()
  let connection: any
  let heartbeatInterval: NodeJS.Timeout

  const stream = new ReadableStream({
    start(controller) {
      // Store connection in room
      if (!connections.has(address)) {
        connections.set(address, new Set())
      }

      connection = {
        controller,
        address,
        timestamp: Date.now(),
        id: Math.random().toString(36).substr(2, 9)
      }

      connections.get(address)!.add(connection)

      // Send connection confirmation
      const data = encoder.encode(`data: ${JSON.stringify({ type: 'connected', address })}\n\n`)
      controller.enqueue(data)

      // Send heartbeat to keep connection alive
      heartbeatInterval = setInterval(() => {
        try {
          const heartbeat = encoder.encode(`:heartbeat\n\n`)
          controller.enqueue(heartbeat)
        } catch (error) {
          // Connection closed, cleanup
          clearInterval(heartbeatInterval)
        }
      }, 30000) // Send heartbeat every 30 seconds
    },
    cancel() {
      // This is called when the client disconnects
      clearInterval(heartbeatInterval)
      const roomConnections = connections.get(address)
      if (roomConnections && connection) {
        roomConnections.delete(connection)
        if (roomConnections.size === 0) {
          connections.delete(address)
        }
      }
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, to, from, data } = body

    const roomConnections = connections.get(to)

    if (!roomConnections || roomConnections.size === 0) {
      return Response.json({ success: false, error: 'Room not found' })
    }

    // Send message to all connections in the room
    const encoder = new TextEncoder()
    const message = encoder.encode(`data: ${JSON.stringify({
      type,
      from,
      data,
      timestamp: Date.now()
    })}\n\n`)

    let delivered = 0
    Array.from(roomConnections).forEach(connection => {
      try {
        connection.controller.enqueue(message)
        delivered++
      } catch (error) {
        // Remove dead connection
        roomConnections.delete(connection)
      }
    })

    return Response.json({ success: true, delivered })
  } catch (error) {
    return Response.json({ success: false, error: 'Failed to send message' }, { status: 500 })
  }
}
