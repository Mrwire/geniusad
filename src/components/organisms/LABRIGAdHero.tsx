'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface LABRIGAdHeroProps {
  title: string;
  subtitle: string;
  imageSrc?: string;
}

export default function LABRIGAdHero({ title, subtitle, imageSrc = '/item_images/image/logo/labrigad-logo.png' }: LABRIGAdHeroProps) {
  return (
    <section className="relative overflow-hidden py-16 md:py-20 bg-black text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-labrigad blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-labrigad blur-3xl" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 grid grid-cols-12 gap-4 opacity-5">
          {Array.from({ length: 12 }).map((_, colIndex) => (
            <div key={colIndex} className="w-full h-full border-l border-white" />
          ))}
          {Array.from({ length: 12 }).map((_, rowIndex) => (
            <div key={rowIndex} className="absolute w-full h-px bg-white" style={{ top: `${(100 / 12) * rowIndex}%` }} />
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:w-1/2"
          >
            <div className="inline-block mb-6 px-4 py-1 border border-labrigad rounded-full">
              <span className="text-labrigad font-medium text-sm tracking-wider uppercase">Creative Design Studio</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-gradient-labrigad">
              {title}
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-lg">
              {subtitle}
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <button className="bg-labrigad text-white px-6 py-3 rounded-md font-semibold hover:bg-opacity-90 transition-colors">
                View Our Work
              </button>
              <button className="border border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-black transition-colors">
                Contact Us
              </button>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:w-1/2"
          >
            {imageSrc && (
              <div className="relative h-72 md:h-96 w-full overflow-hidden rounded-lg transform rotate-3 shadow-xl border-4 border-gray-800">
                <Image
                  src={imageSrc}
                  alt="LABRIG'Ad - Creative Design Studio"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                  className="transition-transform hover:scale-105 duration-500"
                />
                
                {/* Design elements */}
                <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-labrigad -translate-x-4 -translate-y-4" />
                <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-labrigad translate-x-4 translate-y-4" />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
} 