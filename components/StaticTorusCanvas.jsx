'use client'

import { Canvas } from "@react-three/fiber";
import StaticTorusGeometries from "./StaticTorusBackground";

const StaticTorusCanvas = () => {
  return (
    <div className="torus-fade-in" style={{
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
        <StaticTorusGeometries />
        {/* No OrbitControls - completely static */}
      </Canvas>
    </div>
  );
};

export default StaticTorusCanvas;