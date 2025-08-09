'use client'
import Container from '@/components/elements/Container'
import ContinueActivityTabs from '@/components/portal/dasboard/ContinueActivityTabs'
import useSetHeaderNavigation from '@/hooks/useSetHeaderNavigation'
import { Avatar, Button } from '@heroui/react'
import { Edit, Settings, ShoppingBag, Star } from 'lucide-react'
import Link from 'next/link'

const ProfileSection = () => {
  useSetHeaderNavigation({ backLink: '/portal/dashboard', title: 'Profile' })
  return (
    <Container className='space-y-8'>
      <div className='flex flex-col items-center gap-6'>
        <Avatar size='lg' className='size-44' />
        <p className='font-semibold'>@naturiri</p>
        <div className='flex gap-4 justify-center items-center'>
          <span className='flex flex-col items-center'>
            <span className=''>0</span>
            <span className='text-foreground-500 text-sm'> Liked</span>
          </span>
          <span className='flex flex-col items-center'>
            <span className=''>0</span>
            <span className='text-foreground-500 text-sm'> Bookmarks</span>
          </span>
          <span className='flex flex-col items-center'>
            <span className=''>20</span>
            <span className='text-foreground-500 text-sm'> Comments</span>
          </span>
        </div>
        <div className='flex gap-4 items-center justify-center flex-wrap'>
          <Button size='sm' startContent={<Edit size={15} />}>
            Edit Profile
          </Button>

          <Button
            size='sm'
            startContent={<Settings size={15} />}
            href='/portal/settings'
            as={Link}
          >
            Account Settings
          </Button>
          <Button
            size='sm'
            startContent={<ShoppingBag size={15} />}
            href='/portal/store'
            as={Link}
          >
            Store
          </Button>
          <Button
            size='sm'
            startContent={
              <Star className='fill-yellow-500 text-yellow-500' size={15} />
            }
            href='/portal/share-stars'
            as={Link}
          >
            Share Stars
          </Button>
        </div>
      </div>
      <ContinueActivityTabs />
    </Container>
  )
}

export default ProfileSection
