// GAMIUS Chat 3D Interactive Experience - THREE.JS VERSION
// Refactored for pure 3D isometric view

// Global variables for scene objects
let scene, camera, renderer, controls, cat, floor, interactionSphere;
let directionalLight, ambientLight;
const neonLights = [];
const neonColors = [0xff00ff, 0x00ffff, 0x00ff00, 0xffff00, 0xff0000, 0x0000ff]; // Magenta, Cyan, Green, Yellow, Red, Blue
let containerElementGlobal; // To store the container for potential cleanup
let animationFrameId; // To be able to cancel the animation frame
let onWindowResizeGlobal; // Store resize handler for removal

const CAT_BASE_Y = 0.5; // Assuming cat's pivot is at its base center for animations
let lastFrameTime = 0;
const targetFrameRate = 60;
const targetFrameTime = 1 / targetFrameRate;

const clock = new THREE.Clock(); // Clock for AnimationMixer
let animationMixer; // For GLTF animations

// Debug flags
const DEBUG_MODE = true; // Set to true for console logs and helpers

function logDebug(message, ...args) {
  if (DEBUG_MODE) {
    console.log(`[Gamius3D] ${message}`, ...args);
  }
}

// Load premium assets dynamically
async function loadPremiumAssets() {
  console.log("[Gamius3D] Loading premium assets...");
  
  try {
    // Reset flags
    window.premiumCatLoaded = false;
    window.premiumEnvironmentLoaded = false;
    window.premiumAssetsLoaded = false;
    
    // Load premium cat
    console.log("[Gamius3D] Fetching premium cat...");
    const catResponse = await fetch('/js/premium-cat.js');
    if (catResponse.ok) {
      const catScript = await catResponse.text();
      console.log("[Gamius3D] Executing premium cat script...");
      
      // Use Function constructor instead of eval for better scope handling
      const catFunction = new Function(catScript);
      catFunction();
      
      // Verify the function was created
      if (typeof window.createPremiumCat === 'function') {
        window.premiumCatLoaded = true;
        console.log("[Gamius3D] Premium cat loaded and verified successfully");
      } else {
        console.warn("[Gamius3D] Premium cat script executed but function not available");
      }
    } else {
      console.warn("[Gamius3D] Premium cat failed to load, status:", catResponse.status);
    }
    
    // Load premium environment
    console.log("[Gamius3D] Fetching premium environment...");
    const envResponse = await fetch('/js/premium-environment.js');
    if (envResponse.ok) {
      const envScript = await envResponse.text();
      console.log("[Gamius3D] Executing premium environment script...");
      
      // Use Function constructor instead of eval for better scope handling
      const envFunction = new Function(envScript);
      envFunction();
      
      // Verify the function was created
      if (typeof window.createPremiumEnvironment === 'function') {
        window.premiumEnvironmentLoaded = true;
        console.log("[Gamius3D] Premium environment loaded and verified successfully");
      } else {
        console.warn("[Gamius3D] Premium environment script executed but function not available");
      }
    } else {
      console.warn("[Gamius3D] Premium environment failed to load, status:", envResponse.status);
    }
    
    // Final verification
    window.premiumAssetsLoaded = window.premiumCatLoaded && window.premiumEnvironmentLoaded;
    
    console.log("[Gamius3D] Asset loading summary:");
    console.log("- Premium cat loaded:", window.premiumCatLoaded);
    console.log("- Premium environment loaded:", window.premiumEnvironmentLoaded);
    console.log("- All premium assets loaded:", window.premiumAssetsLoaded);
    
    // Add a small delay to ensure all scripts are properly initialized
    await new Promise(resolve => setTimeout(resolve, 100));
    
  } catch (error) {
    console.error("[Gamius3D] Error loading premium assets:", error);
    window.premiumAssetsLoaded = false;
    window.premiumCatLoaded = false;
    window.premiumEnvironmentLoaded = false;
  }
}

