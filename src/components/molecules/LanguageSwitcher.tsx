'use client';

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { Button } from '@/components/atoms/Button';

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
  const locale = useLocale();
  const t = useTranslations('common');
  
  // Determine the opposite locale for switching
  const oppositeLocale = locale === 'en' ? 'fr' : 'en';
  
  return (
    <Link href="/" locale={oppositeLocale} className={className}>
      <Button variant="ghost" size="sm">
        {t('switchLanguage')}
      </Button>
    </Link>
  );
};

export default LanguageSwitcher; 