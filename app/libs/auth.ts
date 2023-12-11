import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const credentialDetails = {
          username: credentials?.username,
          password: credentials?.password,
        };

        const res = await fetch(baseUrl + "/jwt/create", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentialDetails),
        });

        const user = await res.json();

        if (!res.ok) {
          throw new Error(user.detail);
        }

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          accessToken: user.access,
        };
      }
      return token;
    },

    async session({ session, token }) {  
      session.accessToken = token.accessToken;
      return session;
    }
  },
};
