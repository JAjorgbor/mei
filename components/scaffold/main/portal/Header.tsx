'use client'
import { setTheme } from '@/features/headerSlice'
import { useAppDispatch, useAppSelector } from '@/features/store'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@heroui/react'
import {
  BookOpen,
  CircleChevronLeft,
  MonitorIcon,
  MoonIcon,
  Plus,
  Star,
  SunIcon,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const Header = () => {
  const [themeState, setThemeState] = useState('')
  const { theme: reduxTheme, navigation } = useAppSelector(
    (state) => state.header
  )
  const [navigationState, setNavigationState] = useState<
    { title: string; backLink: string } | undefined
  >()

  const pathname = usePathname()

  useEffect(() => {
    setNavigationState(undefined)
  }, [pathname])

  useEffect(() => {
    setThemeState(reduxTheme)
    setNavigationState(navigation)
  }, [reduxTheme, navigation])

  const dispatch = useAppDispatch()
  return (
    <Navbar className='z-20' classNames={{ wrapper: 'max-w-6xl' }}>
      <NavbarContent>
        <NavbarBrand className='gap-3'>
          {navigationState ? (
            <Link href={navigationState?.backLink || '#'}>
              <CircleChevronLeft size={25} />
            </Link>
          ) : (
            <>
              <BookOpen />
              <p className='font-bold text-inherit'>Mie</p>
            </>
          )}
          {navigationState && (
            <NavbarItem className='md:hidden'>
              {navigationState?.title}
            </NavbarItem>
          )}
        </NavbarBrand>
      </NavbarContent>
      {navigationState && (
        <NavbarContent justify='center' className='hidden md:flex'>
          <NavbarItem>{navigationState?.title}</NavbarItem>
        </NavbarContent>
      )}
      <NavbarContent justify='end'>
        <NavbarItem className='flex items-center'>
          <Dropdown className='min-w-max text-foreground'>
            <DropdownTrigger>
              {themeState && (
                <button
                  aria-label='switch theme'
                  className='switcher group relative p-1.5 rounded-full before:absolute before:inset-0 before:rounded-full before:border before:border-gray-200 before:bg-gray-50 before:bg-gradient-to-b before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 lg:flex'
                >
                  {themeState == 'light' ? (
                    <SunIcon className='transistion relative m-auto size-[1rem]  duration-300 group-hover:rotate-180 group-hover:fill-yellow-400 fill-gray-300' />
                  ) : themeState == 'dark' ? (
                    <MoonIcon className='transistion relative m-auto size-[1rem] fill-gray-500 duration-300 group-hover:-rotate-90 group-hover:fill-blue-900 ' />
                  ) : (
                    <MonitorIcon className='transistion relative m-auto size-[1rem] fill-gray-500 duration-300 group-hover:fill-secondary  ' />
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
        <NavbarItem>
          <button className='bg-default-300 inline-flex rounded-3xl p-1.5 px-2 gap-2 items-center text-sm'>
            <Star className='text-yellow-500 size-4 fill-yellow-500' /> 100{' '}
            <Plus className='text-secondary size-4' />
          </button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default Header
