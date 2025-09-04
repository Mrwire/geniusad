'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface MoujeLeellHeroProps {
  title: string;
  subtitle: string;
  imageSrc: string;
}

export default function MoujeLeellHero({ title, subtitle, imageSrc }: MoujeLeellHeroProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-moujeleell to-moujeleell-light bg-clip-text text-transparent"
            >
              {title}
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 mb-8"
            >
              {subtitle}
            </motion.p>
            <motion.div variants={itemVariants}>
              <button className="bg-moujeleell hover:bg-moujeleell-light text-white font-medium py-3 px-8 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1">
                Découvrir nos projets
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl"
          >
            <Image
              src={imageSrc}
              alt="Mouje-Leell Creative Projects"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
              className="transition-all duration-500"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-moujeleell/30 to-transparent opacity-70"></div>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="hidden md:block absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-moujeleell/10 blur-3xl"></div>
      <div className="hidden md:block absolute top-12 right-1/4 w-64 h-64 rounded-full bg-moujeleell/5 blur-3xl"></div>
    </section>
  );
} 