"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Types pour le composant
interface OrbitalItemProps {
  id: number;
  name: string;
  shortName: string;
  description?: string;
  logo: string;
  color: string;
}

interface RadialOrbitalProps {
  centerLogo: string;
  items: OrbitalItemProps[];
  className?: string;
}

// Constantes d'animation et de design
const ANIMATION_CONFIG = {
  duration: 0.8,
  orbitRotationSpeed: 120, // secondes pour une rotation complète
  nodeSize: 80, // taille des nœuds orbitaux en px
  centerSize: 120, // taille du nœud central en px
  orbitRadius: 320, // rayon de l'orbite en px
  mobileOrbitRadius: 220, // rayon de l'orbite sur mobile
  staggerDelay: 0.1, // délai entre les animations des nœuds
};

// Composant principal
export default function RadialOrbital({ centerLogo, items, className = "" }: RadialOrbitalProps) {
  const [activeItem, setActiveItem] = useState<OrbitalItemProps | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Détecter si l'appareil est mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Calculer la position de chaque nœud orbital
  const getNodePosition = (index: number, total: number) => {
    const angle = (index / total) * Math.PI * 2; // en radians
    const radius = isMobile ? ANIMATION_CONFIG.mobileOrbitRadius : ANIMATION_CONFIG.orbitRadius;
    
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      angle: (angle * 180) / Math.PI, // convertir en degrés
    };
  };

  // Gérer le clic sur un nœud
  const handleNodeClick = (item: OrbitalItemProps) => {
    if (activeItem?.id === item.id) {
      setActiveItem(null);
    } else {
      setActiveItem(item);
      setAutoRotate(false);
    }
  };

  // Gérer le clic sur le nœud central
  const handleCenterClick = () => {
    setActiveItem(null);
    setAutoRotate(true);
  };

  // Créer l'orbite (cercle)
  const renderOrbit = () => {
    const radius = isMobile ? ANIMATION_CONFIG.mobileOrbitRadius : ANIMATION_CONFIG.orbitRadius;
    
    return (
      <motion.div
        className="absolute rounded-full border border-gray-200 opacity-70"
        style={{
          width: radius * 2,
          height: radius * 2,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={autoRotate ? { rotate: 360 } : {}}
        transition={{
          rotate: {
            repeat: Infinity,
            duration: ANIMATION_CONFIG.orbitRotationSpeed,
            ease: "linear",
          },
        }}
      />
    );
  };

  // Créer le nœud central (Genius)
  const renderCenterNode = () => {
    return (
      <motion.div
        className="absolute z-10 bg-white rounded-full shadow-xl flex items-center justify-center cursor-pointer"
        style={{
          width: ANIMATION_CONFIG.centerSize,
          height: ANIMATION_CONFIG.centerSize,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20 
        }}
        onClick={handleCenterClick}
        whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0,0,0,0.2)' }}
      >
        <div className="relative w-3/4 h-3/4 flex items-center justify-center">
          <Image
            src={centerLogo}
            alt="Genius"
            width={ANIMATION_CONFIG.centerSize * 0.7}
            height={ANIMATION_CONFIG.centerSize * 0.4}
            className="object-contain"
            priority
          />
        </div>
      </motion.div>
    );
  };

  // Créer les nœuds orbitaux (filiales)
  const renderOrbitalNodes = () => {
    return items.map((item, index) => {
      const { x, y, angle } = getNodePosition(index, items.length);
      const isActive = activeItem?.id === item.id;
      
      return (
        <motion.div
          key={item.id}
          className="absolute flex items-center justify-center bg-white rounded-full shadow-md cursor-pointer"
          style={{
            width: ANIMATION_CONFIG.nodeSize,
            height: ANIMATION_CONFIG.nodeSize,
            left: '50%',
            top: '50%',
            zIndex: isActive ? 20 : 5,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: isActive ? 1.2 : 1, 
            opacity: 1,
            x,
            y,
            boxShadow: isActive 
              ? `0 0 20px 2px ${item.color}40` 
              : '0 4px 10px rgba(0,0,0,0.1)',
          }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
            delay: index * ANIMATION_CONFIG.staggerDelay,
            x: autoRotate ? {
              repeat: Infinity,
              duration: ANIMATION_CONFIG.orbitRotationSpeed,
              ease: "linear",
            } : {},
            y: autoRotate ? {
              repeat: Infinity,
              duration: ANIMATION_CONFIG.orbitRotationSpeed,
              ease: "linear",
            } : {},
          }}
          onClick={() => handleNodeClick(item)}
          whileHover={{ scale: isActive ? 1.2 : 1.1 }}
        >
          <div className="relative w-3/4 h-3/4 flex items-center justify-center">
            <Image
              src={item.logo}
              alt={item.name}
              width={ANIMATION_CONFIG.nodeSize * 0.6}
              height={ANIMATION_CONFIG.nodeSize * 0.4}
              className="object-contain"
              quality={95}
            />
          </div>
          
          {/* Étiquette du nom (visible si actif) */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                className="absolute whitespace-nowrap bg-white px-3 py-1 rounded-full shadow-md text-center"
                style={{ 
                  top: ANIMATION_CONFIG.nodeSize + 10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <span className="font-medium text-sm">{item.name}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      );
    });
  };

  // Rendu du détail pour l'élément actif
  const renderActiveItemDetail = () => {
    if (!activeItem) return null;
    
    return (
      <motion.div
        className="absolute left-0 right-0 mx-auto bottom-8 max-w-md bg-white rounded-xl shadow-xl p-6 z-30"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 relative mr-4 flex-shrink-0">
            <Image
              src={activeItem.logo}
              alt={activeItem.name}
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
          <h3 className="text-xl font-semibold">{activeItem.name}</h3>
        </div>
        
        <p className="text-gray-600">
          {activeItem.description || `${activeItem.name} est une filiale du groupe Genius Ad District.`}
        </p>
        
        <motion.button
          className="mt-4 py-2 px-4 rounded-full bg-gray-100 text-gray-700 text-sm flex items-center justify-center w-full"
          whileHover={{ backgroundColor: '#f3f4f6' }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveItem(null)}
        >
          Fermer
        </motion.button>
      </motion.div>
    );
  };

  // Contrôle de rotation
  const renderControls = () => {
    return (
      <motion.div
        className="absolute top-4 right-4 bg-white rounded-full shadow-md p-2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <button
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            autoRotate ? 'bg-gray-100' : 'bg-gray-200'
          }`}
          onClick={() => setAutoRotate(!autoRotate)}
        >
          {autoRotate ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="6" width="12" height="12" rx="2" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </button>
      </motion.div>
    );
  };

  return (
    <section className={`relative py-24 bg-white overflow-hidden ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Notre écosystème</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez notre réseau d'expertises complémentaires au sein du Genius Ad District.
          </p>
        </motion.div>
        
        <div 
          ref={containerRef} 
          className="relative h-[650px] max-w-4xl mx-auto"
        >
          {renderOrbit()}
          {renderCenterNode()}
          {renderOrbitalNodes()}
          <AnimatePresence>
            {activeItem && renderActiveItemDetail()}
          </AnimatePresence>
          {renderControls()}
        </div>
      </div>
    </section>
  );
}
