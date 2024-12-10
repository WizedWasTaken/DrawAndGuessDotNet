import type { NextAuthOptions } from "next-auth";

// Providers
import CredentialsProvider from "next-auth/providers/credentials";

const env = process.env.NODE_ENV;

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials === null) {
          throw new Error("No credentials provided");
        }

        const user = {
          id: "1",
          username: "test",
          email: "test@test-mail.com",
          password: "test",
        };

        if (
          credentials &&
          user.username === credentials.username &&
          user.password === credentials.password
        ) {
          return user;
        } else {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  secret: process.env.SECRET,
  //   pages: {
  //     signIn: "/sign-in",
  //   },
};
