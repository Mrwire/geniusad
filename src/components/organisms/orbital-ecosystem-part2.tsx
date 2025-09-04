"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { cn } from "@/lib/utils";

// Importations des composants personnalisés
import { 
  AnimatedCircle, 
  GlowEffect, 
  OrbitPath,
  useScrollAnimation,
  ANIMATION_SETTINGS
} from '@/components/ui/orbital-animations';

// Importations des données et des utilitaires
import { createOrbitalData, OrbitalItem } from './orbital-ecosystem-data';
import { 
  OrbitalNodePosition,
  OrbitalState,
  VISUAL_SETTINGS,
  useResponsiveDesign,
  useParallaxEffect,
  calculateNodePosition,
  getRelatedNodes
} from './orbital-ecosystem-utils';

// Composant du Centre Orbital (Genius au centre)
export const OrbitalCenter: React.FC<{
  onClick: () => void;
  autoRotate: boolean;
  isMobile: boolean;
}> = ({ onClick, autoRotate, isMobile }) => {
  // Taille adaptée selon le device - augmentée pour plus d'impact visuel
  const centerSize = isMobile ? 70 : 90;
  const logoSize = isMobile ? 50 : 64;
  const orbitSize1 = centerSize * 1.3;
  const orbitSize2 = centerSize * 1.6;
  
  return (
    <motion.div 
      className="absolute rounded-full bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center z-30 shadow-xl cursor-pointer"
      style={{
        width: `${centerSize}px`,
        height: `${centerSize}px`,
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ scale: 0 }}
      animate={{ 
        scale: 1,
        rotate: autoRotate ? [0, 5, 0, -5, 0] : 0
      }}
      transition={{ 
        duration: 3,
        repeat: autoRotate ? Infinity : 0,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Orbites animées autour du centre - version améliorée */}
      <AnimatedCircle 
        size={orbitSize1}
        color="#3B82F6"
        opacity={0.4}
        duration={ANIMATION_SETTINGS.PULSE_DURATION * 1.5}
        className="pointer-events-none"
      />
      <AnimatedCircle 
        size={orbitSize2}
        color="#F97316"
        opacity={0.25}
        duration={ANIMATION_SETTINGS.PULSE_DURATION * 1.8}
        delay={0.8}
        className="pointer-events-none"
      />
      <AnimatedCircle 
        size={orbitSize2 * 1.2}
        color="#FFFFFF"
        opacity={0.15}
        duration={ANIMATION_SETTINGS.PULSE_DURATION * 2}
        delay={1.2}
        className="pointer-events-none"
      />
      
      {/* Effet de lueur centrale amélioré */}
      <GlowEffect 
        color="#3B82F6"
        size={centerSize * 2.2}
        intensity={0.6}
        pulseSpeed={5}
        className="pointer-events-none"
      />
      
      {/* Logo Genius central - agrandi et amélioré */}
      <motion.div 
        className="rounded-full bg-white flex items-center justify-center overflow-hidden"
        style={{
          width: `${logoSize}px`,
          height: `${logoSize}px`,
          filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))'
        }}
        animate={{ 
          boxShadow: autoRotate 
            ? ['0px 0px 15px 0px rgba(59,130,246,0.2)', '0px 0px 25px 0px rgba(59,130,246,0.4)', '0px 0px 15px 0px rgba(59,130,246,0.2)']
            : '0px 0px 20px 0px rgba(59,130,246,0.3)'
        }}
        transition={{
          duration: 4,
          repeat: autoRotate ? Infinity : 0,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Image
          src="/item_images/logo_filiale_rectangulaire/logo_genius_black.png"
          alt="GENIUS"
          width={200}
          height={100}
          className="object-contain p-2"
          quality={100}
          priority={true}
        />
      </motion.div>
      
      {/* Texte d'instruction sur mobile */}
      {isMobile && (
        <span className="absolute -bottom-7 text-xs text-center text-gray-600 bg-white/70 rounded-full px-2 py-1 shadow-sm">
          Touchez pour voir
        </span>
      )}
    </motion.div>
  );
};

// Composant pour les chemins de connexion entre les nœuds
export const ConnectionPaths: React.FC<{
  orbitalData: OrbitalItem[];
  positions: Record<number, OrbitalNodePosition>;
  activeNodeId: number | null;
  isExpanded: Record<number, boolean>;
}> = ({ orbitalData, positions, activeNodeId, isExpanded }) => {
  // Trouver les connexions à afficher
  const connections: { source: number; target: number; color: string; isActive: boolean }[] = [];
  
  // Toujours connecter le centre (Genius) aux autres nœuds
  const centerNodeId = 1; // ID de Genius
  const centerColor = orbitalData[0].color; // Couleur de Genius
  
  orbitalData.forEach((item) => {
    if (item.id !== centerNodeId) {
      // Déterminer si la connexion est active
      const isActive = activeNodeId === item.id || 
                     activeNodeId === centerNodeId ||
                     isExpanded[item.id] ||
                     isExpanded[centerNodeId];
      
      connections.push({
        source: centerNodeId,
        target: item.id,
        color: isActive ? item.color : '#E5E7EB',
        isActive
      });
    }
  });
  
  // Ajouter les connexions entre les nœuds périphériques (basées sur relatedIds)
  orbitalData.forEach((sourceItem) => {
    if (sourceItem.id !== centerNodeId) {
      sourceItem.relatedIds.forEach((targetId) => {
        if (targetId !== centerNodeId && targetId !== sourceItem.id) {
          // Éviter les doublons (ne pas ajouter A→B si B→A existe déjà)
          const existingConnection = connections.find(
            c => (c.source === targetId && c.target === sourceItem.id) ||
                (c.source === sourceItem.id && c.target === targetId)
          );
          
          if (!existingConnection) {
            const targetItem = orbitalData.find(item => item.id === targetId);
            if (targetItem) {
              const isActive = activeNodeId === sourceItem.id || 
                             activeNodeId === targetId ||
                             isExpanded[sourceItem.id] ||
                             isExpanded[targetId];
              
              connections.push({
                source: sourceItem.id,
                target: targetId,
                color: isActive ? 
                  `rgba(${parseInt(sourceItem.color.substring(1, 3), 16)}, ${parseInt(sourceItem.color.substring(3, 5), 16)}, ${parseInt(sourceItem.color.substring(5, 7), 16)}, 0.6)` : 
                  '#E5E7EB50',
                isActive
              });
            }
          }
        }
      });
    }
  });
  
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
      <defs>
        {/* Gradients pour les connexions */}
        <linearGradient id="baseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.1)" />
          <stop offset="50%" stopColor="rgba(255, 255, 255, 0.7)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.1)" />
        </linearGradient>
        
        {orbitalData.map((item) => (
          <linearGradient key={`gradient-${item.id}`} id={`gradient-${item.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={`${item.color}30`} />
            <stop offset="50%" stopColor={item.color} />
            <stop offset="100%" stopColor={`${item.color}30`} />
          </linearGradient>
        ))}
      </defs>
      
      {/* Tracer les chemins de connexion */}
      {connections.map(({ source, target, color, isActive }, index) => {
        const sourcePos = positions[source];
        const targetPos = positions[target];
        
        if (!sourcePos || !targetPos) return null;
        
        // Calculer les coordonnées du centre
        const centerX = 0;
        const centerY = 0;
        
        // Pour les connexions avec le centre, utiliser directement les positions
        const x1 = source === centerNodeId ? centerX : sourcePos.x;
        const y1 = source === centerNodeId ? centerY : sourcePos.y;
        const x2 = target === centerNodeId ? centerX : targetPos.x;
        const y2 = target === centerNodeId ? centerY : targetPos.y;
        
        // Utiliser un dégradé pour les connexions actives
        const strokeGradient = isActive ? 
          (source === centerNodeId ? `url(#gradient-${target})` : `url(#gradient-${source})`) : 
          "url(#baseGradient)";
        
        const strokeWidth = isActive ? 1.5 : 0.75;
        const strokeOpacity = isActive ? 1 : 0.5;
        const strokeDasharray = isActive ? "none" : "3,3";
        
        return (
          <motion.line
            key={`connection-${index}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeOpacity={strokeOpacity}
            strokeDasharray={strokeDasharray}
            initial={{ opacity: 0 }}
            animate={{ opacity: strokeOpacity }}
            transition={{ duration: 1, delay: index * 0.05 }}
          />
        );
      })}
    </svg>
  );
};

// Composant pour les contrôles de l'orbite
export const OrbitControls: React.FC<{
  autoRotate: boolean;
  rotationSpeed: number;
  onAutoRotateToggle: () => void;
  onSpeedChange: (speed: number) => void;
  isMobile: boolean;
}> = ({ 
  autoRotate, 
  rotationSpeed, 
  onAutoRotateToggle, 
  onSpeedChange,
  isMobile
}) => {
  // Si on n'est pas sur mobile, on affiche une version plus discrète
  if (!isMobile) {
    return (
      <motion.div 
        className="absolute bottom-4 right-4 flex items-center space-x-2 p-2 bg-white/60 backdrop-blur-sm rounded-full z-20 opacity-50 hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2 }}
      >
        <button 
          className={`w-7 h-7 rounded-full flex items-center justify-center ${!autoRotate ? 'bg-black text-white' : 'bg-gray-200'}`}
          onClick={onAutoRotateToggle}
        >
          {autoRotate ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 16L15 8M9 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12L19 12M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </motion.div>
    );
  }
  
  // Version mobile avec plus de contrôles
  return (
    <motion.div 
      className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2 p-2 bg-white/80 backdrop-blur-sm rounded-full z-20 shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <button 
        className={`w-8 h-8 rounded-full flex items-center justify-center ${!autoRotate ? 'bg-black text-white' : 'bg-gray-200'}`}
        onClick={onAutoRotateToggle}
      >
        {autoRotate ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 16L15 8M9 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12L19 12M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
      
      <input 
        type="range" 
        min="0.05" 
        max="0.5" 
        step="0.05" 
        value={rotationSpeed}
        onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
        className="w-24 accent-black"
        disabled={!autoRotate}
      />
    </motion.div>
  );
};
