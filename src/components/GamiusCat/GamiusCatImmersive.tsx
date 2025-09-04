'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { safeLocalStorage } from '@/utils/safeStorage';
import { StreamingStudio3D } from './StreamingStudio3D';

// Types pour l'animation Lottie
interface LottieOptions {
  loop: boolean;
  autoplay: boolean;
  animationData?: any;
  rendererSettings?: {
    preserveAspectRatio: string;
  };
}

interface LottieProps {
  options: LottieOptions;
  height: number;
  width: number;
  isClickToPauseDisabled?: boolean;
}

// Composant Lottie simple
const SimpleLottie: React.FC<LottieProps> = ({ options, height, width }) => {
  const [animationContainer, setAnimationContainer] = useState<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isReady, setIsReady] = useState<boolean>(false);
  const lottieInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (animationContainer && typeof window !== 'undefined') {
      setIsLoading(true);
      setIsReady(false);
      
      import('lottie-web').then((lottie) => {
        if (lottieInstanceRef.current) {
          lottieInstanceRef.current.destroy();
        }
        animationContainer.innerHTML = '';
        
        lottieInstanceRef.current = lottie.default.loadAnimation({
          container: animationContainer,
          renderer: 'svg',
          loop: options.loop,
          autoplay: false, // Start paused to prevent flash
          path: '/item_images/cercle.json',
        });

        // Wait for animation to be ready, then start smoothly
        lottieInstanceRef.current.addEventListener('DOMLoaded', () => {
          setIsLoading(false);
          setTimeout(() => {
            setIsReady(true);
            if (options.autoplay) {
              lottieInstanceRef.current.play();
            }
          }, 100); // Small delay for smooth transition
        });

        // Fallback in case DOMLoaded doesn't fire
        setTimeout(() => {
          if (isLoading) {
            setIsLoading(false);
            setIsReady(true);
            if (options.autoplay) {
              lottieInstanceRef.current?.play();
            }
          }
        }, 2000);
        
      }).catch(() => {
        setIsLoading(false);
        setIsReady(true);
      });
    }
    return () => {
      if (lottieInstanceRef.current) {
        lottieInstanceRef.current.destroy();
      }
    };
  }, [animationContainer, options, height, width]);

  return (
    <div 
      ref={setAnimationContainer}
      style={{ width, height }}
      className={`lottie-logo ${isLoading ? 'loading' : ''} ${isReady ? 'ready' : ''}`}
    />
  );
};

