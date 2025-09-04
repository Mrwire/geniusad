import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { client } from './sanity';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Fetch user from Sanity by email
          const user = await client.fetch(
            `*[_type == "user" && email == $email && isActive == true][0] {
              _id,
              name,
              email,
              password,
              role,
              company,
              "profileImage": profileImage.asset->url,
              "projects": projects[]->._id
            }`,
            { email: credentials.email }
          );

          if (!user || !user.password) {
            return null;
          }

          // Compare password with hashed password in database
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            return null;
          }

          // Update last login time in Sanity
          await client
            .patch(user._id)
            .set({ lastLogin: new Date().toISOString() })
            .commit();

          // Return user without password
          return {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            company: user.company,
            profileImage: user.profileImage,
            projects: user.projects,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Add custom user properties to the JWT token
        token.id = user.id;
        token.role = user.role;
        token.company = user.company;
        token.profileImage = user.profileImage;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // Add custom token properties to the session
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.company = token.company as string;
        session.user.profileImage = token.profileImage as string | undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
}; 