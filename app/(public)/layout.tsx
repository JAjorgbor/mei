import '@/app/globals.css'
import Providers from '@/app/Providers'
import Header from '@/components/scaffold/main/Header'
import type { Metadata } from 'next'
import {
  Lato,
  Roboto,
  Dancing_Script,
  Playfair_Display,
} from 'next/font/google'
import { cookies } from 'next/headers'

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dancing-script',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-lato',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-playfair-display',
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: { default: 'Echoes', template: '%s | Echoes' },
  description: 'Resonating stories and deep ideas from the soul.',
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
        className={`${dancingScript.variable} ${lato.variable} ${playfair.variable} ${roboto.className} antialiased`}
      >
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
