'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

export default function ShadcnSpiritSection() {
  const controls = useAnimation();
  const ref = useRef(null);
  const confettiCanvasRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [confettiColors, setConfettiColors] = useState<string[]>([]);
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  // Define ESPRIT - Each letter represents a value
  const espritLetters = [
    { letter: 'E', word: 'Excellence', color: '#FF3366', description: 'Notre exigence quotidienne' },
    { letter: 'S', word: 'Sur-mesure', color: '#33CCFF', description: 'Pour répondre parfaitement à vos besoins' },
    { letter: 'P', word: 'Passion', color: '#FFCC33', description: 'Le moteur de notre créativité' },
    { letter: 'R', word: 'Respect', color: '#66FF99', description: 'La base de nos relations' },
    { letter: 'I', word: 'Innovation', color: '#CC66FF', description: 'Pour rester à la pointe' },
    { letter: 'T', word: 'Technologie', color: '#FF9933', description: 'Un atout pour concrétiser vos idées' }
  ];

  // Track mouse position for magnetic effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Magnetic effect calculation for letters
  const calculateMagneticValues = (index: number, bounds: DOMRect) => {
    // Convert from screen coordinates to element-relative
    const elementX = mouseX.get() - bounds.left;
    const elementY = mouseY.get() - bounds.top;
    
    // Limit detection to the bounds of the element + margin
    const margin = 150; // Detection margin around the element
    if (
      elementX >= -margin && 
      elementX <= bounds.width + margin && 
      elementY >= -margin && 
      elementY <= bounds.height + margin
    ) {
      // Calculate distance from center (normalized)
      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;
      const distanceX = elementX - centerX;
      const distanceY = elementY - centerY;
      
      // Calculate distance and force
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY) + margin;
      const force = Math.max(0, 1 - distance / maxDistance);
      
      // Calculate x and y movement (max 25px in any direction)
      const moveX = (distanceX / maxDistance) * 25 * force;
      const moveY = (distanceY / maxDistance) * 25 * force;
      
      return { moveX, moveY, force };
    }
    
    return { moveX: 0, moveY: 0, force: 0 };
  };

  // Trigger enhanced confetti effect when hovering over a letter
  const triggerConfetti = (index: number) => {
    if (!confettiCanvasRef.current) return;
    
    const rect = confettiCanvasRef.current.getBoundingClientRect();
    const letterElements = document.querySelectorAll('.esprit-letter');
    
    if (letterElements[index]) {
      const letterRect = letterElements[index].getBoundingClientRect();
      const x = (letterRect.left + letterRect.width/2 - rect.left) / rect.width;
      const y = (letterRect.top + letterRect.height/2 - rect.top) / rect.height;
      
      // First burst - main color
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { x, y: y - 0.1 },
        colors: [espritLetters[index].color],
        shapes: ['circle', 'square'],
        ticks: 300,
        gravity: 0.8,
        scalar: 1.2,
        disableForReducedMotion: true
      });
      
      // Second burst - accent colors after a slight delay
      setTimeout(() => {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { x, y: y - 0.1 },
          colors: ['#FFFFFF', '#000000', espritLetters[index].color],
          shapes: ['star', 'circle'],
          ticks: 200,
          gravity: 0.6,
          scalar: 0.8,
          disableForReducedMotion: true
        });
      }, 100);
      
      // Add ripple effect
      const ripple = document.createElement('div');
      ripple.className = 'ripple-effect';
      ripple.style.position = 'absolute';
      ripple.style.left = `${letterRect.left + letterRect.width/2}px`;
      ripple.style.top = `${letterRect.top + letterRect.height/2}px`;
      ripple.style.transform = 'translate(-50%, -50%)';
      ripple.style.width = '0';
      ripple.style.height = '0';
      ripple.style.borderRadius = '50%';
      ripple.style.background = `radial-gradient(circle, ${espritLetters[index].color}80 0%, transparent 70%)`;
      ripple.style.zIndex = '5';
      ripple.style.pointerEvents = 'none';
      document.body.appendChild(ripple);
      
      // Animate ripple
      ripple.animate(
        [
          { width: '0', height: '0', opacity: 0.8 },
          { width: '300px', height: '300px', opacity: 0 }
        ],
        {
          duration: 1000,
          easing: 'ease-out'
        }
      ).onfinish = () => document.body.removeChild(ripple);
    }
  };

  // Handle letter hover
  const handleLetterHover = (index: number) => {
    setActiveIndex(index);
    setConfettiColors([espritLetters[index].color, '#FFFFFF', '#000000']);
    triggerConfetti(index);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const letterVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      rotateY: 90,
      rotateX: 45,
      scale: 0.8
    },
    visible: (custom: number) => ({ 
      opacity: 1,
      y: 0,
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        delay: 0.5 + custom * 0.15,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.8 },
        rotateY: { duration: 1.4, ease: 'easeOut' },
        rotateX: { duration: 1.2 }
      }
    }),
    hover: { 
      scale: 1.2,
      y: -15,
      rotateY: [-5, 5, 0],
      rotateX: [5, -5, 0],
      transition: { 
        duration: 0.5,
        ease: 'easeOut',
        rotateY: { 
          repeat: 0, 
          duration: 0.8,
          ease: 'easeInOut'
        },
        rotateX: {
          repeat: 0,
          duration: 0.8,
          ease: 'easeInOut'
        }
      }
    },
    tap: {
      scale: 0.95,
      rotateY: 0,
      transition: { duration: 0.1 }
    }
  };

  const wordRevealVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.9,
      filter: 'blur(10px)'
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        filter: { duration: 0.5 }
      }
    },
    exit: {
      opacity: 0,
      y: -15,
      scale: 0.9,
      filter: 'blur(10px)',
      transition: {
        duration: 0.4,
        ease: 'easeIn'
      }
    }
  };

  // Additional animation variants for floating particles
  const floatingParticleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (custom: number) => ({
      opacity: [0, 0.8, 0],
      scale: [0, 1, 0.5],
      x: custom * 30,
      y: custom * -40,
      transition: {
        duration: 2 + Math.random() * 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    })
  };

  return (
    <section 
      ref={ref}
      className="min-h-[90vh] flex flex-col items-center justify-center bg-black py-24 px-4 relative overflow-hidden"
    >
      {/* Canvas for confetti */}
      <div 
        ref={confettiCanvasRef}
        className="absolute inset-0 z-10 pointer-events-none"
      />
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              width: `${20 + Math.random() * 100}px`,
              height: `${20 + Math.random() * 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.05 + Math.random() * 0.1,
              filter: 'blur(8px)',
              transform: `scale(${0.5 + Math.random()})`
            }}
          />
        ))}
      </div>

      <motion.div
        className="container mx-auto max-w-6xl relative z-20"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="text-center mb-16">
          <motion.h2 
            variants={titleVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6"
          >
            NOS MOTS D'ORDRE
          </motion.h2>
          <motion.p 
            variants={titleVariants}
            className="text-lg text-[#D9D9D9] max-w-2xl mx-auto leading-relaxed"
          >
            Les principes qui guident chacune de nos actions et définissent notre approche unique.
          </motion.p>
        </div>

        {/* Main content area */}
        <div className="relative mb-24">
          {/* Animated ESPRIT letters with floating particles */}
          <div className="flex justify-center items-center space-x-2 md:space-x-5 mb-16 perspective-[1000px]">
            {espritLetters.map((item, index) => {
              // For each letter, create refs to track its position for magnetic effect
              const letterRef = useRef<HTMLDivElement>(null);
              const [magneticValues, setMagneticValues] = useState({ moveX: 0, moveY: 0, force: 0 });
              
              // Spring animations for smooth magnetic effect
              const springX = useSpring(0, { stiffness: 150, damping: 15 });
              const springY = useSpring(0, { stiffness: 150, damping: 15 });
              
              // Update magnetic values on mouse move
              useEffect(() => {
                const updateMagneticValues = () => {
                  if (letterRef.current) {
                    const bounds = letterRef.current.getBoundingClientRect();
                    const values = calculateMagneticValues(index, bounds);
                    setMagneticValues(values);
                    springX.set(values.moveX);
                    springY.set(values.moveY);
                  }
                };
                
                const interval = setInterval(updateMagneticValues, 50); // Update every 50ms
                return () => clearInterval(interval);
              }, [index, springX, springY]);
              
              // Transform values from springs
              const x = useTransform(springX, (v) => `${v}px`);
              const y = useTransform(springY, (v) => `${v}px`);
              const scale = useTransform(springX, [-25, 0, 25], [0.95, 1, 0.95]);
              const rotateY = useTransform(springX, [-25, 0, 25], [10, 0, -10]);
              const rotateX = useTransform(springY, [-25, 0, 25], [-10, 0, 10]);
              
              return (
                <motion.div
                  key={index}
                  ref={letterRef}
                  className="relative" 
                  style={{ perspective: "1000px" }}
                >
                  {/* Floating particles around the letter */}
                  {activeIndex === index && Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={`particle-${i}`}
                      custom={i % 2 === 0 ? i : -i}
                      variants={floatingParticleVariants}
                      initial="hidden"
                      animate="visible"
                      className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full z-0"
                      style={{ 
                        backgroundColor: item.color,
                        boxShadow: `0 0 10px ${item.color}`,
                        filter: 'blur(1px)'
                      }}
                    />
                  ))}
                  
                  {/* The letter itself with 3D transformations */}
                  <motion.div
                    custom={index}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap="tap"
                    onHoverStart={() => handleLetterHover(index)}
                    onHoverEnd={() => setActiveIndex(null)}
                    style={{
                      x,
                      y,
                      scale,
                      rotateY,
                      rotateX,
                      color: activeIndex === index ? item.color : '#D9D9D9',
                      textShadow: activeIndex === index 
                        ? `0 0 20px ${item.color}80, 0 0 40px ${item.color}40` 
                        : 'none',
                      transformStyle: 'preserve-3d',
                      background: activeIndex === index 
                        ? `linear-gradient(135deg, ${item.color}20, transparent)` 
                        : 'transparent',
                    }}
                    className={cn(
                      "esprit-letter cursor-pointer select-none relative z-10",
                      "text-6xl md:text-7xl lg:text-9xl font-heading font-extrabold",
                      "transition-all duration-300 ease-out px-2 rounded-xl",
                      "flex items-center justify-center"
                    )}
                  >
                    {item.letter}
                    
                    {/* Animated gradient background when hovered */}
                    {activeIndex === index && (
                      <motion.div 
                        className="absolute inset-0 -z-10 rounded-xl opacity-20"
                        initial={{ backgroundPosition: '0% 0%' }}
                        animate={{ 
                          backgroundPosition: ['0% 0%', '100% 100%'],
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          repeatType: 'mirror',
                          duration: 3,
                          ease: 'linear'
                        }}
                        style={{
                          background: `radial-gradient(circle at 30% 30%, ${item.color}, transparent 70%)`
                        }}
                      />
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Word reveal container with enhanced animations */}
          <div className="h-28 md:h-32 flex justify-center items-center">
            <AnimatePresence mode="wait">
              {activeIndex !== null && (
                <motion.div
                  key={activeIndex}
                  variants={wordRevealVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-center relative"
                >
                  <motion.div
                    className="absolute -inset-6 -z-10 rounded-lg opacity-30"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 0.15,
                      background: `radial-gradient(circle, ${espritLetters[activeIndex].color}40 0%, transparent 70%)`
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Main word with letter-by-letter animation */}
                  <h3 className="text-3xl md:text-4xl font-heading font-bold mb-2">
                    {espritLetters[activeIndex].word.split('').map((letter, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          color: espritLetters[activeIndex].color,
                          textShadow: `0 0 10px ${espritLetters[activeIndex].color}40`
                        }}
                        transition={{ 
                          delay: 0.1 + i * 0.04,
                          duration: 0.3,
                          ease: "easeOut"
                        }}
                        className="inline-block"
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </h3>
                  
                  {/* Description with gradient text */}
                  <motion.p 
                    className="text-white/80 text-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    style={{
                      background: `linear-gradient(90deg, #ffffff, ${espritLetters[activeIndex].color}, #ffffff)`,
                      backgroundSize: "200% 100%",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      animation: "gradientMove 3s ease infinite"
                    }}
                  >
                    {espritLetters[activeIndex].description}
                  </motion.p>

                  {/* Add keyframes for gradient animation */}
                  <style jsx>{`
                    @keyframes gradientMove {
                      0% { background-position: 0% 50%; }
                      50% { background-position: 100% 50%; }
                      100% { background-position: 0% 50%; }
                    }
                  `}</style>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 3D Effect Guide */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 2, duration: 0.8 } }}
            className="flex justify-center mt-16"
          >
            <div className="flex items-center bg-black/30 backdrop-blur-md border border-white/10 rounded-full px-6 py-3">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 mr-3"
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" strokeWidth="2"/>
                  <path d="M12 3V21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M3 12H21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </motion.div>
              <span className="text-white/70 text-sm font-medium">Survolez et cliquez sur les lettres pour explorer</span>
            </div>
          </motion.div>
        </div>

        {/* No instruction text needed */}
      </motion.div>
    </section>
  );
}
