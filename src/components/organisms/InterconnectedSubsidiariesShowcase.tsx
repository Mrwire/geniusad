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
  connections: string[]; // IDs of connected subsidiaries
  position: 'central' | 'top' | 'right' | 'bottom' | 'left';
}

const subsidiaries: SubsidiaryProps[] = [
  {
    id: 'genius',
    name: 'GENIUS AD DISTRICT',
    logo: '/item_images/logo/genius_black.png',
    color: '#000000',
    description: 'Au cœur de l\'écosystème, GENIUS conçoit des stratégies créatives et innovantes qui se déploient à travers l\'ensemble des filiales du groupe.',
    link: '/',
    linkText: 'Notre Groupe',
    expertise: ['Stratégie', 'Innovation', 'Direction Créative', 'Conception'],
    connections: ['mps', 'labrigad', 'gamius', 'moujeleell'],
    position: 'central',
  },
  {
    id: 'mps',
    name: 'MPS',
    logo: '/item_images/logo/MPS-logo-421x245.png',
    color: '#0066FF',
    description: 'Experte en production événementielle, MPS apporte son savoir-faire technique et logistique pour concrétiser vos concepts créatifs.',
    link: '/filiales/mps',
    linkText: 'Découvrir MPS',
    expertise: ['Production', 'Logistique', 'Événementiel', 'Technique'],
    connections: ['genius', 'labrigad'],
    position: 'top',
  },
  {
    id: 'labrigad',
    name: 'LABRIG\'Ad',
    logo: '/item_images/logo/labrigad-logo-600x244.png',
    color: '#FF3300',
    description: 'Spécialiste du déploiement terrain, LABRIG\'Ad assure une présence physique impactante de votre marque lors d\'événements.',
    link: '/filiales/labrigad',
    linkText: 'Découvrir LABRIG\'Ad',
    expertise: ['Street Marketing', 'Activation', 'Déploiement', 'Promotion'],
    connections: ['genius', 'mps'],
    position: 'right',
  },
  {
    id: 'gamius',
    name: 'Gamius',
    logo: '/item_images/logo/gamiusgroup-631x311.png',
    color: '#9933FF',
    description: 'Référence en gaming et esport, Gamius conçoit des expériences ludiques et immersives pour engager vos audiences.',
    link: '/filiales/gamius',
    linkText: 'Découvrir Gamius',
    expertise: ['Gaming', 'Esport', 'Expériences Immersives', 'Engagement'],
    connections: ['genius', 'moujeleell'],
    position: 'bottom',
  },
  {
    id: 'moujeleell',
    name: 'Mouje & Leell',
    logo: '/item_images/logo/genius_black.png', // Remplacer par le bon logo quand disponible
    color: '#00CC66',
    description: 'Studio de design et de création, Mouje & Leell façonne l\'identité visuelle et conceptuelle de vos projets avec audace.',
    link: '/filiales/moujeleell',
    linkText: 'Découvrir Mouje & Leell',
    expertise: ['Design', 'Direction Artistique', 'Identité Visuelle', 'Création'],
    connections: ['genius', 'gamius'],
    position: 'left',
  },
];

// Fonction pour obtenir les coordonnées de position pour chaque filiale
const getPositionCoordinates = (position: SubsidiaryProps['position'], isMobile: boolean) => {
  if (isMobile) {
    // Version mobile - disposition verticale
    switch (position) {
      case 'central': return { x: '50%', y: '25%' };
      case 'top': return { x: '30%', y: '5%' };
      case 'right': return { x: '70%', y: '40%' };
      case 'bottom': return { x: '50%', y: '65%' };
      case 'left': return { x: '20%', y: '85%' };
      default: return { x: '50%', y: '50%' };
    }
  } else {
    // Version desktop - disposition en étoile
    switch (position) {
      case 'central': return { x: '50%', y: '50%' };
      case 'top': return { x: '50%', y: '15%' };
      case 'right': return { x: '80%', y: '50%' };
      case 'bottom': return { x: '50%', y: '85%' };
      case 'left': return { x: '20%', y: '50%' };
      default: return { x: '50%', y: '50%' };
    }
  }
};

