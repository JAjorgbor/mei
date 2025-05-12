import { auth } from '@/auth'
import { getToken } from 'next-auth/jwt'

import { NextRequest, NextResponse } from 'next/server'

export default async (req: NextRequest) => {
  const token: any = await getToken({
    req,
    secret: process.env.AUTH_SECRET || 'bec56a29ab187ed64d8089197a577ac3',
  })
  console.log(token)
  // const isLoggedIn = !!req.auth?.user
  const { searchParams } = new URL(req.url)
  const callbackUrl = searchParams.get('callbackUrl') || '/admin/dashboard'
  const isLoggedIn = !!token
  const whiteListedAdminRoutes = ['/admin']

  const { pathname } = req.nextUrl
  if (pathname.startsWith('/admin')) {
    if (token?.user?.role == 'admin' && pathname == '/admin') {
      return NextResponse.redirect(new URL(callbackUrl, req.url))
    }
    if (whiteListedAdminRoutes.some((each) => each !== pathname) && !token) {
      return NextResponse.redirect(
        new URL(`/admin?callbackUrl=${pathname}`, req.url)
      )
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