// Styles CSS pour l'expérience immersive complète
const immersiveStyles = `
  /* Styles CSS intégrés pour l'expérience immersive - Thème Jaune Gamius */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  
  .immersive-world {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%);
    overflow: hidden;
    font-family: 'Inter', sans-serif;
    z-index: 1000;
  }

  .matrix-rain {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }

  .loading-screen {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .loading-text {
    color: #FFD700;
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
    margin-top: 2rem;
    text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
  }

  .progress-bar {
    width: 280px;
    height: 4px;
    background: rgba(255, 215, 0, 0.2);
    border-radius: 4px;
    overflow: hidden;
    margin-top: 1.5rem;
  }

  .progress-bar > div {
    height: 100%;
    background: linear-gradient(90deg, #FFD700, #FFA500);
    transition: width 0.3s ease;
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
  }

  .credit-text {
    color: #FFD700;
    font-size: 0.9rem;
    opacity: 0.8;
    margin-top: 1rem;
    text-align: center;
    font-weight: 500;
  }

  .lottie-logo {
    width: 200px;
    height: 200px;
    filter: drop-shadow(0 0 30px rgba(255, 215, 0, 0.7));
  }

  .lottie-logo.loading {
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .lottie-logo.ready {
    opacity: 1;
    transition: opacity 0.3s ease;
  }

  .status-hud {
    position: absolute;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 30;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 215, 0, 0.3);
    border-radius: 12px;
    padding: 0.75rem 1.25rem;
    box-shadow: 0 4px 20px rgba(255, 215, 0, 0.2);
  }

  .back-button {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 215, 0, 0.3);
    border-radius: 12px;
    padding: 0.625rem 1rem;
    color: #FFD700;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
    z-index: 20;
    box-shadow: 0 4px 20px rgba(255, 215, 0, 0.2);
  }

  .back-button:hover {
    background: rgba(255, 215, 0, 0.1);
    border-color: rgba(255, 215, 0, 0.6);
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(255, 215, 0, 0.3);
  }

  .back-button:active {
    transform: translateY(-1px);
  }

  .visit-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 215, 0, 0.3);
    border-radius: 12px;
    padding: 0.625rem 1rem;
    color: #FFD700;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
    z-index: 20;
    box-shadow: 0 4px 20px rgba(255, 215, 0, 0.2);
  }

  .visit-button:hover {
    background: rgba(255, 215, 0, 0.1);
    border-color: rgba(255, 215, 0, 0.6);
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(255, 215, 0, 0.3);
  }

  .visit-button:active {
    transform: translateY(-1px);
  }

  /* Dialogue Styles */
  .dialogue-container {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    width: 92%;
    max-width: 640px;
    z-index: 15;
    animation: slideUp 0.45s ease-out;
  }

  .dialogue-bubble {
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(20, 20, 20, 0.9) 100%);
    backdrop-filter: blur(18px);
    border: 2px solid rgba(255, 215, 0, 0.4);
    border-radius: 20px;
    padding: 1.25rem 1.5rem;
    margin-bottom: 1rem;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4), 0 0 35px rgba(255, 215, 0, 0.12);
  }

  .dialogue-header { margin-bottom: 1rem; }
  .dialogue-content { color: #ffffff; line-height: 1.6; }

  .choices-container { display: flex; flex-direction: column; gap: 0.75rem; }

  .choice-button {
    background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 165, 0, 0.1) 100%);
    border: 2px solid rgba(255, 215, 0, 0.35);
    border-radius: 15px;
    padding: 1rem 1.5rem;
    color: #ffd700;
    transition: all 0.3s ease;
    font-weight: 500;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 15px rgba(255, 215, 0, 0.12);
  }

  .choice-button:hover {
    background: linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 165, 0, 0.2) 100%);
    border-color: rgba(255, 215, 0, 0.6);
    transform: translateY(-2px);
    box-shadow: 0 6px 22px rgba(255, 215, 0, 0.2);
    color: #ffffff;
  }

  /* Responsive mobile */
  @media (max-width: 768px) {
    .dialogue-container {
      width: 96%;
      bottom: 1rem;
    }

    .dialogue-bubble { padding: 1rem; }

    /* Buttons */
    .back-button { top: 1rem; left: 1rem; padding: 0.625rem 1rem; }
    .visit-button { top: 1rem; right: 1rem; padding: 0.625rem 1rem; }

    /* Status HUD to right */
    .status-hud {
      left: auto;
      right: 1rem;
      transform: none;
    }
  }

  /* Responsive mobile for visit button */
  @media (max-width: 768px) {
    .visit-button {
      top: 1rem;
      right: 1rem;
      padding: 0.625rem 1rem;
    }
  }

  .top-buttons {
    position: absolute;
    top: 1rem;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    pointer-events: none; /* allow child buttons to handle events */
  }
  .back-button, .visit-button { pointer-events: auto; }

  .back-button, .visit-button { padding: 0.625rem 1rem; }
  
  /* Compact button inside dialogue */
  .visit-dialog-button {
    position: absolute;
    top: -2.2rem;
    right: 0;
    padding: 0.4rem 0.9rem;
    font-size: 0.85rem;
    border-radius: 9999px;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 215, 0, 0.4);
    color: #FFD700;
    box-shadow: 0 2px 12px rgba(255, 215, 0, 0.1);
  }
`;

interface DialogueNode {
  id: string;
  speaker?: 'Gamius' | 'System' | 'User';
  text: string;
  choices?: Array<{
    id: string;
    text: string;
    nextNodeId: string;
    icon?: string;
    animationTrigger?: string;
  }>;
  animationCue?: string;
  imageSrc?: string;
  isEnding?: boolean;
  mood?: 'neutral' | 'excited' | 'confused' | 'thinking' | 'mysterious';
}

interface GamiusCatImmersiveProps {
  lang?: string;
  onBack?: () => void;
}

declare global {
  interface Window {
    initGamius3DEngine?: (containerId: string) => void;
    triggerGamiusAnimation?: (animationName: string) => void;
    cleanupGamius3DEngine?: () => void;
  }
}

