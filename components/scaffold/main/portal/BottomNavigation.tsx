'use client'
import { Book, Home, UserCircle } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const BottomNavigation = () => {
  const pathname = usePathname()
  return (
    <div className='sticky bottom-3 w-full z-[300] mt-8'>
      <div className=' max-w-lg px-5 mx-auto'>
        <div className='w-full rounded-lg px-5 py-2 bg-gray-500/50 text-white backdrop-blur  flex gap-3 items-center justify-between'>
          <Link
            className={`flex flex-col items-center gap-1 flex-1 ${
              pathname == '/portal/dashboard' ? 'text-secondary' : ''
            }`}
            href='/portal/dashboard'
          >
            <Home size={15} /> <span className='text-xs'>Home</span>
          </Link>
          <Link
            className={`flex flex-col items-center gap-1 flex-1 ${
              pathname == '/portal/chapters' ? 'text-secondary' : ''
            }`}
            href='/portal/chapters'
          >
            <Book size={15} /> <span className='text-xs'>Read</span>
          </Link>
          <Link
            className={`flex flex-col items-center gap-1 flex-1 ${
              pathname == '/portal/profile' ? 'text-secondary' : ''
            }`}
            href='/portal/profile'
          >
            <UserCircle size={15} /> <span className='text-xs'>Profile</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BottomNavigation
