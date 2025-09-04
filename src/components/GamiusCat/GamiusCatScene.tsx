'use client';

import React, { useEffect, useRef } from 'react';
// Removed R3F imports as we are using vanilla Three.js via gamius-chat-3d.js

interface GamiusCatSceneProps {
  animationCue?: string;
  containerId?: string; // Optional: if you want to pass a specific ID
}

const GamiusCatScene: React.FC<GamiusCatSceneProps> = ({ 
  animationCue,
  containerId = 'gamius-3d-container' // Default container ID
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure the container div is available and the script is loaded
    if (containerRef.current && typeof window.initGamius3DEngine === 'function') {
      console.log(`[GamiusCatScene] Initializing 3D engine in container: #${containerId}`);
      window.initGamius3DEngine(containerId);
    } else {
      if (!containerRef.current) {
        console.error(`[GamiusCatScene] Container with id #${containerId} not found.`);
      }
      if (typeof window.initGamius3DEngine !== 'function') {
        console.error('[GamiusCatScene] window.initGamius3DEngine is not available. Ensure gamius-chat-3d.js is loaded.');
      }
    }

    // Cleanup function for when the component unmounts
    return () => {
      if (typeof window.cleanupGamius3DEngine === 'function') {
        console.log('[GamiusCatScene] Cleaning up 3D engine.');
        window.cleanupGamius3DEngine(); 
      } else {
        // Fallback: try to remove the canvas directly if no specific cleanup is available
        const canvas = document.getElementById(containerId)?.querySelector('canvas');
        if (canvas) {
          canvas.remove();
        }
      }
    };
  }, [containerId]); // Re-run if containerId changes (though typically it won't)

  useEffect(() => {
    if (animationCue && typeof window.triggerGamiusAnimation === 'function') {
      console.log(`[GamiusCatScene] Triggering animation: ${animationCue}`);
      window.triggerGamiusAnimation(animationCue);
    } else if (animationCue) {
      console.warn(`[GamiusCatScene] window.triggerGamiusAnimation is not available. Cannot trigger: ${animationCue}`);
    }
  }, [animationCue]);

  return (
    <div 
      id={containerId} 
      ref={containerRef} 
      style={{ width: '100%', height: '100%', position: 'relative', border: '1px solid red' /* Debug border */ }}
      aria-label="Gamius Cat 3D Scene Container"
    >
      {/* This div will be populated by the vanilla Three.js script */}
      {/* You can add loading indicators or placeholders here if needed */}
      <p style={{ position: 'absolute', top: '10px', left: '10px', color: 'white', zIndex: 10 }}>
        3D Scene Container (ID: {containerId})
      </p>
    </div>
  );
};

export default GamiusCatScene;

declare global {
  interface Window {
    initGamius3DEngine?: (containerId: string) => void;
    triggerGamiusAnimation?: (animationName: string) => void;
    cleanupGamius3DEngine?: () => void; // For cleaning up resources
  }
}
