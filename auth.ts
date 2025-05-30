import NextAuth from 'next-auth'
import CredentialsProvideer from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

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
      async authorize(credentials: any) {
        try {
          const { accessToken, refreshToken, userData } = credentials

          // Refresh session logic which would be triggered in request adapter, when refreshing session the already gottend userData is based back with new access and refresh tokens
          if (accessToken && refreshToken && userData) {
            return { ...JSON.parse(userData), accessToken, refreshToken }
          }

          // Catch-all fallback
          return null
        } catch (error: any) {
          console.log('see error', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        const { accessToken, refreshToken, ...rest } = user as any
        token.user = rest
        token.accessToken = accessToken
        token.refreshToken = refreshToken
      }
      if (trigger == 'update' && session.verifyAdminAccess) {
        token.verifyAdminAccess = session.verifyAdminAccess
      }
      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user = token.user
      session.user.verifyAdminAccess = token.verifyAdminAccess
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      return session
    },
  },
})
