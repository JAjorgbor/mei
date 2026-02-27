'use client'
import React from 'react'
import ModalWrapper, { BaseModalProps } from '../elements/ModalWrapper'
import { Button } from '@heroui/react'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Cookies from 'js-cookie'

const LogoutModal: React.FC<BaseModalProps> = ({ isOpen, setIsOpen }) => {
  const handleLogout = async () => {
    await signOut({ redirect: false })
    const cookieJar = Cookies.get() // Get all existing cookies
    for (const cookieName in cookieJar) {
      Cookies.remove(cookieName) // Remove each cookie
    }
    sessionStorage.clear()
    window.location.href = '/admin'
  }

  return (
    <ModalWrapper
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title='Logout Confirmation'
      size='sm'
      footer={
        <div className='flex gap-2 w-full justify-end'>
          <Button variant='light' onPress={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            color='danger'
            startContent={<LogOut size={18} />}
            onPress={handleLogout}
          >
            Log Out
          </Button>
        </div>
      }
    >
      <div className='flex flex-col items-center justify-center py-4 text-center'>
        <div className='bg-danger/10 p-3 rounded-full mb-4'>
          <LogOut className='text-danger' size={32} />
        </div>
        <p className='text-foreground-600'>
          Are you sure you want to log out? You will need to sign in again to
          access the admin portal.
        </p>
      </div>
    </ModalWrapper>
  )
}

export default LogoutModal
