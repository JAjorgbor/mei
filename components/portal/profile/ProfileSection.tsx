'use client'
import Container from '@/components/elements/Container'
import ContinueActivityTabs from '@/components/portal/dasboard/ContinueActivityTabs'
import useGetPortalUser from '@/hooks/requests/portal/useGetPortalUser'
import useSetHeaderNavigation from '@/hooks/useSetHeaderNavigation'
import { Avatar, Button, Skeleton } from '@heroui/react'
import { Edit, Settings, ShoppingBag, Star } from 'lucide-react'
import Link from 'next/link'

const ProfileSection = () => {
  useSetHeaderNavigation({ backLink: '/portal/dashboard', title: 'Profile' })
  const { portalUser, portalUserLoading } = useGetPortalUser()
  console.log(portalUser)
  return (
    <Container className='space-y-8'>
      <div className='flex flex-col items-center gap-6'>
        {portalUserLoading ? (
          <>
            <Skeleton className='size-44 rounded-full' />
            <Skeleton className='w-40 h-5 rounded' />

            <div className='flex gap-4 justify-center items-center'>
              <Skeleton className='size-5 rounded' />
              <Skeleton className='size-5 rounded' />
              <Skeleton className='size-5 rounded' />
            </div>
          </>
        ) : (
          <>
            <Avatar
              size='lg'
              className='size-44'
              src={portalUser?.avatar || ''}
            />
            <p className='font-semibold'>
              {portalUser?.firstName} {portalUser?.lastName}
            </p>
            <div className='flex gap-4 justify-center items-center'>
              <span className='flex flex-col items-center'>
                <span className=''>{portalUser?.likes?.length}</span>
                <span className='text-foreground-500 text-sm'> Liked</span>
              </span>
              <span className='flex flex-col items-center'>
                <span className=''>{portalUser?.bookmarks?.length}</span>
                <span className='text-foreground-500 text-sm'> Bookmarks</span>
              </span>
              <span className='flex flex-col items-center'>
                <span className=''>20</span>
                <span className='text-foreground-500 text-sm'> Comments</span>
              </span>
            </div>
          </>
        )}
        <div className='flex gap-4 items-center justify-center flex-wrap'>
          <Button
            size='sm'
            startContent={<Edit size={15} />}
            className='bg-default/40'
          >
            Edit Profile
          </Button>

          <Button
            size='sm'
            as={Link}
            href='/portal/subscribe'
            startContent={<Star size={15} />}
            className='bg-default/40'
          >
            Subscription
          </Button>

          <Button
            size='sm'
            startContent={<Settings size={15} />}
            href='/portal/settings'
            as={Link}
            className='bg-default/40'
          >
            Account Settings
          </Button>
        </div>
      </div>
      <ContinueActivityTabs />
    </Container>
  )
}

export default ProfileSection
