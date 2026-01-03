'use client'

import { Canvas } from "@react-three/fiber";

function SimpleTorus() {
  return (
    <mesh>
      <torusGeometry args={[3, 1, 16, 100]} />
      <meshBasicMaterial color="#ff6b6b" wireframe={true} />
    </mesh>
  )
}

const SimpleTorusCanvas = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      zIndex: 0,
      background: 'linear-gradient(0deg, #F1F1F5, #F1F1F5)',
      pointerEvents: 'none'
    }}>
      <Canvas
        camera={{ position: [4, -2, 7] }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <ambientLight intensity={1.0} />
        <SimpleTorus />
      </Canvas>
    </div>
  );
};

export default SimpleTorusCanvas;