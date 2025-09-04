"use client";

import { motion, useAnimation, AnimatePresence, Variant } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// Constantes pour les animations
export const ANIMATION_SETTINGS = {
  ORBIT_DURATION: 80, // Durée plus longue pour un mouvement plus majestueux
  NODE_SPRING: { stiffness: 300, damping: 20 }, // Ressort avec rebond naturel
  PULSE_DURATION: 4, // Durée du cycle de pulsation
  TRANSITION_BASE: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }, // Courbe d'accélération/décélération sophistiquée
  STAGGER_CHILDREN: 0.08, // Délai entre animations d'éléments enfants
  DELAY_BASE: 0.2, // Délai de base pour créer une séquence
};

// Types et interfaces
export interface AnimatedCircleProps {
  size: number;
  strokeWidth?: number;
  color: string;
  opacity?: number;
  delay?: number;
  duration?: number;
  className?: string;
  initialScale?: number;
  animate?: boolean;
  animateOnHover?: boolean;
}

export interface OrbitPathProps {
  radius: number;
  strokeWidth?: number;
  strokeColor?: string;
  strokeOpacity?: number;
  rotationSpeed?: number;
  reverse?: boolean;
  className?: string;
}

export interface FloatingItemProps {
  delay?: number;
  duration?: number;
  maxOffset?: number;
  children: React.ReactNode;
  className?: string;
}

export interface GlowEffectProps {
  color: string;
  size?: number;
  intensity?: number;
  pulseSpeed?: number;
  className?: string;
}

// Variants pour les animations
export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      ...ANIMATION_SETTINGS.TRANSITION_BASE,
      duration: 0.8
    }
  },
  exit: { 
    opacity: 0, 
    y: 10,
    transition: { 
      ...ANIMATION_SETTINGS.TRANSITION_BASE,
      duration: 0.4
    }
  }
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      ...ANIMATION_SETTINGS.TRANSITION_BASE,
      type: "spring",
      ...ANIMATION_SETTINGS.NODE_SPRING
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.9,
    transition: { 
      ...ANIMATION_SETTINGS.TRANSITION_BASE,
      duration: 0.3
    }
  }
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: ANIMATION_SETTINGS.STAGGER_CHILDREN,
      delayChildren: ANIMATION_SETTINGS.DELAY_BASE
    }
  }
};

// Composant pour animer un cercle avec pulsation
export const AnimatedCircle: React.FC<AnimatedCircleProps> = ({
  size,
  strokeWidth = 1,
  color,
  opacity = 0.5,
  delay = 0,
  duration = ANIMATION_SETTINGS.PULSE_DURATION,
  className = "",
  initialScale = 0.8,
  animate = true,
  animateOnHover = false
}) => {
  const controls = useAnimation();
  const hoverVariants = {
    initial: { scale: 1, opacity },
    hover: { 
      scale: 1.1, 
      opacity: opacity + 0.2,
      transition: { ...ANIMATION_SETTINGS.TRANSITION_BASE, duration: 0.3 }
    }
  };

  const pulseVariants = {
    initial: { scale: initialScale, opacity: opacity * 0.7 },
    animate: { 
      scale: 1, 
      opacity,
      transition: {
        scale: {
          repeat: Infinity,
          repeatType: "reverse",
          duration,
          ease: "easeInOut",
          delay
        },
        opacity: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: duration * 1.2,
          ease: "easeInOut",
          delay: delay + 0.2
        }
      }
    }
  };

  useEffect(() => {
    if (animate) {
      controls.start("animate");
    }
  }, [animate, controls]);

  return (
    <motion.div
      className={`rounded-full border absolute ${className}`}
      style={{
        width: size,
        height: size,
        borderColor: color,
        borderWidth: strokeWidth,
        left: `calc(50% - ${size/2}px)`,
        top: `calc(50% - ${size/2}px)`,
      }}
      initial="initial"
      animate={animate ? "animate" : "initial"}
      variants={pulseVariants}
      whileHover={animateOnHover ? "hover" : undefined}
      custom={controls}
    />
  );
};

// Composant pour créer un chemin orbital avec rotation
export const OrbitPath: React.FC<OrbitPathProps> = ({
  radius,
  strokeWidth = 1,
  strokeColor = "rgba(255, 255, 255, 0.2)",
  strokeOpacity = 0.3,
  rotationSpeed = 80, // Durée en secondes pour une rotation complète
  reverse = false,
  className = ""
}) => {
  return (
    <motion.div
      className={`absolute rounded-full border ${className}`}
      style={{
        width: radius * 2,
        height: radius * 2,
        borderColor: strokeColor,
        borderWidth: strokeWidth,
        opacity: strokeOpacity,
        left: `calc(50% - ${radius}px)`,
        top: `calc(50% - ${radius}px)`,
      }}
      animate={{
        rotate: reverse ? -360 : 360
      }}
      transition={{
        duration: rotationSpeed,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop"
      }}
    />
  );
};

// Composant pour faire flotter un élément avec un mouvement naturel
export const FloatingItem: React.FC<FloatingItemProps> = ({
  delay = 0,
  duration = 6,
  maxOffset = 10,
  children,
  className = ""
}) => {
  return (
    <motion.div
      className={className}
      initial={{ y: 0 }}
      animate={{
        y: [0, -maxOffset/2, maxOffset/2, 0],
        x: [0, maxOffset/3, -maxOffset/4, 0],
        rotate: [0, 1, -1, 0],
      }}
      transition={{
        duration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
        delay,
        times: [0, 0.33, 0.66, 1]
      }}
    >
      {children}
    </motion.div>
  );
};

// Composant pour créer un effet de lueur pulsante
export const GlowEffect: React.FC<GlowEffectProps> = ({
  color,
  size = 100,
  intensity = 0.6,
  pulseSpeed = 3,
  className = ""
}) => {
  return (
    <motion.div
      className={`absolute rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}${Math.round(intensity * 70).toString(16)} 0%, ${color}00 70%)`,
        left: `calc(50% - ${size/2}px)`,
        top: `calc(50% - ${size/2}px)`,
        filter: `blur(${size/10}px)`
      }}
      animate={{
        opacity: [intensity * 0.7, intensity, intensity * 0.7],
        scale: [0.95, 1.05, 0.95]
      }}
      transition={{
        duration: pulseSpeed,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop"
      }}
    />
  );
};

// Hook personnalisé pour animer selon le défilement
export function useScrollAnimation(threshold = 0.3) {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          controls.start("visible");
          setHasAnimated(true);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [controls, hasAnimated, threshold]);

  return { ref, controls, hasAnimated };
}

// Hook pour animer selon la position de la souris
export function useMousePosition(sensitivity = 0.05) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Normaliser par rapport au centre
        const x = (e.clientX - centerX) * sensitivity;
        const y = (e.clientY - centerY) * sensitivity;
        
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [sensitivity]);

  return { mousePosition, containerRef };
}

export default {
  AnimatedCircle,
  OrbitPath,
  FloatingItem,
  GlowEffect,
  useScrollAnimation,
  useMousePosition,
  ANIMATION_SETTINGS,
  fadeInUpVariants,
  scaleInVariants,
  staggerContainerVariants
};
