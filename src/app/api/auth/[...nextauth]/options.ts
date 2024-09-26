import api, { apiNoAuth } from "@/lib/utils/api"
import getTokens from "@/lib/utils/getAccessTokenFromCookie"
import getAccessTokenFromCookie from "@/lib/utils/getAccessTokenFromCookie"
import authService from "@/services/AuthService"
import type { NextAuthOptions, User } from "next-auth"
import { decode } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"

interface DecodedRefreshToken {
  id: string
  name: string
  email: string
  iat: number
  exp: number
}

function parseJwt(token: string): DecodedRefreshToken {
  const base64Url = token.split(".")[1]
  const b = Buffer.from(base64Url, "base64")
  return JSON.parse(b.toString())
}

const isJWTExpired = (token: string) => {
  const decodedToken = parseJwt(token)
  const expDate = new Date(decodedToken.exp * 1000)
  console.log(expDate)
  const isExpired = new Date() > expDate

  return isExpired
}

export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    async jwt({ token, user }) {
      try {
        if (!token.refreshToken && !token.accessToken) {
          if (user) {
            token = { ...token, ...user }
          }
          return token
        }

        const isAccesTokenExpired = isJWTExpired(token.accessToken as string)

        if (isAccesTokenExpired) {
          const isRefreshTokenExpired = isJWTExpired(
            token.refreshToken as string,
          )

          if (isRefreshTokenExpired) {
            throw new Error("RefreshToken expired")
          }

          const res = await authService.refreshToken({
            refreshToken: token.refreshToken as string,
          })

          console.log("access token updated!")
          return { ...token, accessToken: res.data.accessToken }
        }

        if (user) {
          token = { ...token, ...user }
        }
        return token
      } catch (err) {
        console.log(err)
        if (user) {
          token = { ...token, ...user }
        }

        return token
      }
    },
    async session({ session, token }) {
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

        const tokens = getTokens(res.headers["set-cookie"])

        return { ...res.data, ...tokens }
      },
    }),
  ],
}
