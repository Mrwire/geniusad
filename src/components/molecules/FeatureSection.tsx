'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SubsidiaryTheme } from '../templates/SubsidiaryLayout';

interface Feature {
  title: string;
  description: string;
  icon?: string;
}

interface FeatureSectionProps {
  title: string;
  subtitle?: string;
  features: Feature[];
  theme: SubsidiaryTheme;
  imagePosition?: 'left' | 'right';
  imageSrc?: string;
}

export default function FeatureSection({
  title,
  subtitle,
  features,
  theme,
  imagePosition = 'right',
  imageSrc,
}: FeatureSectionProps) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: `var(--color-${theme})` }}>
            {title}
          </h2>
          {subtitle && <p className="text-lg text-gray-600">{subtitle}</p>}
        </div>

        <div className={`grid grid-cols-1 gap-8 items-center ${imageSrc ? 'lg:grid-cols-2' : ''}`}>
          {imageSrc && imagePosition === 'left' && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative h-80 lg:h-96 w-full rounded-xl overflow-hidden shadow-lg"
            >
              <Image 
                src={imageSrc}
                alt={title}
                fill
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
          )}

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={featureVariants} className="flex gap-5">
                {feature.icon && (
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full" style={{ backgroundColor: `var(--color-${theme})` }}>
                    <Image src={feature.icon} alt={feature.title} width={24} height={24} />
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {imageSrc && imagePosition === 'right' && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative h-80 lg:h-96 w-full rounded-xl overflow-hidden shadow-lg"
            >
              <Image 
                src={imageSrc}
                alt={title}
                fill
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
} 