import { NextRequest, NextResponse } from 'next/server'

export default async (req: NextRequest) => {
  const token =
    req.cookies.get('__Secure-authjs.session-token')?.value ||
    req.cookies.get('authjs.session-token')?.value
  const { searchParams } = new URL(req.url)
  const callbackUrl = searchParams.get('callbackUrl') || '/admin/dashboard'
  const whiteListedAdminRoutes = ['/admin']

  const { pathname } = req.nextUrl
  if (pathname.startsWith('/admin')) {
    if (token && pathname == '/admin') {
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
