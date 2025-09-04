import { NextResponse } from 'next/server';
import { mcpConfig } from '@/lib/mcp-config';

/**
 * API Route pour gérer les requêtes MCP
 * Cette route sert d'interface entre le client et les serveurs MCP
 */
export async function POST(request) {
  try {
    // Vérifier l'authentification
    // Note: Dans une implémentation réelle, nous devrions vérifier 
    // l'authentification et les autorisations ici
    
    const body = await request.json();
    const { serverName, toolName, params } = body;
    
    // Validation de la requête
    if (!serverName || !toolName) {
      return NextResponse.json(
        { error: 'Les paramètres serverName et toolName sont requis' },
        { status: 400 }
      );
    }
    
    // Vérifier que le serveur existe dans la configuration
    const serverConfig = mcpConfig.mcpServers[serverName];
    if (!serverConfig) {
      return NextResponse.json(
        { error: `Serveur MCP non trouvé: ${serverName}` },
        { status: 404 }
      );
    }
    
    // Simuler la connexion à un serveur MCP pour la démo
    // Dans une implémentation réelle, nous lancerions le processus MCP ici
    // ou nous nous connecterions à un serveur MCP déjà en cours d'exécution
    
    console.log(`Requête MCP - Serveur: ${serverName}, Outil: ${toolName}, Params:`, params);
    
    // Réponses simulées pour la démo
    let mockResponse;
    
    if (serverName === '@21st-dev/magic') {
      if (toolName === '21st_magic_component_builder') {
        mockResponse = generateMockComponentCode(params);
      } else if (toolName === 'logo_search') {
        mockResponse = generateMockLogoResults(params);
      } else if (toolName === '21st_magic_component_inspiration') {
        mockResponse = generateMockInspirations(params);
      } else if (toolName === '21st_magic_component_refiner') {
        mockResponse = generateMockRefinedCode(params);
      } else {
        mockResponse = { success: false, error: 'Outil non supporté' };
      }
    } else {
      mockResponse = { success: false, error: 'Serveur non supporté pour la démo' };
    }
    
    // Retourner la réponse avec un délai simulé pour imiter un appel réseau
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return NextResponse.json({
      success: true,
      result: mockResponse
    });
  } catch (error) {
    console.error('Erreur lors du traitement de la requête MCP:', error);
    return NextResponse.json(
      { error: 'Erreur lors du traitement de la requête' },
      { status: 500 }
    );
  }
}

/**
 * Génère du code de composant React simulé
 */
