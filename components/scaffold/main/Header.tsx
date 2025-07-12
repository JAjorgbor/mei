'use client'
import Cookies from 'js-cookie'
import { setTheme } from '@/features/headerSlice'
import { useAppDispatch, useAppSelector } from '@/features/store'
import useGetAdmin from '@/hooks/requests/useGetAdmin'
import useMediaQuery from '@/hooks/useMediaQuery'
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@heroui/react'
import Hamburger from 'hamburger-react'
import {
  BookOpen,
  Edit,
  LogOut,
  MonitorIcon,
  MoonIcon,
  SunIcon,
} from 'lucide-react'
import { signOut } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Header = () => {
  const dispatch = useAppDispatch()
  const { openSidebar } = useAppSelector((state) => state.sidebar)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const isMobile = useMediaQuery(1027)
  const { theme: reduxTheme } = useAppSelector((state) => state.header)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const pathname = usePathname()

  const { admin } = useGetAdmin()
  const [themeState, setThemeState] = useState('')
  const [showUpdateAdminDetailsModal, setShowUpdateAdminDetailsModal] =
    useState(false)

  useEffect(() => {
    setThemeState(reduxTheme)
  }, [reduxTheme])

  const menuItems = [
    { label: 'About', route: '/' },
    { label: 'Pricing', route: '/pricing' },
  ]

  return (
    <>
      <Navbar
        className='border-b border-b-default-100 z-20'
        maxWidth='xl'
        onMenuOpenChange={setIsMobileMenuOpen}
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            className='md:hidden'
          />
          <NavbarBrand className='gap-3'>
            <BookOpen />
            <p className='font-bold text-inherit'>Mie</p>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className='hidden md:flex' justify='center'>
          {menuItems.map((item, index) => (
            <NavbarItem
              key={`${index}`}
              className={`relative hover:transform hover:-translate-y-1 transition-transform duration-300 ${
                pathname == item.route
                  ? 'text-primary font-semibold'
                  : 'text-default-500'
              }`}
            >
              <Link href={item.route}>{item.label}</Link>
            </NavbarItem>
          ))}
        </NavbarContent>
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
                  className={`${
                    themeState == 'system' ? 'text-secondary' : ''
                  }`}
                >
                  System
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
          <NavbarItem>
            {isLoggedIn ? (
              <Dropdown>
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as='button'
                    className='transition-transform'
                    color='primary'
                    name='Admin User'
                    size='sm'
                    src={admin?.avatar || ''}
                  />
                </DropdownTrigger>

                <DropdownMenu aria-label='Profile Actions' variant='flat'>
                  <DropdownSection showDivider>
                    <DropdownItem
                      key='profile'
                      className='h-14 gap-2'
                      isReadOnly
                    >
                      <p className='text-sm'>
                        {admin?.firstName} {admin?.lastName}
                      </p>
                      <p className='font-semibold'>{admin?.email}</p>
                    </DropdownItem>
                  </DropdownSection>
                  <DropdownItem
                    key='settings'
                    startContent={<Edit size={15} />}
                    onPress={() => setShowUpdateAdminDetailsModal(true)}
                  >
                    Update Details
                  </DropdownItem>
                  <DropdownItem
                    key='logout'
                    color='danger'
                    onPress={async () => {
                      await signOut({ redirect: false })
                      const cookieJar = Cookies.get() // Get all existing cookies
                      console.log('Logging out and clearing cookies', cookieJar)
                      for (const cookieName in cookieJar) {
                        Cookies.remove(cookieName) // Remove each cookie
                      }
                      sessionStorage.clear()
                      window.location.href = '/admin'
                    }}
                    startContent={<LogOut size={15} />}
                  >
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Button size='sm' color='primary' radius='full'>
                Sign In
              </Button>
            )}
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem
              key={`${index}`}
              className={`w-full${
                pathname == item.route
                  ? 'text-primary font-semibold'
                  : 'text-default-400'
              }`}
            >
              <Link
                className={`w-full block p-inherit'
                }`}
                href={item.route}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  )
}

export default Header
