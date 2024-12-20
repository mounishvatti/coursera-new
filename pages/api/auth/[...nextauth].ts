import NextAuth from "next-auth"
import type { NextAuthOptions } from 'next-auth'
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import AppleProvider from "next-auth/providers/apple"

import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "utils/prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID!,
      clientSecret: process.env.APPLE_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      if (session.user) {
        session.user.id = user.id
      }

      return session
    }
  }
}

export default NextAuth(authOptions)