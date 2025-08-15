'use client'
import { Fade as Hamburger } from 'hamburger-react'
import Cookies from 'js-cookie'
import { signOut } from 'next-auth/react'
import React, { useState } from 'react'

import UpdateAdminDetailsModal from '@/components/admin/team/UpdateAdminDetailsModal'
import ThemeSwitch from '@/components/elements/ThemeSwitch'
import { setOpenSidebar } from '@/features/sidebarSlice'
import { useAppDispatch, useAppSelector } from '@/features/store'
import useGetAdmin from '@/hooks/requests/useGetAdmin'
import useMediaQuery from '@/hooks/useMediaQuery'
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Navbar,
  NavbarContent,
  NavbarItem,
} from '@heroui/react'
import { Edit, LogOut } from 'lucide-react'

const Header: React.FC = () => {
  const dispatch = useAppDispatch()
  const { openSidebar } = useAppSelector((state) => state.sidebar)

  const isMobile = useMediaQuery(1027)

  const { admin } = useGetAdmin()
  const [showUpdateAdminDetailsModal, setShowUpdateAdminDetailsModal] =
    useState(false)

  return (
    <>
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
            <ThemeSwitch />
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
                src={admin?.avatar || ''}
              />
            </DropdownTrigger>

            <DropdownMenu aria-label='Profile Actions' variant='flat'>
              <DropdownSection showDivider>
                <DropdownItem key='profile' className='h-14 gap-2' isReadOnly>
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
        </NavbarContent>
      </Navbar>
      <UpdateAdminDetailsModal
        isOpen={showUpdateAdminDetailsModal}
        setIsOpen={setShowUpdateAdminDetailsModal}
      />
    </>
  )
}

export default Header
