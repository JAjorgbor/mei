'use client'
import { Fade as Hamburger } from 'hamburger-react'
import { signOut } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

import { setTheme } from '@/features/headerSlice'
import { setOpenSidebar } from '@/features/sidebarSlice'
import { useAppDispatch, useAppSelector } from '@/features/store'
import useMediaQuery from '@/hooks/useMediaQuery'
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarContent,
  NavbarItem,
} from '@heroui/react'
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import useGetAdmin from '@/hooks/requests/useGetAdmin'

const Header: React.FC = () => {
  const dispatch = useAppDispatch()
  const { openSidebar } = useAppSelector((state) => state.sidebar)

  const isMobile = useMediaQuery(1027)
  const { theme: reduxTheme } = useAppSelector((state) => state.header)

  // const { admin } = useGetAdmin()
  // console.log(admin)

  const [themeState, setThemeState] = useState('')

  useEffect(() => {
    setThemeState(reduxTheme)
  }, [reduxTheme])

  return (
    <Navbar className='border-b border-b-foreground-300 z-20' maxWidth='xl'>
      {isMobile && (
        <Hamburger
          aria-label={openSidebar ? 'Close sidebar' : 'Open sidebar'}
          size={20}
          toggled={openSidebar}
          onToggle={(value) => dispatch(setOpenSidebar(value))}
        />
      )}
      <NavbarContent justify='end'>
        <NavbarItem>
          <Dropdown className='min-w-max text-foreground'>
            <DropdownTrigger>
              {themeState && (
                <button
                  aria-label='switch theme'
                  className='switcher group relative h-9 w-9 rounded-full before:absolute before:inset-0 before:rounded-full before:border before:border-gray-200 before:bg-gray-50 before:bg-gradient-to-b before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 lg:flex'
                >
                  {themeState == 'light' ? (
                    <SunIcon className='transistion relative m-auto h-5 w-5  duration-300 group-hover:rotate-180 group-hover:fill-yellow-400 fill-gray-300' />
                  ) : themeState == 'dark' ? (
                    <MoonIcon className='transistion relative m-auto h-5 w-5 fill-gray-500 duration-300 group-hover:-rotate-90 group-hover:fill-blue-900 ' />
                  ) : (
                    <MonitorIcon className='transistion relative m-auto h-5 w-5 fill-gray-500 duration-300 group-hover:fill-secondary  ' />
                  )}
                </button>
              )}
            </DropdownTrigger>
            <DropdownMenu selectedKeys={'dark'}>
              <DropdownItem
                key='light'
                startContent={<SunIcon size={16} />}
                onPress={() => dispatch(setTheme('light'))}
                className={`${themeState == 'light' ? 'text-secondary' : ''}`}
              >
                Light
              </DropdownItem>
              <DropdownItem
                key='dark'
                startContent={<MoonIcon size={16} />}
                onPress={() => dispatch(setTheme('dark'))}
                className={`${themeState == 'dark' ? 'text-secondary' : ''}`}
              >
                Dark
              </DropdownItem>
              <DropdownItem
                key='system'
                startContent={<MonitorIcon size={16} />}
                onPress={() => dispatch(setTheme('system'))}
                className={`${themeState == 'system' ? 'text-secondary' : ''}`}
              >
                System
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        <Dropdown>
          <DropdownTrigger>
            <Avatar
              isBordered
              as='button'
              className='transition-transform'
              color='primary'
              name='Admin User'
              size='sm'
              src='https://img.heroui.chat/image/avatar?w=150&h=150&u=admin123'
            />
          </DropdownTrigger>

          <DropdownMenu aria-label='Profile Actions' variant='flat'>
            <DropdownItem key='profile' className='h-14 gap-2'>
              <p className='text-sm'>Signed in as</p>
              <p className='font-semibold'>admin@storyapp.com</p>
            </DropdownItem>
            <DropdownItem key='settings'>My Settings</DropdownItem>
            <DropdownItem key='help_and_feedback'>Help & Feedback</DropdownItem>
            <DropdownItem key='logout' color='danger' onPress={() => signOut()}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  )
}

export default Header
