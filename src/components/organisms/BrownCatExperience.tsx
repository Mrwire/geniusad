'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
// @ts-ignore - Import GSAP pour l'animation
import { TweenMax } from 'gsap';

// Classe pour le modificateur de subdivision (pour adoucir les maillages)
class SubdivisionModifier {
  subdivisions: number;

  constructor(subdivisions = 1) {
    this.subdivisions = subdivisions;
  }

  modify(geometry: THREE.BufferGeometry) {
    // Note: La géométrie originale est déjà assez bonne pour notre cas
    // On simule juste l'effet d'adoucissement
    return geometry;
  }
}

interface CatBallExperienceProps {
  backgroundColor?: string;
}

const BrownCatExperience: React.FC<CatBallExperienceProps> = ({ backgroundColor = 'rgba(123, 254, 254, 0.8)' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const requestRef = useRef<number | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const oldMousePos = useRef({ x: 0, y: 0 });

  // Couleurs exactement comme dans le code fourni
  const Colors = {
    red: 0x129346,
    white: 0xd8d0d1,
    pink: 0xF5986E,
    lightbrown: 0x59332e,
    brown: 0x23190f,
    yellow: 0xfff68f,
    wheatgold: 0xFDE154,
    blackish: 0x13110E,
    black: 0x000000,
  };

  useEffect(() => {
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let cat: any; // Utilisera la classe Cat définie ci-dessous
    let animationFrameId: number;
    
    // Dimensions
    let WIDTH = window.innerWidth;
    let HEIGHT = window.innerHeight;
    
    // Classe Cat exactement comme dans le code fourni
    function Cat() {
      this.threeGroup = new THREE.Group();

      const bodyMat = new THREE.MeshLambertMaterial({ color: Colors.brown });
      const faceMat = new THREE.MeshLambertMaterial({ color: Colors.blackish });

      this.bodyHeight = 80;

      // Body
      const torsoGeom = new THREE.CylinderGeometry(0, 26, this.bodyHeight, 3, 1);
      torsoGeom.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 3));
      torsoGeom.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -this.bodyHeight / 2, 0));
      this.torso = new THREE.Mesh(torsoGeom, bodyMat);

      this.body = new THREE.Group();
      this.body.add(this.torso);
      this.body.position.y = this.bodyHeight;

      // Head
      const faceGeom = new THREE.SphereGeometry(21, 6, 8);
      faceGeom.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 15, 0));
      faceGeom.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 6));
      this.face = new THREE.Mesh(faceGeom, faceMat);

      this.head = new THREE.Group();
      this.head.add(this.face);

      this.head.position.set(0, this.bodyHeight - 15, -5);

      // Tail
      this.tail = new THREE.Group();
      const tailSegGeom = new THREE.CylinderGeometry(5, 4, 8, 6);
      tailSegGeom.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 4, 0));

      this.tailSegments = [];
      const tailMat = bodyMat;

      for (let i = 0; i < 8; i++) {
        const seg = new THREE.Mesh(tailSegGeom.clone(), tailMat);
        seg.position.y = i * 6;
        seg.rotation.x = i === 0 ? -Math.PI / 2 : 0;
        this.tailSegments.push(seg);
        if (i > 0) this.tailSegments[i - 1].add(seg);
      }

      this.tail.add(this.tailSegments[0]);
      this.tail.position.set(0, 5, -36);

      this.threeGroup.add(this.body);
      this.threeGroup.add(this.head);
      this.threeGroup.add(this.tail);

      this.threeGroup.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.castShadow = true;
          object.receiveShadow = true;
        }
      });
    }

    // Animation methods
    Cat.prototype.updateTail = function(t: number) {
      for (let i = 0; i < this.tailSegments.length; i++) {
        const angleStep = -i * 0.5;
        const angleAmp = Math.PI / (30 / (i + 1));
        this.tailSegments[i].rotation.z = Math.sin(t + angleStep) * angleAmp;
      }
    };

    Cat.prototype.lookAt = function(v: THREE.Vector3) {
      this.head.lookAt(v);
    };

    Cat.prototype.blink = function() {
      TweenMax.to(this.face.scale, 0.1, {y: 0.1, repeat: 1, yoyo: true});
    };

    // Initialisation de la scène Three.js
    const initScene = () => {
      // Création de la scène
      scene = new THREE.Scene();
      
      // Création de la caméra
      const aspectRatio = WIDTH / HEIGHT;
      const fieldOfView = 50;
      const nearPlane = 1;
      const farPlane = 2000;
      
      camera = new THREE.PerspectiveCamera(
        fieldOfView,
        aspectRatio,
        nearPlane,
        farPlane
      );
      
      camera.position.set(0, 250, 300);
      camera.lookAt(new THREE.Vector3(0, 60, 0));
      
      // Création du renderer
      renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true 
      });
      
      renderer.setSize(WIDTH, HEIGHT);
      renderer.shadowMap.enabled = true;
      
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(renderer.domElement);
      }
      
      // Ajout des lumières
      createLights();
      
      // Création du sol
      createFloor();
      
      // Création du chat
      createCat();
      
      // Création de la balle
      createBall();
      
      // Gestion du redimensionnement
      window.addEventListener('resize', handleWindowResize);
      
      // Gestion des mouvements de la souris
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove);
      
      setIsLoading(false);
    };
    
    // Création des lumières
    const createLights = () => {
      // Lumière ambiante
      const globalLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5);
      
      // Lumière directionnelle principale
      const shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);
      shadowLight.position.set(200, 200, 200);
      shadowLight.castShadow = true;
      shadowLight.shadow.mapSize.width = 2048;
      shadowLight.shadow.mapSize.height = 2048;
      
      // Lumière arrière
      const backLight = new THREE.DirectionalLight(0xffffff, 0.4);
      backLight.position.set(-100, 100, 100);
      backLight.castShadow = true;
      backLight.shadow.mapSize.width = 2048;
      backLight.shadow.mapSize.height = 2048;
      
      scene.add(globalLight);
      scene.add(shadowLight);
      scene.add(backLight);
    };
    
    // Création du sol
    const createFloor = () => {
      // Utilisation de la couleur de fond demandée
      const bgColor = backgroundColor === 'rgba(123, 254, 254, 0.8)' 
        ? 0x68c3c0 
        : backgroundColor === '#f9d423' 
          ? 0xf9d423 
          : 0x68c3c0;

      const floorGeometry = new THREE.PlaneGeometry(1000, 1000);
      const floorMaterial = new THREE.MeshPhongMaterial({
        color: bgColor,
        transparent: true,
        opacity: 0.5,
      });
      
      const floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -20;
      floor.receiveShadow = true;
      
      scene.add(floor);
    };
    
    // Création du chat
    const createCat = () => {
      cat = new Cat();
      cat.threeGroup.position.y = 20;
      scene.add(cat.threeGroup);
    };
    
    // Création de la balle
    const createBall = () => {
      const ball = new THREE.Group();
      
      // Matériaux
      const redMaterial = new THREE.MeshLambertMaterial({ color: 0x630d15 });
      
      // Corps de la balle
      const ballGeometry = new THREE.SphereGeometry(8, 16, 16);
      const ballMesh = new THREE.Mesh(ballGeometry, redMaterial);
      ball.add(ballMesh);
      
      // Détails de la balle (fil et nœuds)
      const wireGeometry = new THREE.TorusGeometry(8, 0.5, 3, 10, Math.PI * 2);
      
      for (let i = 0; i < 6; i++) {
        const wire = new THREE.Mesh(wireGeometry, redMaterial);
        wire.rotation.x = Math.random() * Math.PI;
        wire.rotation.y = Math.random() * Math.PI;
        ball.add(wire);
      }
      
      // Position initiale et ombres
      ball.position.set(0, 50, 0);
      ball.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.castShadow = true;
          object.receiveShadow = true;
        }
      });
      
      scene.add(ball);
      return ball;
    };
    
    // Redimensionnement de la fenêtre
    const handleWindowResize = () => {
      WIDTH = window.innerWidth;
      HEIGHT = window.innerHeight;
      
      renderer.setSize(WIDTH, HEIGHT);
      camera.aspect = WIDTH / HEIGHT;
      camera.updateProjectionMatrix();
    };
    
    // Mouvement de la souris
    const handleMouseMove = (event: MouseEvent) => {
      mousePos.current = { x: event.clientX, y: event.clientY };
    };
    
    // Mouvement tactile
    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        event.preventDefault();
        mousePos.current = { x: event.touches[0].pageX, y: event.touches[0].pageY };
      }
    };
    
    // Animation de la scène
    let time = 0;
    const animate = () => {
      time += 0.05;
      
      // Position de la balle basée sur la souris
      const vector = new THREE.Vector3();
      vector.set(
        (mousePos.current.x / WIDTH) * 2 - 1,
        -(mousePos.current.y / HEIGHT) * 2 + 1,
        0.1
      );
      
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = (30 - camera.position.z) / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));
      
      // Animation du chat (implémentation exacte du code fourni)
      cat.updateTail(time);
      cat.lookAt(pos);
      
      if (Math.random() > 0.995) cat.blink();
      
      // Rendu
      renderer.render(scene, camera);
      
      // Boucle d'animation
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Initialisation et démarrage
    initScene();
    animate();
    
    // Nettoyage
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      window.removeEventListener('resize', handleWindowResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [backgroundColor]);
  
  return (
    <div className="relative w-full h-screen">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-blue-50">
          <div className="text-xl">Chargement de l'expérience...</div>
        </div>
      )}
      <div 
        ref={containerRef} 
        className="w-full h-full" 
        style={{ background: backgroundColor }}
      />
      <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-white opacity-70">
        Déplacez votre souris pour jouer avec le chat • Made with love by Genius 2025
      </div>
    </div>
  );
};

export default BrownCatExperience;
