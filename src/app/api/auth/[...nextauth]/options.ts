import api from "@/lib/utils/api";
import getAccessTokenFromCookie from "@/lib/utils/getAccessTokenFromCookie";
import authService from "@/services/AuthService";
import type { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
      return { ...token, ...user }; // get all information from backend and nextauth
    },
    async session({ session, token, user }) {
      session.user = token as any; // there we get token from jwt function and pass it to our session
      return session;
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
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          // const res = await api.post(`/signIn`, {
          //   email: credentials?.email,
          //   password: credentials?.password,
          // });

          const res = await authService.signIn(credentials);

          if (!res) {
            return;
          }

          if (res.status != 200) {
            return null;
          }

          if (!res.headers["set-cookie"]) {
            return null;
          }

          const accessToken = getAccessTokenFromCookie(
            res.headers["set-cookie"],
          );

          if (!accessToken) {
            return null;
          }

          return { ...res.data, accessToken: accessToken };
        } catch (err: any) {
          console.log(err);
        }
      },
    }),
  ],
};
