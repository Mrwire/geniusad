// Premium Office Environment - Apple Design Standards
// Clean, minimalist, sophisticated with premium materials

export function createPremiumEnvironment(THREE, scene) {
  console.log("[PremiumEnv] Creating professional Apple-inspired environment");
  
  // === PREMIUM MATERIALS ===
  const materials = {
    // Aluminum - signature Apple material
    aluminum: new THREE.MeshPhysicalMaterial({
      color: 0xC0C0C0,
      roughness: 0.1,
      metalness: 0.9,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
      envMapIntensity: 1.0
    }),
    
    // White ceramic/glass
    ceramic: new THREE.MeshPhysicalMaterial({
      color: 0xFAFAFA,
      roughness: 0.05,
      metalness: 0.0,
      clearcoat: 0.9,
      clearcoatRoughness: 0.02,
      transmission: 0.1,
      thickness: 0.1
    }),
    
    // Wood - natural walnut
    wood: new THREE.MeshPhysicalMaterial({
      color: 0x8B4513,
      roughness: 0.8,
      metalness: 0.0,
      clearcoat: 0.3,
      clearcoatRoughness: 0.2,
      sheen: 0.1,
      sheenColor: 0x654321
    }),
    
    // Black carbon fiber
    carbon: new THREE.MeshPhysicalMaterial({
      color: 0x1a1a1a,
      roughness: 0.2,
      metalness: 0.8,
      clearcoat: 0.9,
      clearcoatRoughness: 0.05,
      envMapIntensity: 0.8
    }),
    
    // Screen material with emission
    screen: new THREE.MeshPhysicalMaterial({
      color: 0x000000,
      roughness: 0.02,
      metalness: 0.0,
      emissive: 0x1a1a2e,
      emissiveIntensity: 0.3,
      clearcoat: 0.95,
      clearcoatRoughness: 0.01
    })
  };
  
  // === PROFESSIONAL DESK ===
  // Apple-style minimalist desk
  const deskTop = new THREE.Mesh(
    new THREE.BoxGeometry(2.5, 0.08, 1.5),
    materials.wood
  );
  deskTop.position.set(0, 0, 0);
  deskTop.castShadow = true;
  deskTop.receiveShadow = true;
  scene.add(deskTop);
  
  // Desk legs - sleek aluminum
  const legPositions = [
    [-1.1, -0.45, -0.65], [1.1, -0.45, -0.65],
    [-1.1, -0.45, 0.65], [1.1, -0.45, 0.65]
  ];
  
  legPositions.forEach(pos => {
    const leg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.9, 16),
      materials.aluminum
    );
    leg.position.set(...pos);
    leg.castShadow = true;
    scene.add(leg);
  });
  
  // === APPLE STUDIO DISPLAY ===
  // Monitor base
  const monitorBase = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15, 0.2, 0.1, 16),
    materials.aluminum
  );
  monitorBase.position.set(-1, 0.05, 0);
  monitorBase.castShadow = true;
  scene.add(monitorBase);
  
  // Monitor arm
  const monitorArm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.03, 0.4, 12),
    materials.aluminum
  );
  monitorArm.position.set(-1, 0.25, 0);
  monitorArm.castShadow = true;
  scene.add(monitorArm);
  
  // Monitor screen
  const monitorScreen = new THREE.Mesh(
    new THREE.BoxGeometry(0.9, 0.6, 0.03),
    materials.screen
  );
  monitorScreen.position.set(-1, 0.5, 0);
  monitorScreen.castShadow = true;
  scene.add(monitorScreen);
  
  // Monitor bezel
  const monitorBezel = new THREE.Mesh(
    new THREE.BoxGeometry(0.95, 0.65, 0.025),
    materials.aluminum
  );
  monitorBezel.position.set(-1, 0.5, -0.005);
  monitorBezel.castShadow = true;
  scene.add(monitorBezel);
  
  // === MACBOOK PRO ===
  // Laptop base
  const laptopBase = new THREE.Mesh(
    new THREE.BoxGeometry(0.35, 0.02, 0.25),
    materials.aluminum
  );
  laptopBase.position.set(0.3, 0.05, 0.1);
  laptopBase.castShadow = true;
  scene.add(laptopBase);
  
  // Laptop screen
  const laptopScreen = new THREE.Mesh(
    new THREE.BoxGeometry(0.33, 0.22, 0.01),
    materials.carbon
  );
  laptopScreen.position.set(0.3, 0.16, -0.05);
  laptopScreen.rotation.x = -Math.PI * 0.15;
  laptopScreen.castShadow = true;
  scene.add(laptopScreen);
  
  // === MAGIC KEYBOARD ===
  const keyboard = new THREE.Mesh(
    new THREE.BoxGeometry(0.45, 0.015, 0.18),
    materials.aluminum
  );
  keyboard.position.set(0.5, 0.045, 0.35);
  keyboard.castShadow = true;
  scene.add(keyboard);
  
  // Keyboard keys
  const keyMaterial = materials.ceramic;
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 12; col++) {
      const key = new THREE.Mesh(
        new THREE.BoxGeometry(0.025, 0.008, 0.025),
        keyMaterial
      );
      key.position.set(
        0.35 + col * 0.028,
        0.055,
        0.28 + row * 0.03
      );
      key.castShadow = true;
      scene.add(key);
    }
  }
  
  // === MAGIC MOUSE ===
  const mouse = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.035, 0.08, 4, 8),
    materials.ceramic
  );
  mouse.position.set(0.8, 0.055, 0.35);
  mouse.rotation.z = Math.PI / 2;
  mouse.castShadow = true;
  scene.add(mouse);
  
  // === MINIMALIST LAMP ===
  // Lamp base
  const lampBase = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.1, 0.05, 16),
    materials.aluminum
  );
  lampBase.position.set(-0.8, 0.03, -0.6);
  lampBase.castShadow = true;
  scene.add(lampBase);
  
  // Lamp arm
  const lampArm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.015, 0.015, 0.6, 12),
    materials.aluminum
  );
  lampArm.position.set(-0.8, 0.35, -0.6);
  lampArm.castShadow = true;
  scene.add(lampArm);
  
  // Lamp head
  const lampHead = new THREE.Mesh(
    new THREE.ConeGeometry(0.08, 0.12, 16),
    materials.aluminum
  );
  lampHead.position.set(-0.8, 0.68, -0.6);
  lampHead.rotation.x = Math.PI;
  lampHead.castShadow = true;
  scene.add(lampHead);
  
  // Add lamp light
  const lampLight = new THREE.SpotLight(0xffffff, 0.8, 10, Math.PI / 6, 0.3);
  lampLight.position.set(-0.8, 0.65, -0.6);
  lampLight.target.position.set(0, 0, 0);
  lampLight.castShadow = true;
  lampLight.shadow.mapSize.width = 1024;
  lampLight.shadow.mapSize.height = 1024;
  scene.add(lampLight);
  scene.add(lampLight.target);
  
  // === AIRPODS PRO CASE ===
  const airpodsCase = new THREE.Mesh(
    new THREE.BoxGeometry(0.06, 0.025, 0.05),
    materials.ceramic
  );
  airpodsCase.position.set(0.1, 0.055, 0.35);
  airpodsCase.castShadow = true;
  scene.add(airpodsCase);
  
  // === COFFEE CUP ===
  const coffeeCup = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.035, 0.08, 16),
    materials.ceramic
  );
  coffeeCup.position.set(-0.3, 0.045, 0.5);
  coffeeCup.castShadow = true;
  scene.add(coffeeCup);
  
  // === PLANT (minimalist) ===
  const plantPot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.1, 0.12, 16),
    materials.ceramic
  );
  plantPot.position.set(0.9, 0.06, -0.5);
  plantPot.castShadow = true;
  scene.add(plantPot);
  
  // Plant leaves - modern geometric
  const leafMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x2d5a27,
    roughness: 0.6,
    metalness: 0.0,
    transmission: 0.1,
    thickness: 0.01
  });
  
  for (let i = 0; i < 6; i++) {
    const leaf = new THREE.Mesh(
      new THREE.PlaneGeometry(0.08, 0.15),
      leafMaterial
    );
    const angle = (i / 6) * Math.PI * 2;
    leaf.position.set(
      0.9 + Math.cos(angle) * 0.05,
      0.18 + Math.random() * 0.08,
      -0.5 + Math.sin(angle) * 0.05
    );
    leaf.rotation.y = angle;
    leaf.rotation.x = Math.PI * 0.1;
    scene.add(leaf);
  }
  
  // === BOOKS (Apple design books) ===
  const bookMaterials = [
    new THREE.MeshPhysicalMaterial({ color: 0x000000, roughness: 0.1, metalness: 0.0 }),
    new THREE.MeshPhysicalMaterial({ color: 0xFFFFFF, roughness: 0.1, metalness: 0.0 }),
    new THREE.MeshPhysicalMaterial({ color: 0x007AFF, roughness: 0.1, metalness: 0.0 })
  ];
  
  bookMaterials.forEach((material, i) => {
    const book = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.025, 0.25),
      material
    );
    book.position.set(-0.5, 0.05 + i * 0.025, 0.3);
    book.rotation.y = Math.random() * 0.1 - 0.05;
    book.castShadow = true;
    scene.add(book);
  });
  
  // === PREMIUM LIGHTING SETUP ===
  // Main ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);
  
  // Key light (window light simulation)
  const keyLight = new THREE.DirectionalLight(0xffffff, 0.8);
  keyLight.position.set(5, 8, 5);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 2048;
  keyLight.shadow.mapSize.height = 2048;
  keyLight.shadow.camera.near = 0.5;
  keyLight.shadow.camera.far = 50;
  keyLight.shadow.camera.left = -10;
  keyLight.shadow.camera.right = 10;
  keyLight.shadow.camera.top = 10;
  keyLight.shadow.camera.bottom = -10;
  scene.add(keyLight);
  
  // Fill light
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
  fillLight.position.set(-3, 4, -2);
  scene.add(fillLight);
  
  // Rim light
  const rimLight = new THREE.DirectionalLight(0xffffff, 0.2);
  rimLight.position.set(-5, 2, 5);
  scene.add(rimLight);
  
  console.log("[PremiumEnv] Professional Apple-inspired environment created");
}
