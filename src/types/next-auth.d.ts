import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Extending the built-in session types
   * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
   */
  interface Session {
    user: {
      id: string;
      role: string;
      company: string;
      profileImage?: string;
    } & DefaultSession['user'];
  }

  /**
   * Extending the built-in user types
   */
  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    company: string;
    profileImage?: string;
    projects?: string[];
  }
}

declare module 'next-auth/jwt' {
  /** Extending the built-in JWT types */
  interface JWT {
    id: string;
    role: string;
    company: string;
    profileImage?: string;
  }
} 