import api from "@/lib/utils/api";
import getAccessTokenFromCookie from "@/lib/utils/getAccessTokenFromCookie";
import type { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
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

          const {
            data: user,
            status,
            headers,
          } = await api.post(`/signIn`, {
            email: credentials?.email,
            password: credentials?.password,
          });


          if (status != 200) {
            return null;
          }

          if (!headers["set-cookie"]) {
            return null;
          }

          const accessToken = getAccessTokenFromCookie(headers["set-cookie"]);

          if (!accessToken) {
            
          }


          return { ...user, accessToken: accessToken };
        } catch (err) {
          console.log(err);
        }
      },
    }),
  ],
};
