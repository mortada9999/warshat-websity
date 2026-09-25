import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Test Login",
      credentials: {},
      async authorize() {
        // Mock user for testing purposes
        return { id: "1", name: "Test Admin", email: "admin@test.com" };
      }
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      return session;
    },
    async jwt({ token, user }) {
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_dev_only",
});

export { handler as GET, handler as POST };
