import NextAuth from "next-auth";

// Providers
import CredentialsProvider from "next-auth/providers/credentials";
import { callApiAsync } from "./lib/callApi";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  }
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await callApiAsync("/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          })

          if (user.isSuccessful) {
            return user.data;
          }

          return null;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Unknown error";
          throw new Error(`Failed to log in: ${errorMessage}`);
        }
      }
    }),
  ],
});
