"use client";

import React, { useState, useEffect, useRef, Fragment } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '../atoms/Button';
import { Typography } from '../atoms/Typography';
import { FocusTrap } from '../atoms/FocusTrap';

export interface ModalProps {
  /**
   * Whether the modal is open
   */
  isOpen: boolean;
  /**
   * Function to close the modal
   */
  onClose: () => void;
  /**
   * Modal title displayed in the header
   */
  title?: string;
  /**
   * Whether to show the close button in the header
   */
  showCloseButton?: boolean;
  /**
   * Modal size
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /**
   * Should modal close when clicking outside
   */
  closeOnClickOutside?: boolean;
  /**
   * Optional footer content
   */
  footer?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * ID for the modal for accessibility
   */
  id?: string;
  /**
   * Aria label for the modal (required if no title)
   */
  ariaLabel?: string;
  /**
   * Modal content
   */
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  showCloseButton = true,
  size = 'md',
  closeOnClickOutside = true,
  footer,
  className = '',
  id,
  ariaLabel,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalId = id || `modal-${Math.random().toString(36).substr(2, 9)}`;
  const labelId = `${modalId}-label`;
  const descriptionId = `${modalId}-description`;
  
  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);
  
  // Handle animation states
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      
      // Prevent scrolling on the body while modal is open
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300); // Match duration from CSS
      
      // Re-enable scrolling when modal closes
      document.body.style.overflow = '';
      return () => clearTimeout(timer);
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnClickOutside && e.target === e.currentTarget) {
      onClose();
    }
  };
  
  // Get appropriate modal size class
  const getSizeClass = () => {
    const sizes = {
      sm: 'max-w-md',
      md: 'max-w-lg',
      lg: 'max-w-2xl',
      xl: 'max-w-4xl',
      full: 'max-w-full mx-4',
    };
    
    return sizes[size] || sizes.md;
  };
  
  if (!isOpen && !isVisible) {
    return null;
  }

  return (
    <Fragment>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center transition-opacity ease-apple-spring duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleBackdropClick}
        aria-modal="true"
        role="dialog"
        aria-labelledby={title ? labelId : undefined}
        aria-describedby={descriptionId}
        aria-label={!title && ariaLabel ? ariaLabel : undefined}
      >
        {/* Modal */}
        <FocusTrap isActive={isOpen}>
          <div 
            ref={modalRef}
            id={modalId}
            className={`relative bg-white rounded-lg shadow-lg w-full ${getSizeClass()} m-4 transform transition-all ease-apple-spring duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'} ${className}`}
            style={{ maxHeight: '90vh' }}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                {title && (
                  <Typography variant="h6" className="font-medium" id={labelId}>
                    {title}
                  </Typography>
                )}
                
                {showCloseButton && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full p-1"
                    aria-label="Close"
                  >
                    <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                  </button>
                )}
              </div>
            )}
            
            {/* Body */}
            <div className="px-6 py-4 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 130px)' }} id={descriptionId}>
              {children}
            </div>
            
            {/* Footer */}
            {footer && (
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                {footer}
              </div>
            )}
          </div>
        </FocusTrap>
      </div>
    </Fragment>
  );
};

// Helper component for easy modal implementations with standard actions
export const ConfirmModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = 'Confirm', 
  cancelText = 'Cancel',
  confirmVariant = 'primary',
  size = 'sm'
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size={size}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            {cancelText}
          </Button>
          <Button variant={confirmVariant} onClick={onConfirm}>
            {confirmText}
          </Button>
        </>
      }
    >
      <Typography variant="body">
        {message}
      </Typography>
    </Modal>
  );
};

export default Modal; 