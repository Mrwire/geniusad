'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SubsidiaryProps {
  id: string;
  name: string;
  logo: string;
  color: string;
  description: string;
  link: string;
  linkText: string;
  expertise: string[];
  role: string;
  connections: string[]; // IDs of connected subsidiaries
}

// Configuration des positions des filiales dans une mise en page stratégique
const getPosition = (id: string, isMobile: boolean) => {
  if (isMobile) {
    switch (id) {
      case 'genius': return { top: '50%', left: '50%' };
      case 'mps': return { top: '20%', left: '30%' };
      case 'labrigad': return { top: '20%', left: '70%' };
      case 'gamius': return { top: '80%', left: '30%' };
      case 'moujeleell': return { top: '80%', left: '70%' };
      default: return { top: '50%', left: '50%' };
    }
  } else {
    switch (id) {
      case 'genius': return { top: '50%', left: '50%' };
      case 'mps': return { top: '25%', left: '25%' };
      case 'labrigad': return { top: '25%', left: '75%' };
      case 'gamius': return { top: '75%', left: '25%' };
      case 'moujeleell': return { top: '75%', left: '75%' };
      default: return { top: '50%', left: '50%' };
    }
  }
};

const subsidiaries: SubsidiaryProps[] = [
  {
    id: 'genius',
    name: 'GENIUS AD DISTRICT',
    logo: '/item_images/logo/genius_black.png',
    color: '#000000',
    description: 'Au cœur de l\'écosystème, GENIUS coordonne et intègre les expertises des filiales pour vous offrir une approche globale et cohérente.',
    link: '/',
    linkText: 'L\'ADN du Groupe',
    expertise: ['Stratégie', 'Innovation', 'Direction Créative', 'Conception'],
    role: 'CRÉATION',
    connections: ['mps', 'labrigad', 'gamius', 'moujeleell'],
  },
  {
    id: 'mps',
    name: 'MPS',
    logo: '/item_images/logo/MPS-logo-421x245.png',
    color: '#0066FF',
    description: 'Experte en production événementielle, MPS apporte son savoir-faire technique et logistique pour concrétiser vos concepts créatifs avec excellence et précision.',
    link: '/filiales/mps',
    linkText: 'Découvrir MPS',
    expertise: ['Événementiel', 'Production Technique', 'Logistique', 'Gestion de Projet'],
    role: 'PRODUCTION',
    connections: ['genius', 'labrigad'],
  },
  {
    id: 'labrigad',
    name: 'LABRIG\'Ad',
    logo: '/item_images/logo/labrigad-logo-600x244.png',
    color: '#FF3300',
    description: 'Spécialiste du déploiement terrain, LABRIG\'Ad assure une présence physique impactante de votre marque lors d\'événements, créant des connexions mémorables avec votre public.',
    link: '/filiales/labrigad',
    linkText: 'Découvrir LABRIG\'Ad',
    expertise: ['Street Marketing', 'Activation', 'Promotion', 'Présence Terrain'],
    role: 'DÉPLOIEMENT',
    connections: ['genius', 'mps'],
  },
  {
    id: 'gamius',
    name: 'Gamius',
    logo: '/item_images/logo/gamiusgroup-631x311.png',
    color: '#9933FF',
    description: 'Référence en gaming et esport, Gamius conçoit des expériences ludiques et immersives pour engager vos audiences et créer des interactions inoubliables à l\'intersection du jeu et de la marque.',
    link: '/filiales/gamius',
    linkText: 'Découvrir Gamius',
    expertise: ['Gaming', 'Esport', 'Expériences Immersives', 'Engagement Numérique'],
    role: 'IMMERSION',
    connections: ['genius', 'moujeleell'],
  },
  {
    id: 'moujeleell',
    name: 'Mouje & Leell',
    logo: '/item_images/logo/genius_black.png', // Remplacer par le bon logo quand disponible
    color: '#00CC66',
    description: 'Studio de design et de création, Mouje & Leell façonne l\'identité visuelle et conceptuelle de vos projets avec audace et créativité, pour des designs qui marquent les esprits.',
    link: '/filiales/moujeleell',
    linkText: 'Découvrir Mouje & Leell',
    expertise: ['Design', 'Direction Artistique', 'Identité Visuelle', 'Création'],
    role: 'DESIGN',
    connections: ['genius', 'gamius'],
  },
];

