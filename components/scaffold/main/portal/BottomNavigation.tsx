'use client'
import { Book, Home, PencilLine, UserCircle } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const BottomNavigation = () => {
  const pathname = usePathname()
  if (pathname.includes('/read')) return null
  return (
    <div className='sticky bottom-3 w-full z-[300] mt-8'>
      <div className=' max-w-lg px-5 mx-auto'>
        <div className='w-full rounded-2xl px-5 py-2 bg-background border border-foreground-200 dark:border-foreground-900 flex gap-3 items-center justify-between shadow-lg backdrop-blur-md bg-opacity-90'>
          <Link
            className={`flex flex-col items-center gap-1 flex-1 transition-colors ${
              pathname == '/portal/dashboard'
                ? 'text-secondary font-bold'
                : 'text-foreground-400'
            }`}
            href='/portal/dashboard'
          >
            <Home size={17} /> <span className='text-[10px]'>Home</span>
          </Link>
          <Link
            className={`flex flex-col items-center gap-1 flex-1 transition-colors ${
              pathname == '/portal/chapters'
                ? 'text-secondary font-bold'
                : 'text-foreground-400'
            }`}
            href='/portal/chapters'
          >
            <Book size={17} /> <span className='text-[10px]'>Chapters</span>
          </Link>
          <Link
            className={`flex flex-col items-center gap-1 flex-1 transition-colors ${
              pathname.includes('/author')
                ? 'text-secondary font-bold'
                : 'text-foreground-400'
            }`}
            href='/portal/authors-room'
          >
            <PencilLine size={17} /> <span className='text-[10px]'>Author</span>
          </Link>
          <Link
            className={`flex flex-col items-center gap-1 flex-1 transition-colors ${
              pathname == '/portal/profile'
                ? 'text-secondary font-bold'
                : 'text-foreground-400'
            }`}
            href='/portal/profile'
          >
            <UserCircle size={17} />{' '}
            <span className='text-[10px]'>Profile</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BottomNavigation
