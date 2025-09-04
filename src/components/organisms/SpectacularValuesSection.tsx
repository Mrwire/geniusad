'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function SpectacularValuesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-10%" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Transform values for parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  
  // State for active value to highlight
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Define our values with detailed content
  const values = [
    {
      name: "EXCELLENCE",
      symbol: "✧",
      description: "Nous visons constamment l'excellence dans chaque aspect de notre travail, dépassant les attentes et repoussant les limites de ce qui est possible.",
      keywords: ["Qualité", "Perfection", "Maîtrise", "Exigence"]
    },
    {
      name: "CRÉATIVITÉ",
      symbol: "⬡",
      description: "Notre approche créative sans compromis nous permet de concevoir des expériences uniques et mémorables qui démarquent nos clients.",
      keywords: ["Innovation", "Audace", "Originalité", "Vision"]
    },
    {
      name: "STRATÉGIE",
      symbol: "◇",
      description: "Chaque décision est guidée par une réflexion stratégique approfondie, garantissant des résultats alignés avec les objectifs à long terme.",
      keywords: ["Planification", "Analyse", "Intelligence", "Direction"]
    },
    {
      name: "PASSION",
      symbol: "○",
      description: "La passion est le moteur de notre créativité, de notre engagement et de notre volonté de dépasser les attentes sur chaque projet.",
      keywords: ["Enthousiasme", "Engagement", "Dévouement", "Énergie"]
    },
    {
      name: "INTÉGRITÉ",
      symbol: "⬟",
      description: "Nous nous engageons à maintenir les plus hauts standards d'éthique et de transparence dans toutes nos relations professionnelles.",
      keywords: ["Honnêteté", "Transparence", "Confiance", "Authenticité"]
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };
  
  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: { 
      scaleX: 1,
      transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
    }
  };
  
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };
  
  const glowVariants = {
    inactive: {
      opacity: 0.2,
      scale: 1,
      filter: "blur(5px)",
      background: "rgba(255, 255, 255, 0.05)",
      boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
      transition: { duration: 0.5 }
    },
    active: {
      opacity: 1,
      scale: 1.1,
      filter: "blur(15px)",
      background: "rgba(255, 255, 255, 0.15)",
      boxShadow: "0 0 40px rgba(255, 255, 255, 0.2), 0 0 80px rgba(255, 255, 255, 0.1)",
      transition: { duration: 0.5 }
    }
  };
  
  // Particles for dynamic background
  const particles = Array.from({ length: 150 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.3 + 0.1,
    speedX: (Math.random() - 0.5) * 0.2,
    speedY: (Math.random() - 0.5) * 0.2
  }));
  
  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-black overflow-hidden"
    >
      {/* Gradient overlay at top and bottom */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div>
      
      {/* Abstract background with geometric elements */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ scale }}
      >
        {/* Floating particles */}
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              x: `${particle.x}%`,
              y: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
            }}
            animate={{
              x: `calc(${particle.x}% + ${particle.speedX * 100}vw)`,
              y: `calc(${particle.y}% + ${particle.speedY * 100}vh)`,
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: Math.random() * 20 + 20,
              ease: "linear"
            }}
          />
        ))}
        
        {/* Large geometric shapes */}
        <motion.div
          className="absolute left-10 top-[20%] w-64 h-64 border border-white/10 rounded-full opacity-30"
          style={{ y: y1 }}
        />
        <motion.div
          className="absolute right-20 bottom-[30%] w-80 h-80 border border-white/5 rounded-full opacity-20"
          style={{ y: y2 }}
        />
        <motion.div 
          className="absolute left-[30%] top-[60%] w-40 h-40 border border-white/10 rotate-45 opacity-20"
          style={{ rotate }}
        />
      </motion.div>
      
      {/* Main content */}
      <div className="relative z-20 container mx-auto px-4 py-24 md:py-32">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-col items-center"
        >
          {/* Section heading */}
          <div className="text-center mb-20">
            <motion.div variants={lineVariants} className="h-px w-20 bg-white mx-auto mb-8" style={{ transformOrigin: 'center' }}></motion.div>
            <motion.span variants={titleVariants} className="block text-sm uppercase tracking-widest mb-2 text-white/60">Ce qui nous définit</motion.span>
            <motion.h2 variants={titleVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              NOS VALEURS
            </motion.h2>
            <motion.div variants={lineVariants} className="h-px w-20 bg-white mx-auto mt-8" style={{ transformOrigin: 'center' }}></motion.div>
          </div>
          
          {/* Interactive 3D value showcase */}
          <div className="w-full max-w-4xl mx-auto">
            {/* Value selector - interactive buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              {values.map((value, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "group relative overflow-hidden",
                    "px-5 py-3 text-lg font-medium rounded-full transition-all duration-500",
                    index === activeIndex 
                      ? "bg-white/10 text-white border-white border"
                      : "bg-transparent border border-white/20 text-white/60 hover:bg-white/5 hover:text-white/80"
                  )}
                >
                  <span className="relative z-10">{value.name}</span>
                  <motion.div 
                    className="absolute inset-0 -z-10" 
                    initial={false}
                    animate={index === activeIndex ? "active" : "inactive"}
                    variants={glowVariants}
                  />
                </button>
              ))}
            </div>
            
            {/* Selected value visualization */}
            <motion.div 
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Center symbol with glow effect */}
              <div className="relative flex justify-center items-center mb-12">
                <motion.div 
                  className="relative flex items-center justify-center w-32 h-32 rounded-full"
                  animate={{ 
                    boxShadow: [
                      "0 0 20px rgba(255, 255, 255, 0.1)", 
                      "0 0 40px rgba(255, 255, 255, 0.2)", 
                      "0 0 20px rgba(255, 255, 255, 0.1)"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="absolute inset-0 rounded-full bg-white/5 backdrop-blur-sm"></div>
                  <motion.div 
                    className="text-5xl text-white"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {values[activeIndex].symbol}
                  </motion.div>
                </motion.div>
                
                {/* Concentric glowing circles */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-white/10"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute inset-5 rounded-full border border-white/5"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
              </div>
              
              {/* Value description */}
              <div className="text-center mb-12">
                <motion.h3 
                  className="text-3xl md:text-4xl font-bold mb-6 inline-block bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent"
                  animate={{ 
                    filter: ["blur(0px)", "blur(0.5px)", "blur(0px)"]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  {values[activeIndex].name}
                </motion.h3>
                <p className="text-lg text-white/70 max-w-2xl mx-auto">
                  {values[activeIndex].description}
                </p>
              </div>
              
              {/* Keywords */}
              <div className="flex flex-wrap justify-center gap-3">
                {values[activeIndex].keywords.map((keyword, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="px-4 py-2 border border-white/20 rounded-full text-white/60 text-sm backdrop-blur-sm"
                  >
                    {keyword}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Inspirational quote */}
          <motion.div 
            className="mt-20 text-center max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1.5 }}
          >
            <blockquote className="text-xl italic text-white/50">
              &ldquo;Nos valeurs sont le reflet de notre engagement envers l'excellence et la créativité, guidant chaque décision et chaque projet.&rdquo;
            </blockquote>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
