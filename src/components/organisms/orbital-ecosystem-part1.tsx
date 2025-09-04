"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Composants personnalisés
import CosmicBackground from "@/components/ui/cosmic-background";
import OrbitalNode from "@/components/ui/orbital-node";
import { 
  AnimatedCircle, 
  GlowEffect, 
  OrbitPath,
  FloatingItem,
  fadeInUpVariants,
  scaleInVariants,
  staggerContainerVariants,
  ANIMATION_SETTINGS
} from '@/components/ui/orbital-animations';

// Données et utils
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

// Composant GeniusPopup - Affiche les détails de Genius quand on clique sur le noyau central
export const GeniusPopup: React.FC<{ 
  onClose: () => void 
}> = ({ onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-xl w-full max-h-[80vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 25 
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-1.5 bg-gradient-to-r from-gray-900 via-black to-gray-900"></div>
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
              onClick={onClose}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 items-center mb-8">
            <div className="relative w-24 h-24 bg-white rounded-xl shadow-md p-3 flex items-center justify-center">
              <AnimatedCircle 
                size={80} 
                strokeWidth={1} 
                color="#000000" 
                opacity={0.2} 
                animate={true}
                className="absolute"
              />
              <Image
                src="/item_images/logo_filiale_rectangulaire/logo_genius_black.png"
                alt="GENIUS"
                width={80}
                height={50}
                className="object-contain relative z-10"
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
            <motion.div 
              className="bg-gray-50 p-4 rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                  <path d="M12 16L12 8M12 8L8 12M12 8L16 12" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Notre rôle central
              </h4>
              <p className="text-gray-700 text-sm">GENIUS intègre et coordonne les compétences de chaque filiale, permettant une synergie unique et des solutions sur mesure pour vos projets.</p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-50 p-4 rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Nos expertises
              </h4>
              <div className="flex flex-wrap gap-2">
                {['Stratégie', 'Innovation', 'Direction Créative', 'Conception Globale'].map((skill, i) => (
                  <motion.span 
                    key={`skill-${i}`}
                    className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-black text-white"
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + 0.1 * i }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Link 
              href="/"
              className="inline-flex items-center px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
            >
              Découvrir notre écosystème
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Composant DetailCard - Affiche les détails d'une filiale sélectionnée
export const DetailCard: React.FC<{
  item: OrbitalItem;
}> = ({ item }) => {
  return (
    <motion.div
      className="w-full max-w-md"
      variants={fadeInUpVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Card className="bg-white/90 backdrop-blur-md border-gray-200 shadow-xl overflow-hidden">
        <CardHeader className="pb-2 pt-6 flex flex-row items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge
                className="px-3 py-1 text-xs font-medium"
                style={{ backgroundColor: item.color, color: "white" }}
              >
                {item.date}
              </Badge>
              <div className="flex-1 h-[1px] bg-gray-100"></div>
            </div>
            <CardTitle className="text-base font-medium text-gray-900">
              {item.title}
            </CardTitle>
          </div>
          <div className="w-16 h-16 rounded-lg bg-white shadow-md p-2 flex items-center justify-center">
            <Image
              src={item.logo}
              alt={item.title}
              width={48}
              height={28}
              className="object-contain"
            />
          </div>
        </CardHeader>
        <CardContent className="text-sm text-gray-700">
          <p className="leading-relaxed">{item.content}</p>

          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="flex items-center text-gray-900 font-medium">
                <Sparkles size={12} className="mr-1" style={{ color: item.color }} />
                Expertise
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {item.expertise.map((skill, i) => (
                <motion.span 
                  key={`${item.id}-skill-${i}`}
                  className="inline-block px-2 py-1 text-xs font-medium rounded-md"
                  style={{ 
                    backgroundColor: `${item.color}15`,
                    color: `${item.color}`,
                    border: `1px solid ${item.color}30`
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
              href={item.link}
              className="inline-flex items-center text-xs font-medium px-4 py-2 rounded-md transition-all duration-200"
              style={{ 
                backgroundColor: `${item.color}10`,
                color: item.color
              }}
            >
              {item.linkText}
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
  );
};
