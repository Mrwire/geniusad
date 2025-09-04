'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface GamiusHeroProps {
  title: string;
  subtitle: string;
  imageSrc?: string;
}

export default function GamiusHero({ title, subtitle, imageSrc = '/item_images/image/logo/gamius-logo.png' }: GamiusHeroProps) {
  // Particle animation for gaming-themed background
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Create particles
    const particles: {
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
    }[] = [];
    
    const colors = ['#9933FF', '#8822EE', '#7711DD', '#AA44FF'];
    
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 1,
        speedY: (Math.random() - 0.5) * 1
      });
    }
    
    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Move particles
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Wrap around edges
        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
        if (p.y > canvas.height) p.y = 0;
        if (p.y < 0) p.y = canvas.height;
        
        // Draw particle
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Connect nearby particles with lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = 0.1 * (1 - distance / 100);
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);
  
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center bg-gray-900 text-white">
      {/* Particle background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.6 }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/80 to-transparent z-0"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="z-10"
          >
            <div className="inline-block mb-4 px-3 py-1 rounded-full border border-gamius">
              <span className="text-gamius uppercase tracking-widest text-sm font-medium">Interactive Experience</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
              {title}
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-lg">
              {subtitle}
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <button className="relative overflow-hidden bg-gamius text-white px-8 py-3 rounded-md font-semibold group">
                <span className="relative z-10">Explore Solutions</span>
                <span className="absolute inset-0 h-full w-full bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
              </button>
              
              <button className="relative overflow-hidden bg-transparent border border-white text-white px-8 py-3 rounded-md font-semibold hover:border-gamius hover:text-gamius transition-colors duration-300">
                Our Portfolio
              </button>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10"
          >
            {imageSrc && (
              <div className="relative h-80 md:h-96 w-full">
                <Image
                  src={imageSrc}
                  alt="Gamius - Interactive Experiences"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                  className="drop-shadow-[0_0_15px_rgba(153,51,255,0.5)]"
                />
                
                {/* Decorative elements */}
                <div className="absolute -top-10 -left-10 w-20 h-20 border-t-2 border-l-2 border-gamius"></div>
                <div className="absolute -bottom-10 -right-10 w-20 h-20 border-b-2 border-r-2 border-gamius"></div>
                
                {/* Gaming-style glitch effect */}
                <div className="absolute inset-0 opacity-30 pointer-events-none">
                  <div className="absolute inset-y-0 left-0 w-1 bg-gamius opacity-50 animate-pulse"></div>
                  <div className="absolute inset-y-0 right-0 w-1 bg-gamius opacity-50 animate-pulse delay-300"></div>
                  <div className="absolute inset-x-0 top-0 h-1 bg-gamius opacity-50 animate-pulse delay-150"></div>
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gamius opacity-50 animate-pulse delay-500"></div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
} 