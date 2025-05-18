'use client'
import { useSession, SessionProvider } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { store, useAppSelector } from '@/features/store'
import Cookies from 'js-cookie'
import { HeroUIProvider } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { useEffect, Suspense, useState } from 'react'
import { Provider } from 'react-redux'
import { Spinner } from '@heroui/react'
import { ToastProvider } from '@heroui/toast'

interface ProvidersProps {
  children: any
}

const Content = ({ children }: ProvidersProps) => {
  const { theme } = useAppSelector((state) => state.header)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  useEffect(() => {
    const handleSystemColorTheme = () => {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
      if (prefersDark) {
        document.documentElement.classList.remove('light')
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
        document.documentElement.classList.add('light')
      }
    }

    if (theme === 'system') {
      handleSystemColorTheme()
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', handleSystemColorTheme)
      return () => {
        mediaQuery.removeEventListener('change', handleSystemColorTheme)
      }
    } else {
      document.documentElement.className = theme
    }
  }, [theme])

  const pathname = usePathname()
  const { data: session, update: updateSession } = useSession()

  useEffect(() => {
    const adminVerifyAccessRoutes = [
      '/admin/verify-access',
      '/admin/verify-email',
    ]
    const adminAuthRoutes = [
      '/admin',
      '/admin/verify-access',
      '/admin/verify-email',
    ]
    if (session) {
      if (pathname.startsWith('/admin')) {
        if (
          (session?.user?.role !== 'admin' &&
            !adminAuthRoutes.includes(pathname)) ||
          (session?.user?.verifyAdminAccess !== 'verified' &&
            !adminAuthRoutes.includes(pathname))
        ) {
          console.log(
            (session?.user?.role !== 'admin' &&
              !adminAuthRoutes.includes(pathname)) ||
              (session?.user?.verifyAdminAccess !== 'verified' &&
                !adminAuthRoutes.includes(pathname))
          )
          Cookies.set('verifyAdminAccess', 'not-verified')
          return router.push(`/admin?callbackUrl=${pathname}`)
        } else if (
          session?.user?.role == 'admin' &&
          adminAuthRoutes.includes(pathname) &&
          session?.user?.verifyAdminAccess == 'verified'
        ) {
          Cookies.set('verifyAdminAccess', 'verified')
          return router.push(`/admin/dashboard`)
        }
      }
    }
    setIsLoading(false)
  }, [pathname, session])

  return (
    <>
      {' '}
      <ToastProvider />
      {isLoading ? (
        <div className='grid place-items-center h-screen w-screen'>
          <Spinner />
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  )
}

const Providers = ({ children }: ProvidersProps) => {
  const router = useRouter()
  return (
    <SessionProvider>
      <Provider store={store}>
        <HeroUIProvider navigate={router.push}>
          {/* <Suspense> */}
          <Content>{children}</Content>
          {/* </Suspense> */}
        </HeroUIProvider>
      </Provider>
    </SessionProvider>
  )
}

export default Providers
