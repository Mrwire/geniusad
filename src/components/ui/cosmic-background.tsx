"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { ANIMATION_SETTINGS } from './orbital-animations';

// Types
interface CosmicBackgroundProps {
  className?: string;
  intensity?: 'subtle' | 'moderate' | 'intense';
  colorScheme?: 'default' | 'light' | 'dark';
  interactive?: boolean;
  animated?: boolean;
}

interface Particle {
  id: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  speed: number;
  delay: number;
}

interface Nebula {
  id: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
  opacity: number;
  gradient: string;
  animationDuration: number;
  delay: number;
}

// Constantes visuelles - utilisation de règles de composition classiques
const GOLDEN_RATIO = 1.618;
const PARTICLES_PER_1000_PIXELS = 8; // Densité visuelle optimale
const MAX_PARALLAX_OFFSET = 30; // Effet de parallaxe subtil

// Palettes de couleurs élégantes - inspirées des règles de l'art du design
const COLOR_PALETTES = {
  default: [
    { color: '#3B82F6', alpha: 0.5 }, // blue
    { color: '#8B5CF6', alpha: 0.4 }, // purple
    { color: '#14B8A6', alpha: 0.5 }, // teal
    { color: '#F97316', alpha: 0.3 }, // orange
    { color: '#EC4899', alpha: 0.4 }, // pink
  ],
  light: [
    { color: '#93C5FD', alpha: 0.3 }, // light blue
    { color: '#C4B5FD', alpha: 0.3 }, // light purple
    { color: '#5EEAD4', alpha: 0.3 }, // light teal
    { color: '#FDBA74', alpha: 0.2 }, // light orange
    { color: '#F9A8D4', alpha: 0.3 }, // light pink
  ],
  dark: [
    { color: '#1E40AF', alpha: 0.6 }, // dark blue
    { color: '#5B21B6', alpha: 0.5 }, // dark purple
    { color: '#0F766E', alpha: 0.6 }, // dark teal
    { color: '#C2410C', alpha: 0.4 }, // dark orange
    { color: '#BE185D', alpha: 0.5 }, // dark pink
  ],
};

// Composant de particule avec animation fluide
const Particle = ({ 
  x, 
  y, 
  size, 
  color, 
  opacity, 
  speed, 
  delay,
  interactive = true
}: Particle & { interactive: boolean }) => {
  // Références pour les coordonnées initiales
  const initialX = useRef(x);
  const initialY = useRef(y);
  
  // Animation plus organique
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        filter: `blur(${size / 3}px)`,
        x: initialX.current,
        y: initialY.current,
        opacity: 0,
      }}
      animate={interactive ? {
        x: [
          initialX.current,
          initialX.current + (Math.random() * 20 - 10),
          initialX.current + (Math.random() * 40 - 20),
          initialX.current + (Math.random() * 20 - 10),
          initialX.current,
        ],
        y: [
          initialY.current,
          initialY.current + (Math.random() * 20 - 10),
          initialY.current + (Math.random() * 40 - 20),
          initialY.current + (Math.random() * 20 - 10),
          initialY.current,
        ],
        opacity: [0, opacity * 0.7, opacity, opacity * 0.8, 0],
        scale: [0.8, 1, 1.1, 0.9, 0.8],
      } : {
        opacity: [0, opacity * 0.7, opacity, opacity * 0.8, 0],
        scale: [0.8, 1, 1.1, 0.9, 0.8],
      }}
      transition={{
        duration: speed,
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
    />
  );
};