function generateMockComponentCode(params) {
  const { name, description, componentType } = params;
  
  // Générer un composant différent selon le type
  switch (componentType) {
    case 'button':
      return {
        componentCode: `import React from 'react';

/**
 * ${name} - ${description || 'A beautiful button component'}
 */
const ${name} = ({ 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  children, 
  onClick,
  ...props 
}) => {
  // Déterminer les classes en fonction des variants
  const variantClasses = {
    primary: 'bg-black hover:bg-gray-800 text-white',
    secondary: 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-800',
    ghost: 'bg-transparent hover:bg-gray-50 text-gray-800',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };

  const sizeClasses = {
    small: 'text-xs py-1 px-3',
    medium: 'text-sm py-2 px-4',
    large: 'text-base py-3 px-6',
  };

  // Combiner les classes
  const buttonClass = \`
    \${variantClasses[variant] || variantClasses.primary}
    \${sizeClasses[size] || sizeClasses.medium}
    rounded-md font-medium transition-all flex items-center justify-center
    \${disabled ? 'opacity-50 cursor-not-allowed' : ''}
  \`;

  return (
    <button
      className={buttonClass}
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      {...props}
    >
      {children}
    </button>
  );
};

export default ${name};`
      };
      
    case 'card':
      return {
        componentCode: `import React from 'react';
import Image from 'next/image';

/**
 * ${name} - ${description || 'A beautiful card component'}
 */
const ${name} = ({ 
  title, 
  description, 
  image, 
  actions, 
  variant = 'default',
  ...props 
}) => {
  // Styles based on variant
  const variantStyles = {
    default: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-md',
    flat: 'bg-gray-50',
  };

  return (
    <div 
      className={\`rounded-xl overflow-hidden \${variantStyles[variant] || variantStyles.default}\`}
      {...props}
    >
      {image && (
        <div className="relative w-full aspect-video">
          <Image
            src={image}
            alt={title || 'Card image'}
            fill
            className="object-cover"
          />
        </div>
      )}
      
      <div className="p-5">
        {title && (
          <h3 className="font-heading font-semibold text-xl mb-2">
            {title}
          </h3>
        )}
        
        {description && (
          <p className="text-gray-600 mb-4">
            {description}
          </p>
        )}
        
        {actions && (
          <div className="flex flex-wrap gap-2 mt-4">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default ${name};`
      };
      
    case 'form':
      return {
        componentCode: `import React, { useState } from 'react';

/**
 * ${name} - ${description || 'A beautiful form component'}
 */
const ${name} = ({ 
  onSubmit, 
  initialValues = {}, 
  children,
  ...props 
}) => {
  const [values, setValues] = useState(initialValues);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(values);
    }
  };
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Clone children and inject form context
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        values,
        onChange: handleChange,
      });
    }
    return child;
  });

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-4"
      {...props}
    >
      {childrenWithProps}
    </form>
  );
};

// Sous-composants pour le formulaire
${name}.Input = ({ 
  label, 
  name, 
  type = 'text',
  required = false,
  placeholder,
  values = {},
  onChange,
  ...props 
}) => {
  return (
    <div>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={values[name] || ''}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        {...props}
      />
    </div>
  );
};

${name}.Button = ({ 
  children, 
  type = 'submit',
  variant = 'primary',
  ...props 
}) => {
  const variantClasses = {
    primary: 'bg-black text-white hover:bg-gray-800',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  };

  return (
    <button
      type={type}
      className={\`px-4 py-2 rounded-md font-medium \${variantClasses[variant]}\`}
      {...props}
    >
      {children}
    </button>
  );
};

export default ${name};`
      };
    
    // Ajouter plus de modèles de composants ici pour d'autres types
      
    default:
      return {
        componentCode: `import React from 'react';

/**
 * ${name} - ${description || 'A custom component'}
 */
const ${name} = (props) => {
  return (
    <div className="p-4 border border-gray-200 rounded-md">
      <h3 className="text-lg font-semibold mb-2">
        ${name}
      </h3>
      <p className="text-gray-600">
        This is a custom component. Customize it based on your needs.
      </p>
    </div>
  );
};

export default ${name};`
      };
  }
}

/**
 * Génère des résultats de recherche de logos simulés
 */
function generateMockLogoResults(params) {
  const { query } = params;
  
  return {
    logos: [
      {
        id: 'logo-1',
        name: `${query} Logo 1`,
        url: 'https://example.com/logo1.svg',
        preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iYmxhY2siLz48L3N2Zz4='
      },
      {
        id: 'logo-2',
        name: `${query} Logo 2`,
        url: 'https://example.com/logo2.svg',
        preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0MCIgZmlsbD0iYmxhY2siLz48L3N2Zz4='
      },
      {
        id: 'logo-3',
        name: `${query} Logo 3`,
        url: 'https://example.com/logo3.svg',
        preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cG9seWdvbiBwb2ludHM9IjUwLDAgMTAwLDEwMCAwLDEwMCIgZmlsbD0iYmxhY2siLz48L3N2Zz4='
      }
    ]
  };
}

/**
 * Génère des inspirations de composants simulées
 */
