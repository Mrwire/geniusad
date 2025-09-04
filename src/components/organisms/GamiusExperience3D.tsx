'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Stars, 
  PerspectiveCamera, 
  OrbitControls, 
  Html,
  useProgress,
  Text
} from '@react-three/drei';
import * as THREE from 'three';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

// Composant de chargement 3D
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="w-64 h-2 bg-black/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gamius"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-white text-xl mt-4 font-bold">{progress.toFixed(0)}%</p>
      </div>
    </Html>
  );
}

// Composant de sol avec grille
function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#111" metalness={0.5} roughness={0.8} />
      <gridHelper args={[100, 100, "#444", "#222"]} position={[0, 0.01, 0]} />
    </mesh>
  );
}

// Composant pour créer un logo 3D flottant
function FloatingLogo({ position = [0, 2, -5] }) {
  const textRef = useRef();
  
  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.position.y += Math.sin(clock.getElapsedTime()) * 0.002;
      textRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.1;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <mesh ref={textRef} position={position} castShadow>
        <Text3D
          font="/fonts/helvetiker_bold.json"
          size={1.5}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelSegments={5}
        >
          GAMIUS
          <meshStandardMaterial 
            color="#9933FF"
            emissive="#3a0099"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </Text3D>
      </mesh>
    </Float>
  );
}

// Composant pour créer une particule
function Particle({ position, color = "#9933FF" }) {
  const meshRef = useRef();
  const [speed] = useState(() => 0.1 + Math.random() * 0.2);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed;
      meshRef.current.rotation.y += 0.02 * speed;
      meshRef.current.position.y += Math.sin(Date.now() * 0.001) * 0.01 * speed;
    }
  });

  return (
    <mesh ref={meshRef} position={position} castShadow>
      <tetrahedronGeometry args={[0.3 + Math.random() * 0.2, 0]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={0.5}
        metalness={0.8} 
        roughness={0.2}
      />
    </mesh>
  );
}

// Particules aléatoires 
function ParticleField({ count = 50, radius = 20 }) {
  const particles = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2;
    const r = radius * (0.3 + Math.random() * 0.7);
    return {
      id: i,
      position: [
        Math.cos(angle) * r,
        -1 + Math.random() * 5,
        Math.sin(angle) * r
      ],
      color: i % 3 === 0 ? "#9933FF" : i % 3 === 1 ? "#6600cc" : "#c066ff"
    };
  });

  return (
    <>
      {particles.map((particle) => (
        <Particle 
          key={particle.id} 
          position={particle.position} 
          color={particle.color} 
        />
      ))}
    </>
  );
}

