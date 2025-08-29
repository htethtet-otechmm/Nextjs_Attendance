
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "admin@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req): Promise<User | null> {
        if (credentials?.email === 'admin@example.com' && credentials?.password === 'password123') {
          const user: User = { id: '1', name: 'Admin', email: 'admin@example.com' };
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  
  pages: {
    signIn: '/',
  },
};

export default NextAuth(authOptions);