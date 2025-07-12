import type { Metadata } from 'next'
import { Inter, Roboto } from 'next/font/google'
import { cookies } from 'next/headers'
import '@/app/globals.css'
import Providers from '@/app/Providers'
import Header from '@/components/scaffold/main/Header'

import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'], // or ['latin-ext'] depending on your needs
  weight: ['400', '700'], // Available weights: '400', '500', '600', '700', '800', '900'
  style: ['normal', 'italic'], // Optional: 'normal' or 'italic'
  display: 'swap', // Optional for font loading strategy
  variable: '--font-playfair',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieJar = cookies()
  const storedTheme = cookieJar.get('theme')?.value
  return (
    <html lang='en' className={`${storedTheme || ''}`}>
      <body
        className={`${playfair.variable} ${inter.className} ${roboto.className}  antialiased`}
      >
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
