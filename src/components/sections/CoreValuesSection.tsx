'use client';

import React from 'react';
import { motion, Variants, Easing } from 'framer-motion';
import { useParams } from 'next/navigation';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.6, -0.05, 0.01, 0.99] as Easing,
      type: "spring",
      stiffness: 100
    }
  }
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const iconFloat: Variants = {
  hover: {
    y: -8,
    scale: 1.1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17
    }
  }
};

const cardHover: Variants = {
  hover: {
    y: -12,
    scale: 1.03,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
};

export default function CoreValuesSection() {
  const params = useParams();
  const locale = (params && typeof params === 'object' && 'locale' in params) ? params.locale as string : 'fr';
  
  const content = {
    title: locale === 'fr' ? 'Nos Valeurs Fondamentales' : 'Core Values',
    subtitle: locale === 'fr' ? 'Les piliers qui guident chaque décision' : 'The pillars that guide every decision',
    values: locale === 'fr' ? [
      {
        title: 'Innovation',
        description: 'Curiosité qui explore de nouvelles idées et défie les processus établis.',
        color: 'from-gray-800 to-black',
        bgColor: 'from-gray-50/50 to-gray-100/30',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        )
      },
      {
        title: 'Performance',
        description: 'Poursuite incessante de la qualité parfaite et de la créativité efficace.',
        color: 'from-gray-700 to-black',
        bgColor: 'from-gray-50/50 to-gray-100/30',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        )
      },
      {
        title: 'Exclusivité',
        description: 'Solutions premium sur-mesure, attitude privilégiée pour chaque client.',
        color: 'from-gray-800 to-black',
        bgColor: 'from-gray-50/50 to-gray-100/30',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 1v22" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        )
      },
      {
        title: 'Confiance',
        description: 'Pierre angulaire bâtie sur des objectifs partagés, le respect, et l\'accomplissement des engagements.',
        color: 'from-gray-700 to-black',
        bgColor: 'from-gray-50/50 to-gray-100/30',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        )
      }
    ] : [
      {
        title: 'Innovation',
        description: 'Curiosity that explores new ideas and challenges established processes.',
        color: 'from-gray-800 to-black',
        bgColor: 'from-gray-50/50 to-gray-100/30',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        )
      },
      {
        title: 'Performance',
        description: 'Relentless pursuit of perfect quality and effective creativity.',
        color: 'from-gray-700 to-black',
        bgColor: 'from-gray-50/50 to-gray-100/30',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        )
      },
      {
        title: 'Exclusivity',
        description: 'Premium tailor-made solutions, privileged attitude for every client.',
        color: 'from-gray-800 to-black',
        bgColor: 'from-gray-50/50 to-gray-100/30',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 1v22" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        )
      },
      {
        title: 'Trust',
        description: 'Foundation stone built on shared goals, respect, and fulfillment of commitments.',
        color: 'from-gray-700 to-black',
        bgColor: 'from-gray-50/50 to-gray-100/30',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        )
      }
    ]
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
      className="relative px-4 py-16 md:py-24"
    >
      {/* Header */}
      <motion.div 
        className="text-center mb-10 md:mb-20"
        variants={fadeInUp}
      >
        <motion.h2 
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-gray-900 to-black bg-clip-text text-transparent"
          variants={fadeInUp}
        >
          {content.title}
        </motion.h2>
        <motion.p 
          className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto font-medium px-2"
          variants={fadeInUp}
        >
          {content.subtitle}
        </motion.p>
      </motion.div>
      
      {/* Values Grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 md:gap-8 lg:gap-12 max-w-7xl mx-auto"
        variants={staggerContainer}
      >
        {content.values.map((value, index) => (
          <motion.div 
            key={index}
            className="group relative"
            variants={fadeInUp}
            whileHover="hover"
          >
            <motion.div 
              className={`relative bg-gradient-to-br ${value.bgColor} backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 overflow-hidden`}
              variants={cardHover}
            >
              {/* Background gradient overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-5 rounded-3xl`}></div>
              </div>
              
              {/* Floating accent */}
              <div className={`absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br ${value.color} rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <motion.div 
                  className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center text-white mb-4 sm:mb-5 md:mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                  variants={iconFloat}
                >
                  {value.icon}
                </motion.div>
                
                {/* Content */}
                <div>
                  <h3 className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 bg-gradient-to-r ${value.color} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 origin-left`}>
                    {value.title}
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                    {value.description}
                  </p>
                </div>
                
                {/* Interactive element */}
                <motion.div 
                  className={`absolute bottom-6 right-6 w-3 h-3 bg-gradient-to-br ${value.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                ></motion.div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Bottom accent */}
      <motion.div 
        className="mt-10 md:mt-16 text-center"
        variants={fadeInUp}
      >
        <div className="w-24 h-1 bg-gradient-to-r from-gray-400 to-gray-800 rounded-full mx-auto opacity-60"></div>
      </motion.div>
    </motion.div>
  );
}
