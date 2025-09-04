'use client';

import React, { useState } from 'react';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface LoginFormProps {
  locale: string;
  translations: {
    email: string;
    password: string;
    forgotPassword: string;
    rememberMe: string;
    login: string;
    noAccount: string;
    contactUs: string;
  };
}

export default function LoginForm({ locale, translations }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Unique IDs for form controls
  const formId = 'login-form';
  const emailId = 'login-email';
  const passwordId = 'login-password';
  const rememberMeId = 'login-remember-me';
  const errorId = 'login-error';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please provide both email and password');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      
      if (result?.error) {
        setError('Invalid email or password');
        setIsLoading(false);
        return;
      }
      
      if (result?.ok) {
        router.push(`/${locale}/client-portal/dashboard`);
        router.refresh();
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <form 
      id={formId}
      onSubmit={handleSubmit} 
      className="mt-8 space-y-6"
      aria-describedby={error ? errorId : undefined}
      noValidate
    >
      {error && (
        <div 
          id={errorId}
          className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label htmlFor={emailId} className="block text-sm font-medium text-gray-700">
            {translations.email}
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            disabled={isLoading}
            aria-required="true"
            aria-invalid={error && !email ? 'true' : 'false'}
          />
        </div>
        
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor={passwordId} className="block text-sm font-medium text-gray-700">
              {translations.password}
            </label>
            <div className="text-sm">
              <Link href={`/${locale}/auth/forgot-password`} className="text-primary-600 hover:text-primary-500">
                {translations.forgotPassword}
              </Link>
            </div>
          </div>
          <input
            id={passwordId}
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            disabled={isLoading}
            aria-required="true"
            aria-invalid={error && !password ? 'true' : 'false'}
          />
        </div>
        
        <div className="flex items-center">
          <input
            id={rememberMeId}
            name="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            disabled={isLoading}
          />
          <label htmlFor={rememberMeId} className="ml-2 block text-sm text-gray-700">
            {translations.rememberMe}
          </label>
        </div>
      </div>

      <div>
        <Button
          type="submit"
          variant="primary"
          className="w-full justify-center"
          disabled={isLoading}
          isLoading={isLoading}
          aria-busy={isLoading}
        >
          {translations.login}
        </Button>
      </div>
      
      <div className="text-center mt-4">
        <Typography variant="body" className="text-sm text-gray-600">
          {translations.noAccount}{' '}
          <Link href={`/${locale}/contact`} className="text-primary-600 hover:text-primary-500">
            {translations.contactUs}
          </Link>
        </Typography>
      </div>
    </form>
  );
} 