'use client';

import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Sparkles, Stars } from '@react-three/drei';
import { Cat3D } from './Cat3D';
import * as THREE from 'three';

interface Scene3DProps {
  animation?: string;
  onCatClick?: () => void;
}

function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const particleCount = 100;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#4ecdc4" size={0.02} sizeAttenuation transparent opacity={0.6} />
    </points>
  );
}

function IsometricEnvironment() {
  return (
    <group>
      {/* Sol holographique */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[8, 8, 20, 20]} />
        <meshStandardMaterial
          color="#1a1a2e"
          transparent
          opacity={0.8}
          wireframe
        />
      </mesh>

      {/* Plateforme pour le chat */}
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.1, 16]} />
        <meshStandardMaterial
          color="#4ecdc4"
          emissive="#4ecdc4"
          emissiveIntensity={0.2}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Colonnes holographiques */}
      {[
        [-3, 0, -3],
        [3, 0, -3],
        [-3, 0, 3],
        [3, 0, 3]
      ].map((position, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={position as [number, number, number]}>
            <boxGeometry args={[0.2, 3, 0.2]} />
            <meshStandardMaterial
              color="#ff6b6b"
              emissive="#ff6b6b"
              emissiveIntensity={0.3}
              transparent
              opacity={0.6}
            />
          </mesh>
        </Float>
      ))}

      {/* Texte 3D Gamius */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh position={[0, 2, -2]}>
          <boxGeometry args={[2, 0.5, 0.1]} />
          <meshStandardMaterial
            color="#4ecdc4"
            emissive="#4ecdc4"
            emissiveIntensity={0.4}
            transparent
            opacity={0.8}
          />
        </mesh>
      </Float>
    </group>
  );
}

function Scene3DContent({ animation, onCatClick }: Scene3DProps) {
  return (
    <>
      {/* Éclairage */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -5]} color="#4ecdc4" intensity={0.5} />
      <spotLight
        position={[0, 5, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#ff6b6b"
      />

      {/* Environnement */}
      <Environment preset="night" />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      {/* Environnement isométrique */}
      <IsometricEnvironment />

      {/* Chat 3D principal */}
      <Cat3D
        position={[0, -0.3, 0]}
        scale={1.5}
        animation={animation}
        onClick={onCatClick}
      />

      {/* Particules flottantes */}
      <FloatingParticles />

      {/* Effets de scintillement */}
      <Sparkles
        count={100}
        scale={10}
        size={3}
        speed={0.5}
        color="#4ecdc4"
      />

      {/* Contrôles de caméra */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        maxPolarAngle={Math.PI / 2}
        minDistance={3}
        maxDistance={10}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

export function Scene3D({ animation = 'idle', onCatClick }: Scene3DProps) {
  return (
    <div className="w-full h-full bg-black">
      <Canvas
        camera={{
          position: [8, 6, 8],
          fov: 45,
          near: 0.1,
          far: 1000
        }}
        shadows
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <Scene3DContent animation={animation} onCatClick={onCatClick} />
        </Suspense>
      </Canvas>
    </div>
  );
}
