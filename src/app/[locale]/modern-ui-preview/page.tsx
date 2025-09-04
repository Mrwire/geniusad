'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ExternalLink, 
  CheckCircle2, 
  Palette,
  Layout,
  Navigation,
  Layers,
  Smartphone,
  Zap,
  Code2,
  Eye,
  MousePointer2
} from 'lucide-react';

import BaseLayout from '@/components/templates/BaseLayout';
import { 
  Button, 
  Card, 
  Separator,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
  Sheet,
  SheetTrigger,
  SheetContent
} from '@/components/atoms/shadcn-adapters';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8,
      ease: 'easeInOut'
    } 
  }
};

const staggeredContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.6,
      ease: 'easeInOut'
    } 
  }
};

const slideInFromLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.7,
      ease: 'easeInOut'
    } 
  }
};

// Multilingual content
const content = {
  fr: {
    title: "Aperçu UI Moderne",
    subtitle: "Découvrez notre interface modernisée avec les composants shadcn/ui, des animations fluides et un design responsive de niveau professionnel.",
    featuresTitle: "Fonctionnalités Avancées",
    componentsTitle: "Composants Interactifs",
    componentsSubtitle: "Explorez notre collection de composants shadcn/ui personnalisés",
    readyTitle: "Prêt à explorer ?",
    readySubtitle: "Défilez vers le bas pour découvrir le site map et le footer moderne, ou revenez à la page d'accueil.",
    backHome: "Retour à l'accueil",
    exploreComponents: "Explorer les composants",
    features: [
      { 
        title: "Navigation Intelligente", 
        description: "Système de navigation responsive avec menus dropdown adaptatifs et sélecteur de langue intégré.",
        icon: "navigation",
        gradient: "from-blue-500 to-purple-600"
      },
      { 
        title: "Footer Interactif", 
        description: "Zone de pied de page complète avec newsletter, liens organisés et intégration réseaux sociaux.",
        icon: "footer",
        gradient: "from-green-500 to-teal-600"
      },
      { 
        title: "Architecture du Site", 
        description: "Plan du site structuré avec liens catégorisés pour une navigation intuitive et un SEO optimisé.",
        icon: "sitemap",
        gradient: "from-orange-500 to-red-600"
      },
      { 
        title: "Composants Shadcn UI", 
        description: "Bibliothèque complète de composants modernes, réutilisables et entièrement personnalisables.",
        icon: "components",
        gradient: "from-purple-500 to-pink-600"
      },
      { 
        title: "Animations Cinématiques", 
        description: "Transitions fluides et animations sophistiquées pour une expérience utilisateur immersive.",
        icon: "animation",
        gradient: "from-yellow-500 to-orange-600"
      },
      { 
        title: "Design Adaptatif", 
        description: "Interface parfaitement responsive qui s'adapte élégamment à tous les types d'écrans.",
        icon: "responsive",
        gradient: "from-cyan-500 to-blue-600"
      }
    ]
  },
  en: {
    title: "Modern UI Preview",
    subtitle: "Discover our modernized interface with shadcn/ui components, fluid animations and professional-grade responsive design.",
    featuresTitle: "Advanced Features",
    componentsTitle: "Interactive Components",
    componentsSubtitle: "Explore our collection of customized shadcn/ui components",
    readyTitle: "Ready to explore?",
    readySubtitle: "Scroll down to discover the modern sitemap and footer, or return to the home page.",
    backHome: "Back to home",
    exploreComponents: "Explore components",
    features: [
      { 
        title: "Smart Navigation", 
        description: "Responsive navigation system with adaptive dropdown menus and integrated language selector.",
        icon: "navigation",
        gradient: "from-blue-500 to-purple-600"
      },
      { 
        title: "Interactive Footer", 
        description: "Complete footer area with newsletter, organized links and social media integration.",
        icon: "footer",
        gradient: "from-green-500 to-teal-600"
      },
      { 
        title: "Site Architecture", 
        description: "Structured sitemap with categorized links for intuitive navigation and optimized SEO.",
        icon: "sitemap",
        gradient: "from-orange-500 to-red-600"
      },
      { 
        title: "Shadcn UI Components", 
        description: "Complete library of modern, reusable and fully customizable components.",
        icon: "components",
        gradient: "from-purple-500 to-pink-600"
      },
      { 
        title: "Cinematic Animations", 
        description: "Smooth transitions and sophisticated animations for an immersive user experience.",
        icon: "animation",
        gradient: "from-yellow-500 to-orange-600"
      },
      { 
        title: "Adaptive Design", 
        description: "Perfectly responsive interface that elegantly adapts to all screen types.",
        icon: "responsive",
        gradient: "from-cyan-500 to-blue-600"
      }
    ]
  }
};

