'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './TabLayout.module.css';

export default function TabLayout() {
  const [activeTab, setActiveTab] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [entryAnimation, setEntryAnimation] = useState(true);
  const headingRef = useRef<HTMLHeadingElement>(null);
  
  // Split text into animated spans on component mount
  useEffect(() => {
    if (headingRef.current) {
      // Apply entry animation after component mounts
      setTimeout(() => {
        setEntryAnimation(false);
      }, 800);
    }
  }, []);

  // Improved tab change handler with animation
  const handleTabChange = (index: number) => {
    if (animating || index === activeTab) return;
    
    setAnimating(true);
    setActiveTab(index);
    
    // Reset animation state after animation completes
    setTimeout(() => {
      setAnimating(false);
    }, 800);
  };

  // Tab content data
  const tabContent = [
    {
      title: "Shifting Perspectives",
      description: "A dynamic exploration of structure, balance, and creative symmetry.",
      image: "https://cdn.prod.website-files.com/67726722d415dc401ae23cf6/677289e14dd4dbca1d8e5930_philip-oroni-IANBrm46bF0-unsplash%20(2).avif",
      alt: "Abstract shapes"
    },
    {
      title: "Fragments of Motion",
      description: "Where design meets depth—an abstract dance of light and form.",
      image: "https://cdn.prod.website-files.com/67726722d415dc401ae23cf6/677289e19e4d013c6a4c5a1b_philip-oroni-Zx_G3LpNnV4-unsplash%20(1).avif",
      alt: "Abstract depth"
    },
    {
      title: "Echoes in Orange",
      description: "A journey through layered geometry and endless possibilities.",
      image: "https://cdn.prod.website-files.com/67726722d415dc401ae23cf6/677289e1c88b5b4c14d1e6fd_philip-oroni-h9N7bm-HRCo-unsplash.avif",
      alt: "Abstract layers"
    }
  ];

  // Array of tab labels
  const tabLabels = ["Shapes", "Depth", "Layers"];

  return (
    <section className={`${styles.cloneable} ${styles.osmoTheme} ${entryAnimation ? styles.entering : ''}`}>
      <div data-tabs="wrapper" className={styles['tab-layout']}>
        <div className={styles['tab-layout-col']}>
          <div className={styles['tab-layout-container']}>
            <div className={styles['tab-container']}>
              <div className={styles['tab-container-top']}>
                <h1 
                  ref={headingRef}
                  className={styles['tab-layout-heading']}
                >
                  Explore the Layers of Abstract Design and Depth
                </h1>
                <div className={styles['filter-bar']}>
                  {tabLabels.map((label, index) => (
                    <button 
                      key={index}
                      onClick={() => handleTabChange(index)} 
                      className={`${styles['filter-button']} ${activeTab === index ? styles.active : ''}`}
                      disabled={animating}
                      aria-pressed={activeTab === index}
                    >
                      <div className={styles['filter-button__p']}>{label}</div>
                      {activeTab === index && (
                        <div className={styles['tab-button__bg']}>
                          <span className={styles['button-highlight']}></span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              <div className={styles['tab-container-bottom']}>
                <div className={styles['tab-content-wrap']}>
                  {tabContent.map((content, index) => (
                    <div 
                      key={index}
                      className={`
                        ${styles['tab-content-item']} 
                        ${activeTab === index ? styles.active : ''} 
                        ${animating ? styles.animating : ''}
                      `}
                      aria-hidden={activeTab !== index}
                    >
                      <h2 className={styles['tab-content__heading']}>
                        {content.title}
                      </h2>
                      <p className={`${styles['content-p']} ${styles['opacity--80']}`}>
                        {content.description}
                      </p>
                    </div>
                  ))}
                </div>
                <a href="#" className={`${styles['tab-content__button']}`}>
                  <p className={styles['content-p']}>Become a member</p>
                  <div className={styles['content-button__bg']}></div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={styles['tab-layout-col']}>
          <div className={styles['tab-visual-wrap']}>
            {tabContent.map((content, index) => (
              <div 
                key={index}
                className={`
                  ${styles['tab-visual-item']} 
                  ${activeTab === index ? styles.active : ''} 
                  ${animating ? styles.animating : ''}
                `}
              >
                <Image 
                  src={content.image}
                  alt={content.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0}
                  className={styles['tab-image']}
                />
                {/* Image overlay for hover effects */}
                <div className={styles['tab-image-overlay']} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 