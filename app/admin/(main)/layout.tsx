import type { Metadata } from 'next'

import Providers from '@/app/Providers'
import Header from '@/components/scaffold/Header'
import Sidebar from '@/components/scaffold/Sidebar'
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
  title: { template: '%s | Admin | Mei', default: 'Dashboard' },
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
          <div className='flex w-full min-h-screen relative' id='page-wrapper'>
            <Sidebar />
            <div className='flex-grow'>
              <Header />
              <main>{children}</main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
