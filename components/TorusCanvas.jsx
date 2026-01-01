'use client'

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import TorusGeometries from "./TorusBackground";

const TorusCanvas = () => {
  return (
    <div className="torus-fade-in torus-canvas-container" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
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
        <TorusGeometries />
        {/* <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          enableDamping={true}
          dampingFactor={0.05}
          rotateSpeed={0.5}
        /> */}
      </Canvas>
    </div>
  );
};

export default TorusCanvas;