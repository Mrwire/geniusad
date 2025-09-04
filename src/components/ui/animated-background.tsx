"use client";

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  className?: string;
}

const Particle = ({ delay, duration, size, x, y, color }: any) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: size,
      height: size,
      backgroundColor: color,
      filter: `blur(${size / 4}px)`,
      opacity: 0.5,
    }}
    initial={{ x, y, opacity: 0 }}
    animate={{
      x: [x, x + Math.random() * 100 - 50, x - Math.random() * 100 + 50, x],
      y: [y, y - Math.random() * 100 + 50, y + Math.random() * 100 - 50, y],
      opacity: [0, 0.5, 0.8, 0.5, 0],
    }}
    transition={{
      duration: duration,
      ease: "easeInOut",
      times: [0, 0.2, 0.5, 0.8, 1],
      repeat: Infinity,
      delay: delay,
    }}
  />
);

const FloatingCircle = ({ delay, duration, size, x, y, gradient }: any) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: size,
      height: size,
      background: gradient,
      filter: `blur(${size / 10}px)`,
      opacity: 0.15,
    }}
    initial={{ x, y, scale: 0.8 }}
    animate={{
      scale: [0.8, 1.1, 0.9, 1],
      opacity: [0.1, 0.15, 0.2, 0.15],
      x: [x, x + 20, x - 10, x],
      y: [y, y - 20, y + 10, y],
    }}
    transition={{
      duration: duration,
      ease: "easeInOut",
      times: [0, 0.3, 0.7, 1],
      repeat: Infinity,
      delay: delay,
    }}
  />
);

export function AnimatedBackground({ className }: AnimatedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = React.useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setDimensions({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
        }
      });

      resizeObserver.observe(containerRef.current);
      return () => {
        if (containerRef.current) resizeObserver.unobserve(containerRef.current);
      };
    }
  }, []);

  // Générer des particules et des cercles uniquement après avoir mesuré les dimensions
  const particles = React.useMemo(() => {
    if (dimensions.width === 0) return [];
    
    const count = Math.min(Math.floor(dimensions.width / 50), 15);
    return Array.from({ length: count }).map((_, i) => ({
      id: `particle-${i}`,
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      size: Math.random() * 8 + 2,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 15,
      color: [
        'rgba(59, 130, 246, 0.3)', // blue
        'rgba(139, 92, 246, 0.3)',  // purple
        'rgba(20, 184, 166, 0.3)',  // teal
        'rgba(249, 115, 22, 0.3)',  // orange
        'rgba(236, 72, 153, 0.3)',  // pink
      ][Math.floor(Math.random() * 5)],
    }));
  }, [dimensions]);

  const circles = React.useMemo(() => {
    if (dimensions.width === 0) return [];
    
    return [
      {
        id: 'circle-1',
        x: dimensions.width * 0.1,
        y: dimensions.height * 0.2,
        size: dimensions.width * 0.25,
        delay: 0.5,
        duration: 25,
        gradient: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
      },
      {
        id: 'circle-2',
        x: dimensions.width * 0.7,
        y: dimensions.height * 0.3,
        size: dimensions.width * 0.2,
        delay: 2,
        duration: 20,
        gradient: 'linear-gradient(135deg, #14b8a6, #3b82f6)',
      },
      {
        id: 'circle-3',
        x: dimensions.width * 0.25,
        y: dimensions.height * 0.7,
        size: dimensions.width * 0.3,
        delay: 1,
        duration: 30,
        gradient: 'linear-gradient(225deg, #f97316, #ec4899)',
      },
    ];
  }, [dimensions]);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Cercles flottants */}
      {circles.map((circle) => (
        <FloatingCircle key={circle.id} {...circle} />
      ))}
      
      {/* Particules */}
      {particles.map((particle) => (
        <Particle key={particle.id} {...particle} />
      ))}
    </div>
  );
}

export default AnimatedBackground;
