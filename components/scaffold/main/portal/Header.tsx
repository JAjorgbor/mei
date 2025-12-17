'use client'
import ThemeSwitch from '@/components/elements/ThemeSwitch'
import { setHeaderNavigation } from '@/features/headerSlice'
import { useAppDispatch, useAppSelector } from '@/features/store'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react'
import { BookOpen, CircleChevronLeft, Plus, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const Header = () => {
  const { navigation } = useAppSelector((state) => state.header)

  const [themeState, setThemeState] = useState('')

  const { theme: reduxTheme } = useAppSelector((state) => state.header)

  useEffect(() => {
    setThemeState(reduxTheme)
  }, [reduxTheme])

  const [navigationState, setNavigationState] = useState<
    { title: string; backLink: string; width?: string } | undefined
  >()

  const pathname = usePathname()

  useEffect(() => {
    dispatch(setHeaderNavigation(undefined))
  }, [pathname])

  useEffect(() => {
    setNavigationState(navigation)
  }, [navigation])

  const dispatch = useAppDispatch()
  return (
    <Navbar
      className='z-20'
      classNames={{ wrapper: navigationState?.width ?? 'max-w-6xl' }}
    >
      <NavbarContent>
        <NavbarBrand className='gap-3'>
          {navigationState && (
            <Link href={navigationState?.backLink || '#'}>
              <CircleChevronLeft size={25} />
            </Link>
          )}
          {navigationState?.title ? (
            <NavbarItem className='md:hidden'>
              {navigationState?.title}
            </NavbarItem>
          ) : themeState == 'light' ? (
            <Image src='/logo-light.png' alt='logo' height={80} width={80} />
          ) : (
            <Image src='/logo-dark.png' alt='logo' height={80} width={80} />
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
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem>
          <button className='bg-default-200/50 inline-flex rounded-3xl p-1.5 px-2 gap-2 items-center text-sm'>
            <Star className='text-yellow-500 size-4 fill-yellow-500' /> 100{' '}
            <Plus className='text-secondary size-4' />
          </button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default Header
