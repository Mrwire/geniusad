import React, { useState } from 'react';
import { Button } from '../atoms/Button';
import { Card } from '../atoms/Card';
import { AnimatedSurface } from '../atoms/AnimatedSurface';
import { AnimatedNavLink } from '../molecules/AnimatedNavLink';
import { ButtonGroup } from '../molecules/ButtonGroup';
import { Typography } from '../atoms/Typography';
import { Icon } from '../atoms/Icon';

interface ShowcaseSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

/**
 * ShowcaseSection component for grouping related UI components in the showcase
 */
const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({ title, description, children }) => (
  <div className="mb-12">
    <Typography variant="h3" className="mb-2">{title}</Typography>
    {description && (
      <Typography variant="body" color="text-gray-600" className="mb-6">{description}</Typography>
    )}
    <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
      {children}
    </div>
  </div>
);

/**
 * UiComponentShowcase component to demonstrate the enhanced Apple-inspired UI components
 */
export const UiComponentShowcase: React.FC = () => {
  const [activeSubsidiary, setActiveSubsidiary] = useState<'mps' | 'labrigad' | 'gamius' | 'moujeleell' | null>(null);
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Typography variant="h1" className="mb-2">Genius UI Showcase</Typography>
      <Typography variant="body-lg" className="mb-12">Apple-inspired UI components with enhanced animations and interactions</Typography>
      
      {/* Subsidiary selector */}
      <div className="mb-12">
        <Typography variant="h5" className="mb-4">Subsidiary Theme</Typography>
        <ButtonGroup
          groupVariant="segmented"
          spacing="none"
          buttons={[
            { label: 'Default', variant: activeSubsidiary === null ? 'primary' : 'tertiary', onClick: () => setActiveSubsidiary(null) },
            { label: 'MPS', variant: activeSubsidiary === 'mps' ? 'primary' : 'tertiary', subsidiary: 'mps', onClick: () => setActiveSubsidiary('mps') },
            { label: 'Labrigad', variant: activeSubsidiary === 'labrigad' ? 'primary' : 'tertiary', subsidiary: 'labrigad', onClick: () => setActiveSubsidiary('labrigad') },
            { label: 'Gamius', variant: activeSubsidiary === 'gamius' ? 'primary' : 'tertiary', subsidiary: 'gamius', onClick: () => setActiveSubsidiary('gamius') },
            { label: 'Moujeleell', variant: activeSubsidiary === 'moujeleell' ? 'primary' : 'tertiary', subsidiary: 'moujeleell', onClick: () => setActiveSubsidiary('moujeleell') },
          ]}
        />
      </div>
      
      {/* Button showcase */}
      <ShowcaseSection
        title="Buttons"
        description="Enhanced buttons with Apple-inspired animations and styles"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Typography variant="h6" className="mb-4">Button Variants</Typography>
            <div className="flex flex-col gap-4">
              <Button variant="primary" subsidiary={activeSubsidiary || undefined}>Primary Button</Button>
              <Button variant="secondary" subsidiary={activeSubsidiary || undefined}>Secondary Button</Button>
              <Button variant="tertiary" subsidiary={activeSubsidiary || undefined}>Tertiary Button</Button>
              <Button variant="glass">Glass Button</Button>
            </div>
          </div>
          <div>
            <Typography variant="h6" className="mb-4">Button Sizes</Typography>
            <div className="flex flex-col gap-4">
              <Button variant="primary" size="lg" subsidiary={activeSubsidiary || undefined}>Large Button</Button>
              <Button variant="primary" size="md" subsidiary={activeSubsidiary || undefined}>Medium Button</Button>
              <Button variant="primary" size="sm" subsidiary={activeSubsidiary || undefined}>Small Button</Button>
              <Button variant="primary" subsidiary={activeSubsidiary || undefined} isLoading>Loading Button</Button>
            </div>
          </div>
          <div>
            <Typography variant="h6" className="mb-4">Button Groups</Typography>
            <div className="flex flex-col gap-6">
              <ButtonGroup 
                groupVariant="pill"
                subsidiary={activeSubsidiary || undefined}
                buttons={[
                  { label: 'Day', variant: 'primary' },
                  { label: 'Week', variant: 'tertiary' },
                  { label: 'Month', variant: 'tertiary' },
                ]}
              />
              <ButtonGroup 
                groupVariant="toolbar"
                subsidiary={activeSubsidiary || undefined}
                buttons={[
                  { label: <Icon name="home" size="sm" />, variant: 'tertiary' },
                  { label: <Icon name="user" size="sm" />, variant: 'tertiary' },
                  { label: <Icon name="envelope" size="sm" />, variant: 'tertiary' },
                  { label: <Icon name="information" size="sm" />, variant: 'tertiary' },
                ]}
              />
            </div>
          </div>
        </div>
      </ShowcaseSection>
      
      {/* Card showcase */}
      <ShowcaseSection
        title="Cards"
        description="Enhanced card components with Apple-inspired animations and styles"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card variant="default" hover subsidiary={activeSubsidiary || undefined}>
            <Typography variant="h5" className="mb-2">Default Card</Typography>
            <Typography variant="body">This is a default card with hover effect.</Typography>
          </Card>
          <Card variant="elevated" hover subsidiary={activeSubsidiary || undefined}>
            <Typography variant="h5" className="mb-2">Elevated Card</Typography>
            <Typography variant="body">This is an elevated card with hover effect.</Typography>
          </Card>
          <Card variant="interactive" hover subsidiary={activeSubsidiary || undefined}>
            <Typography variant="h5" className="mb-2">Interactive Card</Typography>
            <Typography variant="body">This is an interactive card with hover effect.</Typography>
          </Card>
          <Card variant="outlined" hover subsidiary={activeSubsidiary || undefined}>
            <Typography variant="h5" className="mb-2">Outlined Card</Typography>
            <Typography variant="body">This is an outlined card with hover effect.</Typography>
          </Card>
          <Card variant="frosted" hover subsidiary={activeSubsidiary || undefined}>
            <Typography variant="h5" className="mb-2">Frosted Card</Typography>
            <Typography variant="body">This is a frosted glass card with hover effect.</Typography>
          </Card>
          <Card variant="feature" hover subsidiary={activeSubsidiary || undefined}>
            <Typography variant="h5" className="mb-2">Feature Card</Typography>
            <Typography variant="body">This is a feature card with hover effect.</Typography>
          </Card>
        </div>
      </ShowcaseSection>
      
      {/* Animated Surface showcase */}
      <ShowcaseSection
        title="Animated Surfaces"
        description="Interactive surfaces with sophisticated Apple-inspired animations"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatedSurface animationType="tilt" subsidiary={activeSubsidiary || undefined}>
            <div className="p-6">
              <Typography variant="h5" className="mb-2">Tilt Effect</Typography>
              <Typography variant="body">Hover over this surface to see the tilt effect.</Typography>
            </div>
          </AnimatedSurface>
          <AnimatedSurface animationType="spotlight" subsidiary={activeSubsidiary || undefined}>
            <div className="p-6">
              <Typography variant="h5" className="mb-2">Spotlight Effect</Typography>
              <Typography variant="body">Hover over this surface to see the spotlight follow your cursor.</Typography>
            </div>
          </AnimatedSurface>
          <AnimatedSurface animationType="glow" subsidiary={activeSubsidiary || undefined}>
            <div className="p-6">
              <Typography variant="h5" className="mb-2">Glow Effect</Typography>
              <Typography variant="body">Hover over this surface to see the glow effect.</Typography>
            </div>
          </AnimatedSurface>
          <AnimatedSurface animationType="float" hoverOnly={false} subsidiary={activeSubsidiary || undefined}>
            <div className="p-6">
              <Typography variant="h5" className="mb-2">Float Effect</Typography>
              <Typography variant="body">This surface has a constant floating animation.</Typography>
            </div>
          </AnimatedSurface>
          <AnimatedSurface animationType="parallax" subsidiary={activeSubsidiary || undefined}>
            <div className="p-6">
              <Typography variant="h5" className="mb-2">Parallax Effect</Typography>
              <Typography variant="body">Hover over this surface to see the parallax effect.</Typography>
            </div>
          </AnimatedSurface>
          <AnimatedSurface animationType="scale" subsidiary={activeSubsidiary || undefined}>
            <div className="p-6">
              <Typography variant="h5" className="mb-2">Scale Effect</Typography>
              <Typography variant="body">Hover over this surface to see the scale effect.</Typography>
            </div>
          </AnimatedSurface>
        </div>
      </ShowcaseSection>
      
      {/* Navigation showcase */}
      <ShowcaseSection
        title="Navigation Links"
        description="Enhanced navigation links with Apple-inspired animations"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Typography variant="h6" className="mb-4">Underline Style</Typography>
            <div className="flex gap-6">
              <AnimatedNavLink href="#" animationStyle="underline" subsidiary={activeSubsidiary || undefined}>
                Home
              </AnimatedNavLink>
              <AnimatedNavLink href="/about" animationStyle="underline" subsidiary={activeSubsidiary || undefined}>
                About
              </AnimatedNavLink>
              <AnimatedNavLink href="/services" animationStyle="underline" subsidiary={activeSubsidiary || undefined}>
                Services
              </AnimatedNavLink>
              <AnimatedNavLink href="/contact" animationStyle="underline" subsidiary={activeSubsidiary || undefined}>
                Contact
              </AnimatedNavLink>
            </div>
          </div>
          <div>
            <Typography variant="h6" className="mb-4">Highlight Style</Typography>
            <div className="flex gap-4">
              <AnimatedNavLink href="#" animationStyle="highlight" subsidiary={activeSubsidiary || undefined}>
                Home
              </AnimatedNavLink>
              <AnimatedNavLink href="/about" animationStyle="highlight" subsidiary={activeSubsidiary || undefined}>
                About
              </AnimatedNavLink>
              <AnimatedNavLink href="/services" animationStyle="highlight" subsidiary={activeSubsidiary || undefined}>
                Services
              </AnimatedNavLink>
              <AnimatedNavLink href="/contact" animationStyle="highlight" subsidiary={activeSubsidiary || undefined}>
                Contact
              </AnimatedNavLink>
            </div>
          </div>
        </div>
      </ShowcaseSection>
    </div>
  );
}; 