"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Building, Zap, Rocket, Gamepad2, Paintbrush } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Données des filiales
interface SubsidiaryData {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  color: string;
  description: string;
  link: string;
  linkText?: string;
  expertise: string[];
  role: string;
  icon: React.ElementType;
}

const subsidiariesData: SubsidiaryData[] = [
  {
    id: 'genius',
    name: 'GENIUS AD DISTRICT',
    shortName: 'GENIUS',
    logo: '/item_images/logo_filiale_rectangulaire/logo_genius_black.png',
    color: '#000000',
    description: 'Au cœur de l\'écosystème, GENIUS AD DISTRICT orchestre l\'ensemble des expertises.',
    link: '/',
    linkText: 'Découvrir notre écosystème',
    expertise: ['Stratégie', 'Innovation', 'Direction Créative', 'Conception Globale'],
    role: 'CONCEPTEUR',
    icon: Building
  },
  {
    id: 'mps',
    name: 'MPS',
    shortName: 'MPS',
    logo: '/item_images/logo_filiale_rectangulaire/logo_mps_black.png',
    color: '#0066FF',
    description: 'Experte en production événementielle, MPS transforme les concepts en réalités tangibles.',
    link: '/filiales/mps',
    linkText: 'Explorer MPS',
    expertise: ['Production Technique', 'Logistique', 'Gestion de Projet'],
    role: 'PRODUCTEUR',
    icon: Zap
  },
  {
    id: 'labrigad',
    name: 'LABRIG\'AD',
    shortName: 'LABRIG\'AD',
    logo: '/item_images/logo_filiale_rectangulaire/logo_labrigad_black.png',
    color: '#FF3300',
    description: 'Spécialiste du déploiement terrain, LABRIG\'Ad maximise l\'impact de votre marque.',
    link: '/filiales/labrigad',
    linkText: 'Découvrir LABRIG\'Ad',
    expertise: ['Street Marketing', 'Activation Terrain', 'Déploiement'],
    role: 'ACTIVATEUR',
    icon: Rocket
  },
  {
    id: 'gamius',
    name: 'GAMIUS',
    shortName: 'GAMIUS',
    logo: '/item_images/logo_filiale_rectangulaire/logo_gamius_black.png',
    color: '#9933FF',
    description: 'Gamius transforme vos objectifs en expériences ludiques et engageantes.',
    link: '/filiales/gamius',
    linkText: 'Jouer avec Gamius',
    expertise: ['Gamification', 'Expériences Interactives', 'Technologies Immersives'],
    role: 'IMMERSEUR',
    icon: Gamepad2
  },
  {
    id: 'moujeleell',
    name: 'MOOJ&LEEL',
    shortName: 'MOOJ&LEEL',
    logo: '/item_images/logo_filiale_rectangulaire/logo_moujeleell_black.png',
    color: '#00CC66',
    description: 'Atelier de mobilier sur mesure, Mouje & Leell façonne des pièces uniques.',
    link: '/filiales/moujeleell',
    linkText: 'Découvrir Mouje & Leell',
    expertise: ['Design d\'Espace', 'Mobilier Sur Mesure', 'Aménagement'],
    role: 'DESIGNER',
    icon: Paintbrush
  },
];

export default function OrbitalEcosystem() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  
  return (
    <section id="ecosystem" ref={sectionRef} className="py-32 px-8 relative overflow-hidden bg-white">
      {/* Cercles décoratifs de fond */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[30%] h-[30%] rounded-full bg-gradient-to-r from-blue-100 to-purple-100"></div>
        <div className="absolute top-[20%] -right-[5%] w-[15%] h-[15%] rounded-full bg-gradient-to-r from-amber-100 to-orange-100"></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[25%] h-[25%] rounded-full bg-gradient-to-r from-green-100 to-teal-100"></div>
      </div>

      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
        }}
      >
        <div className="flex flex-col items-center mb-12">
          <motion.h2 
            className="text-4xl font-bold text-center mb-4"
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
          >
            Notre Écosystème d'Expertises
          </motion.h2>
          <motion.p
            className="text-gray-600 text-xl text-center max-w-2xl"
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }
            }}
          >
            Des filiales complémentaires pour une expérience complète
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
          {subsidiariesData.map((subsidiary) => (
            <motion.div
              key={subsidiary.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <CardHeader className="pb-2" style={{ backgroundColor: `${subsidiary.color}10` }}>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold">{subsidiary.shortName}</CardTitle>
                    {subsidiary.icon && <subsidiary.icon className="h-5 w-5" style={{ color: subsidiary.color }} />}
                  </div>
                  <Badge className="mt-1" style={{ backgroundColor: subsidiary.color, color: 'white' }}>
                    {subsidiary.role}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 mb-4">{subsidiary.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2 mb-4">
                      {subsidiary.expertise.map((skill, i) => (
                        <span 
                          key={i}
                          className="inline-block px-2 py-1 text-[10px] font-medium rounded-md"
                          style={{ 
                            backgroundColor: `${subsidiary.color}15`,
                            color: subsidiary.color,
                            border: `1px solid ${subsidiary.color}30`
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    {subsidiary.linkText && (
                      <Link 
                        href={subsidiary.link}
                        className="inline-flex items-center text-xs font-medium"
                        style={{ color: subsidiary.color }}
                      >
                        {subsidiary.linkText}
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
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Légende synergique */}
        <motion.div 
          className="mt-8 max-w-3xl mx-auto text-center"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4 } }
          }}
        >
          <p className="italic text-lg text-gray-700">
            "Notre force réside dans la complémentarité de nos expertises, 
            créant un écosystème où chaque composante enrichit l'ensemble."
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
