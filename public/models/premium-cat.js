// Premium Cat Model - Professional 3D Model Creation
// Inspired by Apple's design excellence and attention to detail

export function createPremiumCat(THREE) {
  const cat = new THREE.Group();
  
  // === ADVANCED MATERIALS ===
  // High-quality PBR materials with proper lighting response
  const furMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xD2691E,
    roughness: 0.7,
    metalness: 0.0,
    clearcoat: 0.1,
    clearcoatRoughness: 0.3,
    sheen: 0.2,
    sheenColor: 0xFFFFFF,
    iridescence: 0.05,
    side: THREE.DoubleSide
  });
  
  const eyeMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x2E8B57,
    roughness: 0.1,
    metalness: 0.0,
    clearcoat: 0.9,
    clearcoatRoughness: 0.05,
    transmission: 0.3,
    thickness: 0.1
  });
  
  const noseMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xFF69B4,
    roughness: 0.3,
    metalness: 0.0,
    clearcoat: 0.5,
    emissive: 0x330011,
    emissiveIntensity: 0.05
  });
  
  const pawMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x2F2F2F,
    roughness: 0.8,
    metalness: 0.0,
    clearcoat: 0.2
  });
  
  // === SOPHISTICATED BODY ===
  // Use advanced geometry for smooth, organic shapes
  const bodyGeometry = new THREE.CapsuleGeometry(0.35, 0.8, 12, 24);
  const body = new THREE.Mesh(bodyGeometry, furMaterial);
  body.position.set(0, 0.5, 0);
  body.rotation.z = Math.PI / 2;
  body.scale.set(1, 0.9, 1.1);
  body.castShadow = true;
  body.receiveShadow = true;
  cat.add(body);
  
  // === REFINED HEAD ===
  const headGeometry = new THREE.SphereGeometry(0.28, 24, 20);
  const head = new THREE.Mesh(headGeometry, furMaterial);
  head.position.set(0.5, 0.6, 0);
  head.scale.set(1.1, 0.95, 1.15);
  head.castShadow = true;
  head.receiveShadow = true;
  cat.add(head);
  
  // === DETAILED EARS ===
  const earGeometry = new THREE.ConeGeometry(0.09, 0.18, 8);
  const leftEar = new THREE.Mesh(earGeometry, furMaterial);
  leftEar.position.set(0.58, 0.75, -0.15);
  leftEar.rotation.x = Math.PI * 0.15;
  leftEar.rotation.z = -Math.PI * 0.1;
  leftEar.castShadow = true;
  cat.add(leftEar);
  
  const rightEar = new THREE.Mesh(earGeometry, furMaterial);
  rightEar.position.set(0.58, 0.75, 0.15);
  rightEar.rotation.x = Math.PI * 0.15;
  rightEar.rotation.z = Math.PI * 0.1;
  rightEar.castShadow = true;
  cat.add(rightEar);
  
  // === EXPRESSIVE EYES ===
  const eyeGeometry = new THREE.SphereGeometry(0.05, 16, 12);
  const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  leftEye.position.set(0.68, 0.65, -0.09);
  cat.add(leftEye);
  
  const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  rightEye.position.set(0.68, 0.65, 0.09);
  cat.add(rightEye);
  
  // Eye pupils
  const pupilGeometry = new THREE.SphereGeometry(0.02, 8, 6);
  const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
  
  const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
  leftPupil.position.set(0.7, 0.65, -0.09);
  cat.add(leftPupil);
  
  const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
  rightPupil.position.set(0.7, 0.65, 0.09);
  cat.add(rightPupil);
  
  // === REFINED NOSE ===
  const noseGeometry = new THREE.SphereGeometry(0.025, 12, 8);
  const nose = new THREE.Mesh(noseGeometry, noseMaterial);
  nose.position.set(0.72, 0.58, 0);
  nose.scale.set(1, 0.7, 1.2);
  cat.add(nose);
  
  // === ORGANIC LEGS ===
  const legGeometry = new THREE.CapsuleGeometry(0.05, 0.35, 6, 12);
  
  // Front legs
  const frontLeftLeg = new THREE.Mesh(legGeometry, furMaterial);
  frontLeftLeg.position.set(0.28, 0.18, -0.18);
  frontLeftLeg.castShadow = true;
  cat.add(frontLeftLeg);
  
  const frontRightLeg = new THREE.Mesh(legGeometry, furMaterial);
  frontRightLeg.position.set(0.28, 0.18, 0.18);
  frontRightLeg.castShadow = true;
  cat.add(frontRightLeg);
  
  // Back legs
  const backLeftLeg = new THREE.Mesh(legGeometry, furMaterial);
  backLeftLeg.position.set(-0.28, 0.18, -0.18);
  backLeftLeg.castShadow = true;
  cat.add(backLeftLeg);
  
  const backRightLeg = new THREE.Mesh(legGeometry, furMaterial);
  backRightLeg.position.set(-0.28, 0.18, 0.18);
  backRightLeg.castShadow = true;
  cat.add(backRightLeg);
  
  // === DETAILED PAWS ===
  const pawGeometry = new THREE.SphereGeometry(0.06, 12, 8);
  
  const paws = [
    { pos: [0.28, 0.06, -0.18] },
    { pos: [0.28, 0.06, 0.18] },
    { pos: [-0.28, 0.06, -0.18] },
    { pos: [-0.28, 0.06, 0.18] }
  ];
  
  paws.forEach(paw => {
    const pawMesh = new THREE.Mesh(pawGeometry, pawMaterial);
    pawMesh.position.set(...paw.pos);
    pawMesh.scale.set(1, 0.7, 1);
    pawMesh.castShadow = true;
    cat.add(pawMesh);
  });
  
  // === ELEGANT TAIL ===
  const tailGeometry = new THREE.CapsuleGeometry(0.04, 0.85, 6, 16);
  const tail = new THREE.Mesh(tailGeometry, furMaterial);
  tail.position.set(-0.65, 0.7, 0);
  tail.rotation.z = Math.PI * 0.35;
  tail.rotation.x = Math.PI * 0.12;
  tail.castShadow = true;
  cat.add(tail);
  
  // === WHISKERS ===
  const whiskerMaterial = new THREE.MeshBasicMaterial({ 
    color: 0x000000,
    transparent: true,
    opacity: 0.8
  });
  
  const whiskerGeometry = new THREE.CylinderGeometry(0.002, 0.002, 0.2, 4);
  
  // Left whiskers
  for (let i = 0; i < 3; i++) {
    const whisker = new THREE.Mesh(whiskerGeometry, whiskerMaterial);
    whisker.position.set(0.7, 0.6 + (i - 1) * 0.02, -0.05);
    whisker.rotation.z = Math.PI / 2;
    whisker.rotation.y = -Math.PI * 0.1;
    cat.add(whisker);
  }
  
  // Right whiskers
  for (let i = 0; i < 3; i++) {
    const whisker = new THREE.Mesh(whiskerGeometry, whiskerMaterial);
    whisker.position.set(0.7, 0.6 + (i - 1) * 0.02, 0.05);
    whisker.rotation.z = Math.PI / 2;
    whisker.rotation.y = Math.PI * 0.1;
    cat.add(whisker);
  }
  
  // === CHEST MARKING ===
  const chestGeometry = new THREE.SphereGeometry(0.15, 16, 12);
  const chestMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xFFFAF0,
    roughness: 0.8,
    metalness: 0.0,
    clearcoat: 0.1,
    sheen: 0.3
  });
  const chest = new THREE.Mesh(chestGeometry, chestMaterial);
  chest.position.set(0.18, 0.42, 0);
  chest.scale.set(1.3, 0.9, 1.1);
  cat.add(chest);
  
  // Position the entire cat
  cat.position.set(0, 0, 0);
  cat.scale.set(1.3, 1.3, 1.3);
  
  // Store animation references
  cat.userData = {
    animation: { active: false, type: '', startTime: 0, duration: 0, params: {} },
    originalPosition: cat.position.clone(),
    originalRotation: cat.rotation.clone(),
    modelAnimations: {},
    activeModelAnimation: null,
    // Store references for animations
    tail: tail,
    leftEar: leftEar,
    rightEar: rightEar,
    leftEye: leftEye,
    rightEye: rightEye,
    leftPupil: leftPupil,
    rightPupil: rightPupil
  };
  
  return cat;
}
