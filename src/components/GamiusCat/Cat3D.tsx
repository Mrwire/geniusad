'use client';

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

interface Cat3DProps {
  position?: [number, number, number];
  scale?: number;
  animation?: string;
  onClick?: () => void;
}

export function Cat3D({ position = [0, 0, 0], scale = 1, animation = 'idle', onClick }: Cat3DProps) {
  const meshRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  
  // Animation spring pour les mouvements
  const { rotation, positionY } = useSpring({
    rotation: animation === 'excited' ? [0, Math.PI * 2, 0] : [0, 0, 0],
    positionY: animation === 'jump' ? position[1] + 0.5 : position[1],
    config: { tension: 300, friction: 10 }
  });

  // Animation continue de respiration
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.02;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <animated.group
      ref={meshRef}
      position={[position[0], positionY, position[2]]}
      scale={scale}
      rotation={rotation}
      onClick={onClick}
    >
      {/* Corps du chat */}
      <mesh position={[0, 0.3, 0]}>
        <capsuleGeometry args={[0.3, 0.8, 4, 8]} />
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>

      {/* Tête */}
      <mesh position={[0, 0.9, 0.1]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>

      {/* Oreilles */}
      <mesh position={[-0.15, 1.15, 0.05]} rotation={[0, 0, -0.3]}>
        <coneGeometry args={[0.1, 0.2, 6]} />
        <meshStandardMaterial color="#ff5252" />
      </mesh>
      <mesh position={[0.15, 1.15, 0.05]} rotation={[0, 0, 0.3]}>
        <coneGeometry args={[0.1, 0.2, 6]} />
        <meshStandardMaterial color="#ff5252" />
      </mesh>

      {/* Yeux */}
      <mesh position={[-0.12, 0.95, 0.25]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#4ecdc4" emissive="#4ecdc4" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0.12, 0.95, 0.25]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#4ecdc4" emissive="#4ecdc4" emissiveIntensity={0.3} />
      </mesh>

      {/* Nez */}
      <mesh position={[0, 0.88, 0.32]}>
        <sphereGeometry args={[0.03, 6, 6]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* Queue */}
      <mesh position={[0, 0.4, -0.6]} rotation={[0.5, 0, 0]}>
        <capsuleGeometry args={[0.08, 0.6, 4, 8]} />
        <meshStandardMaterial color="#ff5252" />
      </mesh>

      {/* Pattes */}
      {[[-0.15, -0.3, 0.2], [0.15, -0.3, 0.2], [-0.15, -0.3, -0.2], [0.15, -0.3, -0.2]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <capsuleGeometry args={[0.06, 0.2, 4, 8]} />
          <meshStandardMaterial color="#ff5252" />
        </mesh>
      ))}

      {/* Effet de lumière holographique */}
      <pointLight
        position={[0, 1, 0]}
        color="#4ecdc4"
        intensity={0.5}
        distance={2}
      />
    </animated.group>
  );
}
