"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useAnimation } from 'framer-motion';
import Image from 'next/image';

// Données des filiales avec leurs couleurs spécifiques
const subsidiaries = [
  {
    id: "genius",
    name: "Genius Ad District",
    shortName: "GENIUS",
    logo: "/item_images/logo_filiale_rectangulaire/logo_genius_black.png",
    description: "Hub central d'innovation et de création publicitaire.",
    color: "#000000",
    position: "center",
    size: 1.2,
  },
  {
    id: "mps",
    name: "MPS",
    shortName: "MPS",
    logo: "/item_images/logo_filiale_rectangulaire/logo_mps.png",
    description: "Solutions marketing et publicitaires digitales innovantes.",
    color: "#0066FF",
    position: "top-right",
    connectionStrength: 0.9,
    size: 1,
  },
  {
    id: "labrigad",
    name: "LABRIG'Ad",
    shortName: "LABRIG'Ad",
    logo: "/item_images/logo_filiale_rectangulaire/logo_labrigad.png",
    description: "Expériences immersives et contenu créatif de haute qualité.",
    color: "#FF3300", 
    position: "top-left",
    connectionStrength: 0.85,
    size: 1,
  },
  {
    id: "gamius",
    name: "Gamius",
    shortName: "Gamius",
    logo: "/item_images/logo_filiale_rectangulaire/logo_gamius.png",
    description: "Solutions gamifiées et expériences interactives engageantes.",
    color: "#9933FF",
    position: "bottom-left",
    connectionStrength: 0.7,
    size: 0.9,
  },
  {
    id: "moujeleell",
    name: "Mouje & Leell",
    shortName: "Mouje & Leell",
    logo: "/item_images/logo_filiale_rectangulaire/logo_moujeleell.png",
    description: "Animation et production visuelle haut de gamme.",
    color: "#00CC66",
    position: "bottom-right",
    connectionStrength: 0.8,
    size: 0.9,
  }
];

// Positions des filiales autour du centre
const positionMap = {
  "center": { x: 0, y: 0 },
  "top-right": { x: 180, y: -180 },
  "top-left": { x: -180, y: -180 },
  "bottom-right": { x: 180, y: 180 },
  "bottom-left": { x: -180, y: 180 },
};