// Composant FlowArrow pour visualiser les connexions entre filiales
const FlowArrow = ({ 
  fromId, 
  toId, 
  isActive, 
  color,
  isMobile
}: { 
  fromId: string; 
  toId: string; 
  isActive: boolean; 
  color: string;
  isMobile: boolean;
}) => {
  const from = subsidiaries.find(s => s.id === fromId);
  const to = subsidiaries.find(s => s.id === toId);
  
  if (!from || !to) return null;
  
  const fromPos = getPositionCoordinates(from.position, isMobile);
  const toPos = getPositionCoordinates(to.position, isMobile);
  
  // Calculer le chemin SVG de la flèche
  const path = `M ${fromPos.x} ${fromPos.y} Q ${(parseFloat(fromPos.x) + parseFloat(toPos.x)) / 2}% ${
    from.position === 'central' || to.position === 'central' 
      ? (parseFloat(fromPos.y) + parseFloat(toPos.y)) / 2
      : (parseFloat(fromPos.y) + parseFloat(toPos.y)) / 2 - 15
  }%, ${toPos.x} ${toPos.y}`;
  
  return (
    <motion.path
      d={path}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ 
        pathLength: isActive ? 1 : 0,
        opacity: isActive ? 1 : 0,
        stroke: color,
      }}
      transition={{ 
        duration: 1.2,
        delay: 0.3,
        ease: [0.43, 0.13, 0.23, 0.96]
      }}
      style={{
        fill: 'none',
        strokeWidth: isActive ? 3 : 1,
        strokeDasharray: '5 5',
      }}
      className="filter drop-shadow-md"
    />
  );
};