// Initialize a 3D scene with Three.js
async function initGamius3DEngine(containerId) {
  console.log("[Gamius3D] Initializing...");
  
  // Load premium assets first
  await loadPremiumAssets();
  
  // Get the container element
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`[Gamius3D] Container with id '${containerId}' not found.`);
    return;
  }
  
  // Store dimensions for calculations
  const sceneWidth = container.clientWidth;
  const sceneHeight = container.clientHeight;
  
  // Clear previous canvas if it exists (important for React reuse)
  const oldCanvas = container.querySelector('canvas');
  if (oldCanvas) {
    container.removeChild(oldCanvas);
  }
  
  // Stop any existing animation loop
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  
  // Create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0a0a); // Dark space background
  
  // Add subtle fog for depth
  scene.fog = new THREE.Fog(0x0a0a0a, 10, 50);
  
  // Create camera - isometric view
  camera = new THREE.PerspectiveCamera(45, sceneWidth / sceneHeight, 0.1, 1000);
  camera.position.set(8, 8, 8);
  camera.lookAt(0, 0, 0);
  
  // Create renderer
  renderer = new THREE.WebGLRenderer({ 
    antialias: true, 
    alpha: true,
    powerPreference: "high-performance"
  });
  renderer.setSize(sceneWidth, sceneHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.outputEncoding = THREE.sRGBEncoding;
  
  // Add renderer to container
  container.appendChild(renderer.domElement);
  containerElementGlobal = container;
  
  // Create controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = true;
  controls.enableRotate = true;
  controls.enablePan = true;
  controls.maxDistance = 20;
  controls.minDistance = 3;
  
  // Create scene elements
  setupLighting();
  createZelligeFloor();
  createCat();
  createInteractionSphere();
  createImmersiveEnvironment();
  setupInteraction(container);
  
  // Handle window resize
  // Store the resize handler to remove it later
  onWindowResizeGlobal = () => {
    if (camera && renderer) {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }
  };
  window.addEventListener('resize', onWindowResizeGlobal);
  
  // Handle visibility change for performance
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && renderer) {
      renderer.setAnimationLoop(animate);
    } else if (renderer) {
      renderer.setAnimationLoop(null);
    }
  });
  
  // Start the animation loop
  animate();
  
  logDebug('Gamius3D initialized successfully');
}

// Setup lighting for the scene
function setupLighting() {
  ambientLight = new THREE.AmbientLight(0x404040, 1.5); // Increased intensity a bit
  scene.add(ambientLight);
  
  directionalLight = new THREE.DirectionalLight(0xffffff, 1.5); // Increased intensity
  directionalLight.position.set(5, 10, 7);
  directionalLight.castShadow = true;
  directionalLight.shadow.camera.near = 0.1;
  directionalLight.shadow.camera.far = 100; // Adjusted far plane
  directionalLight.shadow.mapSize.width = 1024; // Shadow map quality
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.left = -15; // Adjusted shadow frustum
  directionalLight.shadow.camera.right = 15;
  directionalLight.shadow.camera.top = 15;
  directionalLight.shadow.camera.bottom = -15;
  scene.add(directionalLight);
  
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const x = Math.sin(angle) * 8;
    const z = Math.cos(angle) * 8;
    const pointLight = new THREE.PointLight(neonColors[i % neonColors.length], 2, 15, 2);
    pointLight.position.set(x, 0.2, z);
    scene.add(pointLight);
    neonLights.push(pointLight);
  }
}

// === PREMIUM ASSETS INTEGRATION ===
// Load premium cat and environment assets
let premiumCatModule = null;
let premiumEnvironmentModule = null;

// Create cat with premium assets or fallback
function createCat() {
  console.log("[Gamius3D] createCat called");
  
  // Try premium cat first
  if (window.premiumCatLoaded && window.createPremiumCat) {
    try {
      cat = window.createPremiumCat(scene, THREE);
      
      // Setup animation data for premium cat
      if (cat && !cat.userData) {
        cat.userData = {
          animation: { active: false, type: '', startTime: 0, duration: 0, params: {} },
          originalPosition: cat.position.clone(),
          originalRotation: cat.rotation.clone(),
          modelAnimations: {},
          activeModelAnimation: null
        };
      }
      
      console.log("[Gamius3D] Premium cat created successfully");
      return;
    } catch (error) {
      console.warn("[Gamius3D] Premium cat creation failed:", error);
    }
  }
  
  // Try GLB model fallback
  createCatFromGLB();
}

// Modified environment creation to use premium assets
function createImmersiveEnvironment() {
  console.log("[Gamius3D] createImmersiveEnvironment called");
  
  // Try premium environment first
  if (window.premiumEnvironmentLoaded && window.createPremiumEnvironment) {
    try {
      const environment = window.createPremiumEnvironment(scene, THREE);
      console.log("[Gamius3D] Premium environment created successfully");
      return;
    } catch (error) {
      console.warn("[Gamius3D] Premium environment creation failed:", error);
    }
  }
  
  // Fallback to basic environment
  createBasicOfficeEnvironment();
}

