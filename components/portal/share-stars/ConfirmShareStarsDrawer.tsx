'use client'
import DrawerWrapper, {
  BaseDrawerProps,
} from '@/components/elements/DrawerWrapper'
import { Button } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { useState, type FC } from 'react'

interface ConfirmShareStarsDrawerProps {
  starCount: number
  isLoading: boolean
}

const ConfirmShareStarsDrawer: FC<
  ConfirmShareStarsDrawerProps & BaseDrawerProps
> = ({ isOpen, setIsOpen, starCount }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const handleConfirmation = () => {
    setIsLoading(true)
    router.push('/portal/verify-otp')
  }
  return (
    <DrawerWrapper
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title='Brief Warning'
      isDissmisible={!isLoading}
    >
      <div className='space-y-5 max-w-lg mx-auto'>
        <div className='space-y-2'>
          <p>You are about to share 10 stars to uririnathaniel@gmail.com.</p>
          <p>
            This action will remove about {starCount} stars from your account.
          </p>
          <p>
            To confirm proceed to the next page and enter the otp sent to you if
            you don&apos;t wish to continue with this action ignore the request
            will be cancelled in 10 mins
          </p>
        </div>
        <Button
          color='secondary'
          onPress={handleConfirmation}
          fullWidth
          isLoading={isLoading}
        >
          Continue
        </Button>
      </div>
    </DrawerWrapper>
  )
}
export default ConfirmShareStarsDrawer
