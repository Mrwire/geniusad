// Premium Cat 3D Model - Apple-inspired design standards
// Advanced PBR materials and anatomically correct geometry

window.createPremiumCat = function(scene, THREE) {
  console.log("[Premium Cat] Creating Apple-standard 3D cat...");
  
  // Create cat group
  const catGroup = new THREE.Group();
  catGroup.name = 'PremiumCat';
  
  // === ADVANCED MATERIALS ===
  
  // Primary fur material with apple-like finish
  const furMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xff6b35,
    roughness: 0.4,
    metalness: 0.05,
    sheen: 0.8,
    sheenColor: 0xffa500,
    clearcoat: 0.1,
    clearcoatRoughness: 0.2,
    iridescence: 0.05,
    iridescenceIOR: 1.3
  });
  
  // Eye material with depth and reflection
  const eyeMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x4a90e2,
    roughness: 0.1,
    metalness: 0.1,
    transmission: 0.3,
    thickness: 0.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    envMapIntensity: 2.0
  });
  
  // Nose material - soft silicone-like
  const noseMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xff69b4,
    roughness: 0.3,
    metalness: 0.0,
    clearcoat: 0.8,
    clearcoatRoughness: 0.1
  });
  
  // Inner mouth material
  const mouthMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xff1493,
    roughness: 0.8,
    metalness: 0.0
  });
  
  // === BODY CONSTRUCTION ===
  
  // Main body - refined ellipsoid
  const bodyGeometry = new THREE.SphereGeometry(1.2, 32, 24);
  bodyGeometry.scale(1, 0.8, 1.4);
  const body = new THREE.Mesh(bodyGeometry, furMaterial);
  body.position.set(0, 0.5, 0);
  body.castShadow = true;
  body.receiveShadow = true;
  catGroup.add(body);
  
  // Head - perfectly spherical with apple precision
  const headGeometry = new THREE.SphereGeometry(0.8, 32, 24);
  const head = new THREE.Mesh(headGeometry, furMaterial);
  head.position.set(0, 1.8, 0.3);
  head.scale.set(1.1, 1.0, 0.95);
  head.castShadow = true;
  head.receiveShadow = true;
  catGroup.add(head);
  
  // === FACIAL FEATURES ===
  
  // Eyes - crystal clear with depth
  const eyeGeometry = new THREE.SphereGeometry(0.15, 16, 12);
  
  const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  leftEye.position.set(-0.25, 1.85, 0.6);
  leftEye.castShadow = true;
  catGroup.add(leftEye);
  
  const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  rightEye.position.set(0.25, 1.85, 0.6);
  rightEye.castShadow = true;
  catGroup.add(rightEye);
  
  // Pupils - perfect black circles
  const pupilGeometry = new THREE.SphereGeometry(0.08, 12, 8);
  const pupilMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x000000,
    roughness: 0.9,
    metalness: 0.0
  });
  
  const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
  leftPupil.position.set(-0.25, 1.85, 0.68);
  catGroup.add(leftPupil);
  
  const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
  rightPupil.position.set(0.25, 1.85, 0.68);
  catGroup.add(rightPupil);
  
  // Nose - apple-like precision
  const noseGeometry = new THREE.SphereGeometry(0.08, 12, 8);
  noseGeometry.scale(1, 0.7, 0.8);
  const nose = new THREE.Mesh(noseGeometry, noseMaterial);
  nose.position.set(0, 1.65, 0.7);
  nose.castShadow = true;
  catGroup.add(nose);
  
  // === EARS ===
  const earGeometry = new THREE.ConeGeometry(0.3, 0.6, 8);
  
  const leftEar = new THREE.Mesh(earGeometry, furMaterial);
  leftEar.position.set(-0.4, 2.3, 0.1);
  leftEar.rotation.z = 0.3;
  leftEar.castShadow = true;
  catGroup.add(leftEar);
  
  const rightEar = new THREE.Mesh(earGeometry, furMaterial);
  rightEar.position.set(0.4, 2.3, 0.1);
  rightEar.rotation.z = -0.3;
  rightEar.castShadow = true;
  catGroup.add(rightEar);
  
  // Inner ears - pink soft material
  const innerEarGeometry = new THREE.ConeGeometry(0.15, 0.4, 6);
  const innerEarMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffb6c1,
    roughness: 0.6,
    metalness: 0.0
  });
  
  const leftInnerEar = new THREE.Mesh(innerEarGeometry, innerEarMaterial);
  leftInnerEar.position.set(-0.4, 2.25, 0.15);
  leftInnerEar.rotation.z = 0.3;
  catGroup.add(leftInnerEar);
  
  const rightInnerEar = new THREE.Mesh(innerEarGeometry, innerEarMaterial);
  rightInnerEar.position.set(0.4, 2.25, 0.15);
  rightInnerEar.rotation.z = -0.3;
  catGroup.add(rightInnerEar);
  
  // === LEGS ===  
  const legGeometry = new THREE.CylinderGeometry(0.15, 0.12, 0.8, 12);
  
  // Front legs
  const frontLeftLeg = new THREE.Mesh(legGeometry, furMaterial);
  frontLeftLeg.position.set(-0.5, -0.1, 0.6);
  frontLeftLeg.castShadow = true;
  catGroup.add(frontLeftLeg);
  
  const frontRightLeg = new THREE.Mesh(legGeometry, furMaterial);
  frontRightLeg.position.set(0.5, -0.1, 0.6);
  frontRightLeg.castShadow = true;
  catGroup.add(frontRightLeg);
  
  // Back legs
  const backLeftLeg = new THREE.Mesh(legGeometry, furMaterial);
  backLeftLeg.position.set(-0.5, -0.1, -0.6);
  backLeftLeg.castShadow = true;
  catGroup.add(backLeftLeg);
  
  const backRightLeg = new THREE.Mesh(legGeometry, furMaterial);
  backRightLeg.position.set(0.5, -0.1, -0.6);
  backRightLeg.castShadow = true;
  catGroup.add(backRightLeg);
  
  // === PAWS ===
  const pawGeometry = new THREE.SphereGeometry(0.18, 12, 8);
  pawGeometry.scale(1, 0.6, 1);
  
  const pawMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xff6b35,
    roughness: 0.5,
    metalness: 0.0,
    clearcoat: 0.2
  });
  
  const frontLeftPaw = new THREE.Mesh(pawGeometry, pawMaterial);
  frontLeftPaw.position.set(-0.5, -0.55, 0.6);
  frontLeftPaw.castShadow = true;
  catGroup.add(frontLeftPaw);
  
  const frontRightPaw = new THREE.Mesh(pawGeometry, pawMaterial);
  frontRightPaw.position.set(0.5, -0.55, 0.6);
  frontRightPaw.castShadow = true;
  catGroup.add(frontRightPaw);
  
  const backLeftPaw = new THREE.Mesh(pawGeometry, pawMaterial);
  backLeftPaw.position.set(-0.5, -0.55, -0.6);
  backLeftPaw.castShadow = true;
  catGroup.add(backLeftPaw);
  
  const backRightPaw = new THREE.Mesh(pawGeometry, pawMaterial);
  backRightPaw.position.set(0.5, -0.55, -0.6);
  backRightPaw.castShadow = true;
  catGroup.add(backRightPaw);
  
  // === TAIL ===
  const tailGeometry = new THREE.CylinderGeometry(0.08, 0.15, 1.5, 12);
  const tail = new THREE.Mesh(tailGeometry, furMaterial);
  tail.position.set(0, 0.8, -1.2);
  tail.rotation.x = -0.8;
  tail.castShadow = true;
  catGroup.add(tail);
  
  // === WHISKERS ===
  const whiskerMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.1,
    metalness: 0.8,
    clearcoat: 1.0
  });
  
  // Create whiskers
  for (let i = 0; i < 6; i++) {
    const whiskerGeometry = new THREE.CylinderGeometry(0.005, 0.005, 0.8, 4);
    const whisker = new THREE.Mesh(whiskerGeometry, whiskerMaterial);
    
    const side = i < 3 ? -1 : 1;
    const offset = (i % 3) * 0.1 - 0.1;
    
    whisker.position.set(side * 0.35, 1.7 + offset, 0.65);
    whisker.rotation.z = side * (Math.PI / 2);
    whisker.rotation.y = side * 0.2;
    catGroup.add(whisker);
  }
  
  // === POSITIONING ===
  catGroup.position.set(-2, 0, 0);
  catGroup.scale.set(0.8, 0.8, 0.8);
  
  // Store reference for animations
  window.premiumCatGroup = catGroup;
  window.premiumCatTail = tail;
  
  scene.add(catGroup);
  
  console.log("[Premium Cat] Apple-standard 3D cat created successfully!");
  return catGroup;
};

console.log("[Premium Cat] Module loaded successfully");
