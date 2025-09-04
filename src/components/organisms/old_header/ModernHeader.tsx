'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, usePathname } from 'next/navigation';
import { useTheme } from '@/components/theme/ThemeProvider';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';

// Shadcn UI Components
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// Types
type MainNavItem = {
  title: string;
  path: string;
  children?: {
    title: string;
    description?: string;
    path: string;
    isNew?: boolean;
  }[];
};

export default function ModernHeader() {
  // Utiliser une assertion de type pour éviter l'erreur TypeScript
  const params = useParams();
  const locale = (params as Record<string, string>).locale || 'fr';
  const pathname = usePathname();
  const { themeName } = useTheme();

  // Ne pas afficher le header sur la homepage
  if (pathname === `/${locale}` || pathname === `/${locale}/`) {
    return null;
  }

  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Main navigation items
  const mainNav: MainNavItem[] = [
    {
      title: "À Proposp",
      path: `/${locale}/about`,
      children: [
        {
          title: "Notre Histoire & Valeurs",
          description: "Découvrez notre parcours, nos valeurs et notre vision.",
          path: `/${locale}/about/history`,
          isNew: true
        },
        {
          title: "Notre Équipe",
          description: "Rencontrez nos talents qui font la différence.",
          path: `/${locale}/about/team`,
          isNew: true
        },
        {
          title: "Nous Rejoindre",
          description: "Explorez nos opportunités de carrière.",
          path: `/${locale}/about/careers`
        }
      ]
    },
    {
      title: "Expertises",
      path: `/${locale}/expertises`,
      children: [
        {
          title: "Branding",
          description: "Stratégies de marque et identités visuelles.",
          path: `/${locale}/expertises/branding`,
          isNew: true
        },
        {
          title: "Digital & Web",
          description: "Solutions digitales et développement web.",
          path: `/${locale}/expertises/digital`,
          isNew: true
        },
        {
          title: "Événementiel",
          description: "Organisation et production d'événements.",
          path: `/${locale}/expertises/events`,
          isNew: true
        },
        {
          title: "Production & Impression",
          description: "Services de production et d'impression de qualité.",
          path: `/${locale}/expertises/production`,
          isNew: true
        },
        {
          title: "Marketing & Stratégie",
          description: "Stratégies marketing et plans de communication.",
          path: `/${locale}/expertises/marketing`,
          isNew: true
        }
      ]
    },
    {
      title: "Solutions",
      path: `/${locale}/solutions`,
      children: [
        {
          title: "Activation de marque",
          description: "Stratégies d'activation pour renforcer votre marque.",
          path: `/${locale}/solutions/brand-activation`,
          isNew: true
        },
        {
          title: "Roadshow",
          description: "Événements itinérants et tournées promotionnelles.",
          path: `/${locale}/solutions/roadshow`,
          isNew: true
        },
        {
          title: "Stand & Design d'espace",
          description: "Conception et réalisation de stands sur mesure.",
          path: `/${locale}/solutions/stand-design`,
          isNew: true
        },
        {
          title: "E-Sport & Gaming",
          description: "Solutions pour l'univers du gaming et de l'e-sport.",
          path: `/${locale}/solutions/esport`,
          isNew: true
        },
        {
          title: "Publicité & Média",
          description: "Campagnes publicitaires et stratégies média.",
          path: `/${locale}/solutions/advertising`,
          isNew: true
        }
      ]
    },
    {
      title: "Filiales",
      path: `/${locale}/subsidiaries`,
      children: [
        {
          title: "MPS",
          description: "Production & Fabrication - Matérialisation de vos projets.",
          path: `/${locale}/subsidiaries/mps`
        },
        {
          title: "LABRIG'AD",
          description: "Activation & Événementiel - Déploiement terrain.",
          path: `/${locale}/subsidiaries/labrigad`
        },
        {
          title: "GAMIUS",
          description: "E-Sport & Gaming - Solutions pour l'univers vidéoludique.",
          path: `/${locale}/${locale === 'fr' ? 'filiales' : 'subsidiaries'}/gamiusgroup`
        },
        {
          title: "MOUJE-LEELL",
          description: "Design & Mobilier - Créations sur mesure.",
          path: `/${locale}/subsidiaries/moujeleell`
        }
      ]
    },
    {
      title: "Réalisations",
      path: `/${locale}/case-studies`,
      children: [
        {
          title: "Portfolio",
          description: "Découvrez nos projets et réalisations récentes.",
          path: `/${locale}/case-studies`,
          isNew: true
        },
        {
          title: "Études de cas",
          description: "Analyses détaillées de nos projets phares.",
          path: `/${locale}/case-studies/client-cases`,
          isNew: true
        }
      ]
    },
    {
      title: "Contact",
      path: `/${locale}/contact`,
      children: []
    }
  ];

  // Determine if nav link is active
  const isActiveLink = (path: string) => {
    return pathname === path || pathname?.startsWith(path + '/');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-md py-2 shadow-md' : 'bg-black py-4'
      }`}
      data-theme="genius"
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex-shrink-0">
            <div className="relative w-[140px] h-[40px]" style={{ position: 'relative' }}>
              <Image 
                src={scrolled 
                  ? "/item_images/logo/genius-logo-small.svg" 
                  : "/item_images/image/logo/genius-logo.png"
                } 
                alt="Genius Ad District"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                {mainNav.map((item, index) => (
                  <NavigationMenuItem key={index}>
                    {item.children && item.children.length > 0 ? (
                      <>
                        <NavigationMenuTrigger 
                          className={`${isActiveLink(item.path) ? 'text-[#D9D9D9]' : 'text-white'} hover:text-[#D9D9D9]`}
                        >
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                            {item.children.map((child, childIndex) => (
                              <li key={childIndex} className="row-span-1">
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={child.path}
                                    className="flex flex-col space-y-1 rounded-md p-3 hover:bg-[#D9D9D9]/5 transition-colors"
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-medium">{child.title}</span>
                                      {child.isNew && (
                                        <span className="rounded-full bg-[#D9D9D9]/10 px-2 py-0.5 text-xs text-[#D9D9D9]">
                                          Nouveau
                                        </span>
                                      )}
                                    </div>
                                    {child.description && (
                                      <span className="line-clamp-2 text-xs text-muted-foreground">
                                        {child.description}
                                      </span>
                                    )}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link 
                        href={item.path}
                        className={`${navigationMenuTriggerStyle()} ${isActiveLink(item.path) ? 'text-[#D9D9D9]' : 'text-white'} hover:text-[#D9D9D9]`}
                      >
                        {item.title}
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="hidden md:block">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-white">
                      <Globe className="h-4 w-4 mr-1" />
                      {locale === 'fr' ? 'FR' : 'EN'}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[120px] gap-1 p-2">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href={pathname?.replace(`/${locale}`, '/fr') || '/fr'}
                              className={`block rounded p-2 hover:bg-[#D9D9D9]/5 ${locale === 'fr' ? 'font-bold' : ''}`}
                            >
                              Français
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href={pathname?.replace(`/${locale}`, '/en') || '/en'}
                              className={`block rounded p-2 hover:bg-[#D9D9D9]/5 ${locale === 'en' ? 'font-bold' : ''}`}
                            >
                              English
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Contact Button */}
            <div className="hidden md:block">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/${locale}/contact`}>
                  Nous contacter
                </Link>
              </Button>
            </div>

            {/* Mobile Menu */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-black border-neutral-800">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between pb-4">
                      <Link href={`/${locale}`} className="flex-shrink-0">
                        <div className="relative w-[120px] h-[35px]" style={{ position: 'relative' }}>
                          <Image 
                            src="/item_images/logo/genius-logo-small.svg"
                            alt="Genius Ad District"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </Link>
                    </div>

                    <Separator className="bg-neutral-800" />

                    <nav className="flex-1 pt-6">
                      <ul className="space-y-4">
                        {mainNav.map((item, index) => (
                          <li key={index}>
                            <Link
                              href={item.path}
                              className={`block py-2 text-lg ${
                                isActiveLink(item.path) ? 'text-[#D9D9D9] font-medium' : 'text-white'
                              }`}
                            >
                              {item.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </nav>

                    <div className="py-4">
                      <Separator className="bg-neutral-800 mb-4" />
                      
                      {/* Language Switcher in Mobile Menu */}
                      <div className="flex space-x-2 my-4">
                        <Link
                          href={pathname?.replace(`/${locale}`, '/fr') || '/fr'}
                          className={`px-3 py-1 rounded-full border ${
                            locale === 'fr' 
                              ? 'border-white bg-white text-black' 
                              : 'border-neutral-600 text-white'
                          }`}
                        >
                          FR
                        </Link>
                        <Link
                          href={pathname?.replace(`/${locale}`, '/en') || '/en'}
                          className={`px-3 py-1 rounded-full border ${
                            locale === 'en' 
                              ? 'border-white bg-white text-black' 
                              : 'border-neutral-600 text-white'
                          }`}
                        >
                          EN
                        </Link>
                      </div>
                      
                      <Button className="w-full" asChild>
                        <Link href={`/${locale}/contact`}>
                          Nous contacter
                        </Link>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 