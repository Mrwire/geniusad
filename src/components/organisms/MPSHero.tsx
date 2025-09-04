'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface MPSHeroProps {
  title: string;
  subtitle: string;
  imageSrc?: string;
}

export default function MPSHero({ title, subtitle, imageSrc = '/item_images/image/logo/mps-logo.png' }: MPSHeroProps) {
  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute top-0 left-0 h-64 w-64 rounded-full bg-mps blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-mps blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="z-10"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              {title}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg">
              {subtitle}
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <button className="bg-mps text-white px-6 py-3 rounded-md font-semibold hover:bg-opacity-90 transition-colors">
                Discover Our Services
              </button>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10"
          >
            {imageSrc && (
              <div className="relative h-80 md:h-96 w-full overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src={imageSrc}
                  alt="MPS - Marketing Production Services"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                  className="transition-transform hover:scale-105 duration-700"
                />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
} 