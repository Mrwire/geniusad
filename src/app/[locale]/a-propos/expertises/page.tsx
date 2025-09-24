'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ModernNavbar } from '@/components/ui/navbar-demo';
import { AppleFooter } from '@/components/organisms/AppleFooter';
import { 
  ArrowLeft, 
  Code, 
  Palette, 
  Cloud, 
  Shield, 
  Smartphone, 
  Globe,
  Brain,
  Database,
  Layers,
  Settings,
  TrendingUp,
  Zap,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

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
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

interface Expertise {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  skills: string[];
  technologies: string[];
  color: string;
  gradient: string;
  projects?: number;
}

export default function ExpertisesPage() {
  const params = useParams();
  const locale = (params && typeof params === 'object' && 'locale' in params) ? params.locale as string : 'fr';
  const [selectedExpertise, setSelectedExpertise] = useState<string | null>(null);

  // Content based on locale
  const content = locale === 'fr' ? {
    meta: {
      title: "Nos Expertises - Genius Holding | Compétences Technologiques",
      description: "Découvrez nos domaines d'expertise : développement web et mobile, cloud computing, IA, cybersécurité, et transformation digitale."
    },
    hero: {
      title: "Expertises technologiques",
      subtitle: "Des compétences de pointe pour transformer vos idées en réalité digitale",
      back: "Retour"
    },
    expertises: [
      {
        id: 'web-dev',
        icon: Code,
        title: 'Développement Web',
        description: "Solutions web modernes et performantes adaptées à vos besoins spécifiques",
        skills: [
          'Applications web progressives (PWA)',
          'Sites e-commerce haute performance',
          'Plateformes SaaS évolutives',
          'Portails d\'entreprise',
          'API REST et GraphQL'
        ],
        technologies: ['React', 'Next.js', 'Vue.js', 'Node.js', 'Python', 'Django', 'Laravel'],
        color: 'from-blue-500 to-cyan-600',
        gradient: 'from-blue-50 to-cyan-50',
        projects: 85
      },
      {
        id: 'mobile',
        icon: Smartphone,
        title: 'Développement Mobile',
        description: "Applications mobiles natives et cross-platform pour iOS et Android",
        skills: [
          'Applications natives iOS/Android',
          'Solutions cross-platform',
          'Applications d\'entreprise',
          'M-commerce',
          'Applications IoT'
        ],
        technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Ionic', 'Xamarin'],
        color: 'from-purple-500 to-pink-600',
        gradient: 'from-purple-50 to-pink-50',
        projects: 62
      },
      {
        id: 'cloud',
        icon: Cloud,
        title: 'Cloud & DevOps',
        description: "Infrastructure cloud scalable et pratiques DevOps modernes",
        skills: [
          'Architecture cloud native',
          'Migration vers le cloud',
          'CI/CD pipelines',
          'Containerisation',
          'Infrastructure as Code'
        ],
        technologies: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins'],
        color: 'from-green-500 to-emerald-600',
        gradient: 'from-green-50 to-emerald-50',
        projects: 48
      },
      {
        id: 'ai',
        icon: Brain,
        title: 'Intelligence Artificielle',
        description: "Solutions IA et Machine Learning pour automatiser et optimiser vos processus",
        skills: [
          'Machine Learning',
          'Deep Learning',
          'Traitement du langage naturel',
          'Computer Vision',
          'Analyse prédictive'
        ],
        technologies: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenAI', 'Hugging Face', 'LangChain'],
        color: 'from-orange-500 to-red-600',
        gradient: 'from-orange-50 to-red-50',
        projects: 34
      },
      {
        id: 'security',
        icon: Shield,
        title: 'Cybersécurité',
        description: "Protection complète de vos actifs numériques et données sensibles",
        skills: [
          'Audit de sécurité',
          'Tests de pénétration',
          'Conformité RGPD',
          'Sécurité des API',
          'Formation sécurité'
        ],
        technologies: ['OWASP', 'Burp Suite', 'Metasploit', 'Nessus', 'Wireshark', 'Kali Linux'],
        color: 'from-red-500 to-orange-600',
        gradient: 'from-red-50 to-orange-50',
        projects: 28
      },
      {
        id: 'data',
        icon: Database,
        title: 'Big Data & Analytics',
        description: "Exploitation intelligente de vos données pour des décisions éclairées",
        skills: [
          'Data warehousing',
          'ETL pipelines',
          'Visualisation de données',
          'Analytics temps réel',
          'Business Intelligence'
        ],
        technologies: ['Spark', 'Hadoop', 'Elasticsearch', 'Tableau', 'Power BI', 'Apache Kafka'],
        color: 'from-indigo-500 to-purple-600',
        gradient: 'from-indigo-50 to-purple-50',
        projects: 41
      },
      {
        id: 'ux',
        icon: Palette,
        title: 'UX/UI Design',
        description: "Design centré utilisateur pour des expériences digitales mémorables",
        skills: [
          'Research utilisateur',
          'Prototypage',
          'Design systems',
          'Tests utilisabilité',
          'Design responsive'
        ],
        technologies: ['Figma', 'Sketch', 'Adobe XD', 'Framer', 'Principle', 'InVision'],
        color: 'from-pink-500 to-rose-600',
        gradient: 'from-pink-50 to-rose-50',
        projects: 73
      },
      {
        id: 'integration',
        icon: Layers,
        title: 'Intégration Systèmes',
        description: "Connecter et harmoniser vos systèmes pour une efficacité maximale",
        skills: [
          'API Integration',
          'ERP/CRM Integration',
          'Middleware',
          'Data synchronisation',
          'Legacy modernisation'
        ],
        technologies: ['MuleSoft', 'Zapier', 'Apache Camel', 'REST', 'SOAP', 'GraphQL'],
        color: 'from-teal-500 to-cyan-600',
        gradient: 'from-teal-50 to-cyan-50',
        projects: 56
      }
    ] as Expertise[],
    process: {
      title: "Notre processus",
      subtitle: "Une méthodologie éprouvée pour garantir le succès de vos projets",
      steps: [
        {
          title: "Analyse",
          description: "Compréhension approfondie de vos besoins et objectifs"
        },
        {
          title: "Conception",
          description: "Architecture et design de la solution optimale"
        },
        {
          title: "Développement",
          description: "Implémentation agile avec des livrables réguliers"
        },
        {
          title: "Déploiement",
          description: "Mise en production sécurisée et accompagnement"
        }
      ]
    },
    stats: {
      title: "Notre impact",
      items: [
        { value: "200+", label: "Projets réalisés" },
        { value: "95%", label: "Satisfaction client" },
        { value: "50+", label: "Technologies maîtrisées" },
        { value: "24/7", label: "Support disponible" }
      ]
    },
    cta: {
      title: "Prêt à transformer votre vision en réalité ?",
      subtitle: "Discutons de votre projet et trouvons la solution parfaite",
      button: "Démarrer un projet"
    }
  } : {
    meta: {
      title: "Our Expertise - Genius Holding | Technology Skills",
      description: "Discover our areas of expertise: web and mobile development, cloud computing, AI, cybersecurity, and digital transformation."
    },
    hero: {
      title: "Technology expertise",
      subtitle: "Cutting-edge skills to transform your ideas into digital reality",
      back: "Back"
    },
    expertises: [
      {
        id: 'web-dev',
        icon: Code,
        title: 'Web Development',
        description: "Modern and efficient web solutions tailored to your specific needs",
        skills: [
          'Progressive Web Apps (PWA)',
          'High-performance e-commerce sites',
          'Scalable SaaS platforms',
          'Enterprise portals',
          'REST and GraphQL APIs'
        ],
        technologies: ['React', 'Next.js', 'Vue.js', 'Node.js', 'Python', 'Django', 'Laravel'],
        color: 'from-blue-500 to-cyan-600',
        gradient: 'from-blue-50 to-cyan-50',
        projects: 85
      },
      {
        id: 'mobile',
        icon: Smartphone,
        title: 'Mobile Development',
        description: "Native and cross-platform mobile applications for iOS and Android",
        skills: [
          'Native iOS/Android apps',
          'Cross-platform solutions',
          'Enterprise applications',
          'M-commerce',
          'IoT applications'
        ],
        technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Ionic', 'Xamarin'],
        color: 'from-purple-500 to-pink-600',
        gradient: 'from-purple-50 to-pink-50',
        projects: 62
      },
      {
        id: 'cloud',
        icon: Cloud,
        title: 'Cloud & DevOps',
        description: "Scalable cloud infrastructure and modern DevOps practices",
        skills: [
          'Cloud native architecture',
          'Cloud migration',
          'CI/CD pipelines',
          'Containerization',
          'Infrastructure as Code'
        ],
        technologies: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins'],
        color: 'from-green-500 to-emerald-600',
        gradient: 'from-green-50 to-emerald-50',
        projects: 48
      },
      {
        id: 'ai',
        icon: Brain,
        title: 'Artificial Intelligence',
        description: "AI and Machine Learning solutions to automate and optimize your processes",
        skills: [
          'Machine Learning',
          'Deep Learning',
          'Natural Language Processing',
          'Computer Vision',
          'Predictive Analytics'
        ],
        technologies: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenAI', 'Hugging Face', 'LangChain'],
        color: 'from-orange-500 to-red-600',
        gradient: 'from-orange-50 to-red-50',
        projects: 34
      },
      {
        id: 'security',
        icon: Shield,
        title: 'Cybersecurity',
        description: "Complete protection of your digital assets and sensitive data",
        skills: [
          'Security audit',
          'Penetration testing',
          'GDPR compliance',
          'API security',
          'Security training'
        ],
        technologies: ['OWASP', 'Burp Suite', 'Metasploit', 'Nessus', 'Wireshark', 'Kali Linux'],
        color: 'from-red-500 to-orange-600',
        gradient: 'from-red-50 to-orange-50',
        projects: 28
      },
      {
        id: 'data',
        icon: Database,
        title: 'Big Data & Analytics',
        description: "Intelligent exploitation of your data for informed decisions",
        skills: [
          'Data warehousing',
          'ETL pipelines',
          'Data visualization',
          'Real-time analytics',
          'Business Intelligence'
        ],
        technologies: ['Spark', 'Hadoop', 'Elasticsearch', 'Tableau', 'Power BI', 'Apache Kafka'],
        color: 'from-indigo-500 to-purple-600',
        gradient: 'from-indigo-50 to-purple-50',
        projects: 41
      },
      {
        id: 'ux',
        icon: Palette,
        title: 'UX/UI Design',
        description: "User-centered design for memorable digital experiences",
        skills: [
          'User research',
          'Prototyping',
          'Design systems',
          'Usability testing',
          'Responsive design'
        ],
        technologies: ['Figma', 'Sketch', 'Adobe XD', 'Framer', 'Principle', 'InVision'],
        color: 'from-pink-500 to-rose-600',
        gradient: 'from-pink-50 to-rose-50',
        projects: 73
      },
      {
        id: 'integration',
        icon: Layers,
        title: 'Systems Integration',
        description: "Connect and harmonize your systems for maximum efficiency",
        skills: [
          'API Integration',
          'ERP/CRM Integration',
          'Middleware',
          'Data synchronization',
          'Legacy modernization'
        ],
        technologies: ['MuleSoft', 'Zapier', 'Apache Camel', 'REST', 'SOAP', 'GraphQL'],
        color: 'from-teal-500 to-cyan-600',
        gradient: 'from-teal-50 to-cyan-50',
        projects: 56
      }
    ] as Expertise[],
    process: {
      title: "Our process",
      subtitle: "A proven methodology to ensure the success of your projects",
      steps: [
        {
          title: "Analysis",
          description: "Deep understanding of your needs and objectives"
        },
        {
          title: "Design",
          description: "Architecture and design of the optimal solution"
        },
        {
          title: "Development",
          description: "Agile implementation with regular deliverables"
        },
        {
          title: "Deployment",
          description: "Secure production launch and support"
        }
      ]
    },
    stats: {
      title: "Our impact",
      items: [
        { value: "200+", label: "Projects completed" },
        { value: "95%", label: "Client satisfaction" },
        { value: "50+", label: "Technologies mastered" },
        { value: "24/7", label: "Support available" }
      ]
    },
    cta: {
      title: "Ready to transform your vision into reality?",
      subtitle: "Let's discuss your project and find the perfect solution",
      button: "Start a project"
    }
  };

  const activeExpertise = selectedExpertise 
    ? content.expertises.find(e => e.id === selectedExpertise)
    : null;

  return (
    <>
      {/* SEO Metadata */}
      <head>
        <title>{content.meta.title}</title>
        <meta name="description" content={content.meta.description} />
      </head>

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Header */}
        <ModernNavbar currentFiliale="genius" />
        
        <main className="relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -left-48 w-96 h-96 bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-1/3 -right-48 w-96 h-96 bg-gradient-to-br from-green-100/40 to-cyan-100/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-br from-pink-100/40 to-orange-100/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
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
                  className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent"
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

          {/* Expertise Grid */}
          <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={staggerContainer}
              >
                {content.expertises.map((expertise) => {
                  const Icon = expertise.icon;
                  const isSelected = selectedExpertise === expertise.id;
                  
                  return (
                    <motion.div
                      key={expertise.id}
                      variants={scaleIn}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedExpertise(isSelected ? null : expertise.id)}
                      className="cursor-pointer"
                    >
                      <div className={`relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${
                        isSelected ? 'border-black' : 'border-transparent'
                      }`}>
                        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${expertise.color} mb-4`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-gray-900">{expertise.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{expertise.description}</p>
                        {expertise.projects && (
                          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <span className="text-sm text-gray-500">Projets réalisés</span>
                            <span className="text-lg font-bold text-gray-900">{expertise.projects}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Detailed View */}
              <AnimatePresence>
                {activeExpertise && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-8"
                  >
                    <div className={`bg-gradient-to-br ${activeExpertise.gradient} rounded-3xl p-8 shadow-xl`}>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-2xl font-bold mb-4 text-gray-900">Compétences clés</h3>
                          <ul className="space-y-3">
                            {activeExpertise.skills.map((skill, index) => (
                              <li key={index} className="flex items-start gap-3">
                                <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 bg-gradient-to-r ${activeExpertise.color} bg-clip-text text-transparent`} />
                                <span className="text-gray-700">{skill}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold mb-4 text-gray-900">Technologies</h3>
                          <div className="flex flex-wrap gap-2">
                            {activeExpertise.technologies.map((tech, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 shadow-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* Process Section */}
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
                    {content.process.title}
                  </h2>
                  <p className="text-xl text-gray-600">
                    {content.process.subtitle}
                  </p>
                </motion.div>

                <div className="relative">
                  {/* Connection Line */}
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hidden lg:block" />
                  
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {content.process.steps.map((step, index) => (
                      <motion.div
                        key={index}
                        className="relative"
                        variants={scaleIn}
                      >
                        <div className="bg-white rounded-2xl p-6 shadow-lg relative z-10">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">
                            {index + 1}
                          </div>
                          <h3 className="text-xl font-bold mb-2 text-gray-900">{step.title}</h3>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
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
                      <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
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

          {/* CTA Section */}
          <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
            <motion.div
              className="max-w-4xl mx-auto text-center bg-gradient-to-br from-gray-900 to-black rounded-3xl p-12 text-white"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-4"
                variants={fadeInUp}
              >
                {content.cta.title}
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-300 mb-8"
                variants={fadeInUp}
              >
                {content.cta.subtitle}
              </motion.p>
              <motion.div variants={scaleIn}>
                <Link 
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg font-semibold"
                >
                  {content.cta.button}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>
          </section>
        </main>
        
        {/* Footer */}
        <AppleFooter />
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  );
}