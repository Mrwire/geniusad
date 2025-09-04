'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Script from 'next/script';
import { safeLocalStorage, safeSessionStorage } from '@/utils/safeStorage';
import { initGlobalErrorHandlers } from '@/utils/errorHandler';
import ErrorBoundary from '@/components/ErrorBoundary';

// Enhanced CSS for animations and styling
const gamiusCatStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
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
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 5px rgba(234, 0, 255, 0.3); }
    50% { box-shadow: 0 0 20px rgba(234, 0, 255, 0.6); }
  }
  @keyframes shimmer {
    0% { background-position: -200px 0; }
    100% { background-position: 200px 0; }
  }
  
  .gamius-container {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    min-height: 100vh;
    transition: all 0.3s ease;
  }
  
  .gamius-dialogue {
    animation: fadeIn 0.6s ease-out;
    backdrop-filter: blur(10px);
    background: rgba(17, 24, 39, 0.8);
    border: 1px solid rgba(234, 0, 255, 0.2);
  }
  
  .gamius-choice {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background: linear-gradient(135deg, rgba(55, 65, 81, 0.8) 0%, rgba(75, 85, 99, 0.6) 100%);
    border: 1px solid rgba(156, 163, 175, 0.2);
  }
  
  .gamius-choice:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 8px 25px rgba(234, 0, 255, 0.15);
    border-color: rgba(234, 0, 255, 0.5);
    background: linear-gradient(135deg, rgba(75, 85, 99, 0.9) 0%, rgba(107, 114, 128, 0.7) 100%);
  }
  
  .gamius-choice:active {
    transform: translateY(-1px) scale(1.01);
  }
  
  .gamius-speaker-badge {
    animation: pulse 2s infinite, glow 3s infinite;
    position: relative;
    overflow: hidden;
  }
  
  .gamius-speaker-badge::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    animation: shimmer 2s infinite;
  }
  
  .choices-container button {
    animation: fadeIn 0.5s ease-out, slideUp 0.5s ease-out;
    animation-fill-mode: both;
  }
  
  .choices-container button:nth-child(1) { animation-delay: 0.1s; }
  .choices-container button:nth-child(2) { animation-delay: 0.2s; }
  .choices-container button:nth-child(3) { animation-delay: 0.3s; }
  .choices-container button:nth-child(4) { animation-delay: 0.4s; }
  
  .loading-spinner {
    border: 3px solid rgba(234, 0, 255, 0.1);
    border-top: 3px solid #ea00ff;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .scene-container {
    background: radial-gradient(circle at center, rgba(234, 0, 255, 0.05) 0%, transparent 70%);
    border: 1px solid rgba(234, 0, 255, 0.1);
    border-radius: 12px;
    overflow: hidden;
    position: relative;
  }
  
  .scene-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 49%, rgba(234, 0, 255, 0.03) 50%, transparent 51%);
    pointer-events: none;
    z-index: 1;
  }
  
  .animation-feedback {
    background: linear-gradient(90deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
    border-left: 4px solid #3b82f6;
    animation: fadeIn 0.3s ease-out;
  }
  
  .dialogue-text {
    line-height: 1.6;
    color: rgba(243, 244, 246, 0.95);
  }
  
  .status-indicator {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 8px;
    animation: pulse 2s infinite;
  }
  
  .status-loading { background-color: #fbbf24; }
  .status-connected { background-color: #10b981; }
  .status-error { background-color: #ef4444; }
`;

// Enhanced type definitions
interface Choice {
  id: string;
  text: string;
  nextNodeId: string;
  icon?: string;
  disabled?: boolean;
  animationTrigger?: string;
}

interface DialogueNode {
  id: string;
  speaker?: 'Gamius' | 'System' | 'User';
  text: string;
  choices?: Choice[];
  animationCue?: string;
  imageSrc?: string;
  isEnding?: boolean;
  mood?: 'neutral' | 'excited' | 'confused' | 'thinking' | 'mysterious';
  delay?: number;
}

interface GamiusCatInterfaceProps {
  lang?: string;
  theme?: 'dark' | 'light' | 'auto';
  enableDebugMode?: boolean;
  onAnimationTrigger?: (animationName: string) => void;
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    initGamius3DEngine?: (containerId: string) => void;
    triggerGamiusAnimation?: (animationName: string) => void;
    cleanupGamius3DEngine?: () => void;
  }
}

const GamiusCatInterface: React.FC<GamiusCatInterfaceProps> = ({ 
  lang = 'en', 
  theme = 'dark',
  enableDebugMode = false,
  onAnimationTrigger 
}) => {
  // Initialize global error handlers
  useEffect(() => {
    initGlobalErrorHandlers();
  }, []);

  // Enhanced state management
  const [scenarioData, setScenarioData] = useState<DialogueNode[] | null>(null);
  const [currentNodeId, setCurrentNodeId] = useState<string>('start');
  const [isLoadingScenario, setIsLoadingScenario] = useState<boolean>(true);
  const [scenarioError, setScenarioError] = useState<Error | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [animationFeedback, setAnimationFeedback] = useState<string>('');
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);
  const [engineInitialized, setEngineInitialized] = useState<boolean>(false);
  const [connectionStatus, setConnectionStatus] = useState<'loading' | 'connected' | 'error'>('loading');
  const [animationHistory, setAnimationHistory] = useState<string[]>([]);
  const [userPreferences, setUserPreferences] = useState<any>({});

  // Find current dialogue node with enhanced caching
  const currentNode = useMemo(() => {
    if (!scenarioData) return null;
    return scenarioData.find(node => node.id === currentNodeId) || null;
  }, [scenarioData, currentNodeId]);

  // Enhanced animation trigger function with better error handling
  const triggerAnimation = useCallback((animationCue: string | undefined) => {
    if (!animationCue) return;
    
    setIsAnimating(true);
    setAnimationFeedback(`🎭 Triggering: ${animationCue}`);
    
    // Add to animation history
    setAnimationHistory(prev => [...prev.slice(-4), animationCue]);
    
    const tryTrigger = (attempt = 1) => {
      if (attempt > 5) {
        setAnimationFeedback(`❌ Failed to trigger "${animationCue}" after ${attempt - 1} attempts`);
        setIsAnimating(false);
        return;
      }
      
      try {
        if (window.triggerGamiusAnimation) {
          window.triggerGamiusAnimation(animationCue);
          setAnimationFeedback(`✅ Animation "${animationCue}" triggered successfully!`);
          setConnectionStatus('connected');
          
          // Call external callback if provided
          onAnimationTrigger?.(animationCue);
          
          setTimeout(() => {
            setIsAnimating(false);
            setAnimationFeedback('');
          }, 2000);
        } else {
          setTimeout(() => tryTrigger(attempt + 1), 500);
          setAnimationFeedback(`🔄 Attempt ${attempt}/5: Waiting for 3D engine...`);
        }
      } catch (error) {
        console.error(`[GamiusCat] Animation trigger error:`, error);
        setAnimationFeedback(`❌ Error: ${error}`);
        setConnectionStatus('error');
        setTimeout(() => tryTrigger(attempt + 1), 1000);
      }
    };
    
    tryTrigger();
  }, [onAnimationTrigger]);

  // Enhanced scenario fetching with better error handling
  const fetchScenario = useCallback(async () => {
    setIsLoadingScenario(true);
    setScenarioError(null);
    
    try {
      const response = await fetch(`/api/dialogue-scenario?lang=${lang}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('Invalid or empty scenario data received');
      }
      
      setScenarioData(data);
      setConnectionStatus('connected');
      
      // Save to storage for offline access
      try {
        safeLocalStorage.setItem('gamius-scenario-cache', JSON.stringify(data));
      } catch (storageError) {
        console.warn('[GamiusCat] Could not cache scenario data:', storageError);
      }
      
    } catch (error) {
      console.error('[GamiusCat] Error fetching scenario:', error);
      setScenarioError(error as Error);
      setConnectionStatus('error');
      
      // Try to load from cache
      try {
        const cachedData = safeLocalStorage.getItem('gamius-scenario-cache');
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setScenarioData(parsedData);
          setAnimationFeedback('📦 Using cached scenario data');
        }
      } catch (cacheError) {
        console.warn('[GamiusCat] Could not load cached data:', cacheError);
      }
    } finally {
      setIsLoadingScenario(false);
    }
  }, [lang]);

  // Enhanced choice selection with animation support
  const handleChoiceSelect = useCallback((nextNodeId: string, choice?: Choice) => {
    if (choice?.disabled) return;
    
    setCurrentNodeId(nextNodeId);
    
    // Trigger choice-specific animation if provided
    if (choice?.animationTrigger) {
      triggerAnimation(choice.animationTrigger);
    }
    
    // Save user choice for analytics
    try {
      const choices = safeSessionStorage.getItem('gamius-user-choices') || '[]';
      const choiceHistory = JSON.parse(choices);
      choiceHistory.push({
        nodeId: currentNodeId,
        choiceId: choice?.id,
        timestamp: Date.now()
      });
      safeSessionStorage.setItem('gamius-user-choices', JSON.stringify(choiceHistory));
    } catch (error) {
      console.warn('[GamiusCat] Could not save choice history:', error);
    }
  }, [currentNodeId, triggerAnimation]);

  // Load scenario data on mount
  useEffect(() => {
    fetchScenario();
  }, [fetchScenario]);

  // Trigger animations when dialogue node changes
  useEffect(() => {
    if (currentNode?.animationCue) {
      // Add delay if specified
      const delay = currentNode.delay || 300;
      const timer = setTimeout(() => {
        triggerAnimation(currentNode.animationCue);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [currentNode, triggerAnimation]);

  // Handle script loading
  const handleScriptLoad = useCallback(() => {
    console.log('[GamiusCat] 3D script loaded successfully');
    setScriptLoaded(true);
    
    // Try to initialize the engine
    const initEngine = () => {
      if (window.initGamius3DEngine) {
        try {
          window.initGamius3DEngine('gamius-3d-container');
          setEngineInitialized(true);
          setConnectionStatus('connected');
          console.log('[GamiusCat] 3D engine initialized');
        } catch (error) {
          console.error('[GamiusCat] Engine initialization failed:', error);
          setConnectionStatus('error');
        }
      }
    };
    
    // Small delay to ensure DOM is ready
    setTimeout(initEngine, 100);
  }, []);

  const handleScriptError = useCallback((error: any) => {
    console.error('[GamiusCat] Script loading failed:', error);
    setConnectionStatus('error');
    setAnimationFeedback('❌ Failed to load 3D engine');
  }, []);

  return (
    <ErrorBoundary>
      <style dangerouslySetInnerHTML={{ __html: gamiusCatStyles }} />
      
      {/* Load the 3D script */}
      <Script
        src="/js/gamius-chat-3d.js"
        onLoad={handleScriptLoad}
        onError={handleScriptError}
        strategy="afterInteractive"
      />
      
      <div className="gamius-container flex flex-col md:flex-row h-screen">
        {/* Enhanced 3D Scene Area */}
        <div className="scene-container w-full md:w-1/2 h-1/2 md:h-full relative flex items-center justify-center">
          <div
            id="gamius-3d-container"
            className="w-full h-full relative"
            style={{ minHeight: '400px' }}
          >
            {/* Enhanced loading states */}
            {!scriptLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80 backdrop-blur-sm">
                <div className="loading-spinner w-16 h-16 rounded-full mb-4"></div>
                <p className="text-purple-300 text-lg font-medium">Loading 3D Engine...</p>
                <p className="text-gray-400 text-sm mt-2">Please wait while we prepare Gamius</p>
              </div>
            )}
            
            {scriptLoaded && !engineInitialized && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80 backdrop-blur-sm">
                <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-yellow-300 text-lg font-medium">Initializing 3D Scene...</p>
              </div>
            )}
            
            {/* Connection status indicator */}
            <div className="absolute top-4 right-4 z-10">
              <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
                <div className={`status-indicator status-${connectionStatus}`}></div>
                <span className="text-white text-sm capitalize">{connectionStatus}</span>
              </div>
            </div>
            
            {/* Animation history (debug mode) */}
            {enableDebugMode && animationHistory.length > 0 && (
              <div className="absolute bottom-4 left-4 z-10 bg-black/70 backdrop-blur-sm rounded-lg p-3 max-w-xs">
                <h4 className="text-white text-sm font-bold mb-2">Recent Animations:</h4>
                <div className="space-y-1">
                  {animationHistory.slice(-3).map((anim, idx) => (
                    <div key={idx} className="text-purple-300 text-xs">{anim}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Enhanced Dialogue and Interaction Area */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full p-6 overflow-y-auto flex flex-col justify-between bg-gradient-to-br from-gray-900 to-gray-800">
          <div className="flex-1">
            {/* Enhanced Animation Feedback */}
            {isAnimating && animationFeedback && (
              <div className="animation-feedback p-4 mb-4 rounded-lg text-blue-100 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>{animationFeedback}</span>
                </div>
              </div>
            )}
            
            {/* Enhanced Loading State */}
            {isLoadingScenario && (
              <div className="text-center py-12">
                <div className="loading-spinner w-16 h-16 mx-auto mb-6 rounded-full"></div>
                <h3 className="text-purple-300 text-xl font-bold mb-2">Loading Dialogue Scenario</h3>
                <p className="text-gray-400">Preparing your conversation with Gamius...</p>
              </div>
            )}
            
            {/* Enhanced Error State */}
            {scenarioError && !isLoadingScenario && (
              <div className="bg-gradient-to-r from-red-900 to-red-800 text-white p-6 rounded-lg border border-red-700">
                <h3 className="text-2xl font-bold mb-3 flex items-center">
                  <span className="mr-2">⚠️</span>
                  Error Loading Dialogue
                </h3>
                <p className="mb-4 text-red-100">{scenarioError.message}</p>
                <div className="flex space-x-3">
                  <button 
                    onClick={fetchScenario} 
                    className="px-6 py-3 bg-red-700 hover:bg-red-600 rounded-lg transition-colors font-medium"
                  >
                    🔄 Retry
                  </button>
                  <button 
                    onClick={() => setCurrentNodeId('start')} 
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors font-medium"
                  >
                    🏠 Reset
                  </button>
                </div>
              </div>
            )}
            
            {/* Enhanced Dialogue Display */}
            {!isLoadingScenario && !scenarioError && currentNode && (
              <div className="gamius-dialogue p-6 rounded-xl mb-6 shadow-lg">
                {/* Enhanced Speaker Badge */}
                {currentNode.speaker && (
                  <div className={`
                    gamius-speaker-badge inline-flex items-center px-4 py-2 rounded-full text-sm font-bold mb-4
                    ${currentNode.speaker === 'Gamius' ? 'bg-gradient-to-r from-purple-700 to-purple-600 text-white' : 
                      currentNode.speaker === 'System' ? 'bg-gradient-to-r from-blue-700 to-blue-600 text-white' : 
                      'bg-gradient-to-r from-green-700 to-green-600 text-white'}
                  `}>
                    <span className="mr-2">
                      {currentNode.speaker === 'Gamius' ? '🐱' : 
                       currentNode.speaker === 'System' ? '⚙️' : '👤'}
                    </span>
                    {currentNode.speaker}
                    {currentNode.mood && (
                      <span className="ml-2 text-xs opacity-75">
                        {currentNode.mood === 'excited' ? '✨' :
                         currentNode.mood === 'confused' ? '❓' :
                         currentNode.mood === 'thinking' ? '🤔' :
                         currentNode.mood === 'mysterious' ? '🌟' : '😊'}
                      </span>
                    )}
                  </div>
                )}
                
                {/* Enhanced Dialogue Text */}
                <div className="dialogue-text text-lg leading-relaxed">
                  {currentNode.text}
                </div>
                
                {/* Image Display */}
                {currentNode.imageSrc && (
                  <div className="mt-6">
                    <img 
                      src={currentNode.imageSrc} 
                      alt="Dialogue illustration" 
                      className="rounded-xl max-w-full h-auto shadow-lg border border-purple-500/20"
                    />
                  </div>
                )}
              </div>
            )}
            
            {/* Enhanced User Choices */}
            {!isLoadingScenario && !scenarioError && currentNode?.choices && currentNode.choices.length > 0 && (
              <div className="choices-container space-y-3">
                <h4 className="text-lg font-semibold text-purple-300 mb-4">Choose your response:</h4>
                {currentNode.choices.map((choice) => (
                  <button
                    key={choice.id}
                    onClick={() => handleChoiceSelect(choice.nextNodeId, choice)}
                    disabled={choice.disabled}
                    className={`
                      gamius-choice w-full text-left px-6 py-4 rounded-xl transition-all duration-300 font-medium
                      ${choice.disabled 
                        ? 'opacity-50 cursor-not-allowed bg-gray-800' 
                        : 'hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        {choice.icon && <span className="mr-3 text-lg">{choice.icon}</span>}
                        {choice.text}
                      </span>
                      {choice.animationTrigger && (
                        <span className="text-purple-400 text-sm">✨</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
            
            {/* Enhanced Ending State */}
            {!isLoadingScenario && !scenarioError && currentNode?.isEnding && (
              <div className="mt-8 text-center bg-gradient-to-r from-purple-900/50 to-blue-900/50 p-6 rounded-xl border border-purple-500/30">
                <h3 className="text-yellow-300 text-xl font-bold mb-3">🎭 Scene Complete</h3>
                <p className="text-gray-300 mb-4">This dialogue section has ended.</p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => setCurrentNodeId('start')}
                    className="px-6 py-3 bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 text-white rounded-lg transition-all duration-300 font-medium shadow-lg"
                  >
                    🔄 Restart Conversation
                  </button>
                  {enableDebugMode && (
                    <button
                      onClick={() => triggerAnimation('color_change_rainbow')}
                      className="px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white rounded-lg transition-all duration-300 font-medium shadow-lg"
                    >
                      🌈 Celebration
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default GamiusCatInterface;
