'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Script from 'next/script';
import Link from 'next/link';

// Type declaration for the global window object
declare global {
  interface Window {
    gamiusChatWorld?: {
      triggerCatAnimation: (type: string) => void;
      setBallColor: (color: string) => void;
      setCatColor: (color: string) => void;
    };
  }
}

// Component to display 3D chat world
const ChatWorldContainer = () => {
  return (
    <div className="relative w-full h-full"> {/* Adjusted height to fill parent */}
      <div id="world" className="absolute inset-0"></div>
    </div>
  );
};

export default function ChatInterface() {
  const params = useParams();
  const locale = typeof params.locale === 'string' ? params.locale : 'fr';
  const currentLocale = locale === 'en' ? 'en' : 'fr'; // Ensure currentLocale is 'en' or 'fr'
  const [worldLoaded, setWorldLoaded] = useState<boolean>(false);

  // Script loaded handler
  const handleScriptLoad = () => {
    console.log('3D Chat world script loaded');
    setWorldLoaded(true);
    // Optional: Trigger an initial animation once the world is loaded
    if (window.gamiusChatWorld) {
      window.gamiusChatWorld.triggerCatAnimation('greet');
    }
  };

  const backToGeniusText = currentLocale === 'fr' ? 'Retour à Genius' : 'Back to Genius';
  const footerText = currentLocale === 'fr' 
    ? "Cette expérience a été réalisée par Gamius. Tous droits réservés."
    : "This experience was created by Gamius. All rights reserved.";

  return (
    <>
      <Script
        src="/js/gamius-chat-3d.js"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />

      <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
        {/* Back to Genius Button - Top Left */}
        <Link href={`/${currentLocale}`} legacyBehavior passHref>
          <a className="absolute top-4 left-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 z-10">
            {backToGeniusText}
          </a>
        </Link>

        {/* 3D Experience Container */}
        <div className="w-full max-w-4xl h-[70vh] lg:h-[80vh] bg-gray-900 rounded-xl overflow-hidden border-2 border-yellow-400/50 shadow-2xl shadow-yellow-500/30 my-8">
          <ChatWorldContainer />
        </div>

        {/* Footer Text - Bottom Center */}
        <footer className="absolute bottom-4 text-center text-xs text-gray-400">
          <p>{footerText}</p>
        </footer>
      </div>
    </>
  );
}
