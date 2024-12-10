import type { NextAuthOptions } from "next-auth";

// Providers
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials == undefined || credentials == null) {
          return null;
        }
        // Make a POST request to the custom backend
        const res = await fetch("https://localhost:7202/api/Auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const user = await res.json();

        // If the login is successful, return the user object
        if (res.ok && user) {
          return user;
        }

        // Return null if the authentication fails
        return null;
      },
    }),
  ],
  secret: process.env.SECRET,
  pages: {
    signIn: "/sign-in",
    // signOut: "/sign-out",
  },
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      // Include additional information in the session
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
};
