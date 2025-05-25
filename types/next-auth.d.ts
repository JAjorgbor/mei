// types/next-auth.d.ts
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      role?: string
      id?: string
      verifyAdminAccess?: 'not-verified' | 'verified'
    } & DefaultSession['user']
    accessToken?: string
    refreshToken?: string
  }

  interface User {
    role?: string
    id?: string
  }
}
