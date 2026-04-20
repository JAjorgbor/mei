'use client'
import { store, useAppSelector } from '@/features/store'
import handleScreenshot from '@/utils/handleScreenshot'
import { HeroUIProvider, Spinner } from '@heroui/react'
import { ToastProvider } from '@heroui/toast'
import Cookies from 'js-cookie'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Provider } from 'react-redux'

interface ProvidersProps {
  children: any
}

const Content = ({ children }: ProvidersProps) => {
  const { theme, fontSize } = useAppSelector((state) => state.header)
  const [isLoading, setIsLoading] = useState(false)

  const pathname = usePathname()
  useEffect(() => {
    const handleSystemColorTheme = () => {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches
      if (prefersDark) {
        document.documentElement.classList.remove('light')
        document.documentElement.classList.add('dark')
        Cookies.set('theme', 'dark', { expires: 90 })
      } else {
        document.documentElement.classList.remove('dark')
        document.documentElement.classList.add('light')
        Cookies.set('theme', 'light', { expires: 90 })
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
      ;(Cookies.set('theme', theme), { expires: 90 })
    }
  }, [theme])

  useEffect(() => {
    if (pathname.startsWith('/portal')) {
      document.documentElement.style.setProperty(
        '--app-font-size',
        fontSize == 'large' ? '1.3rem' : '1rem',
      )
      ;(Cookies.set('fontSize', fontSize), { expires: 90 })
    }
  }, [fontSize])

  return (
    <>
      {' '}
      <ToastProvider regionProps={{ classNames: { base: 'z-[999]' } }} />
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
  const pathname = usePathname()
  useEffect(() => {
    if (
      pathname.startsWith('/portal') &&
      process.env.NODE_ENV == 'production'
    ) {
      handleScreenshot()
    }
  }, [pathname])
  return (
    <Provider store={store}>
      <HeroUIProvider navigate={router.push}>
        {/* <Suspense> */}
        <Content>{children}</Content>
        {/* </Suspense> */}

        <div
          className='w-screen h-screen fixed top-0 left-0 bg-transparent backdrop-blur-xl z-[999] hidden'
          id='screenshot-blur-overlay'
        />
      </HeroUIProvider>
    </Provider>
  )
}

export default Providers
