import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvideer from 'next-auth/providers/credentials'
import { loginAdmin } from '@/api/requests/admin/auth.requests'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider,
    CredentialsProvideer({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        role: {},
      },
      async authorize(credentials) {
        try {
          const user = await loginAdmin(credentials)

          if (user) {
            return user
          }
          throw new Error('Invalid credentials')
        } catch (error) {
          console.log(error)
          throw new Error((error as Error).message || 'Login failed')
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user
      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user = token.user
      return session
    },
  },
})
