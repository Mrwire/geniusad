import React, { useEffect, useRef } from 'react';

interface FocusTrapProps {
  /**
   * Whether the focus trap is active
   */
  isActive: boolean;
  /**
   * Children to render
   */
  children: React.ReactNode;
}

/**
 * FocusTrap component to trap keyboard focus within modal dialogs and other overlays
 * This is important for accessibility, especially for keyboard and screen reader users
 */
export const FocusTrap: React.FC<FocusTrapProps> = ({ isActive, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Save the previously focused element when the trap activates
  useEffect(() => {
    if (isActive) {
      previousFocusRef.current = document.activeElement as HTMLElement;
    }
  }, [isActive]);

  // Focus handling when trap is activated/deactivated
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    // Find all focusable elements
    const focusableElements = containerRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    // If no focusable elements, return
    if (focusableElements.length === 0) return;

    // Focus the first element
    const firstElement = focusableElements[0];
    firstElement.focus();

    const handleTabKey = (e: KeyboardEvent) => {
      // Only if Tab key is pressed
      if (e.key !== 'Tab') return;

      // Get first and last focusable elements
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      // Shift + Tab => going backwards
      if (e.shiftKey) {
        // If focused on first element, loop to last
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } 
      // Tab => going forwards
      else {
        // If focused on last element, loop to first
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleTabKey);

    // Cleanup event listener
    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isActive]);

  // Restore focus when trap is deactivated
  useEffect(() => {
    return () => {
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, []);

  return (
    <div ref={containerRef}>{children}</div>
  );
};

export default FocusTrap; 