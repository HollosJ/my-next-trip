import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

console.log({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  async session({ session }) {
    try {
      // Serverless
    } catch (error) {}
  },
  async signIn({ profile }) {},
});

export { handler as GET, handler as POST };
