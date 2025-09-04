"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { GradientHeading } from "@/components/ui/gradient-heading";

function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        color: `rgba(15,23,42,${0.1 + i * 0.03})`,
        width: 0.5 + i * 0.03,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full text-white"
                viewBox="0 0 696 316"
                fill="none"
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.1 + path.id * 0.03}
                        initial={{ pathLength: 0.3, opacity: 0.6 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.3, 0.6, 0.3],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 10,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function BackgroundPaths({
    title = "AGENCE DE COMMUNICATION ET PRODUCTION",
    subtitle = "ÉVÉNEMENTIEL CORPORATE ET GRAND PUBLIC · MARKETING ALTERNATIF · ROADSHOW ET ACTIVATIONS",
    buttonText = "Discover Excellence",
    rightText = "NOS SERVICES"
}: {
    title: string;
    subtitle?: string;
    buttonText?: string;
    rightText?: string;
}) {
    const [letterEffect] = useState(true);

    return (
        <section className="relative min-h-[80vh] w-full flex items-center justify-center overflow-hidden bg-black">
            {/* Background and Effects Layer */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-black/95 z-0"></div>
                <FloatingPaths position={1} />
                <FloatingPaths position={-1} />
            </div>

            {/* Content Container */}
            <div className="container relative z-10 mx-auto px-4 py-16 md:py-20 flex flex-col md:flex-row justify-between items-center">
                {/* Main Title and Content - Left Side */}
                <div className="w-full md:w-2/3 lg:w-3/5 mb-10 md:mb-0">
                    <div className="bg-black/70 p-6 rounded-xl backdrop-blur-md border border-white/10 shadow-lg">
                        {/* Title with adaptive sizing */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
                            {letterEffect ? (
                                <TextAnimation text={title} />
                            ) : (
                                <span className="text-white">{title}</span>
                            )}
                        </h1>
                        
                        {/* Subtitle */}
                        <p className="text-sm sm:text-base md:text-lg text-white/80 mb-8 max-w-2xl">
                            {subtitle}
                        </p>

                        {/* CTA Button */}
                        <div className="inline-block group relative bg-gradient-to-b from-white/10 to-white/5 rounded-full overflow-hidden p-0.5 mt-4">
                            <Link
                                href="#features"
                                className="flex items-center text-white font-medium text-sm rounded-full 
                                        px-5 py-2.5 transition-all duration-300 ease-in-out 
                                        bg-black hover:bg-black/80 backdrop-blur-sm 
                                        hover:shadow-md hover:shadow-white/5"
                            >
                                <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                                    {buttonText}
                                </span>
                                <span className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300">
                                    →
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
                
                {/* Right side panel - Apple-inspired minimalist design */}
                <div className="hidden lg:block w-full md:w-1/3 lg:w-2/5 md:pl-10">
                    <div className="text-white bg-black/90 p-8 rounded-2xl backdrop-blur-md border border-white/5 shadow-lg">
                        {/* Main statement - Apple style headline */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="mb-10">
                            <h2 className="font-light text-3xl tracking-tight leading-tight mb-2 text-white">
                                L'art de transformer<br/>
                                <span className="font-normal">l'ordinaire en extraordinaire.</span>
                            </h2>
                        </motion.div>
                        
                        {/* Key facts - minimal with refined typography */}
                        <div className="flex flex-col space-y-6 mb-12">
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="flex items-baseline">
                                <div className="w-7 h-[1px] bg-white/40 mr-4 mt-3" />
                                <div>
                                    <div className="text-white/70 text-xs tracking-wider mb-1">PORTFOLIO</div>
                                    <div className="flex items-baseline">
                                        <span className="text-xl font-medium mr-1.5">+200</span>
                                        <span className="text-sm text-white/60 font-light">projets depuis 1999</span>
                                    </div>
                                </div>
                            </motion.div>
                            
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="flex items-baseline">
                                <div className="w-7 h-[1px] bg-white/40 mr-4 mt-3" />
                                <div>
                                    <div className="text-white/70 text-xs tracking-wider mb-1">NOTRE ESSENCE</div>
                                    <div className="flex items-baseline">
                                        <span className="text-sm text-white/90 font-light">Audace. Innovation. Élégance.</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                        
                        {/* Clients section - refined */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            className="pt-6 border-t border-white/10"
                        >
                            <div className="text-white/50 text-xs tracking-wider mb-5 font-light">
                                ILS NOUS FONT CONFIANCE
                            </div>
                            <div className="flex justify-center">
                                <ClientLogoCarousel />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const TextAnimation = ({ text }: { text: string }) => {
    const words = text.split(' ');
    
    return (
        <>
            {words.map((word, wordIndex) => (
                <span 
                    key={wordIndex} 
                    className="inline-block mr-4 last:mr-0"
                >
                    {word.split('').map((letter, letterIndex) => (
                        <motion.span
                            key={`${wordIndex}-${letterIndex}`}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                delay: wordIndex * 0.1 + letterIndex * 0.03,
                                type: "spring",
                                stiffness: 150,
                                damping: 25,
                            }}
                            className="inline-block text-transparent bg-clip-text 
                            bg-gradient-to-r from-white to-white/80"
                        >
                            {letter}
                        </motion.span>
                    ))}
                </span>
            ))}
        </>
    );
};

// Simple Client Logo Carousel component
const ClientLogoCarousel = () => {
    const [currentPair, setCurrentPair] = useState(0);
    
    // Array of client logos - all 28 logos from the logo_partenaire directory
    const logos = [
        { id: 1, name: "AkzoNobel", src: "/logo_partenaire/akzonobel.png" },
        { id: 2, name: "AXA", src: "/logo_partenaire/axa.png" },
        { id: 3, name: "Coca-Cola", src: "/logo_partenaire/cocacola.png" },
        { id: 4, name: "Danone", src: "/logo_partenaire/danone.png" },
        { id: 5, name: "Friesland", src: "/logo_partenaire/friesland.png" },
        { id: 6, name: "Garnier", src: "/logo_partenaire/garnier.png" },
        { id: 7, name: "Giorgio Armani", src: "/logo_partenaire/giorgio-armani.png" },
        { id: 8, name: "Inwi", src: "/logo_partenaire/inwi.png" },
        { id: 9, name: "La Roche", src: "/logo_partenaire/la-roche.png" },
        { id: 10, name: "Lafarge", src: "/logo_partenaire/lafarge.png" },
        { id: 11, name: "Lancome", src: "/logo_partenaire/lancome.png" },
        { id: 12, name: "Legrand", src: "/logo_partenaire/legrand.png" },
        { id: 13, name: "L'Oreal", src: "/logo_partenaire/loreal.png" },
        { id: 14, name: "Maserati", src: "/logo_partenaire/maserati.png" },
        { id: 15, name: "Maybelline", src: "/logo_partenaire/maybelline.png" },
        { id: 16, name: "Nestle", src: "/logo_partenaire/nestle.png" },
        { id: 17, name: "Nissan", src: "/logo_partenaire/nissan.png" },
        { id: 18, name: "Nivea", src: "/logo_partenaire/nivea.png" },
        { id: 19, name: "Nosh", src: "/logo_partenaire/nosh.png" },
        { id: 20, name: "Philips", src: "/logo_partenaire/philips.png" },
        { id: 21, name: "Reebok", src: "/logo_partenaire/reebok.png" },
        { id: 22, name: "Samsung", src: "/logo_partenaire/samsung.png" },
        { id: 23, name: "Schneider", src: "/logo_partenaire/schneider.png" },
        { id: 24, name: "Societe Generale", src: "/logo_partenaire/societe-general.png" },
        { id: 25, name: "Unilever", src: "/logo_partenaire/unilever.png" },
        { id: 26, name: "Valentino", src: "/logo_partenaire/valentino.png" },
        { id: 27, name: "Yves Saint Laurent", src: "/logo_partenaire/yvessaint.png" },
        { id: 28, name: "1", src: "/logo_partenaire/1.png" },
    ];
    
    // Create pairs of logos
    const logoPairs = [];
    for (let i = 0; i < logos.length; i += 2) {
        logoPairs.push([logos[i], logos[i + 1] || logos[0]]);
    }

    // Update the logo indices every 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPair((prev) => (prev + 1) % logoPairs.length);
        }, 2000);
        
        return () => clearInterval(interval);
    }, [logoPairs.length]);

    // Define logo type
    type Logo = {
        id: number;
        name: string;
        src: string;
    };
    
    // Logo component to display a single logo with animation
    const LogoItem = ({ logo, delay = 0 }: { logo: Logo, delay?: number }) => (
        <div className="w-24 h-24 relative">
            <motion.div 
                key={logo.id}
                className="absolute inset-0 flex items-center justify-center"
                initial={{ y: "10%", opacity: 0, filter: "blur(8px)" }}
                animate={{
                    y: "0%",
                    opacity: 1,
                    filter: "blur(0px)",
                    transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        mass: 1,
                        bounce: 0.2,
                        duration: 0.5,
                        delay: delay,
                    },
                }}
                exit={{
                    y: "-20%",
                    opacity: 0,
                    filter: "blur(6px)",
                    transition: {
                        type: "tween",
                        ease: "easeIn",
                        duration: 0.3,
                    },
                }}
            >
                <Image 
                    src={logo.src}
                    alt={logo.name}
                    width={80}
                    height={80}
                    className="max-h-[80%] max-w-[80%] object-contain"
                />
            </motion.div>
        </div>
    );

    return (
        <div className="flex space-x-8">
            <AnimatePresence mode="wait">
                <motion.div 
                    key={`pair-${currentPair}`}
                    className="flex space-x-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <LogoItem logo={logoPairs[currentPair][0]} delay={0} />
                    <LogoItem logo={logoPairs[currentPair][1]} delay={0.1} />
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export function DemoBackgroundPaths() {
    return <BackgroundPaths title="Background Paths" />;
}
