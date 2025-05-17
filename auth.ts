import NextAuth from 'next-auth'
import CredentialsProvideer from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

export const runtime = 'edge'

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
          const user = await new Promise((resolve) => {
            setTimeout(() => {
              if (credentials.email.includes('example.com')) {
                resolve({
                  id: 1,
                  name: 'Joshua Ajorgbor',
                  email: 'joshua@example.com',
                  role: 'admin',
                })
              } else resolve(false)
            }, 500)
          })

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