// Composant de nébuleuse pour un effet cosmique impressionnant
const Nebula = ({ 
  x, 
  y, 
  size, 
  rotation, 
  opacity, 
  gradient, 
  animationDuration, 
  delay,
  interactive = true
}: Nebula & { interactive: boolean }) => {
  // Référence pour les transformations
  const initialValues = useRef({
    x,
    y,
    rotation,
  });

  return (
    <motion.div
      className="absolute rounded-full opacity-40 mix-blend-screen pointer-events-none"
      style={{
        width: size,
        height: size,
        background: gradient,
        x: initialValues.current.x,
        y: initialValues.current.y,
        rotate: initialValues.current.rotation,
        filter: `blur(${size / 5}px)`,
        opacity: 0,
      }}
      animate={interactive ? {
        x: [
          initialValues.current.x,
          initialValues.current.x + (Math.random() * 40 - 20),
          initialValues.current.x - (Math.random() * 30 - 15),
          initialValues.current.x,
        ],
        y: [
          initialValues.current.y,
          initialValues.current.y - (Math.random() * 40 - 20),
          initialValues.current.y + (Math.random() * 30 - 15),
          initialValues.current.y,
        ],
        rotate: [
          initialValues.current.rotation,
          initialValues.current.rotation + 5,
          initialValues.current.rotation - 3,
          initialValues.current.rotation,
        ],
        scale: [0.9, 1.05, 0.98, 0.9],
        opacity: [0, opacity * 0.5, opacity, 0],
      } : {
        scale: [0.9, 1.05, 0.98, 0.9],
        opacity: [0, opacity * 0.5, opacity, 0],
      }}
      transition={{
        duration: animationDuration,
        times: [0, 0.4, 0.7, 1],
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
    />
  );
};

// Composant de lumière stellaire pour les points brillants
const StarLight = ({ 
  x, 
  y, 
  size, 
  color, 
  delay = 0 
}: { 
  x: number; 
  y: number; 
  size: number; 
  color: string; 
  delay?: number;
}) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      backgroundColor: 'white',
      filter: `drop-shadow(0 0 ${size/2}px ${color})`,
      x,
      y,
    }}
    animate={{
      opacity: [0.4, 1, 0.4],
      scale: [0.8, 1.2, 0.8],
    }}
    transition={{
      duration: 2 + Math.random() * 2,
      repeat: Infinity,
      delay,
    }}
  />
);

