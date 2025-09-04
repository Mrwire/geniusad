'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface StatItem {
  value: string;
  label: string;
}

interface CaseStudyHighlightProps {
  title: string;
  subtitle: string;
  clientName: string;
  description: string;
  imageSrc: string;
  stats: StatItem[];
  theme?: 'gamius' | 'mps' | 'labrigad' | 'moujeleell';
}

export default function CaseStudyHighlight({
  title,
  subtitle,
  clientName,
  description,
  imageSrc,
  stats,
  theme = 'gamius'
}: CaseStudyHighlightProps) {
  return (
    <section className={`py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden`}>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className={`text-${theme} text-sm uppercase tracking-wider font-medium mb-2`}
            >
              {subtitle}
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              {title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-300 text-lg"
            >
              Client: {clientName}
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative h-80 md:h-[500px] w-full rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={imageSrc}
                  alt={title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-${theme}/80 to-transparent mix-blend-multiply`}></div>
                
                {/* Decorative elements */}
                <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-white/40 rounded-tl-md"></div>
                <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-white/40 rounded-br-md"></div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-300 mb-8 leading-relaxed">
                {description}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
                  >
                    <h3 className={`text-${theme} text-3xl font-bold mb-1`}>{stat.value}</h3>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
                className="mt-8"
              >
                <button className={`bg-${theme} hover:bg-${theme}/90 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300`}>
                  View Full Case Study
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 