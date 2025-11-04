'use client'
import ModalWrapper, {
  BaseModalProps,
} from '@/components/admin/elements/ModalWrapper'
import { Button } from '@heroui/react'
import { signOut } from 'next-auth/react'
import Cookies from 'js-cookie'
import { useState, type FC } from 'react'

const LogOutModal: FC<BaseModalProps> = ({ isOpen, setIsOpen }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    const cookieJar = Cookies.get() // Get all existing cookies
    setIsLoading(true)
    console.log('Logging out and clearing cookies', cookieJar)
    for (const cookieName in cookieJar) {
      Cookies.remove(cookieName) // Remove each cookie
    }
    sessionStorage.clear()
    window.location.href = '/'
  }
  return (
    <ModalWrapper
      title='Log Out'
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      footer={
        <div className='flex gap-4 justify-end'>
          <Button size='sm' color='primary' onPress={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            size='sm'
            color='danger'
            onPress={handleSignOut}
            isLoading={isLoading}
          >
            Log Out
          </Button>
        </div>
      }
    >
      <p>Ready to log out? You can always sign back in anytime.</p>
    </ModalWrapper>
  )
}
export default LogOutModal
