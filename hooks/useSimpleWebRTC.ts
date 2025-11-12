'use client'

import { useState, useRef, useCallback } from 'react'

interface UseSimpleWebRTCReturn {
  localStream: MediaStream | null
  remoteStream: MediaStream | null
  isConnected: boolean
  isMuted: boolean
  error: string | null
  localAudioLevel: number
  remoteAudioLevel: number
  startCall: () => Promise<RTCSessionDescriptionInit | null>
  answerCall: (offer: RTCSessionDescriptionInit) => Promise<RTCSessionDescriptionInit>
  connectAnswer: (answer: RTCSessionDescriptionInit) => Promise<void>
  endCall: () => void
  toggleMute: () => void
}

export default function useSimpleWebRTC(): UseSimpleWebRTCReturn {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [localAudioLevel, setLocalAudioLevel] = useState(0)
  const [remoteAudioLevel, setRemoteAudioLevel] = useState(0)

  const peerConnection = useRef<RTCPeerConnection | null>(null)
  const localAudioContext = useRef<AudioContext | null>(null)
  const remoteAudioContext = useRef<AudioContext | null>(null)
  const localAnalyser = useRef<AnalyserNode | null>(null)
  const remoteAnalyser = useRef<AnalyserNode | null>(null)
  const remoteAudioElement = useRef<HTMLAudioElement | null>(null)

  const setupLocalAudioAnalysis = useCallback((stream: MediaStream) => {
    try {
      localAudioContext.current = new AudioContext()
      const source = localAudioContext.current.createMediaStreamSource(stream)
      localAnalyser.current = localAudioContext.current.createAnalyser()
      localAnalyser.current.fftSize = 256
      source.connect(localAnalyser.current)

      const updateLocalLevel = () => {
        if (localAnalyser.current) {
          const dataArray = new Uint8Array(localAnalyser.current.frequencyBinCount)
          localAnalyser.current.getByteFrequencyData(dataArray)
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length
          const level = Math.floor((average / 255) * 10)
          setLocalAudioLevel(level)
        }
        requestAnimationFrame(updateLocalLevel)
      }
      updateLocalLevel()
    } catch (error) {
      console.error('Error setting up local audio analysis:', error)
    }
  }, [])

  const setupRemoteAudioAnalysis = useCallback((stream: MediaStream) => {
    try {
      remoteAudioContext.current = new AudioContext()
      const source = remoteAudioContext.current.createMediaStreamSource(stream)
      remoteAnalyser.current = remoteAudioContext.current.createAnalyser()
      remoteAnalyser.current.fftSize = 256
      source.connect(remoteAnalyser.current)

      const updateRemoteLevel = () => {
        if (remoteAnalyser.current) {
          const dataArray = new Uint8Array(remoteAnalyser.current.frequencyBinCount)
          remoteAnalyser.current.getByteFrequencyData(dataArray)
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length
          const level = Math.floor((average / 255) * 10)
          setRemoteAudioLevel(level)
        }
        requestAnimationFrame(updateRemoteLevel)
      }
      updateRemoteLevel()
    } catch (error) {
      console.error('Error setting up remote audio analysis:', error)
    }
  }, [])

  const createPeerConnection = useCallback(() => {
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
      ]
    })

    pc.oniceconnectionstatechange = () => {
      console.log('ICE connection state:', pc.iceConnectionState)
      if (pc.iceConnectionState === 'connected' || pc.iceConnectionState === 'completed') {
        setIsConnected(true)
      } else if (pc.iceConnectionState === 'disconnected' || pc.iceConnectionState === 'failed') {
        setIsConnected(false)
      }
    }

    pc.ontrack = (event) => {
      console.log('Received remote stream')
      const stream = event.streams[0]
      setRemoteStream(stream)

      // Create audio element and play remote stream
      if (!remoteAudioElement.current) {
        remoteAudioElement.current = new Audio()
        remoteAudioElement.current.autoplay = true
      }
      remoteAudioElement.current.srcObject = stream
      remoteAudioElement.current.play().catch(console.error)

      // Set up remote audio analysis
      setupRemoteAudioAnalysis(stream)
    }

    peerConnection.current = pc
    return pc
  }, [setupRemoteAudioAnalysis])

  const startCall = useCallback(async (): Promise<RTCSessionDescriptionInit | null> => {
    try {
      setError(null)

      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      setLocalStream(stream)
      console.log('Got local stream')

      // Set up local audio analysis
      setupLocalAudioAnalysis(stream)

      // Create peer connection
      const pc = createPeerConnection()

      // Add local stream to peer connection
      stream.getTracks().forEach(track => {
        pc.addTrack(track, stream)
      })

      // Create offer
      const offer = await pc.createOffer()
      await pc.setLocalDescription(offer)

      console.log('Created offer:', offer)
      return offer

    } catch (err) {
      console.error('Error starting call:', err)
      setError(err instanceof Error ? err.message : 'Failed to start call')
      return null
    }
  }, [createPeerConnection, setupLocalAudioAnalysis])

  const answerCall = useCallback(async (offer: RTCSessionDescriptionInit): Promise<RTCSessionDescriptionInit> => {
    try {
      setError(null)

      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      setLocalStream(stream)
      console.log('Got local stream for answer')

      // Set up local audio analysis
      setupLocalAudioAnalysis(stream)

      // Create peer connection
      const pc = createPeerConnection()

      // Add local stream to peer connection
      stream.getTracks().forEach(track => {
        pc.addTrack(track, stream)
      })

      // Set remote description (the offer)
      await pc.setRemoteDescription(offer)

      // Create answer
      const answer = await pc.createAnswer()
      await pc.setLocalDescription(answer)

      console.log('Created answer:', answer)
      return answer

    } catch (err) {
      console.error('Error answering call:', err)
      setError(err instanceof Error ? err.message : 'Failed to answer call')
      throw err
    }
  }, [createPeerConnection, setupLocalAudioAnalysis])

  const connectAnswer = useCallback(async (answer: RTCSessionDescriptionInit) => {
    try {
      if (!peerConnection.current) {
        throw new Error('No peer connection')
      }

      await peerConnection.current.setRemoteDescription(answer)
      console.log('Set remote description (answer)')

    } catch (err) {
      console.error('Error connecting answer:', err)
      setError(err instanceof Error ? err.message : 'Failed to connect answer')
    }
  }, [])

  const endCall = useCallback(() => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop())
      setLocalStream(null)
    }

    if (remoteAudioElement.current) {
      remoteAudioElement.current.pause()
      remoteAudioElement.current.srcObject = null
    }

    if (localAudioContext.current) {
      localAudioContext.current.close()
      localAudioContext.current = null
    }

    if (remoteAudioContext.current) {
      remoteAudioContext.current.close()
      remoteAudioContext.current = null
    }

    if (peerConnection.current) {
      peerConnection.current.close()
      peerConnection.current = null
    }

    setRemoteStream(null)
    setIsConnected(false)
    setError(null)
    setLocalAudioLevel(0)
    setRemoteAudioLevel(0)
    console.log('Call ended')
  }, [localStream])

  const toggleMute = useCallback(() => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled
        setIsMuted(!audioTrack.enabled)
        console.log('Muted:', !audioTrack.enabled)
      }
    }
  }, [localStream])

  return {
    localStream,
    remoteStream,
    isConnected,
    isMuted,
    error,
    localAudioLevel,
    remoteAudioLevel,
    startCall,
    answerCall,
    connectAnswer,
    endCall,
    toggleMute
  }
}