/**
 * Shadcn UI Adapter Components
 * 
 * These components provide compatibility with the original component APIs
 * while using the Shadcn UI components underneath.
 * 
 * This file exports all adapter components for easy importing:
 * import { Button, Typography, Card, Input, Form } from '@/components/atoms/shadcn-adapters';
 */

export { default as Button, type ButtonProps } from './Button';
export { default as Typography, type TypographyProps } from './Typography';
export { default as Card, type CardProps } from './Card';
export { default as Input, type InputProps } from './Input';
export { Form } from './Form';

export { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuItem, 
  NavigationMenuContent, 
  NavigationMenuTrigger, 
  NavigationMenuLink, 
  NavigationMenuIndicator, 
  NavigationMenuViewport 
} from '@/components/ui/navigation-menu';

export { 
  Sheet, 
  SheetPortal, 
  SheetOverlay, 
  SheetTrigger, 
  SheetClose, 
  SheetContent, 
  SheetHeader, 
  SheetFooter, 
  SheetTitle, 
  SheetDescription 
} from '@/components/ui/sheet';

export { Separator } from '@/components/ui/separator';

// We'll add more adapter components here as they are created 