import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import Providers from '@/app/Providers'
import '@/public/globals.css'

import { Inter, Roboto } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: { default: 'Admin | Mie', template: '%s | Admin | Mie' },
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
      <body className={`${inter.className} ${roboto.className}  antialiased`}>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
