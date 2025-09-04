import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from './auth';
import { defaultLocale } from '@/i18n/config';

// Helper to get the session on the server
export async function getSession() {
  return await getServerSession(authOptions);
}

// Helper to get the current user
export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}

// Admin protection for admin-only pages
export async function protectAdminPage() {
  const session = await getSession();
  
  if (!session || session.user.role !== 'admin') {
    redirect(`/${defaultLocale}/auth/unauthorized`);
  }
  
  return session.user;
}

// Generic protection for authenticated pages
export async function protectPage() {
  const session = await getSession();

  if (!session || !session.user) {
    redirect(`/${defaultLocale}/auth/login`);
  }

  return session.user;
}

// Team protection for team-only pages
export async function protectTeamPage() {
  const session = await getSession();
  
  if (!session || (session.user.role !== 'team' && session.user.role !== 'admin')) {
    redirect(`/${defaultLocale}/auth/unauthorized`);
  }
  
  return session.user;
}

// Check if the current user has access to a specific project
export async function hasProjectAccess(projectId: string) {
  const user = await getCurrentUser();
  
  if (!user) return false;
  
  // Admins have access to all projects
  if (user.role === 'admin') return true;
  
  // Check if the project is in the user's projects
  // This would require a database query in a real application
  
  return false;
} 
