'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useAnimation, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

// Types
interface SubsidiaryData {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  color: string;
  description: string;
  link: string;
  linkText: string;
  expertise: string[];
  role: string;
  impact: number;
  connections: Connection[];
}

interface Connection {
  target: string;
  strength: number;
  description: string;
}

// Données des filiales avec les chemins d'accès corrects pour les logos rectangulaires
const subsidiariesData: SubsidiaryData[] = [
  {
    id: 'genius',
    name: 'GENIUS AD DISTRICT',
    shortName: 'GENIUS',
    logo: '/item_images/logo_filiale_rectangulaire/logo_genius.png',
    color: '#000000',
    description: 'Au cœur de l\'écosystème, GENIUS AD DISTRICT orchestre l\'ensemble des expertises. Notre vision stratégique et créative coordonne les forces de chaque filiale pour livrer des solutions complètes et innovantes.',
    link: '/',
    linkText: 'Découvrir notre écosystème',
    expertise: ['Stratégie', 'Innovation', 'Direction Créative', 'Conception Globale'],
    role: 'CONCEPTEUR',
    impact: 10,
    connections: [
      { target: 'mps', strength: 9, description: 'Génère les concepts que MPS transforme en réalité' },
      { target: 'labrigad', strength: 8, description: 'Définit les stratégies que LABRIG\'Ad exécute sur le terrain' },
      { target: 'gamius', strength: 7, description: 'Intègre l\'expertise gaming de Gamius dans les stratégies globales' },
      { target: 'moujeleell', strength: 9, description: 'Collabore étroitement sur l\'identité visuelle et conceptuelle' }
    ]
  },
  {
    id: 'mps',
    name: 'MPS',
    shortName: 'MPS',
    logo: '/item_images/logo_filiale_rectangulaire/logo_mps.png',
    color: '#E30613',
    description: 'Experte en production événementielle, MPS transforme les concepts en réalités tangibles grâce à son expertise technique et logistique inégalée, garantissant des expériences impeccables.',
    link: '/filiales/mps',
    linkText: 'Explorer MPS',
    expertise: ['Production Technique', 'Logistique', 'Gestion de Projet', 'Exécution'],
    role: 'PRODUCTEUR',
    impact: 8,
    connections: [
      { target: 'genius', strength: 9, description: 'Matérialise les concepts de GENIUS' },
      { target: 'labrigad', strength: 7, description: 'Fournit l\'infrastructure pour les déploiements de LABRIG\'Ad' }
    ]
  },
  {
    id: 'labrigad',
    name: 'LABRIG\'Ad',
    shortName: 'LABRIG\'AD',
    logo: '/item_images/logo_filiale_rectangulaire/logo_labrigad.png',
    color: '#FF0000',
    description: 'Spécialiste du déploiement terrain, LABRIG\'Ad maximise l\'impact de votre marque à travers des activations impactantes et des interactions directes avec votre public cible.',
    link: '/filiales/labrigad',
    linkText: 'Découvrir LABRIG\'Ad',
    expertise: ['Street Marketing', 'Activation Terrain', 'Déploiement', 'Promotion'],
    role: 'ACTIVATEUR',
    impact: 7,
    connections: [
      { target: 'genius', strength: 8, description: 'Exécute les stratégies terrain définies par GENIUS' },
      { target: 'mps', strength: 7, description: 'Déploie les infrastructures produites par MPS' }
    ]
  },
  {
    id: 'gamius',
    name: 'Gamius',
    shortName: 'GAMIUS',
    logo: '/item_images/logo_filiale_rectangulaire/logo_gamius.png',
    color: '#FFD700',
    description: 'Gamius transforme vos objectifs en expériences ludiques et engageantes, créant des interactions mémorables avec votre audience grâce à la gamification et aux technologies immersives.',
    link: '/filiales/gamius',
    linkText: 'Jouer avec Gamius',
    expertise: ['Gamification', 'Expériences Interactives', 'Technologies Immersives', 'Engagement'],
    role: 'IMMERSEUR',
    impact: 6,
    connections: [
      { target: 'genius', strength: 7, description: 'Apporte son expertise gaming aux stratégies de GENIUS' },
      { target: 'moujeleell', strength: 6, description: 'Combine design et immersion avec Mouje & Leell' }
    ]
  },
  {
    id: 'moujeleell',
    name: 'Mouje & Leell',
    shortName: 'MOUJE & LEELL',
    logo: '/item_images/logo_filiale_rectangulaire/logo_mooj&leel.png',
    color: '#000000',
    description: 'Atelier de mobilier sur mesure, Mouje & Leell façonne des pièces uniques et des aménagements d\'espace qui allient fonctionnalité et design, pour des expériences sensorielles inoubliables.',
    link: '/filiales/moujeleell',
    linkText: 'Découvrir Mouje & Leell',
    expertise: ['Design d\'Espace', 'Mobilier Sur Mesure', 'Aménagement', 'Expérience Sensorielle'],
    role: 'DESIGNER',
    impact: 6,
    connections: [
      { target: 'genius', strength: 9, description: 'Collabore sur l\'aménagement des espaces des projets GENIUS' },
      { target: 'gamius', strength: 6, description: 'Conçoit des environnements physiques pour les expériences Gamius' }
    ]
  },
];

