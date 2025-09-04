'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SubsidiaryTheme } from '../templates/SubsidiaryLayout';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface ProcessTimelineProps {
  title: string;
  subtitle?: string;
  steps: ProcessStep[];
  theme: SubsidiaryTheme;
}

export default function ProcessTimeline({
  title,
  subtitle,
  steps,
  theme
}: ProcessTimelineProps) {
  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3
      }
    }
  };
  
  const stepVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: `var(--color-${theme})` }}>
            {title}
          </h2>
          {subtitle && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
        </div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={stepVariants}
              className="relative"
            >
              {/* Timeline connector (not for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-gray-300 z-0 -translate-y-1/2">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full" style={{ backgroundColor: `var(--color-${theme})` }}></div>
                </div>
              )}
              
              <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100 relative z-10 h-full transform transition-transform duration-300 hover:-translate-y-2">
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full text-white font-bold text-lg mr-4" style={{ backgroundColor: `var(--color-${theme})` }}>
                      {step.number}
                    </div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 mt-auto">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 