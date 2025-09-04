'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { 
  Target, 
  LineChart, 
  Lightbulb, 
  Rocket, 
  TrendingUp, 
  RefreshCw 
} from 'lucide-react';
import ApplePhilosophySection from '@/components/ui/ApplePhilosophySection';

export default function BusinessPhilosophySection() {
  const params = useParams();
  const locale = (params && typeof params === 'object' && 'locale' in params) ? params.locale as string : 'fr';
  
  // Map emoji icons to Lucide icons
  const getIconForStep = (id: number) => {
    switch (id) {
      case 1: return <Target className="w-6 h-6" />;
      case 2: return <LineChart className="w-6 h-6" />;
      case 3: return <Lightbulb className="w-6 h-6" />;
      case 4: return <Rocket className="w-6 h-6" />;
      case 5: return <TrendingUp className="w-6 h-6" />;
      case 6: return <RefreshCw className="w-6 h-6" />;
      default: return <Target className="w-6 h-6" />;
    }
  };

  // Prepare content based on locale
  const content = {
    title: locale === 'fr' ? 'Notre Philosophie d\'Entreprise' : 'Our Business Philosophy',
    subtitle: locale === 'fr' ? 'Boucle d\'Amélioration Continue' : 'Continuous Improvement Loop',
    description: locale === 'fr' ? 
      'Notre approche commerciale suit un cycle d\'amélioration continue, nous assurant de livrer des résultats exceptionnels tout en évoluant constamment nos stratégies.' :
      'Our business approach follows a continuous improvement cycle, ensuring we deliver exceptional results while constantly evolving our strategies.',
    steps: locale === 'fr' ? [
      { 
        id: 1, 
        title: 'IMMERSION DANS LA CULTURE CLIENT', 
        description: 'Comprendre profondément les valeurs, l\'identité et les objectifs de nos clients',
        icon: getIconForStep(1) 
      },
      { 
        id: 2, 
        title: 'ANALYSE DE SITUATION', 
        description: 'Évaluer le marché, la concurrence et identifier les opportunités stratégiques',
        icon: getIconForStep(2) 
      },
      { 
        id: 3, 
        title: 'CONCEPT CRÉATIF', 
        description: 'Développer des idées innovantes qui captivent et engagent le public cible',
        icon: getIconForStep(3) 
      },
      { 
        id: 4, 
        title: 'PLANIFICATION & EXÉCUTION CAMPAGNE', 
        description: 'Mettre en œuvre des stratégies efficaces avec précision et excellence',
        icon: getIconForStep(4) 
      },
      { 
        id: 5, 
        title: 'RÉSULTATS COMMERCIAUX CLIENT', 
        description: 'Mesurer l\'impact et générer une valeur commerciale tangible',
        icon: getIconForStep(5) 
      },
      { 
        id: 6, 
        title: 'AMÉLIORATION CONTINUE', 
        description: 'Optimiser nos approches en fonction des résultats et des nouvelles perspectives',
        icon: getIconForStep(6) 
      },
    ] : [
      { 
        id: 1, 
        title: 'IMMERSION IN CLIENT CULTURE', 
        description: 'Deeply understand our clients\'s values, identity, and business objectives',
        icon: getIconForStep(1) 
      },
      { 
        id: 2, 
        title: 'SITUATION ANALYSIS', 
        description: 'Evaluate the market, competition, and identify strategic opportunities',
        icon: getIconForStep(2) 
      },
      { 
        id: 3, 
        title: 'CREATIVE CONCEPT', 
        description: 'Develop innovative ideas that captivate and engage the target audience',
        icon: getIconForStep(3) 
      },
      { 
        id: 4, 
        title: 'ADVERTISING CAMPAIGN PLANNING & EXECUTION', 
        description: 'Implement effective strategies with precision and excellence',
        icon: getIconForStep(4) 
      },
      { 
        id: 5, 
        title: 'CLIENT BUSINESS RESULTS', 
        description: 'Measure impact and generate tangible business value',
        icon: getIconForStep(5) 
      },
      { 
        id: 6, 
        title: 'CONTINUOUS IMPROVEMENT', 
        description: 'Optimize our approaches based on results and new insights',
        icon: getIconForStep(6) 
      },
    ]
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-black p-0 border border-gray-800 shadow-xl">
      <ApplePhilosophySection
        title={content.title}
        subtitle={content.subtitle}
        description={content.description}
        steps={content.steps}
        autoRotate={true}
        rotationInterval={4000}
        className="w-full"
      />
    </div>
  );
}
