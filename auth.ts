import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'
import { config } from 'process'

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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        userType: {},
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
        httpOnly: true,
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
          const cookieJar = req?.cookies

          let isSignup = cookieJar?.get('isSignup')?.value == 'true'
          if (isSignup) {
            console.log('isSignup', cookieJar?.get('isSignup'))
            const { data } = await axiosInstance.post(`/user/sign-up`, {
              provider: 'google',
              email: profile?.email,
              googleAccessToken: account.access_token,
            })
            const { accessToken, refreshToken, ...cleanedUser } = data
            user = {
              ...user,
              ...cleanedUser,
              accessToken,
              refreshToken,
              userType: 'user',
            }
            console.log('sign up response', user)
            return true
          } else {
            console.log('method', 'sign in')
            const { data } = await axiosInstance.post(`/user/sign-in`, {
              provider: 'google',
              email: profile?.email,
              googleAccessToken: account.access_token,
            })
            console.log(data)
            const { accessToken, refreshToken, ...cleanedUser } = data

            Object.assign(user, cleanedUser, {
              accessToken,
              refreshToken,
              userType: 'user',
            })
            return true
          }
        } catch (e: any) {
          console.error('Google provider sync failed:', e.config.data)
          const errorMessage = encodeURIComponent(
            e?.response?.data?.detail ||
              'Something went wrong. Please try again later.'
          )
          const params = new URLSearchParams(req?.nextUrl?.searchParams)
          params.set('error', errorMessage)

          return `/portal?${params.toString()}`
        }
      }
      return true
    },

    async jwt({ token, user, trigger, account, session }) {
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
