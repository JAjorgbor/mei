import { NextRequest, NextResponse } from 'next/server'

export default async (req: NextRequest) => {
  const token =
    req.cookies.get('__Secure-authjs.session-token')?.value ||
    req.cookies.get('authjs.session-token')?.value
  const verifyAdminAccess = req.cookies.get('verifyAdminAccess')?.value
  const { searchParams } = new URL(req.url)
  const isLoggedIn = !!token
  const callbackUrl = searchParams.get('callbackUrl') || '/admin/dashboard'
  const verifyAdminAccessRoutes = [
    '/admin/verify-access',
    '/admin/verify-email',
  ]

  const { pathname } = req.nextUrl
  if (pathname.startsWith('/admin')) {
    // if user tries to access admin verify access routes without being logged in
    if (!isLoggedIn && verifyAdminAccessRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL(`/admin`, req.url))
    }
    // if user tries to access non auth routes without being verified or being logged in, redirect to log in page
    if (
      (verifyAdminAccess !== 'verified' &&
        pathname !== '/admin' &&
        !verifyAdminAccessRoutes.includes(pathname)) ||
      (!isLoggedIn &&
        pathname !== '/admin' &&
        !verifyAdminAccessRoutes.includes(pathname))
    ) {
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
