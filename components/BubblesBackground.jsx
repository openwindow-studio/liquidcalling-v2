'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from '@react-three/drei'
import { Canvas, useFrame, extend } from '@react-three/fiber'

// Extend Three.js with MarchingCubes
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes.js'
extend({ MarchingCubes })

const sceneMiddle = new THREE.Vector3(0, 0, 0)
const metaOffset = new THREE.Vector3(0.5, 0.5, 0.5)
const colorPalette = [0x0067b1, 0x4e99ce, 0x9bcbeb, 0x55d7e2, 0xffffff, 0x9ca9b2, 0x4e6676, 0xf69230, 0xf5d81f]

class Body {
  constructor() {
    this.size = 0.15 + Math.random() * 0.1
    this.range = 8
    this.position = new THREE.Vector3(
      Math.random() * this.range - this.range * 0.5,
      Math.random() * this.range - this.range * 0.5 + 3,
      Math.random() * this.range - this.range * 0.5
    )
    this.velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 0.02,
      (Math.random() - 0.5) * 0.02,
      (Math.random() - 0.5) * 0.02
    )
    this.color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
  }

  update() {
    // Simple physics simulation
    const dir = this.position.clone().sub(sceneMiddle).normalize()
    this.velocity.add(dir.multiplyScalar(-0.001))
    this.velocity.multiplyScalar(0.99) // damping
    this.position.add(this.velocity)

    // Return position for metaballs
    const pos = this.position.clone().multiplyScalar(0.1).add(metaOffset)
    return { x: pos.x, y: pos.y, z: pos.z }
  }
}

class MouseBall {
  constructor() {
    this.position = new THREE.Vector3(0, 0, 0)
  }

  update(mousePos) {
    this.position.copy(mousePos)
  }
}

const BubblesScene = () => {
  const metaballsRef = useRef()
  const bodiesRef = useRef([])
  const mouseBallRef = useRef(new MouseBall())
  const mousePositionRef = useRef(new THREE.Vector3(0, 0, 0))

  // Initialize bodies
  useEffect(() => {
    const bodies = []
    const numBodies = 120
    for (let i = 0; i < numBodies; i++) {
      bodies.push(new Body())
    }
    bodiesRef.current = bodies
  }, [])

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1
      mousePositionRef.current.set(x * 5, y * 5, 0)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(() => {
    if (metaballsRef.current) {
      metaballsRef.current.reset()
      const strength = 0.5
      const subtract = 10

      // Update and add bodies to metaballs
      bodiesRef.current.forEach((body) => {
        const { x, y, z } = body.update()
        metaballsRef.current.addBall(x, y, z, strength, subtract, body.color)
      })

      // Update mouse ball
      mouseBallRef.current.update(mousePositionRef.current)

      metaballsRef.current.update()
    }
  })

  return (
    <>
      <hemisphereLight args={[0x00bbff, 0xaa00ff]} intensity={0.2} />

      <marchingCubes
        ref={metaballsRef}
        args={[96, undefined, true, true, 90000]}
        scale={[5, 5, 5]}
        isolation={1000}
      >
        <meshPhysicalMaterial
          transmission={1.0}
          thickness={0.5}
          roughness={0.0}
          metalness={0.0}
          transparent={true}
          opacity={0.3}
          ior={1.45}
          clearcoat={1.0}
          clearcoatRoughness={0.0}
        />
      </marchingCubes>
    </>
  )
}

const BubblesBackground = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      zIndex: 0,
      background: 'linear-gradient(0deg, #F1F1F5, #F1F1F5)',
      pointerEvents: 'auto'
    }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
        gl={{
          alpha: true,
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <BubblesScene />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          enableDamping={true}
          dampingFactor={0.05}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}

export default BubblesBackground