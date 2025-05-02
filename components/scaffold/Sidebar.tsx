import { Avatar, Button } from '@heroui/react'
import {
  BookOpenIcon,
  Edit2Icon,
  LayoutDashboardIcon,
  UsersIcon,
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar: React.FC = () => {
  const pathname = usePathname()

  const navItems = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboardIcon /> },
    { path: '/chapters', label: 'Chapters', icon: <BookOpenIcon /> },
    { path: '/users', label: 'Users', icon: <UsersIcon /> },
    { path: '/editor', label: 'Editor', icon: <Edit2Icon /> },
  ]

  return (
    <div className='w-64 bg-content2 border-r border-divider h-full flex flex-col'>
      <div className='p-4 flex items-center gap-2'>
        <BookOpenIcon className='text-primary text-2xl' />
        <h1 className='text-xl font-bold'>StoryAdmin</h1>
      </div>
      <div className='flex-1 p-2'>
        <nav className='space-y-1'>
          {navItems.map((item) => (
            <Button
              key={item.path}
              href={item.path}
              variant={pathname === item.path ? 'flat' : 'light'}
              color={pathname === item.path ? 'primary' : 'default'}
              className='w-full justify-start mb-1'
              startContent={item.icon}
            >
              {item.label}
            </Button>
          ))}
        </nav>
      </div>
      <div className='p-4 border-t border-divider'>
        <div className='flex items-center gap-2'>
          <Avatar
            src='https://img.heroui.chat/image/avatar?w=40&h=40&u=admin123'
            size='sm'
          />
          <div>
            <p className='text-sm font-medium'>Admin User</p>
            <p className='text-xs text-default-500'>admin@storyapp.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
