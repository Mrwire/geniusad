"use client";

import { Building, Zap, Rocket, Gamepad2, Paintbrush } from "lucide-react";

// Types pour les données des filiales
export interface SubsidiaryData {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  color: string;
  description: string;
  link: string;
  linkText: string;
  expertise: string[];
  role: string;
  icon: React.ElementType;
}

export interface OrbitalItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
  logo: string;
  color: string;
  expertise: string[];
  link: string;
  linkText: string;
}

// Données des filiales
export const subsidiariesData: SubsidiaryData[] = [
  {
    id: 'genius',
    name: 'GENIUS AD DISTRICT',
    shortName: 'GENIUS',
    logo: '/item_images/logo_filiale_rectangulaire/logo_genius_black.png',
    color: '#000000',
    description: 'Au cœur de l\'écosystème, GENIUS AD DISTRICT orchestre l\'ensemble des expertises. Notre vision stratégique et créative coordonne les forces de chaque filiale pour livrer des solutions complètes et innovantes.',
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
    description: 'Experte en production événementielle, MPS transforme les concepts en réalités tangibles grâce à son expertise technique et logistique inégalée, garantissant des expériences impeccables.',
    link: '/filiales/mps',
    linkText: 'Explorer MPS',
    expertise: ['Production Technique', 'Logistique', 'Gestion de Projet', 'Exécution'],
    role: 'PRODUCTEUR',
    icon: Zap
  },
  {
    id: 'labrigad',
    name: 'LABRIG\'AD',
    shortName: 'LABRIG\'AD',
    logo: '/item_images/logo_filiale_rectangulaire/logo_labrigad_black.png',
    color: '#FF3300',
    description: 'Spécialiste du déploiement terrain, LABRIG\'Ad maximise l\'impact de votre marque à travers des activations impactantes et des interactions directes avec votre public cible.',
    link: '/filiales/labrigad',
    linkText: 'Découvrir LABRIG\'Ad',
    expertise: ['Street Marketing', 'Activation Terrain', 'Déploiement', 'Promotion'],
    role: 'ACTIVATEUR',
    icon: Rocket
  },
  {
    id: 'gamius',
    name: 'GAMIUS',
    shortName: 'GAMIUS',
    logo: '/item_images/logo_filiale_rectangulaire/logo_gamius_black.png',
    color: '#9933FF',
    description: 'Gamius transforme vos objectifs en expériences ludiques et engageantes, créant des interactions mémorables avec votre audience grâce à la gamification et aux technologies immersives.',
    link: '/filiales/gamius',
    linkText: 'Jouer avec Gamius',
    expertise: ['Gamification', 'Expériences Interactives', 'Technologies Immersives', 'Engagement'],
    role: 'IMMERSEUR',
    icon: Gamepad2
  },
  {
    id: 'moujeleell',
    name: 'MOOJ&LEEL',
    shortName: 'MOOJ&LEEL',
    logo: '/item_images/logo_filiale_rectangulaire/logo_mooj&leel_black.png',
    color: '#00CC66',
    description: 'Atelier de mobilier sur mesure, Mouje & Leell façonne des pièces uniques et des aménagements d\'espace qui allient fonctionnalité et design, pour des expériences sensorielles inoubliables.',
    link: '/filiales/moujeleell',
    linkText: 'Découvrir Mouje & Leell',
    expertise: ['Design d\'Espace', 'Mobilier Sur Mesure', 'Aménagement', 'Expérience Sensorielle'],
    role: 'DESIGNER',
    icon: Paintbrush
  },
];

// Convertir les données de filiales en structure pour le timeline orbital
export const createOrbitalData = (): OrbitalItem[] => {
  return subsidiariesData.map((sub, index) => ({
    id: index + 1,
    title: sub.shortName,
    date: sub.role,
    content: sub.description,
    category: sub.id,
    icon: sub.icon,
    relatedIds: getRelatedIds(index),
    status: index === 0 ? "in-progress" as const : "completed" as const,
    energy: index === 0 ? 100 : 80 - (index * 5),
    logo: sub.logo,
    color: sub.color,
    expertise: sub.expertise,
    link: sub.link,
    linkText: sub.linkText
  }));
};

// Générer des connexions entre filiales pour l'effet orbital
export const getRelatedIds = (index: number): number[] => {
  const total = subsidiariesData.length;
  let related = [];
  
  // Genius (index 0) est connecté à toutes les autres filiales
  if (index === 0) {
    for (let i = 1; i < total; i++) {
      related.push(i + 1);
    }
  } else {
    // Chaque filiale est connectée à Genius et potentiellement à d'autres
    related.push(1); // Genius a toujours l'ID 1
    
    // Ajouter des connexions circulaires
    const next = (index + 1) % total;
    if (next !== 0) related.push(next + 1);
    
    const prev = (index - 1 + total) % total;
    if (prev !== 0) related.push(prev + 1);
  }
  
  return related;
};