// Composant de flèche reliant les filiales avec animation de tracé
const ConnectionLine = ({ 
  from, 
  to, 
  isActive, 
  color,
  thickness = 3,
  dashedLine = true,
  animate = true 
}: { 
  from: { top: string, left: string }; 
  to: { top: string, left: string }; 
  isActive: boolean; 
  color: string;
  thickness?: number;
  dashedLine?: boolean;
  animate?: boolean;
}) => {
  // Convertir les pourcentages en nombres pour calculer
  const fromTop = parseFloat(from.top);
  const fromLeft = parseFloat(from.left);
  const toTop = parseFloat(to.top);
  const toLeft = parseFloat(to.left);
  
  // Points pour créer une courbe de Bézier
  const startPoint = `${fromLeft}% ${fromTop}%`;
  const endPoint = `${toLeft}% ${toTop}%`;
  
  // Point de contrôle pour la courbe
  const cx = (fromLeft + toLeft) / 2 + (Math.random() * 5 - 2.5);
  const cy = (fromTop + toTop) / 2 + (Math.random() * 5 - 2.5);
  
  // Path SVG
  const path = `M ${fromLeft}% ${fromTop}% Q ${cx}% ${cy}%, ${toLeft}% ${toTop}%`;
  
  return (
    <motion.path
      d={path}
      initial={animate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 0.4 }}
      animate={{ 
        pathLength: animate ? (isActive ? 1 : 0) : 1, 
        opacity: isActive ? 0.9 : 0.15,
        strokeWidth: isActive ? thickness : thickness * 0.5,
      }}
      transition={{ 
        duration: 0.8, 
        ease: [0.43, 0.13, 0.23, 0.96]
      }}
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeDasharray={dashedLine ? "5 5" : "0"}
      className={isActive ? "filter drop-shadow-md" : ""}
    />
  );
};

