import '@/app/globals.css'
import Providers from '@/app/Providers'
import Header from '@/components/scaffold/main/Header'
import type { Metadata } from 'next'
import { Lato, Roboto, Dancing_Script } from 'next/font/google'
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
        className={`${dancingScript.variable} ${lato.variable} ${roboto.className} antialiased`}
      >
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
