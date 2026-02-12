import { cookies } from 'next/headers'
import BottomNavigation from '@/components/scaffold/main/portal/BottomNavigation'
import { CSSProperties, ReactNode } from 'react'

import Providers from '@/app/Providers'
import type { Metadata } from 'next'
import '@/app/globals.css'

import Header from '@/components/scaffold/main/portal/Header'
import { Dancing_Script, Inter, Lato, Roboto } from 'next/font/google'

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dancing-script',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: { default: 'Mie', template: '%s | Mie' },
  description: 'Mie story app admin',
}

const Layout = ({ children }: { children: ReactNode }) => {
  const cookieJar = cookies()
  const storedTheme = cookieJar.get('theme')?.value
  const storedFontSize = cookieJar.get('fontSize')?.value
  return (
    <html
      lang='en'
      className={`${storedTheme || ''}`}
      style={
        {
          '--app-font-size': storedFontSize == 'large' ? '1.3rem' : '1rem',
        } as CSSProperties
      }
    >
      <body
        className={`${dancingScript.variable} ${inter.className} ${roboto.className} antialiased`}
      >
        <Providers>
          <Header />
          <main className='min-h-[80vh]'>{children}</main>
          <BottomNavigation />
        </Providers>
      </body>
    </html>
  )
}

export default Layout
