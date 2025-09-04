'use client';

import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, FormValues } from './ModernComponentGenerator.types';

/**
 * Composants prédéfinis disponibles pour différents types
 */
const componentExamples = {
  button: `const Button = ({ 
  variant = 'primary', 
  size = 'medium', 
  children, 
  disabled = false,
  onClick
}) => {
  const buttonClasses = {
    primary: 'bg-black text-white hover:bg-gray-800',
    secondary: 'bg-white text-black border border-gray-300 hover:bg-gray-100',
    text: 'bg-transparent text-black hover:underline',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };
  
  const sizeClasses = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={\`rounded-md font-medium transition-all \${buttonClasses[variant]} \${sizeClasses[size]} \${disabled ? 'opacity-50 cursor-not-allowed' : ''}\`}
    >
      {children}
    </button>
  );
};`,
  card: `const Card = ({ 
  title, 
  description, 
  image, 
  actions,
  variant = 'default' 
}) => {
  const cardVariants = {
    default: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-lg',
    outlined: 'bg-transparent border border-gray-300',
  };

  return (
    <div className={\`rounded-xl overflow-hidden \${cardVariants[variant]}\`}>
      {image && (
        <div className="aspect-video w-full overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-4">
        {title && <h3 className="text-xl font-semibold mb-2">{title}</h3>}
        {description && <p className="text-gray-600 mb-4">{description}</p>}
        {actions && <div className="flex gap-2 justify-end mt-2">{actions}</div>}
      </div>
    </div>
  );
};`,
  form: `import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Exemple de schéma de validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Le nom est requis" }),
  email: z.string().email({ message: "Email invalide" }),
  message: z.string().min(10, { message: "Le message doit contenir au moins 10 caractères" }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = ({ onSubmit }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Nom
        </label>
        <input
          id="name"
          {...form.register("name")}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
        />
        {form.formState.errors.name && (
          <p className="mt-1 text-sm text-red-600">{form.formState.errors.name.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...form.register("email")}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
        />
        {form.formState.errors.email && (
          <p className="mt-1 text-sm text-red-600">{form.formState.errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          Message
        </label>
        <textarea
          id="message"
          {...form.register("message")}
          rows={4}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
        />
        {form.formState.errors.message && (
          <p className="mt-1 text-sm text-red-600">{form.formState.errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="px-4 py-2 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition-colors"
      >
        {form.formState.isSubmitting ? "Envoi..." : "Envoyer"}
      </button>
    </form>
  );
};`,
  navigation: `const Navigation = ({ 
  items, 
  variant = 'default', 
  transparent = false,
  logo 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const navVariants = {
    default: 'border-b border-gray-200',
    compact: 'p-0',
    centered: 'flex-col items-center',
  };
  
  return (
    <nav className={\`px-4 py-2 \${transparent ? 'bg-transparent' : 'bg-white'} \${navVariants[variant]}\`}>
      <div className="flex items-center justify-between">
        {logo && (
          <div className="flex-shrink-0">
            {typeof logo === 'string' ? (
              <img src={logo} alt="Logo" className="h-8" />
            ) : (
              logo
            )}
          </div>
        )}
        
        <div className="hidden md:flex space-x-4">
          {items.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="text-gray-800 hover:text-black px-2 py-1 text-sm font-medium"
            >
              {item.label}
            </a>
          ))}
        </div>
        
        <button 
          className="md:hidden p-2" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      
      {isOpen && (
        <div className="md:hidden pt-2 pb-4 space-y-1">
          {items.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="block text-gray-800 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};`,
  hero: `const HeroSection = ({ 
  title, 
  subtitle, 
  backgroundImage,
  cta 
}) => {
  return (
    <div 
      className="relative h-[70vh] min-h-[500px] flex items-center justify-center text-center px-4"
      style={backgroundImage ? { 
        backgroundImage: \`url(\${backgroundImage})\`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      } : {}}
    >
      {/* Overlay pour assombrir l'image de fond si présente */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      )}
      
      <div className="relative z-10 max-w-3xl">
        <h1 className={\`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 \${backgroundImage ? 'text-white' : 'text-black'}\`}>
          {title}
        </h1>
        
        {subtitle && (
          <p className={\`text-xl md:text-2xl mb-8 \${backgroundImage ? 'text-gray-200' : 'text-gray-600'}\`}>
            {subtitle}
          </p>
        )}
        
        {cta && (
          <div className="mt-8">
            {typeof cta === 'function' ? cta() : cta}
          </div>
        )}
      </div>
    </div>
  );
};`,
  gallery: `const Gallery = ({ 
  items, 
  columns = 3, 
  gap = 'medium',
  aspectRatio = '1/1' 
}) => {
  const gapSizes = {
    small: 'gap-2',
    medium: 'gap-4',
    large: 'gap-8',
  };
  
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };
  
  return (
    <div className={\`grid \${gridCols[columns]} \${gapSizes[gap]}\`}>
      {items.map((item, idx) => (
        <div key={idx} className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:shadow-lg">
          <div style={{ aspectRatio }} className="w-full">
            <img 
              src={item.image} 
              alt={item.title || \`Image \${idx + 1}\`} 
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          
          {(item.title || item.description) && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {item.title && <h3 className="text-lg font-medium">{item.title}</h3>}
              {item.description && <p className="mt-1 text-sm text-gray-300">{item.description}</p>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};`,
  modal: `const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children 
}) => {
  const [isClosing, setIsClosing] = useState(false);
  
  // Gestion de la fermeture avec animation
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };
  
  // Gestion du clic sur l'overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };
  
  // Gestion de la touche Echap
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300"
      onClick={handleOverlayClick}
      style={{ opacity: isClosing ? 0 : 1 }}
    >
      <div 
        className="relative w-full max-w-md transform rounded-lg bg-white p-6 shadow-xl transition-all duration-300"
        style={{ 
          transform: isClosing ? 'scale(0.95)' : 'scale(1)',
          opacity: isClosing ? 0 : 1
        }}
      >
        <div className="flex items-center justify-between mb-4">
          {title && <h2 className="text-xl font-semibold">{title}</h2>}
          
          <button
            onClick={handleClose}
            className="rounded-full p-1 hover:bg-gray-100"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div>{children}</div>
        
        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={handleClose}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};`,
  custom: `// Définissez vos props et votre structure ici
const CustomComponent = (props) => {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Composant personnalisé</h2>
      <p>Modifiez ce code selon vos besoins.</p>
    </div>
  );
};`
};

