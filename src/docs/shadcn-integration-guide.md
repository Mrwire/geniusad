# Guide d'intégration de Shadcn UI avec le système de thèmes

Ce guide explique pas à pas comment intégrer Shadcn UI et notre système de thèmes dans l'application Genius Ad District.

## Étapes d'installation

### 1. Installation de Shadcn UI avec MCP Registry

```bash
npx -y shadcn@canary registry:mcp
```

Lors de l'installation, répondez aux questions comme suit:
- Chemin pour les composants: `src/components/ui`
- Emplacement du fichier de style global: `src/app/globals.css`
- Emplacement du fichier utils: `src/lib/utils.ts`
- Préfixe pour les classes CSS: aucun (laissez vide)
- Thème sombre: oui
- Style React Server Components (RSC): oui

### 2. Exécution du script d'initialisation

```bash
node src/scripts/initialize-shadcn.js
```

Ce script va:
- Créer les fichiers de thèmes pour chaque filiale
- Configurer le ThemeProvider
- Installer les composants Shadcn courants

### 3. Intégration du ThemeProvider dans le layout principal

Mettez à jour le fichier `src/app/[locale]/layout.tsx` pour intégrer le ThemeProvider:

```tsx
import { ThemeProvider } from '@/components/theme';
import { Inter } from 'next/font/google';
import '@/app/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={params.locale}>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

## Utilisation des composants adaptateurs

Vous pouvez utiliser les composants adaptateurs qui maintiennent la compatibilité avec l'API existante tout en utilisant les composants Shadcn UI:

```tsx
import { Button, Typography, Card } from '@/components/atoms/shadcn-adapters';

function MyComponent() {
  return (
    <div>
      <Typography variant="h1">Titre principal</Typography>
      <Card 
        title="Titre de la carte" 
        description="Description de la carte"
      >
        Contenu de la carte
      </Card>
      <Button variant="primary">Action</Button>
    </div>
  );
}
```

## Utilisation directe des composants Shadcn UI

Vous pouvez également utiliser directement les composants Shadcn UI:

```tsx
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

function MyComponent() {
  return (
    <div>
      <h1>Titre principal</h1>
      <Card>
        <CardHeader>
          <CardTitle>Titre de la carte</CardTitle>
          <CardDescription>Description de la carte</CardDescription>
        </CardHeader>
        <CardContent>
          Contenu de la carte
        </CardContent>
      </Card>
      <Button>Action</Button>
    </div>
  );
}
```

## Application des thèmes des filiales

### Définition automatique du thème par section

Chaque section de filiale a un layout qui définit automatiquement le thème approprié:

```tsx
// src/app/[locale]/subsidiaries/mps/layout.tsx
'use client';

import { useTheme } from '@/components/theme';
import { useEffect } from 'react';

export default function MPSLayout({ children }) {
  const { setTheme } = useTheme();
  
  useEffect(() => {
    setTheme('mps');
    return () => setTheme('genius');
  }, [setTheme]);
  
  return <>{children}</>;
}
```

### Changement manuel du thème

Vous pouvez changer manuellement le thème dans n'importe quel composant client:

```tsx
'use client';

import { useTheme } from '@/components/theme';
import { Button } from '@/components/atoms/shadcn-adapters';

export function ThemeSwitcher() {
  const { themeName, setTheme } = useTheme();
  
  return (
    <div className="flex gap-2">
      <Button 
        variant={themeName === 'genius' ? 'primary' : 'outline'}
        onClick={() => setTheme('genius')}
      >
        Genius
      </Button>
      <Button 
        variant={themeName === 'mps' ? 'primary' : 'outline'}
        onClick={() => setTheme('mps')}
      >
        MPS
      </Button>
      {/* Ajoutez d'autres boutons pour les autres filiales */}
    </div>
  );
}
```

## Classes CSS basées sur le thème

Le système de thèmes ajoute des variables CSS à la racine du document et une classe au body. Vous pouvez utiliser ces éléments dans vos styles:

```css
/* Utilisation des variables CSS */
.custom-element {
  background-color: var(--primary);
  color: var(--primary-foreground);
}

/* Styles spécifiques à un thème */
.theme-mps .custom-element {
  border-width: 2px;
}
```

## Migration progressive

La migration vers Shadcn UI peut se faire progressivement:

1. Commencez par intégrer le ThemeProvider
2. Utilisez les composants adaptateurs pour maintenir la compatibilité
3. Migrez progressivement vers les composants Shadcn UI directs
4. Ajustez les styles et thèmes selon les besoins

## Ressources

- [Documentation Shadcn UI](https://ui.shadcn.com/)
- [Documentation MCP Shadcn Registry](https://registry.shadcn.com/)
- [Notre documentation interne](./shadcn-theme-system.md)

Pour plus d'informations, consultez les fichiers sources dans:
- `src/components/theme`
- `src/styles/themes`
- `src/components/atoms/shadcn-adapters` 