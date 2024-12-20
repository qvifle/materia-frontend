import ISessionToken from "@/utils/types/ISessionToken"
import NextAuth from "next-auth/next"

declare module "next-auth" {
  interface Session {
    user: {
      name: string
      email: string
      password: string
      accessToken: string
    }
  }
}
