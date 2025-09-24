'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ModernNavbar } from '@/components/ui/navbar-demo';
import { AppleFooter } from '@/components/organisms/AppleFooter';
import { ArrowLeft, Mail, Linkedin, Twitter, Github, ChevronRight, Users, Award, Target, Zap } from 'lucide-react';

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
      staggerChildren: 0.1
    }
  }
};

const cardHover: Variants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  department: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    email?: string;
  };
}

export default function TeamPage() {
  const params = useParams();
  const locale = (params && typeof params === 'object' && 'locale' in params) ? params.locale as string : 'fr';
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Content based on locale
  const content = locale === 'fr' ? {
    meta: {
      title: "Notre Équipe - Genius Holding | Talents Passionnés",
      description: "Rencontrez l'équipe passionnée de Genius Holding. Des experts dévoués qui transforment les idées en réalité digitale."
    },
    hero: {
      title: "Une équipe d'exception",
      subtitle: "Des talents passionnés unis par une vision commune de l'excellence",
      back: "Retour"
    },
    departments: [
      { id: 'all', name: 'Tous', icon: Users },
      { id: 'leadership', name: 'Direction', icon: Award },
      { id: 'tech', name: 'Technologie', icon: Zap },
      { id: 'design', name: 'Design', icon: Target },
    ],
    teamMembers: [
      {
        id: '1',
        name: 'Mohamed Diallo',
        role: 'CEO & Fondateur',
        bio: "Visionnaire et entrepreneur passionné avec plus de 25 ans d'expérience dans la transformation digitale.",
        image: '/api/placeholder/400/400',
        department: 'leadership',
        social: {
          linkedin: '#',
          twitter: '#',
          email: 'm.diallo@genius.com'
        }
      },
      {
        id: '2',
        name: 'Fatima Benali',
        role: 'CTO',
        bio: "Experte en architecture cloud et intelligence artificielle, elle dirige notre innovation technologique.",
        image: '/api/placeholder/400/400',
        department: 'leadership',
        social: {
          linkedin: '#',
          github: '#',
          email: 'f.benali@genius.com'
        }
      },
      {
        id: '3',
        name: 'Pierre Martin',
        role: 'Directeur Créatif',
        bio: "Créatif primé avec une passion pour le design minimaliste et les expériences utilisateur exceptionnelles.",
        image: '/api/placeholder/400/400',
        department: 'design',
        social: {
          linkedin: '#',
          twitter: '#'
        }
      },
      {
        id: '4',
        name: 'Amira Toure',
        role: 'Lead Developer',
        bio: "Développeuse full-stack spécialisée dans les architectures microservices et les applications scalables.",
        image: '/api/placeholder/400/400',
        department: 'tech',
        social: {
          github: '#',
          linkedin: '#'
        }
      },
      {
        id: '5',
        name: 'Jean Dubois',
        role: 'UX Designer',
        bio: "Designer UX/UI avec une approche centrée utilisateur et une expertise en design systems.",
        image: '/api/placeholder/400/400',
        department: 'design',
        social: {
          linkedin: '#',
          twitter: '#'
        }
      },
      {
        id: '6',
        name: 'Sarah Johnson',
        role: 'DevOps Engineer',
        bio: "Spécialiste DevOps passionnée par l'automatisation et l'optimisation des processus de déploiement.",
        image: '/api/placeholder/400/400',
        department: 'tech',
        social: {
          github: '#',
          linkedin: '#'
        }
      }
    ],
    culture: {
      title: "Notre Culture",
      subtitle: "Ce qui nous unit et nous inspire chaque jour",
      values: [
        {
          title: "Innovation Continue",
          description: "Nous repoussons constamment les limites du possible"
        },
        {
          title: "Collaboration",
          description: "Le succès naît de la synergie de nos talents"
        },
        {
          title: "Excellence",
          description: "La qualité est notre signature dans chaque projet"
        },
        {
          title: "Passion",
          description: "L'enthousiasme guide chacune de nos actions"
        }
      ]
    },
    joinUs: {
      title: "Rejoignez l'aventure",
      description: "Nous sommes toujours à la recherche de talents passionnés",
      cta: "Voir les opportunités"
    }
  } : {
    meta: {
      title: "Our Team - Genius Holding | Passionate Talents",
      description: "Meet the passionate team of Genius Holding. Dedicated experts who transform ideas into digital reality."
    },
    hero: {
      title: "An exceptional team",
      subtitle: "Passionate talents united by a common vision of excellence",
      back: "Back"
    },
    departments: [
      { id: 'all', name: 'All', icon: Users },
      { id: 'leadership', name: 'Leadership', icon: Award },
      { id: 'tech', name: 'Technology', icon: Zap },
      { id: 'design', name: 'Design', icon: Target },
    ],
    teamMembers: [
      {
        id: '1',
        name: 'Mohamed Diallo',
        role: 'CEO & Founder',
        bio: "Visionary and passionate entrepreneur with over 25 years of experience in digital transformation.",
        image: '/api/placeholder/400/400',
        department: 'leadership',
        social: {
          linkedin: '#',
          twitter: '#',
          email: 'm.diallo@genius.com'
        }
      },
      {
        id: '2',
        name: 'Fatima Benali',
        role: 'CTO',
        bio: "Cloud architecture and artificial intelligence expert, leading our technological innovation.",
        image: '/api/placeholder/400/400',
        department: 'leadership',
        social: {
          linkedin: '#',
          github: '#',
          email: 'f.benali@genius.com'
        }
      },
      {
        id: '3',
        name: 'Pierre Martin',
        role: 'Creative Director',
        bio: "Award-winning creative with a passion for minimalist design and exceptional user experiences.",
        image: '/api/placeholder/400/400',
        department: 'design',
        social: {
          linkedin: '#',
          twitter: '#'
        }
      },
      {
        id: '4',
        name: 'Amira Toure',
        role: 'Lead Developer',
        bio: "Full-stack developer specialized in microservices architectures and scalable applications.",
        image: '/api/placeholder/400/400',
        department: 'tech',
        social: {
          github: '#',
          linkedin: '#'
        }
      },
      {
        id: '5',
        name: 'Jean Dubois',
        role: 'UX Designer',
        bio: "UX/UI designer with a user-centered approach and expertise in design systems.",
        image: '/api/placeholder/400/400',
        department: 'design',
        social: {
          linkedin: '#',
          twitter: '#'
        }
      },
      {
        id: '6',
        name: 'Sarah Johnson',
        role: 'DevOps Engineer',
        bio: "DevOps specialist passionate about automation and deployment process optimization.",
        image: '/api/placeholder/400/400',
        department: 'tech',
        social: {
          github: '#',
          linkedin: '#'
        }
      }
    ],
    culture: {
      title: "Our Culture",
      subtitle: "What unites and inspires us every day",
      values: [
        {
          title: "Continuous Innovation",
          description: "We constantly push the boundaries of what's possible"
        },
        {
          title: "Collaboration",
          description: "Success comes from the synergy of our talents"
        },
        {
          title: "Excellence",
          description: "Quality is our signature in every project"
        },
        {
          title: "Passion",
          description: "Enthusiasm guides each of our actions"
        }
      ]
    },
    joinUs: {
      title: "Join the adventure",
      description: "We're always looking for passionate talents",
      cta: "See opportunities"
    }
  };

  const filteredMembers = selectedDepartment === 'all' 
    ? content.teamMembers 
    : content.teamMembers.filter(member => member.department === selectedDepartment);

  return (
    <>
      {/* SEO Metadata */}
      <head>
        <title>{content.meta.title}</title>
        <meta name="description" content={content.meta.description} />
      </head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Header */}
        <ModernNavbar currentFiliale="genius" />
        
        <main className="relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-40 -left-40 w-96 h-96 bg-blue-100/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
            <div className="absolute top-60 -right-40 w-96 h-96 bg-purple-100/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
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
                  className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent"
                  variants={fadeInUp}
                >
                  {content.hero.title}
                </motion.h1>
                <motion.p 
                  className="text-xl md:text-2xl text-gray-600 max-w-3xl"
                  variants={fadeInUp}
                >
                  {content.hero.subtitle}
                </motion.p>
              </motion.div>
            </div>
          </section>

          {/* Department Filter */}
          <section className="relative z-10 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <motion.div 
                className="flex flex-wrap gap-4 justify-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                {content.departments.map((dept) => {
                  const Icon = dept.icon;
                  return (
                    <motion.button
                      key={dept.id}
                      onClick={() => setSelectedDepartment(dept.id)}
                      className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                        selectedDepartment === dept.id
                          ? 'bg-black text-white shadow-lg scale-105'
                          : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                      }`}
                      variants={fadeInUp}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-4 h-4" />
                      {dept.name}
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>
          </section>

          {/* Team Grid */}
          <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={staggerContainer}
              >
                <AnimatePresence mode="wait">
                  {filteredMembers.map((member) => (
                    <motion.div
                      key={member.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      whileHover="hover"
                      variants={cardHover}
                      onClick={() => setSelectedMember(member)}
                      className="cursor-pointer"
                    >
                      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
                          {/* Placeholder for image */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Users className="w-20 h-20 text-gray-400" />
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-1 text-gray-900">{member.name}</h3>
                          <p className="text-sm text-gray-500 mb-3">{member.role}</p>
                          <p className="text-gray-600 line-clamp-2">{member.bio}</p>
                          <div className="flex gap-3 mt-4">
                            {member.social?.linkedin && (
                              <Linkedin className="w-5 h-5 text-gray-400 hover:text-blue-600 transition-colors" />
                            )}
                            {member.social?.twitter && (
                              <Twitter className="w-5 h-5 text-gray-400 hover:text-blue-400 transition-colors" />
                            )}
                            {member.social?.github && (
                              <Github className="w-5 h-5 text-gray-400 hover:text-gray-900 transition-colors" />
                            )}
                            {member.social?.email && (
                              <Mail className="w-5 h-5 text-gray-400 hover:text-red-600 transition-colors" />
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </section>

          {/* Culture Section */}
          <section className="relative z-10 py-20 bg-black text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={staggerContainer}
                className="text-center"
              >
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold mb-4"
                  variants={fadeInUp}
                >
                  {content.culture.title}
                </motion.h2>
                <motion.p 
                  className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
                  variants={fadeInUp}
                >
                  {content.culture.subtitle}
                </motion.p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {content.culture.values.map((value, index) => (
                    <motion.div
                      key={index}
                      className="text-center"
                      variants={fadeInUp}
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                      <p className="text-gray-400">{value.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Join Us CTA */}
          <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
            <motion.div
              className="max-w-4xl mx-auto text-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
                variants={fadeInUp}
              >
                {content.joinUs.title}
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 mb-8"
                variants={fadeInUp}
              >
                {content.joinUs.description}
              </motion.p>
              <motion.div variants={fadeInUp}>
                <Link 
                  href="/careers"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-xl hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  {content.joinUs.cta}
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>
          </section>
        </main>
        
        {/* Footer */}
        <AppleFooter />
      </div>

      {/* Member Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              className="bg-white rounded-2xl max-w-2xl w-full p-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex gap-6">
                <div className="w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-1">{selectedMember.name}</h3>
                  <p className="text-gray-500 mb-4">{selectedMember.role}</p>
                  <p className="text-gray-700 mb-4">{selectedMember.bio}</p>
                  <div className="flex gap-4">
                    {selectedMember.social?.linkedin && (
                      <a href={selectedMember.social.linkedin} className="text-gray-400 hover:text-blue-600 transition-colors">
                        <Linkedin className="w-6 h-6" />
                      </a>
                    )}
                    {selectedMember.social?.twitter && (
                      <a href={selectedMember.social.twitter} className="text-gray-400 hover:text-blue-400 transition-colors">
                        <Twitter className="w-6 h-6" />
                      </a>
                    )}
                    {selectedMember.social?.github && (
                      <a href={selectedMember.social.github} className="text-gray-400 hover:text-gray-900 transition-colors">
                        <Github className="w-6 h-6" />
                      </a>
                    )}
                    {selectedMember.social?.email && (
                      <a href={`mailto:${selectedMember.social.email}`} className="text-gray-400 hover:text-red-600 transition-colors">
                        <Mail className="w-6 h-6" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}