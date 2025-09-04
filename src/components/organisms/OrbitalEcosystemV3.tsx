"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// Importation des composants
import CosmicBackground from "@/components/ui/cosmic-background";
import OrbitalNode from "@/components/ui/orbital-node";
import { 
  AnimatedCircle, 
  OrbitPath,
  FloatingItem,
  staggerContainerVariants,
  ANIMATION_SETTINGS
} from '@/components/ui/orbital-animations';

// Importation des données et des utilitaires
import { createOrbitalData, OrbitalItem } from './orbital-ecosystem-data';
import { 
  useResponsiveDesign,
  useParallaxEffect,
  calculateNodePosition,
  getRelatedNodes,
  VISUAL_SETTINGS
} from './orbital-ecosystem-utils';

// Importation des composants des parties 1 et 2
import { GeniusPopup, DetailCard } from './orbital-ecosystem-part1';
import { OrbitalCenter, ConnectionPaths, OrbitControls } from './orbital-ecosystem-part2';

// Composant principal
export default function OrbitalEcosystemV3() {
  // Données orbitales
  const [orbitalData] = useState<OrbitalItem[]>(createOrbitalData());
  
  // État du système orbital
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(1); // Genius actif par défaut
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [rotationSpeed, setRotationSpeed] = useState<number>(VISUAL_SETTINGS.BASE_ROTATION_SPEED);
  const [showGeniusPopup, setShowGeniusPopup] = useState<boolean>(false);
  
  // Nœuds liés et pulsants
  const [relatedNodes, setRelatedNodes] = useState<Record<number, boolean>>({});
  const [pulsingNodes, setPulsingNodes] = useState<Record<number, boolean>>({});
  
  // Positions calculées des nœuds
  const [nodePositions, setNodePositions] = useState<Record<number, { x: number; y: number; zIndex: number; opacity: number; angle: number; distance: number }>>({});
  
  // Références pour les éléments DOM
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  
  // Hooks personnalisés pour le responsive et l'effet de parallaxe
  const { dimensions, isMobile, orbitRadius, nodeSize } = useResponsiveDesign(sectionRef);
  const { parallaxOffset } = useParallaxEffect(containerRef);
  
  // Animation controls
  const controls = useAnimation();
  
  // Effet pour initialiser le composant
  useEffect(() => {
    // Démarrer l'animation principale
    controls.start("visible");
    
    // Initialiser les nœuds liés à Genius (nœud central)
    setRelatedNodes(getRelatedNodes(1, orbitalData));
    
    // Initialiser la pulsation sur certains nœuds
    const initialPulsing: Record<number, boolean> = {};
    orbitalData.forEach((item, index) => {
      // Faire pulser quelques nœuds aléatoirement pour l'effet visuel
      if (index === 0 || Math.random() > 0.7) {
        initialPulsing[item.id] = true;
      }
    });
    setPulsingNodes(initialPulsing);
  }, [orbitalData, controls]);
  
  // Effet pour la rotation automatique avec requestAnimationFrame
  useEffect(() => {
    let animationFrameId: number;
    let lastTimestamp: number;
    
    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      
      if (autoRotate) {
        // Utiliser requestAnimationFrame pour une animation plus fluide
        setRotationAngle((prev) => {
          // Ajuster la vitesse en fonction du deltaTime pour une rotation cohérente
          const increment = (rotationSpeed * deltaTime) / 16.67; // Normaliser par rapport à 60fps
          const newAngle = (prev + increment) % 360;
          return Number(newAngle.toFixed(3));
        });
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [autoRotate, rotationSpeed]);
  
  // Calculer les positions des nœuds à chaque changement d'angle ou de taille
  useEffect(() => {
    // Utiliser une fonction de mise à jour de l'état pour éviter les boucles infinies
    const updatePositions = () => {
      const newPositions: Record<number, { x: number; y: number; zIndex: number; opacity: number; angle: number; distance: number }> = {};
      
      // Calculer pour chaque nœud orbital (sauf Genius qui est au centre)
      orbitalData.forEach((item, index) => {
        if (index > 0) { // Ignorer Genius (index 0)
          const position = calculateNodePosition(
            index - 1, // Ajuster l'index puisque Genius n'est pas dans l'orbite
            orbitalData.length - 1, // Total des nœuds orbitaux (sans Genius)
            orbitRadius,
            rotationAngle,
            parallaxOffset,
            isMobile
          );
          
          newPositions[item.id] = position;
        }
      });
      
      return newPositions;
    };
    
    // Mettre à jour les positions une seule fois par cycle de rendu
    setNodePositions(updatePositions());
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rotationAngle, orbitRadius, isMobile]);
  
  // Gérer le clic sur un nœud orbital
  const handleNodeClick = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      
      // Réinitialiser tous les items sauf celui qui est cliqué
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });
      
      // Basculer l'état de l'item cliqué
      newState[id] = !prev[id];
      
      // Si l'item est sélectionné
      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);
        
        // Mettre à jour les nœuds liés
        setRelatedNodes(getRelatedNodes(id, orbitalData));
        
        // Faire pulser les nœuds reliés
        const newPulsingNodes: Record<number, boolean> = {};
        orbitalData.find(item => item.id === id)?.relatedIds.forEach((relId) => {
          newPulsingNodes[relId] = true;
        });
        setPulsingNodes(newPulsingNodes);
      } else {
        // Si l'item est désélectionné, revenir à Genius
        setActiveNodeId(1);
        setAutoRotate(true);
        setRelatedNodes(getRelatedNodes(1, orbitalData));
        setPulsingNodes({});
      }
      
      return newState;
    });
  };
  
  // Gérer le clic sur le conteneur (désélection)
  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(1); // Revenir à Genius comme actif
      setRelatedNodes(getRelatedNodes(1, orbitalData));
      setPulsingNodes({});
      setAutoRotate(true);
    }
  };
  
  // Gérer le clic sur le nœud central (Genius)
  const handleCenterClick = () => {
    setShowGeniusPopup(true);
    setAutoRotate(false);
  };
  
  return (
    <section 
      ref={sectionRef} 
      id="ecosystem" 
      className="py-24 md:py-32 px-4 md:px-8 relative overflow-hidden bg-white"
    >
      {/* Arrière-plan cosmique animé */}
      <CosmicBackground 
        intensity="moderate" 
        colorScheme="light" 
        interactive={true}
        animated={true}
        className="opacity-60"
      />
      
      {/* Superposition d'effets lumineux */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-white opacity-30 pointer-events-none"></div>
      
      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        initial="hidden"
        animate={controls}
        variants={staggerContainerVariants}
      >
        {/* En-tête de section avec animation */}
        <motion.div 
          className="mb-16 max-w-3xl mx-auto text-center"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
        >
          <h2 className="font-light text-3xl md:text-4xl tracking-tight leading-tight mb-6 text-gray-900">
            Notre écosystème
            <br />
            <span className="font-normal relative">
              Un réseau d'expertises complémentaires.
              <motion.span 
                className="absolute -right-8 top-0 text-blue-500"
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <Sparkles size={20} className="text-amber-500" />
              </motion.span>
            </span>
          </h2>
          <div className="flex justify-center mb-4">
            <motion.div 
              className="w-20 h-[2px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 80, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            ></motion.div>
          </div>
          <motion.p 
            className="text-base text-gray-600 font-light leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Chaque entité de Genius Ad District est spécialisée dans son domaine, 
            permettant une approche intégrée et innovante de vos projets.
          </motion.p>
        </motion.div>
        
        {/* Système orbital interactif */}
        <div
          className="w-full h-[600px] md:h-[650px] flex flex-col items-center justify-center overflow-hidden relative"
          ref={containerRef}
          onClick={handleContainerClick}
        >
          {/* Effet de scintillement dynamique */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute rounded-full bg-white"
                style={{
                  width: Math.random() * 3 + 1,
                  height: Math.random() * 3 + 1,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 0.8, 0],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: Math.random() * 2 + 1,
                  repeat: Infinity,
                  delay: Math.random() * 5
                }}
              />
            ))}
          </div>
          
          {/* Contrôles de l'orbite */}
          <OrbitControls 
            autoRotate={autoRotate}
            rotationSpeed={rotationSpeed}
            onAutoRotateToggle={() => setAutoRotate(!autoRotate)}
            onSpeedChange={setRotationSpeed}
            isMobile={isMobile}
          />
          
          {/* Conteneur orbital avec effet de perspective */}
          <div
            className="relative w-full h-full flex items-center justify-center"
            ref={orbitRef}
            style={{
              perspective: `${VISUAL_SETTINGS.PERSPECTIVE_DEPTH}px`,
            }}
          >
            {/* Cercles orbitaux décoratifs */}
            <OrbitPath
              radius={orbitRadius * 0.98}
              strokeColor="#E5E7EB"
              strokeWidth={1}
              strokeOpacity={0.4}
              rotationSpeed={ANIMATION_SETTINGS.ORBIT_DURATION}
              className="z-0"
            />
            
            <OrbitPath
              radius={orbitRadius * 1.02}
              strokeColor="#F3F4F6"
              strokeWidth={0.5}
              strokeOpacity={0.3}
              rotationSpeed={ANIMATION_SETTINGS.ORBIT_DURATION * 1.2}
              reverse={true}
              className="z-0"
            />
            
            {/* Chemins de connexion entre les nœuds */}
            <ConnectionPaths 
              orbitalData={orbitalData}
              positions={nodePositions}
              activeNodeId={activeNodeId}
              isExpanded={expandedItems}
            />
            
            {/* Centre du système orbital (Genius) */}
            {/* Centre orbital - Genius */}
            <OrbitalCenter 
              onClick={handleCenterClick}
              autoRotate={autoRotate}
              isMobile={isMobile}
            />
            
            {/* Nœuds des filiales en orbite */}
            {orbitalData.map((item, index) => {
              if (index === 0) return null; // Skip Genius, already in center
              
              const position = nodePositions[item.id];
              if (!position) return null;
              
              const isExpanded = expandedItems[item.id] || false;
              const isRelated = relatedNodes[item.id] || false;
              const isPulsing = pulsingNodes[item.id] || false;
              
              return (
                <OrbitalNode
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  role={item.date}
                  logo={item.logo}
                  color={item.color}
                  energy={item.energy}
                  position={position}
                  isExpanded={isExpanded}
                  isRelated={isRelated}
                  isPulsing={isPulsing}
                  isActive={activeNodeId === item.id}
                  rotationSpeed={ANIMATION_SETTINGS.ORBIT_DURATION}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNodeClick(item.id);
                  }}
                  index={index - 1}
                  total={orbitalData.length - 1}
                />
              );
            })}
          </div>
          
          {/* Popup pour Genius au centre */}
          <AnimatePresence mode="wait">
            {showGeniusPopup && (
              <GeniusPopup 
                onClose={() => {
                  setShowGeniusPopup(false);
                  setAutoRotate(true);
                }}
              />
            )}
          
            {/* Carte détaillée de la filiale active */}
            {activeNodeId && expandedItems[activeNodeId] && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md">
                <DetailCard 
                  item={orbitalData.find(item => item.id === activeNodeId)!}
                />
              </div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Citation de la synergie */}
        <motion.div 
          className="mt-8 max-w-3xl mx-auto text-center"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4 } }
          }}
        >
          <p className="italic text-lg text-gray-700">
            "Notre force réside dans la complémentarité de nos expertises, 
            <span className="relative">
              créant un écosystème
              <motion.span 
                className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-400 to-transparent"
                initial={{ width: 0, left: "50%" }}
                animate={{ width: "100%", left: 0 }}
                transition={{ delay: 1, duration: 1 }}
              />
            </span> où chaque composante enrichit l'ensemble."
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