// Composant pour afficher une filiale
const SubsidiaryNode = ({ 
  subsidiary, 
  isActive, 
  onClick,
  isMobile
}: { 
  subsidiary: SubsidiaryProps; 
  isActive: boolean; 
  onClick: () => void;
  isMobile: boolean;
}) => {
  const position = getPositionCoordinates(subsidiary.position, isMobile);
  const isGenius = subsidiary.id === 'genius';
  
  return (
    <motion.div 
      className={`absolute ${isGenius ? 'z-20' : 'z-10'}`}
      style={{ 
        left: position.x, 
        top: position.y,
        transform: 'translate(-50%, -50%)',
      }}
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
    >
      <motion.div
        className={cn(
          "relative rounded-full cursor-pointer transition-all duration-500 flex items-center justify-center",
          isGenius 
            ? "w-36 h-36 md:w-48 md:h-48 bg-gray-100" 
            : isActive 
              ? "w-28 h-28 md:w-36 md:h-36 bg-white" 
              : "w-24 h-24 md:w-32 md:h-32 bg-white/90"
        )}
        animate={{ 
          boxShadow: isActive 
            ? `0 0 0 6px rgba(255,255,255,0.3), 0 10px 30px rgba(0,0,0,0.15), 0 0 15px ${subsidiary.color}40`
            : '0 5px 15px rgba(0,0,0,0.1)',
          y: isActive ? [0, -8, 0] : 0,
        }}
        transition={{ 
          boxShadow: { duration: 0.3 },
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        {/* Logo */}
        <div className={cn(
          "relative flex items-center justify-center",
          isGenius ? "w-28 h-28 md:w-36 md:h-36" : "w-20 h-20 md:w-24 md:h-24"
        )}>
          <Image
            src={subsidiary.logo}
            alt={subsidiary.name}
            fill
            className="object-contain p-2"
            sizes="(max-width: 768px) 80px, 120px"
          />
        </div>
        
        {/* Étiquette de nom */}
        <motion.div 
          className={cn(
            "absolute -bottom-8 left-1/2 px-3 py-1 rounded-full bg-gray-800 whitespace-nowrap",
            isGenius ? "font-bold" : "font-medium"
          )}
          animate={{ 
            opacity: isActive ? 1 : 0.7,
            x: '-50%',
            y: isActive ? 0 : 5,
          }}
          initial={{ opacity: 0, y: 10, x: '-50%' }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-white text-xs md:text-sm">{subsidiary.name}</span>
        </motion.div>
        
        {/* Cercle coloré d'indication */}
        <motion.div 
          className="absolute -top-1 -right-1 rounded-full border-2 border-white"
          style={{ 
            backgroundColor: subsidiary.color,
            width: isGenius ? '1.5rem' : '1rem',
            height: isGenius ? '1.5rem' : '1rem',
          }}
          animate={{ 
            scale: isActive ? [1, 1.2, 1] : 1,
          }}
          transition={{ 
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" } 
          }}
        />
      </motion.div>
    </motion.div>
  );
};

// Composant de carte détaillée pour la filiale sélectionnée
const SubsidiaryDetail = ({ subsidiary }: { subsidiary: SubsidiaryProps }) => (
  <motion.div
    className="relative z-30 bg-white rounded-lg shadow-xl overflow-hidden"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}
  >
    <div className="h-2" style={{ backgroundColor: subsidiary.color }} />
    
    <div className="p-5">
      <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-900">{subsidiary.name}</h3>
      
      <div className="mb-4 flex flex-wrap">
        {subsidiary.expertise.map((skill) => (
          <span 
            key={skill} 
            className="text-xs px-2 py-1 rounded-full mr-2 mb-1"
            style={{ 
              backgroundColor: `${subsidiary.color}20`,
              color: subsidiary.color,
              border: `1px solid ${subsidiary.color}40`,
            }}
          >
            {skill}
          </span>
        ))}
      </div>
      
      <p className="text-gray-700 mb-4">{subsidiary.description}</p>
      
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <Link 
          href={subsidiary.link} 
          className="inline-flex items-center font-medium"
          style={{ color: subsidiary.color }}
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

// Composant d'écosystème interconnecté principal
export const InterconnectedSubsidiariesShowcase: React.FC = () => {
  const [activeSubsidiary, setActiveSubsidiary] = useState<string>('genius');
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 1200);
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const controls = useAnimation();
  
  // Effet pour animer l'entrée de la section
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  // Gestion du redimensionnement de la fenêtre
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const isMobile = windowWidth < 768;
  const currentSubsidiary = subsidiaries.find(s => s.id === activeSubsidiary) || subsidiaries[0];
  
  // Calcul des connexions actives
  const isConnectionActive = (fromId: string, toId: string) => {
    return activeSubsidiary === fromId || activeSubsidiary === toId;
  };
  
  return (
    <section 
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
      style={{ 
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      }}
    >
      {/* Pattern d'arrière-plan */}
      <div className="absolute inset-0 bg-gray-800/5 pattern-diagonal-lines pattern-white pattern-bg-transparent pattern-size-2 pattern-opacity-5 z-0" />
      
      {/* Titre et introduction */}
      <div className="container mx-auto px-4 md:px-6 mb-16 relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.6, 
                ease: [0.4, 0.0, 0.2, 1]
              }
            }
          }}
          className="text-center"
        >
          <div className="inline-block relative">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-3 text-gray-900">
              L'ÉCOSYSTÈME GENIUS
            </h2>
            <motion.div
              className="h-1 w-1/3 mx-auto bg-black mt-2"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
          </div>
          <p className="text-gray-700 max-w-2xl mx-auto mt-6 text-lg">
            Découvrez comment nos filiales spécialisées fonctionnent en synergie pour offrir
            une solution complète à vos besoins de communication et d'événementiel.
          </p>
        </motion.div>
      </div>
      
      {/* Écosystème visuel */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="relative mb-16">
          {/* Carte graphique des connexions */}
          <div 
            className={cn(
              "relative mx-auto",
              isMobile ? "h-[600px] w-full" : "h-[500px] w-full max-w-5xl"
            )}
          >
            {/* Connexions SVG */}
            <svg 
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Générer toutes les connexions */}
              {subsidiaries.map(subsidiary => 
                subsidiary.connections.map(connectionId => {
                  // Éviter les doublons en ne prenant que les connexions où l'ID est "plus petit" pour éviter la duplication
                  if (subsidiary.id < connectionId) {
                    const connectedSubsidiary = subsidiaries.find(s => s.id === connectionId);
                    return connectedSubsidiary ? (
                      <FlowArrow 
                        key={`${subsidiary.id}-${connectionId}`}
                        fromId={subsidiary.id}
                        toId={connectionId}
                        isActive={isConnectionActive(subsidiary.id, connectionId)}
                        color={
                          activeSubsidiary === subsidiary.id 
                            ? subsidiary.color 
                            : activeSubsidiary === connectionId 
                              ? connectedSubsidiary.color 
                              : '#888888'
                        }
                        isMobile={isMobile}
                      />
                    ) : null;
                  }
                  return null;
                })
              )}
            </svg>
            
            {/* Nœuds représentant les filiales */}
            {subsidiaries.map(subsidiary => (
              <SubsidiaryNode 
                key={subsidiary.id}
                subsidiary={subsidiary}
                isActive={activeSubsidiary === subsidiary.id}
                onClick={() => setActiveSubsidiary(subsidiary.id)}
                isMobile={isMobile}
              />
            ))}
          </div>
          
          {/* Information sur la filiale sélectionnée */}
          <div className="max-w-md mx-auto mt-24 md:mt-8">
            <AnimatePresence mode="wait">
              <SubsidiaryDetail key={activeSubsidiary} subsidiary={currentSubsidiary} />
            </AnimatePresence>
          </div>
        </div>
        
        {/* Citation de synergie */}
        <motion.div
          className="text-center max-w-3xl mx-auto mt-16 bg-white/60 backdrop-blur-sm p-6 rounded-lg border border-gray-200"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
        >
          <p className="text-xl md:text-2xl font-medium text-gray-900 italic leading-relaxed">
            "En synergie, <span className="font-bold not-italic">ce que GENIUS crée, MPS produit et LABRIG'Ad déploie</span>, 
            tandis que <span className="font-bold not-italic">Gamius</span> et <span className="font-bold not-italic">Mouje & Leell</span> apportent 
            leur expertise spécifique pour créer des expériences extraordinaires."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default InterconnectedSubsidiariesShowcase;