const GamiusCatImmersive: React.FC<GamiusCatImmersiveProps> = ({ 
  lang = 'fr', 
  onBack 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [scenarioData, setScenarioData] = useState<Record<string, DialogueNode> | null>(null);
  const [currentNodeId, setCurrentNodeId] = useState('start');
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showChoices, setShowChoices] = useState(false);
  const [matrixColumns, setMatrixColumns] = useState<number[]>([]);
  const [currentAnimation, setCurrentAnimation] = useState('idle');
  
  const currentNode = scenarioData?.[currentNodeId];

  // État pour gérer l'audio
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [meowBuffer, setMeowBuffer] = useState<AudioBuffer | null>(null);
  const [isAudioInitialized, setIsAudioInitialized] = useState(false);

  // Fonction d'initialisation audio
  const initializeAudio = useCallback(async () => {
    if (isAudioInitialized || !window.AudioContext) return;
    
    try {
      const context = new (window.AudioContext || (window as any).webkitAudioContext)();
      setAudioContext(context);
      
      // Précharger le son de miaulement
      const response = await fetch('/sounds/CatMeow.mp3');
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await context.decodeAudioData(arrayBuffer);
      setMeowBuffer(audioBuffer);
      setIsAudioInitialized(true);
      
      console.log('🎵 Audio initialisé avec succès');
    } catch (error) {
      console.warn('Erreur lors de l\'initialisation audio:', error);
    }
  }, [isAudioInitialized]);

  // Fonction pour jouer le miaulement
  const playMeowSound = useCallback(async () => {
    if (!audioContext || !meowBuffer) {
      await initializeAudio();
      return;
    }

    try {
      const source = audioContext.createBufferSource();
      source.buffer = meowBuffer;
      source.connect(audioContext.destination);
      source.start(0);
      console.log('🐱 Miaulement joué');
    } catch (error) {
      console.warn('Erreur lecture miaulement:', error);
    }
  }, [audioContext, meowBuffer, initializeAudio]);

  // Initialiser l'audio au premier clic
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!isAudioInitialized) {
        initializeAudio();
      }
    };

    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('touchstart', handleFirstInteraction, { once: true });
    
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [initializeAudio, isAudioInitialized]);

  // Génération des colonnes matrix pour l'effet de fond
  useEffect(() => {
    const columns = Array.from({ length: 20 }, (_, i) => i);
    setMatrixColumns(columns);
  }, []);

  // Simulation du chargement progressif
  useEffect(() => {
    const loadingSteps = [
      { progress: 20, message: 'Initialisation des systèmes Gamius...' },
      { progress: 40, message: 'Chargement de l\'environnement 3D...' },
      { progress: 60, message: 'Configuration de l\'interface holographique...' },
      { progress: 80, message: 'Connexion au réseau neural Gamius...' },
      { progress: 100, message: 'Expérience prête !' }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        setLoadingProgress(loadingSteps[currentStep].progress);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsLoading(false), 1000);
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  // Chargement du scénario français
  const fetchScenario = useCallback(async () => {
    try {
      const response = await fetch('/data/dialogues/gamius_cat_scenario_fr.json');
      if (response.ok) {
        const data = await response.json();
        setScenarioData(data);
      } else {
        console.error('Erreur de chargement du scénario:', response.status);
      }
    } catch (error) {
      console.error('Erreur de récupération du scénario:', error);
    }
  }, []);

  // Effet machine à écrire pour les dialogues
  const typewriterEffect = useCallback((text: string) => {
    setIsTyping(true);
    setShowChoices(false);
    setCurrentText('');
    
    let i = 0;
    const typing = setInterval(() => {
      if (i < text.length) {
        setCurrentText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
        setIsTyping(false);
        setShowChoices(true);
      }
    }, 50);

    return () => clearInterval(typing);
  }, []);

  // Déclenchement des animations 3D
  const triggerAnimation = useCallback((animationCue?: string) => {
    if (!animationCue) return;
    
    try {
      // Déclencher l'animation dans le composant R3F Scene3D
      setCurrentAnimation(animationCue);
      
      // Remettre à idle après l'animation
      setTimeout(() => {
        setCurrentAnimation('idle');
      }, 2000);
    } catch (error) {
      console.warn('Échec du déclenchement d\'animation:', error);
    }
  }, []);

  // Fonction pour gérer les choix avec son
  const handleChoice = useCallback(async (choice: any) => {
    // Jouer le son de miaulement
    await playMeowSound();
    
    // Animation de feedback
    const button = document.activeElement as HTMLElement;
    if (button) {
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = '';
      }, 150);
    }

    // Navigation selon le choix
    setCurrentNodeId(choice.nextNodeId);
    if (choice.animationTrigger) {
      triggerAnimation(choice.animationTrigger);
    }
  }, [playMeowSound, triggerAnimation]);

  // Gestion du clic sur le chat
  const handleCatClick = useCallback(() => {
    // Déclencher une animation d'excitation
    setCurrentAnimation('excited');
    
    // Remettre à idle après l'animation
    setTimeout(() => {
      setCurrentAnimation('idle');
    }, 2000);
  }, []);

  // Chargement initial
  useEffect(() => {
    fetchScenario();
  }, [fetchScenario]);

  // Déclenchement de l'effet typewriter
  useEffect(() => {
    if (currentNode?.text) {
      typewriterEffect(currentNode.text);
      if (currentNode.animationCue) {
        setTimeout(() => triggerAnimation(currentNode.animationCue), 500);
      }
    }
  }, [currentNode, typewriterEffect, triggerAnimation]);

  // Fonction pour sauter l'effet de frappe
  const skipTyping = useCallback(() => {
    if (isTyping && scenarioData && currentNodeId) {
      const fullText = scenarioData[currentNodeId].text;
      setCurrentText(fullText);
      setIsTyping(false);
      setShowChoices(true);
    }
  }, [isTyping, scenarioData, currentNodeId]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: immersiveStyles }} />
      
      <div className="immersive-world">
        {/* Animation de pluie matricielle */}
        <div className="matrix-rain"></div>
        
        {/* Container 3D pour la scène immersive */}
        <StreamingStudio3D animation={currentAnimation} onCatClick={handleCatClick} />
        
        {/* Écran de chargement premium */}
        {isLoading && (
          <div className="loading-screen">
            <SimpleLottie 
              options={{
                loop: true,
                autoplay: true,
              }} 
              height={200}
              width={200}
            />
            <div className="loading-text">
              Chargement de l'expérience Gamius...
            </div>
            <div className="progress-bar">
              <div style={{ width: `${loadingProgress}%` }} />
            </div>
            <div className="credit-text">
              Expérience faite et créée par GamiusGroup
            </div>
          </div>
        )}

        {/* Interface principale */}
        {!isLoading && (
          <>
            {/* HUD de statut */}
            <div className="status-hud">
              <div className="flex items-center space-x-3">
                <img 
                  src="/item_images/logo_filiale_rectangulaire/logo_gamius.png" 
                  alt="Gamius" 
                  className="h-10 w-auto"
                />
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-base text-white/90 font-semibold">Studio Actif</span>
              </div>
            </div>

            {/* Top navigation buttons */}
            <div className="top-buttons flex justify-between items-center w-full px-6">
              {/* Bouton de retour */}
              <Link href="/" className="back-button inline-flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                <span>Retour</span>
              </Link>

              {/* Visit gamiusgroup.com Button (desktop) */}
              <button
                onClick={() => window.open('https://gamiusgroup.com', '_blank', 'noopener,noreferrer')}
                className="visit-button hidden lg:inline-flex"
              >
                Visiter gamiusgroup.com
              </button>
            </div>

            {/* Scène 3D isométrique */}
            <div className="isometric-scene">
            </div>

            {/* Dialogue principal - Mobile responsive */}
            {currentNode && (
              <div className="dialogue-container" onClick={skipTyping}>
                {/* Compact visit button for mobile & overlay */}
                <button
                  onClick={(e) => { e.stopPropagation(); window.open('https://gamiusgroup.com','_blank','noopener,noreferrer'); }}
                  className="visit-dialog-button lg:hidden"
                >
                  Visiter gamiusgroup.com
                </button>
                <div className="dialogue-bubble">
                  <div className="dialogue-header">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 flex items-center justify-center text-lg sm:text-xl shadow-lg">
                        {currentNode.speaker === 'Gamius' ? (
                          <SimpleLottie options={{ loop: true, autoplay: true }} height={40} width={40} />
                        ) : (
                          '✨'
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-base sm:text-lg text-white">
                          {currentNode.speaker || 'Gamius'}
                        </div>
                        <div className="text-xs sm:text-sm text-purple-300 font-medium">
                          Créateur d'univers 
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="dialogue-content">
                    <p className="text-sm sm:text-base leading-relaxed text-white/95">
                      {currentText}
                      {isTyping && <span className="animate-pulse text-purple-400">|</span>}
                    </p>
                  </div>
                </div>

                {/* Choix de réponse - Mobile responsive */}
                {showChoices && currentNode.choices && (
                  <div className="choices-container space-y-3">
                    {currentNode.choices.map((choice, index) => (
                      <button
                        key={choice.id}
                        onClick={() => handleChoice(choice)}
                        className="choice-button group transform hover:scale-[1.02] transition-all duration-300"
                        style={{ 
                          animationDelay: `${index * 0.15}s`,
                          minHeight: '3.5rem',
                          fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)'
                        }}
                      >
                        <div className="flex items-center space-x-4 w-full px-2">
                          {choice.icon && (
                            <span className="text-xl sm:text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                              {choice.icon}
                            </span>
                          )}
                          <span className="text-left flex-1 leading-snug font-medium">
                            {choice.text}
                          </span>
                          <span className="text-sm sm:text-base opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                            →
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default GamiusCatImmersive;
