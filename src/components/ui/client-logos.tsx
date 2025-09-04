"use client";

import React from 'react';

// Logo components with simple abstract designs
export const Logo1 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="50" cy="50" r="30" fill="white" />
    <rect x="100" y="20" width="60" height="60" fill="white" />
  </svg>
);

export const Logo2 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M30 30 L70 30 L50 70 Z" fill="white" />
    <path d="M100 20 L160 20 L160 80 L100 80 Z" fill="white" />
  </svg>
);

export const Logo3 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M50 20 C80 20, 80 80, 50 80 C20 80, 20 20, 50 20" fill="white" />
    <path d="M120 20 L140 50 L120 80 L100 50 Z" fill="white" />
  </svg>
);

export const Logo4 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="30" y="30" width="40" height="40" rx="5" fill="white" />
    <circle cx="130" cy="50" r="25" fill="white" />
  </svg>
);

export const Logo5 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M40 20 L60 20 L60 80 L40 80 Z" fill="white" />
    <path d="M120 20 L150 20 L150 40 L120 40 L120 60 L150 60 L150 80 L120 80 Z" fill="white" />
  </svg>
);

export const Logo6 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="5" fill="none" />
    <rect x="100" y="25" width="50" height="50" stroke="white" strokeWidth="5" fill="none" />
  </svg>
);

export const Logo7 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M40 20 L80 50 L40 80 Z" fill="white" />
    <path d="M100 50 C100 30, 160 30, 160 50 C160 70, 100 70, 100 50" fill="white" />
  </svg>
);

export const Logo8 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M30 30 L70 30 L70 70 L30 70 Z" stroke="white" strokeWidth="5" fill="none" />
    <circle cx="130" cy="50" r="25" stroke="white" strokeWidth="5" fill="none" />
  </svg>
);

// Export array of logo objects for the carousel
export const clientLogos = [
  { name: "Company 1", id: 1, img: Logo1 },
  { name: "Company 2", id: 2, img: Logo2 },
  { name: "Company 3", id: 3, img: Logo3 },
  { name: "Company 4", id: 4, img: Logo4 },
  { name: "Company 5", id: 5, img: Logo5 },
  { name: "Company 6", id: 6, img: Logo6 },
  { name: "Company 7", id: 7, img: Logo7 },
  { name: "Company 8", id: 8, img: Logo8 },
];
