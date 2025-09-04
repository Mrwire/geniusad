'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Mail, MessageSquare, Phone } from 'lucide-react';
import { useParams } from 'next/navigation';

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactPopup: React.FC<ContactPopupProps> = ({ isOpen, onClose }) => {
  const params = useParams();
  const locale = (params && typeof params === 'object' && 'locale' in params) ? params.locale as string : 'fr';
  const currentLocale = (locale === 'en' ? 'en' : 'fr') as 'fr' | 'en';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const content = {
    title: currentLocale === 'fr' ? 'Commençons la conversation' : 'Let\'s start the conversation',
    subtitle: currentLocale === 'fr' ? 
      'Partagez votre vision avec nous et découvrons ensemble comment la concrétiser.' :
      'Share your vision with us and let\'s discover together how to make it a reality.',
    fields: {
      name: currentLocale === 'fr' ? 'Nom complet' : 'Full name',
      email: currentLocale === 'fr' ? 'Adresse e-mail' : 'Email address',
      phone: currentLocale === 'fr' ? 'Téléphone (optionnel)' : 'Phone (optional)',
      message: currentLocale === 'fr' ? 'Votre message' : 'Your message'
    },
    placeholders: {
      name: currentLocale === 'fr' ? 'Votre nom' : 'Your name',
      email: currentLocale === 'fr' ? 'votre@email.com' : 'your@email.com',
      phone: currentLocale === 'fr' ? '+33 6 12 34 56 78' : '+1 (555) 123-4567',
      message: currentLocale === 'fr' ? 
        'Décrivez votre projet, vos objectifs ou toute question que vous pourriez avoir...' :
        'Describe your project, goals, or any questions you might have...'
    },
    buttons: {
      send: currentLocale === 'fr' ? 'Envoyer le message' : 'Send message',
      close: currentLocale === 'fr' ? 'Fermer' : 'Close'
    },
    success: {
      title: currentLocale === 'fr' ? 'Message envoyé !' : 'Message sent!',
      description: currentLocale === 'fr' ? 
        'Merci pour votre message. Notre équipe vous contactera dans les plus brefs délais.' :
        'Thank you for your message. Our team will contact you as soon as possible.'
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
      onClose();
    }, 2000);
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  const successVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 300
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {!isSubmitted ? (
              <>
                {/* Header */}
                <div className="relative p-8 pb-6 border-b border-gray-100">
                  <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  >
                    <X size={24} className="text-gray-500" />
                  </button>
                  
                  <div className="pr-12">
                    <h2 className="text-3xl font-bold text-black mb-3">
                      {content.title}
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {content.subtitle}
                    </p>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8">
                  <div className="space-y-6">
                    {/* Name Field */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <User size={16} className="inline mr-2" />
                        {content.fields.name}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={content.placeholders.name}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-gray-900"
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Mail size={16} className="inline mr-2" />
                        {content.fields.email}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={content.placeholders.email}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-gray-900"
                      />
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Phone size={16} className="inline mr-2" />
                        {content.fields.phone}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder={content.placeholders.phone}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 text-gray-900"
                      />
                    </div>

                    {/* Message Field */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <MessageSquare size={16} className="inline mr-2" />
                        {content.fields.message}
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder={content.placeholders.message}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 resize-none text-gray-900"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-8">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-black text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>
                            {currentLocale === 'fr' ? 'Envoi en cours...' : 'Sending...'}
                          </span>
                        </div>
                      ) : (
                        <>
                          <Send size={20} />
                          <span>{content.buttons.send}</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </>
            ) : (
              /* Success State */
              <motion.div
                className="p-12 text-center"
                variants={successVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", damping: 15 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring", damping: 15 }}
                  >
                    ✓
                  </motion.div>
                </motion.div>
                
                <h3 className="text-2xl font-bold text-black mb-4">
                  {content.success.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {content.success.description}
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactPopup;
