'use client';

import React, { useEffect } from 'react';
import { AppleStoryHero } from '@/components/organisms/AppleStoryHero';
import { AppleFooter } from '@/components/organisms/AppleFooter';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ModernNavbar } from '@/components/ui/navbar-demo';
import { useParams } from 'next/navigation';

// Composants de section pour la page Our History
import OurDNASection from '../../../../components/sections/OurDNASection';
import CoreValuesSection from '../../../../components/sections/CoreValuesSection';
import BusinessPhilosophySection from '../../../../components/sections/BusinessPhilosophySection';
import ResourcesTodaySection from '../../../../components/sections/ResourcesTodaySection';
import GroupSynergySection from '../../../../components/sections/GroupSynergySection';

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function OurHistoryPage() {
  // Get locale from params
  const params = useParams();
  const locale = (params && typeof params === 'object' && 'locale' in params) ? params.locale as string : 'fr';
  
  // Content based on locale
  const content = {
    title: locale === 'fr' ? 'Depuis 1999, créateur d\'impact.' : 'Since 1999, crafting impact.',
    subtitle: locale === 'fr' ? 'Indépendant · Visionnaire · Humain' : 'Independent · Visionary · Human',
    quote: locale === 'fr' 
      ? "Les grandes idées changent tout. Chez Genius Holding, nous leur donnons vie—avec élégance." 
      : "Great ideas change everything. At Genius Holding we bring them to life—elegantly.",
    ctaTitle: locale === 'fr' ? 'Prêt à écrire le prochain chapitre ?' : 'Ready to write the next chapter?',
    ctaButton: locale === 'fr' ? 'Démarrer une conversation' : 'Start a conversation'
  };
  
  // Smooth scroll behavior
  useEffect(() => {
    // Appliquer un comportement de défilement fluide
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  return (
    <div className="min-h-screen">
      {/* Header */}
      <ModernNavbar currentFiliale="genius" />
      
      <main className="min-h-screen bg-white relative overflow-hidden">
        {/* Background Elements - Minimalist B&W */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 -left-40 w-80 h-80 bg-gray-100/30 rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="absolute top-40 -right-40 w-96 h-96 bg-gray-200/20 rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="absolute -bottom-32 left-20 w-80 h-80 bg-gray-50/40 rounded-full mix-blend-multiply filter blur-xl"></div>
        </div>
        
        {/* Hero Section */}
        <section className="relative z-10">
          <AppleStoryHero />
        </section>
        
        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          {/* Intro Section */}
          <motion.section 
            className="text-center mb-32"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-black tracking-tight"
              variants={fadeInUp}
            >
              {content.title}
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 mb-12 font-light max-w-4xl mx-auto"
              variants={fadeInUp}
            >
              {content.subtitle}
            </motion.p>
            <motion.blockquote 
              className="text-2xl md:text-3xl font-light text-gray-800 max-w-5xl mx-auto leading-relaxed italic"
              variants={fadeInUp}
            >
              "{content.quote}"
            </motion.blockquote>
            <motion.div 
              className="w-32 h-0.5 bg-black mx-auto mt-12 rounded-full"
              variants={fadeInUp}
            />
          </motion.section>
          
          {/* Our DNA Section */}
          <motion.section 
            className="mb-32 bg-gray-50/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-100"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <OurDNASection />
          </motion.section>
          
          {/* Core Values Section */}
          <motion.section 
            className="mb-32 bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-100 shadow-sm"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <CoreValuesSection />
          </motion.section>
          
          {/* Business Philosophy Section */}
          <motion.section 
            className="mb-32 bg-gray-50/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-100"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <BusinessPhilosophySection />
          </motion.section>
          
          {/* Resources Today Section */}
          <motion.section 
            className="mb-32 bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-100 shadow-sm"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <ResourcesTodaySection />
          </motion.section>
          
          {/* Group Synergy Section */}
          <motion.section 
            className="mb-32"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <GroupSynergySection />
          </motion.section>
        </div>
        
        {/* CTA Section - Black & White Theme */}
        <motion.section 
          className="relative bg-black py-24 overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/5 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gray-500/10 rounded-full filter blur-3xl"></div>
          </div>
          
          <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-10 tracking-tight text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {content.ctaTitle}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-base font-medium rounded-xl text-black bg-white hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {content.ctaButton}
              </Link>
            </motion.div>
          </div>
        </motion.section>
        
        {/* Footer */}
        <AppleFooter />
      </main>
    </div>
  );
}
