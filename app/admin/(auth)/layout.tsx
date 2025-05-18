import type { Metadata } from 'next'

import Providers from '@/app/Providers'
import '../../globals.css'

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
  title: { default: 'Admin | Mei', template: '%s | Admin | Mei' },
  description: 'Mei story app admin',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} ${roboto.className}  antialiased`}>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