// Nœud représentant une filiale
const SubsidiaryNode = ({ 
  subsidiary, 
  isActive, 
  onClick, 
  isMobile,
  isPulsing = false
}: { 
  subsidiary: SubsidiaryProps; 
  isActive: boolean; 
  onClick: () => void; 
  isMobile: boolean;
  isPulsing?: boolean;
}) => {
  const position = getPosition(subsidiary.id, isMobile);
  const isGenius = subsidiary.id === 'genius';
  
  return (
    <motion.div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      style={{ 
        top: position.top, 
        left: position.left, 
        zIndex: isGenius ? 20 : (isActive ? 15 : 10)
      }}
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: isActive ? [0, -5, 0] : 0
      }}
      transition={{ 
        duration: 0.5,
        scale: { duration: 0.5 },
        opacity: { duration: 0.5 },
        y: { repeat: isPulsing ? Infinity : 0, duration: 3, ease: "easeInOut" }
      }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div 
        className={cn(
          "relative rounded-full flex items-center justify-center",
          isGenius 
            ? "w-32 h-32 md:w-40 md:h-40" 
            : "w-20 h-20 md:w-28 md:h-28",
          isActive
            ? "bg-white shadow-xl" 
            : "bg-white/90 shadow-md"
        )}
        animate={{ 
          boxShadow: isActive 
            ? `0 0 0 4px ${subsidiary.color}30, 0 8px 20px rgba(0, 0, 0, 0.1)` 
            : '0 4px 10px rgba(0, 0, 0, 0.05)',
        }}
      >
        {/* Logo */}
        <div className={cn(
          "relative",
          isGenius ? "w-24 h-24 md:w-28 md:h-28" : "w-14 h-14 md:w-20 md:h-20"
        )}>
          <Image
            src={subsidiary.logo}
            alt={subsidiary.name}
            fill
            className="object-contain p-1"
          />
        </div>
        
        {/* Cercle coloré d'indication */}
        <motion.div 
          className="absolute -top-1 -right-1 rounded-full"
          style={{ 
            backgroundColor: subsidiary.color,
            width: isGenius ? '1.5rem' : '1.2rem',
            height: isGenius ? '1.5rem' : '1.2rem',
            border: '2px solid white',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}
          animate={{ 
            scale: isActive ? [1, 1.2, 1] : 1,
          }}
          transition={{ 
            scale: { 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut" 
            } 
          }}
        />

        {/* Role Tag - Only for desktop and active node */}
        {!isMobile && (isGenius || isActive) && (
          <motion.div
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-full px-3 py-1 shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-xs font-bold" style={{ color: subsidiary.color }}>
              {subsidiary.role}
            </span>
          </motion.div>
        )}
        
        {/* Nom de la filiale */}
        <motion.div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 rounded-full px-3 py-1 shadow-md whitespace-nowrap"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-white text-xs md:text-sm font-medium">{subsidiary.name}</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Carte détaillée d'une filiale
const SubsidiaryCard = ({ subsidiary }: { subsidiary: SubsidiaryProps }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-100"
      style={{ 
        boxShadow: `0 10px 30px rgba(0,0,0,0.08), 0 0 0 1px ${subsidiary.color}25`,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="h-2" 
        style={{ 
          background: `linear-gradient(to right, ${subsidiary.color}, ${subsidiary.color}80)` 
        }} 
      />
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900">{subsidiary.name}</h3>
          <div 
            className="flex items-center justify-center rounded-full w-8 h-8 flex-shrink-0"
            style={{ backgroundColor: `${subsidiary.color}20` }}
          >
            <span className="text-sm font-bold" style={{ color: subsidiary.color }}>
              {subsidiary.role.charAt(0)}
            </span>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4">{subsidiary.description}</p>
        
        <div className="mb-5 flex flex-wrap">
          {subsidiary.expertise.map((skill) => (
            <span 
              key={skill} 
              className="text-xs px-2.5 py-1 rounded-full mr-2 mb-1.5"
              style={{ 
                backgroundColor: `${subsidiary.color}15`,
                color: subsidiary.color,
                border: `1px solid ${subsidiary.color}30`,
              }}
            >
              {skill}
            </span>
          ))}
        </div>
        
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Link 
            href={subsidiary.link} 
            className="inline-flex items-center font-medium text-sm px-4 py-2 rounded-full"
            style={{ 
              color: isHovered ? 'white' : subsidiary.color,
              backgroundColor: isHovered ? subsidiary.color : `${subsidiary.color}15`,
              transition: 'all 0.2s ease'
            }}
          >
            {subsidiary.linkText}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="ml-1.5"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Composant principal de l'écosystème
export const EcosystemFiliales: React.FC = () => {
  const [activeSubsidiary, setActiveSubsidiary] = useState<string>('genius');
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1200);
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const controls = useAnimation();
  
  // Animation à l'entrée de la section
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  // Ajustement responsive
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Rotation automatique des filiales
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSubsidiary((current) => {
        const currentIndex = subsidiaries.findIndex(s => s.id === current);
        return subsidiaries[(currentIndex + 1) % subsidiaries.length].id;
      });
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  const isMobile = windowWidth < 768;
  const currentSubsidiary = subsidiaries.find(s => s.id === activeSubsidiary) || subsidiaries[0];
  
  // Déterminer si une connexion est active
  const isConnectionActive = (fromId: string, toId: string) => {
    return activeSubsidiary === fromId || activeSubsidiary === toId;
  };
  
  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-32 relative overflow-hidden"
      style={{ 
        backgroundColor: '#F7F5F0', // Fond blanc cassé
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23ababab' fill-opacity='0.15' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E\")"
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-radial from-gray-200/50 to-transparent opacity-70 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-radial from-gray-300/40 to-transparent opacity-60 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Titre et Introduction */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
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
              className="h-1 w-24 mx-auto bg-black mt-3"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
          </div>
          <p className="text-gray-700 max-w-2xl mx-auto mt-6 text-lg">
            Découvrez comment nos filiales spécialisées fonctionnent en synergie parfaite pour
            offrir une solution complète et innovante à tous vos besoins de communication.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Graphique des connexions - 3 colonnes centrales sur grand écran */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className={`relative mx-auto ${isMobile ? "h-[450px]" : "h-[500px]"}`}>
              {/* SVG pour les connexions */}
              <svg 
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Fond de grille légère */}
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="0.5" />
                </pattern>
                <rect width="100" height="100" fill="url(#grid)" />
                
                {/* Connexions entre filiales */}
                {subsidiaries.map(subsidiary => 
                  subsidiary.connections.map(connectionId => {
                    if (subsidiary.id < connectionId) { // Éviter les doublons
                      const connectedSubsidiary = subsidiaries.find(s => s.id === connectionId);
                      if (connectedSubsidiary) {
                        const fromPos = getPosition(subsidiary.id, isMobile);
                        const toPos = getPosition(connectionId, isMobile);
                        
                        const isActive = isConnectionActive(subsidiary.id, connectionId);
                        const connectionColor = activeSubsidiary === subsidiary.id 
                          ? subsidiary.color 
                          : activeSubsidiary === connectionId 
                            ? connectedSubsidiary.color 
                            : '#CCCCCC';
                            
                        return (
                          <ConnectionLine 
                            key={`${subsidiary.id}-${connectionId}`}
                            from={fromPos}
                            to={toPos}
                            isActive={isActive}
                            color={connectionColor}
                            dashedLine={connectionId !== 'genius' && subsidiary.id !== 'genius'}
                          />
                        );
                      }
                    }
                    return null;
                  })
                )}
                
                {/* Cercle central de fond pour GENIUS */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="15"
                  fill="rgba(0,0,0,0.03)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </svg>
              
              {/* Nœuds des filiales */}
              {subsidiaries.map(subsidiary => (
                <SubsidiaryNode 
                  key={subsidiary.id}
                  subsidiary={subsidiary}
                  isActive={activeSubsidiary === subsidiary.id}
                  onClick={() => setActiveSubsidiary(subsidiary.id)}
                  isMobile={isMobile}
                  isPulsing={true}
                />
              ))}
            </div>
          </div>
          
          {/* Carte de la filiale sélectionnée - 2 colonnes sur grand écran */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <SubsidiaryCard key={activeSubsidiary} subsidiary={currentSubsidiary} />
            </AnimatePresence>
            
            {/* Légende de la synérgie */}
            <motion.div
              className="mt-8 md:mt-12 p-5 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <h4 className="text-lg font-bold text-gray-900 mb-3">Synergie des Expertises</h4>
              <p className="text-gray-700 leading-relaxed">
                <span className="font-semibold">Ce que GENIUS conçoit</span>, 
                <span className="text-[#0066FF] font-semibold"> MPS produit</span> et 
                <span className="text-[#FF3300] font-semibold"> LABRIG'Ad déploie</span>, 
                tandis que <span className="text-[#9933FF] font-semibold">Gamius</span> et 
                <span className="text-[#00CC66] font-semibold"> Mouje & Leell</span> apportent 
                leur expertise spécifique pour créer des expériences complètes et cohérentes.
              </p>
            </motion.div>
          </div>
        </div>
        
        {/* Citation en bas de page */}
        <motion.div
          className="text-center max-w-2xl mx-auto mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.7 }}
        >
          <p className="italic text-xl text-gray-700">
            "Un écosystème créatif où chaque filiale apporte sa pierre à l'édifice,
            <br className="hidden md:block" /> créant ensemble une expérience complète et cohérente."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default EcosystemFiliales;
