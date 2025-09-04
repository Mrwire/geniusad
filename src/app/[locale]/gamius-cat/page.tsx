import GamiusCatImmersive from '@/components/GamiusCat/GamiusCatImmersive';
import { Metadata } from 'next';

// Enhanced metadata for the immersive gaming experience
export const metadata: Metadata = {
  title: "Gamius Cat - Expérience Immersive 3D | Gamius Group",
  description: "Plongez dans l'univers interactif de Gamius Cat. Une expérience 3D immersive type jeu vidéo qui démontre le potentiel créatif de Gamius Group.",
  keywords: "Gamius, IA, assistant virtuel, 3D, jeu interactif, immersif, expérience utilisateur, technologie",
  openGraph: {
    title: "Gamius Cat - Expérience Immersive 3D",
    description: "Une expérience 3D immersive type jeu vidéo avec Gamius Cat",
    type: "website",
  },
};

interface GamiusCatPageProps {
  params: {
    locale: string;
  };
}

export default function GamiusCatPage({ params }: GamiusCatPageProps) {
  return (
    <GamiusCatImmersive lang={params.locale} />
  );
}
