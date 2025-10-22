import { NextRequest } from 'next/server'

// Simple in-memory storage for WebRTC signaling
const rooms = new Map<string, {
  offer?: RTCSessionDescriptionInit
  answer?: RTCSessionDescriptionInit
  participants: string[]
}>()

export async function POST(request: NextRequest) {
  try {
    const { action, roomId, data, participantId } = await request.json()

    if (!rooms.has(roomId)) {
      rooms.set(roomId, { participants: [] })
    }

    const room = rooms.get(roomId)!

    switch (action) {
      case 'join':
        if (!room.participants.includes(participantId)) {
          room.participants.push(participantId)
        }
        return Response.json({
          success: true,
          participantCount: room.participants.length,
          offer: room.offer
        })

      case 'offer':
        room.offer = data
        return Response.json({ success: true })

      case 'answer':
        room.answer = data
        return Response.json({ success: true })

      case 'get-answer':
        return Response.json({
          success: true,
          answer: room.answer
        })

      case 'leave':
        room.participants = room.participants.filter(id => id !== participantId)
        if (room.participants.length === 0) {
          rooms.delete(roomId)
        }
        return Response.json({ success: true })

      default:
        return Response.json({ success: false, error: 'Unknown action' }, { status: 400 })
    }

  } catch (error) {
    console.error('Signaling error:', error)
    return Response.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const roomId = url.searchParams.get('roomId')

  if (!roomId) {
    return Response.json({ success: false, error: 'Room ID required' }, { status: 400 })
  }

  const room = rooms.get(roomId)
  return Response.json({
    success: true,
    exists: !!room,
    participantCount: room?.participants.length || 0
  })
}