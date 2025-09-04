"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useAnimation, useInView } from 'framer-motion';
import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import AnimatedBackground from "@/components/ui/animated-background";
import OrbitalNode from "@/components/ui/orbital-node";
import { createOrbitalData, OrbitalItem } from './orbital-ecosystem-data';

export default function OrbitalEcosystemV2() {
  // État pour les données orbitales et l'interaction
  const [orbitalData, setOrbitalData] = useState<OrbitalItem[]>(createOrbitalData());
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset, setCenterOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(1); // Genius actif par défaut
  const [mousePosition, setMousePosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [showGeniusPopup, setShowGeniusPopup] = useState<boolean>(false);
  const [rotationSpeed, setRotationSpeed] = useState<number>(0.15); // Vitesse de rotation ajustable
  
  // Références pour les éléments DOM
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement>>({});
  const sectionRef = useRef<HTMLElement>(null);
  
  // Animation pour l'apparition de la section
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const controls = useAnimation();

  // Effet pour lancer les animations lorsque la section est visible
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Effet pour suivre la position de la souris pour des effets parallaxe
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Gestion des clics sur le conteneur (désélection)
  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(1); // Revenir à Genius comme actif
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  // Basculement de l'état de sélection des nœuds
  const toggleItem = (id: number) => {
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

        // Faire pulser les nœuds reliés
        const relatedItems = getRelatedItemsById(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        // Centrer la vue sur le nœud sélectionné
        centerViewOnNode(id);
      } else {
        // Si l'item est désélectionné, revenir à Genius
        setActiveNodeId(1);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  // Effet pour la rotation automatique de l'orbite - version améliorée avec animation fluide
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
  }, [autoRotate, rotationSpeed]);  // Dépend aussi de la vitesse de rotation

  // Centrer la vue sur un nœud spécifique
  const centerViewOnNode = (nodeId: number) => {
    if (!nodeRefs.current[nodeId]) return;

    const nodeIndex = orbitalData.findIndex((item) => item.id === nodeId);
    const totalNodes = orbitalData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  // Calculer la position de chaque nœud dans l'orbite
  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 240; // Rayon augmenté pour plus d'espace entre les nœuds
    const radian = (angle * Math.PI) / 180;

    // Effet de parallaxe subtil basé sur la position de la souris
    const parallaxFactor = 0.03;
    const parallaxX = mousePosition.x * parallaxFactor;
    const parallaxY = mousePosition.y * parallaxFactor;

    const x = radius * Math.cos(radian) + centerOffset.x + parallaxX;
    const y = radius * Math.sin(radian) + centerOffset.y + parallaxY;

    // Amélioration de la perspective et de l'opacité pour un effet 3D
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.7, Math.min(1, 0.7 + 0.3 * ((1 + Math.sin(radian)) / 2)));

    return { x, y, angle, zIndex, opacity };
  };

  // Obtenir les nœuds reliés à un nœud spécifique
  const getRelatedItemsById = (itemId: number): number[] => {
    const currentItem = orbitalData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  // Vérifier si un nœud est relié au nœud actif
  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItemsById(activeNodeId);
    return relatedItems.includes(itemId);
  };

  // Obtenir la couleur appropriée en fonction du statut
  const getColorForStatus = (status: "completed" | "in-progress" | "pending", color: string): string => {
    switch (status) {
      case "in-progress":
        return color;
      case "completed":
        return color;
      case "pending":
        return `${color}80`; // Ajouter transparence
      default:
        return color;
    }
  };

  // Obtenir les détails du nœud actif
  const activeItem = activeNodeId ? orbitalData.find(item => item.id === activeNodeId) : orbitalData[0];

  return (
    <section ref={sectionRef} id="ecosystem" className="py-32 px-8 relative overflow-hidden bg-white">
      {/* Arrière-plan animé avec particules et cercles flottants */}
      <AnimatedBackground className="opacity-80" />

      {/* Superposition d'effets lumineux */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-white opacity-50 pointer-events-none"></div>

      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.2 }
          }
        }}
      >
        {/* En-tête de section avec animation d'apparition */}
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
          className="w-full h-[650px] md:h-[700px] flex flex-col items-center justify-center overflow-hidden relative"
          ref={containerRef}
          onClick={handleContainerClick}
        >
          {/* Effet de scintillement dynamique */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
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

          <div
            className="relative w-full h-full flex items-center justify-center"
            ref={orbitRef}
            style={{
              perspective: "1200px",
              transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
            }}
          >
            {/* Contrôle de vitesse d'orbite - version mobile uniquement */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2 p-2 bg-white/80 backdrop-blur-sm rounded-full z-50 md:hidden">
              <button 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${!autoRotate ? 'bg-black text-white' : 'bg-gray-200'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setAutoRotate(!autoRotate);
                }}
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
                onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
                className="w-24 accent-black"
                disabled={!autoRotate}
              />
            </div>
            {/* Centre orbital - Genius avec click handler */}
            <motion.div 
              className="absolute w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-gray-800 via-black to-gray-700 flex items-center justify-center z-30 shadow-xl cursor-pointer"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              onClick={(e) => {
                e.stopPropagation();
                setShowGeniusPopup(true);
                setAutoRotate(false);
              }}
            >
              <motion.div 
                className="absolute w-36 h-36 md:w-44 md:h-44 rounded-full border border-gray-300/30"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.5, scale: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              />
              <motion.div 
                className="absolute w-44 h-44 md:w-52 md:h-52 rounded-full border border-gray-300/20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ duration: 3, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
              />
              <motion.div 
                className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src="/item_images/logo_filiale_rectangulaire/logo_genius_black.png"
                  alt="GENIUS"
                  width={70}
                  height={40}
                  className="object-contain p-2"
                />
              </motion.div>
              {/* Texte indiquant de cliquer - Mobile Only */}
              <span className="absolute -bottom-8 text-xs text-center text-gray-600 bg-white/70 rounded-full px-2 py-1 md:hidden">
                Cliquez pour voir
              </span>
            </motion.div>

            {/* Cercle orbital avec effet de lueur */}
            <motion.div 
              className="absolute rounded-full opacity-60"
              style={{
                width: "480px",
                height: "480px",
                border: "1px solid rgba(200, 200, 200, 0.3)",
                boxShadow: "0 0 30px rgba(255, 255, 255, 0.5) inset",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 1.5 }}
            />

            {/* Noeuds des filiales */}
            {orbitalData.map((item, index) => {
              if (index === 0) return null; // Skip Genius, already in center
              
              const position = calculateNodePosition(index, orbitalData.length - 1);
              const isExpanded = expandedItems[item.id];
              const isRelated = isRelatedToActive(item.id);
              const isPulsing = pulseEffect[item.id];

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
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleItem(item.id);
                  }}
                />
              );
            })}

            {/* Lignes de connexion avec animation */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.1)" />
                  <stop offset="50%" stopColor="rgba(255, 255, 255, 0.7)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.1)" />
                </linearGradient>
                
                {orbitalData.map((item, index) => (
                  <linearGradient key={`gradient-${item.id}`} id={`lineGradient-${item.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={`${item.color}20`} />
                    <stop offset="50%" stopColor={item.color} />
                    <stop offset="100%" stopColor={`${item.color}20`} />
                  </linearGradient>
                ))}
              </defs>
              
              {orbitalData.map((source, sourceIndex) => {
                if (sourceIndex === 0) return null; // Genius est déjà au centre
                
                const sourcePos = calculateNodePosition(sourceIndex, orbitalData.length - 1);
                const centerX = 0;
                const centerY = 0;
                
                const isActive = activeNodeId === source.id || activeNodeId === 1;
                const strokeGradient = isActive ? `url(#lineGradient-${source.id})` : "url(#lineGradient)";
                const strokeWidth = isActive ? 1.5 : 0.75;
                const strokeOpacity = isActive ? 1 : 0.5;
                
                return (
                  <motion.line
                    key={`line-${source.id}-center`}
                    x1={sourcePos.x}
                    y1={sourcePos.y}
                    x2={centerX}
                    y2={centerY}
                    stroke={strokeGradient}
                    strokeWidth={strokeWidth}
                    strokeOpacity={strokeOpacity}
                    strokeDasharray={isActive ? "none" : "3,3"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: strokeOpacity }}
                    transition={{ duration: 1 }}
                  />
                );
              })}
            </svg>
          </div>
          
          {/* Popup pour Genius au centre */}
          <AnimatePresence mode="wait">
            {showGeniusPopup && (
              <motion.div
                key="genius-popup"
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowGeniusPopup(false)}
              >
                <motion.div
                  className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-xl w-full max-h-[80vh] overflow-y-auto"
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-1 bg-gradient-to-r from-gray-900 via-black to-gray-900"></div>
                  <div className="p-6 md:p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-2xl font-semibold text-gray-900">GENIUS AD DISTRICT</h3>
                        <p className="text-sm text-gray-500 mt-1">Le noyau de l'écosystème</p>
                      </div>
                      <motion.button
                        className="p-2 rounded-full hover:bg-gray-100"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowGeniusPopup(false)}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18 6L6 18M6 6L18 18" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.button>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-6 items-center mb-8">
                      <div className="w-24 h-24 bg-white rounded-xl shadow-md p-3 flex items-center justify-center">
                        <Image
                          src="/item_images/logo_filiale_rectangulaire/logo_genius_black.png"
                          alt="GENIUS"
                          width={80}
                          height={50}
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700 leading-relaxed">
                          Au cœur de l'écosystème, GENIUS AD DISTRICT orchestre l'ensemble des expertises. 
                          Notre vision stratégique et créative coordonne les forces de chaque filiale pour 
                          livrer des solutions complètes et innovantes.
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                            <path d="M12 16L12 8M12 8L8 12M12 8L16 12" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Notre rôle central
                        </h4>
                        <p className="text-gray-700 text-sm">GENIUS intègre et coordonne les compétences de chaque filiale, permettant une synergie unique et des solutions sur mesure pour vos projets.</p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Nos expertises
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 text-xs font-medium rounded-full bg-black text-white">Stratégie</span>
                          <span className="px-3 py-1 text-xs font-medium rounded-full bg-black text-white">Innovation</span>
                          <span className="px-3 py-1 text-xs font-medium rounded-full bg-black text-white">Direction Créative</span>
                          <span className="px-3 py-1 text-xs font-medium rounded-full bg-black text-white">Conception Globale</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <Link 
                        href="/"
                        className="inline-flex items-center px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
                      >
                        Découvrir notre écosystème
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          
            {/* Carte détaillée de la filiale active */}
            {activeItem && expandedItems[activeItem.id] && (
              <motion.div
                key={`card-${activeItem.id}`}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="bg-white/90 backdrop-blur-md border-gray-200 shadow-xl overflow-hidden">
                  <CardHeader className="pb-2 pt-6 flex flex-row items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          className="px-3 py-1 text-xs font-medium"
                          style={{ backgroundColor: activeItem.color, color: "white" }}
                        >
                          {activeItem.date}
                        </Badge>
                        <div className="flex-1 h-[1px] bg-gray-100"></div>
                      </div>
                      <CardTitle className="text-base font-medium text-gray-900">
                        {activeItem.title}
                      </CardTitle>
                    </div>
                    <div className="w-16 h-16 rounded-lg bg-white shadow-md p-2 flex items-center justify-center">
                      <Image
                        src={activeItem.logo}
                        alt={activeItem.title}
                        width={48}
                        height={28}
                        className="object-contain"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-700">
                    <p className="leading-relaxed">{activeItem.content}</p>

                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <div className="flex justify-between items-center text-xs mb-2">
                        <span className="flex items-center text-gray-900 font-medium">
                          <Sparkles size={12} className="mr-1" style={{ color: activeItem.color }} />
                          Expertise
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {activeItem.expertise.map((skill, i) => (
                          <motion.span 
                            key={`${activeItem.id}-skill-${i}`}
                            className="inline-block px-2 py-1 text-xs font-medium rounded-md"
                            style={{ 
                              backgroundColor: `${activeItem.color}15`,
                              color: `${activeItem.color}`,
                              border: `1px solid ${activeItem.color}30`
                            }}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * i }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 pt-1">
                      <Link 
                        href={activeItem.link}
                        className="inline-flex items-center text-xs font-medium px-4 py-2 rounded-md transition-all duration-200"
                        style={{ 
                          backgroundColor: `${activeItem.color}10`,
                          color: activeItem.color
                        }}
                      >
                        {activeItem.linkText}
                        <svg 
                          width="14" 
                          height="14" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                          className="ml-1"
                        >
                          <path 
                            d="M5 12H19M19 12L12 5M19 12L12 19" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Citation de la synérgie */}
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
