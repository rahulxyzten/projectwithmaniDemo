import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import User from "@/models/user";
import Admin from "@/models/admin";
import { connectToDB } from "@/utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
        const isAdmin = await Admin.findOne({
          email: session.user.email,
        });
        session.user.isAdmin = !!isAdmin;
      }
      return session;
    },

    async signIn({ profile }) {
      try {
        await connectToDB();

        // check if a user already exists
        const userExists = await User.findOne({
          email: profile.email,
        });

        // if not, create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: "/login", // Custom sign in page
  },
});

export { handler as GET, handler as POST };
