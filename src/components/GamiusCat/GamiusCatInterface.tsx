'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import GamiusCatScene from './GamiusCatScene';

// Custom CSS for animations and styling
const gamiusCatStyles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  /* Prevent flashing during transitions */
  * {
    backface-visibility: hidden;
    -webkit-font-smoothing: antialiased;
  }
  @keyframes fadeInUp {
    from { 
      opacity: 0; 
      transform: translateY(10px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  @keyframes shimmer {
    0% { opacity: 0.5; }
    50% { opacity: 1; }
    100% { opacity: 0.5; }
  }
  
  .gamius-dialogue {
    animation: fadeIn 0.3s ease-out;
    will-change: opacity, transform;
  }
  .gamius-choice {
    transition: all 0.3s ease;
    opacity: 0;
    will-change: opacity, transform;
  }
  .gamius-choice:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .gamius-speaker-badge {
    animation: fadeIn 0.3s ease-out;
  }
  .animate-fadeInUp {
    animation: fadeInUp 0.4s ease-out forwards;
    will-change: opacity, transform;
  }
  .loading-shimmer {
    animation: shimmer 1.5s ease-in-out infinite;
  }
  .dialogue-container {
    min-height: 100px;
    transition: all 0.3s ease;
  }
  .choices-container {
    transition: opacity 0.3s ease;
  }
  
  /* Prevent flash on initial load */
  .gamius-cat-interface-container {
    opacity: 0;
    animation: fadeIn 0.5s ease-out 0.1s forwards;
    will-change: opacity;
    transform: translateZ(0);
  }
  
  /* Smooth image loading */
  .dialogue-image {
    transition: opacity 0.3s ease;
    opacity: 0;
  }
  .dialogue-image.loaded {
    opacity: 1;
  }
`;

// Extend Window interface for TypeScript to recognize 3D script functions
declare global {
  interface Window {
    initGamius3DEngine?: (containerId: string) => void;
    gamius3DEngine?: {
      playAnimation: (animationCue: string) => void;
      [key: string]: any;
    };
  }
}

// Type definitions for the dialogue scenario
interface DialogueChoice {
  id: string;
  text: string; // Text displayed on the choice button
  nextNodeId: string; // ID of the next dialogue node
  action?: string;
  url?: string;
}

interface DialogueNode {
  id: string;
  speaker?: 'Gamius' | 'System' | 'User'; // Optional, for different styling
  text: string; // The dialogue text
  choices: DialogueChoice[]; // Available choices from this node
  imageSrc?: string; // Path to image to display for this node
  animationCue?: string; // To link to animations later
  isEnding?: boolean; // If this is a final node
}

interface GamiusCatInterfaceProps {
  lang?: string;
}

// Lottie Avatar Component
const LottieAvatar: React.FC<{ size?: string }> = ({ size = 'w-10 h-10 sm:w-12 sm:h-12' }) => {
  const [animationContainer, setAnimationContainer] = useState<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const lottieInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (animationContainer && typeof window !== 'undefined') {
      setIsLoading(true);
      setIsReady(false);
      setHasError(false);
      
      console.log('🎭 Loading Lottie animation from /item_images/cercle.json');
      
      import('lottie-web').then((lottie) => {
        if (lottieInstanceRef.current) {
          lottieInstanceRef.current.destroy();
        }
        animationContainer.innerHTML = '';
        
        try {
          lottieInstanceRef.current = lottie.default.loadAnimation({
            container: animationContainer,
            renderer: 'svg',
            loop: true,
            autoplay: true, // Démarrer automatiquement
            path: '/item_images/cercle.json',
          });

          lottieInstanceRef.current.addEventListener('DOMLoaded', () => {
            console.log('🎭 Lottie animation loaded successfully');
            setIsLoading(false);
            setIsReady(true);
            // Forcer la lecture et agrandir l'animation
            lottieInstanceRef.current.play();
            // Agrandir l'animation pour qu'elle remplisse bien le conteneur
            const svgElement = animationContainer.querySelector('svg');
            if (svgElement) {
              svgElement.style.width = '120%';
              svgElement.style.height = '120%';
              svgElement.style.transform = 'translate(-10%, -10%)';
            }
          });

          lottieInstanceRef.current.addEventListener('data_failed', () => {
            console.error('🎭 Lottie animation failed to load');
            setIsLoading(false);
            setHasError(true);
          });
        } catch (error) {
          console.error('🎭 Error loading Lottie animation:', error);
          setIsLoading(false);
          setHasError(true);
        }
      }).catch((error) => {
        console.error('🎭 Error importing lottie-web:', error);
        setIsLoading(false);
        setHasError(true);
      });
    }
    return () => {
      if (lottieInstanceRef.current) {
        lottieInstanceRef.current.destroy();
      }
    };
  }, [animationContainer]);

  // Utiliser une taille plus grande pour l'avatar
  const actualSize = size === 'w-8 h-8' ? 'w-10 h-10' : size;

  return (
    <div className={`relative ${actualSize} flex-shrink-0`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-t-transparent border-purple-500 rounded-full animate-spin"></div>
        </div>
      )}
      
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 rounded-full">
          <span role="img" aria-label="cat emoji">🐱</span>
        </div>
      )}
      
      <div 
        ref={setAnimationContainer}
        className={`w-full h-full rounded-full overflow-hidden ${isReady ? 'opacity-100 scale-110' : 'opacity-0'}`}
        style={{ transition: 'opacity 0.3s ease, transform 0.3s ease' }}
      />
    </div>
  );
};

// Language texts
const texts = {
  fr: {
    studioActive: 'Studio Actif',
    visitSite: 'Visiter gamiusgroup.com',
    loading: 'Chargement du scénario de dialogue...',
    errorTitle: 'Erreur de chargement',
    errorMessage: 'Impossible de charger le scénario de dialogue.',
    retry: 'Réessayer',
    restart: 'Redémarrer',
    endSection: 'Fin de cette section de dialogue'
  },
  en: {
    studioActive: 'Active Studio',
    visitSite: 'Visit gamiusgroup.com',
    loading: 'Loading dialogue scenario...',
    errorTitle: 'Loading Error',
    errorMessage: 'Failed to load dialogue scenario.',
    retry: 'Retry',
    restart: 'Restart',
    endSection: 'End of this dialogue section'
  }
};

const GamiusCatInterface: React.FC<GamiusCatInterfaceProps> = ({ lang: initialLang = 'fr' }) => {
  // State management for the dialogue scenario
  const [scenarioData, setScenarioData] = useState<DialogueNode[] | null>(null);
  const [currentNodeId, setCurrentNodeId] = useState<string>('start');
  const [isLoadingScenario, setIsLoadingScenario] = useState<boolean>(true);
  const [scenarioError, setScenarioError] = useState<Error | null>(null);
  const [activeAnimationCue, setActiveAnimationCue] = useState<string | undefined>(undefined);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [currentLang, setCurrentLang] = useState<'fr' | 'en'>(initialLang as 'fr' | 'en');

  const t = texts[currentLang];

  // Inject CSS styles
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = gamiusCatStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Reset image loaded state when node changes
  useEffect(() => {
    setImageLoaded(false);
  }, [currentNodeId]);

  // Handle image loading
  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  // Find the current dialogue node based on currentNodeId
  const currentNode = useMemo(() => {
    if (!scenarioData || scenarioData.length === 0) return null;
    const foundNode = scenarioData.find(node => node.id === currentNodeId) || null;
    return foundNode;
  }, [scenarioData, currentNodeId]);

  // Effect to set active animation cue when dialogue node changes
  useEffect(() => {
    if (currentNode?.animationCue) {
      console.log(`[GamiusCat] Dialogue node changed. Setting active animation cue: ${currentNode.animationCue}`);
      setActiveAnimationCue(currentNode.animationCue);
    } else {
      // Optionally reset or set a default idle animation cue
      // setActiveAnimationCue('idle_default'); 
    }
  }, [currentNode]);

  // Fetch dialogue scenario data
  const fetchScenario = useCallback(async () => {
    setIsLoadingScenario(true);
    setScenarioError(null); // Reset error state before fetching
    try {
      let response;
      const frenchScenarioFileName = 'gamius_cat_scenario_fr.json';
      let fileNameToFetch;

      // Determine the initial file to fetch based on language
      if (currentLang === 'fr') {
        fileNameToFetch = frenchScenarioFileName;
        console.log(`[GamiusCat] Language is French, attempting to fetch specific dialogue: /data/dialogues/${fileNameToFetch}`);
      } else {
        fileNameToFetch = `${currentLang}.json`;
        console.log(`[GamiusCat] Attempting to fetch primary dialogue: /data/dialogues/${fileNameToFetch}`);
      }
      
      response = await fetch(`/data/dialogues/${fileNameToFetch}`);
      console.log(`[GamiusCat] Initial fetch for '${fileNameToFetch}': status=${response.status}, ok=${response.ok}`);

      // If the first attempt failed AND the language was NOT French (meaning we tried a generic ${lang}.json),
      // THEN try falling back to the specific French scenario.
      if (!response.ok && currentLang !== 'fr') {
        console.warn(`[GamiusCat] Primary dialogue '${fileNameToFetch}' (for lang '${currentLang}') not found or failed. Falling back to French: '${frenchScenarioFileName}'.`);
        fileNameToFetch = frenchScenarioFileName; // Update fileNameToFetch for subsequent logging/error messages
        response = await fetch(`/data/dialogues/${frenchScenarioFileName}`);
        console.log(`[GamiusCat] French fallback fetch for '${frenchScenarioFileName}': status=${response.status}, ok=${response.ok}`);
      }

      // If all attempts failed, throw an error
      if (!response.ok) {
        const errorMsg = `Failed to load dialogue scenario. Attempted '${fileNameToFetch}'. Final status: ${response.status}`;
        console.error(`[GamiusCat] ${errorMsg}`);
        throw new Error(errorMsg);
      }

      console.log(`[GamiusCat] Successfully fetched dialogue data from '${fileNameToFetch}'.`);
      const data = await response.json();
      // Convert the object of nodes into an array of nodes
      setScenarioData(Object.values(data));
      setCurrentNodeId('start');
    } catch (error) {
      console.error('Error fetching dialogue scenario:', error);
      setScenarioError(error as Error);
    } finally {
      setIsLoadingScenario(false);
    }
  }, [currentLang]);

  // Load scenario data on component mount
  useEffect(() => {
    fetchScenario();
  }, [fetchScenario]);

  // Handle user choice selection with support for redirect actions
  const handleChoiceSelect = useCallback(async (choice: DialogueChoice) => {
    console.log(' Choice selected:', choice);
    
    // Handle redirect actions
    if (choice.action === 'redirect' && choice.url) {
      console.log(' Redirecting to:', choice.url);
      // Open in new tab with security
      window.open(choice.url, '_blank', 'noopener,noreferrer');
      return;
    }
    
    // Standard dialogue navigation
    setIsLoadingScenario(true);
    
    try {
      // Simulate thinking time for more natural conversation
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const nextNode = scenarioData?.find(node => node.id === choice.nextNodeId);
      if (nextNode) {
        console.log(' Moving to node:', nextNode.id);
        setCurrentNodeId(choice.nextNodeId);
        setIsLoadingScenario(false);
      } else {
        console.error(' Node not found:', choice.nextNodeId);
        setScenarioError(new Error(`Node not found: ${choice.nextNodeId}`));
        setIsLoadingScenario(false);
      }
    } catch (err) {
      console.error(' Error in choice handling:', err);
      setScenarioError(err as Error);
      setIsLoadingScenario(false);
    }
  }, [scenarioData]);

  // Effect to initialize 3D scene and handle animation cues
  useEffect(() => {
    if (typeof window !== 'undefined' && activeAnimationCue) {
      console.log(`[GamiusCat] Triggering 3D animation: ${activeAnimationCue}`);
      
      // Wait for 3D engine to be available
      const trigger3DAnimation = () => {
        if (window.gamius3DEngine && typeof window.gamius3DEngine.playAnimation === 'function') {
          console.log(`[GamiusCat] 3D Engine available, playing animation: ${activeAnimationCue}`);
          window.gamius3DEngine.playAnimation(activeAnimationCue);
        } else {
          console.log('[GamiusCat] 3D Engine not ready, retrying in 500ms...');
          setTimeout(trigger3DAnimation, 500);
        }
      };
      
      trigger3DAnimation();
    }
  }, [activeAnimationCue]);

  // Initialize 3D scene when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const init3DScene = () => {
        const container = document.getElementById('gamius-3d-scene-container');
        const loadingOverlay = document.getElementById('gamius-3d-loading');
        
        if (container && typeof window.initGamius3DEngine === 'function') {
          console.log('[GamiusCat] Initializing 3D scene...');
          
          try {
            window.initGamius3DEngine(container.id);
            
            // Hide loading overlay after 2 seconds
            setTimeout(() => {
              if (loadingOverlay) {
                loadingOverlay.style.opacity = '0';
                setTimeout(() => {
                  loadingOverlay.style.display = 'none';
                }, 300);
              }
            }, 2000);
            
          } catch (error) {
            console.error('[GamiusCat] 3D initialization error:', error);
            if (loadingOverlay) {
              loadingOverlay.innerHTML = `
                <div class="text-center">
                  <div class="text-4xl mb-2">🐱</div>
                  <p class="text-sm text-gray-300">Chat 2D Mode</p>
                </div>
              `;
            }
          }
        } else if (container) {
          console.log('[GamiusCat] 3D engine not available, retrying...');
          setTimeout(init3DScene, 1000);
        }
      };
      
      // Initialize after a short delay to ensure DOM is ready
      setTimeout(init3DScene, 100);
    }
  }, []);

  // Render the component
  return (
    <>
      <Head>
        <Script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.13.0/dist/tf.min.js" />
      </Head>
      
      {/* Modern Mobile-First Layout */}
      <div className="gamius-cat-interface-container min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white font-sans">
        
        {/* Header with Avatar and Language Switcher */}
        <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-purple-500/20">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            {/* Logo/Avatar Section */}
            <div className="flex items-center space-x-3">
              <LottieAvatar size="w-12 h-12" />
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Gamius Cat
                </h1>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-400">{t.studioActive}</span>
                </div>
              </div>
            </div>
            
            {/* Language Switcher & Visit Button */}
            <div className="flex items-center space-x-3">
              {/* Language Toggle */}
              <div className="flex bg-gray-800 rounded-full p-1">
                <button
                  onClick={() => setCurrentLang('fr')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    currentLang === 'fr' 
                      ? 'bg-purple-600 text-white shadow-lg' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  FR
                </button>
                <button
                  onClick={() => setCurrentLang('en')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    currentLang === 'en' 
                      ? 'bg-purple-600 text-white shadow-lg' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  EN
                </button>
              </div>
              
              {/* Visit Button */}
              <button
                onClick={() => window.open('https://gamiusgroup.com', '_blank', 'noopener,noreferrer')}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl transition-all transform hover:scale-105 font-medium shadow-lg"
              >
                {t.visitSite}
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex flex-col lg:flex-row max-w-7xl mx-auto">
          
          {/* 3D Chat Scene - Desktop */}
          <div className="hidden lg:block lg:w-1/2 relative">
            <div className="sticky top-20 h-[calc(100vh-100px)] bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-700/50 overflow-hidden">
              {/* 3D Scene Container */}
              <div 
                id="gamius-3d-scene-container" 
                className="w-full h-full relative"
                style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}
              >
                {/* 3D Canvas will be injected here by gamius-chat-3d.js */}
              </div>
              
              {/* Loading Overlay for 3D - Show only when 3D is not ready */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 pointer-events-none" id="gamius-3d-loading">
                <div className="text-center">
                  <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                  <p className="text-sm text-gray-300">Loading 3D Chat...</p>
                </div>
              </div>
            </div>
          </div>

          {/* Dialogue Panel - Mobile Optimized */}
          <div className="lg:w-1/2 flex flex-col min-h-[calc(100vh-80px)]">
            <div className="flex-1 p-4 lg:p-6 space-y-4">
              
              {/* Loading State */}
              {isLoadingScenario && (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center space-y-4">
                    <LottieAvatar size="w-16 h-16" />
                    <div className="space-y-2">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
                      <p className="text-gray-400 loading-shimmer">{t.loading}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Error State */}
              {scenarioError && !isLoadingScenario && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-300 p-4 rounded-xl backdrop-blur-sm">
                  <h3 className="text-lg font-bold mb-2">{t.errorTitle}</h3>
                  <p className="mb-4">{t.errorMessage}</p>
                  <button 
                    onClick={fetchScenario} 
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                  >
                    {t.retry}
                  </button>
                </div>
              )}
              
              {/* Dialogue Display */}
              {!isLoadingScenario && !scenarioError && currentNode && (
                <div className="space-y-4">
                  {/* Speaker Badge */}
                  {currentNode.speaker && (
                    <div className="flex items-center space-x-3">
                      <LottieAvatar size="w-8 h-8" />
                      <div className={`
                        px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm
                        ${currentNode.speaker === 'Gamius' ? 'bg-purple-600/80 text-white' : 
                          currentNode.speaker === 'System' ? 'bg-blue-600/80 text-white' : 
                          'bg-green-600/80 text-white'}
                      `}>
                        {currentNode.speaker}
                      </div>
                    </div>
                  )}
                  
                  {/* Dialogue Text */}
                  <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50">
                    <p className="text-lg leading-relaxed">{currentNode.text}</p>
                    
                    {/* Image if present */}
                    {currentNode.imageSrc && (
                      <div className="mt-6">
                        <img 
                          src={currentNode.imageSrc} 
                          alt="Dialogue illustration" 
                          className={`dialogue-image ${imageLoaded ? 'loaded' : ''} rounded-xl w-full h-auto shadow-xl`}
                          onLoad={handleImageLoad}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* User Choices */}
              {!isLoadingScenario && !scenarioError && currentNode?.choices && currentNode.choices.length > 0 && (
                <div className="space-y-3">
                  {currentNode.choices.map((choice: DialogueChoice, index: number) => (
                    <button
                      key={choice.id}
                      onClick={() => handleChoiceSelect(choice)}
                      className="gamius-choice w-full text-left p-4 bg-gradient-to-r from-gray-800/80 to-gray-700/80 hover:from-purple-800/80 hover:to-purple-700/80 rounded-xl transition-all duration-200 transform hover:scale-[1.02] border border-gray-600/50 backdrop-blur-sm opacity-0 animate-fadeInUp"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animationFillMode: 'forwards'
                      }}
                    >
                      <span className="block font-medium">{choice.text}</span>
                    </button>
                  ))}
                </div>
              )}
              
              {/* Ending indicator */}
              {!isLoadingScenario && !scenarioError && currentNode?.isEnding && (
                <div className="text-center space-y-4 mt-8">
                  <div className="inline-flex items-center space-x-2 px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full">
                    <span className="text-yellow-400">✨</span>
                    <p className="text-yellow-400 font-medium">{t.endSection}</p>
                  </div>
                  <button
                    onClick={() => setCurrentNodeId('start')}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl transition-all transform hover:scale-105 font-medium shadow-lg"
                  >
                    {t.restart}
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default GamiusCatInterface;
