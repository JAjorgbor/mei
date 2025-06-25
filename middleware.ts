import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

export default async (req: NextRequest) => {
  const session = await auth()
  const verifyAdminAccess = session?.user?.verifyAdminAccess || 'not-verified'
  const { searchParams } = new URL(req.url)
  const isLoggedIn = session?.user?.role == 'admin'
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
        pathname !== '/admin/accept-invite' &&
        !verifyAdminAccessRoutes.includes(pathname)) ||
      (!isLoggedIn &&
        pathname !== '/admin' &&
        pathname !== '/admin/accept-invite' &&
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
  matcher: ['/admin((?!/api|/_next|/favicon.ico).*)'],
}