function generateMockInspirations(params) {
  const { category } = params;
  
  // Retourner différentes inspirations selon la catégorie
  switch (category) {
    case 'button':
      return [
        {
          id: 'btn-1',
          title: 'Minimal Rounded Button',
          preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIHJ4PSI4IiByeT0iOCIgZmlsbD0iYmxhY2siLz48dGV4dCB4PSIzMCIgeT0iMjUiIGZpbGw9IndoaXRlIj5CdXR0b248L3RleHQ+PC9zdmc+'
        },
        {
          id: 'btn-2',
          title: 'Ghost Button with Border',
          preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIHJ4PSI4IiByeT0iOCIgZmlsbD0id2hpdGUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMiIvPjx0ZXh0IHg9IjMwIiB5PSIyNSIgZmlsbD0iYmxhY2siPkJ1dHRvbjwvdGV4dD48L3N2Zz4='
        }
      ];
      
    case 'card':
      return [
        {
          id: 'card-1',
          title: 'Elevation Card with Image',
          preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE2MCIgcng9IjgiIHJ5PSI4IiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSIjZWVlIi8+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSI4MCIgZmlsbD0iI2VlZSIvPjxyZWN0IHg9IjEyIiB5PSI5MCIgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxNiIgZmlsbD0iIzMzMyIvPjxyZWN0IHg9IjEyIiB5PSIxMTUiIHdpZHRoPSIxNzUiIGhlaWdodD0iMTAiIGZpbGw9IiM3Nzc3NzciLz48cmVjdCB4PSIxMiIgeT0iMTMwIiB3aWR0aD0iMTc1IiBoZWlnaHQ9IjEwIiBmaWxsPSIjNzc3Nzc3Ii8+PC9zdmc+'
        },
        {
          id: 'card-2',
          title: 'Bordered Accent Card',
          preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE2MCIgcng9IjgiIHJ5PSI4IiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIyIi8+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjgiIGhlaWdodD0iMTYwIiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxNiIgZmlsbD0iIzMzMyIvPjxyZWN0IHg9IjIwIiB5PSI0NSIgd2lkdGg9IjE3NSIgaGVpZ2h0PSIxMCIgZmlsbD0iIzc3Nzc3NyIvPjxyZWN0IHg9IjIwIiB5PSI2MCIgd2lkdGg9IjE3NSIgaGVpZ2h0PSIxMCIgZmlsbD0iIzc3Nzc3NyIvPjxyZWN0IHg9IjIwIiB5PSIxMjAiIHdpZHRoPSI4MCIgaGVpZ2h0PSIyNSIgcng9IjQiIHJ5PSI0IiBmaWxsPSJibGFjayIvPjwvc3ZnPg=='
        }
      ];
      
    case 'navigation':
      return [
        {
          id: 'nav-1',
          title: 'Minimal Top Nav',
          preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjYwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNjAiIGZpbGw9IndoaXRlIiBzdHJva2U9IiNlZWUiIHN0cm9rZS13aWR0aD0iMSIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjE1IiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjgwIiB5PSIyNSIgd2lkdGg9IjMwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjMzMzIi8+PHJlY3QgeD0iMTMwIiB5PSIyNSIgd2lkdGg9IjMwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjMzMzIi8+PHJlY3QgeD0iMTgwIiB5PSIyNSIgd2lkdGg9IjMwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjMzMzIi8+PHJlY3QgeD0iMjUwIiB5PSIyMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjE2IiByeD0iOCIgcnk9IjgiIGZpbGw9ImJsYWNrIi8+PC9zdmc+'
        },
        {
          id: 'nav-2',
          title: 'Transparent Navigation',
          preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjYwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNjAiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC41KSIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjE1IiBmaWxsPSJibGFjayIvPjxyZWN0IHg9IjgwIiB5PSIyNSIgd2lkdGg9IjMwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjMzMzIi8+PHJlY3QgeD0iMTMwIiB5PSIyNSIgd2lkdGg9IjMwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjMzMzIi8+PHJlY3QgeD0iMTgwIiB5PSIyNSIgd2lkdGg9IjMwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjMzMzIi8+PHJlY3QgeD0iMjUwIiB5PSIyMiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjE2IiByeD0iOCIgcnk9IjgiIGZpbGw9ImJsYWNrIi8+PC9zdmc+'
        }
      ];
      
    // Ajouter plus de catégories ici
      
    default:
      return [
        {
          id: 'default-1',
          title: 'Default Component Style',
          preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgcng9IjgiIHJ5PSI4IiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSIjZWVlIiBzdHJva2Utd2lkdGg9IjIiLz48cmVjdCB4PSIyMCIgeT0iMjAiIHdpZHRoPSIxNTAiIGhlaWdodD0iMTYiIGZpbGw9IiMzMzMiLz48cmVjdCB4PSIyMCIgeT0iNDUiIHdpZHRoPSIxNzUiIGhlaWdodD0iMTAiIGZpbGw9IiM3Nzc3NzciLz48cmVjdCB4PSIyMCIgeT0iNjAiIHdpZHRoPSIxNzUiIGhlaWdodD0iMTAiIGZpbGw9IiM3Nzc3NzciLz48L3N2Zz4='
        }
      ];
  }
}

/**
 * Génère du code de composant amélioré simulé
 */
function generateMockRefinedCode(params) {
  const { currentCode, improvements } = params;
  
  // Pour la démo, simplement ajouter un commentaire au code existant
  return {
    refinedCode: `/* Code refined with 21st-dev/magic MCP */
/* Improvements: ${JSON.stringify(improvements)} */

${currentCode || '// No code provided for refinement'}`
  };
} 