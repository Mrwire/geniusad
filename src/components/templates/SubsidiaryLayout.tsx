'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

export type SubsidiaryTheme = 'mps' | 'labrigad' | 'gamius' | 'moujeleell';

interface SubsidiaryLayoutProps {
  children: ReactNode;
  subsidiary: SubsidiaryTheme;
  title: string;
  description?: string;
}

// Animation variants for page transitions
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function SubsidiaryLayout({
  children,
  subsidiary,
  title,
  description,
}: SubsidiaryLayoutProps) {
  // Each subsidiary has its own color theme defined in the CSS variables
  return (
    <div data-subsidiary={subsidiary} className="min-h-screen">
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="container mx-auto px-4 py-8 md:py-16"
      >
        <header className="mb-12 md:mb-16">
          <h1 className="font-bold text-4xl md:text-5xl mb-3" style={{ color: `var(--color-${subsidiary})` }}>
            {title}
          </h1>
          {description && <p className="text-lg md:text-xl text-gray-600 max-w-2xl">{description}</p>}
        </header>
        
        <main>{children}</main>
      </motion.div>
    </div>
  );
} 