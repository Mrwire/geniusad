'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function ImmersiveValuesSection() {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  // Notre valeurs
  const values = [
    {
      id: "01",
      title: "EXCELLENCE",
      description: "Nous visons l'excellence dans chacune de nos créations, en repoussant constamment les limites de ce qui est possible.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
      delayFactor: 0
    },
    {
      id: "02",
      title: "INNOVATION",
      description: "L'innovation est au cœur de notre approche, guidant chaque aspect de notre travail créatif et stratégique.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v6m0 12v2M4.93 4.93l4.24 4.24m5.66 5.66l4.24 4.24M2 12h6m8 0h6M4.93 19.07l4.24-4.24m5.66-5.66l4.24-4.24" />
        </svg>
      ),
      delayFactor: 0.2
    },
    {
      id: "03",
      title: "PASSION",
      description: "Nous abordons chaque projet avec une passion qui transparaît dans notre engagement et la qualité de notre travail.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ),
      delayFactor: 0.4
    },
    {
      id: "04",
      title: "CRÉATIVITÉ",
      description: "Notre créativité audacieuse nous permet de concevoir des solutions uniques et mémorables qui démarquent nos clients.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z" />
        </svg>
      ),
      delayFactor: 0.6
    },
    {
      id: "05",
      title: "INTÉGRITÉ",
      description: "Nous nous engageons à agir avec intégrité et transparence dans toutes nos relations d'affaires et créatives.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4l2 2" />
        </svg>
      ),
      delayFactor: 0.8
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.2 + index * 0.15
      }
    })
  };

  const orbVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  // Floating elements
  const floatingElements = [
    { size: 2, x: 10, y: 15, duration: 7 },
    { size: 4, x: 80, y: 25, duration: 12 },
    { size: 3, x: 30, y: 65, duration: 9 },
    { size: 5, x: 70, y: 80, duration: 15 },
    { size: 2, x: 20, y: 90, duration: 8 },
    { size: 3, x: 85, y: 10, duration: 11 },
    { size: 2, x: 60, y: 40, duration: 10 },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-black py-20 md:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
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
        
        {/* Floating elements */}
        {floatingElements.map((el, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: `${el.size}rem`,
              height: `${el.size}rem`,
              left: `${el.x}%`,
              top: `${el.y}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: el.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-40 h-40 border-l border-t border-white/10"></div>
        <div className="absolute top-0 right-0 w-40 h-40 border-r border-t border-white/10"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 border-l border-b border-white/10"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 border-r border-b border-white/10"></div>
      </div>
      
      {/* Content container */}
      <motion.div
        style={{ y, opacity }}
        className="container relative z-10 mx-auto px-4"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="flex flex-col items-center"
        >
          {/* Main heading with glowing orb */}
          <div className="relative mb-16 text-center">
            <motion.div
              variants={orbVariants}
              className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full"
            >
              <div className="absolute inset-0 rounded-full bg-white/5 backdrop-blur-sm"></div>
              <motion.div 
                className="absolute inset-4 rounded-full bg-white/10"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              ></motion.div>
            </motion.div>
            
            <motion.span 
              variants={titleVariants}
              className="inline-block text-sm uppercase tracking-widest mb-4 text-white/70"
            >
              Ce qui nous définit
            </motion.span>
            
            <motion.h2 
              variants={titleVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold relative z-10"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                NOS VALEURS
              </span>
            </motion.h2>
            
            <motion.p
              variants={titleVariants}
              className="max-w-2xl mx-auto mt-6 text-white/70"
            >
              Ces valeurs fondamentales guident chacune de nos actions et façonnent notre approche créative
            </motion.p>
          </div>
          
          {/* Values cards in a grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.id}
                custom={index}
                variants={cardVariants}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-all duration-500 -z-10 blur-lg"></div>
                
                <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full flex flex-col transition-all duration-500 
                  group-hover:bg-white/[0.05] group-hover:border-white/20">
                  
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 mr-4 text-white/60 group-hover:text-white transition-colors duration-300">
                      {value.icon}
                    </div>
                    <span className="text-xl font-light opacity-40">{value.id}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">
                    {value.title}
                  </h3>
                  
                  <p className="text-white/60 group-hover:text-white/80 transition-colors mt-auto">
                    {value.description}
                  </p>
                  
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-white/20 group-hover:w-full transition-all duration-700"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
      
      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-white/0 via-white/20 to-white/0"></div>
    </section>
  );
}
