'use client';

import React from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ModernNavbar } from '@/components/ui/navbar-demo';
import { AppleFooter } from '@/components/organisms/AppleFooter';
import { ArrowLeft, Heart, Zap, Shield, Users, Target, Sparkles, CheckCircle } from 'lucide-react';

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

interface Value {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  gradient: string;
  points: string[];
}

export default function ValuesPage() {
  const params = useParams();
  const locale = (params && typeof params === 'object' && 'locale' in params) ? params.locale as string : 'fr';
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Content based on locale
  const content = locale === 'fr' ? {
    meta: {
      title: "Nos Valeurs - Genius Holding | Excellence, Innovation, Humanité",
      description: "Découvrez les valeurs qui guident Genius Holding : excellence, innovation, intégrité et engagement humain. Notre ADN depuis 1999."
    },
    hero: {
      title: "Nos valeurs fondamentales",
      subtitle: "Les principes qui guident chacune de nos actions et définissent notre identité",
      back: "Retour"
    },
    values: [
      {
        icon: Sparkles,
        title: "Excellence",
        subtitle: "La qualité sans compromis",
        description: "Nous visons l'excellence dans tout ce que nous entreprenons, car nos clients méritent le meilleur.",
        color: "from-amber-500 to-orange-600",
        gradient: "from-amber-50 to-orange-50",
        points: [
          "Standards de qualité élevés",
          "Attention aux détails",
          "Amélioration continue",
          "Dépassement des attentes"
        ]
      },
      {
        icon: Zap,
        title: "Innovation",
        subtitle: "Repousser les limites",
        description: "L'innovation est dans notre ADN. Nous explorons constamment de nouvelles façons de créer de la valeur.",
        color: "from-blue-500 to-cyan-600",
        gradient: "from-blue-50 to-cyan-50",
        points: [
          "Technologies de pointe",
          "Créativité débridée",
          "Solutions disruptives",
          "Veille technologique permanente"
        ]
      },
      {
        icon: Shield,
        title: "Intégrité",
        subtitle: "Transparence et confiance",
        description: "L'honnêteté et la transparence sont les fondements de relations durables avec nos partenaires.",
        color: "from-green-500 to-emerald-600",
        gradient: "from-green-50 to-emerald-50",
        points: [
          "Transparence totale",
          "Respect des engagements",
          "Éthique professionnelle",
          "Communication ouverte"
        ]
      },
      {
        icon: Heart,
        title: "Passion",
        subtitle: "L'enthousiasme qui nous anime",
        description: "Notre passion pour la technologie et l'innovation nous pousse à donner le meilleur de nous-mêmes.",
        color: "from-red-500 to-pink-600",
        gradient: "from-red-50 to-pink-50",
        points: [
          "Engagement total",
          "Énergie positive",
          "Amour du métier",
          "Motivation contagieuse"
        ]
      },
      {
        icon: Users,
        title: "Collaboration",
        subtitle: "La force du collectif",
        description: "Ensemble, nous sommes plus forts. La collaboration est au cœur de notre succès.",
        color: "from-purple-500 to-indigo-600",
        gradient: "from-purple-50 to-indigo-50",
        points: [
          "Travail d'équipe",
          "Partage de connaissances",
          "Synergie créative",
          "Support mutuel"
        ]
      },
      {
        icon: Target,
        title: "Impact",
        subtitle: "Créer une différence positive",
        description: "Nous mesurons notre succès par l'impact positif que nous créons pour nos clients et la société.",
        color: "from-teal-500 to-green-600",
        gradient: "from-teal-50 to-green-50",
        points: [
          "Solutions transformatrices",
          "Valeur durable",
          "Responsabilité sociale",
          "Contribution positive"
        ]
      }
    ] as Value[],
    manifesto: {
      title: "Notre Manifeste",
      content: [
        "Nous croyons que la technologie doit servir l'humanité.",
        "Nous croyons que chaque défi est une opportunité d'innover.",
        "Nous croyons que l'excellence n'est pas une destination, mais un voyage.",
        "Nous croyons que la diversité des idées crée les meilleures solutions.",
        "Nous croyons que l'intégrité est la base de relations durables.",
        "Nous croyons que notre succès se mesure à celui de nos clients."
      ]
    },
    commitment: {
      title: "Notre engagement",
      subtitle: "Des promesses que nous tenons chaque jour",
      items: [
        "Livrer des solutions qui dépassent les attentes",
        "Maintenir une communication transparente et régulière",
        "Investir continuellement dans notre expertise",
        "Créer un environnement de travail épanouissant",
        "Contribuer positivement à notre écosystème",
        "Respecter nos engagements et délais"
      ]
    }
  } : {
    meta: {
      title: "Our Values - Genius Holding | Excellence, Innovation, Humanity",
      description: "Discover the values that guide Genius Holding: excellence, innovation, integrity and human commitment. Our DNA since 1999."
    },
    hero: {
      title: "Our core values",
      subtitle: "The principles that guide our every action and define our identity",
      back: "Back"
    },
    values: [
      {
        icon: Sparkles,
        title: "Excellence",
        subtitle: "Quality without compromise",
        description: "We aim for excellence in everything we undertake, because our clients deserve the best.",
        color: "from-amber-500 to-orange-600",
        gradient: "from-amber-50 to-orange-50",
        points: [
          "High quality standards",
          "Attention to detail",
          "Continuous improvement",
          "Exceeding expectations"
        ]
      },
      {
        icon: Zap,
        title: "Innovation",
        subtitle: "Pushing boundaries",
        description: "Innovation is in our DNA. We constantly explore new ways to create value.",
        color: "from-blue-500 to-cyan-600",
        gradient: "from-blue-50 to-cyan-50",
        points: [
          "Cutting-edge technologies",
          "Unbridled creativity",
          "Disruptive solutions",
          "Permanent technology watch"
        ]
      },
      {
        icon: Shield,
        title: "Integrity",
        subtitle: "Transparency and trust",
        description: "Honesty and transparency are the foundations of lasting relationships with our partners.",
        color: "from-green-500 to-emerald-600",
        gradient: "from-green-50 to-emerald-50",
        points: [
          "Total transparency",
          "Commitment respect",
          "Professional ethics",
          "Open communication"
        ]
      },
      {
        icon: Heart,
        title: "Passion",
        subtitle: "The enthusiasm that drives us",
        description: "Our passion for technology and innovation drives us to give our best.",
        color: "from-red-500 to-pink-600",
        gradient: "from-red-50 to-pink-50",
        points: [
          "Total commitment",
          "Positive energy",
          "Love of the craft",
          "Contagious motivation"
        ]
      },
      {
        icon: Users,
        title: "Collaboration",
        subtitle: "The strength of the collective",
        description: "Together, we are stronger. Collaboration is at the heart of our success.",
        color: "from-purple-500 to-indigo-600",
        gradient: "from-purple-50 to-indigo-50",
        points: [
          "Teamwork",
          "Knowledge sharing",
          "Creative synergy",
          "Mutual support"
        ]
      },
      {
        icon: Target,
        title: "Impact",
        subtitle: "Creating positive difference",
        description: "We measure our success by the positive impact we create for our clients and society.",
        color: "from-teal-500 to-green-600",
        gradient: "from-teal-50 to-green-50",
        points: [
          "Transformative solutions",
          "Sustainable value",
          "Social responsibility",
          "Positive contribution"
        ]
      }
    ] as Value[],
    manifesto: {
      title: "Our Manifesto",
      content: [
        "We believe technology should serve humanity.",
        "We believe every challenge is an opportunity to innovate.",
        "We believe excellence is not a destination, but a journey.",
        "We believe diversity of ideas creates the best solutions.",
        "We believe integrity is the foundation of lasting relationships.",
        "We believe our success is measured by that of our clients."
      ]
    },
    commitment: {
      title: "Our commitment",
      subtitle: "Promises we keep every day",
      items: [
        "Deliver solutions that exceed expectations",
        "Maintain transparent and regular communication",
        "Continuously invest in our expertise",
        "Create a fulfilling work environment",
        "Contribute positively to our ecosystem",
        "Respect our commitments and deadlines"
      ]
    }
  };

  return (
    <>
      {/* SEO Metadata */}
      <head>
        <title>{content.meta.title}</title>
        <meta name="description" content={content.meta.description} />
      </head>

      <div className="min-h-screen bg-white">
        {/* Header */}
        <ModernNavbar currentFiliale="genius" />
        
        <main className="relative overflow-hidden">
          {/* Animated Background */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              className="absolute top-20 -left-40 w-80 h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div 
              className="absolute bottom-20 -right-40 w-96 h-96 bg-gradient-to-br from-pink-100 to-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
              animate={{
                x: [0, -100, 0],
                y: [0, 100, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>

          {/* Hero Section */}
          <section className="relative z-10 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <motion.div variants={fadeInUp} className="mb-8">
                  <Link 
                    href={`/${locale}/a-propos`}
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    {content.hero.back}
                  </Link>
                </motion.div>
                
                <motion.h1 
                  className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent"
                  variants={fadeInUp}
                >
                  {content.hero.title}
                </motion.h1>
                <motion.p 
                  className="text-xl md:text-2xl text-gray-600 max-w-4xl"
                  variants={fadeInUp}
                >
                  {content.hero.subtitle}
                </motion.p>
              </motion.div>
            </div>
          </section>

          {/* Values Grid */}
          <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="space-y-24">
                {content.values.map((value, index) => {
                  const Icon = value.icon;
                  const isEven = index % 2 === 0;
                  
                  return (
                    <motion.div
                      key={value.title}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                      variants={staggerContainer}
                      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
                    >
                      {/* Visual Side */}
                      <motion.div 
                        className="flex-1 w-full"
                        variants={isEven ? slideInLeft : slideInRight}
                      >
                        <div className={`relative bg-gradient-to-br ${value.gradient} rounded-3xl p-12 shadow-xl`}>
                          <div className={`absolute top-8 ${isEven ? 'right-8' : 'left-8'} w-24 h-24 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                            <Icon className="w-12 h-12 text-white" />
                          </div>
                          <div className="mt-20">
                            <h2 className="text-3xl font-bold mb-2 text-gray-900">{value.title}</h2>
                            <p className="text-xl text-gray-700 mb-4">{value.subtitle}</p>
                            <p className="text-gray-600 leading-relaxed">{value.description}</p>
                          </div>
                        </div>
                      </motion.div>

                      {/* Content Side */}
                      <motion.div 
                        className="flex-1 w-full"
                        variants={isEven ? slideInRight : slideInLeft}
                      >
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                          <h3 className="text-xl font-semibold mb-6 text-gray-900">
                            Comment nous l'appliquons
                          </h3>
                          <ul className="space-y-4">
                            {value.points.map((point, pointIndex) => (
                              <motion.li
                                key={pointIndex}
                                className="flex items-start gap-3"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: pointIndex * 0.1 }}
                                viewport={{ once: true }}
                              >
                                <CheckCircle className={`w-6 h-6 flex-shrink-0 bg-gradient-to-r ${value.color} bg-clip-text text-transparent`} />
                                <span className="text-gray-700">{point}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Manifesto Section */}
          <section className="relative z-10 py-20 bg-black text-white">
            <motion.div 
              className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
              style={{ y }}
            >
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={staggerContainer}
                className="text-center"
              >
                <motion.h2 
                  className="text-4xl md:text-5xl font-bold mb-12"
                  variants={fadeInUp}
                >
                  {content.manifesto.title}
                </motion.h2>
                <div className="space-y-6">
                  {content.manifesto.content.map((line, index) => (
                    <motion.p
                      key={index}
                      className="text-xl md:text-2xl text-gray-300 font-light"
                      variants={fadeInUp}
                    >
                      {line}
                    </motion.p>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </section>

          {/* Commitment Section */}
          <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={staggerContainer}
              >
                <motion.div className="text-center mb-12" variants={fadeInUp}>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                    {content.commitment.title}
                  </h2>
                  <p className="text-xl text-gray-600">
                    {content.commitment.subtitle}
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {content.commitment.items.map((item, index) => (
                    <motion.div
                      key={index}
                      className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-lg border border-gray-100"
                      variants={scaleIn}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0" />
                        <p className="text-gray-700">{item}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        </main>
        
        {/* Footer */}
        <AppleFooter />
      </div>
    </>
  );
}