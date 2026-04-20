import {
  ADMIN_ACCESS_KEY,
  ADMIN_REFRESH_KEY,
} from '@/api-utils/admin/request-adapter'
import {
  PORTAL_ACCESS_KEY,
  PORTAL_REFRESH_KEY,
} from '@/api-utils/portal/request-adapter'
import { NextRequest, NextResponse } from 'next/server'

export default async (req: NextRequest) => {
  const adminToken =
    req.cookies.get(ADMIN_ACCESS_KEY)?.value ||
    req.cookies.get(ADMIN_REFRESH_KEY)?.value
  const portalToken =
    req.cookies.get(PORTAL_ACCESS_KEY)?.value ||
    req.cookies.get(PORTAL_REFRESH_KEY)?.value
  const verifyAdminAccess =
    req.cookies.get('verifyAdminAccess')?.value || 'not-verified'

  const { pathname } = req.nextUrl

  // Admin Guarding
  if (pathname.startsWith('/admin')) {
    const isAdminLoggedIn = !!adminToken
    const verifyAdminAccessRoutes = [
      '/admin/verify-access',
      '/admin/verify-email',
    ]

    if (!isAdminLoggedIn && verifyAdminAccessRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL(`/admin`, req.url))
    }

    if (
      (isAdminLoggedIn &&
        verifyAdminAccess !== 'verified' &&
        pathname !== '/admin' &&
        pathname !== '/admin/accept-invite' &&
        !verifyAdminAccessRoutes.includes(pathname)) ||
      (!isAdminLoggedIn &&
        pathname !== '/admin' &&
        pathname !== '/admin/accept-invite' &&
        !verifyAdminAccessRoutes.includes(pathname))
    ) {
      return NextResponse.redirect(
        new URL(`/admin?callbackPath=${pathname}`, req.url),
      )
    }
  }

  // Portal Guarding
  if (pathname.startsWith('/portal')) {
    const isPortalLoggedIn = !!portalToken
    const portalAuthRoutes = [
      '/portal',
      '/portal/forgot-password',
      '/portal/reset-password',
      '/portal/auth/success',
      '/portal/auth/error',
      '/portal/sign-up',
    ]

    if (isPortalLoggedIn && portalAuthRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL('/portal/dashboard', req.url))
    }

    if (!isPortalLoggedIn && !portalAuthRoutes.includes(pathname)) {
      return NextResponse.redirect(
        new URL(`/portal?callbackPath=${pathname}`, req.url),
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin((?!/api|/_next|/favicon.ico).*)',
    '/portal((?!/api|/_next|/favicon.ico).*)',
  ],
}
