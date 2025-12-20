'use client'

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState, useEffect } from 'react';
import TorusGeometries from "./TorusBackground";

const TorusCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Update torus container height to match full document height
    const updateHeight = () => {
      const torusContainer = document.querySelector('.torus-fade-in');
      if (torusContainer) {
        const docHeight = Math.max(
          document.body.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.clientHeight,
          document.documentElement.scrollHeight,
          document.documentElement.offsetHeight
        );
        torusContainer.style.height = `${docHeight}px`;
      }
    };
    
    // Initial update with a small delay to ensure DOM is ready
    setTimeout(updateHeight, 100);
    
    // Update on resize
    window.addEventListener('resize', updateHeight);
    
    // Watch for DOM changes that might affect height (debounced)
    let timeoutId;
    const debouncedUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateHeight, 150);
    };
    
    const observer = new MutationObserver(debouncedUpdate);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true
    });
    
    return () => {
      window.removeEventListener('resize', updateHeight);
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="torus-fade-in" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      minHeight: '100%',
      zIndex: -1,
      background: 'linear-gradient(0deg, #F1F1F5, #F1F1F5)',
      pointerEvents: 'none',
      overflow: 'visible',
      willChange: 'height'
    }}>
      <Canvas
        camera={{ position: [4, -2, 7] }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}
      >
        <ambientLight intensity={1.0} />
        <TorusGeometries />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={!isMobile}
          enableDamping={true}
          dampingFactor={0.05}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default TorusCanvas;