/**
 * Utilitaire pour accéder à la documentation de shadcn-ui via le serveur MCP context7
 * Ce fichier sert d'interface pour récupérer des informations sur les composants shadcn-ui
 */

import { connectToMcpServer } from './mcp-config';

/**
 * Résout l'identifiant de la bibliothèque shadcn-ui pour accéder à sa documentation
 * @returns {Promise<string>} - Identifiant de la bibliothèque compatible avec context7
 */
export async function resolveShadcnLibraryId() {
  try {
    const context7Server = await connectToMcpServer('context7');
    
    // Appeler l'outil resolve-library-id pour obtenir l'identifiant correct
    const result = await context7Server.sendRequest('resolve-library-id', {
      libraryName: 'shadcn/ui'
    });
    
    return result.libraryId;
  } catch (error) {
    console.error('Erreur lors de la résolution de l\'identifiant de la bibliothèque shadcn-ui:', error);
    // Fallback au cas où le serveur MCP n'est pas disponible
    return 'shadcn/ui';
  }
}

/**
 * Récupère la documentation d'un composant shadcn-ui spécifique
 * @param {string} componentName - Nom du composant (ex: "button", "dialog", "card")
 * @param {number} tokens - Nombre maximum de tokens à récupérer
 * @returns {Promise<Object>} - Documentation du composant
 */
export async function getShadcnComponentDocs(componentName, tokens = 5000) {
  try {
    const context7Server = await connectToMcpServer('context7');
    const libraryId = await resolveShadcnLibraryId();
    
    // Appeler l'outil get-library-docs pour obtenir la documentation
    const result = await context7Server.sendRequest('get-library-docs', {
      context7CompatibleLibraryID: libraryId,
      topic: componentName,
      tokens: tokens
    });
    
    return result;
  } catch (error) {
    console.error(`Erreur lors de la récupération de la documentation pour le composant ${componentName}:`, error);
    
    // Retourner un message d'erreur formaté si le serveur MCP n'est pas disponible
    return {
      error: true,
      message: `Documentation non disponible pour ${componentName}. Veuillez vérifier que le serveur MCP context7 est correctement installé.`,
      suggestion: 'Consultez la documentation en ligne sur https://ui.shadcn.com/docs'
    };
  }
}

/**
 * Récupère la liste des composants disponibles dans la bibliothèque shadcn-ui
 * @returns {Promise<Array<string>>} - Liste des composants disponibles
 */
export async function getAvailableShadcnComponents() {
  const availableComponents = [
    "accordion",
    "alert",
    "alert-dialog",
    "aspect-ratio",
    "avatar",
    "badge",
    "button",
    "calendar",
    "card",
    "carousel",
    "checkbox",
    "collapsible",
    "command",
    "context-menu",
    "dialog",
    "drawer",
    "dropdown-menu",
    "form",
    "hover-card",
    "input",
    "label",
    "menubar",
    "navigation-menu",
    "popover",
    "progress",
    "radio-group",
    "scroll-area",
    "select",
    "separator",
    "sheet",
    "skeleton",
    "slider",
    "switch",
    "table",
    "tabs",
    "textarea",
    "toast",
    "toggle",
    "tooltip",
    "typography"
  ];
  
  return availableComponents;
}

export default {
  resolveShadcnLibraryId,
  getShadcnComponentDocs,
  getAvailableShadcnComponents
};
