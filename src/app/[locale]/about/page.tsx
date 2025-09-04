import { Metadata } from 'next';

// Définition des métadonnées (côté serveur)
export const metadata: Metadata = {
  title: 'About Us - Genius Ad District',
  description: 'Discover the story, mission and values of Genius Ad District, a leading creative agency in Morocco and the MEA region.',
  keywords: ['about us', 'creative agency', 'mission', 'vision', 'values', 'team', 'history', 'Morocco']
};

// Import du composant client
import dynamic from 'next/dynamic';

// Chargement dynamique du composant client avec désactivation du SSR
const AboutPageClient = dynamic(
  () => import('@/components/pages/AboutPageClient'),
  { ssr: false }
);

// Composant principal de la page (côté serveur)
export default function AboutPage() {
  return <AboutPageClient />;
}