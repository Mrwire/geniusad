// Données des filiales pour le composant RadialOrbital

export interface OrbitalItemType {
  id: number;
  name: string;
  shortName: string;
  description: string;
  logo: string;
  color: string;
}

// Logos des filiales
export const orbitalItems: OrbitalItemType[] = [
  {
    id: 1,
    name: "MPS",
    shortName: "MPS",
    description: "MPS est spécialisée dans les solutions marketing et publicitaires digitales innovantes.",
    logo: "/item_images/logo_filiale_rectangulaire/logo_mps.png",
    color: "#3B82F6" // Bleu
  },
  {
    id: 2,
    name: "Labrigad",
    shortName: "Labrigad",
    description: "Labrigad crée des expériences immersives et du contenu créatif de haute qualité.",
    logo: "/item_images/logo_filiale_rectangulaire/logo_labrigad.png",
    color: "#F97316" // Orange
  },
  {
    id: 3,
    name: "Gamius",
    shortName: "Gamius",
    description: "Gamius développe des solutions gamifiées et des expériences interactives engageantes.",
    logo: "/item_images/logo_filiale_rectangulaire/logo_gamius.png",
    color: "#10B981" // Vert
  },
  {
    id: 4,
    name: "Moujeleell",
    shortName: "Moujeleell",
    description: "Moujeleell se spécialise dans l'animation et la production visuelle haut de gamme.",
    logo: "/item_images/logo_filiale_rectangulaire/logo_moujeleell.png",
    color: "#8B5CF6" // Violet
  }
];

// Logo central (Genius)
export const centerLogo = "/item_images/logo_filiale_rectangulaire/logo_genius_black.png";
