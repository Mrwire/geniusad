'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function UltraSpectacularValuesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-10%" });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  
  // Mouse movement tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Auto-rotate through values
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % values.length);
    }, 10000); // Change every 10 seconds
    
    return () => clearInterval(interval);
  }, []);

  // Spring animations for smoother effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  useEffect(() => {
    mouseX.set(mousePosition.x * 100);
    mouseY.set(mousePosition.y * 100);
  }, [mousePosition]);
  
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });
  
  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  // Values with enhanced details
  const values = [
    {
      name: "EXCELLENCE",
      symbol: "★",
      description: "Nous visons constamment l'excellence dans chaque aspect de notre travail, dépassant les attentes et repoussant les limites de ce qui est possible.",
      keywords: ["Qualité", "Perfection", "Maîtrise", "Exigence", "Standard"],
      color: "255, 255, 255",
      detail: "L'excellence est notre engagement à produire un travail de la plus haute qualité. Chaque projet est une opportunité de démontrer notre standard irréprochable et notre souci du détail."
    },
    {
      name: "CRÉATIVITÉ",
      symbol: "◈",
      description: "Notre approche créative sans compromis nous permet de concevoir des expériences uniques et mémorables qui démarquent nos clients.",
      keywords: ["Innovation", "Audace", "Originalité", "Vision", "Imagination"],
      color: "240, 240, 240",
      detail: "La créativité est le moteur de l'innovation. Nous abordons chaque défi avec une pensée non conventionnelle pour créer des solutions qui inspirent et captivent."
    },
    {
      name: "STRATÉGIE",
      symbol: "◇",
      description: "Chaque décision est guidée par une réflexion stratégique approfondie, garantissant des résultats alignés avec les objectifs à long terme.",
      keywords: ["Planification", "Analyse", "Intelligence", "Direction", "Précision"],
      color: "230, 230, 230",
      detail: "Notre approche stratégique garantit que chaque élément créatif sert un objectif plus large. Nous combinons données et intuition pour créer des stratégies gagnantes."
    },
    {
      name: "PASSION",
      symbol: "❖",
      description: "La passion est le moteur de notre créativité, de notre engagement et de notre volonté de dépasser les attentes sur chaque projet.",
      keywords: ["Enthousiasme", "Engagement", "Dévouement", "Énergie", "Cœur"],
      color: "245, 245, 245",
      detail: "La passion imprègne tout ce que nous faisons. C'est cette énergie qui nous pousse à aller au-delà de ce qui est attendu et à mettre notre cœur dans chaque création."
    },
    {
      name: "INTÉGRITÉ",
      symbol: "◎",
      description: "Nous nous engageons à maintenir les plus hauts standards d'éthique et de transparence dans toutes nos relations professionnelles.",
      keywords: ["Honnêteté", "Transparence", "Confiance", "Authenticité", "Éthique"],
      color: "235, 235, 235",
      detail: "L'intégrité est la fondation de toutes nos relations. Nous valorisons l'honnêteté et la transparence, créant ainsi des partenariats basés sur une confiance mutuelle."
    }
  ];

  // Advanced geometry elements for background
  const geometryElements = [
    { type: "circle", x: 15, y: 20, size: 200, opacity: 0.05, delay: 0, speedX: 0.02, speedY: -0.03 },
    { type: "diamond", x: 80, y: 70, size: 150, opacity: 0.04, delay: 2, speedX: -0.015, speedY: 0.02 },
    { type: "square", x: 30, y: 80, size: 180, opacity: 0.03, delay: 4, speedX: 0.01, speedY: -0.01 },
    { type: "hexagon", x: 70, y: 30, size: 220, opacity: 0.025, delay: 1, speedX: -0.02, speedY: -0.01 },
    { type: "triangle", x: 20, y: 60, size: 120, opacity: 0.04, delay: 3, speedX: 0.03, speedY: 0.02 }
  ];
  
  // Interactive elements for visual sound wave effect
  const audioVisualizer = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    height: Math.random() * 50 + 10,
    speed: Math.random() * 0.5 + 0.2
  }));

  // Render geometry shape based on type
  const renderGeometryShape = (type: string) => {
    switch(type) {
      case "circle":
        return <div className="w-full h-full rounded-full border border-white/20"></div>;
      case "diamond":
        return <div className="w-full h-full rotate-45 border border-white/20"></div>;
      case "square":
        return <div className="w-full h-full border border-white/20"></div>;
      case "triangle":
        return <div className="w-0 h-0 border-l-[75px] border-r-[75px] border-b-[130px] border-l-transparent border-r-transparent border-b-white/20"></div>;
      case "hexagon":
        return <div className="w-full h-full rounded-full border border-white/20"></div>;
      default:
        return <div className="w-full h-full rounded-full border border-white/20"></div>;
    }
  };

  // Handle tooltip
  const handleTooltipEnter = (keyword: string, index: number) => {
    setTooltipContent(keyword);
    setShowTooltip(true);
  };
  
  const handleTooltipLeave = () => {
    setShowTooltip(false);
  };
  
  const handleTooltipMove = (e: React.MouseEvent) => {
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-black overflow-hidden"
      onMouseMove={handleTooltipMove}
    >
      {/* Advanced 3D-like background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(50,50,50,0.1)_0%,_rgba(0,0,0,1)_70%)]"></div>
      
      {/* Flowing grid lines */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full grid grid-cols-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div 
              key={i} 
              className="h-full border-r border-white"
              style={{ 
                scaleY: 1,
                x: useTransform(smoothMouseX, [0, 0], [-5, 5])
              }}
            />
          ))}
        </div>
        <div className="h-full w-full grid grid-rows-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div 
              key={i} 
              className="w-full border-b border-white"
              style={{
                scaleX: 1,
                y: useTransform(smoothMouseY, [0, 0], [-5, 5])
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Moving geometry elements */}
      {geometryElements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            width: element.size,
            height: element.size,
            x: `calc(${element.x}% + ${useTransform(smoothMouseX, [0, 0], [-30, 30])})`,
            y: `calc(${element.y}% + ${useTransform(smoothMouseY, [0, 0], [-30, 30])})`,
            opacity: element.opacity,
          }}
          animate={{
            x: [`${element.x}%`, `${element.x + element.speedX * 100}%`, `${element.x}%`],
            y: [`${element.y}%`, `${element.y + element.speedY * 100}%`, `${element.y}%`],
            rotate: [0, 360],
          }}
          transition={{
            duration: 50 + element.delay * 10,
            repeat: Infinity,
            ease: "linear",
            rotate: {
              duration: 120 + element.delay * 5,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        >
          {renderGeometryShape(element.type)}
        </motion.div>
      ))}
      
      {/* Gradient overlays for depth */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div>
      
      {/* Main content */}
      <motion.div 
        className="relative z-20 container mx-auto px-4 py-24 md:py-32"
        style={{ opacity }}
      >
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center"
        >
          {/* Section heading with glowing effect */}
          <div className="text-center mb-20 relative">
            <motion.div 
              className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full"
              animate={{ 
                boxShadow: [
                  "0 0 40px rgba(255, 255, 255, 0.1)", 
                  "0 0 80px rgba(255, 255, 255, 0.15)", 
                  "0 0 40px rgba(255, 255, 255, 0.1)"
                ]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 rounded-full bg-white/5 blur-lg opacity-60"></div>
            </motion.div>
            
            <motion.span 
              className="inline-block text-sm uppercase tracking-widest mb-4 text-white/70"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Ce qui nous définit
            </motion.span>
            
            <motion.h2 
              className="text-4xl md:text-6xl lg:text-7xl font-bold relative z-10"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.5 }}
            >
              <span className="inline-block relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40">
                  NOS VALEURS
                </span>
                <motion.span 
                  className="absolute -inset-1 bg-white/10 blur-xl rounded-full -z-10"
                  animate={{ 
                    opacity: [0.2, 0.4, 0.2], 
                    scale: [1, 1.05, 1] 
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </span>
            </motion.h2>
          </div>
          
          {/* Interactive values path navigator */}
          <div className="w-full max-w-4xl mx-auto mb-20 flex items-center justify-center">
            <div className="relative w-full h-24 flex items-center justify-center overflow-hidden">
              {/* Interactive path connector */}
              <div className="absolute top-1/2 left-0 w-full h-px bg-white/10"></div>
              
              {/* Value points on timeline */}
              <div className="relative w-full flex justify-between items-center px-8 md:px-16 z-10">
                {values.map((value, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <motion.div 
                      key={index}
                      className="relative"
                      onClick={() => setActiveIndex(index)}
                    >
                      {/* Connection line with animated progress */}
                      {index < values.length - 1 && (
                        <motion.div 
                          className="absolute top-1/2 left-1/2 h-px bg-gradient-to-r from-white/40 to-white/10"
                          style={{
                            width: "calc(100vw / 6)",
                            transformOrigin: "left",
                            scaleX: index < activeIndex ? 1 : 0,
                            opacity: index < activeIndex ? 1 : 0.3
                          }}
                          animate={{
                            scaleX: index < activeIndex ? 1 : 0,
                            opacity: index < activeIndex ? 1 : 0.3
                          }}
                          transition={{ duration: 0.8 }}
                        />
                      )}
                      
                      {/* Point marker */}
                      <motion.button
                        className={cn(
                          "w-5 h-5 rounded-full border-2 relative z-20 transition-all duration-500 cursor-pointer",
                          isActive 
                            ? "border-white bg-white" 
                            : index < activeIndex 
                              ? "border-white/70 bg-white/70" 
                              : "border-white/30 bg-transparent"
                        )}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                          boxShadow: isActive 
                            ? ["0 0 0px rgba(255,255,255,0.5)", "0 0 10px rgba(255,255,255,0.7)", "0 0 0px rgba(255,255,255,0.5)"] 
                            : "none"
                        }}
                        transition={{ boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
                      >
                        {/* Inner pulse for active point */}
                        {isActive && (
                          <motion.div 
                            className="absolute inset-0 rounded-full bg-white"
                            animate={{ 
                              scale: [1, 1.8, 1],
                              opacity: [1, 0, 1]
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        )}
                      </motion.button>
                      
                      {/* Value symbol */}
                      <motion.div 
                        className="absolute top-8 left-1/2 -translate-x-1/2 text-lg opacity-0"
                        animate={{ 
                          opacity: isActive ? 1 : 0,
                          y: isActive ? [0, -5, 0] : 0
                        }}
                        transition={{ 
                          opacity: { duration: 0.3 },
                          y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        }}
                      >
                        <span className="text-white">{value.symbol}</span>
                      </motion.div>
                      
                      {/* Value name - appears on hover */}
                      <motion.div 
                        className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap"
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="text-white/60">{value.name}</span>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Interactive value selection */}
          <div className="w-full max-w-4xl mx-auto">
            {/* Value selector - interactive glowing buttons */}
            <div className="flex flex-wrap justify-center gap-5 mb-20">
              {values.map((value, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "group relative overflow-hidden",
                    "px-5 py-3 md:px-7 md:py-4 text-lg md:text-xl font-medium rounded-full transition-all duration-700",
                    index === activeIndex 
                      ? "bg-white/5 text-white border-white border shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                      : "bg-transparent border border-white/10 text-white/40 hover:text-white/90"
                  )}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    boxShadow: index === activeIndex 
                      ? "0 0 20px rgba(255,255,255,0.2), 0 0 30px rgba(255,255,255,0.1), 0 0 40px rgba(255,255,255,0.05)"
                      : "none"
                  }}
                >
                  <span className="relative z-10">{value.name}</span>
                  <motion.div 
                    className="absolute inset-0 -z-10 bg-gradient-to-r from-white/5 via-white/10 to-white/5" 
                    initial={false}
                    animate={index === activeIndex 
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.95 }
                    }
                    style={{
                      opacity: index === activeIndex ? 1 : 0
                    }}
                    transition={{ duration: 0.7 }}
                  />
                  
                  {/* Radial gradient for active item */}
                  {index === activeIndex && (
                    <motion.div 
                      className="absolute inset-0 -z-20 opacity-60"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.6 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                      style={{
                        background: `radial-gradient(circle at center, rgba(${value.color}, 0.2) 0%, rgba(${value.color}, 0) 70%)`
                      }}
                    />
                  )}
                  
                  {/* Animated border for active item */}
                  {index === activeIndex && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-[2px] bg-white"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
            
            {/* Selected value visualization with 3D effect */}
            <div className="perspective-1000">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeIndex}
                  initial={{ opacity: 0, rotateX: 20, y: 50 }}
                  animate={{ opacity: 1, rotateX: 0, y: 0 }}
                  exit={{ opacity: 0, rotateX: -20, y: -50 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                  className="relative"
                >
                  {/* 3D Showcase with glow effect */}
                  <div className="relative flex justify-center items-center mb-16">
                    <motion.div 
                      className="relative flex items-center justify-center w-40 h-40 rounded-full bg-black"
                      animate={{ 
                        boxShadow: [
                          "0 0 30px rgba(255, 255, 255, 0.1)", 
                          "0 0 60px rgba(255, 255, 255, 0.2)", 
                          "0 0 30px rgba(255, 255, 255, 0.1)"
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="absolute inset-5 rounded-full border border-white/10"></div>
                      <div className="absolute inset-10 rounded-full border border-white/5"></div>
                      
                      <motion.div 
                        className="text-6xl text-white"
                        animate={{ 
                          rotateY: [0, 360],
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{ 
                          rotateY: { duration: 10, repeat: Infinity, ease: "linear" },
                          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                          opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                        }}
                        style={{
                          transformStyle: "preserve-3d"
                        }}
                      >
                        {values[activeIndex].symbol}
                      </motion.div>
                      
                      <motion.div 
                        className="absolute inset-0 rounded-full"
                        animate={{ 
                          background: [
                            `radial-gradient(circle at 30% 30%, rgba(${values[activeIndex].color}, 0.3) 0%, rgba(0,0,0,0) 70%)`,
                            `radial-gradient(circle at 70% 70%, rgba(${values[activeIndex].color}, 0.3) 0%, rgba(0,0,0,0) 70%)`,
                            `radial-gradient(circle at 30% 30%, rgba(${values[activeIndex].color}, 0.3) 0%, rgba(0,0,0,0) 70%)`
                          ]
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </motion.div>
                    
                    {/* Orbiting particles */}
                    {Array.from({ length: 8 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute rounded-full bg-white w-1.5 h-1.5"
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 15 + i,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        style={{
                          width: 3 + i % 3,
                          height: 3 + i % 3,
                          transformOrigin: "center center",
                          pathLength: 1,
                          offsetDistance: `${i * (100 / 8)}%`,
                          offsetPath: `path('M 0, 0 m -120, 0 a 120, 120 0 1, 0 240, 0 a 120, 120 0 1, 0 -240, 0')`,
                          opacity: 0.3 + (i % 4) * 0.1
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Value description with animated text */}
                  <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <motion.h3 
                      className="text-3xl md:text-5xl font-bold mb-6 inline-block relative"
                      animate={{ 
                        filter: ["blur(0px)", "blur(0.5px)", "blur(0px)"]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <motion.span 
                        className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent"
                      >
                        {values[activeIndex].name}
                      </motion.span>
                      <motion.span 
                        className="absolute bottom-0 left-0 h-[1px] bg-white/40"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </motion.h3>
                    
                    <div className="max-w-2xl mx-auto">
                      <motion.p 
                        className="text-lg md:text-xl text-white/70 mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                      >
                        {values[activeIndex].description}
                      </motion.p>
                      
                      <motion.p 
                        className="text-base text-white/50 italic"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.6 }}
                      >
                        {values[activeIndex].detail}
                      </motion.p>
                    </div>
                  </motion.div>
                  
                  {/* Interactive keywords */}
                  <motion.div 
                    className="flex flex-wrap justify-center gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    {values[activeIndex].keywords.map((keyword, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                        className="px-4 py-2 border border-white/10 rounded-full text-white/60 text-sm backdrop-blur-sm hover:border-white/30 hover:text-white/90 transition-all duration-300 cursor-pointer relative"
                        onMouseEnter={() => handleTooltipEnter(keyword, i)}
                        onMouseLeave={handleTooltipLeave}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {keyword}
                        
                        {/* Hover effect */}
                        <motion.div 
                          className="absolute inset-0 -z-10 rounded-full bg-white/5 opacity-0"
                          whileHover={{ opacity: 1 }}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Inspirational quote with typewriter effect */}
            <motion.div 
              className="mt-20 text-center max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1.5 }}
            >
              <blockquote className="text-xl md:text-2xl italic text-white/40 relative z-10">
                <motion.div 
                  className="absolute -z-10 w-32 h-32 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  animate={{ 
                    boxShadow: [
                      "0 0 30px rgba(255, 255, 255, 0.05)", 
                      "0 0 60px rgba(255, 255, 255, 0.08)", 
                      "0 0 30px rgba(255, 255, 255, 0.05)"
                    ]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
                &ldquo;Nos valeurs sont le reflet de notre engagement envers l'excellence et la créativité, guidant chaque décision et chaque projet.&rdquo;
              </blockquote>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bg-black/80 backdrop-blur-md px-4 py-2 rounded-md border border-white/20 text-white text-sm z-50 pointer-events-none"
            style={{
              left: `${tooltipPosition.x + 15}px`,
              top: `${tooltipPosition.y + 15}px`,
            }}
          >
            {tooltipContent}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
