'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function ShadcnGroupSection() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  // Group companies
  const companies = [
    {
      name: "GENIUS",
      logo: "/item_images/logo/genius-logo-small.svg",
      description: "Agence de communication"
    },
    {
      name: "MPS",
      logo: "/item_images/logo/mps-logo.svg",
      description: "Production & Fabrication"
    },
    {
      name: "LABRIG'AD",
      logo: "/item_images/logo/labrigad-logo.svg",
      description: "Déploiement & Logistique"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const timelineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5
      }
    }
  };

  const companyVariants = {
    hidden: { 
      opacity: 0,
      y: 30
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const claimVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: 1.5
      }
    }
  };

  return (
    <section 
      ref={ref}
      className="min-h-[60vh] flex flex-col items-center justify-center bg-black py-24 px-4"
    >
      <motion.div
        className="container mx-auto max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.h2 
          variants={titleVariants}
          className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-16 text-center"
        >
          LE GROUPE
        </motion.h2>

        {/* Timeline with logos */}
        <motion.div 
          className="relative flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 mb-16"
          variants={timelineVariants}
        >
          {/* Timeline line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-800 hidden md:block"></div>
          
          {companies.map((company, index) => (
            <motion.div
              key={index}
              variants={companyVariants}
              className="relative z-10 flex flex-col items-center"
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
              {/* Logo circle */}
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-neutral-900 flex items-center justify-center p-6 mb-4 border border-neutral-800">
                <div className="relative w-full h-full">
                  <Image
                    src={company.logo}
                    alt={company.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              
              {/* Company name */}
              <h3 className="text-xl md:text-2xl font-heading font-bold text-[#D9D9D9] mb-1">
                {company.name}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-neutral-400 text-center">
                {company.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Claim */}
        <motion.div
          variants={claimVariants}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-lg md:text-xl text-[#D9D9D9] leading-relaxed">
            En bref, <span className="font-bold text-white">ce que GENIUS crée, MPS produit et LABRIG'Ad déploie</span>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
