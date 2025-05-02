import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GoogleProvider],
  callbacks: {
    async jwt({ token, account }) {
      // Store the access token in the JWT on initial sign in
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      // Make the access token available in the session

      session.accessToken = token.accessToken;
      return session;
    },
  },
});
