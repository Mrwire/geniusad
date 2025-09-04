'use client';

import React from 'react';
import { motion, useScroll, useTransform, Variants, Easing } from 'framer-motion';
import { useParams } from 'next/navigation';
import Image from 'next/image';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] as Easing }
  }
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] as Easing }
  }
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] as Easing }
  }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.8, 
      ease: [0.6, -0.05, 0.01, 0.99] as Easing,
      type: "spring" as const,
      stiffness: 100
    }
  }
};

export default function ResourcesTodaySection() {
  const params = useParams();
  const locale = (params && typeof params === 'object' && 'locale' in params) ? params.locale as string : 'fr';
  
  const content = {
    title: locale === 'fr' ? 'Nos Ressources Aujourd\'hui' : 'Resources Today',
    subtitle: locale === 'fr' ? 'Infrastructure & Excellence Opérationnelle' : 'Infrastructure & Operational Excellence',
    resources: locale === 'fr' ? [
      'Facility de production de 2 600 m² avec équipes dédiées spécialisées.',
      'Unités intégrées : Design Créatif, Développement Digital, Ventes & Événementiel, et Fabrication.',
      'Infrastructure complète supportant tous les aspects des processus créatifs et de production.',
      'Technologies de pointe et équipements industriels dernière génération.'
    ] : [
      '2,600 m² manufacturing facility with specialized dedicated teams.',
      'Integrated units: Creative Design, Digital Development, Sales & Event Management, and Manufacturing.',
      'Comprehensive infrastructure supporting all aspects of creative and production processes.',
      'Cutting-edge technology and state-of-the-art industrial equipment.'
    ],
    orgChartAlt: locale === 'fr' ? 'Organigramme Genius Holding' : 'Genius Holding Organization Chart'
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-black via-gray-900/90 to-gray-800/80 p-6 sm:p-8 md:p-16 border border-gray-700/20 shadow-2xl"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-gray-700/20 to-gray-900/20 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-gray-700/20 to-gray-900/20 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          variants={fadeInUp}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            variants={fadeInUp}
          >
            {content.title}
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light tracking-wide"
            variants={fadeInUp}
          >
            {content.subtitle}
          </motion.p>
        </motion.div>
        
        {/* Resources Grid */}
        <motion.div 
          className="mb-16"
          variants={staggerContainer}
        >
          {/* Stats Cards - Top Row */}
          <motion.div
            variants={scaleIn}
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10"
          >
            <div className="text-center p-6 bg-gradient-to-br from-gray-800/50 to-black/50 rounded-2xl border border-gray-700/30 backdrop-blur-sm hover:border-gray-600/50 transition-all duration-300 hover:shadow-lg">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                2,600
              </div>
              <div className="text-sm md:text-base text-gray-400 font-light mt-1">
                {locale === 'fr' ? 'm² Facility' : 'm² Facility'}
              </div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-gray-800/50 to-black/50 rounded-2xl border border-gray-700/30 backdrop-blur-sm hover:border-gray-600/50 transition-all duration-300 hover:shadow-lg">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                4+
              </div>
              <div className="text-sm md:text-base text-gray-400 font-light mt-1">
                {locale === 'fr' ? 'Unités Intégrées' : 'Integrated Units'}
              </div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-gray-800/50 to-black/50 rounded-2xl border border-gray-700/30 backdrop-blur-sm hover:border-gray-600/50 transition-all duration-300 hover:shadow-lg">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                100%
              </div>
              <div className="text-sm md:text-base text-gray-400 font-light mt-1">
                {locale === 'fr' ? 'Intégration' : 'Integration'}
              </div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-gray-800/50 to-black/50 rounded-2xl border border-gray-700/30 backdrop-blur-sm hover:border-gray-600/50 transition-all duration-300 hover:shadow-lg">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                24/7
              </div>
              <div className="text-sm md:text-base text-gray-400 font-light mt-1">
                {locale === 'fr' ? 'Support' : 'Support'}
              </div>
            </div>
          </motion.div>
          
          {/* Resources Cards */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            variants={staggerContainer}
          >
            {content.resources.map((resource, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="group p-6 rounded-2xl bg-gradient-to-br from-gray-800/30 to-black/60 border border-gray-700/30 backdrop-blur-sm hover:border-gray-600/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-4 h-4 bg-gradient-to-br from-gray-300 to-white rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300"></div>
                  </div>
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light group-hover:text-white transition-colors duration-300">
                    {resource}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          </motion.div>
        
        {/* Organization Chart - Full Width at Bottom */}
        <motion.div 
          className="relative w-full mt-12 overflow-hidden"
          variants={fadeInUp}
        >
          <motion.div
            variants={scaleIn}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative bg-black/60 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-gray-800/50 overflow-hidden"
          >
            {/* Subtle background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/70 rounded-2xl"></div>
            
            <div className="relative z-10">
              <Image
                src={locale === 'fr' ? '/item_images/element/organigrame_fr_histoire.png' : '/item_images/element/organirame_ang_story.png'}
                alt={content.orgChartAlt}
                width={1200}
                height={800}
                className="w-full h-auto rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-500 object-contain"
                priority
              />
              
              {/* Floating accent */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-gray-500 to-black rounded-full animate-pulse"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
