'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Script from 'next/script';
import { safeLocalStorage, safeSessionStorage } from '@/utils/safeStorage';
import { initGlobalErrorHandlers } from '@/utils/errorHandler';
import ErrorBoundary from '@/components/ErrorBoundary';

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
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  .gamius-dialogue {
    animation: fadeIn 0.5s ease-out, slideUp 0.5s ease-out;
  }
  .gamius-choice {
    transition: all 0.2s ease;
  }
  .gamius-choice:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .gamius-speaker-badge {
    animation: pulse 2s infinite;
  }
  .choices-container button {
    animation: fadeIn 0.5s ease-out, slideUp 0.5s ease-out;
    animation-fill-mode: both;
  }
  
  .choices-container button:nth-child(1) { animation-delay: 0.1s; }
  .choices-container button:nth-child(2) { animation-delay: 0.2s; }
  .choices-container button:nth-child(3) { animation-delay: 0.3s; }
  .choices-container button:nth-child(4) { animation-delay: 0.4s; }
`;

// Extend Window interface for TypeScript to recognize 3D script functions
declare global {
  interface Window {
    initGamius3DEngine?: (containerId: string) => void;
    triggerGamiusAnimation?: (animationName: string) => void;
  }
}

// Type definitions for the dialogue scenario
interface Choice {
  id: string;
  text: string; // Text displayed on the choice button
  nextNodeId: string; // ID of the next dialogue node
}

interface DialogueNode {
  id: string;
  speaker?: 'Gamius' | 'System' | 'User'; // Optional, for different styling
  text: string; // The dialogue text
  choices?: Choice[]; // Available choices from this node
  animationCue?: string; // To link to animations later
  imageSrc?: string; // Path to image to display for this node
  isEnding?: boolean; // If this is a final node
}

interface GamiusCatInterfaceProps {
  lang?: string;
}

const GamiusCatInterface: React.FC<GamiusCatInterfaceProps> = ({ lang = 'en' }) => {
  // Initialize global error handlers to catch storage access errors
  useEffect(() => {
    initGlobalErrorHandlers();
  }, []);

  // State management for the dialogue scenario
  const [scenarioData, setScenarioData] = useState<DialogueNode[] | null>(null);
  const [currentNodeId, setCurrentNodeId] = useState<string>('start');
  const [isLoadingScenario, setIsLoadingScenario] = useState<boolean>(true);
  const [scenarioError, setScenarioError] = useState<Error | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [animationFeedback, setAnimationFeedback] = useState<string>('');
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);
  const [engineInitialized, setEngineInitialized] = useState<boolean>(false);

  // Find the current dialogue node based on currentNodeId
  const currentNode = useMemo(() => {
    if (!scenarioData) return null;
    return scenarioData.find(node => node.id === currentNodeId) || null;
  }, [scenarioData, currentNodeId]);

  // Function to trigger animations with retry logic and visual feedback
  const triggerAnimation = useCallback((animationCue: string | undefined) => {
    if (!animationCue) return;
    
    setIsAnimating(true);
    setAnimationFeedback(`Triggering animation: ${animationCue}...`);
    
    // Try to trigger the animation
    const tryTrigger = (attempt = 1) => {
      if (attempt > 3) {
        setAnimationFeedback(`Failed to trigger animation after ${attempt - 1} attempts.`);
        setIsAnimating(false);
        return;
      }
      
      try {
        if (window.triggerGamiusAnimation) {
          window.triggerGamiusAnimation(animationCue);
          setAnimationFeedback(`Animation triggered: ${animationCue}`);
          setTimeout(() => {
            setIsAnimating(false);
            setAnimationFeedback('');
          }, 1000);
        } else {
          setAnimationFeedback(`Animation engine not ready (attempt ${attempt}). Retrying...`);
          setTimeout(() => tryTrigger(attempt + 1), 500);
        }
      } catch (error) {
        setAnimationFeedback(`Error triggering animation: ${(error as Error).message}`);
        setTimeout(() => tryTrigger(attempt + 1), 500);
      }
    };
    
    tryTrigger();
  }, []);

  // Trigger animation when current node changes
  useEffect(() => {
    if (currentNode?.animationCue) {
      triggerAnimation(currentNode.animationCue);
    }
  }, [currentNode, triggerAnimation]);

  // Initialize 3D engine when script is loaded
  const handleScriptLoad = useCallback(() => {
    setScriptLoaded(true);
    try {
      if (window.initGamius3DEngine) {
        window.initGamius3DEngine('gamius-3d-container');
        setEngineInitialized(true);
      }
    } catch (error) {
      console.error('Failed to initialize 3D engine:', error);
    }
  }, []);

  // Fetch dialogue scenario data
  const fetchScenario = useCallback(async () => {
    setIsLoadingScenario(true);
    try {
      // Try to fetch scenario in the specified language
      let response = await fetch(`/data/dialogues/${lang}.json`);
      
      // If not found, fall back to French
      if (!response.ok && lang !== 'fr') {
        console.warn(`Dialogue scenario not found for language: ${lang}, falling back to French`);
        response = await fetch('/data/dialogues/fr.json');
      }
      
      // If still not found, try English
      if (!response.ok && lang !== 'en') {
        console.warn('Falling back to English dialogue scenario');
        response = await fetch('/data/dialogues/en.json');
      }
      
      // If all attempts failed, throw an error
      if (!response.ok) {
        throw new Error(`Failed to load dialogue scenario for any language`);
      }
      
      const data = await response.json();
      setScenarioData(data);
      setCurrentNodeId('start');
      setIsLoadingScenario(false);
    } catch (error) {
      console.error('Error fetching dialogue scenario:', error);
      setScenarioError(error as Error);
      setIsLoadingScenario(false);
    }
  }, [lang]);

  // Load scenario data on component mount
  useEffect(() => {
    fetchScenario();
  }, [fetchScenario]);

  // Handle user choice selection
  const handleChoiceSelect = useCallback((nextNodeId: string) => {
    setCurrentNodeId(nextNodeId);
  }, []);

  // Render the component
  return (
    <ErrorBoundary fallback={<div className="p-4 text-red-500">Something went wrong with the Gamius Cat interface.</div>}>
      <style dangerouslySetInnerHTML={{ __html: gamiusCatStyles }} />
      
      {/* Load the 3D animation engine script */}
      <Script
        src="/scripts/gamius-chat-3d.js"
        strategy="lazyOnload"
        onLoad={handleScriptLoad}
        onError={() => console.error('Failed to load Gamius 3D script')}
      />
      
      <div className="gamius-cat-interface bg-gray-900 text-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col h-full">
          {/* 3D Animation Container */}
          <div 
            id="gamius-3d-container" 
            className="w-full h-64 bg-gray-800 rounded-lg mb-4 flex items-center justify-center"
          >
            {!scriptLoaded && (
              <div className="text-center">
                <p className="text-gray-400">Loading 3D engine...</p>
                <div className="mt-2 w-12 h-12 border-t-2 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
              </div>
            )}
            {scriptLoaded && !engineInitialized && (
              <div className="text-center text-yellow-400">
                <p>3D engine loaded but not initialized.</p>
              </div>
            )}
          </div>
          
          {/* Animation Debug Info */}
          {isAnimating && (
            <div className="bg-gray-800 p-2 mb-4 rounded text-sm text-blue-300">
              {animationFeedback}
            </div>
          )}
          
          {/* Loading State */}
          {isLoadingScenario && (
            <div className="text-center py-8">
              <div className="w-12 h-12 border-t-2 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-blue-300">Loading dialogue scenario...</p>
            </div>
          )}
          
          {/* Error State */}
          {scenarioError && (
            <div className="bg-red-900 text-white p-4 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Error Loading Dialogue</h3>
              <p>{scenarioError.message}</p>
              <button 
                onClick={() => fetchScenario()} 
                className="mt-4 px-4 py-2 bg-red-700 hover:bg-red-600 rounded"
              >
                Retry
              </button>
            </div>
          )}
          
          {/* Dialogue Display */}
          {!isLoadingScenario && !scenarioError && currentNode && (
            <div className="gamius-dialogue bg-gray-800 p-4 rounded-lg mb-4">
              {/* Speaker Badge */}
              {currentNode.speaker && (
                <div className={`
                  gamius-speaker-badge inline-block px-3 py-1 rounded-full text-sm font-bold mb-2
                  ${currentNode.speaker === 'Gamius' ? 'bg-purple-700 text-white' : 
                    currentNode.speaker === 'System' ? 'bg-blue-700 text-white' : 
                    'bg-green-700 text-white'}
                `}>
                  {currentNode.speaker}
                </div>
              )}
              
              {/* Dialogue Text */}
              <p className="text-lg">{currentNode.text}</p>
              
              {/* Image if present */}
              {currentNode.imageSrc && (
                <div className="mt-4">
                  <img 
                    src={currentNode.imageSrc} 
                    alt="Dialogue illustration" 
                    className="rounded-lg max-w-full h-auto"
                  />
                </div>
              )}
            </div>
          )}
          
          {/* User Choices */}
          {!isLoadingScenario && !scenarioError && currentNode?.choices && currentNode.choices.length > 0 && (
            <div className="choices-container mt-4 space-y-2">
              {currentNode.choices.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => handleChoiceSelect(choice.nextNodeId)}
                  className="gamius-choice w-full text-left px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  {choice.text}
                </button>
              ))}
            </div>
          )}
          
          {/* Ending indicator */}
          {!isLoadingScenario && !scenarioError && currentNode?.isEnding && (
            <div className="mt-6 text-center">
              <p className="text-yellow-400 mb-2">End of this dialogue section</p>
              <button
                onClick={() => setCurrentNodeId('start')}
                className="px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded transition-colors"
              >
                Restart
              </button>
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default GamiusCatInterface;