// Positions optimisées avec beaucoup plus d'espace entre les nœuds pour une meilleure lisibilité
const getHexPosition = (id: string, isMobile: boolean = false) => {
  if (isMobile) {
    // Mobile: Distribution en forme d'étoile pour éviter les chevauchements
    switch (id) {
      case 'genius': return { x: 50, y: 20 }; // Centre, légèrement plus bas
      case 'mps': return { x: 25, y: 40 }; // Plus à gauche et plus bas
      case 'labrigad': return { x: 75, y: 40 }; // Plus à droite et plus bas
      case 'gamius': return { x: 35, y: 70 }; // En bas à gauche
      case 'moujeleell': return { x: 65, y: 70 }; // En bas à droite
      default: return { x: 50, y: 50 };
    }
  } else {
    // Desktop: Disposition pentagonale pour maximiser l'espace
    switch (id) {
      case 'genius': return { x: 50, y: 30 }; // Centre, légèrement plus bas
      case 'mps': return { x: 15, y: 35 }; // Gauche
      case 'labrigad': return { x: 85, y: 35 }; // Droite 
      case 'gamius': return { x: 30, y: 75 }; // Bas gauche
      case 'moujeleell': return { x: 70, y: 75 }; // Bas droite
      default: return { x: 50, y: 50 };
    }
  }
};

