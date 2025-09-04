'use client';

import { useEffect } from 'react';

export default function FontLoader() {
  useEffect(() => {
    // Add Neue Montreal font to the document
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'PP Neue Montreal';
        src: url('https://cdn.prod.website-files.com/6819ed8312518f61b84824df/6819ed8312518f61b84825ba_PPNeueMontreal-Medium.woff2') format('woff2');
        font-weight: 500;
        font-style: normal;
        font-display: swap;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return null;
} 