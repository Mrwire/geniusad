"use client";

import { RefObject, useEffect, useState } from 'react';
import { OrbitalItem } from './orbital-ecosystem-data';

// Types pour le composant OrbitalEcosystem
export interface OrbitalNodePosition {
  x: number;
  y: number;
  zIndex: number;
  opacity: number;
  angle: number;
  distance: number;
}

export interface OrbitalState {
  expandedItems: Record<number, boolean>;
  activeNodeId: number | null;
  relatedNodes: Record<number, boolean>;
  pulsingNodes: Record<number, boolean>;
  rotationAngle: number;
  autoRotate: boolean;
  rotationSpeed: number;
  showGeniusPopup: boolean;
  centerNode: OrbitalItem | null;
}

// Constantes visuelles
export const VISUAL_SETTINGS = {
  // Utilisation du ratio d'or (1.618) et des proportions classiques
  ORBIT_BASE_RADIUS: 320, // Rayon augmenté pour un plus grand cercle orbital
  ORBIT_BASE_RADIUS_MOBILE: 220, // Également plus grand sur mobile
  ORBIT_PADDING: 50,
  GOLDEN_RATIO: 1.618,
  
  // Paramètres de rotation
  BASE_ROTATION_SPEED: 0.15, // Rotation plus lente et plus fluide
  SLOW_ROTATION_SPEED: 0.08,
  FAST_ROTATION_SPEED: 0.3,
  
  // Transitions et délais
  TRANSITION_DURATION: 900, // ms - plus lent pour une animation plus douce
  STAGGER_DELAY: 100, // ms - plus de délai entre les éléments
  
  // Facteurs de zoom et perspective
  ZOOM_LEVEL_ACTIVE: 1.3, // Zoom plus important sur l'élément actif
  PERSPECTIVE_DEPTH: 1500, // Perspective plus prononcée
  PARALLAX_FACTOR: 0.04, // Effet de parallaxe plus visible
  
  // Couleurs
  PRIMARY_COLOR: '#000000',
  SECONDARY_COLOR: '#3B82F6',
  ACCENT_COLOR: '#F97316',
};

// Hook pour détecter les dimensions et gérer le responsive design
export function useResponsiveDesign(ref: RefObject<HTMLElement>) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const updateDimensions = () => {
      if (ref.current) {
        const { width, height } = ref.current.getBoundingClientRect();
        const newIsMobile = width < 768;
        const newIsTablet = width >= 768 && width < 1024;
        const newIsDesktop = width >= 1024;
        
        setDimensions({ width, height });
        setIsMobile(newIsMobile);
        setIsTablet(newIsTablet);
        setIsDesktop(newIsDesktop);
      }
    };
    
    // Observer pour les changements de taille
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(ref.current);
    
    // Appel initial
    updateDimensions();
    
    return () => {
      if (ref.current) {
        resizeObserver.unobserve(ref.current);
      }
    };
  }, [ref]);
  
  // Calculer le rayon de l'orbite en fonction de la taille de l'écran
  const orbitRadius = isMobile 
    ? VISUAL_SETTINGS.ORBIT_BASE_RADIUS_MOBILE 
    : isTablet 
    ? VISUAL_SETTINGS.ORBIT_BASE_RADIUS * 0.8
    : VISUAL_SETTINGS.ORBIT_BASE_RADIUS;
  
  return {
    dimensions,
    isMobile,
    isTablet,
    isDesktop,
    orbitRadius,
    nodeSize: isMobile ? 28 : 34, // Taille des nœuds adaptée
  };
}

// Hook pour l'effet de parallaxe basé sur la position de la souris
export function useParallaxEffect(ref: RefObject<HTMLElement>, sensitivity = VISUAL_SETTINGS.PARALLAX_FACTOR) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    if (!ref.current) return;
    
    let animationFrame: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Annuler le frame d'animation précédent s'il existe
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      
      // Utiliser requestAnimationFrame pour limiter la fréquence des mises à jour
      animationFrame = requestAnimationFrame(() => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          // Calculer l'offset par rapport au centre
          const offsetX = (e.clientX - centerX) * sensitivity;
          const offsetY = (e.clientY - centerY) * sensitivity;
          
          const newMousePos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
          const newOffset = { x: offsetX, y: offsetY };
          
          // Ne mettre à jour que si la différence est significative
          const diffX = Math.abs(newOffset.x - parallaxOffset.x);
          const diffY = Math.abs(newOffset.y - parallaxOffset.y);
          
          if (diffX > 0.5 || diffY > 0.5) {
            setMousePosition(newMousePos);
            setParallaxOffset(newOffset);
          }
        }
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [ref]);  // Suppression de sensitivity de la liste des dépendances pour éviter les re-rendus
  
  return { mousePosition, parallaxOffset };
}

// Calculer la position des nœuds orbitaux en fonction de l'angle de rotation
export function calculateNodePosition(
  index: number,
  total: number,
  radius: number,
  rotationAngle: number,
  parallaxOffset: { x: number; y: number },
  isMobile: boolean
): OrbitalNodePosition {
  // Calculer l'angle en degrés puis convertir en radians
  const angleStep = 360 / total;
  const angle = ((index / total) * 360 + rotationAngle) % 360;
  const radian = (angle * Math.PI) / 180;
  
  // Coordonnées de base
  const baseX = radius * Math.cos(radian);
  const baseY = radius * Math.sin(radian);
  
  // Ajouter l'effet de parallaxe (réduit sur mobile)
  const parallaxFactor = isMobile ? 0.5 : 1;
  const x = baseX + parallaxOffset.x * parallaxFactor;
  const y = baseY + parallaxOffset.y * parallaxFactor;
  
  // Calculer l'index z et l'opacité pour l'effet de profondeur
  // Les nœuds en avant sont plus opaques, ceux en arrière plus transparents
  const zIndex = Math.round(100 + 50 * Math.cos(radian));
  
  // Opacité basée sur la position (plus opaque devant, plus transparent derrière)
  // Utiliser une courbe sinusoïdale pour une transition douce
  const opacityBase = (1 + Math.sin(radian)) / 2; // 0 à 1
  const opacity = Math.max(0.65, 0.65 + 0.35 * opacityBase);
  
  // Distance par rapport au centre (utile pour les calculs d'échelle)
  const distance = Math.sqrt(x * x + y * y);
  
  return { x, y, zIndex, opacity, angle, distance };
}

// Fonction pour obtenir les nœuds liés à un nœud spécifique
export function getRelatedNodes(
  nodeId: number,
  orbitalData: OrbitalItem[]
): Record<number, boolean> {
  const relatedNodes: Record<number, boolean> = {};
  
  // Trouver le nœud actif
  const activeNode = orbitalData.find(item => item.id === nodeId);
  if (!activeNode) return relatedNodes;
  
  // Marquer tous les nœuds liés
  activeNode.relatedIds.forEach(id => {
    relatedNodes[id] = true;
  });
  
  return relatedNodes;
}
