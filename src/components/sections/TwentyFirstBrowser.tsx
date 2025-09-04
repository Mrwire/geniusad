'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import twentyFirstAPI from '@/lib/21st-api';
import { SearchResult } from '@/lib/21st-api';
import { cn } from '@/lib/utils';

interface TwentyFirstBrowserProps {
  searchTerm?: string;
  className?: string;
}

export const TwentyFirstBrowser: React.FC<TwentyFirstBrowserProps> = ({
  searchTerm = 'modern UI',
  className = '',
}) => {
  const [searchQuery, setSearchQuery] = useState(searchTerm);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<SearchResult | null>(null);
  const [prompt, setPrompt] = useState<string | null>(null);
  const [requestsRemaining, setRequestsRemaining] = useState<number | null>(null);

  const searchComponents = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await twentyFirstAPI.searchComponents({
        search: searchQuery,
        per_page: 9,
      });
      
      setResults(response.results);
      setRequestsRemaining(response.metadata.requests_remaining);
      
      if (response.results.length === 0) {
        setError('Aucun résultat trouvé. Essayez une recherche différente.');
      }
    } catch (err) {
      setError('Une erreur est survenue lors de la recherche. Veuillez réessayer.');
      console.error('Erreur de recherche:', err);
    } finally {
      setLoading(false);
    }
  };

  const getComponentPrompt = async (result: SearchResult) => {
    setSelected(result);
    setLoading(true);
    setPrompt(null);
    
    try {
      const response = await twentyFirstAPI.getComponentPrompt(result.demo_id);
      setPrompt(response.prompt);
    } catch (err) {
      setError('Une erreur est survenue lors de la récupération du prompt. Veuillez réessayer.');
      console.error('Erreur de récupération du prompt:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchComponents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={cn("py-16 bg-white", className)}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-heading font-bold mb-8 text-center">Explorateur de Composants UI</h2>
          
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher des composants UI..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <button
                onClick={searchComponents}
                disabled={loading}
                className={cn(
                  "px-6 py-2 bg-black text-white font-medium rounded-md",
                  "transition-colors duration-200",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "hover:bg-gray-800"
                )}
              >
                {loading ? 'Recherche...' : 'Rechercher'}
              </button>
            </div>
            
            {requestsRemaining !== null && (
              <p className="mt-2 text-sm text-gray-500">
                Requêtes restantes: {requestsRemaining}
              </p>
            )}
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {results.map((result) => (
              <div 
                key={result.demo_id}
                className={cn(
                  "border border-gray-200 rounded-lg overflow-hidden",
                  "transition-all duration-200 hover:shadow-md",
                  selected?.demo_id === result.demo_id && "ring-2 ring-black"
                )}
                onClick={() => getComponentPrompt(result)}
              >
                <div className="relative h-48 w-full bg-gray-100">
                  {result.preview_url ? (
                    <Image
                      src={result.preview_url}
                      alt={result.component_data.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="text-gray-400">Aucune prévisualisation</span>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-heading font-semibold text-lg mb-1">
                    {result.component_data.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {result.component_data.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {result.component_user_data.image_url && (
                        <div className="relative h-6 w-6 rounded-full overflow-hidden">
                          <Image
                            src={result.component_user_data.image_url}
                            alt={result.component_user_data.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <span className="text-xs text-gray-500">
                        {result.component_user_data.name}
                      </span>
                    </div>
                    
                    <span className="text-xs text-gray-500">
                      Utilisé {result.usage_count} fois
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {selected && (
            <div className="mt-8 border border-gray-200 rounded-lg p-6">
              <h3 className="font-heading font-semibold text-xl mb-4">
                {selected.component_data.name}
              </h3>
              
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
                </div>
              ) : prompt ? (
                <div className="prose prose-sm max-w-none">
                  <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                    <code>{prompt}</code>
                  </pre>
                </div>
              ) : (
                <div className="py-4 text-center text-gray-500">
                  Cliquez sur "Voir le code" pour afficher le code du composant.
                </div>
              )}
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelected(null)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md mr-4 hover:bg-gray-50"
                >
                  Fermer
                </button>
                <button
                  onClick={() => getComponentPrompt(selected)}
                  disabled={loading}
                  className={cn(
                    "px-6 py-2 bg-black text-white font-medium rounded-md",
                    "transition-colors duration-200",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "hover:bg-gray-800"
                  )}
                >
                  {loading ? 'Chargement...' : prompt ? 'Rafraîchir' : 'Voir le code'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TwentyFirstBrowser;
