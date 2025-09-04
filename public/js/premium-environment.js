// Premium Environment 3D Scene - Apple Studio Inspired
// Professional office environment with Apple design standards

window.createPremiumEnvironment = function(scene, THREE) {
  console.log("[Premium Environment] Creating Apple-inspired studio environment...");
  
  const environmentGroup = new THREE.Group();
  environmentGroup.name = 'PremiumEnvironment';
  
  // === ADVANCED MATERIALS ===
  
  // Aluminum material (Apple signature)
  const aluminumMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xc0c0c0,
    roughness: 0.1,
    metalness: 0.9,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    envMapIntensity: 1.5
  });
  
  // Wood material (premium desk)
  const woodMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x8b4513,
    roughness: 0.3,
    metalness: 0.0,
    clearcoat: 0.8,
    clearcoatRoughness: 0.2
  });
  
  // Glass material (monitor screen)
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x000000,
    roughness: 0.05,
    metalness: 0.0,
    transmission: 0.9,
    thickness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02
  });
  
  // Ceramic white (Magic Mouse, AirPods)
  const ceramicMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.1,
    metalness: 0.0,
    clearcoat: 0.9,
    clearcoatRoughness: 0.05
  });
  
  // Carbon fiber (premium accents)
  const carbonMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x1a1a1a,
    roughness: 0.2,
    metalness: 0.7,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1
  });
  
  // === DESK CONSTRUCTION ===
  
  // Main desk surface
  const deskGeometry = new THREE.BoxGeometry(6, 0.1, 3);
  const desk = new THREE.Mesh(deskGeometry, woodMaterial);
  desk.position.set(2, 0.8, 0);
  desk.castShadow = true;
  desk.receiveShadow = true;
  environmentGroup.add(desk);
  
  // Desk legs (aluminum)
  const legGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.8, 16);
  
  const positions = [
    [-0.8, 0.4, -1.2], [2.8, 0.4, -1.2],
    [-0.8, 0.4, 1.2], [2.8, 0.4, 1.2]
  ];
  
  positions.forEach(pos => {
    const leg = new THREE.Mesh(legGeometry, aluminumMaterial);
    leg.position.set(pos[0], pos[1], pos[2]);
    leg.castShadow = true;
    environmentGroup.add(leg);
  });
  
  // === APPLE STUDIO DISPLAY ===
  
  // Monitor base (aluminum)
  const baseGeometry = new THREE.CylinderGeometry(0.8, 0.6, 0.3, 16);
  const monitorBase = new THREE.Mesh(baseGeometry, aluminumMaterial);
  monitorBase.position.set(2, 1.05, -0.5);
  monitorBase.castShadow = true;
  environmentGroup.add(monitorBase);
  
  // Monitor arm
  const armGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.2, 16);
  const monitorArm = new THREE.Mesh(armGeometry, aluminumMaterial);
  monitorArm.position.set(2, 1.8, -0.5);
  monitorArm.castShadow = true;
  environmentGroup.add(monitorArm);
  
  // Monitor screen bezel
  const screenBezelGeometry = new THREE.BoxGeometry(2.8, 1.8, 0.1);
  const screenBezel = new THREE.Mesh(screenBezelGeometry, aluminumMaterial);
  screenBezel.position.set(2, 2.4, -0.45);
  screenBezel.castShadow = true;
  environmentGroup.add(screenBezel);
  
  // Monitor screen
  const screenGeometry = new THREE.BoxGeometry(2.6, 1.6, 0.05);
  const screen = new THREE.Mesh(screenGeometry, glassMaterial);
  screen.position.set(2, 2.4, -0.4);
  environmentGroup.add(screen);
  
  // Screen glow effect
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0x4a90e2,
    transparent: true,
    opacity: 0.3
  });
  const glowGeometry = new THREE.BoxGeometry(2.7, 1.7, 0.06);
  const screenGlow = new THREE.Mesh(glowGeometry, glowMaterial);
  screenGlow.position.set(2, 2.4, -0.38);
  environmentGroup.add(screenGlow);
  
  // === MACBOOK PRO ===
  
  // MacBook base
  const laptopGeometry = new THREE.BoxGeometry(1.4, 0.08, 1.0);
  const laptop = new THREE.Mesh(laptopGeometry, aluminumMaterial);
  laptop.position.set(0.5, 0.89, 0.3);
  laptop.castShadow = true;
  environmentGroup.add(laptop);
  
  // MacBook screen
  const laptopScreenGeometry = new THREE.BoxGeometry(1.3, 0.05, 0.85);
  const laptopScreen = new THREE.Mesh(laptopScreenGeometry, carbonMaterial);
  laptopScreen.position.set(0.5, 1.3, 0.7);
  laptopScreen.rotation.x = -Math.PI / 8;
  laptopScreen.castShadow = true;
  environmentGroup.add(laptopScreen);
  
  // === MAGIC KEYBOARD ===
  
  const keyboardGeometry = new THREE.BoxGeometry(1.8, 0.06, 0.6);
  const keyboard = new THREE.Mesh(keyboardGeometry, aluminumMaterial);
  keyboard.position.set(2, 0.89, 0.8);
  keyboard.castShadow = true;
  environmentGroup.add(keyboard);
  
  // Individual keys
  for (let i = 0; i < 60; i++) {
    const keyGeometry = new THREE.BoxGeometry(0.08, 0.02, 0.08);
    const key = new THREE.Mesh(keyGeometry, ceramicMaterial);
    
    const row = Math.floor(i / 12);
    const col = i % 12;
    
    key.position.set(
      2 - 0.75 + (col * 0.125),
      0.92,
      0.5 + (row * 0.1)
    );
    key.castShadow = true;
    environmentGroup.add(key);
  }
  
  // === MAGIC MOUSE ===
  
  const mouseGeometry = new THREE.BoxGeometry(0.25, 0.08, 0.45);
  mouseGeometry.scale(1, 0.5, 1);
  const mouse = new THREE.Mesh(mouseGeometry, ceramicMaterial);
  mouse.position.set(3.5, 0.89, 0.5);
  mouse.castShadow = true;
  environmentGroup.add(mouse);
  
  // === MINIMALIST LAMP ===
  
  // Lamp base
  const lampBaseGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.05, 16);
  const lampBase = new THREE.Mesh(lampBaseGeometry, aluminumMaterial);
  lampBase.position.set(4.5, 0.87, -1);
  lampBase.castShadow = true;
  environmentGroup.add(lampBase);
  
  // Lamp arm
  const lampArmGeometry = new THREE.CylinderGeometry(0.02, 0.02, 1.5, 8);
  const lampArm = new THREE.Mesh(lampArmGeometry, aluminumMaterial);
  lampArm.position.set(4.5, 1.6, -1);
  lampArm.rotation.z = Math.PI / 6;
  lampArm.castShadow = true;
  environmentGroup.add(lampArm);
  
  // Lamp head
  const lampHeadGeometry = new THREE.SphereGeometry(0.15, 16, 12);
  const lampHead = new THREE.Mesh(lampHeadGeometry, aluminumMaterial);
  lampHead.position.set(5.2, 2.2, -1);
  lampHead.castShadow = true;
  environmentGroup.add(lampHead);
  
  // === AIRPODS PRO CASE ===
  
  const airpodsGeometry = new THREE.BoxGeometry(0.25, 0.15, 0.35);
  airpodsGeometry.scale(1, 0.7, 1);
  const airpods = new THREE.Mesh(airpodsGeometry, ceramicMaterial);
  airpods.position.set(1, 0.89, -0.8);
  airpods.castShadow = true;
  environmentGroup.add(airpods);
  
  // === COFFEE CUP ===
  
  const cupGeometry = new THREE.CylinderGeometry(0.15, 0.12, 0.2, 16);
  const cupMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.1,
    metalness: 0.0,
    clearcoat: 0.9
  });
  const cup = new THREE.Mesh(cupGeometry, cupMaterial);
  cup.position.set(0, 0.99, -0.8);
  cup.castShadow = true;
  environmentGroup.add(cup);
  
  // === BOOKS STACK ===
  
  const bookColors = [0x007aff, 0xff3b30, 0x34c759]; // Apple colors
  
  for (let i = 0; i < 3; i++) {
    const bookGeometry = new THREE.BoxGeometry(0.8, 0.05, 1.2);
    const bookMaterial = new THREE.MeshPhysicalMaterial({
      color: bookColors[i],
      roughness: 0.3,
      metalness: 0.0,
      clearcoat: 0.5
    });
    const book = new THREE.Mesh(bookGeometry, bookMaterial);
    book.position.set(4.5, 0.89 + (i * 0.06), 0.5);
    book.rotation.y = (i * 0.1) - 0.1;
    book.castShadow = true;
    environmentGroup.add(book);
  }
  
  // === MODERN PLANT ===
  
  // Pot
  const potGeometry = new THREE.CylinderGeometry(0.2, 0.15, 0.3, 16);
  const potMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x2c2c2c,
    roughness: 0.4,
    metalness: 0.0
  });
  const pot = new THREE.Mesh(potGeometry, potMaterial);
  pot.position.set(-0.5, 1.05, -0.8);
  pot.castShadow = true;
  environmentGroup.add(pot);
  
  // Plant stems
  const stemMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x228b22,
    roughness: 0.6,
    metalness: 0.0
  });
  
  for (let i = 0; i < 5; i++) {
    const stemGeometry = new THREE.CylinderGeometry(0.01, 0.015, 0.6, 8);
    const stem = new THREE.Mesh(stemGeometry, stemMaterial);
    stem.position.set(
      -0.5 + (Math.random() - 0.5) * 0.2,
      1.5,
      -0.8 + (Math.random() - 0.5) * 0.2
    );
    stem.rotation.z = (Math.random() - 0.5) * 0.5;
    environmentGroup.add(stem);
    
    // Leaves
    const leafGeometry = new THREE.SphereGeometry(0.1, 8, 6);
    leafGeometry.scale(2, 0.5, 1);
    const leaf = new THREE.Mesh(leafGeometry, stemMaterial);
    leaf.position.copy(stem.position);
    leaf.position.y += 0.3;
    leaf.rotation.z = Math.random() * Math.PI;
    environmentGroup.add(leaf);
  }
  
  // === POSITIONING ===
  environmentGroup.position.set(0, 0, 0);
  
  scene.add(environmentGroup);
  
  console.log("[Premium Environment] Apple-inspired studio environment created successfully!");
  return environmentGroup;
};

console.log("[Premium Environment] Module loaded successfully");
