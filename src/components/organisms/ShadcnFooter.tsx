'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Heart, Mail, Phone, MapPin, ArrowUpRight, Instagram, Linkedin, Twitter, Youtube } from '@/components/icons';

// Shadcn UI Components
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Footer,
  FooterContainer,
  FooterSection,
  FooterBrand,
  FooterNav,
  FooterNavTitle,
  FooterNavList,
  FooterNavItem,
  FooterBottom,
  FooterSocial,
  FooterSocialLink,
  FooterLegal,
  FooterCopyright,
  FooterNewsletter
} from '@/components/ui/footer';

interface ShadcnFooterProps {
  variant?: 'main' | 'subsidiary';
  subsidiaryColor?: 'mps' | 'labrigad' | 'gamius' | 'moujeleell';
}

export default function ShadcnFooter({ 
  variant = 'main',
  subsidiaryColor
}: ShadcnFooterProps) {
  const { locale } = useParams();
  const currentYear = new Date().getFullYear();
  
  // Footer columns with navigation
  const footerColumns = [
    {
      title: "À Propos",
      links: [
        { label: "Notre Histoire", href: `/${locale}/about/history` },
        { label: "Notre Équipe", href: `/${locale}/about/team` },
        { label: "Nous Rejoindre", href: `/${locale}/about/careers` },
        { label: "Engagements RSE", href: `/${locale}/about/csr` },
      ]
    },
    {
      title: "Expertises",
      links: [
        { label: "Branding", href: `/${locale}/expertises/branding` },
        { label: "Digital & Web", href: `/${locale}/expertises/digital` },
        { label: "Événementiel", href: `/${locale}/expertises/events` },
        { label: "Production", href: `/${locale}/expertises/production` },
        { label: "Marketing", href: `/${locale}/expertises/marketing` },
      ]
    },
    {
      title: "Solutions",
      links: [
        { label: "Activation de marque", href: `/${locale}/solutions/brand-activation` },
        { label: "Roadshow", href: `/${locale}/solutions/roadshow` },
        { label: "Stand & Design", href: `/${locale}/solutions/stand-design` },
        { label: "E-Sport & Gaming", href: `/${locale}/solutions/esport` },
        { label: "Publicité & Média", href: `/${locale}/solutions/advertising` },
      ]
    },
    {
      title: "Filiales",
      links: [
        { label: "MPS", href: `/${locale}/subsidiaries/mps`, color: "mps" },
        { label: "LABRIG'AD", href: `/${locale}/subsidiaries/labrigad`, color: "labrigad" },
        { label: "GAMIUS", href: `/${locale}/subsidiaries/gamius`, color: "gamius" },
        { label: "MOUJE-LEELL", href: `/${locale}/subsidiaries/moujeleell`, color: "moujeleell" },
      ]
    },
    {
      title: "Contact",
      links: [
        { label: "Nous Contacter", href: `/${locale}/contact` },
        { label: "Demande de Devis", href: `/${locale}/contact/quote` },
        { label: "Espace Client", href: `/${locale}/client-portal/dashboard` },
        { label: "Newsletter", href: `/${locale}/newsletter` },
      ]
    },
  ];

  // Contact information
  const contactInfo = [
    { icon: <Mail className="w-5 h-5" />, label: "contact@geniusaddistrict.com" },
    { icon: <Phone className="w-5 h-5" />, label: "+33 (0) 1 23 45 67 89" },
    { icon: <MapPin className="w-5 h-5" />, label: "23 Avenue de l'Innovation, 75012 Paris, France" },
  ];

  // Social media links
  const socialLinks = [
    { name: 'Instagram', href: 'https://instagram.com', icon: <Instagram className="w-5 h-5" /> },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: <Linkedin className="w-5 h-5" /> },
    { name: 'Twitter', href: 'https://twitter.com', icon: <Twitter className="w-5 h-5" /> },
    { name: 'Youtube', href: 'https://youtube.com', icon: <Youtube className="w-5 h-5" /> },
  ];

  // Legal links
  const legalLinks = [
    { label: "Mentions Légales", href: `/${locale}/legal/mentions` },
    { label: "Politique de Confidentialité", href: `/${locale}/legal/privacy` },
    { label: "Conditions Générales", href: `/${locale}/legal/terms` },
    { label: "Cookies", href: `/${locale}/legal/cookies` },
  ];

  return (
    <Footer variant={variant === 'main' ? 'default' : 'subsidiary'} size="lg" subsidiaryColor={subsidiaryColor}>
      {/* Newsletter section */}
      <FooterNewsletter>
        <Card className="bg-gradient-to-r from-neutral-900 to-neutral-800 border-none rounded-lg overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Restez informé</h3>
                <p className="text-[#D9D9D9] mb-6">
                  Abonnez-vous à notre newsletter pour recevoir nos actualités et offres exclusives.
                </p>
                <div className="flex gap-4">
                  <Button 
                    className="bg-[#D9D9D9] text-black hover:bg-[#D9D9D9]/90 transition-colors"
                  >
                    S'inscrire <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="hidden md:flex justify-end">
                <div className="relative h-[200px] w-[300px]">
                  <Image 
                    src="/item_images/image/element/element/newsletter-graphic.svg"
                    alt="Newsletter"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </FooterNewsletter>

      {/* Main footer section */}
      <FooterContainer>
        <FooterSection>
          {/* Brand column */}
          <FooterBrand>
            <div className="relative w-[200px] h-[60px] mb-6">
              <Image 
                src="/item_images/logo/genius-logo.svg"
                alt="Genius Logo"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-[#D9D9D9] text-sm mb-6 max-w-md">
              Genius Ad District est une agence de communication globale, spécialisée dans 
              l'événementiel, le branding et la communication digitale. Nous créons des 
              expériences uniques et mémorables pour votre marque.
            </p>
            <div className="space-y-3">
              {contactInfo.map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-[#D9D9D9]">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </FooterBrand>

          {/* Navigation columns */}
          {footerColumns.map((column, i) => (
            <FooterNav key={i}>
              <FooterNavTitle>{column.title}</FooterNavTitle>
              <FooterNavList>
                {column.links.map((link, j) => (
                  <FooterNavItem key={j}>
                    <Link 
                      href={link.href}
                      className={`text-${(link as any).color || 'neutral-400'} hover:text-white text-sm transition-colors`}
                    >
                      {link.label}
                    </Link>
                  </FooterNavItem>
                ))}
              </FooterNavList>
            </FooterNav>
          ))}

          {/* Social & Contact */}
          <FooterNav className="lg:col-span-2">
            <FooterNavTitle>Suivez-nous</FooterNavTitle>
            <FooterSocial>
              {socialLinks.map((link, i) => (
                <FooterSocialLink 
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                >
                  {link.icon}
                </FooterSocialLink>
              ))}
            </FooterSocial>
            
            <FooterNavTitle className="mt-6">Newsletter</FooterNavTitle>
            <div className="flex">
              <Input 
                type="email" 
                placeholder="Votre email" 
                className="bg-neutral-800 text-white rounded-r-none focus:ring-1 focus:ring-[#D9D9D9] border-neutral-700"
              />
              <Button className="bg-[#D9D9D9] text-black hover:bg-[#D9D9D9]/90 rounded-l-none">
                OK
              </Button>
            </div>
          </FooterNav>
        </FooterSection>
        
        {/* Bottom section with silver arcs in background */}
        <div className="relative">
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="w-full h-full">
              {/* SVG Arcs pattern as described in genius.md */}
              <svg width="100%" height="100%" viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path d="M0 200C249.449 66.6667 817.784 -40 1440 200" stroke="#D9D9D9" strokeWidth="1" />
                <path d="M0 180C335.5 80 879.5 50 1440 180" stroke="#D9D9D9" strokeWidth="1" />
                <path d="M0 160C435.5 100 779.5 90 1440 160" stroke="#D9D9D9" strokeWidth="1" />
              </svg>
            </div>
          </div>
          
          <Separator className="bg-neutral-800 my-8" />
          
          <FooterBottom>
            <FooterCopyright>
              © {currentYear} Genius Ad District. Made with <Heart className="h-3 w-3 mx-1 text-red-500 inline" /> in Paris
            </FooterCopyright>
            
            <FooterLegal>
              {legalLinks.map((link, i) => (
                <Link 
                  key={i}
                  href={link.href}
                  className="text-xs text-neutral-400 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </FooterLegal>
          </FooterBottom>
        </div>
      </FooterContainer>
    </Footer>
  );
}