function createZelligeFloor() {
  console.log("[Gamius3D] createZelligeFloor called");
  const textureCanvas = document.createElement('canvas');
  textureCanvas.width = 128;
  textureCanvas.height = 128;
  const context = textureCanvas.getContext('2d');
  const squareSize = 32;
  for (let i = 0; i < textureCanvas.width / squareSize; i++) {
    for (let j = 0; j < textureCanvas.height / squareSize; j++) {
      context.fillStyle = (i + j) % 2 === 0 ? '#3D3D3D' : '#5A5A5A'; // Darker and lighter grey tiles
      context.fillRect(i * squareSize, j * squareSize, squareSize, squareSize);
    }
  }
  const floorTexture = new THREE.CanvasTexture(textureCanvas);
  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(8, 8); // Repeat the 128x128 texture 8 times over the 16x16 plane

  const geometry = new THREE.PlaneGeometry(16, 16);
  const material = new THREE.MeshStandardMaterial({
    map: floorTexture,
    side: THREE.DoubleSide,
    metalness: 0.1,
    roughness: 0.9
  });
  floor = new THREE.Mesh(geometry, material);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.05;
  floor.receiveShadow = true;
  scene.add(floor);
}

// Try GLB model fallback
function createCatFromGLB() {
  logDebug("Attempting to load GLB cat models...");
  
  // Import GLTFLoader
  import('https://cdn.skypack.dev/three@0.152.2/examples/jsm/loaders/GLTFLoader.js')
    .then(({ GLTFLoader }) => {
      const loader = new GLTFLoader();
      
      // Try toon_cat_free.glb first (most promising for animations)
      loader.load(
        '/item_images/toon_cat_free.glb',
        function (gltf) {
          console.log('🐱 Toon cat GLB loaded successfully!', gltf);
          
          cat = gltf.scene;
          cat.name = 'ToronCat';
          cat.position.set(0, CAT_BASE_Y, 0);
          cat.scale.set(0.8, 0.8, 0.8); // Scale appropriately
          
          // Setup animation mixer if animations exist
          if (gltf.animations && gltf.animations.length > 0) {
            animationMixer = new THREE.AnimationMixer(cat);
            
            // Store all animations for later use
            window.catAnimations = {};
            gltf.animations.forEach((clip, index) => {
              const action = animationMixer.clipAction(clip);
              window.catAnimations[clip.name || `animation_${index}`] = action;
              console.log(`🎭 Found animation: ${clip.name || `animation_${index}`}`);
            });
            
            // Play a default idle animation if available
            const idleAnimation = window.catAnimations['idle'] || window.catAnimations['Idle'] || 
                                 window.catAnimations['animation_0'];
            if (idleAnimation) {
              idleAnimation.play();
              console.log('🎭 Playing default idle animation');
            }
          }
          
          // Improve materials for realistic look
          cat.traverse((child) => {
            if (child.isMesh) {
              // Enhance existing materials
              if (child.material) {
                child.material.roughness = 0.6;
                child.material.metalness = 0.1;
                
                // Add fur-like properties
                if (child.material.name && child.material.name.toLowerCase().includes('fur')) {
                  child.material.roughness = 0.8;
                  child.material.metalness = 0.0;
                }
                
                // Make eyes more realistic
                if (child.material.name && child.material.name.toLowerCase().includes('eye')) {
                  child.material.roughness = 0.1;
                  child.material.metalness = 0.0;
                  child.material.transmission = 0.2;
                }
              }
              
              // Enable shadows
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
          
          // Add subtle breathing animation
          const breathingAnimation = () => {
            const time = Date.now() * 0.001;
            const breathScale = 1 + Math.sin(time * 2) * 0.02; // Subtle breathing
            cat.scale.y = 0.8 * breathScale;
          };
          
          // Store breathing function for animation loop
          window.catBreathingAnimation = breathingAnimation;
          
          scene.add(cat);
          console.log('🐱 Realistic GLB cat added to scene with animations!');
        },
        function (progress) {
          console.log('🐱 Loading GLB progress:', (progress.loaded / progress.total * 100) + '%');
        },
        function (error) {
          console.warn('🐱 Toon cat GLB failed, falling back to procedural cat...', error);
          createPrimitiveCat();
        }
      );
    })
    .catch(error => {
      console.warn('🐱 GLTFLoader import failed, falling back to procedural cat...', error);
      createPremiumCatOrFallback();
    });
}

// Fallback function to create a realistic detailed cat with procedural modeling
function createPrimitiveCat() {
  console.log("[Gamius3D] createPrimitiveCat called - creating detailed realistic cat");
  
  cat = new THREE.Group(); 
  
  // Realistic cat materials
  const furMaterial = new THREE.MeshLambertMaterial({
    color: 0x8B4513, // Brown fur
    roughness: 0.8,
    metalness: 0.0
  });
  
  const pinkMaterial = new THREE.MeshLambertMaterial({
    color: 0xFFB6C1, // Light pink for nose and paws
    roughness: 0.7,
    metalness: 0.0
  });
  
  const blackMaterial = new THREE.MeshLambertMaterial({
    color: 0x222222, // Dark for eyes and whiskers
    roughness: 0.3,
    metalness: 0.1
  });
  
  const whiteMaterial = new THREE.MeshLambertMaterial({
    color: 0xFFFFF0, // Off-white for chest/belly
    roughness: 0.8,
    metalness: 0.0
  });
  
  // === CAT BODY ===
  const bodyGeometry = new THREE.CapsuleGeometry(0.3, 0.6, 8, 16);
  const body = new THREE.Mesh(bodyGeometry, furMaterial);
  body.position.set(0, 0.4, 0);
  body.rotation.z = Math.PI / 2; // Horizontal body
  body.castShadow = true;
  body.receiveShadow = true;
  cat.add(body);
  
  // === CAT HEAD ===
  const headGeometry = new THREE.SphereGeometry(0.25, 16, 16);
  const head = new THREE.Mesh(headGeometry, furMaterial);
  head.position.set(0.45, 0.5, 0);
  head.scale.set(1, 0.9, 1.1); // Slightly flattened and elongated
  head.castShadow = true;
  head.receiveShadow = true;
  cat.add(head);
  
  // === EARS ===
  const earGeometry = new THREE.ConeGeometry(0.08, 0.15, 6);
  const leftEar = new THREE.Mesh(earGeometry, furMaterial);
  leftEar.position.set(0.55, 0.68, -0.12);
  leftEar.rotation.x = Math.PI * 0.1;
  leftEar.castShadow = true;
  cat.add(leftEar);
  
  const rightEar = new THREE.Mesh(earGeometry, furMaterial);
  rightEar.position.set(0.55, 0.68, 0.12);
  rightEar.rotation.x = Math.PI * 0.1;
  rightEar.castShadow = true;
  cat.add(rightEar);
  
  // === EYES ===
  const eyeGeometry = new THREE.SphereGeometry(0.04, 8, 8);
  const leftEye = new THREE.Mesh(eyeGeometry, blackMaterial);
  leftEye.position.set(0.62, 0.55, -0.08);
  cat.add(leftEye);
  
  const rightEye = new THREE.Mesh(eyeGeometry, blackMaterial);
  rightEye.position.set(0.62, 0.55, 0.08);
  cat.add(rightEye);
  
  // === NOSE ===
  const noseGeometry = new THREE.SphereGeometry(0.02, 6, 6);
  const nose = new THREE.Mesh(noseGeometry, pinkMaterial);
  nose.position.set(0.68, 0.48, 0);
  cat.add(nose);
  
  // === LEGS ===
  const legGeometry = new THREE.CylinderGeometry(0.04, 0.06, 0.3, 8);
  
  // Front legs
  const frontLeftLeg = new THREE.Mesh(legGeometry, furMaterial);
  frontLeftLeg.position.set(0.25, 0.15, -0.15);
  frontLeftLeg.castShadow = true;
  cat.add(frontLeftLeg);
  
  const frontRightLeg = new THREE.Mesh(legGeometry, furMaterial);
  frontRightLeg.position.set(0.25, 0.15, 0.15);
  frontRightLeg.castShadow = true;
  cat.add(frontRightLeg);
  
  // Back legs  
  const backLeftLeg = new THREE.Mesh(legGeometry, furMaterial);
  backLeftLeg.position.set(-0.25, 0.15, -0.15);
  backLeftLeg.castShadow = true;
  cat.add(backLeftLeg);
  
  const backRightLeg = new THREE.Mesh(legGeometry, furMaterial);
  backRightLeg.position.set(-0.25, 0.15, 0.15);
  backRightLeg.castShadow = true;
  cat.add(backRightLeg);
  
  // === PAWS ===
  const pawGeometry = new THREE.SphereGeometry(0.05, 8, 6);
  
  const frontLeftPaw = new THREE.Mesh(pawGeometry, pinkMaterial);
  frontLeftPaw.position.set(0.25, 0.05, -0.15);
  cat.add(frontLeftPaw);
  
  const frontRightPaw = new THREE.Mesh(pawGeometry, pinkMaterial);
  frontRightPaw.position.set(0.25, 0.05, 0.15);
  cat.add(frontRightPaw);
  
  const backLeftPaw = new THREE.Mesh(pawGeometry, pinkMaterial);
  backLeftPaw.position.set(-0.25, 0.05, -0.15);
  cat.add(backLeftPaw);
  
  const backRightPaw = new THREE.Mesh(pawGeometry, pinkMaterial);
  backRightPaw.position.set(-0.25, 0.05, 0.15);
  cat.add(backRightPaw);
  
  // === TAIL ===
  const tailGeometry = new THREE.CylinderGeometry(0.03, 0.08, 0.8, 8);
  const tail = new THREE.Mesh(tailGeometry, furMaterial);
  tail.position.set(-0.6, 0.6, 0);
  tail.rotation.z = Math.PI * 0.3; // Curved upward
  tail.rotation.x = Math.PI * 0.1;
  tail.castShadow = true;
  cat.add(tail);
  
  // === CHEST PATCH (white) ===
  const chestGeometry = new THREE.SphereGeometry(0.12, 12, 8);
  const chest = new THREE.Mesh(chestGeometry, whiteMaterial);
  chest.position.set(0.15, 0.35, 0);
  chest.scale.set(1.2, 0.8, 1);
  cat.add(chest);
  
  // Position and setup cat
  cat.position.set(0, CAT_BASE_Y, 0);
  cat.scale.set(1.2, 1.2, 1.2); // Scale up the detailed cat
  
  // Initialize userData for animations
  cat.userData = {
    animation: { active: false, type: '', startTime: 0, duration: 0, params: {} },
    originalPosition: cat.position.clone(),
    originalRotation: cat.rotation.clone(),
    modelAnimations: {},
    activeModelAnimation: null,
    // Store references to animated parts
    tail: tail,
    leftEar: leftEar,
    rightEar: rightEar,
    leftEye: leftEye,
    rightEye: rightEye
  };
  
  scene.add(cat);
  logDebug('Detailed realistic cat created and added to scene.');
}

function createInteractionSphere() {
  console.log("[Gamius3D] createInteractionSphere called");
  const geometry = new THREE.SphereGeometry(0.4, 16, 16);
  const material = new THREE.MeshStandardMaterial({ 
    color: 0xFFFF00, // Yellow
    metalness: 0.3,
    roughness: 0.4,
    transparent: true, 
    opacity: 0.7 
  });
  interactionSphere = new THREE.Mesh(geometry, material);
  interactionSphere.position.set(1.5, 0.4, 1.5); // Position it near the cat
  interactionSphere.castShadow = true;
  scene.add(interactionSphere);
}

let raycaster, mouse;

function setupInteraction(containerElement) {
  console.log("[Gamius3D] setupInteraction called", containerElement);
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  containerElement.addEventListener('click', onMouseClick3D, false);
}

function onMouseClick3D(event) {
  // Calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  // Update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);

  // Collect objects to check for intersection
  const objectsToIntersect = [];
  if (cat) objectsToIntersect.push(cat); // Raycast against the group
  if (interactionSphere) objectsToIntersect.push(interactionSphere);

  // Calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(objectsToIntersect, true); // true for recursive check

  if (intersects.length > 0) {
    const firstIntersectedObject = intersects[0].object;
    
    // Check if the cat or any of its children were clicked
    let clickedCat = false;
    if (cat && firstIntersectedObject.uuid === cat.uuid) { // Clicked the group itself (less likely)
        clickedCat = true;
    } else if (cat) { // Check if a child of the cat group was clicked
        cat.traverse((child) => {
            if (child.uuid === firstIntersectedObject.uuid) {
                clickedCat = true;
            }
        });
    }

    if (clickedCat) {
      console.log('[Gamius3D] Cat clicked!');
      triggerGamiusAnimation('reaction_excited_bounce');
    } else if (interactionSphere && firstIntersectedObject.uuid === interactionSphere.uuid) {
      console.log('[Gamius3D] Interaction Sphere clicked!');
      // Optionally trigger an animation or effect for the sphere
      if (interactionSphere.material.emissive) { // Example: make it flash
        const originalEmissive = interactionSphere.material.emissive.getHex();
        interactionSphere.material.emissive.setHex(0xff0000);
        setTimeout(() => {
            interactionSphere.material.emissive.setHex(originalEmissive);
        }, 200);
      }
    } else {
      console.log('[Gamius3D] Clicked on an object, but not the cat or sphere directly.', firstIntersectedObject);
    }
  } else {
    console.log('[Gamius3D] Clicked on empty space.');
  }
}

// Global function to trigger animations on the 3D cat
function triggerGamiusAnimation(animationName) {
  if (!cat) {
    console.warn('[Gamius3D] No cat object available for animation');
    return;
  }

  logDebug(`Triggering animation: ${animationName}`);

  // Stop any currently running animation
  if (cat.userData && cat.userData.animation && cat.userData.animation.active) {
    cat.userData.animation.active = false;
  }

  // For GLB models with animations
  if (window.catAnimations && window.catAnimations[animationName]) {
    // Stop all current animations
    Object.values(window.catAnimations).forEach(action => {
      action.stop();
    });
    
    // Play the requested animation
    const action = window.catAnimations[animationName];
    action.reset().play();
    
    console.log(`🎭 Playing GLB animation: ${animationName}`);
    return;
  }

  // Enhanced animation mapping for better cat behaviors
  const animationMap = {
    'idle': () => performCatAnimation('idle'),
    'idle_curious': () => performCatAnimation('curious'),
    'idle_curious_slight_bounce': () => performCatAnimation('bounce'),
    'intro_mysterious_beckon': () => performCatAnimation('mysterious'),
    'reaction_excited_gesture': () => performCatAnimation('excited'),
    'reaction_excited_bounce': () => performCatAnimation('excited_bounce'),
    'reaction_happy_purr': () => performCatAnimation('happy'),
    'reaction_wise_nod': () => performCatAnimation('nod'),
    'idle_storytelling_stance': () => performCatAnimation('storytelling'),
    'idle_inviting_gesture': () => performCatAnimation('inviting'),
    'reaction_calm_knowing': () => performCatAnimation('calm'),
  };

  if (animationMap[animationName]) {
    animationMap[animationName]();
  } else {
    console.warn(`[Gamius3D] Unknown animation: ${animationName}, defaulting to idle`);
    performCatAnimation('idle');
  }
}

// Enhanced cat animation function
function performCatAnimation(type) {
  if (!cat) return;

  // Initialize userData if not present
  if (!cat.userData) {
    cat.userData = {
      animation: { active: false, type: '', startTime: 0, duration: 0, params: {} },
      originalPosition: cat.position.clone(),
      originalRotation: cat.rotation.clone()
    };
  }

  // Stop current animation
  cat.userData.animation.active = false;

  const animations = {
    idle: { duration: 3000, bounce: 0.02, speed: 2 },
    curious: { duration: 2000, tilt: 0.3, speed: 3 },
    bounce: { duration: 1500, bounce: 0.1, speed: 4 },
    mysterious: { duration: 2500, sway: 0.2, speed: 1.5 },
    excited: { duration: 2000, bounce: 0.15, rotate: 0.5, speed: 5 },
    excited_bounce: { duration: 1800, bounce: 0.2, speed: 6 },
    happy: { duration: 3000, purr: true, bounce: 0.05, speed: 2.5 },
    nod: { duration: 1500, nod: 0.4, speed: 3 },
    storytelling: { duration: 4000, gesture: true, speed: 1.5 },
    inviting: { duration: 2500, extend: 0.1, speed: 2 },
    calm: { duration: 3500, sway: 0.1, speed: 1 }
  };

  const anim = animations[type] || animations.idle;
  
  cat.userData.animation = {
    active: true,
    type: type,
    startTime: Date.now(),
    duration: anim.duration,
    params: anim
  };

  logDebug(`Started ${type} animation for ${anim.duration}ms`);
}

function cleanupGamius3DEngine() {
  logDebug('cleanupGamius3DEngine called');
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
    logDebug('Animation loop stopped.');
  }

  // Remove event listeners
  window.removeEventListener('resize', onWindowResizeGlobal);
  if (containerElementGlobal) {
    containerElementGlobal.removeEventListener('click', onMouseClick3D);
    logDebug('Event listeners removed.');
  }

  // Dispose of Three.js objects
  if (scene) {
    // Traverse and dispose geometries, materials, textures
    scene.traverse(object => {
      if (object.geometry) object.geometry.dispose();
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach(material => material.dispose());
        } else {
          object.material.dispose();
        }
      }
      if (object.texture) object.texture.dispose();
    });
    scene.clear(); // Removes all children
    logDebug('Scene objects disposed.');
  }

  if (renderer) {
    renderer.dispose();
    renderer.domElement = null; // Help GC
    renderer = null;
    logDebug('Renderer disposed.');
  }
  
  // Nullify major variables
  scene = null; camera = null; controls = null; cat = null; floor = null; interactionSphere = null;
  directionalLight = null; ambientLight = null; animationMixer = null;
  neonLights.length = 0;
  containerElementGlobal = null;
  raycaster = null; mouse = null;
  logDebug('Global variables nullified.');
  console.log('[Gamius3D] Engine cleaned up.');
}

