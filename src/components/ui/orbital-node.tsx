"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useAnimation, AnimationDefinition } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GlowEffect, AnimatedCircle, ANIMATION_SETTINGS } from './orbital-animations';

interface OrbitalNodeProps {
  id: number;
  title: string;
  role: string;
  logo: string;
  color: string;
  energy: number;
  position: { x: number; y: number; zIndex: number; opacity: number };
  isExpanded: boolean;
  isRelated: boolean;
  isPulsing: boolean;
  isActive: boolean;
  rotationSpeed?: number;
  onClick: (e: React.MouseEvent) => void;
  index: number;
  total: number;
}

export function OrbitalNode({
  id,
  title,
  role,
  logo,
  color,
  energy,
  position,
  isExpanded,
  isRelated,
  isPulsing,
  isActive,
  rotationSpeed = 80,
  onClick,
  index,
  total
}: OrbitalNodeProps) {
  // Refs et state
  const nodeRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [hovered, setHovered] = useState(false);
  
  // Proportion dorée (1.618) - La règle de l'art du design
  const goldenRatio = 1.618;
  
  // Calculer les tailles basées sur des proportions harmonieuses
  const nodeSize = isExpanded ? 64 : 54; // Taille augmentée pour un meilleur impact visuel
  const logoSize = isExpanded ? nodeSize * 0.75 : nodeSize * 0.7; // Plus grande proportion pour le logo
  const borderWidth = isExpanded ? 3 : 2;
  const orbitRadius = isExpanded ? nodeSize * 0.7 : nodeSize * 0.6;
  
  // Calculer l'angle spécifique au nœud pour des animations décalées
  const nodeAngle = (index / total) * 360;
  const phaseDelay = nodeAngle / 360 * ANIMATION_SETTINGS.PULSE_DURATION;
  
  // Animation variants avec courbes d'accélération professionnelles
  const nodeVariants = {
    initial: { 
      scale: 0.5, 
      opacity: 0.5,
      filter: `drop-shadow(0 0 8px ${color}00)`
    },
    animate: { 
      scale: 1, 
      opacity: 1,
      filter: `drop-shadow(0 0 12px ${color}60)`,
      transition: {
        scale: { 
          duration: 0.8, 
          type: "spring",
          stiffness: 200,
          damping: 20,
        },
        opacity: { 
          duration: 0.8, 
          ease: "easeOut" 
        },
        filter: { 
          duration: 1.2, 
          ease: "easeInOut" 
        }
      }
    },
    pulse: {
      scale: [1, 1.08, 1],
      filter: [
        `drop-shadow(0 0 12px ${color}60)`,
        `drop-shadow(0 0 25px ${color}80)`,
        `drop-shadow(0 0 12px ${color}60)`,
      ],
      transition: {
        duration: ANIMATION_SETTINGS.PULSE_DURATION * 1.2, // Animation plus lente, plus fluide
        times: [0, 0.5, 1],
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut",
      },
    },
    hover: {
      scale: 1.08,
      filter: `drop-shadow(0 0 20px ${color}70)`,
      transition: {
        scale: {
          duration: 0.3,
          ease: [0.34, 1.56, 0.64, 1]
        },
        filter: {
          duration: 0.4,
          ease: "easeOut"
        }
      },
    },
    tap: {
      scale: 0.96,
      transition: {
        duration: 0.15,
        ease: "easeInOut"
      },
    },
    expanded: {
      scale: 1.15,
      filter: `drop-shadow(0 0 25px ${color}80)`,
      transition: {
        scale: {
          duration: 0.5,
          ease: [0.34, 1.56, 0.64, 1]
        },
        filter: {
          duration: 0.6,
          ease: "easeOut"
        }
      }
    }
  };

  // Animation variants pour le texte
  const textVariants = {
    initial: { 
      opacity: 0.6, 
      y: 5, 
      scale: 0.9,
      filter: "blur(1px)"
    },
    animate: { 
      opacity: isExpanded ? 1 : 0.8, 
      y: 0, 
      scale: isExpanded ? 1.05 : 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  // Effet pour déclencher les animations
  useEffect(() => {
    if (isExpanded) {
      controls.start("expanded");
    } else if (isPulsing) {
      controls.start("pulse");
    } else {
      controls.start("animate");
    }
  }, [isExpanded, isPulsing, controls]);

  // Déterminer le style de base du nœud avec transformation 3D pour plus de profondeur
  const nodeStyle = {
    transform: `translate3d(${position.x}px, ${position.y}px, ${isExpanded ? 20 : 0}px)`,
    zIndex: isExpanded ? 200 : position.zIndex,
    opacity: isExpanded ? 1 : position.opacity,
  };

  return (
    <div
      ref={nodeRef}
      className="absolute transition-all duration-700 cursor-pointer"
      style={nodeStyle}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Effet de lueur externe */}
      {isPulsing && (
        <GlowEffect 
          color={color}
          size={nodeSize * 3.5}
          intensity={0.5}
          pulseSpeed={ANIMATION_SETTINGS.PULSE_DURATION}
          className="-z-10"
        />
      )}
      
      {/* Orbites décoratives autour du nœud - seulement pour les nœuds actifs/pulsants */}
      {(isPulsing || isExpanded) && (
        <>
          <AnimatedCircle 
            size={nodeSize * 2.4}
            strokeWidth={1}
            color={color}
            opacity={0.3}
            delay={phaseDelay}
            duration={ANIMATION_SETTINGS.PULSE_DURATION}
          />
          <AnimatedCircle 
            size={nodeSize * 1.8}
            strokeWidth={1.5}
            color={color}
            opacity={0.4}
            delay={phaseDelay + 0.3}
            duration={ANIMATION_SETTINGS.PULSE_DURATION * 0.8}
          />
        </>
      )}

      {/* Cercle d'énergie avec proportions améliorées */}
      <motion.div
        className="absolute rounded-full"
        style={{
          background: `radial-gradient(circle, ${color}30 0%, ${color}00 70%)`,
          width: `${nodeSize * 1.5}px`,
          height: `${nodeSize * 1.5}px`,
          left: `-${(nodeSize * 1.5 - nodeSize) / 2}px`,
          top: `-${(nodeSize * 1.5 - nodeSize) / 2}px`,
          filter: `blur(${nodeSize/10}px)`
        }}
        initial={{ opacity: 0.5, scale: 0.9 }}
        animate={{
          opacity: [0.5, 0.7, 0.5],
          scale: [0.9, 1.05, 0.9],
        }}
        transition={{
          duration: ANIMATION_SETTINGS.PULSE_DURATION,
          repeat: Infinity,
          repeatType: "loop",
          delay: phaseDelay
        }}
      />

      {/* Cercle principal avec logo */}
      <motion.div
        className={cn(
          "rounded-full flex items-center justify-center",
          isExpanded ? "bg-white" : isRelated ? "bg-white" : "bg-white",
          "transition-all duration-500 transform backdrop-blur-sm"
        )}
        style={{
          width: `${nodeSize}px`,
          height: `${nodeSize}px`,
          borderWidth: borderWidth,
          borderStyle: "solid",
          borderColor: isExpanded || isRelated ? color : `${color}50`,
        }}
        variants={nodeVariants}
        initial="initial"
        animate={controls}
        whileHover="hover"
        whileTap="tap"
      >
        {/* Effet de lueur intérieure */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-0"
            style={{ backgroundColor: color }}
            initial={{ opacity: 0.1 }}
            animate={{ 
              opacity: isExpanded ? 0.2 : isRelated ? 0.15 : 0.1 
            }}
            transition={{ duration: 0.6 }}
          />
          <motion.div 
            className="absolute inset-0 bg-white backdrop-blur-sm"
            initial={{ opacity: 0.7 }}
            animate={{ 
              opacity: isExpanded ? 0.6 : 0.8 
            }}
            transition={{ duration: 0.6 }}
          />
        </div>

        {/* Logo de la filiale avec dimensions optimisées et mise en évidence */}
        <motion.div
          className="relative flex items-center justify-center z-10"
          style={{
            width: `${logoSize}px`,
            height: `${logoSize}px`,
          }}
          initial={{ scale: 0.8, opacity: 0.8 }}
          animate={{
            scale: isExpanded ? 1.2 : 1,
            opacity: 1,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 18,
            delay: 0.1
          }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={logo}
              alt={title}
              width={200}  // Dimensions augmentées pour une meilleure qualité
              height={100} // Dimensions augmentées pour une meilleure qualité
              className="object-contain w-full h-full"
              priority={true}
              quality={100}
              style={{ 
                filter: isExpanded 
                  ? `drop-shadow(0 0 4px rgba(0,0,0,0.35))` 
                  : hovered 
                  ? `drop-shadow(0 0 3px rgba(0,0,0,0.25))` 
                  : `drop-shadow(0 0 2px rgba(0,0,0,0.15))`,
              }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Étiquette du titre avec typographie améliorée */}
      <motion.div
        className={cn(
          "absolute whitespace-nowrap text-center left-1/2 -translate-x-1/2 font-medium tracking-wide",
          isExpanded ? "text-gray-900" : "text-gray-800"
        )}
        style={{ 
          top: `${nodeSize + 12}px`,
          fontSize: isExpanded ? '0.95rem' : '0.875rem',
          fontWeight: isExpanded ? 600 : 500,
          letterSpacing: isExpanded ? '0.02em' : '0.01em'
        }}
        variants={textVariants}
        initial="initial"
        animate="animate"
      >
        {title}
      </motion.div>

      {/* Étiquette du rôle avec typographie améliorée */}
      <motion.div
        className={cn(
          "absolute whitespace-nowrap text-center left-1/2 -translate-x-1/2 font-normal",
          isExpanded ? "text-gray-700" : "text-gray-500"
        )}
        style={{ 
          top: `${nodeSize + 32}px`,
          fontSize: '0.75rem',
          letterSpacing: '0.03em'
        }}
        variants={textVariants}
        initial="initial"
        animate="animate"
      >
        {role}
      </motion.div>

      {/* Ligne lumineuse sous le nœud lorsqu'il est sélectionné */}
      {isExpanded && (
        <motion.div
          className="absolute h-[2px] rounded-full left-1/2 -translate-x-1/2"
          style={{ 
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            top: `${nodeSize + 6}px`, 
            width: '60px' 
          }}
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 60 }}
          transition={{ 
            duration: 0.6,
            ease: [0.29, 0.98, 0.35, 1] // Courbe de transition élégante
          }}
        />
      )}
    </div>
  );
}

export default React.memo(OrbitalNode);
