'use client';

import { useState, useEffect } from 'react';
import { generateUiComponent, getComponentInspiration } from '@/lib/mcp-config';

/**
 * MagicComponentGenerator - Interface pour utiliser @21st-dev/magic pour générer des composants UI 
 * selon les spécifications du design system de Genius Ad District.
 * 
 * Ce composant est utilisé en mode développement pour générer rapidement des composants UI
 * suivant le design Apple-like spécifié dans le PRD.
 */
const MagicComponentGenerator = () => {
  const [componentType, setComponentType] = useState('button');
  const [componentName, setComponentName] = useState('');
  const [componentDescription, setComponentDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [error, setError] = useState('');
  const [inspirations, setInspirations] = useState([]);
  const [isLoadingInspirations, setIsLoadingInspirations] = useState(false);

  const componentTypes = [
    { id: 'button', label: 'Bouton' },
    { id: 'card', label: 'Carte' },
    { id: 'form', label: 'Formulaire' },
    { id: 'navigation', label: 'Navigation' },
    { id: 'hero', label: 'Hero Section' },
    { id: 'gallery', label: 'Galerie' },
    { id: 'modal', label: 'Modal' },
    { id: 'custom', label: 'Personnalisé' }
  ];

  // Charger les inspirations au chargement initial
  useEffect(() => {
    fetchInspirations();
  }, [componentType]);

  // Fonction pour récupérer des inspirations de composants
  const fetchInspirations = async () => {
    try {
      setIsLoadingInspirations(true);
      const result = await getComponentInspiration({
        category: componentType,
        style: 'minimalist',
        includeCode: true,
        includePreview: true
      });
      setInspirations(result || []);
    } catch (err) {
      console.error('Erreur lors de la récupération des inspirations:', err);
      setError('Impossible de charger les inspirations pour le moment.');
    } finally {
      setIsLoadingInspirations(false);
    }
  };

  // Fonction pour générer un composant UI
  const handleGenerateComponent = async (e) => {
    e.preventDefault();
    
    if (!componentName) {
      setError('Veuillez fournir un nom pour le composant');
      return;
    }
    
    try {
      setIsGenerating(true);
      setError('');
      
      const componentSpec = {
        type: 'react',
        name: componentName,
        description: componentDescription || `A ${componentType} component following the Genius Ad District design system`,
        componentType: componentType,
        props: getDefaultPropsForType(componentType)
      };
      
      const code = await generateUiComponent(componentSpec);
      setGeneratedCode(code || '// Code de composant non disponible');
    } catch (err) {
      console.error('Erreur lors de la génération du composant:', err);
      setError('Impossible de générer le composant pour le moment.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Retourne les props par défaut selon le type de composant
  const getDefaultPropsForType = (type) => {
    switch(type) {
      case 'button':
        return ['variant', 'size', 'disabled', 'children', 'onClick'];
      case 'card':
        return ['title', 'description', 'image', 'actions', 'variant'];
      case 'form':
        return ['onSubmit', 'initialValues', 'children'];
      case 'navigation':
        return ['items', 'variant', 'transparent', 'logo'];
      case 'hero':
        return ['title', 'subtitle', 'backgroundImage', 'cta'];
      case 'gallery':
        return ['items', 'columns', 'gap', 'aspectRatio'];
      case 'modal':
        return ['isOpen', 'onClose', 'title', 'children'];
      case 'custom':
        return [];
      default:
        return [];
    }
  };

  // Fonction pour copier le code généré
  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    alert('Code copié dans le presse-papier');
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 max-w-5xl mx-auto my-8">
      <h2 className="text-3xl font-heading font-bold mb-6">Générateur de Composants UI</h2>
      <p className="text-gray-600 mb-8">
        Utilisez cet outil pour générer rapidement des composants UI conformes au design system de Genius Ad District
        grâce à l'intégration de 21st-dev/magic MCP.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulaire de génération */}
        <div>
          <form onSubmit={handleGenerateComponent} className="space-y-6">
            <div>
              <label htmlFor="componentType" className="block font-medium text-gray-700 mb-2">
                Type de composant
              </label>
              <select
                id="componentType"
                value={componentType}
                onChange={(e) => setComponentType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
              >
                {componentTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="componentName" className="block font-medium text-gray-700 mb-2">
                Nom du composant
              </label>
              <input
                id="componentName"
                type="text"
                value={componentName}
                onChange={(e) => setComponentName(e.target.value)}
                placeholder="Ex: PrimaryButton, HeroSection, etc."
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                required
              />
            </div>

            <div>
              <label htmlFor="componentDescription" className="block font-medium text-gray-700 mb-2">
                Description (optionnelle)
              </label>
              <textarea
                id="componentDescription"
                value={componentDescription}
                onChange={(e) => setComponentDescription(e.target.value)}
                placeholder="Décrivez le comportement et l'apparence du composant..."
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-md">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isGenerating}
              className={`w-full p-3 bg-black text-white rounded-md font-medium transition-all ${
                isGenerating ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-800'
              }`}
            >
              {isGenerating ? 'Génération en cours...' : 'Générer le composant'}
            </button>
          </form>
        </div>

        {/* Inspirations et code généré */}
        <div>
          <div className="bg-gray-50 rounded-md p-4 mb-6">
            <h3 className="font-heading font-semibold text-lg mb-3">Inspirations</h3>
            
            {isLoadingInspirations ? (
              <div className="text-center py-8">Chargement des inspirations...</div>
            ) : inspirations && inspirations.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {inspirations.map((inspiration, idx) => (
                  <div 
                    key={idx} 
                    className="border border-gray-200 rounded-md p-3 hover:border-black cursor-pointer transition-all"
                    onClick={() => {
                      setComponentDescription(`Inspiré par: ${inspiration.title}`);
                    }}
                  >
                    {inspiration.preview ? (
                      <div className="bg-white rounded mb-2 p-2">
                        <img 
                          src={inspiration.preview} 
                          alt={inspiration.title} 
                          className="w-full h-auto rounded"
                        />
                      </div>
                    ) : (
                      <div className="h-20 bg-gray-200 rounded mb-2 flex items-center justify-center text-gray-500">
                        Aperçu non disponible
                      </div>
                    )}
                    <p className="text-sm font-medium">{inspiration.title}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                Aucune inspiration disponible pour ce type de composant.
              </p>
            )}
          </div>

          {generatedCode && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-heading font-semibold text-lg">Code généré</h3>
                <button
                  onClick={handleCopyCode}
                  className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition-colors"
                >
                  Copier
                </button>
              </div>
              <div className="bg-gray-900 text-gray-200 p-4 rounded-md overflow-auto max-h-96">
                <pre className="text-sm">
                  <code>{generatedCode}</code>
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MagicComponentGenerator; 