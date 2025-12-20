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
        // More robust height calculation for production
        const body = document.body;
        const html = document.documentElement;
        
        const docHeight = Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight,
          window.innerHeight
        );
        
        // Add extra padding to ensure it covers everything
        const finalHeight = Math.max(docHeight, window.innerHeight * 1.5);
        torusContainer.style.height = `${finalHeight}px`;
      }
    };
    
    // Multiple attempts to ensure it works in production (SSR/hydration timing)
    const attemptUpdate = (attempt = 0) => {
      if (attempt < 5) {
        updateHeight();
        setTimeout(() => attemptUpdate(attempt + 1), 200 * (attempt + 1));
      }
    };
    
    // Start updates after a short delay
    setTimeout(() => {
      attemptUpdate();
    }, 100);
    
    // Update on resize
    const handleResize = () => {
      updateHeight();
    };
    window.addEventListener('resize', handleResize);
    
    // Watch for DOM changes that might affect height (debounced)
    let timeoutId;
    const debouncedUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateHeight, 150);
    };
    
    const observer = new MutationObserver(debouncedUpdate);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });
    
    // Also listen for load event
    window.addEventListener('load', updateHeight);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', updateHeight);
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
      height: '200vh',
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