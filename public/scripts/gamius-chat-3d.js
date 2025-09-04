// public/scripts/gamius-chat-3d.js

console.log('Gamius 3D Chat Engine Script Loaded');

// Placeholder pour l'instance du moteur 3D ou les variables de scène
let gamiusEngine = null;
let gamiusScene = null; // ou équivalent selon la librairie 3D
let gamiusCharacter = null; // Référence au modèle 3D de Gamius Cat

// Liste des animations reconnues (pourrait être étendue)
// Initialement, nous allons juste logger le cue.
// Plus tard, cela pourrait mapper les cues à des fonctions d'animation spécifiques.
const knownAnimations = {
  // Cues existants (exemples)
  'intro_confused_searching': () => console.log('Animation: Gamius regarde autour de lui, confus.'),
  'attentive_listening': () => console.log('Animation: Gamius écoute attentivement.'),
  'reaction_thoughtful_nod': () => console.log('Animation: Gamius hoche la tête pensivement.'),
  'reaction_surprised_perk': () => console.log('Animation: Gamius est surpris, oreilles dressées.'),
  'reaction_calm_knowing': () => console.log('Animation: Gamius a un air calme et entendu.'),
  'emotion_reflective_soft': () => console.log('Animation: Gamius est pensif, doux regard.'),
  'idle_curious_focused': () => console.log('Animation: Gamius est curieux et concentré.'),
  'emotion_energized_slightbounce': () => console.log('Animation: Gamius est énergique, léger rebond.'),
  'idle_eager_slightlean': () => console.log('Animation: Gamius se penche en avant, impatient.'),
  'emotion_wise_still': () => console.log('Animation: Gamius est sage et immobile.'),
  'attentive_listening_soft': () => console.log('Animation: Gamius écoute attentivement, plus doux.'),
  'reaction_happy_purr': () => console.log('Animation: Gamius ronronne de plaisir.'),
  'reaction_confused_headshake': () => console.log('Animation: Gamius secoue la tête, confus.'),
  'idle_processing_subtle': () => console.log('Animation: Gamius traite l\'information.'),
  'idle_curious': () => console.log('Animation: Gamius est curieux (état par défaut).'),
  'idle_processing_subtle_questioning_tilt': () => console.log('Animation: Gamius incline la tête, questionneur.'),
  'reaction_thoughtful_nod_pleased': () => console.log('Animation: Gamius hoche la tête, pensif et content.'),
  
  // Nouveaux cues que nous venons d'ajouter à la feuille de style
  'intro_mysterious_beckon': () => console.log('Animation: Gamius fait un geste mystérieux pour approcher.'),
  'idle_curious_slight_bounce': () => console.log('Animation: Gamius est curieux, léger rebond joueur.'),
  'reaction_excited_bounce': () => console.log('Animation: Gamius rebondit avec excitation.'),
  'reaction_wise_nod': () => console.log('Animation: Gamius hoche la tête avec sagesse.'),
  'idle_storytelling_stance': () => console.log('Animation: Gamius prend une posture de conteur.'),
  'reaction_excited_gesture': () => console.log('Animation: Gamius fait des gestes excités.'),
  'idle_inviting_gesture': () => console.log('Animation: Gamius fait un geste invitant.')
};

function initGamius3DEngine(canvasId) {
  console.log(`Initializing Gamius 3D Engine on canvas: #${canvasId}`);
  const canvas = document.getElementById(canvasId);

  if (!canvas) {
    console.error(`Canvas element with ID '${canvasId}' not found.`);
    return false;
  }

  // Ici, vous initialiseriez votre moteur 3D (ex: Three.js, Babylon.js)
  // Exemple très simplifié :
  // gamiusEngine = new ThirdPartyEngine(canvas);
  // gamiusScene = gamiusEngine.createScene();
  // gamiusCharacter = gamiusScene.loadModel('/path/to/gamius_cat_model.glb'); 
  // gamiusCharacter.playAnimation('idle_curious'); // Animation par défaut

  // Pour la démo, on simule une initialisation réussie
  gamiusEngine = { initialized: true }; // Simuler un objet moteur
  console.log('Gamius 3D Engine initialized (simulated). Canvas ready.');
  // Changer le texte du canvas pour indiquer qu'il est prêt (comme dans le composant React)
  canvas.textContent = ''; // Efface le "Chargement du monde 3D..."
  canvas.style.backgroundColor = '#333'; // Un fond pour montrer que c'est différent
  
  // Simuler le chargement d'un personnage et jouer une animation idle
  // Dans un vrai scénario, vous attendriez que le modèle soit chargé.
  if (knownAnimations['idle_curious']) {
    knownAnimations['idle_curious']();
  }

  return true; // Indiquer le succès
}

function triggerGamiusAnimation(animationCueName) {
  console.log(`Attempting to trigger animation: ${animationCueName}`);

  if (!gamiusEngine && !document.getElementById('gamius-3d-world')) {
    // Si le moteur n'est pas initialisé (par exemple, si le canvas n'était pas prêt au moment de l'appel initial)
    // et que le canvas existe maintenant, on pourrait tenter une initialisation tardive.
    // Ceci est une solution de contournement, l'initialisation devrait idéalement se faire via initGamius3DEngine.
    console.warn('3D Engine not initialized. Attempting late initialization if canvas exists.');
    if (document.getElementById('gamius-3d-world')) {
        // Ne pas appeler initGamius3DEngine directement ici pour éviter des boucles si l'init échoue.
        // La logique d'initialisation principale est dans le onLoad du script tag.
    }
    // return; // Ou on pourrait mettre en file d'attente l'animation
  }
  
  if (knownAnimations[animationCueName]) {
    console.log(`Executing animation: ${animationCueName}`);
    knownAnimations[animationCueName]();
    // Dans un vrai moteur :
    // if (gamiusCharacter && gamiusCharacter.hasAnimation(animationCueName)) {
    //   gamiusCharacter.playAnimation(animationCueName);
    // } else {
    //   console.warn(`Animation clip '${animationCueName}' not found on character.`);
    //   // Jouer une animation par défaut ou ne rien faire
    //   if (gamiusCharacter && knownAnimations['idle_curious']) {
    //      gamiusCharacter.playAnimation('idle_curious');
    //   }
    // }
  } else {
    console.warn(`Animation cue '${animationCueName}' is not recognized.`);
    // Optionnel: jouer une animation par défaut si le cue n'est pas connu
    // if (gamiusCharacter && knownAnimations['idle_curious']) {
    //    gamiusCharacter.playAnimation('idle_curious');
    // }
  }
}

// Exposer les fonctions sur l'objet window
window.initGamius3DEngine = initGamius3DEngine;
window.triggerGamiusAnimation = triggerGamiusAnimation;

console.log('Gamius 3D Engine functions exposed to window object.');
