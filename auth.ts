import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

const isDev = process.env.NODE_ENV !== 'production'
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  headers: {
    common: {
      'Content-Type': 'application/json',
    },
  },
})

export const { handlers, signIn, signOut, auth } = NextAuth((req) => ({
  providers: [
    Google,
    CredentialsProvider({
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

          return null
        } catch (error: any) {
          console.log('see error', error)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  cookies: {
    sessionToken: {
      name: `authjs.session-token`,
      options: {
        httpOnly: false,
        sameSite: 'lax',
        path: '/',
        secure: !isDev, // ✅ Important for localhost
      },
    },
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          const url = new URL(req?.url as string)
          const isNew = url.searchParams.get('isNew')
          // sign up logic
          if (isNew == 'true') {
            const { data } = await axios.post(`/user/sign-up`, {
              provider: 'google',
              email: profile?.email,
              googleAccesToken: account.access_token,
            })
            console.log(data)
            return data
          }
          const { data } = await axiosInstance.post(`/user/sign-in`, {
            provider: 'google',
            email: profile?.email,
            googleAccesToken: account.access_token,
          })
          console.log(data)
          return data
        } catch (e) {
          console.error('Custom API sync failed:', e)
          return false
        }
      }
      return true
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        const { accessToken, refreshToken, verifyAdminAccess, ...rest } =
          user as any
        token.user = rest
        token.accessToken = accessToken
        token.refreshToken = refreshToken
        token.verifyAdminAccess = verifyAdminAccess
      }
      if (trigger === 'update' && session.verifyAdminAccess) {
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
}))
