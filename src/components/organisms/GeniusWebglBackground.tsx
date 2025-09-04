"use client";

import React from 'react';

export function GeniusWebglBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-black">
      {/* Gradient Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at center, rgba(30,30,30,1) 0%, rgba(0,0,0,1) 70%)'
        }}
      />
      
      {/* Arcs */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[1, 2, 3, 4, 5].map((i) => (
          <div 
            key={i}
            className="absolute rounded-full border border-silver/30"
            style={{
              width: `${300 + i * 150}px`,
              height: `${300 + i * 150}px`,
              opacity: 0.2 + i * 0.05,
              animationDelay: `${i * 0.5}s`,
              animation: 'pulse 15s infinite ease-in-out'
            }}
          />
        ))}
      </div>
      
      {/* Radial lines */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-full w-[1px] origin-bottom opacity-20"
            style={{
              background: 'linear-gradient(to top, transparent, rgba(255,255,255,0.3) 50%, transparent)',
              transform: `rotate(${i * 30}deg)`,
              animation: `rotateOpacity 30s infinite ease-in-out ${i * 0.5}s`
            }}
          />
        ))}
      </div>
      
      {/* Stars/Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
              animation: `twinkle ${Math.floor(Math.random() * 5) + 8}s infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      {/* Floating Glow Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => {
          const size = Math.random() * 200 + 100;
          return (
            <div
              key={i}
              className="absolute rounded-full blur-3xl"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                background: `radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 70%)`,
                animation: `float ${Math.floor(Math.random() * 15) + 20}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 10}s`
              }}
            />
          );
        })}
      </div>
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.15;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.3;
          }
        }
        
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(50px, 50px);
          }
          50% {
            transform: translate(0, 100px);
          }
          75% {
            transform: translate(-50px, 50px);
          }
        }
        
        @keyframes rotateOpacity {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}

export default GeniusWebglBackground; 