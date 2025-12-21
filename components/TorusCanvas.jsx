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
    // IMPORTANT: Only measure content, exclude the torus itself to prevent feedback loops
    const updateHeight = () => {
      const torusContainer = document.querySelector('.torus-fade-in');
      const canvasElement = torusContainer?.querySelector('canvas');
      
      if (torusContainer) {
        // Get document height EXCLUDING the torus container itself
        // This prevents feedback loops where torus height affects document height
        const body = document.body;
        const html = document.documentElement;
        
        // Get measurements excluding the torus container
        const allElements = Array.from(document.querySelectorAll('*')).filter(el => 
          !el.classList.contains('torus-fade-in') && 
          !el.closest('.torus-fade-in')
        );
        
        const contentHeight = Math.max(
          ...allElements.map(el => {
            const rect = el.getBoundingClientRect();
            return rect.bottom + window.scrollY;
          }),
          body.scrollHeight,
          html.scrollHeight,
          window.innerHeight
        );
        
        // Use content height, but don't let it be less than viewport
        const finalHeight = Math.max(contentHeight, window.innerHeight);
        
        // Only update if height actually changed to prevent unnecessary reflows
        const currentHeight = parseInt(torusContainer.style.height) || 0;
        if (Math.abs(currentHeight - finalHeight) > 10) {
          // Set height with !important equivalent (inline style)
          torusContainer.style.setProperty('height', `${finalHeight}px`, 'important');
          
          // CRITICAL: Also update the canvas element directly
          if (canvasElement) {
            canvasElement.style.setProperty('height', `${finalHeight}px`, 'important');
            canvasElement.height = finalHeight * (window.devicePixelRatio || 2);
            canvasElement.width = window.innerWidth * (window.devicePixelRatio || 2);
          }
        }
      }
    };
    
    // Less aggressive update strategy - only update when needed
    const attemptUpdate = (attempt = 0) => {
      updateHeight();
      if (attempt < 3) {
        setTimeout(() => attemptUpdate(attempt + 1), 300 * (attempt + 1));
      }
    };
    
    // Start updates after DOM is ready
    if (document.readyState === 'complete') {
      updateHeight();
    } else {
      window.addEventListener('load', updateHeight, { once: true });
    }
    
    setTimeout(() => {
      attemptUpdate(1);
    }, 200);
    
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
    
    // Use requestAnimationFrame for updates (much less frequent to prevent feedback loops)
    let rafId;
    let lastUpdate = 0;
    const rafUpdate = (timestamp) => {
      if (timestamp - lastUpdate > 2000) { // Update every 2 seconds max (much less frequent)
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
      height: '100vh',
      minHeight: '100vh',
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