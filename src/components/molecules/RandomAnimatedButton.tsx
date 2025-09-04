import React, { useState, useEffect, useRef } from 'react';

export interface RandomAnimatedButtonProps {
  /**
   * Button text
   */
  text: string;
  /**
   * Action to perform on click
   */
  onClick?: () => void;
  /**
   * Additional class names
   */
  className?: string;
  /**
   * Number of particles to create (default: 15)
   */
  particleCount?: number;
  /**
   * Button color theme
   */
  theme?: 'dark' | 'light' | 'steel';
}

/**
 * A button with random particle animation effects on hover and click
 */
const RandomAnimatedButton: React.FC<RandomAnimatedButtonProps> = ({
  text,
  onClick,
  className = '',
  particleCount = 15,
  theme = 'dark',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [particles, setParticles] = useState<Array<{ x: number; y: number; size: number; color: string; speed: number; angle: number; opacity: number }>>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Theme colors
  const themeColors = {
    dark: {
      background: 'bg-black',
      text: 'text-white',
      particleColors: ['#FFFFFF', '#E0E0E0', '#F5F5F5']
    },
    light: {
      background: 'bg-white',
      text: 'text-black',
      particleColors: ['#000000', '#333333', '#777777']
    },
    steel: {
      background: 'bg-gray-200',
      text: 'text-black',
      particleColors: ['#888888', '#CCCCCC', '#EEEEEE']
    },
  };

  // Generate random particles when button is pressed
  useEffect(() => {
    if (isPressed && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const newParticles = Array.from({ length: particleCount }).map(() => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 3;
        const size = 3 + Math.random() * 7;
        const colorIndex = Math.floor(Math.random() * themeColors[theme].particleColors.length);
        
        return {
          x: centerX,
          y: centerY,
          size,
          color: themeColors[theme].particleColors[colorIndex],
          speed,
          angle,
          opacity: 0.8 + Math.random() * 0.2
        };
      });
      
      setParticles(newParticles);
      
      // Reset pressed state after animation
      const timer = setTimeout(() => {
        setIsPressed(false);
        setParticles([]);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [isPressed, particleCount, theme]);

  // Update particle positions
  useEffect(() => {
    if (particles.length > 0) {
      const interval = setInterval(() => {
        setParticles(prev => 
          prev.map(particle => ({
            ...particle,
            x: particle.x + Math.cos(particle.angle) * particle.speed,
            y: particle.y + Math.sin(particle.angle) * particle.speed,
            opacity: particle.opacity > 0.1 ? particle.opacity - 0.02 : 0
          })).filter(particle => particle.opacity > 0)
        );
      }, 16);
      
      return () => clearInterval(interval);
    }
  }, [particles]);

  const handleClick = () => {
    setIsPressed(true);
    if (onClick) onClick();
  };

  return (
    <button
      ref={buttonRef}
      className={`relative overflow-hidden ${themeColors[theme].background} ${themeColors[theme].text} font-heading font-bold py-4 px-8 rounded-lg transition-transform duration-150 ${isPressed ? 'scale-95' : 'scale-100'} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Button text */}
      <span className="relative z-10">{text}</span>
      
      {/* Hover effect */}
      <span 
        className={`absolute inset-0 transition-opacity duration-300 ${isHovered ? 'opacity-20' : 'opacity-0'}`}
        style={{ 
          background: 'linear-gradient(45deg, var(--tw-gradient-stops))',
          '--tw-gradient-from': themeColors[theme].particleColors[0],
          '--tw-gradient-to': themeColors[theme].particleColors[2],
          '--tw-gradient-stops': `var(--tw-gradient-from), ${themeColors[theme].particleColors[1]} 50%, var(--tw-gradient-to)`,
        } as React.CSSProperties}
      />
      
      {/* Particles */}
      {particles.map((particle, index) => (
        <span
          key={index}
          className="absolute rounded-full pointer-events-none z-20"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </button>
  );
};

export default RandomAnimatedButton; 