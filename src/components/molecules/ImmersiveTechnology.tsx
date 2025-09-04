'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface TechnologyItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface ImmersiveTechnologyProps {
  title: string;
  subtitle: string;
  technologies: TechnologyItem[];
  imageSrc: string;
  theme?: 'gamius' | 'mps' | 'labrigad' | 'moujeleell';
}

export default function ImmersiveTechnology({
  title,
  subtitle,
  technologies,
  imageSrc,
  theme = 'gamius'
}: ImmersiveTechnologyProps) {
  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 text-${theme}`}>{title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="space-y-8">
              {technologies.map((tech, index) => (
                <motion.div 
                  key={tech.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex"
                >
                  <div className={`flex-shrink-0 h-12 w-12 rounded-lg bg-${theme}/10 flex items-center justify-center mr-4`}>
                    <Image 
                      src={tech.icon}
                      alt={tech.title}
                      width={24}
                      height={24}
                    />
                  </div>
                  <div>
                    <h3 className={`text-xl font-semibold mb-2 text-${theme}`}>{tech.title}</h3>
                    <p className="text-gray-600">{tech.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div 
            className="order-1 lg:order-2 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-xl">
              <Image
                src={imageSrc}
                alt="Immersive Technology"
                fill
                style={{ objectFit: 'cover' }}
              />
              
              {/* Glow effect */}
              <div className={`absolute inset-0 bg-${theme}/30 mix-blend-overlay`}></div>
              
              {/* VR/AR grid effect */}
              <div className="absolute inset-0 bg-[url('/item_images/image/element/gamius/grid-pattern.svg')] opacity-20"></div>
            </div>
            
            {/* Decorative elements */}
            <div className={`absolute -top-5 -left-5 w-20 h-20 border-t-2 border-l-2 border-${theme} rounded-tl-lg`}></div>
            <div className={`absolute -bottom-5 -right-5 w-20 h-20 border-b-2 border-r-2 border-${theme} rounded-br-lg`}></div>
            
            {/* Floating geometric shapes */}
            <motion.div 
              className={`absolute -top-10 -right-5 h-16 w-16 bg-${theme}/10 rounded-full`}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>
            <motion.div 
              className={`absolute -bottom-8 left-20 h-12 w-12 bg-${theme}/20 rounded-lg rotate-45`}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            ></motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 