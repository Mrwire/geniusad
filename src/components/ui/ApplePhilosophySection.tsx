'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, 
  Users, 
  Lightbulb, 
  TrendingUp, 
  CheckCircle, 
  RefreshCw 
} from 'lucide-react';

interface PhilosophyStep {
  id: number;
  title: string;
  description?: string;
  icon: React.ReactNode;
}

interface ApplePhilosophySectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  steps: PhilosophyStep[];
  autoRotate?: boolean;
  rotationInterval?: number;
  className?: string;
}

const defaultSteps: PhilosophyStep[] = [
  {
    id: 1,
    title: "Vision",
    description: "Define clear objectives and long-term goals",
    icon: <Target className="w-6 h-6" />
  },
  {
    id: 2,
    title: "Collaborate",
    description: "Foster teamwork and shared understanding",
    icon: <Users className="w-6 h-6" />
  },
  {
    id: 3,
    title: "Innovate",
    description: "Generate creative solutions and breakthrough ideas",
    icon: <Lightbulb className="w-6 h-6" />
  },
  {
    id: 4,
    title: "Execute",
    description: "Transform concepts into tangible results",
    icon: <TrendingUp className="w-6 h-6" />
  },
  {
    id: 5,
    title: "Validate",
    description: "Measure impact and gather meaningful feedback",
    icon: <CheckCircle className="w-6 h-6" />
  },
  {
    id: 6,
    title: "Iterate",
    description: "Refine and enhance based on learnings",
    icon: <RefreshCw className="w-6 h-6" />
  }
];

const ApplePhilosophySection: React.FC<ApplePhilosophySectionProps> = ({
  title = "Our Philosophy",
  subtitle = "Continuous Improvement Loop",
  description = "A continuous cycle of innovation that drives meaningful progress through thoughtful design and purposeful execution.",
  steps,
  autoRotate = true,
  rotationInterval = 3000,
  className = ""
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!autoRotate || isHovered) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [autoRotate, isHovered, rotationInterval, steps.length]);

  // Precise dimensions for perfect centering
  const containerWidth = 400;
  const containerHeight = 400;
  const centerX = containerWidth / 2;
  const centerY = containerHeight / 2;
  const circleRadius = 140;

  const getStepPosition = (index: number, total: number) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
    const x = centerX + circleRadius * Math.cos(angle);
    const y = centerY + circleRadius * Math.sin(angle);
    return { x, y, angle };
  };

  return (
    <div className={`w-full text-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-4">
              {subtitle}
            </p>
          )}
          {description && (
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </motion.div>

        {/* Desktop Circular Layout */}
        <div className="hidden lg:block">
          <div 
            className="relative mx-auto"
            style={{ width: `${containerWidth}px`, height: `${containerHeight}px` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Center Circle - Outer container for positioning */}
            <div 
              className="absolute"
              style={{
                top: '50%',
                left: '50%',
                width: '80px',
                height: '80px',
                transform: 'translate(-50%, -50%)',  // Positioning only
                zIndex: 20
              }}
            >
              {/* Inner element for rotation and scaling */}
              <motion.div 
                className="w-full h-full rounded-full bg-white flex items-center justify-center"
                animate={{ 
                  scale: isHovered ? 1.1 : 1,
                  rotate: autoRotate && !isHovered ? 360 : 0
                }}
                transition={{ 
                  scale: { duration: 0.3 },
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                }}
              >
                <div className="w-3 h-3 bg-black rounded-full" />
              </motion.div>
            </div>

            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 5 }}>
              {steps.map((_, index) => {
                const { x, y } = getStepPosition(index, steps.length);
                const nextIndex = (index + 1) % steps.length;
                const { x: nextX, y: nextY } = getStepPosition(nextIndex, steps.length);
                
                return (
                  <motion.line
                    key={`line-${index}`}
                    x1={x}
                    y1={y}
                    x2={nextX}
                    y2={nextY}
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: 1, 
                      opacity: 0.3,
                      strokeWidth: activeStep === index ? 2 : 1
                    }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.1,
                      strokeWidth: { duration: 0.3 }
                    }}
                  />
                );
              })}
            </svg>

            {/* Step Circles */}
            {steps.map((step, index) => {
              const { x, y } = getStepPosition(index, steps.length);
              const isActive = activeStep === index;
              
              return (
                <motion.div
                  key={step.id}
                  className="absolute cursor-pointer group"
                  style={{
                    left: x - 32,
                    top: y - 32,
                    zIndex: 15
                  }}
                  onClick={() => setActiveStep(index)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div 
                    className={`w-16 h-16 rounded-full border-2 flex items-center justify-center
                               transition-all duration-300 ${
                      isActive 
                        ? 'bg-white text-black border-white shadow-lg' 
                        : 'bg-black text-white border-gray-700 hover:border-gray-400'
                    }`}
                    animate={{
                      scale: isActive ? 1.2 : 1,
                      boxShadow: isActive 
                        ? '0 8px 25px -5px rgba(0,0,0,0.3)' 
                        : '0 2px 10px -3px rgba(0,0,0,0.1)'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-sm font-semibold">{step.id}</span>
                  </motion.div>
                  
                  {/* Tooltip */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        className="absolute bg-white text-black px-4 py-1.5 rounded-md 
                                 text-[10px] font-medium tracking-wide uppercase whitespace-nowrap shadow-md"
                        style={{
                          // Position based on angle - top half above, bottom half below
                          ...((() => {
                            const { angle } = getStepPosition(index, steps.length);
                            const angleInDegrees = (angle * 180) / Math.PI;
                            
                            // Top half of circle - place tooltips above
                            if (angleInDegrees > -180 && angleInDegrees < 0) {
                              return { bottom: '70px' };
                            } 
                            // Bottom half of circle - place tooltips below
                            else {
                              return { top: '70px' };
                            }
                          })()),
                          left: '50%',
                          transform: 'translateX(-50%)',
                          zIndex: 30,
                          letterSpacing: '0.05em'
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        {step.title}
                        <div 
                          className="absolute w-2 h-2 bg-white" 
                          style={{
                            // Arrow position based on tooltip position
                            ...((() => {
                              const { angle } = getStepPosition(index, steps.length);
                              const angleInDegrees = (angle * 180) / Math.PI;
                              
                              if (angleInDegrees > -180 && angleInDegrees < 0) {
                                return { 
                                  bottom: '-4px',
                                  boxShadow: '1px 1px 1px rgba(0,0,0,0.05)'
                                };
                              } else {
                                return { 
                                  top: '-4px',
                                  boxShadow: '-1px -1px 1px rgba(0,0,0,0.05)'
                                };
                              }
                            })()),
                            left: '50%',
                            transform: 'translateX(-50%) rotate(45deg)'
                          }} 
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Active Step Details */}
          <motion.div 
            className="text-center mt-12"
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center mb-4">
              <div className="text-white mr-3">
                {steps[activeStep].icon}
              </div>
              <h3 className="text-2xl font-light">
                {steps[activeStep].title}
              </h3>
            </div>
            <p className="text-gray-300 text-lg max-w-md mx-auto">
              {steps[activeStep].description || ""}
            </p>
          </motion.div>
        </div>

        {/* Mobile uses the same circular layout */}

        {/* Progress Indicator */}
        <div className="flex justify-center mt-12 space-x-2">
          {steps.map((_, index) => (
            <motion.button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeStep === index ? 'bg-white' : 'bg-gray-700'
              }`}
              onClick={() => setActiveStep(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              animate={{
                scale: activeStep === index ? 1.2 : 1,
                opacity: activeStep === index ? 1 : 0.5
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplePhilosophySection;