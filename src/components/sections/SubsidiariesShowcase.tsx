'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useAnimation, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SubsidiaryProps {
  name: string;
  logo: string;
  color: string;
  description: string;
  link: string;
  linkText: string;
}

const subsidiaries: SubsidiaryProps[] = [
  {
    name: 'MPS',
    logo: '/item_images/logo/MPS-logo-421x245.png',
    color: '#0066FF',
    description: 'Experte en production événementielle, MPS apporte son savoir-faire technique et logistique pour concrétiser vos concepts créatifs.',
    link: '/filiales/mps',
    linkText: 'Découvrir MPS',
  },
  {
    name: 'LABRIG\'Ad',
    logo: '/item_images/logo/labrigad-logo-600x244.png',
    color: '#FF3300',
    description: 'Spécialiste du déploiement terrain, LABRIG\'Ad assure une présence physique impactante de votre marque lors d\'événements.',
    link: '/filiales/labrigad',
    linkText: 'Découvrir LABRIG\'Ad',
  },
  {
    name: 'Gamius',
    logo: '/item_images/logo/gamiusgroup-631x311.png',
    color: '#9933FF',
    description: 'Référence en gaming et esport, Gamius conçoit des expériences ludiques et immersives pour engager vos audiences.',
    link: '/filiales/gamius',
    linkText: 'Découvrir Gamius',
  },
  {
    name: 'Mouje & Leell',
    logo: '/item_images/logo/genius_black.png', // Remplacer par le bon logo quand disponible
    color: '#00CC66',
    description: 'Studio de design et de création, Mouje & Leell façonne l\'identité visuelle et conceptuelle de vos projets avec audace.',
    link: '/filiales/moujeleell',
    linkText: 'Découvrir Mouje & Leell',
  },
];

const SubsidiaryCard: React.FC<SubsidiaryProps> = ({
  name,
  logo,
  color,
  description,
  link,
  linkText,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.6, 
            ease: [0.4, 0.0, 0.2, 1],
            delay: 0.1
          }
        }
      }}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
      style={{ borderTop: `4px solid ${color}` }}
    >
      <div className="p-6 flex-1 flex flex-col">
        <div className="relative h-16 mb-6 flex items-center">
          <div className="relative w-full h-full">
            <Image
              src={logo}
              alt={`Logo ${name}`}
              fill
              className="object-contain object-left"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>
        
        <h3 className="text-xl font-heading font-semibold mb-3">{name}</h3>
        
        <p className="text-gray-600 font-sans mb-6 flex-1">{description}</p>
        
        <Link 
          href={link}
          className={cn(
            "inline-flex items-center justify-center px-4 py-2 rounded-md border transition-colors duration-200 text-sm font-medium font-sans",
            "border-gray-200 hover:bg-gray-50",
            "hover:border-current",
          )}
          style={{ 
            color: color,
            borderColor: 'currentColor'
          }}
        >
          {linkText}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="ml-2"
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </Link>
      </div>
    </motion.div>
  );
};

export const SubsidiariesShowcase: React.FC = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-10% 0px" });
  const headerControls = useAnimation();
  
  useEffect(() => {
    if (isHeaderInView) {
      headerControls.start("visible");
    }
  }, [headerControls, isHeaderInView]);
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          ref={headerRef}
          initial="hidden"
          animate={headerControls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.5, 
                ease: [0.4, 0.0, 0.2, 1]
              }
            }
          }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">LE GROUPE</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-sans">
            Découvrez les filiales de Genius AD District, chacune experte dans son domaine pour vous offrir une solution complète.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subsidiaries.map((subsidiary) => (
            <SubsidiaryCard
              key={subsidiary.name}
              {...subsidiary}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 0.5, 
              ease: [0.4, 0.0, 0.2, 1],
              delay: 0.6
            }
          }}
          className="text-center mt-12"
        >
          <p className="text-lg font-medium text-gray-800 max-w-3xl mx-auto font-sans italic">
            En bref, <span className="font-semibold">ce que GENIUS crée, MPS produit et LABRIG'Ad déploie</span>, 
            tandis que Gamius et Mouje & Leell apportent leur expertise spécifique.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SubsidiariesShowcase;
