import React, { useState } from 'react';

export interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button text
   */
  text: string;
  /**
   * Button variant
   */
  variant?: 'fill' | 'outline' | 'pulse';
  /**
   * The color of the animation effect
   */
  animationColor?: string;
  /**
   * Additional class names
   */
  className?: string;
}

/**
 * An animated button component with hover effects
 */
const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  text,
  variant = 'fill',
  animationColor = '#FFFFFF', // Remplacé la couleur cyan par du blanc
  className = '',
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Base classes
  const baseClasses = 'relative overflow-hidden font-heading font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-out';
  
  // Variant specific classes
  const variantClasses = {
    fill: 'bg-black text-white',
    outline: 'bg-transparent text-black border-2 border-black',
    pulse: 'bg-white text-black shadow-md',
  };
  
  // Event handlers
  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(true);
    if (props.onMouseEnter) props.onMouseEnter(e);
  };
  
  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(false);
    if (props.onMouseLeave) props.onMouseLeave(e);
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <span className="relative z-10">{text}</span>
      
      {/* Animation overlay */}
      <span 
        className={`absolute inset-0 transform transition-transform duration-500 ease-out ${
          variant === 'fill' 
            ? isHovered ? 'translate-x-0' : 'translate-x-[-100%]' 
            : isHovered ? 'scale-[2.5]' : 'scale-0'
        }`}
        style={{ 
          background: animationColor,
          opacity: variant === 'pulse' ? 0.3 : 0.8,
          borderRadius: variant === 'pulse' ? '50%' : '0',
          left: variant === 'pulse' ? '50%' : '0',
          top: variant === 'pulse' ? '50%' : '0',
          transform: variant === 'pulse' 
            ? `translate(-50%, -50%) scale(${isHovered ? 1 : 0})` 
            : isHovered ? 'translateX(0)' : 'translateX(-100%)'
        }}
      />
    </button>
  );
};

export default AnimatedButton; 