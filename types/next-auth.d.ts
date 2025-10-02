// types/next-auth.d.ts
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      userType?: string
      id?: string
      error?: string
      verifyAdminAccess?: 'not-verified' | 'verified'
    } & DefaultSession['user']
    accessToken?: string
    refreshToken?: string
  }

  interface User {
    userType?: string
    id?: string
  }
}
