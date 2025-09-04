/**
 * Script pour générer des composants UI modernes en utilisant l'API 21st.dev
 * 
 * Ce script recherche et génère des composants UI modernes pour Genius AD District
 * en utilisant l'API 21st.dev.
 * 
 * Usage: 
 * npx ts-node src/scripts/generate-ui-components.ts
 */

import twentyFirstAPI, { SearchResult } from '../lib/21st-api';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Configuration
const UI_COMPONENTS_DIR = path.join(process.cwd(), 'src/components/ui');
const SECTIONS_COMPONENTS_DIR = path.join(process.cwd(), 'src/components/sections');

/**
 * Crée le répertoire s'il n'existe pas
 */
function ensureDirExists(dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Extrait le code TSX depuis le prompt généré
 */
function extractCodeFromPrompt(prompt: string): { componentCode: string, demoCode?: string } {
  const componentMatch = prompt.match(/```tsx\ncomponent\.tsx\n([\s\S]*?)(?:```|demo\.tsx)/);
  const demoMatch = prompt.match(/demo\.tsx\n([\s\S]*?)```/);

  return {
    componentCode: componentMatch ? componentMatch[1] : '',
    demoCode: demoMatch ? demoMatch[1] : undefined
  };
}

/**
 * Enregistre le composant dans le répertoire approprié
 */
function saveComponent(componentName: string, code: string, isSection: boolean = false): void {
  const dir = isSection ? SECTIONS_COMPONENTS_DIR : UI_COMPONENTS_DIR;
  ensureDirExists(dir);
  
  const fileName = `${componentName.replace(/\s+/g, '-').toLowerCase()}.tsx`;
  const filePath = path.join(dir, fileName);
  
  fs.writeFileSync(filePath, code);
  console.log(`✅ Composant enregistré : ${filePath}`);
}

/**
 * Installe les dépendances nécessaires si mentionnées dans le prompt
 */
function installDependencies(prompt: string): void {
  const installCommandMatch = prompt.match(/```bash\n(npm|yarn|pnpm|npx)[\s\S]*?```/);
  
  if (installCommandMatch) {
    const installCommand = installCommandMatch[0]
      .replace(/```bash\n/, '')
      .replace(/```/, '')
      .trim();
      
    console.log(`📦 Installation des dépendances avec : ${installCommand}`);
    try {
      execSync(installCommand, { stdio: 'inherit' });
      console.log('✅ Dépendances installées avec succès');
    } catch (error) {
      console.error('❌ Erreur lors de l\'installation des dépendances:', error);
    }
  }
}

/**
 * Traite un résultat de recherche pour générer et enregistrer le composant
 */
async function processSearchResult(result: SearchResult, isSection: boolean = false): Promise<void> {
  try {
    console.log(`🔍 Traitement du composant : ${result.component_data.name}`);
    
    // Génère le prompt pour le composant
    const promptResponse = await twentyFirstAPI.getComponentPrompt(result.demo_id);
    
    // Extrait le code du composant et de la démo
    const { componentCode, demoCode } = extractCodeFromPrompt(promptResponse.prompt);
    
    if (!componentCode) {
      console.error('❌ Impossible d\'extraire le code du composant depuis le prompt');
      return;
    }
    
    // Sauvegarde le composant
    saveComponent(result.component_data.name, componentCode, isSection);
    
    // Si une démo est disponible, la sauvegarde également
    if (demoCode) {
      saveComponent(`${result.component_data.name}-demo`, demoCode, true);
    }
    
    // Installe les dépendances nécessaires
    installDependencies(promptResponse.prompt);
    
  } catch (error) {
    console.error(`❌ Erreur lors du traitement du composant ${result.component_data.name}:`, error);
  }
}

/**
 * Fonction principale
 */
async function main(): Promise<void> {
  try {
    console.log('🚀 Démarrage de la génération des composants UI...');
    
    // Recherche des composants
    console.log('🔍 Recherche de composants hero section...');
    const heroSectionResponse = await twentyFirstAPI.searchHeroSection();
    
    console.log('🔍 Recherche de composants company showcase...');
    const companyShowcaseResponse = await twentyFirstAPI.searchCompanyShowcase();
    
    console.log('🔍 Recherche de composants navigation...');
    const navigationResponse = await twentyFirstAPI.searchNavigation();
    
    // Affiche les métadonnées
    console.log(`ℹ️ Plan: ${heroSectionResponse.metadata.plan}`);
    console.log(`ℹ️ Requêtes restantes: ${heroSectionResponse.metadata.requests_remaining}`);
    
    // Traite les résultats
    if (heroSectionResponse.results.length > 0) {
      await processSearchResult(heroSectionResponse.results[0], true);
    }
    
    if (companyShowcaseResponse.results.length > 0) {
      await processSearchResult(companyShowcaseResponse.results[0], true);
    }
    
    if (navigationResponse.results.length > 0) {
      await processSearchResult(navigationResponse.results[0], false);
    }
    
    console.log('✅ Génération des composants UI terminée !');
    
  } catch (error) {
    console.error('❌ Erreur lors de la génération des composants UI:', error);
  }
}

// Exécute la fonction principale
main();
