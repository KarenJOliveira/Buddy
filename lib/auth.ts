import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
    ],
    callbacks: {
        async jwt({ token, user, account }) {
        if (user) {
            token.user = user;
        }
        if (account) {
            token.provider = account.provider;
        }
        return token;
    },
    },
};