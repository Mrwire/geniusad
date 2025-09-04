# Modern UI Components Guide

## Overview

This guide documents the modern UI components created for the Genius Ad District project. These components have been designed with a focus on:

- **Modern aesthetics**: Clean, professional design aligned with current web standards
- **Responsive layouts**: Fully functional on all device sizes
- **Accessibility**: WCAG-compliant with proper contrast and semantic HTML
- **Performance**: Optimized for loading speed and rendering efficiency

## Components

### Modern Header (`ModernHeader.tsx`)

The modern header provides sophisticated navigation with dropdown menus and responsive behavior.

#### Features:
- Desktop and mobile navigation variants
- Animated dropdown menus
- Language switcher
- Responsive design with hamburger menu for small screens
- Scroll behavior with transparent/solid background transitions

#### Usage:
```tsx
import { ModernHeader } from '@/components/organisms/ModernHeader';

// In your layout or page component
<ModernHeader />
```

### Modern Footer (`ModernFooter.tsx`)

A comprehensive footer component with newsletter signup, navigation links, and social media integration.

#### Features:
- Newsletter subscription form
- Organized navigation links
- Social media icons
- Copyright information
- Responsive grid layout

#### Usage:
```tsx
import { ModernFooter } from '@/components/organisms/ModernFooter';

// In your layout or page component
<ModernFooter />
```

### Sitemap (`Sitemap.tsx`)

A structured sitemap component that organizes all site navigation into logical categories.

#### Features:
- Categorized navigation links
- Visual indicators for new content
- Responsive grid layout
- Locale support

#### Usage:
```tsx
import { Sitemap } from '@/components/organisms/Sitemap';

// In your layout or page component
<Sitemap />
```

### BaseLayout (`BaseLayout.tsx`)

A template component that integrates the header, main content, footer, and sitemap.

#### Features:
- Consistent layout structure
- Optional header/footer toggling
- Props for customization
- Responsive container sizing

#### Usage:
```tsx
import BaseLayout from '@/components/templates/BaseLayout';

// In your page component
export default function SomePage() {
  return (
    <BaseLayout>
      <main>
        {/* Your page content */}
      </main>
    </BaseLayout>
  );
}
```

## Shadcn UI Adaptations

### Navigation Menu

A comprehensive dropdown navigation system based on Radix UI's navigation primitives.

#### Features:
- Multi-level navigation
- Animated indicators
- Keyboard navigation support
- Mobile-friendly design

### Sheet

A slide-in panel useful for mobile navigation or contextual information.

#### Features:
- Side drawer functionality
- Customizable positions (left, right, top, bottom)
- Focus management
- Animated transitions

### Separator

A visual divider for separating content sections.

#### Features:
- Horizontal or vertical orientation
- Customizable styling
- Semantic HTML divider

## Usage Guidelines

1. **Import Consistency**: Always import components from their designated paths
2. **Responsive Testing**: Verify components work across all breakpoints
3. **Theme Integration**: Components support theme variations via the ThemeProvider
4. **Accessibility**: Maintain ARIA attributes when implementing components
5. **Performance**: Avoid unnecessary re-renders by properly using React hooks

## Example Implementation

See the Modern UI Preview page at:
```
/[locale]/modern-ui-preview
```

This page demonstrates the integration of all modern UI components in a cohesive layout.

## Troubleshooting

Common issues and their solutions:

1. **Image Path Issues**: Ensure image paths do not include `/public` prefix
2. **Package Dependencies**: Verify all required packages are installed:
   - framer-motion
   - @radix-ui/react-dialog
   - @radix-ui/react-navigation-menu
   - lucide-react
   - class-variance-authority
   - clsx

3. **CSS Issues**: Check that the required styles are imported for shadcn components

## Contributing

When extending these components:
1. Follow established naming conventions
2. Maintain responsive design principles
3. Test thoroughly across devices
4. Document any significant changes 