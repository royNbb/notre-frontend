import NextAuth, { Account, DefaultSession, User } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user?: {
      name?: string | null;
      email?: string | null;
      id?: string | number | null;
      username?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    id?: string | number | null;
    username?: string | null;
  }
}

declare module "next-auth" {
  interface User {
    access?: string;
    username?: string;
    error?: string;
  }
}
