import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Disable certificate validation for development (only needed for self-signed certs)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          console.log("No credentials provided");
          return null; // Invalid credentials
        }

        // Make a POST request to the custom backend
        const url = process.env.NEXTAUTH_URL;
        if (!url) {
          throw new Error("NEXTAUTH_URL environment variable is not defined");
        }
        
        const res = await fetch(`${url}/api/Auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
        });

        console.log("Could call API");

        // Ensure the response is OK
        if (!res.ok) {
          console.log("Response not OK");
          return null; // Authentication failed
        }

        const data = await res.json(); // Parse the response
        console.log("Data passed");
        console.log("Data: ", data);

        // Extract user and token from the response
        const user = data.user; // Assuming 'result' contains the user object
        const accessToken = data.token; // Access token is in the 'accessToken' field

        // If the login is successful, return the user and token
        if (user && accessToken) {
          console.log("User and token found");
          return {
            ...user, // Return user data
            accessToken: accessToken, // Include the access token
          };
        }

        console.log("User and token not found");
        return null; // Authentication failed
      },
    }),
  ],
  secret: process.env.SECRET,
  pages: {
    signIn: "/sign-in",
    // signOut: "/sign-out",
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      // On initial sign-in, add user and accessToken to the token
      if (user) {
        token.user = user; // Store user data
        token.accessToken = user.accessToken; // Store the access token
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      // Include user and accessToken in the session
      session.user = token.user; // Add the user object
      session.accessToken = token.accessToken; // Pass the JWT token to the session
      return session;
    },
  },
};
