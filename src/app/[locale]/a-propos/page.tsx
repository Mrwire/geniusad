'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ModernNavbar } from '@/components/ui/navbar-demo';
import { AppleFooter } from '@/components/organisms/AppleFooter';
import { ArrowRight, Users, Target, Award, Lightbulb } from 'lucide-react';

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
      staggerChildren: 0.2
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

export default function AboutPage() {
  // Get locale from params
  const params = useParams();
  const locale = (params && typeof params === 'object' && 'locale' in params) ? params.locale as string : 'fr';
  
  // Content based on locale
  const content = locale === 'fr' ? {
    meta: {
      title: "À propos de Genius Holding - Innovation depuis 1999",
      description: "Découvrez Genius Holding, groupe indépendant créateur d'impact depuis 1999. Notre vision, nos valeurs et notre expertise au service de votre transformation digitale."
    },
    hero: {
      title: "Nous créons l'avenir",
      subtitle: "Depuis 1999, Genius Holding accompagne les entreprises dans leur transformation digitale avec passion et excellence",
      cta: "Découvrir notre histoire"
    },
    sections: [
      {
        id: 'notre-equipe',
        title: 'Notre Équipe',
        description: 'Des talents passionnés unis par une vision commune',
        icon: Users,
        link: '/a-propos/notre-equipe',
        color: 'from-blue-500 to-cyan-500'
      },
      {
        id: 'nos-valeurs',
        title: 'Nos Valeurs',
        description: "L'excellence, l'innovation et l'humain au cœur de notre ADN",
        icon: Target,
        link: '/a-propos/nos-valeurs',
        color: 'from-purple-500 to-pink-500'
      },
      {
        id: 'expertises',
        title: 'Nos Expertises',
        description: 'Des compétences multiples pour des solutions sur mesure',
        icon: Lightbulb,
        link: '/a-propos/expertises',
        color: 'from-green-500 to-teal-500'
      },
      {
        id: 'notre-histoire',
        title: 'Notre Histoire',
        description: 'Un parcours d\'innovation et de croissance depuis 1999',
        icon: Award,
        link: '/a-propos/notre-histoire',
        color: 'from-orange-500 to-red-500'
      }
    ],
    stats: {
      title: "Genius Holding en chiffres",
      items: [
        { value: "25+", label: "Années d'expérience" },
        { value: "200+", label: "Projets réalisés" },
        { value: "50+", label: "Experts passionnés" },
        { value: "4", label: "Filiales spécialisées" }
      ]
    },
    vision: {
      title: "Notre Vision",
      description: "Être le partenaire de référence pour la transformation digitale en Afrique et au-delà",
      points: [
        "Innovation constante et adaptation aux nouvelles technologies",
        "Excellence opérationnelle dans chaque projet",
        "Impact positif sur les communautés que nous servons",
        "Croissance durable et responsable"
      ]
    }
  } : {
    meta: {
      title: "About Genius Holding - Innovation since 1999",
      description: "Discover Genius Holding, an independent group creating impact since 1999. Our vision, values and expertise at the service of your digital transformation."
    },
    hero: {
      title: "We create the future",
      subtitle: "Since 1999, Genius Holding has been supporting companies in their digital transformation with passion and excellence",
      cta: "Discover our story"
    },
    sections: [
      {
        id: 'our-team',
        title: 'Our Team',
        description: 'Passionate talents united by a common vision',
        icon: Users,
        link: '/a-propos/notre-equipe',
        color: 'from-blue-500 to-cyan-500'
      },
      {
        id: 'our-values',
        title: 'Our Values',
        description: 'Excellence, innovation and humanity at the heart of our DNA',
        icon: Target,
        link: '/a-propos/nos-valeurs',
        color: 'from-purple-500 to-pink-500'
      },
      {
        id: 'expertise',
        title: 'Our Expertise',
        description: 'Multiple skills for tailor-made solutions',
        icon: Lightbulb,
        link: '/a-propos/expertises',
        color: 'from-green-500 to-teal-500'
      },
      {
        id: 'our-history',
        title: 'Our History',
        description: 'A journey of innovation and growth since 1999',
        icon: Award,
        link: '/a-propos/notre-histoire',
        color: 'from-orange-500 to-red-500'
      }
    ],
    stats: {
      title: "Genius Holding in numbers",
      items: [
        { value: "25+", label: "Years of experience" },
        { value: "200+", label: "Projects completed" },
        { value: "50+", label: "Passionate experts" },
        { value: "4", label: "Specialized subsidiaries" }
      ]
    },
    vision: {
      title: "Our Vision",
      description: "To be the reference partner for digital transformation in Africa and beyond",
      points: [
        "Constant innovation and adaptation to new technologies",
        "Operational excellence in every project",
        "Positive impact on the communities we serve",
        "Sustainable and responsible growth"
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

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Header */}
        <ModernNavbar currentFiliale="genius" />
        
        <main className="relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 -left-40 w-80 h-80 bg-blue-100/30 rounded-full mix-blend-multiply filter blur-xl"></div>
            <div className="absolute top-40 -right-40 w-96 h-96 bg-purple-100/20 rounded-full mix-blend-multiply filter blur-xl"></div>
            <div className="absolute -bottom-32 left-20 w-80 h-80 bg-green-100/40 rounded-full mix-blend-multiply filter blur-xl"></div>
          </div>
          
          {/* Hero Section */}
          <section className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <motion.div
              className="max-w-7xl mx-auto text-center"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
                variants={fadeInUp}
              >
                {content.hero.title}
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto"
                variants={fadeInUp}
              >
                {content.hero.subtitle}
              </motion.p>
              <motion.div variants={scaleIn}>
                <Link 
                  href={`/${locale}/a-propos/notre-histoire`}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-xl hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  {content.hero.cta}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>
          </section>

          {/* Main Sections Grid */}
          <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={staggerContainer}
              >
                {content.sections.map((section, index) => {
                  const Icon = section.icon;
                  return (
                    <motion.div
                      key={section.id}
                      variants={scaleIn}
                      whileHover={{ scale: 1.02 }}
                      className="group"
                    >
                      <Link href={`/${locale}${section.link}`}>
                        <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                          {/* Gradient overlay */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                          
                          {/* Content */}
                          <div className="relative z-10">
                            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${section.color} mb-4`}>
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2 text-gray-900">
                              {section.title}
                            </h3>
                            <p className="text-gray-600 mb-4">
                              {section.description}
                            </p>
                            <div className="flex items-center gap-2 text-gray-900 group-hover:gap-3 transition-all">
                              <span className="font-medium">Explorer</span>
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="relative z-10 py-20 bg-black text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={staggerContainer}
              >
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold text-center mb-12"
                  variants={fadeInUp}
                >
                  {content.stats.title}
                </motion.h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {content.stats.items.map((stat, index) => (
                    <motion.div
                      key={index}
                      className="text-center"
                      variants={scaleIn}
                    >
                      <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <div className="text-gray-400">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Vision Section */}
          <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={staggerContainer}
                className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-12 shadow-xl"
              >
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
                  variants={fadeInUp}
                >
                  {content.vision.title}
                </motion.h2>
                <motion.p 
                  className="text-xl text-gray-600 mb-8"
                  variants={fadeInUp}
                >
                  {content.vision.description}
                </motion.p>
                <motion.ul className="space-y-4" variants={staggerContainer}>
                  {content.vision.points.map((point, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3"
                      variants={fadeInUp}
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{point}</span>
                    </motion.li>
                  ))}
                </motion.ul>
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