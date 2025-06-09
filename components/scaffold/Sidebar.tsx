'use client'
import { setOpenSidebar } from '@/features/sidebarSlice'
import { useAppDispatch, useAppSelector } from '@/features/store'
import useMediaQuery from '@/hooks/useMediaQuery'
import { Avatar, Button, Divider } from '@heroui/react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  BookOpenIcon,
  Building2,
  Edit2Icon,
  LayoutDashboardIcon,
  UsersIcon,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const Sidebar: React.FC = () => {
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const [hydrated, setHydrated] = useState(false)
  const isMobile = useMediaQuery(1027)

  useEffect(() => {
    setHydrated(true)
  }, [])
  const { openSidebar } = useAppSelector((state) => state.sidebar)

  const navItems = [
    {
      path: '/admin/dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboardIcon size={18} />,
    },
    {
      path: '/admin/chapters',
      label: 'Chapters',
      icon: <BookOpenIcon size={18} />,
      isNested: true,
    },
    { path: '/admin/users', label: 'Users', icon: <UsersIcon size={18} /> },
    {
      path: '/admin/team',
      label: 'Team',
      icon: <Building2 size={18} />,
      isNested: true,
    },
  ]
  useEffect(() => {
    dispatch(setOpenSidebar(false))
  }, [pathname])
  return (
    <aside className='relative' id='sidebar-wrapper'>
      {hydrated &&
        createPortal(
          <AnimatePresence>
            {!isMobile || openSidebar ? (
              <>
                {isMobile && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='bg-black/20 fixed inset-0 w-full h-screen z-30'
                    onClick={() => dispatch(setOpenSidebar(false))}
                  />
                )}
                <motion.div
                  initial={{ x: -250, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -250, opacity: 0 }}
                  transition={{ type: 'tween' }}
                  className={`-translate-x-full ${
                    isMobile ? 'fixed' : 'sticky'
                  } font-normal text-sm top-0 z-50 h-screen w-[250px] `}
                >
                  <div className='bg-content2 border-r border-divider h-screen flex flex-col'>
                    <div className='px-4 py-[1.11rem] flex items-center gap-2 '>
                      <BookOpenIcon className='text-primary text-2xl' />
                      <h1 className='text-xl font-bold'>Mie Admin</h1>
                    </div>
                    <Divider />
                    <div className='flex-1 p-2'>
                      <nav className='space-y-1'>
                        {navItems.map((item) => (
                          <Button
                            as={Link}
                            key={item.path}
                            href={item.path}
                            variant={
                              pathname === item.path ||
                              (item.isNested && pathname.startsWith(item.path))
                                ? 'flat'
                                : 'light'
                            }
                            color={
                              pathname === item.path ||
                              (item.isNested && pathname.startsWith(item.path))
                                ? 'primary'
                                : 'default'
                            }
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
                          <p className='text-xs text-default-500'>
                            admin@storyapp.com
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </>
            ) : null}
          </AnimatePresence>,
          document.getElementById('sidebar-wrapper') as HTMLElement
        )}
    </aside>
  )
}

export default Sidebar
