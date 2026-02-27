'use client'
import { Fade as Hamburger } from 'hamburger-react'
import React, { useState } from 'react'

import LogoutModal from '@/components/admin/auth/LogoutModal'
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
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  return (
    <>
      <Navbar
        className='bg-background/60 dark:bg-zinc-900/60 backdrop-blur-xl border-b border-x border-default-100 z-[80] h-20 rounded-b-[2.5rem] right-5'
        maxWidth='full'
        isBlurred={false}
      >
        <NavbarContent justify='start'>
          {isMobile && (
            <div className='bg-default-100/50 rounded-2xl border border-default-200'>
              <Hamburger
                aria-label={openSidebar ? 'Close sidebar' : 'Open sidebar'}
                size={18}
                toggled={openSidebar}
                onToggle={(value) => dispatch(setOpenSidebar(value))}
              />
            </div>
          )}
        </NavbarContent>

        <NavbarContent justify='end' className='gap-4'>
          <NavbarItem>
            <div className='p-1.5 bg-default-100/50 rounded-2xl border border-default-200 hover:bg-default-100 transition-colors'>
              <ThemeSwitch />
            </div>
          </NavbarItem>

          <NavbarItem>
            <Dropdown placement='bottom-end'>
              <DropdownTrigger>
                <div className='flex items-center gap-3 p-1.5 pr-4 bg-default-100/50 rounded-3xl border border-default-200 hover:bg-default-100 cursor-pointer transition-all duration-300 group'>
                  <Avatar
                    isBordered
                    as='button'
                    className='transition-transform ring-2 ring-primary/20 group-hover:ring-primary/40'
                    color='primary'
                    name={`${admin?.firstName} ${admin?.lastName}`}
                    size='sm'
                    src={admin?.avatar || ''}
                  />
                  {!isMobile && (
                    <div className='flex flex-col items-start'>
                      <span className='text-xs font-black tracking-tight leading-none'>
                        {admin?.firstName} {admin?.lastName}
                      </span>
                      <span className='text-[10px] uppercase font-black text-primary/70 tracking-widest'>
                        Admin
                      </span>
                    </div>
                  )}
                </div>
              </DropdownTrigger>

              <DropdownMenu
                aria-label='Profile Actions'
                variant='flat'
                className='p-3'
                itemClasses={{
                  base: 'rounded-2xl py-3 px-4 transition-all duration-200',
                  title: 'font-bold text-sm',
                }}
              >
                <DropdownSection showDivider>
                  <DropdownItem
                    key='profile'
                    className='h-auto gap-4 p-4 bg-default-50 rounded-2xl cursor-default border border-default-100 mb-2'
                    isReadOnly
                  >
                    <div className='flex flex-col gap-1'>
                      <p className='text-xs font-black uppercase tracking-widest text-default-400'>
                        Authenticated As
                      </p>
                      <p className='text-sm font-black'>
                        {admin?.firstName} {admin?.lastName}
                      </p>
                      <p className='text-xs font-medium text-default-500'>
                        {admin?.email}
                      </p>
                    </div>
                  </DropdownItem>
                </DropdownSection>

                <DropdownItem
                  key='settings'
                  startContent={
                    <div className='p-2 bg-primary/10 rounded-xl text-primary'>
                      <Edit size={16} />
                    </div>
                  }
                  onPress={() => setShowUpdateAdminDetailsModal(true)}
                  className='mb-1 hover:bg-primary/5'
                >
                  Update Account Details
                </DropdownItem>

                <DropdownItem
                  key='logout'
                  color='danger'
                  className='text-danger hover:bg-danger/10'
                  onPress={() => setShowLogoutModal(true)}
                  startContent={
                    <div className='p-2 bg-danger/10 rounded-xl text-danger'>
                      <LogOut size={16} />
                    </div>
                  }
                >
                  Sign Out Session
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <UpdateAdminDetailsModal
        isOpen={showUpdateAdminDetailsModal}
        setIsOpen={setShowUpdateAdminDetailsModal}
      />
      <LogoutModal isOpen={showLogoutModal} setIsOpen={setShowLogoutModal} />
    </>
  )
}

export default Header
