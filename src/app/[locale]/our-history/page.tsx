'use client';

import React, { useEffect, useState } from 'react';
import { AppleStoryHero } from '@/components/organisms/AppleStoryHero';
import { AppleFooter } from '@/components/organisms/AppleFooter';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import ContactPopup from '@/components/ui/ContactPopup';

// Composants de section pour la page Our History
import OurDNASection from '../../../components/sections/OurDNASection';
import CoreValuesSection from '../../../components/sections/CoreValuesSection';
import BusinessPhilosophySection from '../../../components/sections/BusinessPhilosophySection';
import ResourcesTodaySection from '../../../components/sections/ResourcesTodaySection';
import GroupSynergySection from '../../../components/sections/GroupSynergySection';

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
  const params = useParams();
  const locale = (params && typeof params === 'object' && 'locale' in params) ? params.locale as string : 'fr';
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

  // Content based on locale
  const content = {
    intro: {
      heading: locale === 'fr' ? "Depuis 1999, créer de <span>l'impact.</span>" : "Since 1999, crafting <span>impact.</span>",
      tagline: locale === 'fr' ? "<span>Indépendant · Visionnaire · Humain</span>" : "<span>Independent · Visionary · Human</span>",
      quote: locale === 'fr' ? "\"Les grandes idées changent tout. Chez Genius Holding, nous les concrétisons—avec élégance.\"" : "\"Great ideas change everything. At Genius Holding we bring them to life—elegantly.\""
    },
    cta: {
      heading: locale === 'fr' ? "Prêt à écrire le prochain chapitre ?" : "Ready to write the next chapter?",
      button: locale === 'fr' ? "Démarrer une conversation" : "Start a conversation"
    }
  };
  
  // Smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F9FAFB] to-[#F5F5F7] overflow-hidden">
      {/* Hero Section */}
      <section className="relative">
        <AppleStoryHero />
      </section>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
        {/* Intro Section */}
        <motion.section 
          className="text-center mb-24 sm:mb-28 md:mb-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 md:mb-10 tracking-tight leading-tight px-2"
            variants={fadeInUp}
            dangerouslySetInnerHTML={{ __html: content.intro.heading.replace('<span>', '<span class="italic text-[#007AFF]">') }}
          />
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto px-4"
            variants={fadeInUp}
            dangerouslySetInnerHTML={{ __html: content.intro.tagline.replace('<span>', '<span class="font-medium">') }}
          />
          
          <motion.div 
            className="mt-8 sm:mt-10 md:mt-12 bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] max-w-3xl mx-auto border border-gray-100"
            variants={fadeInUp}
          >
            <blockquote className="text-lg sm:text-xl italic text-gray-700">
              {content.intro.quote}
            </blockquote>
          </motion.div>
        </motion.section>
        
        {/* Our DNA Section */}
        <motion.section 
          className="mb-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <OurDNASection />
        </motion.section>
        
        {/* Core Values Section */}
        <motion.section 
          className="mb-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <CoreValuesSection />
        </motion.section>
        
        {/* Business Philosophy Section */}
        <motion.section 
          className="mb-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <BusinessPhilosophySection />
        </motion.section>
        
        {/* Resources Today Section */}
        <motion.section 
          className="mb-32"
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
      
      {/* CTA Section */}
      <motion.section 
        className="bg-[#0A0A0A] text-white py-16 sm:py-20 md:py-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 md:mb-10 tracking-tight leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {content.cta.heading}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button
              onClick={() => setIsContactPopupOpen(true)}
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-[#007AFF] hover:bg-[#0066CC] transition-all duration-300 hover:scale-105 shadow-lg"
            >
              {content.cta.button}
            </button>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Footer */}
      <AppleFooter />
      
      {/* Contact Popup */}
      <ContactPopup 
        isOpen={isContactPopupOpen} 
        onClose={() => setIsContactPopupOpen(false)} 
      />
    </main>
  );
}
