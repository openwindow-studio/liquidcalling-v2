import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const dailyApiKey = process.env.DAILY_API_KEY

    if (!dailyApiKey) {
      // For development/demo - create a mock room URL
      const roomId = Math.random().toString(36).substring(2, 15)
      const roomUrl = `https://immaterial.daily.co/${roomId}`

      return Response.json({
        success: true,
        roomUrl,
        roomId,
        message: 'Demo room created (add DAILY_API_KEY for production)'
      })
    }

    // Production: Create real Daily.co room
    const roomConfig = {
      properties: {
        max_participants: 2, // Only host + 1 recipient for voice calls
        enable_chat: false,
        enable_screenshare: false,
        start_video_off: true, // Audio only
        start_audio_off: false,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 24 hour expiry
      }
    }

    const response = await fetch('https://api.daily.co/v1/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${dailyApiKey}`
      },
      body: JSON.stringify(roomConfig)
    })

    const room = await response.json()

    if (!response.ok) {
      throw new Error(room.error || 'Failed to create room')
    }

    return Response.json({
      success: true,
      roomUrl: room.url,
      roomId: room.name,
      message: 'Production room created'
    })

  } catch (error) {
    console.error('Failed to create Daily room:', error)
    return Response.json({
      success: false,
      error: 'Failed to create room'
    }, { status: 500 })
  }
}