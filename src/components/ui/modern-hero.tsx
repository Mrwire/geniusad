'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useAnimation, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ModernHeroProps {
  locale?: string;
}

export const ModernHero: React.FC<ModernHeroProps> = ({ locale = 'fr' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(titleRef, { once: true });
  const controls = useAnimation();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);
  
  // Textes multilingues
  const texts = {
    fr: {
      title: 'AGENCE DE\nCOMMUNICATION ET\nPRODUCTION',
      subline: 'ÉVÉNEMENTIEL CORPORATE ET GRAND PUBLIC · MARKETING ALTERNATIF · ROADSHOW ET ACTIVATIONS',
      cta: 'Découvrir notre univers'
    },
    en: {
      title: 'COMMUNICATION\nAND PRODUCTION\nAGENCY',
      subline: 'CORPORATE AND PUBLIC EVENTS · ALTERNATIVE MARKETING · ROADSHOW AND ACTIVATIONS',
      cta: 'Discover our universe'
    }
  };
  
  const currentTexts = texts[locale as keyof typeof texts] || texts.fr;
  
  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center overflow-hidden bg-black text-white py-16"
      style={{ 
        opacity,
        y,
        scale
      }}
    >
      {/* Fond animé */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black opacity-60"></div>
        
        <motion.div 
          className="absolute inset-0 z-[-1]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {/* Design minimaliste avec des formes abstraites animées */}
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1a1a1a" />
                <stop offset="100%" stopColor="#000000" />
              </linearGradient>
              <mask id="mask" x="0" y="0" width="100" height="100">
                <motion.path
                  d="M40,0 C40,0 80,40 80,80 C80,80 40,120 0,80 C0,80 -40,40 0,0 C0,0 20,-20 40,0 Z"
                  fill="white"
                  initial={{ scale: 0.8, rotate: -10 }}
                  animate={{ 
                    scale: [0.8, 0.9, 0.8], 
                    rotate: [-10, 10, -10],
                    x: [0, 5, 0],
                    y: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 20, 
                    ease: "easeInOut", 
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </mask>
            </defs>
            <rect x="0" y="0" width="100" height="100" fill="url(#gradient)" mask="url(#mask)" />
            
            {/* Le G abstrait */}
            <motion.path
              d="M65,40 C65,52.1503 55.1503,62 43,62 C36.5,62 30.5,59.5 26,55.5 L26,40 L40,40 L40,32 L18,32 L18,60 C24,66 33,70 43,70 C59.5685,70 73,56.5685 73,40 C73,23.4315 59.5685,10 43,10 C33,10 24,14 18,20 L24,26 C28.5,21.5 35.5,18 43,18 C55.1503,18 65,27.8497 65,40 Z"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: 0.8,
                transition: { 
                  pathLength: { duration: 4, ease: "easeInOut" },
                  opacity: { duration: 3, ease: "easeInOut" }
                }
              }}
            />
          </svg>
        </motion.div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 z-10 pt-20">
        <div className="max-w-4xl mx-auto">
          {/* Titre principal */}
          <motion.h1
            ref={titleRef}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.8,
                  ease: [0.4, 0.0, 0.2, 1]
                }
              }
            }}
            className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold uppercase tracking-tight mb-8 whitespace-pre-line leading-tight"
          >
            {currentTexts.title}
          </motion.h1>
          
          {/* Sous-titre */}
          <motion.p
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.8,
                  delay: 0.3,
                  ease: [0.4, 0.0, 0.2, 1]
                }
              }
            }}
            className="text-sm md:text-base lg:text-lg font-sans tracking-wide text-gray-300 mb-12 max-w-3xl"
          >
            {currentTexts.subline}
          </motion.p>
          
          {/* CTA */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.8,
                  delay: 0.6,
                  ease: [0.4, 0.0, 0.2, 1]
                }
              }
            }}
          >
            <Link
              href="#discover"
              className={cn(
                "inline-flex items-center justify-center px-6 py-3",
                "bg-gray-200 hover:bg-white text-black font-medium",
                "transition-all duration-300 ease-in-out",
                "rounded-none font-heading tracking-wide"
              )}
            >
              {currentTexts.cta}
              <motion.span
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "loop", 
                  duration: 1.5,
                  ease: "easeInOut"
                }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Séparateur du bas avec un effet de scroll discret */}
      <motion.div 
        className="absolute bottom-8 left-0 right-0 flex justify-center items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { delay: 1.2, duration: 0.8 }
        }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            repeat: Infinity, 
            repeatType: "loop", 
            duration: 2,
            ease: "easeInOut"
          }}
          className="text-white opacity-70"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="40" 
            height="40" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default ModernHero;