// Composant principal de l'arrière-plan cosmique
export function CosmicBackground({
  className = "",
  intensity = 'moderate',
  colorScheme = 'default',
  interactive = true,
  animated = true,
}: CosmicBackgroundProps) {
  // Références pour le conteneur et les dimensions
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 100, height: 100 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Calcul des paramètres d'intensité
  const intensityFactors = {
    subtle: { particleFactor: 0.6, nebulaFactor: 0.4, starFactor: 0.5 },
    moderate: { particleFactor: 1, nebulaFactor: 1, starFactor: 1 },
    intense: { particleFactor: 1.5, nebulaFactor: 1.3, starFactor: 1.8 },
  };
  
  const factor = intensityFactors[intensity];
  const palette = COLOR_PALETTES[colorScheme];
  
  // Effet pour suivre les dimensions du conteneur
  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };
    
    // Mise à jour initiale
    updateDimensions();
    
    // Observer pour les changements de taille
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(containerRef.current);
    
    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);
  
  // Effet pour le suivi de la souris (effet de parallaxe)
  useEffect(() => {
    if (!interactive) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Normaliser les coordonnées par rapport au centre
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        setMousePosition({ x, y });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  // Générer les particules en fonction des dimensions
  const particles = React.useMemo(() => {
    if (dimensions.width === 0) return [];
    
    // Calculer le nombre de particules en fonction de la taille de l'écran
    const area = dimensions.width * dimensions.height;
    const count = Math.min(Math.floor(area / 10000 * PARTICLES_PER_1000_PIXELS * factor.particleFactor), 50);
    
    return Array.from({ length: count }).map((_, i) => ({
      id: `particle-${i}`,
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      size: Math.random() * 5 + 2, // Taille variée pour plus de naturel
      opacity: Math.random() * 0.3 + 0.2, // Opacité variée
      color: palette[Math.floor(Math.random() * palette.length)].color,
      speed: Math.random() * 8 + 5, // Vitesse variée
      delay: Math.random() * 5,
    }));
  }, [dimensions, factor.particleFactor, palette]);

  // Générer les nébuleuses pour un effet cosmique
  const nebulae = React.useMemo(() => {
    if (dimensions.width === 0) return [];
    
    // Nombre de nébuleuses proportionnel à la taille de l'écran
    const count = Math.min(Math.ceil(Math.sqrt(dimensions.width * dimensions.height) / 400 * factor.nebulaFactor), 5);
    
    return Array.from({ length: count }).map((_, i) => {
      // Sélectionner deux couleurs de la palette
      const color1 = palette[Math.floor(Math.random() * palette.length)].color;
      const color2 = palette[Math.floor(Math.random() * palette.length)].color;
      
      // Créer un dégradé unique
      const angle = Math.floor(Math.random() * 360);
      const gradient = `linear-gradient(${angle}deg, ${color1}40, ${color2}30)`;
      
      return {
        id: `nebula-${i}`,
        x: Math.random() * dimensions.width * 0.8,
        y: Math.random() * dimensions.height * 0.8,
        size: Math.random() * 300 + 150, // Tailles variées pour plus de profondeur
        rotation: Math.random() * 360,
        opacity: 0.3 + Math.random() * 0.3,
        gradient,
        animationDuration: Math.random() * 40 + 30, // Animation lente pour un effet majestueux
        delay: Math.random() * 10,
      };
    });
  }, [dimensions, factor.nebulaFactor, palette]);

  // Générer des points lumineux stellaires
  const starLights = React.useMemo(() => {
    if (dimensions.width === 0) return [];
    
    // Nombre d'étoiles proportionnel à la taille
    const count = Math.min(Math.floor(Math.sqrt(dimensions.width * dimensions.height) / 100 * factor.starFactor), 15);
    
    return Array.from({ length: count }).map((_, i) => ({
      id: `star-${i}`,
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      size: Math.random() * 2 + 1,
      color: palette[Math.floor(Math.random() * palette.length)].color,
      delay: Math.random() * 3,
    }));
  }, [dimensions, factor.starFactor, palette]);

  // Calculer l'offset de parallaxe basé sur la position de la souris
  const parallaxOffset = {
    x: mousePosition.x * MAX_PARALLAX_OFFSET,
    y: mousePosition.y * MAX_PARALLAX_OFFSET,
  };

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ perspective: '1000px' }}
    >
      {/* Effet de profondeur avec dégradé subtil */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at center, ${palette[0].color}05 0%, ${palette[1].color}10 50%, ${palette[2].color}05 100%)`,
        }}
      />
      
      {/* Couche de nébuleuses */}
      <motion.div 
        className="absolute inset-0"
        animate={interactive ? { x: parallaxOffset.x * 0.2, y: parallaxOffset.y * 0.2 } : {}}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.5 }}
      >
        {animated && nebulae.map((nebula) => (
          <Nebula key={nebula.id} {...nebula} interactive={interactive} />
        ))}
      </motion.div>
      
      {/* Couche de particules avec effet de parallaxe plus prononcé */}
      <motion.div 
        className="absolute inset-0"
        animate={interactive ? { x: parallaxOffset.x * 0.5, y: parallaxOffset.y * 0.5 } : {}}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.3 }}
      >
        {animated && particles.map((particle) => (
          <Particle key={particle.id} {...particle} interactive={interactive} />
        ))}
      </motion.div>
      
      {/* Couche d'étoiles brillantes */}
      <motion.div 
        className="absolute inset-0"
        animate={interactive ? { x: parallaxOffset.x * 0.7, y: parallaxOffset.y * 0.7 } : {}}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
      >
        {animated && starLights.map((star) => (
          <StarLight key={star.id} {...star} />
        ))}
      </motion.div>
    </div>
  );
}

export default CosmicBackground;
