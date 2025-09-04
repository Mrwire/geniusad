'use client';

import { Suspense, useRef, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF, Text, Plane, useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface StreamingStudio3DProps {
  animation?: string;
  onCatClick?: () => void;
}

// Composant pour charger et afficher le chat GLB avec texture et animations
function CatModel({ animation, onClick }: { animation?: string; onClick?: () => void }) {
  const gltf = useGLTF('/item_images/toon_cat_free.glb');
  // On utilise les matériaux intégrés du GLB (pas d'override texture)
  const texture: null = null;
  const catRef = useRef<THREE.Group>(null);
  const [loadError, setLoadError] = useState(false);
  const [hasLogged, setHasLogged] = useState(false);
  // Échelle dynamique réglable via console - valeur par défaut ajustée selon la nouvelle capture
  const [catScale, setCatScale] = useState(0.0040);
  // Position par défaut ajustée selon la nouvelle capture (Y = -1.0 comme demandé)
  const [catPos, setCatPos] = useState<THREE.Vector3>(() => new THREE.Vector3(-2.0, -1.0, 0.25));
  // Rotation par défaut ajustée selon la nouvelle capture (1.06 radians)
  const [catRot, setCatRot] = useState<THREE.Euler>(() => new THREE.Euler(0, 1.06, 0));
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const [currentAnimation, setCurrentAnimation] = useState<string>('');
  const [availableAnimations, setAvailableAnimations] = useState<string[]>([]);
  // Pour l'animation de déplacement
  const [isMoving, setIsMoving] = useState(false);
  // Définir le type avec obstacles pour corriger l'erreur TypeScript
  type PathType = {
    points: THREE.Vector3[];
    currentPoint: number;
    speed: number;
    obstacles?: Array<{
      min: THREE.Vector3;
      max: THREE.Vector3;
    }>;
  };
  
  const pathRef = useRef<PathType>({ 
    points: [], 
    currentPoint: 0, 
    speed: 0.01 
  });
  
  // Initialiser le chemin de déplacement
  useEffect(() => {
    // Définir les obstacles dans la pièce (zones à éviter)
    const obstacles = [
      { min: new THREE.Vector3(-0.5, -1.0, -2.0), max: new THREE.Vector3(0.5, 0, -1.5) }, // Table centrale
      { min: new THREE.Vector3(-2.5, -1.0, -2.5), max: new THREE.Vector3(-1.5, 0, -1.5) }, // Meuble gauche
      { min: new THREE.Vector3(1.5, -1.0, -2.5), max: new THREE.Vector3(2.5, 0, -1.5) }   // Meuble droite
    ];
    
    // Créer un chemin de déplacement qui évite les obstacles
    // Tous les points sont à Y = -1.0 comme demandé
    // Chemin plus serré autour des bords pour éviter les objets
    const path: PathType = {
      points: [
        new THREE.Vector3(-2.0, -1.0, 0.25),    // Position initiale (nouvelle position par défaut)
        new THREE.Vector3(-2.2, -1.0, -0.2),   // Point 2 (contourne par la gauche)
        new THREE.Vector3(-2.0, -1.0, -0.8),   // Point 3 (reste sur le bord gauche)
        new THREE.Vector3(-1.2, -1.0, -1.0),   // Point 4 (contourne les meubles)
        new THREE.Vector3(-0.5, -1.0, -0.5),   // Point 5 (reste au centre avant)
        new THREE.Vector3(0.2, -1.0, -0.2),    // Point 6 (va vers la droite)
        new THREE.Vector3(0.5, -1.0, 0.1),     // Point 7 (reste sur le bord droit)
        new THREE.Vector3(0.0, -1.0, 0.2),     // Point 8 (revient vers le centre)
        new THREE.Vector3(-1.0, -1.0, 0.3),    // Point 9 (se dirige vers la position initiale)
        new THREE.Vector3(-2.0, -1.0, 0.25)    // Retour à la position initiale
      ],
      obstacles: obstacles,
      currentPoint: 0,
      speed: 0.001 // Vitesse très réduite pour plus de réalisme
    };
    
    pathRef.current = path;
    
    // Déboguer les animations disponibles dans le GLB
    setTimeout(() => {
      if (gltf && gltf.animations) {
        console.log('Débogage GLB - Animations disponibles:', gltf.animations.map(a => a.name));
        
        // Essayer de forcer l'animation de marche au chargement
        if (mixerRef.current && gltf.animations.length > 0) {
          // Essayer avec l'index 1 (souvent l'animation de marche)
          if (gltf.animations.length > 1) {
            const walkClip = gltf.animations[1];
            console.log('Essai de l\'animation à l\'index 1:', walkClip.name);
            mixerRef.current.stopAllAction();
            const action = mixerRef.current.clipAction(walkClip);
            action.play();
            setCurrentAnimation(walkClip.name);
          }
        }
      }
    }, 1000);
  }, []);
  
  // Expose helper à la console
  useEffect(() => {
    (window as any).setCatScale = (s: number) => setCatScale(s);
    (window as any).setCatPos = (x: number, y: number, z: number) => setCatPos(new THREE.Vector3(x, y, z));
    (window as any).setCatRot = (x: number, y: number, z: number) => setCatRot(new THREE.Euler(x, y, z));
    (window as any).playCatAnimation = (animName: string) => {
      if (mixerRef.current && gltf.animations) {
        mixerRef.current.stopAllAction();
        const clip = THREE.AnimationClip.findByName(gltf.animations, animName);
        if (clip) {
          const action = mixerRef.current.clipAction(clip);
          action.play();
          setCurrentAnimation(animName);
          return true;
        }
      }
      return false;
    };
    
    // Ajouter une commande pour activer/désactiver le déplacement du chat
    (window as any).toggleCatMovement = () => {
      setIsMoving(prev => !prev);
      return `Le chat est maintenant ${!isMoving ? 'en mouvement' : 'statique'}`;
    };
    
    // Ajouter une commande pour lister toutes les animations disponibles
    (window as any).listCatAnimations = () => {
      console.table(availableAnimations);
      return availableAnimations;
    };
    
    // Ajouter une commande pour forcer l'animation de marche
    (window as any).forceWalkAnimation = () => {
      const walkAnim = availableAnimations.find(anim => 
        anim.toLowerCase().includes('walk') || 
        anim.toLowerCase().includes('walking')
      );
      
      if (walkAnim && mixerRef.current) {
        mixerRef.current.stopAllAction();
        const clip = THREE.AnimationClip.findByName(gltf.animations, walkAnim);
        if (clip) {
          const action = mixerRef.current.clipAction(clip);
          action.reset().play();
          setCurrentAnimation(walkAnim);
          return `Animation ${walkAnim} activée`;
        }
      }
      return 'Aucune animation de marche trouvée';
    };
    
    console.log('🐱 Commandes disponibles:');
    console.log('- toggleCatMovement() - Activer/désactiver le déplacement du chat');
    console.log('- listCatAnimations() - Lister toutes les animations disponibles');
    console.log('- forceWalkAnimation() - Forcer l\'animation de marche');
    
  }, [gltf.animations, isMoving, availableAnimations]);
  
  // Détecter et afficher les animations disponibles au chargement
  useEffect(() => {
    if (availableAnimations.length > 0) {
      console.log('Animations disponibles:', availableAnimations);
      // Rechercher spécifiquement une animation de marche
      const walkAnim = availableAnimations.find(anim => 
        anim.toLowerCase().includes('walk') || 
        anim.toLowerCase().includes('walking')
      );
      if (walkAnim) {
        console.log('Animation de marche détectée:', walkAnim);
      }
    }
  }, [availableAnimations]);

  // Appliquer la position à chaque changement
  useEffect(() => {
    if (catRef.current) {
      catRef.current.position.copy(catPos);
    }
  }, [catPos]);

  // Appliquer la rotation
  useEffect(() => {
    if (catRef.current) {
      catRef.current.rotation.set(catRot.x, catRot.y, catRot.z);
    }
  }, [catRot]);

  // Vérification du chargement avec logs de diagnostic (une seule fois)
  useEffect(() => {
    if (!hasLogged) {
      console.log('🐱 Diagnostic chat GLB:', {
        gltf: !!gltf,
        scene: !!gltf?.scene,
        sceneChildren: gltf?.scene?.children?.length || 0,
        texture: !!texture,
        loadError,
        catPos // Position fixe
      });
      setHasLogged(true);
    }
    
    if (!gltf?.scene) {
      console.warn('⚠️ Chat GLB non chargé, utilisation du fallback');
      setLoadError(true);
    } else {
      console.log('✅ Chat GLB chargé - Position fixe près de la porte');
      setLoadError(false);
    }
  }, [gltf, texture, loadError, hasLogged]);

  // Setup materials & animations once GLB is loaded
  useEffect(() => {
    if (gltf && gltf.scene) {
      // Exposer pour la console
      (window as any).__catGLTF = gltf;
      mixerRef.current = new THREE.AnimationMixer(gltf.scene);
      (window as any).__catMixer = mixerRef.current;

      if (gltf.animations && gltf.animations.length > 0) {
        // Extraire les noms des animations disponibles
        const animNames = gltf.animations.map(anim => anim.name);
        setAvailableAnimations(animNames);
        
        // Afficher toutes les animations disponibles pour le débogage
        console.log('Animations disponibles dans le GLB:', animNames);
        
        // Chercher explicitement une animation de marche
        let walkClip = null;
        const walkAnimNames = ['walk', 'walking', 'run', 'running', 'move', 'movement'];
        
        // Chercher une animation qui correspond à un des noms de marche
        for (const walkName of walkAnimNames) {
          for (const animName of animNames) {
            if (animName.toLowerCase().includes(walkName)) {
              walkClip = THREE.AnimationClip.findByName(gltf.animations, animName);
              console.log(`Animation de marche trouvée: ${animName}`);
              break;
            }
          }
          if (walkClip) break;
        }
        
        // Si aucune animation de marche n'est trouvée, utiliser la première animation
        if (!walkClip && animNames.length > 0) {
          walkClip = THREE.AnimationClip.findByName(gltf.animations, animNames[0]);
          console.log(`Aucune animation de marche trouvée, utilisation de: ${animNames[0]}`);
        }
        
        // Jouer l'animation par défaut
        if (walkClip) {
          const action = mixerRef.current.clipAction(walkClip);
          action.play();
          setCurrentAnimation(walkClip.name);
        }
      }
    }
  }, [gltf]);

  // Animation avec déplacement possible
  useFrame((state) => {
    if (catRef.current) {
      // Animation de respiration subtile appliquée sur l'échelle choisie
      const breathe = Math.sin(state.clock.elapsedTime * 2) * 0.02;
      const s = catScale * (1 + breathe);
      catRef.current.scale.set(s, s, s);
      
      // Appliquer la rotation définie par l'utilisateur
      catRef.current.rotation.set(catRot.x, catRot.y, catRot.z);
      
      // Animation de déplacement si activée
      if (isMoving && pathRef.current.points.length > 0) {
        const path = pathRef.current;
        const currentPos = catRef.current.position;
        const targetPos = path.points[path.currentPoint];
        
        // Calculer la direction vers le point cible
        const direction = new THREE.Vector3();
        direction.subVectors(targetPos, currentPos);
        
        // Si on est proche du point cible, passer au point suivant
        if (direction.length() < 0.1) {
          path.currentPoint = (path.currentPoint + 1) % path.points.length;
        } else {
          // Normaliser et multiplier par la vitesse
          direction.normalize().multiplyScalar(path.speed);
          
          // Vérifier si le déplacement ne traverse pas un obstacle
          const nextPos = currentPos.clone().add(direction);
          let collision = false;
          
          // Vérifier les collisions avec les obstacles
          const obstacles = path.obstacles || [];
          for (const obstacle of obstacles) {
            if (nextPos.x >= obstacle.min.x && nextPos.x <= obstacle.max.x &&
                nextPos.z >= obstacle.min.z && nextPos.z <= obstacle.max.z) {
              collision = true;
              break;
            }
          }
          
          // Déplacer le chat vers le point cible uniquement s'il n'y a pas de collision
          if (!collision) {
            currentPos.add(direction);
          } else {
            // En cas de collision, passer au point suivant
            console.log('Collision détectée, changement de point cible');
            path.currentPoint = (path.currentPoint + 1) % path.points.length;
          }
          
          // Orienter le chat dans la direction du mouvement
          if (direction.length() > 0.001) {
            const angle = Math.atan2(direction.x, direction.z);
            catRef.current.rotation.y = angle;
            
            // Forcer l'animation de marche à chaque déplacement
            if (mixerRef.current && gltf.animations && gltf.animations.length > 0) {
              // Essayer de forcer l'animation de marche avec une approche différente
              // Utiliser directement l'index d'animation si les noms ne fonctionnent pas
              let walkAction = null;
              
              // Essayer d'abord avec les noms
              const walkKeywords = ['walk', 'walking', 'run', 'running', 'move', 'movement'];
              let walkClip = null;
              
              // Chercher une animation qui correspond à un des noms de marche
              for (const keyword of walkKeywords) {
                for (const anim of availableAnimations) {
                  if (anim.toLowerCase().includes(keyword)) {
                    walkClip = THREE.AnimationClip.findByName(gltf.animations, anim);
                    if (walkClip) {
                      console.log(`Animation de marche trouvée: ${anim}`);
                      break;
                    }
                  }
                }
                if (walkClip) break;
              }
              
              // Si aucune animation de marche n'est trouvée par nom, utiliser l'index 0 ou 1
              if (!walkClip && gltf.animations.length > 0) {
                // Forcer l'utilisation de l'animation à l'index 1 (souvent la marche dans les GLB)
                if (gltf.animations.length > 1) {
                  walkClip = gltf.animations[1]; // Essayer avec le deuxième clip
                  console.log('FORCE: Utilisation de l\'animation à l\'index 1:', walkClip.name);
                } else {
                  walkClip = gltf.animations[0]; // Utiliser le premier clip si un seul disponible
                  console.log('FORCE: Utilisation de l\'animation à l\'index 0:', walkClip.name);
                }
              }
              
              // Jouer l'animation si trouvée
              if (walkClip) {
                // Vérifier si on joue déjà cette animation
                if (currentAnimation !== walkClip.name) {
                  console.log('Activation de l\'animation:', walkClip.name);
                  mixerRef.current.stopAllAction();
                  const action = mixerRef.current.clipAction(walkClip);
                  // Jouer l'animation avec un poids plus élevé et une transition plus rapide
                  action.reset()
                    .setEffectiveWeight(1.0)
                    .setEffectiveTimeScale(1.0)
                    .fadeIn(0.2)
                    .play();
                  setCurrentAnimation(walkClip.name);
                }
              } else {
                console.error('Aucune animation disponible dans le GLB');
              }
            }
          }
        }
      } else {
        // Position statique définie par l'utilisateur
        catRef.current.position.copy(catPos);
        
        // Revenir à l'animation par défaut si on était en train de marcher
        if (mixerRef.current && currentAnimation.toLowerCase().includes('walk')) {
          const defaultAnim = availableAnimations[0];
          if (defaultAnim) {
            mixerRef.current.stopAllAction();
            const clip = THREE.AnimationClip.findByName(gltf.animations, defaultAnim);
            if (clip) {
              const action = mixerRef.current.clipAction(clip);
              action.play();
              setCurrentAnimation(defaultAnim);
            }
          }
        }
      }

      // Mettre à jour l'animation mixer
      if (mixerRef.current) {
        mixerRef.current.update(state.clock.getDelta());
      }
    }
  });

  // Chat GLB chargé avec succès
  if (gltf?.scene && !loadError) {
    return (
      <group ref={catRef} position={catPos}>
        <primitive 
          object={gltf.scene} 
          /* scale handled by frame loop */
          onClick={onClick}
          onPointerOver={() => document.body.style.cursor = 'pointer'}
          onPointerOut={() => document.body.style.cursor = 'default'}
        />
      </group>
    );
  }

  // Fallback chat procédural si GLB indisponible - POSITION FIXE
  return (
    <group ref={catRef} position={catPos} onClick={onClick}>
      {/* Corps principal */}
      <mesh scale={[0.9, 0.6, 1.1]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Tête */}
      <mesh position={[0, 1.2, 0.3]} scale={[0.9, 0.8, 0.8]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Oreilles */}
      <mesh position={[-0.5, 1.8, 0.2]} rotation={[0, 0, -0.3]} scale={[0.3, 0.4, 0.1]}>
        <coneGeometry args={[0.5, 1, 6]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      <mesh position={[0.5, 1.8, 0.2]} rotation={[0, 0, 0.3]} scale={[0.3, 0.4, 0.1]}>
        <coneGeometry args={[0.5, 1, 6]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      
      {/* Queue */}
      <mesh position={[0, 0.5, -1.8]} rotation={[0.5, 0, 0]} scale={[0.15, 0.15, 1.5]}>
        <cylinderGeometry args={[0.3, 0.1, 2, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Pattes */}
      {[[-0.5, -0.4, 0.8], [0.5, -0.4, 0.8], [-0.5, -0.4, -0.8], [0.5, -0.4, -0.8]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} scale={[0.12, 0.32, 0.12]}>
          <cylinderGeometry args={[0.5, 0.8, 1, 8]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
      ))}
      
      {/* Yeux */}
      <mesh position={[-0.25, 1.3, 0.9]} scale={[0.15, 0.15, 0.1]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0.25, 1.3, 0.9]} scale={[0.15, 0.15, 0.1]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

// Logo GamiusGroup intégré à la scène médiévale
function StudioLogo() {
  const logoTexture = useLoader(THREE.TextureLoader, '/item_images/logo/gamiusgroup-631x311.png');
  
  return (
    <group position={[0, 1.5, -3]} rotation={[0, 0, 0]}>
      <Plane args={[2, 1]} position={[0, 0, 0]}>
        <meshBasicMaterial 
          map={logoTexture} 
          transparent 
          alphaTest={0.1}
          side={THREE.DoubleSide}
        />
      </Plane>
      
      {/* Torches virtuelles de chaque côté du logo */}
      <pointLight position={[-1.5, 0, 0.5]} intensity={0.4} color="#ff6644" distance={3} />
      <pointLight position={[1.5, 0, 0.5]} intensity={0.4} color="#ff6644" distance={3} />
    </group>
  );
}

// Environnement médiéval isométrique
function MedievalRoom() {
  const { scene } = useGLTF('/item_images/medieval_isometric_room_-_low_poly.glb');
  const roomRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (roomRef.current) {
      // Légère rotation pour l'effet cinématique
      roomRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
    }
  });

  return (
    <group ref={roomRef} position={[0, -1, 0]} scale={[1.5, 1.5, 1.5]}>
      <primitive object={scene.clone()} />
      
      {/* Éclairage d'ambiance médiéval */}
      <pointLight
        position={[0, 2, 0]}
        intensity={0.8}
        color="#ffaa44"
        distance={8}
      />
      
      {/* Éclairage des chandelles simulé */}
      <pointLight
        position={[-2, 1, -2]}
        intensity={1.5}
        color="#ff6644"
        distance={4}
      />
      <pointLight
        position={[2, 1, -2]}
        intensity={0.5}
        color="#ff6644"
        distance={4}
      />
      
      {/* Zone cliquable sur la porte pour redirection */}
      <mesh 
        position={[0, 0, -2.8]} 
        rotation={[0, 0, 0]} 
        scale={[1, 2, 0.1]} 
        onClick={() => {
          console.log('Porte isométrique cliquée - redirection désactivée');
          // Redirection supprimée comme demandé par l'utilisateur
        }}
      >
        <boxGeometry args={[1, 2, 0.1]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  );
}

// Composant principal du contenu 3D
function StudioContent({ animation, onCatClick }: { animation?: string; onCatClick?: () => void }) {
  const [ambientAudio, setAmbientAudio] = useState<HTMLAudioElement | null>(null);
  const [meowAudio, setMeowAudio] = useState<HTMLAudioElement | null>(null);
  const [audioInitialized, setAudioInitialized] = useState(false);
  const [audioActivated, setAudioActivated] = useState(false);

  // Initialisation de l'audio - une seule fois
  useEffect(() => {
    if (!audioInitialized) {
      console.log('🎵 Initialisation audio...');
      
      try {
        // Initialiser l'audio ambiant
        const ambient = new Audio('/sounds/gamius-ambient.mp3');
        ambient.loop = true;
        ambient.volume = 0.3;
        ambient.preload = 'auto';
        setAmbientAudio(ambient);

        // Initialiser le son de miaulement
        const meow = new Audio('/sounds/CatMeow.mp3');
        meow.volume = 0.5;
        meow.preload = 'auto';
        setMeowAudio(meow);

        setAudioInitialized(true);
        console.log('✅ Audio initialisé');
      } catch (error) {
        console.error('❌ Erreur initialisation audio:', error);
      }
    }
  }, [audioInitialized]);

  // Activation de l'audio au premier clic (nécessaire pour les navigateurs modernes)
  const activateAudio = async () => {
    if (!audioActivated && ambientAudio && meowAudio) {
      try {
        console.log('🎵 Activation audio utilisateur...');
        
        // Démarrer l'audio ambiant immédiatement
        await ambientAudio.play();
        console.log('🎵 Audio ambiant démarré');
        
        setAudioActivated(true);
      } catch (error) {
        console.error('❌ Erreur activation audio:', error);
        // Fallback : attendre le prochain clic
      }
    }
  };

  const handleCatClick = async () => {
    console.log('🐱 Chat cliqué!');
    
    // Activer l'audio si pas encore fait
    if (!audioActivated) {
      await activateAudio();
    }
    
    // Jouer le miaulement
    if (meowAudio && audioActivated) {
      try {
        meowAudio.currentTime = 0;
        await meowAudio.play();
        console.log('🔊 Miaulement joué');
      } catch (error) {
        console.warn('❌ Erreur miaulement:', error);
      }
    }
    
    // Déclencher le callback parent
    if (onCatClick) {
      onCatClick();
    }
  };

  // Gestionnaire de clic global pour activer l'audio
  const handleSceneClick = async () => {
    if (!audioActivated) {
      await activateAudio();
    }
  };

  return (
    <group onClick={handleSceneClick}>
      {/* Éclairage principal */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />

      {/* Environnement du studio */}
      <MedievalRoom />

      {/* Chat 3D principal */}
      <CatModel animation={animation} onClick={handleCatClick} />

      {/* Contrôles de caméra améliorés - Zone entière */}
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        enableDamping={true}
        dampingFactor={0.08}
        minDistance={2}
        maxDistance={20}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 1.8}
        target={[-1, 0, -1]} // Centrer sur le chat près de la porte
        autoRotate={false}
        zoomSpeed={0.8}
        rotateSpeed={0.6}
        panSpeed={0.8}
        touches={{
          ONE: 2, // TOUCH.ROTATE
          TWO: 1  // TOUCH.DOLLY_PAN
        }}
        mouseButtons={{
          LEFT: 0,  // MOUSE.ROTATE
          MIDDLE: 1, // MOUSE.DOLLY
          RIGHT: 2   // MOUSE.PAN
        }}
      />
    </group>
  );
}

// ---------- Dev GUI -----------
const DevPanel = () => {
  if (process.env.NODE_ENV === 'production') return null;
  // Valeurs par défaut mises à jour selon la nouvelle capture (Y = -1.0 comme demandé)
  const [localScale, setLocalScale] = useState(0.0040);
  const [localYRot, setLocalYRot] = useState(1.06);
  const [localX, setLocalX] = useState(-2.0);
  const [localY, setLocalY] = useState(-1.0);
  const [localZ, setLocalZ] = useState(0.25);
  const [expanded, setExpanded] = useState(true);
  const [animations, setAnimations] = useState<string[]>([]);
  const [selectedAnimation, setSelectedAnimation] = useState('');
  const [liveUpdate, setLiveUpdate] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  // Récupérer les animations disponibles
  useEffect(() => {
    const checkAnimations = () => {
      const gltf = (window as any).__catGLTF;
      if (gltf?.animations) {
        const animNames = gltf.animations.map((anim: any) => anim.name);
        setAnimations(animNames);
        setSelectedAnimation(animNames[0] || '');
      } else {
        setTimeout(checkAnimations, 500); // Réessayer si pas encore chargé
      }
    };
    checkAnimations();
  }, []);

  // Appliquer les changements en direct si activé
  useEffect(() => {
    if (liveUpdate) {
      apply();
    }
  }, [localScale, localYRot, localX, localY, localZ, liveUpdate]);

  const apply = () => {
    (window as any).setCatScale?.(localScale);
    (window as any).setCatRot?.(0, localYRot, 0);
    (window as any).setCatPos?.(localX, localY, localZ);
  };
  
  const toggleMovement = () => {
    setIsMoving(!isMoving);
    (window as any).toggleCatMovement?.();
  };

  const playAnimation = () => {
    if (selectedAnimation) {
      (window as any).playCatAnimation?.(selectedAnimation);
    }
  };

  const panelStyle: React.CSSProperties = {
    position: 'absolute',
    top: 10,
    left: 10,
    background: 'rgba(0,0,0,0.75)',
    padding: '10px',
    borderRadius: 8,
    color: '#ffd700',
    fontSize: 12,
    zIndex: 100,
    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
    border: '1px solid rgba(255,215,0,0.3)',
    width: expanded ? '280px' : 'auto',
    transition: 'all 0.3s ease'
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: expanded ? '8px' : '0',
    padding: '2px 0',
    borderBottom: expanded ? '1px solid rgba(255,215,0,0.3)' : 'none'
  };

  const sliderContainerStyle: React.CSSProperties = {
    marginBottom: 8
  };

  const sliderLabelStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const sliderStyle: React.CSSProperties = {
    width: '100%',
    accentColor: '#ffd700',
    margin: '4px 0'
  };

  const buttonStyle: React.CSSProperties = {
    padding: '4px 8px',
    background: '#ffd700',
    color: '#000',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    margin: '0 4px 0 0',
    fontSize: 11
  };

  const selectStyle: React.CSSProperties = {
    background: '#222',
    color: '#ffd700',
    border: '1px solid #ffd700',
    borderRadius: 4,
    padding: '3px',
    width: '100%',
    marginBottom: 8
  };

  const toggleStyle: React.CSSProperties = {
    cursor: 'pointer',
    userSelect: 'none',
    fontSize: 16
  };

  return (
    <div style={panelStyle}>
      <div style={headerStyle}>
        <div><strong>🐱 Cat Controls</strong></div>
        <div 
          style={toggleStyle} 
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? '−' : '+'}
        </div>
      </div>

      {expanded && (
        <>
          <div style={{marginBottom: 10}}>
            <label htmlFor="animation-select" style={{display: 'block', marginBottom: 4}}>Animation:</label>
            <div style={{display: 'flex', gap: '8px'}}>
              <select 
                id="animation-select"
                style={selectStyle} 
                value={selectedAnimation} 
                onChange={e => setSelectedAnimation(e.target.value)}
              >
                {animations.map(anim => (
                  <option key={anim} value={anim}>{anim}</option>
                ))}
              </select>
              <button style={buttonStyle} onClick={playAnimation}>▶️ Play</button>
            </div>
          </div>

          <div style={sliderContainerStyle}>
            <div style={sliderLabelStyle}>
              <span>Scale</span>
              <span>{localScale.toFixed(4)}</span>
            </div>
            <input 
              type="range" 
              min="0.0005" 
              max="0.02" 
              step="0.0005" 
              style={sliderStyle}
              value={localScale} 
              onChange={e => setLocalScale(parseFloat(e.target.value))}
            />
          </div>

          <div style={sliderContainerStyle}>
            <div style={sliderLabelStyle}>
              <span>Y Rotation</span>
              <span>{(localYRot).toFixed(2)}</span>
            </div>
            <input 
              type="range" 
              min="-3.14" 
              max="3.14" 
              step="0.05" 
              style={sliderStyle}
              value={localYRot} 
              onChange={e => setLocalYRot(parseFloat(e.target.value))}
            />
          </div>

          <div style={sliderContainerStyle}>
            <div style={sliderLabelStyle}>
              <span>Position X</span>
              <span>{localX.toFixed(2)}</span>
            </div>
            <input 
              type="range" 
              min="-10" 
              max="10" 
              step="0.25" 
              style={sliderStyle}
              value={localX} 
              onChange={e => setLocalX(parseFloat(e.target.value))}
            />
          </div>

          <div style={sliderContainerStyle}>
            <div style={sliderLabelStyle}>
              <span>Position Y</span>
              <span>{localY.toFixed(2)}</span>
            </div>
            <input 
              type="range" 
              min="-5" 
              max="5" 
              step="0.25" 
              style={sliderStyle}
              value={localY} 
              onChange={e => setLocalY(parseFloat(e.target.value))}
            />
          </div>

          <div style={sliderContainerStyle}>
            <div style={sliderLabelStyle}>
              <span>Position Z</span>
              <span>{localZ.toFixed(2)}</span>
            </div>
            <input 
              type="range" 
              min="-10" 
              max="10" 
              step="0.25" 
              style={sliderStyle}
              value={localZ} 
              onChange={e => setLocalZ(parseFloat(e.target.value))}
            />
          </div>

          <div style={{marginTop: 10, borderTop: '1px solid rgba(255,215,0,0.3)', paddingTop: 8}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8}}>
              <label style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                <input 
                  type="checkbox" 
                  checked={liveUpdate} 
                  onChange={e => setLiveUpdate(e.target.checked)}
                />
                <span>Live update</span>
              </label>
              <label style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                <input 
                  type="checkbox" 
                  checked={isMoving} 
                  onChange={e => toggleMovement()}
                />
                <span>Circuler dans la pièce</span>
              </label>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <button style={buttonStyle} onClick={apply}>Apply Changes</button>
              <button 
                style={{...buttonStyle, background: isMoving ? '#ff9900' : '#555'}} 
                onClick={toggleMovement}
              >
                {isMoving ? 'Stop Movement' : 'Start Movement'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export function StreamingStudio3D({ animation = 'idle', onCatClick }: StreamingStudio3DProps) {
  // DevPanel caché par défaut comme demandé par l'utilisateur
  const [showDevPanel, setShowDevPanel] = useState(false);
  
  // Exposer le contrôle du panel à la console
  useEffect(() => {
    (window as any).toggleCatPanel = () => {
      setShowDevPanel(prev => !prev);
      return `DevPanel est maintenant ${!showDevPanel ? 'visible' : 'caché'}`;
    };
    
    (window as any).showCatPanel = () => {
      setShowDevPanel(true);
      return 'DevPanel est maintenant visible';
    };
    
    (window as any).hideCatPanel = () => {
      setShowDevPanel(false);
      return 'DevPanel est maintenant caché';
    };
    
    console.log('🐱 Commandes console disponibles: toggleCatPanel(), showCatPanel(), hideCatPanel()');
  }, [showDevPanel]);
  
  return (
    <div className="w-full h-full bg-black relative">
      <Canvas
        camera={{ 
          position: [6, 5, 6], 
          fov: 50,
          near: 0.1,
          far: 200
        }}
        style={{ 
          width: '100%', 
          height: '100%',
          cursor: 'grab',
          touchAction: 'none' // Amélioration mobile
        }}
        gl={{ 
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: true,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 2]} // Optimisation mobile
        onCreated={({ gl, camera }) => {
          // Configuration pour mobile
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }}
      >
        <Suspense fallback={null}>
          <StudioContent animation={animation} onCatClick={onCatClick} />
        </Suspense>
      </Canvas>
      {showDevPanel && <DevPanel />}
    </div>
  );
}

// Préchargement du modèle GLB
useGLTF.preload('/item_images/toon_cat_free.glb');
useGLTF.preload('/item_images/medieval_isometric_room_-_low_poly.glb');
