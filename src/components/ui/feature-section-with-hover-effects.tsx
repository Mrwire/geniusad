import { cn } from "@/lib/utils";
import {
  IconBrandCashapp,
  IconBuildingStore,
  IconBulb,
  IconCamera,
  IconChartBar,
  IconDeviceGamepad2,
  IconEaseInOut,
  IconPalette,
} from "@tabler/icons-react";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Stratégie Marketing",
      description:
        "Nous développons des stratégies marketing basées sur les données pour connecter votre marque avec votre audience cible.",
      icon: <IconChartBar className="w-6 h-6" />,
      subsidiary: "MPS",
      href: "/filiales/mps",
    },
    {
      title: "Direction Créative",
      description:
        "Notre équipe de directeurs artistiques crée des identités de marque distinctives qui captent l'attention de votre audience.",
      icon: <IconBulb className="w-6 h-6" />,
      subsidiary: "LABRIG'Ad",
      href: "/filiales/labrigad",
    },
    {
      title: "Design & Production",
      description:
        "Nous transformons vos idées en réalités visuelles percutantes, de la conception à la production finale.",
      icon: <IconPalette className="w-6 h-6" />,
      subsidiary: "LABRIG'Ad",
      href: "/filiales/labrigad",
    },
    {
      title: "Marketing Digital",
      description: 
        "Des stratégies digitales qui maximisent votre présence en ligne et génèrent des conversions.",
      icon: <IconBrandCashapp className="w-6 h-6" />,
      subsidiary: "MPS",
      href: "/filiales/mps",
    },
    {
      title: "E-Sport & Gaming",
      description: 
        "Solutions gaming innovantes pour atteindre de nouvelles audiences et créer des expériences engageantes.",
      icon: <IconDeviceGamepad2 className="w-6 h-6" />,
      subsidiary: "Gamius",
      href: "/filiales/gamius",
    },
    {
      title: "Expérience Utilisateur",
      description:
        "Nous créons des expériences numériques fluides et intuitives qui transforment les visiteurs en clients fidèles.",
      icon: <IconEaseInOut className="w-6 h-6" />,
      subsidiary: "Mouje & Leell",
      href: "/filiales/moujeleell",
    },
    {
      title: "Activation Retail",
      description:
        "Nous donnons vie à votre marque dans les espaces physiques avec des activations mémorables et impactantes.",
      icon: <IconBuildingStore className="w-6 h-6" />,
      subsidiary: "LABRIG'Ad",
      href: "/filiales/labrigad",
    },
    {
      title: "Production Photo & Vidéo",
      description: "Des contenus visuels premium qui racontent l'histoire de votre marque avec authenticité et émotion.",
      icon: <IconCamera className="w-6 h-6" />,
      subsidiary: "Mouje & Leell",
      href: "/filiales/moujeleell",
    },
  ];
  
  return (
    <div className="bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">NOS EXPERTISES</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Découvrez notre portfolio de services spécialisés pour transformer votre marque et captiver votre audience
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10">
          {features.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
  subsidiary,
  href,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  subsidiary: string;
  href: string;
}) => {
  return (
    <a
      href={href}
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800 hover:bg-neutral-900/50 transition-colors duration-300",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-400 group-hover/feature:text-white transition-colors duration-200">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-700 group-hover/feature:bg-cyan-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-400 group-hover/feature:text-neutral-200 max-w-xs relative z-10 px-10 transition-colors duration-200">
        {description}
      </p>
      <div className="mt-6 px-10 text-xs font-medium text-neutral-500 group-hover/feature:text-cyan-500 transition-colors duration-200 relative z-10">
        {subsidiary}
      </div>
    </a>
  );
};
