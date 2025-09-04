'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function TestBackground() {
    return (
        <div className="relative w-full h-screen bg-black overflow-hidden">
            <div className="absolute inset-0">
                <svg
                    className="w-full h-full text-white"
                    viewBox="0 0 696 316"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <motion.path
                        d="M-380 -189C-380 -189 -503 216 -39 343C448 470 516 761 516 761"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        strokeOpacity="0.2"
                        initial={{ pathLength: 0.3, opacity: 0.4 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.3, 0.4, 0.3],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "linear",
                        }}
                        style={{
                            transform: 'translateZ(0)',
                            backfaceVisibility: 'hidden',
                            perspective: '1000px',
                            willChange: 'opacity, stroke-dasharray'
                        }}
                    />
                </svg>
            </div>
            <div className="relative z-10 flex items-center justify-center h-full">
                <h1 className="text-4xl font-bold text-white">Test Background Paths</h1>
            </div>
        </div>
    );
}
