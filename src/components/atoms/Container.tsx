import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  fluid?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  fluid = false,
}) => {
  // Use max-w-6xl for standard container, or w-full for fluid
  const containerClasses = `
    mx-auto 
    px-4 
    sm:px-6 
    lg:px-8 
    ${fluid ? 'w-full' : 'max-w-7xl'} 
    ${className}
  `;

  return (
    <div className={containerClasses}>
      {children}
    </div>
  );
};

export default Container; 