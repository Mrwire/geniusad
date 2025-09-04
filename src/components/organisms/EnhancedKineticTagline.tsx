'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function EnhancedKineticTagline() {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [hovered, setHovered] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]);
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  // Words for the moving text effect
  const words = [
    'AUDACIEUX', 
    'CRÉATIF', 
    'STRATÉGIQUE', 
    'INNOVANT', 
    'PRÉCIS',
    'INSPIRANT'
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5
      }
    }
  };

  const wordVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const geniusVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      WebkitTextStroke: '1px #FFFFFF',
      color: 'transparent'
    },
    visible: {
      opacity: 1,
      scale: 1,
      WebkitTextStroke: '1px #FFFFFF',
      color: 'transparent',
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    hover: {
      WebkitTextStroke: '0px #FFFFFF',
      color: '#FFFFFF',
      scale: 1.05,
      transition: {
        duration: 0.3
      }
    }
  };

  const wordGlowVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: [0.8, 1.05, 1],
      transition: {
        duration: 1.2,
        times: [0, 0.7, 1],
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  // Floating particles animation
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }));

  return (
    <section className="relative overflow-hidden bg-black py-32">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-white/0 via-white/20 to-white/0"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-white/0 via-white/20 to-white/0"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full grid grid-cols-6 md:grid-cols-12">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-r border-white h-full"></div>
            ))}
          </div>
          <div className="h-full w-full grid grid-rows-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="border-b border-white w-full"></div>
            ))}
          </div>
        </div>
        
        {/* Floating particles */}
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white/30 backdrop-blur-sm z-0"
            style={{
              width: particle.size,
              height: particle.size,
              top: `${particle.y}%`,
              left: `${particle.x}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Main content */}
      <motion.div
        ref={containerRef}
        className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center"
        style={{ scale, opacity, rotateY }}
      >
        <motion.div
          className="text-center max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="overflow-hidden relative mb-8">
            <div className="flex justify-center">
              {words.map((word, index) => (
                <motion.span
                  key={word}
                  className="inline-block text-sm md:text-base font-mono tracking-wider text-white/60 mx-2"
                  animate={{
                    opacity: [0.4, 1, 0.4],
                    y: [-20, 0, -20],
                  }}
                  transition={{
                    duration: 4,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>
          
          <motion.h2 
            className={cn(
              "text-5xl md:text-7xl lg:text-8xl font-heading font-bold",
              "flex flex-wrap justify-center items-center gap-x-6 gap-y-4"
            )}
          >
            <motion.span
              variants={geniusVariants}
              whileHover="hover"
              className="relative inline-block cursor-pointer"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              Genius
              <motion.div 
                className="absolute -bottom-2 left-0 w-full h-px bg-white"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: 'left' }}
              />
            </motion.span>
            <motion.span 
              variants={wordVariants}
              className="text-base md:text-xl font-light opacity-70 self-end mb-4"
            >
              it's not just a
            </motion.span>
            <motion.span 
              variants={wordGlowVariants}
              className="relative inline-block"
            >
              <span className="relative z-10 text-white font-bold">word</span>
              <motion.span 
                className="absolute -inset-4 bg-white/5 blur-md rounded-full z-0"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.span>
          </motion.h2>
          
          <motion.p
            className="mt-8 max-w-2xl mx-auto text-white/60 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            Notre nom incarne notre engagement pour l'excellence et l'innovation. 
            Chaque projet est une toile où notre créativité et notre expertise prennent vie.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
