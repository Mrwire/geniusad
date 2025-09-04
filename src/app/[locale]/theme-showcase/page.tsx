'use client';

import React, { useState } from 'react';
import { Button, Typography, Card } from '@/components/atoms/shadcn-adapters';
import { useTheme, ThemeName } from '@/components/theme/ThemeProvider';

export default function ThemeShowcasePage() {
  const { themeName, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('components');
  
  const themes = [
    { id: 'genius' as ThemeName, name: 'Genius Ad District' },
    { id: 'mps' as ThemeName, name: 'MPS' },
    { id: 'labrigad' as ThemeName, name: 'Labrig\'Ad' },
    { id: 'gamius' as ThemeName, name: 'Gamius' },
    { id: 'moujeleell' as ThemeName, name: 'Mouje Leell' }
  ];
  
  const tabs = [
    { id: 'components', label: 'Composants' },
    { id: 'colors', label: 'Couleurs' },
    { id: 'typography', label: 'Typographie' }
  ];
  
  return (
    <div className="container mx-auto py-8 px-4">
      <Typography component="h4" className="mb-2">
        Système de thèmes Shadcn
      </Typography>
      
      <Typography component="h1" className="mb-6">
        Cette page démontre le système de thèmes avec les composants adaptateurs Shadcn UI.
      </Typography>
      
      {/* Theme Selector */}
      <div className="mb-10">
        <Typography component="h2" className="mb-4">
          Thèmes disponibles
        </Typography>
        
        <div className="flex flex-wrap gap-2">
          {themes.map((theme) => (
            <Button
              key={theme.id}
              variant={themeName === theme.id ? 'primary' : 'outline'}
              onClick={() => setTheme(theme.id)}
            >
              {theme.name}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b mb-6">
        <div className="flex gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`pb-2 px-1 font-medium ${
                activeTab === tab.id 
                  ? 'border-b-2 border-primary text-primary' 
                  : 'text-muted-foreground'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Components Tab */}
      {activeTab === 'components' && (
        <div className="space-y-10">
          {/* Buttons */}
          <section>
            <Typography component="h2" className="mb-4">Boutons</Typography>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="danger">Danger</Button>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-4">
              <Button variant="primary" size="small">Small</Button>
              <Button variant="primary" size="default">Default</Button>
              <Button variant="primary" size="large">Large</Button>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-4">
              <Button variant="primary" loading>Loading</Button>
              <Button variant="outline" disabled>Disabled</Button>
              <Button variant="primary" startIcon={<IconPlus />}>With Icon</Button>
            </div>
          </section>
          
          {/* Cards */}
          <section>
            <Typography component="h2" className="mb-4">Cards</Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card
                title="Carte standard"
                description="Description de la carte avec un style par défaut"
              >
                <div className="h-40 flex items-center justify-center bg-muted/30 rounded-sm">
                  <Typography component="p" className="text-muted-foreground">Contenu de la carte</Typography>
                </div>
              </Card>
              
              <Card
                variant="elevated"
                title="Carte avec élévation"
                description="Cette carte a une ombre portée plus prononcée"
              >
                <div className="h-40 flex items-center justify-center bg-muted/30 rounded-sm">
                  <Typography component="p" className="text-muted-foreground">Contenu de la carte</Typography>
                </div>
              </Card>
              
              <Card
                variant="outlined"
                title="Carte avec bordure"
                description="Cette carte a une bordure plus visible"
              >
                <div className="h-40 flex items-center justify-center bg-muted/30 rounded-sm">
                  <Typography component="p" className="text-muted-foreground">Contenu de la carte</Typography>
                </div>
              </Card>
              
              <Card
                variant="primary"
                title="Carte avec couleur primaire"
                description="Cette carte utilise la couleur primaire du thème actuel"
              >
                <div className="h-40 flex items-center justify-center bg-primary-foreground/10 rounded-sm">
                  <Typography component="p">Contenu de la carte</Typography>
                </div>
              </Card>
              
              <Card
                variant="secondary"
                title="Carte avec couleur secondaire"
                description="Cette carte utilise la couleur secondaire du thème actuel"
              >
                <div className="h-40 flex items-center justify-center bg-secondary-foreground/10 rounded-sm">
                  <Typography component="p">Contenu de la carte</Typography>
                </div>
              </Card>
              
              <Card
                title="Carte avec pied de page"
                description="Cette carte a un pied de page avec des actions"
                footer={
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="small">Annuler</Button>
                    <Button variant="primary" size="small">Confirmer</Button>
                  </div>
                }
              >
                <div className="h-40 flex items-center justify-center bg-muted/30 rounded-sm">
                  <Typography component="p" className="text-muted-foreground">Contenu de la carte</Typography>
                </div>
              </Card>
            </div>
          </section>
        </div>
      )}
      
      {/* Colors Tab */}
      {activeTab === 'colors' && (
        <div className="space-y-8">
          <Typography component="h2" className="mb-4">Palette de couleurs</Typography>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Primary colors */}
            <div className="space-y-2">
              <Typography component="p">Couleur primaire</Typography>
              <div className="rounded-md overflow-hidden">
                <div className="bg-primary h-12 flex items-center px-4">
                  <Typography component="p" className="text-primary-foreground">primary</Typography>
                </div>
                <div className="bg-primary/90 h-8 flex items-center px-4">
                  <Typography component="p" className="text-primary-foreground">primary/90</Typography>
                </div>
                <div className="bg-primary/80 h-8 flex items-center px-4">
                  <Typography component="p" className="text-primary-foreground">primary/80</Typography>
                </div>
                <div className="bg-primary/60 h-8 flex items-center px-4">
                  <Typography component="p" className="text-primary-foreground">primary/60</Typography>
                </div>
                <div className="bg-primary/40 h-8 flex items-center px-4">
                  <Typography component="p" className="text-primary-foreground">primary/40</Typography>
                </div>
                <div className="bg-primary/20 h-8 flex items-center px-4">
                  <Typography component="blockquote">primary/20</Typography>
                </div>
                <div className="bg-primary/10 h-8 flex items-center px-4">
                  <Typography component="blockquote">primary/10</Typography>
                </div>
              </div>
            </div>
            
            {/* Secondary colors */}
            <div className="space-y-2">
              <Typography component="p">Couleur secondaire</Typography>
              <div className="rounded-md overflow-hidden">
                <div className="bg-secondary h-12 flex items-center px-4">
                  <Typography component="p" className="text-secondary-foreground">secondary</Typography>
                </div>
                <div className="bg-secondary/90 h-8 flex items-center px-4">
                  <Typography component="p" className="text-secondary-foreground">secondary/90</Typography>
                </div>
                <div className="bg-secondary/80 h-8 flex items-center px-4">
                  <Typography component="p" className="text-secondary-foreground">secondary/80</Typography>
                </div>
                <div className="bg-secondary/60 h-8 flex items-center px-4">
                  <Typography component="p" className="text-secondary-foreground">secondary/60</Typography>
                </div>
                <div className="bg-secondary/40 h-8 flex items-center px-4">
                  <Typography component="blockquote">secondary/40</Typography>
                </div>
                <div className="bg-secondary/20 h-8 flex items-center px-4">
                  <Typography component="blockquote">secondary/20</Typography>
                </div>
                <div className="bg-secondary/10 h-8 flex items-center px-4">
                  <Typography component="blockquote">secondary/10</Typography>
                </div>
              </div>
            </div>
          </div>
          
          {/* UI colors */}
          <div className="space-y-2">
            <Typography component="p">Couleurs d'interface</Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="bg-background border h-16 flex items-center px-4 rounded-md">
                  <Typography component="blockquote">background</Typography>
                </div>
                <div className="bg-foreground h-16 flex items-center px-4 rounded-md">
                  <Typography component="p" className="text-background">foreground</Typography>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="bg-muted h-16 flex items-center px-4 rounded-md">
                  <Typography component="p" className="text-muted-foreground">muted</Typography>
                </div>
                <div className="bg-muted-foreground h-16 flex items-center px-4 rounded-md">
                  <Typography component="p" className="text-muted">muted-foreground</Typography>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="bg-accent h-16 flex items-center px-4 rounded-md">
                  <Typography component="p" className="text-accent-foreground">accent</Typography>
                </div>
                <div className="bg-destructive h-16 flex items-center px-4 rounded-md">
                  <Typography component="p" className="text-destructive-foreground">destructive</Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Typography Tab */}
      {activeTab === 'typography' && (
        <div className="space-y-10">
          <Typography component="h2" className="mb-4">Typographie</Typography>
          
          {/* Headings */}
          <section>
            <Typography component="h3" className="mb-4">Titres</Typography>
            <div className="space-y-4">
              <Typography component="h1">Titre h1</Typography>
              <Typography component="h2">Titre h2</Typography>
              <Typography component="h3">Titre h3</Typography>
              <Typography component="h4">Titre h4</Typography>
              <Typography component="h5">Titre h5</Typography>
              <Typography component="h6">Titre h6</Typography>
            </div>
          </section>
          
          {/* Body text */}
          <section>
            <Typography component="h3" className="mb-4">Texte courant</Typography>
            <div className="space-y-6">
              <div>
                <Typography component="h5" className="mb-2">
                  Lead text
                </Typography>
                <Typography component="span">
                  Ce texte de type "lead" est plus grand que le texte de corps normal.
                </Typography>
              </div>
              
              <div>
                <Typography component="h5" className="mb-2">
                  Body text
                </Typography>
                <Typography component="span">
                  Le texte de corps standard utilisé pour la plupart du contenu.
                </Typography>
              </div>
              
              <div>
                <Typography component="span" className="mb-2">
                  Large text
                </Typography>
                <Typography component="span">
                  Une version plus grande du texte de corps.
                </Typography>
              </div>
              
              <div>
                <Typography component="p" className="mb-2">
                  Small text
                </Typography>
                <Typography component="span">
                  Un texte plus petit utilisé pour les détails moins importants.
                </Typography>
              </div>
              
              <div>
                <Typography component="p" className="mb-2">
                  Muted text
                </Typography>
                <Typography component="span">
                  Un texte dont la couleur est atténuée pour moins attirer l'attention.
                </Typography>
              </div>
            </div>
          </section>
          
          {/* Font weights */}
          <section>
            <Typography component="h3" className="mb-4">Graisses de police</Typography>
            <div className="space-y-2">
              <Typography component="p" className="font-light">
                Light - Le poids de police le plus léger (300)
              </Typography>
              <Typography component="p" className="font-normal">
                Normal - Le poids de police standard (400)
              </Typography>
              <Typography component="p" className="font-medium">
                Medium - Un poids intermédiaire (500)
              </Typography>
              <Typography component="h6" className="font-semibold">
                Semibold - Un poids semi-gras (600)
              </Typography>
              <Typography component="p" className="font-bold">
                Bold - Un poids gras (700)
              </Typography>
              <Typography component="p" className="font-extrabold">
                Extrabold - Le poids le plus gras (800)
              </Typography>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

// Simple Plus icon component
function IconPlus() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
} 