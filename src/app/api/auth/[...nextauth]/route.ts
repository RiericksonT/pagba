import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

const { NEXT_PUBLIC_API_URL } = process.env;

const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await fetch(`http://localhost:4000/v1/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });
          const data = await response.json();
          if (response.ok && data) {
            return data;
          }
          return null;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          name: token.name,
          email: token.email,
        },
      };
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
