'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

interface LampEffectProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  subtitleClassName?: string;
  isActive?: boolean;
  highlightColor?: string;
  glowSize?: 'small' | 'medium' | 'large';
  textHighlight?: boolean;
  children?: React.ReactNode;
}

export function LampEffect({
  title,
  subtitle,
  description,
  className,
  titleClassName,
  descriptionClassName,
  subtitleClassName,
  isActive = true,
  highlightColor = "cyan",
  glowSize = "medium",
  textHighlight = false,
  children,
}: LampEffectProps) {
  return (
    <div className={cn("relative flex flex-col items-center justify-center overflow-hidden rounded-lg w-full mx-auto py-24", className)}>
      <motion.div
        initial={{ opacity: 0.5, width: glowSize === "small" ? "12rem" : glowSize === "large" ? "35rem" : "22rem" }}
        whileInView={{
          opacity: isActive ? 1 : 0.5,
          width: isActive 
            ? (glowSize === "small" ? "18rem" : glowSize === "large" ? "40rem" : "30rem")
            : (glowSize === "small" ? "12rem" : glowSize === "large" ? "25rem" : "18rem"),
        }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className={`absolute inset-auto right-1/2 translate-x-1/2 -top-96 md:-top-80 h-[30rem] w-[30rem] rounded-full bg-gradient-to-b ${highlightColor === "cyan" ? "from-cyan-500" : highlightColor === "purple" ? "from-purple-500" : highlightColor === "gold" ? "from-amber-400" : "from-cyan-500"} to-transparent blur-3xl transform-gpu opacity-50`}
      />
      <div className="relative z-10 flex flex-col items-center">
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className={cn("text-cyan-500 uppercase tracking-widest text-sm font-medium mb-2", subtitleClassName)}
          >
            {subtitle}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className={cn(
            "text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4", 
            textHighlight 
              ? `bg-gradient-to-r ${highlightColor === "cyan" ? "from-cyan-400 to-blue-600" : highlightColor === "purple" ? "from-purple-400 to-indigo-600" : highlightColor === "gold" ? "from-amber-400 to-orange-600" : "from-cyan-400 to-blue-600"} bg-clip-text text-transparent` 
              : "text-white", 
            titleClassName
          )}
        >
          {title}
        </motion.h1>
        {description && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className={cn("max-w-3xl text-center text-gray-400 text-lg md:text-xl", descriptionClassName)}
          >
            {description}
          </motion.div>
        )}
      </div>

      {/* Optional children content */}
      {children && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          className="relative z-10 w-full mt-12"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}

export default LampEffect;