// Expose necessary functions to the global scope
window.initGamius3DEngine = initGamius3DEngine;
window.triggerGamiusAnimation = triggerGamiusAnimation;
window.cleanupGamius3DEngine = cleanupGamius3DEngine; // Expose cleanup function

console.log("[Gamius3D] gamius-chat-3d.js script loaded and ready.");

// Animation loop function
function animate() {
  const currentTime = performance.now();
  
  // Control frame rate
  if (currentTime - lastFrameTime >= targetFrameTime * 1000) {
    lastFrameTime = currentTime;
    
    // Update GLB animation mixer
    if (animationMixer) {
      const delta = clock.getDelta();
      animationMixer.update(delta);
    }
    
    // Update breathing animation if available
    if (window.catBreathingAnimation && cat) {
      window.catBreathingAnimation();
    }
    
    // Update procedural animations
    if (cat && cat.userData && cat.userData.animation && cat.userData.animation.active) {
      const { animation } = cat.userData;
      const elapsed = Date.now() - animation.startTime;
      const progress = Math.min(elapsed / animation.duration, 1);
      
      // Apply animation based on type
      updateCatAnimation(animation, progress);
      
      // End animation if complete
      if (progress >= 1 && !animation.params.loop) {
        animation.active = false;
        // Reset cat to original position/rotation
        if (cat.userData.originalPosition) {
          cat.position.copy(cat.userData.originalPosition);
          cat.rotation.copy(cat.userData.originalRotation);
        }
      }
    }
    
    // Animate neon lights
    const time = currentTime * 0.001;
    neonLights.forEach((light, index) => {
      light.intensity = 0.8 + 0.4 * Math.sin(time * 2 + index);
    });
    
    // Update controls if available
    if (controls) {
      controls.update();
    }
    
    // Render the scene
    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
  }
  
  // Continue animation loop
  animationFrameId = requestAnimationFrame(animate);
}

