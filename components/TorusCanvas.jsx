'use client'

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const TorusCanvas = () => {
  console.log('🌟 TorusCanvas is rendering!');

  return (
    <div
      className="torus-fade-in"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 999,
        background: 'red',
        pointerEvents: 'none',
        border: '5px solid lime'
      }}
    >
      <h1 style={{ color: 'white', fontSize: '50px', margin: '50px' }}>TORUS SHOULD BE HERE!</h1>
      <Canvas
        camera={{ position: [0, 0, 5] }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={1.0} />
        <mesh>
          <torusGeometry args={[2, 0.5, 16, 100]} />
          <meshStandardMaterial color="yellow" />
        </mesh>
      </Canvas>
    </div>
  );
};

export default TorusCanvas;