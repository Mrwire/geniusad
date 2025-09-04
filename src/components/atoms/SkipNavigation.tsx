'use client';

import React, { useState } from 'react';

interface SkipNavigationProps {
  mainContentId?: string;
}

/**
 * SkipNavigation component for keyboard users to bypass navigation menu
 * This is a crucial accessibility feature for keyboard-only users
 */
const SkipNavigation: React.FC<SkipNavigationProps> = ({
  mainContentId = 'main-content'
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const mainContent = document.getElementById(mainContentId);
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView();
    }
  };

  return (
    <a
      href={`#${mainContentId}`}
      className={`
        fixed top-4 left-1/2 transform -translate-x-1/2 z-50
        px-4 py-2 bg-black text-white font-medium rounded-md
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
        transition-opacity duration-200
        ${isFocused ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
      onClick={handleClick}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      tabIndex={0}
    >
      Skip to main content
    </a>
  );
};

export default SkipNavigation; 