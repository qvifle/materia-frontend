import api from "@/lib/utils/api"
import getAccessTokenFromCookie from "@/lib/utils/getAccessTokenFromCookie"
import authService from "@/services/AuthService"
import type { NextAuthOptions, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, ...user }
      }
      return token
    },
    async session({ session, token, user }) {
      session.user = token as any
      return session
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("No email or password provided")
        }

        const res = await authService.signIn(credentials)

        if (!res.headers["set-cookie"]) {
          throw new Error("No header 'set-cookie' in response")
        }

        const accessToken = getAccessTokenFromCookie(res.headers["set-cookie"])

        return { ...res.data, accessToken: accessToken }
      },
    }),
  ],
}
