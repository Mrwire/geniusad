# Genius Ad District - Shadcn UI Theme System

Ce document explique l'intégration de Shadcn UI via MCP Registry et le système de thèmes créé pour unifier l'interface utilisateur tout en préservant l'identité visuelle de chaque filiale.

## Table des matières

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Système de thèmes](#système-de-thèmes)
4. [Utilisation des composants](#utilisation-des-composants)
5. [Architecture des filiales](#architecture-des-filiales)
6. [Migration des composants existants](#migration-des-composants-existants)

## Introduction

Nous utilisons Shadcn UI via MCP Registry pour créer une interface utilisateur cohérente à travers tout le site Genius Ad District, tout en permettant à chaque filiale de conserver son identité visuelle distincte. Cette approche nous permet de:

- Maintenir une cohérence visuelle et fonctionnelle
- Préserver l'identité de marque de chaque filiale
- Simplifier le développement avec des composants réutilisables
- Assurer l'accessibilité (WCAG AA)
- Optimiser les performances

## Installation

Pour installer Shadcn UI avec MCP Registry:

```bash
# Installation de Shadcn avec MCP Registry
npx -y shadcn@canary registry:mcp

# Exécution du script d'initialisation
node src/scripts/initialize-shadcn.js
```

Le script d'initialisation:
1. Installe Shadcn UI avec MCP Registry
2. Crée les fichiers de thèmes pour chaque filiale
3. Établit le système de ThemeProvider
4. Installe les composants Shadcn couramment utilisés

## Système de thèmes

Le système de thèmes est basé sur un contexte React qui gère un thème global et permet de basculer entre les différents thèmes des filiales.

### Structure des thèmes

Chaque filiale a son propre thème avec les couleurs suivantes:

| Filiale | Primary | Secondary | Accent | Background |
|---------|---------|-----------|--------|------------|
| Genius Ad District | #FF0050 | #2563EB | #FFB800 | #FFFFFF |
| MPS | #3B82F6 | #6366F1 | #FF4800 | #FFFFFF |
| LABRIG'AD | #EC4899 | #8B5CF6 | #22D3EE | #FFFFFF |
| GAMIUS | #10B981 | #6366F1 | #F59E0B | #0F172A |
| MOUJE-LEELL | #6366F1 | #8B5CF6 | #F59E0B | #FFFFFF |

### Utilisation du ThemeProvider

Intégration dans le layout principal:

```tsx
// src/app/layout.tsx
import { ThemeProvider } from '@/components/theme';

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

Changement de thème dans un composant:

```tsx
import { useTheme } from '@/components/theme';

function SubsidiarySelector() {
  const { themeName, setTheme } = useTheme();
  
  return (
    <div>
      <button onClick={() => setTheme('genius')}>Genius</button>
      <button onClick={() => setTheme('mps')}>MPS</button>
      <button onClick={() => setTheme('labrigad')}>LABRIG'AD</button>
      <button onClick={() => setTheme('gamius')}>GAMIUS</button>
      <button onClick={() => setTheme('moujeleell')}>MOUJE-LEELL</button>
    </div>
  );
}
```

## Utilisation des composants

Les composants Shadcn sont automatiquement stylisés en fonction du thème actif. Vous pouvez les utiliser comme suit:

```tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function ExampleComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Titre de la carte</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Contenu de la carte</p>
        <Button>Action</Button>
      </CardContent>
    </Card>
  );
}
```

## Architecture des filiales

Chaque filiale a sa propre section dans l'application avec un wrapper qui définit automatiquement le thème approprié:

```tsx
// src/app/[locale]/subsidiaries/mps/layout.tsx
'use client';

import { useTheme } from '@/components/theme';
import { useEffect } from 'react';

export default function MPSLayout({ children }) {
  const { setTheme } = useTheme();
  
  // Définit le thème MPS lorsqu'on visite une page MPS
  useEffect(() => {
    setTheme('mps');
    
    // Restaure le thème Genius par défaut lorsqu'on quitte les pages MPS
    return () => setTheme('genius');
  }, [setTheme]);
  
  return <>{children}</>;
}
```

## Migration des composants existants

Pour migrer des composants existants vers le nouveau système:

1. Identifiez les composants atoms à remplacer (Button, Typography, etc.)
2. Créez des adaptateurs pour assurer la compatibilité des API
3. Remplacez progressivement les importations

### Exemple d'adaptateur

```tsx
// src/components/atoms/Button.tsx (adaptateur)
import { Button as ShadcnButton } from '@/components/ui/button';

export const Button = ({ variant, ...props }) => {
  // Mappage des variantes de l'ancien système vers Shadcn
  const variantMap = {
    primary: 'default',
    secondary: 'secondary',
    outline: 'outline',
    // etc.
  };
  
  return <ShadcnButton variant={variantMap[variant] || variant} {...props} />;
};
```

## Conclusion

Ce système de thèmes unifié avec Shadcn UI permet de maintenir une cohérence à travers le site tout en préservant l'identité unique de chaque filiale. En suivant cette architecture, nous simplifions le développement et assurons une expérience utilisateur de haute qualité. 