// Enhanced animation update function
function updateCatAnimation(animation, progress) {
  if (!cat || !animation.params) return;
  
  const { type, params } = animation;
  const time = Date.now() * 0.001;
  
  switch (type) {
    case 'idle':
      // Gentle idle movement
      cat.position.y = CAT_BASE_Y + Math.sin(time * params.speed) * params.bounce;
      break;
      
    case 'curious':
      // Head tilt and slight movement
      cat.rotation.z = Math.sin(time * params.speed) * params.tilt;
      cat.position.y = CAT_BASE_Y + Math.sin(time * params.speed * 1.5) * 0.03;
      break;
      
    case 'bounce':
      // Energetic bouncing
      cat.position.y = CAT_BASE_Y + Math.abs(Math.sin(time * params.speed)) * params.bounce;
      break;
      
    case 'mysterious':
      // Swaying motion
      cat.position.x = Math.sin(time * params.speed) * params.sway;
      cat.rotation.y = Math.sin(time * params.speed * 0.7) * 0.1;
      break;
      
    case 'excited':
      // Bouncing with rotation
      cat.position.y = CAT_BASE_Y + Math.abs(Math.sin(time * params.speed)) * params.bounce;
      cat.rotation.y = Math.sin(time * params.speed * 1.2) * params.rotate;
      break;
      
    case 'excited_bounce':
      // High energy bouncing
      cat.position.y = CAT_BASE_Y + Math.abs(Math.sin(time * params.speed)) * params.bounce;
      cat.scale.setScalar(0.8 + Math.sin(time * params.speed * 2) * 0.05);
      break;
      
    case 'happy':
      // Gentle purring motion
      cat.position.y = CAT_BASE_Y + Math.sin(time * params.speed) * params.bounce;
      if (params.purr) {
        cat.scale.setScalar(0.8 + Math.sin(time * 8) * 0.01); // Quick purr vibration
      }
      break;
      
    case 'nod':
      // Nodding motion
      cat.rotation.x = Math.sin(time * params.speed) * params.nod;
      break;
      
    case 'storytelling':
      // Gesturing motion
      if (params.gesture) {
        cat.position.x = Math.sin(time * params.speed) * 0.05;
        cat.rotation.y = Math.sin(time * params.speed * 0.8) * 0.2;
      }
      break;
      
    case 'inviting':
      // Extending forward
      cat.position.z = Math.sin(time * params.speed) * params.extend;
      cat.rotation.x = Math.sin(time * params.speed * 1.5) * 0.1;
      break;
      
    case 'calm':
      // Gentle swaying
      cat.position.x = Math.sin(time * params.speed) * params.sway;
      cat.position.y = CAT_BASE_Y + Math.sin(time * params.speed * 0.7) * 0.02;
      break;
  }
}

