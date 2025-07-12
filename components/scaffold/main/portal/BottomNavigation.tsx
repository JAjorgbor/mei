import { Book, Home, UserCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const BottomNavigation = () => {
  return (
    <div className='fixed bottom-5 w-full z-[300]'>
      <div className=' max-w-lg px-5 mx-auto'>
        <div className='w-full rounded-lg px-5 py-3 bg-default-100/30 text-white backdrop-blur  flex gap-3 items-center justify-between'>
          <Link
            className='flex flex-col items-center gap-2  flex-1 text-xs'
            href='/portal/dashboard'
          >
            <Home size={20} /> Home
          </Link>
          <Link
            className='flex flex-col items-center gap-2 flex-1 text-xs'
            href='/portal/dashboard'
          >
            <Book size={20} /> Read
          </Link>
          <Link
            className='flex flex-col items-center gap-2 flex-1 text-xs'
            href='/portal/dashboard'
          >
            <UserCircle size={20} /> Profile
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BottomNavigation
