import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Get current user for session
      const sessionUser = await User.findOne({ email: session.user.email });

      session.user.id = sessionUser._id.toString();

      return session;
    },

    async signIn({ profile }) {
      try {
        await connectToDB();

        // Check if user already exists
        const userExists = await User.findOne({ email: profile.email });

        // Create user if not
        if (!userExists) await User.create({ email: profile.email });

        return true;
      } catch (error) {
        console.error(error);

        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
