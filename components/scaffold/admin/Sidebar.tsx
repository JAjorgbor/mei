'use client'
import { setOpenSidebar } from '@/features/sidebarSlice'
import { useAppDispatch, useAppSelector } from '@/features/store'
import useMediaQuery from '@/hooks/useMediaQuery'
import { Avatar, Button, Divider } from '@heroui/react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  BookOpenIcon,
  Building2,
  CreditCard,
  Edit2Icon,
  LayoutDashboardIcon,
  UsersIcon,
  PencilLine,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Logo from '@/components/elements/Logo'

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
      label: 'Dashboard Overview',
      shortLabel: 'Dashboard',
      icon: <LayoutDashboardIcon size={20} />,
    },
    {
      path: '/admin/chapters',
      label: 'Content Management',
      shortLabel: 'Chapters',
      icon: <BookOpenIcon size={20} />,
      isNested: true,
    },
    {
      path: '/admin/users',
      label: 'User Community',
      shortLabel: 'Users',
      icon: <UsersIcon size={20} />,
    },
    {
      path: '/admin/payment-bundles',
      label: 'Financial Assets',
      shortLabel: 'Payment Bundles',
      icon: <CreditCard size={20} />,
      isNested: true,
    },
    {
      path: '/admin/team',
      label: 'Internal Team',
      shortLabel: 'Team',
      icon: <Building2 size={20} />,
      isNested: true,
    },
    {
      path: '/admin/authors-room',
      label: 'Author Interactions',
      shortLabel: 'Authors Room',
      icon: <PencilLine size={20} />,
    },
  ]

  useEffect(() => {
    dispatch(setOpenSidebar(false))
  }, [pathname])

  const isActive = (item: any) => {
    return (
      pathname === item.path ||
      (item.isNested && pathname.startsWith(item.path))
    )
  }

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
                    className='bg-black/40 backdrop-blur-md fixed inset-0 w-full h-screen z-[100]'
                    onClick={() => dispatch(setOpenSidebar(false))}
                  />
                )}
                <motion.div
                  initial={{ x: -280, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -280, opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className={`${
                    isMobile ? 'fixed' : 'sticky'
                  } top-0 z-[101] h-screen w-[280px] p-4`}
                >
                  <div className='bg-background/60 dark:bg-zinc-900/60 backdrop-blur-2xl border border-default-100 shadow-2xl h-full flex flex-col rounded-[2.5rem] overflow-hidden'>
                    <div className='px-6 py-8 flex flex-col gap-4'>
                      <div className='flex justify-center gap-3 px-2'>
                        <div className='flex flex-col gap-2'>
                          <div className='p-2 bg-primary/10 rounded-2xl'>
                            <Logo width={80} height={32} />
                          </div>
                          <span className='text-[10px] uppercase font-black text-primary tracking-widest'>
                            Control Center
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className='flex-1 px-4 py-2 space-y-6 overflow-y-auto no-scrollbar'>
                      <div className='space-y-1.5'>
                        <p className='px-4 mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-default-400'>
                          Main Navigation
                        </p>
                        {navItems.map((item) => {
                          const active = isActive(item)
                          return (
                            <Button
                              as={Link}
                              key={item.path}
                              href={item.path}
                              variant='light'
                              className={`w-full justify-start h-12 px-4 rounded-2xl relative group transition-all duration-300 ${
                                active
                                  ? 'bg-primary/10 text-primary shadow-[0_0_20px_rgba(var(--heroui-primary-rgb),0.1)]'
                                  : 'hover:bg-default-100/50 text-default-600'
                              }`}
                              startContent={
                                <div
                                  className={`transition-transform duration-300 group-hover:scale-110 ${active ? 'text-primary' : 'text-default-400'}`}
                                >
                                  {item.icon}
                                </div>
                              }
                            >
                              <div className='flex flex-col items-start'>
                                <span
                                  className={`text-sm font-bold tracking-tight ${active ? 'text-primary' : 'text-foreground'}`}
                                >
                                  {item.shortLabel}
                                </span>
                                {/* <span className='text-[10px] text-default-400 font-medium'>
                                                {item.label}
                                            </span> */}
                              </div>
                              {active && (
                                <motion.div
                                  layoutId='active-pill'
                                  className='absolute right-2 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--heroui-primary-rgb),0.8)]'
                                />
                              )}
                            </Button>
                          )
                        })}
                      </div>
                    </div>

                    <div className='p-6 mt-auto'>
                      <div className='p-4 bg-default-50/50 rounded-3xl border border-default-100 flex flex-col gap-3'>
                        <div className='flex items-center gap-3'>
                          <Avatar
                            size='sm'
                            isBordered
                            color='primary'
                            className='bg-primary/10'
                          />
                          <div className='flex flex-col'>
                            <span className='text-xs font-bold'>
                              System Active
                            </span>
                            <span className='text-[10px] text-success font-black flex items-center gap-1.5'>
                              <span className='size-1.5 rounded-full bg-success animate-pulse' />
                              All systems nominal
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </>
            ) : null}
          </AnimatePresence>,
          document.getElementById('sidebar-wrapper') as HTMLElement,
        )}
    </aside>
  )
}

export default Sidebar