export default function ModernUIPreview() {
  const { locale } = useParams() as { locale: 'fr' | 'en' };
  const [activeTab, setActiveTab] = useState('buttons');
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  
  const t = content[locale] || content.fr;

  // Enhanced icon renderer with gradients and animations
  const renderIcon = (iconType: string, gradient: string) => {
    const iconProps = {
      className: "h-6 w-6",
      style: { filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }
    };

    const getIcon = () => {
      switch(iconType) {
        case 'navigation':
          return <Navigation {...iconProps} />;
        case 'footer':
          return <Layout {...iconProps} />;
        case 'sitemap':
          return <Layers {...iconProps} />;
        case 'components':
          return <Code2 {...iconProps} />;
        case 'animation':
          return <Zap {...iconProps} />;
        case 'responsive':
          return <Smartphone {...iconProps} />;
        default:
          return <CheckCircle2 {...iconProps} />;
      }
    };

    return (
      <motion.div 
        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${gradient} shadow-lg relative overflow-hidden`}
        whileHover={{ 
          scale: 1.1,
          rotate: 5,
          transition: { duration: 0.3 }
        }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="text-white relative z-10">
          {getIcon()}
        </div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-transparent to-white/10 rounded-2xl"
          animate={{
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    );
  };

  return (
    <BaseLayout includeHeader={false}>
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-black via-neutral-900 to-black py-32 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute top-20 -left-20 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-3xl"
              animate={{
                x: [0, 50, 0],
                y: [0, -30, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-full blur-3xl"
              animate={{
                x: [0, -30, 0],
                y: [0, 40, 0],
                scale: [1.1, 1, 1.1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          <div className="container mx-auto px-4 relative">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mb-8"
              >
                <Badge variant="outline" className="mb-6 px-4 py-2 text-sm border-white/20 bg-white/5 backdrop-blur-sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Interface Showcase
                </Badge>
              </motion.div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 leading-tight">
                {t.title}
              </h1>
              <motion.p 
                className="text-xl md:text-2xl text-white/70 mb-12 max-w-4xl mx-auto leading-relaxed"
                variants={fadeInUp}
              >
                {t.subtitle}
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap justify-center gap-4"
              >
                <Button 
                  size="large" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <MousePointer2 className="w-5 h-5 mr-2" />
                  {t.exploreComponents}
                </Button>
                <Button 
                  variant="outline" 
                  size="large"
                  className="border-white/30 hover:bg-white/10 backdrop-blur-sm px-8 py-3 rounded-full"
                >
                  {t.backHome}
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-gradient-to-b from-black to-neutral-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                {t.featuresTitle}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
            </motion.div>
            
            <motion.div
              variants={staggeredContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {t.features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  onHoverStart={() => setHoveredFeature(index)}
                  onHoverEnd={() => setHoveredFeature(null)}
                  className="relative group"
                >
                  <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-500 hover:bg-black/60 group-hover:shadow-2xl group-hover:shadow-purple-500/10">
                    <motion.div
                      animate={{
                        y: hoveredFeature === index ? -5 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {renderIcon(feature.icon, feature.gradient)}
                      <h3 className="text-xl font-semibold mb-4 text-white">
                        {feature.title}
                      </h3>
                      <p className="text-white/70 leading-relaxed">
                        {feature.description}
                      </p>
                    </motion.div>
                    
                    {/* Hover glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-600/5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredFeature === index ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Interactive Components Showcase */}
        <section className="py-24 bg-gradient-to-b from-neutral-900 to-black">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInFromLeft}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                {t.componentsTitle}
              </h2>
              <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
                {t.componentsSubtitle}
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-600 mx-auto rounded-full"></div>
            </motion.div>
            
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-6xl mx-auto"
            >
              <Card className="p-8 bg-black/50 border-white/10 backdrop-blur-xl rounded-3xl shadow-2xl">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/5 p-1 rounded-2xl">
                    <TabsTrigger 
                      value="buttons" 
                      className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600"
                    >
                      Boutons
                    </TabsTrigger>
                    <TabsTrigger 
                      value="navigation" 
                      className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-teal-600"
                    >
                      Navigation
                    </TabsTrigger>
                    <TabsTrigger 
                      value="forms" 
                      className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600"
                    >
                      Formulaires
                    </TabsTrigger>
                  </TabsList>
                  
                  <AnimatePresence mode="wait">
                    <TabsContent value="buttons" className="space-y-6">
                      <motion.div
                        key="buttons"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                      >
                        <div className="space-y-6">
                          <h3 className="text-2xl font-semibold mb-4 text-white">Variants de Boutons</h3>
                          <div className="flex flex-wrap gap-3">
                            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                              Default
                            </Button>
                            <Button variant="secondary">Secondary</Button>
                            <Button variant="outline">Outline</Button>
                            <Button variant="ghost">Ghost</Button>
                            <Button variant="link">Link Style</Button>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          <h3 className="text-2xl font-semibold mb-4 text-white">Tailles et États</h3>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <Button size="small">Small</Button>
                              <Button size="default">Default</Button>
                              <Button size="large">Large</Button>
                            </div>
                            <div className="flex items-center gap-3">
                              <Button disabled>Disabled</Button>
                              <Button className="bg-gradient-to-r from-green-600 to-teal-600">
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                With Icon
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </TabsContent>
                    
                    <TabsContent value="navigation" className="space-y-6">
                      <motion.div
                        key="navigation"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-8"
                      >
                        <div>
                          <h3 className="text-2xl font-semibold mb-6 text-white">Menu de Navigation</h3>
                          <NavigationMenu>
                            <NavigationMenuList>
                              <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-white/5 hover:bg-white/10">
                                  Produits
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                  <div className="p-6 w-[400px]">
                                    <h4 className="font-medium mb-3">Nos Solutions</h4>
                                    <p className="text-sm text-white/60">Découvrez notre gamme complète</p>
                                  </div>
                                </NavigationMenuContent>
                              </NavigationMenuItem>
                              <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-white/5 hover:bg-white/10">
                                  Services
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                  <div className="p-6 w-[400px]">
                                    <h4 className="font-medium mb-3">Nos Services</h4>
                                    <p className="text-sm text-white/60">Expertise et accompagnement</p>
                                  </div>
                                </NavigationMenuContent>
                              </NavigationMenuItem>
                            </NavigationMenuList>
                          </NavigationMenu>
                        </div>
                        
                        <div>
                          <h3 className="text-2xl font-semibold mb-6 text-white">Sheet/Modal</h3>
                          <Sheet>
                            <SheetTrigger asChild>
                              <Button variant="outline" className="border-white/20 hover:bg-white/5">
                                <Layers className="w-4 h-4 mr-2" />
                                Ouvrir le Panel
                              </Button>
                            </SheetTrigger>
                            <SheetContent className="bg-black/95 backdrop-blur-xl border-white/10">
                              <div className="p-6">
                                <h4 className="text-xl font-semibold mb-4 text-white">Contenu du Panel</h4>
                                <p className="text-white/70 leading-relaxed">
                                  Ceci est un exemple de composant Sheet de shadcn/ui avec un design moderne et élégant.
                                </p>
                                <Separator className="my-6 bg-white/10" />
                                <div className="space-y-4">
                                  <div className="flex items-center space-x-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                                    <span className="text-white/90">Fonctionnalité 1</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                                    <span className="text-white/90">Fonctionnalité 2</span>
                                  </div>
                                </div>
                              </div>
                            </SheetContent>
                          </Sheet>
                        </div>
                      </motion.div>
                    </TabsContent>
                    
                    <TabsContent value="forms" className="space-y-6">
                      <motion.div
                        key="forms"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                      >
                        <div className="space-y-6">
                          <h3 className="text-2xl font-semibold mb-4 text-white">Champs de Saisie</h3>
                          <div className="space-y-4">
                            <Input 
                              placeholder="Votre nom complet" 
                              className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                            />
                            <Input 
                              placeholder="email@exemple.com" 
                              type="email"
                              className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                            />
                            <Input 
                              placeholder="Mot de passe" 
                              type="password"
                              className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          <h3 className="text-2xl font-semibold mb-4 text-white">Séparateurs</h3>
                          <div className="space-y-4">
                            <p className="text-white/80">Section supérieure</p>
                            <Separator className="bg-gradient-to-r from-purple-500 to-pink-500 h-0.5" />
                            <p className="text-white/80">Section du milieu</p>
                            <Separator className="bg-gradient-to-r from-blue-500 to-cyan-500 h-0.5" />
                            <p className="text-white/80">Section inférieure</p>
                          </div>
                        </div>
                      </motion.div>
                    </TabsContent>
                  </AnimatePresence>
                </Tabs>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 bg-gradient-to-b from-black to-neutral-900">
          <div className="container mx-auto px-4">
            <motion.div 
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                {t.readyTitle}
              </h2>
              <p className="text-xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
                {t.readySubtitle}
              </p>
              
              <motion.div 
                className="flex flex-wrap justify-center gap-6"
                variants={staggeredContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div variants={scaleIn}>
                  <Link href={`/${locale}`}>
                    <Button 
                      variant="outline" 
                      size="large"
                      className="border-white/40 hover:bg-white hover:text-black backdrop-blur-sm px-8 py-3 rounded-full transition-all duration-300"
                    >
                      {t.backHome}
                    </Button>
                  </Link>
                </motion.div>
                <motion.div variants={scaleIn}>
                  <Button 
                    size="large"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {t.exploreComponents}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </BaseLayout>
  );
}