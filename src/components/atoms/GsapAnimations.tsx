'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Lenis from '@studio-freight/lenis';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export function GsapProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize smooth scroll
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
    });

    // Sync lenis with requestAnimationFrame
    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Setup GSAP animations for elements with data-gsap attribute
    const fadeElements = document.querySelectorAll('[data-gsap="fade-in"]');
    
    fadeElements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom-=100',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    const slideElements = document.querySelectorAll('[data-gsap="slide-in"]');
    
    slideElements.forEach((el) => {
      const direction = el.getAttribute('data-direction') || 'left';
      const xStart = direction === 'left' ? -100 : direction === 'right' ? 100 : 0;
      
      gsap.fromTo(
        el,
        { opacity: 0, x: xStart },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom-=100',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Cleanup function
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      
      // Kill all ScrollTriggers to prevent memory leaks
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return <>{children}</>;
}

// Utility functions for GSAP animations
export const gsapUtils = {
  animateText: (element: string | Element, delay: number = 0) => {
    const chars = gsap.utils.toArray(`${element} .char`);
    return gsap.fromTo(
      chars,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.02,
        duration: 0.5,
        ease: 'power2.out',
        delay,
      }
    );
  },
  
  animateStrokeToFill: (element: string | Element, duration: number = 1.5) => {
    const path = typeof element === 'string' ? document.querySelector(element) : element;
    if (!path) return;
    
    gsap.set(path, { 
      strokeDasharray: (path as SVGPathElement).getTotalLength(),
      strokeDashoffset: (path as SVGPathElement).getTotalLength(),
      fill: 'rgba(255,255,255,0)'
    });
    
    return gsap.timeline()
      .to(path, { 
        strokeDashoffset: 0, 
        duration: duration * 0.6, 
        ease: 'power2.inOut'
      })
      .to(path, { 
        fill: 'rgba(255,255,255,1)', 
        duration: duration * 0.4, 
        ease: 'power2.in' 
      }, `-=${duration * 0.2}`);
  }
};

// Custom hook for splitting text
export function useSplitText() {
  useEffect(() => {
    document.querySelectorAll('[data-split="chars"]').forEach((element) => {
      if (element.textContent) {
        const originalText = element.textContent;
        const splitText = originalText.split('').map(char => 
          `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');
        element.innerHTML = splitText;
      }
    });
  }, []);
} 