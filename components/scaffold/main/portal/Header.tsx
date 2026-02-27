'use client'
import ThemeSwitch from '@/components/elements/ThemeSwitch'
import { setHeaderNavigation } from '@/features/headerSlice'
import { useAppDispatch, useAppSelector } from '@/features/store'
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@heroui/react'
import { CircleChevronLeft, Plus, Star } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Logo from '@/components/elements/Logo'

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
          ) : (
            <Logo width={80} height={80} />
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
          <Button
            as={Link}
            href='/portal/subscribe'
            color='secondary'
            className='rounded-3xl p-1.5! px-2 gap-2 items-center text-sm h-7'
            size='sm'
          >
            Subscribe
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default Header