const ModernComponentGenerator = () => {
  const [generatedCode, setGeneratedCode] = useState('');

  // Utilisation de useForm avec les types adéquats
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      componentName: '',
      componentType: 'button',
      description: '',
      styleFlavor: 'minimal',
      isAccessible: true,
      includeAnimation: false,
      customProps: ''
    }
  });

  // Génération de code basée sur les sélections de l'utilisateur
  const generateComponentCode = (values: FormValues) => {
    // Récupérer le template de base pour le type de composant
    let baseCode = componentExamples[values.componentType];
    
    // Ajouter les imports React nécessaires
    let finalCode = `'use client';\n\nimport React, { useState`;
    
    // Ajouter useEffect si le composant est de type modal ou si des animations sont ajoutées
    if (values.componentType === 'modal' || values.includeAnimation) {
      finalCode += ', useEffect';
    }
    
    finalCode += ' } from \'react\';\n\n';
    
    // Ajouter les imports spécifiques pour le type Form
    if (values.componentType === 'form') {
      // Le template du formulaire contient déjà les imports
      finalCode = baseCode;
    } else {
      // Adapter le nom du composant
      const componentPattern = new RegExp(`const (${values.componentType.charAt(0).toUpperCase() + values.componentType.slice(1)})\\s?=`);
      baseCode = baseCode.replace(componentPattern, `const ${values.componentName} =`);
      
      finalCode += baseCode;
    }
    
    // Ajouter les animations si demandé
    if (values.includeAnimation && values.componentType !== 'modal') {
      finalCode = finalCode.replace(
        '}>',
        ', useEffect } from \'react\';\n\nimport { motion } from \'framer-motion\';\n\n>'
      );
      
      // Remplacer les divs principaux par motion.div
      finalCode = finalCode.replace(
        /<div(.*?)className=/g,
        '<motion.div$1initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className='
      );
      
      finalCode = finalCode.replace(/<\/div>/g, '</motion.div>');
    }
    
    // Ajouter l'export par défaut si nécessaire
    if (!finalCode.includes('export default')) {
      finalCode += `\n\nexport default ${values.componentName};`;
    }
    
    setGeneratedCode(finalCode);
  };

  // Gestion de la soumission du formulaire
  const onSubmit: SubmitHandler<FormValues> = (values) => {
    generateComponentCode(values);
  };

  // Copier le code généré
  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    alert('Code copié dans le presse-papier');
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 max-w-5xl mx-auto my-8">
      <h2 className="text-3xl font-heading font-bold mb-6">Générateur de Composants UI</h2>
      <p className="text-gray-600 mb-8">
        Utilisez cet outil pour générer rapidement des composants UI conformes au design system de Genius Ad District.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulaire de génération */}
        <div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="componentType" className="block font-medium text-gray-700 mb-2">
                Type de composant
              </label>
              <select
                id="componentType"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                {...form.register("componentType")}
              >
                <option value="button">Bouton</option>
                <option value="card">Carte</option>
                <option value="form">Formulaire</option>
                <option value="navigation">Navigation</option>
                <option value="hero">Hero Section</option>
                <option value="gallery">Galerie</option>
                <option value="modal">Modal</option>
                <option value="custom">Personnalisé</option>
              </select>
              {form.formState.errors.componentType && (
                <p className="mt-1 text-sm text-red-600">{form.formState.errors.componentType.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="componentName" className="block font-medium text-gray-700 mb-2">
                Nom du composant
              </label>
              <input
                id="componentName"
                type="text"
                placeholder="Ex: PrimaryButton, HeroSection, etc."
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                {...form.register("componentName")}
              />
              {form.formState.errors.componentName && (
                <p className="mt-1 text-sm text-red-600">{form.formState.errors.componentName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block font-medium text-gray-700 mb-2">
                Description (optionnelle)
              </label>
              <textarea
                id="description"
                placeholder="Décrivez le comportement et l'apparence du composant..."
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                {...form.register("description")}
              />
            </div>
            
            <div>
              <label htmlFor="styleFlavor" className="block font-medium text-gray-700 mb-2">
                Style visuel
              </label>
              <select
                id="styleFlavor"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                {...form.register("styleFlavor")}
              >
                <option value="minimal">Minimal</option>
                <option value="frosted">Frosted Glass</option>
                <option value="gradient">Gradient</option>
                <option value="outlined">Outlined</option>
                <option value="shadowed">Shadowed</option>
              </select>
            </div>
            
            <div className="flex space-x-6">
              <div className="flex items-center">
                <input
                  id="isAccessible"
                  type="checkbox"
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                  {...form.register("isAccessible")}
                />
                <label htmlFor="isAccessible" className="ml-2 block text-sm text-gray-700">
                  Accessible (ARIA)
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="includeAnimation"
                  type="checkbox"
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                  {...form.register("includeAnimation")}
                />
                <label htmlFor="includeAnimation" className="ml-2 block text-sm text-gray-700">
                  Inclure des animations
                </label>
              </div>
            </div>
            
            <div>
              <label htmlFor="customProps" className="block font-medium text-gray-700 mb-2">
                Props personnalisées (optionnel)
              </label>
              <input
                id="customProps"
                type="text"
                placeholder="Ex: color, size, variant, etc."
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black"
                {...form.register("customProps")}
              />
              <p className="mt-1 text-xs text-gray-500">Séparez les props par des virgules</p>
            </div>

            <button
              type="submit"
              disabled={form.formState.isSubmitting}
              className={`w-full p-3 bg-black text-white rounded-md font-medium transition-all ${
                form.formState.isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-800'
              }`}
            >
              {form.formState.isSubmitting ? 'Génération en cours...' : 'Générer le composant'}
            </button>
          </form>
        </div>

        {/* Code généré */}
        <div>
          {generatedCode ? (
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
          ) : (
            <div className="bg-gray-50 rounded-lg p-6 h-full flex flex-col justify-center items-center text-center">
              <svg 
                className="w-16 h-16 text-gray-400 mb-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Prêt à générer votre composant</h3>
              <p className="text-gray-500 text-sm max-w-xs">
                Remplissez le formulaire et cliquez sur "Générer" pour créer votre composant UI personnalisé basé sur le design system Genius Ad District.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernComponentGenerator; 