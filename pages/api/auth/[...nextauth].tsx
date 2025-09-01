import NextAuth, { NextAuthOptions, User, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req): Promise<User | null> {
        if (credentials?.email === 'admin@example.com' && credentials?.password === 'password123') {
          const user: User = {
            id: '1', 
            name: 'Admin User', 
            email: 'admin@example.com',
            role: "admin" // Admin role
          };
          return user; 
        } 

        else if (credentials?.email === 'user@example.com' && credentials?.password === 'password456') {
          const user: User = {
            id: '2', 
            name: 'Normal User', 
            email: 'user@example.com',
            role: "user" // User role
          };
          return user;
        }
        else {
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
  
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }): Promise<JWT> {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    
    async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);