export default function AppleEcosystemShowcase() {
  const [activeSubsidiary, setActiveSubsidiary] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [showEcosystem, setShowEcosystem] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const controls = useAnimation();

  // Gestion de l'intro et de la transition vers l'écosystème
  useEffect(() => {
    if (isInView) {
      // Animation d'intro
      const introTimer = setTimeout(() => {
        setShowIntro(false);
        // Animation de transition
        const ecosystemTimer = setTimeout(() => {
          setShowEcosystem(true);
          controls.start("visible");
        }, 800);
        
        return () => clearTimeout(ecosystemTimer);
      }, 4000);
      
      return () => clearTimeout(introTimer);
    }
  }, [isInView, controls]);

  // Variantes d'animation pour le conteneur
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  // Variantes d'animation pour les filiales
  const subsidiaryVariants = {
    hidden: { opacity: 0, scale: 0.8, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      scale: 1, 
      filter: "blur(0px)",
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.8 
      }
    }
  };

  // Variantes d'animation pour les connections
  const connectionVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 0.7,
      transition: { 
        duration: 1.5, 
        ease: "easeInOut",
        delay: 1.2
      }
    }
  };

  // Variantes d'animation pour le texte d'intro
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.6
      }
    }
  };

  // Variantes d'animation pour les lignes de texte
  const lineVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  // Animation d'introduction
  const renderIntro = () => (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center bg-white z-30"
      variants={textVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="max-w-2xl text-center px-6">
        <motion.h3 
          className="text-2xl font-bold text-gray-900 mb-6"
          variants={lineVariants}
        >
          Synergie des Expertises
        </motion.h3>
        <motion.p 
          className="text-gray-700 leading-relaxed text-lg mb-2"
          variants={lineVariants}
        >
          <span className="font-semibold">Ce que </span>
          <motion.span 
            className="font-semibold"
            animate={{ 
              color: ["#000000", "#000000"],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, times: [0, 0.5, 1], repeat: 0 }}
          >
            GENIUS
          </motion.span>
          <span className="font-semibold"> conçoit,</span>
        </motion.p>
        
        <motion.p 
          className="text-gray-700 leading-relaxed text-lg mb-2" 
          variants={lineVariants}
        >
          <motion.span 
            className="font-semibold"
            animate={{ 
              color: ["#0066FF", "#0066FF"],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, delay: 0.5, times: [0, 0.5, 1], repeat: 0 }}
          >
            MPS
          </motion.span>
          <span className="font-semibold"> produit</span> et
        </motion.p>
        
        <motion.p 
          className="text-gray-700 leading-relaxed text-lg mb-2"
          variants={lineVariants}
        >
          <motion.span 
            className="font-semibold"
            animate={{ 
              color: ["#FF3300", "#FF3300"],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, delay: 1, times: [0, 0.5, 1], repeat: 0 }}
          >
            LABRIG'Ad
          </motion.span>
          <span className="font-semibold"> déploie,</span>
        </motion.p>
        
        <motion.p 
          className="text-gray-700 leading-relaxed text-lg"
          variants={lineVariants}
        >
          tandis que 
          <motion.span 
            className="font-semibold"
            animate={{ 
              color: ["#9933FF", "#9933FF"],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, delay: 1.5, times: [0, 0.5, 1], repeat: 0 }}
          >
            Gamius
          </motion.span>
          {" "}et{" "}
          <motion.span 
            className="font-semibold"
            animate={{ 
              color: ["#00CC66", "#00CC66"],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, delay: 2, times: [0, 0.5, 1], repeat: 0 }}
          >
            Mouje & Leell
          </motion.span>
          {" "}apportent leur expertise spécifique pour créer des expériences complètes et cohérentes.
        </motion.p>
      </div>
    </motion.div>
  );

  // Calcul de la position des filiales
  const getPosition = (position: string) => {
    const pos = positionMap[position as keyof typeof positionMap];
    return pos;
  };

  // Rendu de l'écosystème
  const renderEcosystem = () => (
    <motion.div 
      className="relative w-full h-full flex items-center justify-center"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {/* Fond avec effet de glassmorphism */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-80"></div>
      
      {/* Grille arrière-plan style Apple */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10"></div>

      {/* Overlay circulaire lumineux */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-white to-transparent opacity-40 blur-2xl"></div>
      
      {/* Connections entre filiales */}
      <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
        {subsidiaries
          .filter(sub => sub.id !== "genius")
          .map((subsidiary) => {
            const centerX = "50%";
            const centerY = "50%";
            const position = getPosition(subsidiary.position);
            const targetX = `calc(50% + ${position.x}px)`;
            const targetY = `calc(50% + ${position.y}px)`;
            
            return (
              <motion.path
                key={subsidiary.id}
                d={`M ${centerX} ${centerY} L ${targetX} ${targetY}`}
                stroke={subsidiary.color}
                strokeWidth={activeSubsidiary === subsidiary.id ? 3 : 2}
                strokeLinecap="round"
                fill="none"
                variants={connectionVariants}
                style={{
                  filter: `drop-shadow(0 0 8px ${subsidiary.color}40)`,
                }}
                initial="hidden"
                animate="visible"
              />
            );
          })}
      </svg>
      
      {/* Nœud central Genius */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
        variants={subsidiaryVariants}
        whileHover={{ scale: 1.05 }}
        onClick={() => setActiveSubsidiary("genius")}
      >
        <div 
          className={`relative flex items-center justify-center w-48 h-48 rounded-full bg-white shadow-xl
           ${activeSubsidiary === "genius" ? "ring-4 ring-black ring-opacity-70" : ""}
          `}
          style={{ 
            boxShadow: `0 10px 50px rgba(0, 0, 0, 0.2)` 
          }}
        >
          {/* Effet de halo */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 opacity-70"></div>
          
          {/* Logo de Genius */}
          <div className="relative w-32 h-32 flex items-center justify-center">
            <Image
              src="/item_images/logo_filiale_rectangulaire/logo_genius_black.png"
              alt="Genius Ad District"
              width={180}
              height={90}
              className="object-contain"
              priority={true}
            />
          </div>
          
          {/* Orbite lumineuse autour de Genius */}
          <div 
            className="absolute -inset-4 rounded-full border-2 border-gray-200 opacity-40"
            style={{ 
              animation: "spin 20s linear infinite",
            }}
          ></div>
        </div>
        
        {/* Nom et description */}
        <motion.div 
          className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center w-64"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <h3 className="text-xl font-bold text-gray-900">Genius Ad District</h3>
          <p className="text-sm text-gray-700 mt-1">Hub central d'innovation</p>
        </motion.div>
      </motion.div>
      
      {/* Filiales orbitales */}
      {subsidiaries
        .filter(sub => sub.id !== "genius")
        .map((subsidiary) => {
          const position = getPosition(subsidiary.position);
          const isActive = activeSubsidiary === subsidiary.id;
          
          return (
            <motion.div
              key={subsidiary.id}
              className="absolute top-1/2 left-1/2 z-10"
              style={{ 
                translateX: `calc(-50% + ${position.x}px)`,
                translateY: `calc(-50% + ${position.y}px)`,
              }}
              variants={subsidiaryVariants}
              whileHover={{ scale: 1.1 }}
              onClick={() => setActiveSubsidiary(subsidiary.id)}
            >
              <div 
                className={`relative flex items-center justify-center w-32 h-32 rounded-full bg-white shadow-lg
                  ${isActive ? `ring-4 ring-opacity-70` : ""}
                `}
                style={{ 
                  boxShadow: `0 5px 30px ${subsidiary.color}30`,
                  borderColor: subsidiary.color,
                  borderWidth: isActive ? '3px' : '0px',
                }}
              >
                {/* Effet de halo avec la couleur de la filiale */}
                <div 
                  className="absolute inset-0 rounded-full opacity-10"
                  style={{ backgroundColor: subsidiary.color }}
                ></div>
                
                {/* Logo de la filiale */}
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <Image
                    src={subsidiary.logo}
                    alt={subsidiary.name}
                    width={120}
                    height={60}
                    className="object-contain"
                  />
                </div>
                
                {/* Effet de pulse si actif */}
                {isActive && (
                  <div 
                    className="absolute -inset-3 rounded-full border-2 opacity-40"
                    style={{ 
                      borderColor: subsidiary.color,
                      animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
                    }}
                  ></div>
                )}
              </div>
              
              {/* Nom de la filiale */}
              <motion.div 
                className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-center w-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7 }}
              >
                <h4 
                  className="text-base font-semibold"
                  style={{ color: isActive ? subsidiary.color : "#374151" }}
                >
                  {subsidiary.shortName}
                </h4>
                {isActive && (
                  <p className="text-xs text-gray-700 mt-1">{subsidiary.description}</p>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      
      {/* Description active */}
      <AnimatePresence mode="wait">
        {activeSubsidiary && (
          <motion.div
            key={activeSubsidiary}
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
          >
            <div className="bg-white bg-opacity-80 backdrop-blur-md p-5 rounded-xl shadow-lg border border-gray-100">
              {subsidiaries.find(s => s.id === activeSubsidiary)?.description}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="relative min-h-[80vh] overflow-hidden">
        <AnimatePresence>
          {showIntro && renderIntro()}
        </AnimatePresence>
        
        {showEcosystem && renderEcosystem()}
      </div>
      
      {/* Styles spécifiques */}
      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
