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

        const token = await res.json();

        if (!res.ok) {
          throw new Error(token.detail);
        }

        const response = await fetch(baseUrl + "/users/me", {
          headers: {
            Authorization: "JWT " + token.access,
          },
        });

        const user = await response.json();

        if (!response.ok) {
          throw new Error(user.detail);
        }

        if (user) {
          return { ...user, ...token };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.access,
          username: user.username,
          id: user.id
        };
      }
      return token;
    },

    async session({ session, token }) {  
      session.accessToken = token.accessToken;
    
      if (session.user) {
        session.user.id = token.id;
        session.user.username = token.username;
      }
      
      return session;
    }
  },
};
