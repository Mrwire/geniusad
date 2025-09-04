'use client';

import React, { useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Provide GSAP context to all client components
interface ClientWrapperProps {
  children: ReactNode;
}

const ClientWrapper = ({ children }: ClientWrapperProps) => {
  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Perform GSAP initializations here
    const fadeInElements = document.querySelectorAll('[data-gsap="fade-in"]');
    const staggerElements = document.querySelectorAll('[data-gsap="stagger"]');
    
    // Fade in animations
    fadeInElements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom-=100',
            toggleActions: 'play none none none',
          },
        }
      );
    });
    
    // Stagger animations
    staggerElements.forEach((parent) => {
      const children = parent.querySelectorAll('[data-stagger-item]');
      if (children.length) {
        gsap.fromTo(
          children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: parent,
              start: 'top bottom-=100',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });
    
    // Clean up ScrollTrigger on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <>{children}</>;
};

export default ClientWrapper; 