// Renamed original environment function
function createBasicOfficeEnvironment() {
  console.log("[Gamius3D] Creating basic office environment");
  
  // === OFFICE DESK ===
  const deskGeometry = new THREE.BoxGeometry(2, 0.1, 1.2);
  const deskMaterial = new THREE.MeshLambertMaterial({ 
    color: 0x8B4513, // Wood brown
    roughness: 0.8 
  });
  const desk = new THREE.Mesh(deskGeometry, deskMaterial);
  desk.position.set(0, -0.05, 0);
  desk.receiveShadow = true;
  desk.castShadow = true;
  scene.add(desk);
  
  // === DESK LEGS ===
  const legGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.8, 8);
  const legMaterial = new THREE.MeshLambertMaterial({ color: 0x654321 });
  
  const positions = [
    [-0.8, -0.4, -0.5], [0.8, -0.4, -0.5],
    [-0.8, -0.4, 0.5], [0.8, -0.4, 0.5]
  ];
  
  positions.forEach(pos => {
    const leg = new THREE.Mesh(legGeometry, legMaterial);
    leg.position.set(...pos);
    leg.castShadow = true;
    scene.add(leg);
  });
  
  // === MONITOR (behind cat) ===
  const monitorGeometry = new THREE.BoxGeometry(0.8, 0.5, 0.05);
  const monitorMaterial = new THREE.MeshLambertMaterial({ 
    color: 0x1a1a1a,
    emissive: 0x0066cc,
    emissiveIntensity: 0.1
  });
  const monitor = new THREE.Mesh(monitorGeometry, monitorMaterial);
  monitor.position.set(-1.2, 0.4, 0);
  monitor.castShadow = true;
  scene.add(monitor);
  
  // === OFFICE PLANT ===
  const potGeometry = new THREE.CylinderGeometry(0.12, 0.15, 0.2, 8);
  const potMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
  const pot = new THREE.Mesh(potGeometry, potMaterial);
  pot.position.set(0.8, 0.1, -0.4);
  pot.castShadow = true;
  scene.add(pot);
  
  // Plant leaves
  const leafGeometry = new THREE.SphereGeometry(0.08, 6, 6);
  const leafMaterial = new THREE.MeshLambertMaterial({ color: 0x228B22 });
  
  for (let i = 0; i < 5; i++) {
    const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
    const angle = (i / 5) * Math.PI * 2;
    leaf.position.set(
      0.8 + Math.cos(angle) * 0.1,
      0.25 + Math.random() * 0.1,
      -0.4 + Math.sin(angle) * 0.1
    );
    leaf.scale.set(1, 1.5, 0.3);
    scene.add(leaf);
  }
  
  // === COFFEE MUG ===
  const mugGeometry = new THREE.CylinderGeometry(0.06, 0.05, 0.12, 8);
  const mugMaterial = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
  const mug = new THREE.Mesh(mugGeometry, mugMaterial);
  mug.position.set(0.6, 0.06, 0.3);
  mug.castShadow = true;
  scene.add(mug);
  
  // === KEYBOARD ===
  const keyboardGeometry = new THREE.BoxGeometry(0.4, 0.02, 0.15);
  const keyboardMaterial = new THREE.MeshLambertMaterial({ color: 0x2C2C2C });
  const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
  keyboard.position.set(0.3, 0.01, 0.2);
  keyboard.castShadow = true;
  scene.add(keyboard);
  
  // === BOOKS STACK ===
  const bookColors = [0x8B0000, 0x006400, 0x000080];
  bookColors.forEach((color, i) => {
    const bookGeometry = new THREE.BoxGeometry(0.15, 0.03, 0.2);
    const bookMaterial = new THREE.MeshLambertMaterial({ color });
    const book = new THREE.Mesh(bookGeometry, bookMaterial);
    book.position.set(-0.7, 0.05 + i * 0.03, 0.3);
    book.rotation.y = Math.random() * 0.2 - 0.1;
    book.castShadow = true;
    scene.add(book);
  });
  
  logDebug('Basic office environment created.');
}