// Personnage de jeu contrôlable
function GameCharacter({ position = [0, 0, 0], onLevelComplete }) {
  const meshRef = useRef();
  const [pos, setPos] = useState([...position]);
  const [rotation, setRotation] = useState(0);
  const [jumping, setJumping] = useState(false);
  const [jumpHeight, setJumpHeight] = useState(0);
  const jumpVelocity = useRef(0);
  const moveSpeed = 0.15;
  const [checkpoints, setCheckpoints] = useState([
    { position: [10, 0, 10], reached: false },
    { position: [-10, 0, -5], reached: false },
    { position: [15, 0, -15], reached: false }
  ]);
  
  // Gestion des contrôles clavier
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      
      if (key === 'w' || key === 'arrowup') {
        setPos((prev) => [prev[0], prev[1], prev[2] - moveSpeed]);
        setRotation(Math.PI);
      }
      if (key === 's' || key === 'arrowdown') {
        setPos((prev) => [prev[0], prev[1], prev[2] + moveSpeed]);
        setRotation(0);
      }
      if (key === 'a' || key === 'arrowleft') {
        setPos((prev) => [prev[0] - moveSpeed, prev[1], prev[2]]);
        setRotation(Math.PI / 2);
      }
      if (key === 'd' || key === 'arrowright') {
        setPos((prev) => [prev[0] + moveSpeed, prev[1], prev[2]]);
        setRotation(-Math.PI / 2);
      }
      if (key === ' ' && !jumping) {
        setJumping(true);
        jumpVelocity.current = 0.2;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [jumping]);

  // Gestion du saut
  useFrame(() => {
    if (jumping) {
      setJumpHeight((prev) => prev + jumpVelocity.current);
      jumpVelocity.current -= 0.01;
      
      if (jumpHeight <= 0) {
        setJumping(false);
        setJumpHeight(0);
        jumpVelocity.current = 0;
      }
    }
    
    // Vérification des checkpoints atteints
    checkpoints.forEach((checkpoint, index) => {
      if (!checkpoint.reached) {
        const distance = Math.sqrt(
          Math.pow(pos[0] - checkpoint.position[0], 2) +
          Math.pow(pos[2] - checkpoint.position[2], 2)
        );
        
        if (distance < 2) {
          const updatedCheckpoints = [...checkpoints];
          updatedCheckpoints[index].reached = true;
          setCheckpoints(updatedCheckpoints);
          
          // Vérifier si tous les checkpoints sont atteints
          if (updatedCheckpoints.every(cp => cp.reached)) {
            if (onLevelComplete) onLevelComplete();
          }
        }
      }
    });
  });

  return (
    <>
      {/* Personnage */}
      <mesh 
        ref={meshRef} 
        position={[pos[0], pos[1] + 0.5 + jumpHeight, pos[2]]} 
        rotation={[0, rotation, 0]}
        castShadow
      >
        <capsuleGeometry args={[0.5, 1, 4, 8]} />
        <meshStandardMaterial color="#9933FF" metalness={0.7} roughness={0.2} />
      </mesh>
      
      {/* Indicateurs de checkpoints */}
      {checkpoints.map((checkpoint, index) => (
        <mesh key={index} position={[...checkpoint.position]} receiveShadow>
          <cylinderGeometry args={[1, 1, 0.1, 32]} />
          <meshStandardMaterial 
            color={checkpoint.reached ? "#00ff44" : "#ff3366"} 
            emissive={checkpoint.reached ? "#00ff44" : "#ff3366"}
            emissiveIntensity={0.5}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </>
  );
}

// Scène principale
function Scene({ onGameComplete }) {
  const [levelComplete, setLevelComplete] = useState(false);
  const { camera } = useThree();
  
  const handleLevelComplete = () => {
    setLevelComplete(true);
    setTimeout(() => {
      if (onGameComplete) onGameComplete();
    }, 3000);
  };
  
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} castShadow />
      <directionalLight 
        position={[0, 10, 0]} 
        intensity={1.5} 
        castShadow 
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      
      {/* Environnement */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0.5} fade speed={1} />
      <Floor />
      <ParticleField count={100} radius={30} />
      <FloatingLogo position={[0, 5, -15]} />
      
      {/* Personnage jouable */}
      <GameCharacter position={[0, 0, 0]} onLevelComplete={handleLevelComplete} />
      
      {/* Interface de victoire */}
      {levelComplete && (
        <Html center>
          <div className="bg-black/80 backdrop-blur-md p-8 rounded-lg text-center">
            <h2 className="text-3xl font-bold text-gamius mb-4">Niveau Complété!</h2>
            <p className="text-white mb-6">Vous avez exploré l'univers Gamius avec succès!</p>
            <div className="flex justify-center">
              <button 
                className="bg-gamius text-white px-6 py-3 rounded-md font-bold"
                onClick={onGameComplete}
              >
                Continuer
              </button>
            </div>
          </div>
        </Html>
      )}
    </>
  );
}

// Composant principal
export default function GamiusExperience3D({ onComplete, redirectUrl }) {
  const { locale } = useParams();
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  
  const handleStartGame = () => {
    setGameStarted(true);
  };
  
  const handleGameComplete = () => {
    setGameCompleted(true);
    setTimeout(() => {
      if (onComplete) onComplete();
      else window.location.href = redirectUrl || 'https://gamiusgroup.ma';
    }, 2000);
  };
  
  return (
    <div className="w-full h-[calc(100vh-5rem)]">
      {!gameStarted ? (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/90">
          <div className="max-w-md p-8 bg-black/60 backdrop-blur-md rounded-lg text-center">
            <h2 className="text-4xl font-bold text-gamius mb-6">
              {locale === 'fr' ? 'L\'Univers Gamius' : 'Gamius Universe'}
            </h2>
            <p className="text-white mb-8">
              {locale === 'fr' 
                ? 'Explorez l\'univers interactif de Gamius. Atteignez les trois points de contrôle pour découvrir notre histoire.'
                : 'Explore the interactive Gamius universe. Reach the three checkpoints to discover our story.'}
            </p>
            
            <div className="flex flex-col gap-4">
              <Button 
                onClick={handleStartGame} 
                className="bg-gamius hover:bg-gamius/80 text-white px-8 py-6 text-lg rounded-md"
              >
                {locale === 'fr' ? 'Commencer l\'aventure' : 'Start the adventure'}
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => setShowInstructions(true)}
                className="border-gamius text-gamius hover:bg-gamius/10"
              >
                {locale === 'fr' ? 'Comment jouer' : 'How to play'}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
      
      {/* Modal d'instructions */}
      <AnimatePresence>
        {showInstructions && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="max-w-md p-8 bg-black/90 backdrop-blur-md rounded-lg text-center"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h3 className="text-2xl font-bold text-gamius mb-4">
                {locale === 'fr' ? 'Comment jouer' : 'How to play'}
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/10 p-3 rounded-md">
                  <p className="text-white font-bold mb-2">WASD / Flèches</p>
                  <p className="text-gray-300 text-sm">
                    {locale === 'fr' ? 'Se déplacer' : 'Movement'}
                  </p>
                </div>
                <div className="bg-white/10 p-3 rounded-md">
                  <p className="text-white font-bold mb-2">Espace</p>
                  <p className="text-gray-300 text-sm">
                    {locale === 'fr' ? 'Sauter' : 'Jump'}
                  </p>
                </div>
              </div>
              <p className="text-white mb-6">
                {locale === 'fr' 
                  ? 'Atteignez les trois points lumineux rouges pour terminer le niveau.'
                  : 'Reach all three red glowing points to complete the level.'}
              </p>
              <Button 
                onClick={() => setShowInstructions(false)}
                className="bg-gamius hover:bg-gamius/80 text-white"
              >
                {locale === 'fr' ? 'Compris !' : 'Got it!'}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Écran de redirection */}
      <AnimatePresence>
        {gameCompleted && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gamius mb-6">
                {locale === 'fr' ? 'Redirection...' : 'Redirecting...'}
              </h2>
              <div className="w-16 h-16 border-4 border-gamius border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Scène 3D */}
      <Canvas shadows dpr={[1, 2]} style={{ background: 'black' }}>
        <PerspectiveCamera makeDefault position={[0, 5, 15]} fov={60} />
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 - 0.1}
          minPolarAngle={Math.PI / 6}
        />
        <fog attach="fog" args={['#000', 10, 50]} />
        <Suspense fallback={<Loader />}>
          <Scene onGameComplete={handleGameComplete} />
        </Suspense>
      </Canvas>
    </div>
  );
}