// Composant pour un nœud hexagonal représentant une filiale
const HexagonNode = ({ 
  subsidiary,
  isActive,
  isConnected,
  onClick,
  isMobile
}: { 
  subsidiary: SubsidiaryData;
  isActive: boolean;
  isConnected: boolean;
  onClick: () => void;
  isMobile: boolean;
}) => {
  const position = getHexPosition(subsidiary.id, isMobile);
  const isCenter = subsidiary.id === 'genius';
  
  // Tailles plus grandes pour garantir une bonne visibilité des logos
  const baseSize = isCenter ? 180 : 150;
  const size = isMobile 
    ? (isCenter ? 140 : 110) // Plus grand en mobile aussi
    : baseSize;
    
  const variants = {
    initial: { 
      scale: 0.8, 
      opacity: 0,
      y: 20
    },
    animate: { 
      scale: 1, 
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 30,
        delay: 0.2 + (isCenter ? 0 : (subsidiary.impact / 20))
      }
    },
    active: {
      scale: 1.1,
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    },
    inactive: {
      scale: isConnected ? 0.95 : 0.85,
      opacity: isConnected ? 1 : 0.7,
      transition: { 
        duration: 0.4,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: { duration: 0.2 }
    }
  };
  
  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        top: `${position.y}%`,
        left: `${position.x}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: isActive ? 30 : (isConnected ? 20 : 10),
        willChange: 'transform, opacity, filter'
      }}
      initial="initial"
      animate="animate"
      onClick={onClick}
      whileHover="hover"
      variants={variants}
    >
      <motion.div
        className="relative"
        variants={{
          active: variants.active,
          inactive: variants.inactive
        }}
        animate={isActive ? 'active' : 'inactive'}
      >
        {/* Hexagone avec effet néomorphique */}
        <div className="relative">
          <div 
            className="flex items-center justify-center rounded-lg transform rotate-45 overflow-hidden"
            style={{
              width: size,
              height: size,
              background: isActive 
                ? `linear-gradient(135deg, ${subsidiary.color}40, ${subsidiary.color}60)`
                : 'linear-gradient(135deg, #ffffff, #f5f5f5)',
              // Dégradé plus contrasté pour mieux différencier les nœuds
              border: `3px solid ${isActive ? subsidiary.color : 'rgba(200,200,200,0.8)'}`,
              boxShadow: isActive 
                ? `0 10px 30px rgba(0,0,0,0.2), 0 0 15px ${subsidiary.color}50` 
                : '0 10px 30px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
            }}
          >
            {/* Container pour le logo avec fond blanc garanti */}
            <div 
              className="transform -rotate-45 flex items-center justify-center"
            >
              <div 
                className="relative" 
                style={{ 
                  width: size * 0.85, 
                  height: size * 0.5,
                  backgroundColor: '#000000',      // Fond noir pour faire ressortir les logos
                  borderRadius: '10px',            // Coins arrondis
                  boxShadow: '0 3px 15px rgba(0,0,0,0.2)', // Ombre plus prononcée
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px',
                  overflow: 'hidden'
                }}
              >
                <div 
                  className="relative" 
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    margin: '0 auto'
                  }}
                >
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#000000',
                    padding: '10px',
                    borderRadius: '8px'
                  }}>
                    <Image
                      src={subsidiary.logo}
                      alt={subsidiary.name}
                      width={size * 0.7}
                      height={size * 0.7}
                      style={{
                        objectFit: 'contain',
                        filter: 'invert(1) brightness(1.1) contrast(1.1)',
                        maxWidth: '100%',
                        maxHeight: '100%',
                        width: 'auto',
                        height: 'auto'
                      }}
                      sizes={`${size * 0.7}px`}
                      priority={isActive}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Glow effect when active */}
          {isActive && (
            <motion.div 
              className="absolute inset-0 rounded-lg transform rotate-45"
              style={{ 
                background: `radial-gradient(circle, ${subsidiary.color}40 0%, transparent 70%)`,
                filter: 'blur(15px)',
                opacity: 0.7
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 1 }}
            />
          )}
          
          {/* Pulse effect for active node */}
          {isActive && (
            <motion.div 
              className="absolute inset-0 rounded-lg transform rotate-45"
              style={{ 
                border: `3px solid ${subsidiary.color}70`,
              }}
              animate={{ 
                scale: [1, 1.15, 1],
                opacity: [0.8, 0.3, 0.8],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
          )}
        </div>
        
        {/* Role Tag */}
        <motion.div
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full shadow-sm"
          style={{ 
            backgroundColor: isActive ? subsidiary.color : 'white',
            border: `1px solid ${isActive ? 'white' : subsidiary.color}20`,
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: isActive ? 1 : (isConnected ? 0.9 : 0.6),
            y: 0 
          }}
          transition={{ duration: 0.3 }}
        >
          <span 
            className="text-xs font-bold"
            style={{ 
              color: isActive ? 'white' : subsidiary.color,
              textShadow: isActive ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            {subsidiary.role}
          </span>
        </motion.div>
        
        {/* Subsidiary Name */}
        <motion.div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full whitespace-nowrap"
          style={{ 
            backgroundColor: 'rgba(30,30,30,0.9)',
            boxShadow: '0 2px 10px rgba(0,0,0,0.15)'
          }}
          initial={{ opacity: 0, y: -5 }}
          animate={{ 
            opacity: isActive ? 1 : (isConnected ? 0.9 : 0.7), 
            y: 0,
            scale: isActive ? 1 : 0.95
          }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-white text-xs md:text-sm font-medium">{subsidiary.shortName}</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default function HexagonEcosystem() {
  const [activeSubsidiary, setActiveSubsidiary] = useState('genius');
  const [hoveredConnection, setHoveredConnection] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  
  const sectionRef = useRef(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const controls = useAnimation();

  // Responsive handling
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Animation trigger when section comes into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  // Auto rotation entre filiales avec délai plus long pour exploration
  useEffect(() => {
    const initialDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setActiveSubsidiary((current) => {
          const currentIndex = subsidiariesData.findIndex(s => s.id === current);
          return subsidiariesData[(currentIndex + 1) % subsidiariesData.length].id;
        });
      }, 10000); // Durée longue entre changements
      
      return () => clearInterval(interval);
    }, 20000); // Délai plus long avant la rotation automatique
    
    return () => clearTimeout(initialDelay);
  }, []);
  
  const isMobile = windowWidth < 768;
  const activeSubsidiaryData = subsidiariesData.find(s => s.id === activeSubsidiary) || subsidiariesData[0];
  
  // Vérifier si un nœud est connecté au nœud actif
  const isNodeConnected = (nodeId: string) => {
    if (nodeId === activeSubsidiary) return true;
    
    const active = subsidiariesData.find(s => s.id === activeSubsidiary);
    if (!active) return false;
    
    return active.connections.some(c => c.target === nodeId) || 
           subsidiariesData.find(s => s.id === nodeId)?.connections.some(c => c.target === activeSubsidiary) || 
           false;
  };
  
  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ 
        backgroundColor: '#F7F5F0', // Fond blanc cassé
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      }}
      id="ecosystem-showcase"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-radial from-gray-200/50 to-transparent opacity-70 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-radial from-gray-300/40 to-transparent opacity-60 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.7, 
                ease: [0.4, 0.0, 0.2, 1]
              }
            }
          }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="inline-block relative">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-3 text-gray-900">
              L'ÉCOSYSTÈME GENIUS
            </h2>
            <motion.div
              className="h-1.5 w-32 mx-auto bg-black mt-3"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              style={{ transformOrigin: "center" }}
            />
          </div>
          <p className="text-gray-700 max-w-2xl mx-auto mt-8 text-lg">
            Découvrez comment nos filiales fonctionnent en synergie parfaite, 
            chacune apportant son expertise unique pour créer un écosystème complet au service 
            de votre succès.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Visualisation interactive - 3 colonnes centrales sur desktop */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div 
              ref={canvasRef}
              className={`relative mx-auto bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-white/70 ${isMobile ? "h-[720px]" : "h-[680px]"}`}
              style={{
                boxShadow: "0 20px 60px -15px rgba(0,0,0,0.15)"
              }}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-30">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="smallGrid" width="12" height="12" patternUnits="userSpaceOnUse">
                      <path d="M 12 0 L 0 0 0 12" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
                    </pattern>
                    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                      <rect width="60" height="60" fill="url(#smallGrid)" />
                      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
              
              {/* SVG pour les connexions avec tracés très visibles */}
              <svg 
                className="absolute inset-0 w-full h-full z-10"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Connexions entre filiales - TRÈS renforcées */}
                {subsidiariesData.map(subsidiary => 
                  subsidiary.connections.map(connection => {
                    const target = subsidiariesData.find(s => s.id === connection.target);
                    if (!target) return null;
                    
                    const fromPos = getHexPosition(subsidiary.id, isMobile);
                    const toPos = getHexPosition(connection.target, isMobile);
                    
                    const isActive = activeSubsidiary === subsidiary.id || activeSubsidiary === connection.target;
                    const connectionColor = activeSubsidiary === subsidiary.id 
                      ? subsidiary.color 
                      : activeSubsidiary === connection.target 
                        ? target.color 
                        : '#CCCCCC';
                    
                    // Points de contrôle pour courbe élégante
                    const dx = toPos.x - fromPos.x;
                    const dy = toPos.y - fromPos.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const curveFactor = distance / 50;
                    
                    // Décalage perpendiculaire pour point de contrôle
                    const midX = (fromPos.x + toPos.x) / 2;
                    const midY = (fromPos.y + toPos.y) / 2;
                    const perpX = -dy * curveFactor;
                    const perpY = dx * curveFactor;
                    
                    // Chemin avec courbe
                    const path = `M ${fromPos.x} ${fromPos.y} Q ${midX + perpX} ${midY + perpY}, ${toPos.x} ${toPos.y}`;
                    
                    const connectionKey = `${subsidiary.id}-${connection.target}`;
                    const isHovered = hoveredConnection === connectionKey;
                    
                    return (
                      <g key={connectionKey} className="connection-group">
                        <motion.path
                          d={path}
                          fill="none"
                          strokeWidth={isActive ? 3 : 1.5}
                          stroke={connectionColor}
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ 
                            pathLength: 1, 
                            opacity: isActive ? 0.8 : 0.2,
                            strokeDasharray: isActive ? "0" : "5 5"
                          }}
                          transition={{ 
                            pathLength: { delay: 0.3, duration: 1.2, ease: "easeInOut" },
                            opacity: { duration: 0.3 }
                          }}
                          onMouseEnter={() => setHoveredConnection(connectionKey)}
                          onMouseLeave={() => setHoveredConnection(null)}
                          style={{ cursor: "pointer" }}
                        />
                        
                        {/* CONNEXIONS ULTRA-VISIBLES */}
                        <>
                          {/* Ligne principale très épaisse - TOUJOURS visible */}
                          <path
                            d={path}
                            fill="none"
                            strokeWidth={8} // Beaucoup plus épais
                            stroke={connectionColor}
                            opacity={isActive ? 1 : 0.4}
                            strokeLinecap="round"
                            strokeDasharray={isActive ? "0" : "10 5"}
                            filter={`drop-shadow(0 0 3px ${connectionColor})`}
                          />
                          
                          {/* Animations uniquement pour connexions actives */}
                          {isActive && (
                            <>
                              {/* Couche de glow lumineuse */}
                              <path
                                d={path}
                                fill="none"
                                strokeWidth="15"
                                stroke={connectionColor}
                                strokeOpacity="0.25"
                                strokeLinecap="round"
                                filter={`drop-shadow(0 0 5px ${connectionColor})`}
                              />
                              
                              {/* Animation du tracé lumineux - TRÈS visible */}
                              <motion.path
                                d={path}
                                fill="none"
                                strokeWidth="12"
                                stroke="white"
                                strokeLinecap="round"
                                filter={`drop-shadow(0 0 8px ${connectionColor})`}
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ 
                                  pathLength: [0, 1],
                                  opacity: [0, 0.9] 
                                }}
                                transition={{ 
                                  repeat: Infinity, 
                                  duration: 1.5,
                                  ease: "easeInOut"
                                }}
                              />
                              
                              {/* GROS points lumineux aux extrémités */}
                              {[fromPos, toPos].map((pos, idx) => (
                                <React.Fragment key={`flash-${idx}`}>
                                  {/* Halo de fond */}
                                  <circle
                                    cx={pos.x}
                                    cy={pos.y}
                                    r="12"
                                    fill={connectionColor}
                                    opacity="0.5"
                                    filter={`drop-shadow(0 0 8px ${connectionColor})`}
                                  />
                                  
                                  {/* Point central */}
                                  <circle
                                    cx={pos.x}
                                    cy={pos.y}
                                    r="6"
                                    fill="white"
                                    filter={`drop-shadow(0 0 5px ${connectionColor})`}
                                  />
                                  
                                  {/* Flash animé */}
                                  <motion.circle
                                    cx={pos.x}
                                    cy={pos.y}
                                    r="8"
                                    fill="white"
                                    filter={`drop-shadow(0 0 10px ${connectionColor})`}
                                    animate={{
                                      scale: [1, 2, 1],
                                      opacity: [1, 0.3, 1]
                                    }}
                                    transition={{ 
                                      duration: 1.5, 
                                      repeat: Infinity,
                                      ease: "easeInOut" 
                                    }}
                                  />
                                </React.Fragment>
                              ))}
                            </>
                          )}
                        </>
                        
                        {/* Effet hover avec description de connexion */}
                        {isHovered && (
                          <g>
                            <rect
                              x={midX - 100}
                              y={midY - 15}
                              width="200"
                              height="30"
                              rx="15"
                              fill="white"
                              stroke={connectionColor}
                              strokeWidth="1"
                              filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
                            />
                            <text
                              x={midX}
                              y={midY + 5}
                              textAnchor="middle"
                              fill={connectionColor}
                              fontSize="12"
                              fontWeight="500"
                            >
                              {connection.description}
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })
                )}
              </svg>
              
              {/* Hexagones des filiales */}
              <div className="relative z-20 w-full h-full">
                {subsidiariesData.map(subsidiary => (
                  <HexagonNode
                    key={subsidiary.id}
                    subsidiary={subsidiary}
                    isActive={activeSubsidiary === subsidiary.id}
                    isConnected={isNodeConnected(subsidiary.id)}
                    onClick={() => setActiveSubsidiary(subsidiary.id)}
                    isMobile={isMobile}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Information panel - 2 colonnes sur desktop */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeSubsidiary}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-xl overflow-hidden"
              >
                {/* Subsidiary detail card */}
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                      style={{ backgroundColor: activeSubsidiaryData.color }}
                    >
                      <span className="text-white text-sm font-bold">{activeSubsidiaryData.name.charAt(0)}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{activeSubsidiaryData.name}</h3>
                  </div>
                  
                  {/* Grande image du logo - BIEN PLUS VISIBLE */}
                  <div className="relative w-full h-40 mb-6 bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                    <Image
                      src={activeSubsidiaryData.logo}
                      alt={activeSubsidiaryData.name}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 768px) 100vw, 400px"
                      priority
                    />
                  </div>
                  
                  <p className="text-gray-700 mb-6">{activeSubsidiaryData.description}</p>
                  
                  {/* Expertise list */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">EXPERTISES</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeSubsidiaryData.expertise.map(skill => (
                        <span 
                          key={skill}
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ 
                            backgroundColor: `${activeSubsidiaryData.color}15`,
                            color: activeSubsidiaryData.color,
                            border: `1px solid ${activeSubsidiaryData.color}30` 
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Connections list */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">CONNEXIONS</h4>
                    <div className="space-y-2">
                      {activeSubsidiaryData.connections.map(connection => {
                        const targetSubsidiary = subsidiariesData.find(s => s.id === connection.target);
                        if (!targetSubsidiary) return null;
                        
                        return (
                          <motion.div 
                            key={connection.target}
                            className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                            whileHover={{ x: 5 }}
                            onClick={() => setActiveSubsidiary(connection.target)}
                          >
                            <div 
                              className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                              style={{ backgroundColor: targetSubsidiary.color }}
                            >
                              <span className="text-white text-sm font-bold">
                                {targetSubsidiary.name.charAt(0)}
                              </span>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{targetSubsidiary.name}</p>
                              <p className="text-xs text-gray-500">{connection.description}</p>
                            </div>
                            <svg 
                              width="16" 
                              height="16" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-gray-400"
                            >
                              <path d="M5 12h14"></path>
                              <path d="m12 5 7 7-7 7"></path>
                            </svg>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Call to action */}
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-4"
                  >
                    <Link 
                      href={activeSubsidiaryData.link} 
                      className="inline-flex items-center justify-center w-full px-5 py-3 rounded-lg font-medium text-sm transition-all duration-300 relative overflow-hidden group"
                      style={{ 
                        backgroundColor: `${activeSubsidiaryData.color}10`,
                        color: activeSubsidiaryData.color,
                        border: `1px solid ${activeSubsidiaryData.color}25`,
                      }}
                    >
                      <span className="relative z-10">{activeSubsidiaryData.linkText}</span>
                      <div 
                        className="absolute inset-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                        style={{ backgroundColor: activeSubsidiaryData.color }}
                      />
                      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity duration-300 z-10">
                        {activeSubsidiaryData.linkText}
                      </span>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Synergy statement */}
            <motion.div
              className="mt-8 p-5 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <h4 className="text-lg font-bold text-gray-900 mb-3">Synergie des Expertises</h4>
              <p className="text-gray-700 leading-relaxed">
                <span className="font-semibold">Ce que GENIUS conçoit</span>, 
                <span className="text-[#E30613] font-semibold"> MPS produit</span> et 
                <span className="text-[#FF0000] font-semibold"> LABRIG'Ad déploie</span>, 
                tandis que <span className="text-[#FFD700] font-semibold">Gamius</span> et 
                <span className="text-[#000000] font-semibold"> Mouje & Leell</span> apportent 
                leur expertise spécifique pour créer des expériences complètes et cohérentes.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
