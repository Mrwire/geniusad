'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import SubsidiaryHeader from '@/components/organisms/SubsidiaryHeader';
import { Footer } from '@/components/organisms/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Import dynamique des composants pour éviter les erreurs de rendu côté serveur
const ChatInterface = dynamic(
  () => import('@/components/gamius/ChatInterface'),
  { ssr: false }
);

const DivisionCards = dynamic(
  () => import('@/components/gamius/DivisionCards'),
  { ssr: false }
);

export default function GamiusPage() {
  const params = useParams<{ locale: string }>();
  const locale = typeof params?.locale === 'string' ? params.locale : 'fr';
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [activeSection, setActiveSection] = useState<'chat' | 'divisions'>('chat');
  
  // Référence pour le scroll
  const divisionsRef = useRef<HTMLDivElement>(null);
  
  // Détecter l'interaction initiale pour le son
  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        
        // Jouer un son d'ambiance pour l'immersion
        try {
          const ambientSound = new Audio('/sounds/gamius-ambient.mp3');
          ambientSound.volume = 0.3;
          ambientSound.loop = true;
          ambientSound.play().catch(e => console.log('Audio autoplay blocked by browser'));
        } catch (e) {
          console.log('Audio not supported');
        }
      }
    };
    
    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    
    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, [hasInteracted]);
  
  // Fonction pour rediriger vers le site de Gamius
  const handleRedirectToGamius = () => {
    setIsRedirecting(true);
    setTimeout(() => {
      window.location.href = 'https://gamiusgroup.ma';
    }, 2000);
  };

  // Fonction pour faire défiler jusqu'aux divisions
  const scrollToDivisions = () => {
    setActiveSection('divisions');
    divisionsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden" data-subsidiary="gamius">
      {/* Overlay de redirection */}
      <AnimatePresence>
        {isRedirecting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center"
          >
            <div className="w-32 h-32 relative animate-bounce">
              <Image 
                src="/item_images/logo_filiale_rectangulaire/logo_gamius_black.png"
                alt="Gamius Logo"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
            <p className="mt-6 text-2xl text-yellow-400 font-semibold">
              {locale === 'fr' ? 'Redirection vers GAMIUSGROUP...' : 'Redirecting to GAMIUSGROUP...'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="fixed top-0 left-0 z-40 w-full flex justify-center items-center py-2 px-4 bg-gradient-to-r from-yellow-500 to-yellow-400">
        <div className="container mx-auto flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center group">
            <div className="w-10 h-10 bg-black/20 rounded-full flex items-center justify-center mr-2 
                           group-hover:bg-black/40 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-black font-medium">
              {locale === 'fr' ? 'Retour à Genius' : 'Back to Genius'}
            </span>
          </Link>
          
          <div className="flex items-center">
            <div className="w-32 h-auto bg-white rounded-md p-1 shadow-md">
              <img 
                src="/item_images/logo_filiale_rectangulaire/logo_gamius_black.png" 
                alt="Gamius Logo"
                className="w-full h-auto object-contain" 
              />
            </div>
          </div>
          
          <div className="text-black font-medium text-sm hidden sm:block">
            Experience interactive par Genius AD District
          </div>
        </div>
      </div>
      
      {/* Tabs de navigation */}
      <div className="fixed top-16 left-0 w-full z-30 bg-black/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-center">
          <div className="flex space-x-2 p-2">
            <Button
              variant={activeSection === 'chat' ? 'default' : 'outline'}
              className={`border-yellow-400 ${
                activeSection === 'chat' ? 'bg-yellow-400 text-black' : 'text-yellow-400 bg-transparent'
              }`}
              onClick={() => setActiveSection('chat')}
            >
              {locale === 'fr' ? 'Chat Interactif' : 'Interactive Chat'}
            </Button>
            <Button
              variant={activeSection === 'divisions' ? 'default' : 'outline'}
              className={`border-yellow-400 ${
                activeSection === 'divisions' ? 'bg-yellow-400 text-black' : 'text-yellow-400 bg-transparent'
              }`}
              onClick={scrollToDivisions}
            >
              {locale === 'fr' ? 'Nos Divisions' : 'Our Divisions'}
            </Button>
          </div>
        </div>
      </div>
      
      <main className="flex flex-col pt-28">
        {/* Section Chat Interactive */}
        <section className="min-h-screen container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              <span className="text-yellow-400">GAMIUS</span>GROUP
            </h1>
            
            <p className="text-white/80 text-center max-w-2xl mx-auto mb-10">
              {locale === 'fr' 
                ? 'Explorez nos divisions spécialisées à travers ce chat interactif et découvrez notre expertise gaming.'
                : 'Explore our specialized divisions through this interactive chat and discover our gaming expertise.'}
            </p>
            
            <div className="w-full max-w-4xl mx-auto">
              <ChatInterface />
            </div>
          </motion.div>
        </section>
        
        {/* Section Divisions Cards */}
        <section ref={divisionsRef} className="min-h-screen bg-gray-900 py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-2 text-center">
                {locale === 'fr' ? 'Nos Divisions' : 'Our Divisions'}
              </h2>
              <div className="w-20 h-1 bg-yellow-400 mx-auto mb-10"></div>
              
              <p className="text-white/80 text-center max-w-2xl mx-auto mb-10">
                {locale === 'fr' 
                  ? 'Découvrez les quatre pôles d\'expertise de GAMIUSGROUP, chacun spécialisé dans un aspect unique du gaming et de l\'expérience interactive.'
                  : 'Discover the four areas of expertise of GAMIUSGROUP, each specialized in a unique aspect of gaming and interactive experience.'}
              </p>
              
              <DivisionCards />
            </motion.div>
            
            <div className="mt-20 text-center">
              <Button
                onClick={handleRedirectToGamius}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-6 text-lg"
              >
                {locale === 'fr' ? 'Visiter le site GAMIUSGROUP' : 'Visit GAMIUSGROUP website'}
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
