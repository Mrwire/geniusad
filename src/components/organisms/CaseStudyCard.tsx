"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';

export interface CaseStudyCardProps {
  id: string;
  title: string;
  client: string;
  description: string;
  coverImage: string;
  industry: string[];
  services: string[];
  slug: string;
  highlight?: boolean;
  featured?: boolean;
  className?: string;
  subsidiary?: 'default' | 'mps' | 'labrigad' | 'gamius' | 'moujeleell';
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  title,
  client,
  description,
  coverImage,
  industry,
  services,
  slug,
  highlight = false,
  featured = false,
  className = '',
  subsidiary = 'default',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Handle animations on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('translate-y-0', 'opacity-100');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      cardRef.current.classList.add('transition-all', 'duration-700', 'ease-apple-spring');
      cardRef.current.classList.add('translate-y-8', 'opacity-0');
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  // Handle different card variants
  const getCardSizing = () => {
    if (featured) return 'md:col-span-2 md:row-span-2';
    if (highlight) return 'md:col-span-2';
    return '';
  };

  // Handle hover effect classes
  const getHoverClasses = () => {
    return isHovered ? 'scale-[1.02] shadow-xl' : 'scale-100 shadow-md';
  };

  // Handle subsidiary color
  const getSubsidiaryColor = () => {
    switch (subsidiary) {
      case 'mps':
        return 'bg-mps bg-opacity-5 border-mps';
      case 'labrigad':
        return 'bg-labrigad bg-opacity-5 border-labrigad';
      case 'gamius':
        return 'bg-gamius bg-opacity-5 border-gamius';
      case 'moujeleell':
        return 'bg-moujeleell bg-opacity-5 border-moujeleell';
      default:
        return 'bg-white border-gray-200';
    }
  };

  return (
    <div
      ref={cardRef}
      className={`
        group rounded-xl overflow-hidden border transition-all duration-500 
        ${getCardSizing()} ${getHoverClasses()} ${getSubsidiaryColor()} ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/case-studies/${slug}`} className="block h-full">
        <div className="flex flex-col h-full">
          {/* Image */}
          <div className="relative h-64 md:h-80 overflow-hidden">
            <Image
              src={coverImage}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              className={`transition-transform duration-700 ease-apple-spring ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
            />
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {featured && (
                <div className="bg-black text-white text-xs font-semibold px-2 py-1 rounded">
                  Featured
                </div>
              )}
              
              {subsidiary !== 'default' && (
                <div className={`text-white text-xs font-semibold px-2 py-1 rounded bg-${subsidiary}`}>
                  {subsidiary.toUpperCase()}
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-between p-6 flex-grow">
            <div>
              <div className="mb-2">
                <Typography 
                  variant="label" 
                  color="muted" 
                  className="text-xs uppercase tracking-wider mb-1"
                >
                  {client}
                </Typography>
                
                <Typography 
                  variant="h4" 
                  color={subsidiary !== 'default' ? subsidiary : undefined}
                  className="mb-2 transition-colors duration-300"
                >
                  {title}
                </Typography>
              </div>
              
              <Typography variant="body" color="muted" className="mb-4 line-clamp-3">
                {description}
              </Typography>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {industry.slice(0, 2).map((tag) => (
                  <span 
                    key={tag} 
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
                
                {services.slice(0, 2).map((tag) => (
                  <span 
                    key={tag} 
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
                
                {(industry.length + services.length) > 4 && (
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    +{(industry.length + services.length) - 4} more
                  </span>
                )}
              </div>
            </div>
            
            {/* CTA */}
            <div className="group-hover:translate-x-2 transition-transform duration-300">
              <Button 
                variant="tertiary" 
                subsidiary={subsidiary !== 'default' ? subsidiary : undefined}
                className="flex items-center gap-1 p-0"
              >
                View Case Study
                <Icon name="chevron-right" size="sm" className="transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CaseStudyCard; 