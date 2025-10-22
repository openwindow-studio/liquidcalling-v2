'use client'

import { useState, useRef, useCallback } from 'react'

interface UseWebRTCAudioReturn {
  isConnected: boolean
  isMuted: boolean
  error: string | null
  initializeAudio: () => Promise<void>
  createOffer: () => Promise<RTCSessionDescriptionInit | null>
  createAnswer: (offer: RTCSessionDescriptionInit) => Promise<RTCSessionDescriptionInit | null>
  handleAnswer: (answer: RTCSessionDescriptionInit) => Promise<void>
  handleIceCandidate: (candidate: RTCIceCandidateInit) => Promise<void>
  onIceCandidate: (callback: (candidate: RTCIceCandidate) => void) => void
  toggleMute: () => void
  endCall: () => void
}

export default function useWebRTCAudio(): UseWebRTCAudioReturn {
  const [isConnected, setIsConnected] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const peerConnection = useRef<RTCPeerConnection | null>(null)
  const localStream = useRef<MediaStream | null>(null)
  const iceCandidateCallback = useRef<((candidate: RTCIceCandidate) => void) | null>(null)

  const initializeAudio = useCallback(async () => {
    try {
      setError(null)

      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      })
      localStream.current = stream

      // Create peer connection
      peerConnection.current = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' }
        ]
      })

      // Add local stream tracks
      stream.getTracks().forEach(track => {
        peerConnection.current!.addTrack(track, stream)
      })

      // Handle ICE candidates
      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate && iceCandidateCallback.current) {
          iceCandidateCallback.current(event.candidate)
        }
      }

      // Handle remote stream
      peerConnection.current.ontrack = (event) => {
        const remoteAudio = new Audio()
        remoteAudio.srcObject = event.streams[0]
        remoteAudio.play().catch(console.error)
        setIsConnected(true)
      }

      // Handle connection state changes
      peerConnection.current.onconnectionstatechange = () => {
        const state = peerConnection.current?.connectionState
        console.log('Connection state:', state)

        if (state === 'connected') {
          setIsConnected(true)
        } else if (state === 'disconnected' || state === 'failed') {
          setIsConnected(false)
        }
      }

    } catch (err) {
      console.error('Failed to initialize audio:', err)
      setError('Failed to access microphone')
    }
  }, [])

  const createOffer = useCallback(async (): Promise<RTCSessionDescriptionInit | null> => {
    if (!peerConnection.current) {
      setError('Peer connection not initialized')
      return null
    }

    try {
      const offer = await peerConnection.current.createOffer()
      await peerConnection.current.setLocalDescription(offer)
      return offer
    } catch (err) {
      console.error('Failed to create offer:', err)
      setError('Failed to create call offer')
      return null
    }
  }, [])

  const createAnswer = useCallback(async (offer: RTCSessionDescriptionInit): Promise<RTCSessionDescriptionInit | null> => {
    if (!peerConnection.current) {
      setError('Peer connection not initialized')
      return null
    }

    try {
      await peerConnection.current.setRemoteDescription(offer)
      const answer = await peerConnection.current.createAnswer()
      await peerConnection.current.setLocalDescription(answer)
      return answer
    } catch (err) {
      console.error('Failed to create answer:', err)
      setError('Failed to answer call')
      return null
    }
  }, [])

  const handleAnswer = useCallback(async (answer: RTCSessionDescriptionInit): Promise<void> => {
    if (!peerConnection.current) {
      setError('Peer connection not initialized')
      return
    }

    try {
      await peerConnection.current.setRemoteDescription(answer)
    } catch (err) {
      console.error('Failed to handle answer:', err)
      setError('Failed to process call answer')
    }
  }, [])

  const handleIceCandidate = useCallback(async (candidate: RTCIceCandidateInit): Promise<void> => {
    if (!peerConnection.current) {
      return
    }

    try {
      await peerConnection.current.addIceCandidate(candidate)
    } catch (err) {
      console.error('Failed to add ICE candidate:', err)
    }
  }, [])

  const onIceCandidate = useCallback((callback: (candidate: RTCIceCandidate) => void) => {
    iceCandidateCallback.current = callback
  }, [])

  const toggleMute = useCallback(() => {
    if (localStream.current) {
      const audioTrack = localStream.current.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled
        setIsMuted(!audioTrack.enabled)
      }
    }
  }, [])

  const endCall = useCallback(() => {
    // Close peer connection
    if (peerConnection.current) {
      peerConnection.current.close()
      peerConnection.current = null
    }

    // Stop local stream
    if (localStream.current) {
      localStream.current.getTracks().forEach(track => track.stop())
      localStream.current = null
    }

    // Reset state
    setIsConnected(false)
    setIsMuted(false)
    setError(null)
    iceCandidateCallback.current = null
  }, [])

  return {
    isConnected,
    isMuted,
    error,
    initializeAudio,
    createOffer,
    createAnswer,
    handleAnswer,
    handleIceCandidate,
    onIceCandidate,
    toggleMute,
    endCall
  }
}