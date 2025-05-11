'use client'
import { SessionProvider } from 'next-auth/react'
import { store, useAppSelector } from '@/features/store'
import { HeroUIProvider } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { ToastProvider } from '@heroui/toast'

interface ProvidersProps {
  children: any
}

const Content = ({ children }: ProvidersProps) => {
  const { theme } = useAppSelector((state) => state.header)
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

  return (
    <HeroUIProvider navigate={router.push}>
      {' '}
      <ToastProvider />
      {children}
    </HeroUIProvider>
  )
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <SessionProvider>
      <Provider store={store}>
        <Content>{children}</Content>
      </Provider>
    </SessionProvider>
  )
}

export default Providers
