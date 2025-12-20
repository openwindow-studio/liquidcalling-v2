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
      const canvasElement = torusContainer?.querySelector('canvas');
      
      if (torusContainer) {
        // More robust height calculation - check all possible sources
        const body = document.body;
        const html = document.documentElement;
        
        // Get all possible height measurements
        const measurements = [
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight,
          window.innerHeight,
          // Also check the actual rendered content
          Math.max(...Array.from(document.querySelectorAll('*')).map(el => {
            const rect = el.getBoundingClientRect();
            return rect.bottom + window.scrollY;
          }))
        ];
        
        const docHeight = Math.max(...measurements);
        
        // For desktop, be more aggressive with padding
        const isDesktop = window.innerWidth > 768;
        const paddingMultiplier = isDesktop ? 4 : 1.5; // Even more aggressive for desktop
        const finalHeight = Math.max(docHeight, window.innerHeight * paddingMultiplier);
        
        // Debug logging for desktop
        if (isDesktop) {
          console.log('Desktop torus height update:', {
            docHeight,
            viewportHeight: window.innerHeight,
            finalHeight,
            paddingMultiplier
          });
        }
        
        // Set height with !important equivalent (inline style)
        torusContainer.style.setProperty('height', `${finalHeight}px`, 'important');
        
        // Also set minHeight to ensure it doesn't shrink
        torusContainer.style.setProperty('min-height', `${finalHeight}px`, 'important');
        
        // CRITICAL: Also update the canvas element directly
        if (canvasElement) {
          canvasElement.style.setProperty('height', `${finalHeight}px`, 'important');
          canvasElement.style.setProperty('min-height', `${finalHeight}px`, 'important');
          canvasElement.height = finalHeight * window.devicePixelRatio || 2;
          canvasElement.width = window.innerWidth * (window.devicePixelRatio || 2);
        }
      }
    };
    
    // More aggressive update strategy for desktop
    const attemptUpdate = (attempt = 0) => {
      updateHeight();
      if (attempt < 10) {
        setTimeout(() => attemptUpdate(attempt + 1), 100 * (attempt + 1));
      }
    };
    
    // Start updates immediately and continue
    updateHeight();
    setTimeout(() => {
      attemptUpdate(1);
    }, 50);
    
    // Update on resize
    const handleResize = () => {
      updateHeight();
    };
    window.addEventListener('resize', handleResize);
    
    // Update on scroll (in case content loads dynamically)
    const handleScroll = () => {
      updateHeight();
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Watch for DOM changes that might affect height (debounced)
    let timeoutId;
    const debouncedUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateHeight, 100);
    };
    
    const observer = new MutationObserver(debouncedUpdate);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });
    
    // Also observe the document element
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });
    
    // Listen for all relevant events
    window.addEventListener('load', updateHeight);
    window.addEventListener('DOMContentLoaded', updateHeight);
    
    // Use requestAnimationFrame for continuous updates (throttled)
    let rafId;
    let lastUpdate = 0;
    const rafUpdate = (timestamp) => {
      if (timestamp - lastUpdate > 500) { // Update every 500ms max
        updateHeight();
        lastUpdate = timestamp;
      }
      rafId = requestAnimationFrame(rafUpdate);
    };
    rafId = requestAnimationFrame(rafUpdate);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', updateHeight);
      window.removeEventListener('DOMContentLoaded', updateHeight);
      observer.disconnect();
      clearTimeout(timeoutId);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="torus-fade-in" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '300vh',
      minHeight: '300vh',
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
        style={{ 
          width: '100%', 
          height: '100%', 
          minHeight: '100%',
          pointerEvents: 'auto',
          display: 'block'
        }}
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