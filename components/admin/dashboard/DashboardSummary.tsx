'use client'
import useGetDashboardStats from '@/hooks/requests/useGetDashboardStats'
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Skeleton,
} from '@heroui/react'
import { ArrowRight, BookOpen, Edit, FolderOpen, Plus } from 'lucide-react'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'

const users = [
  {
    id: 1,
    name: 'Emma Wilson',
    email: 'emma@example.com',
    status: 'active',
    plan: 'Premium',
    avatar: 'https://img.heroui.chat/image/avatar?w=40&h=40&u=user1',
  },
  {
    id: 2,
    name: 'James Rodriguez',
    email: 'james@example.com',
    status: 'active',
    plan: 'Basic',
    avatar: 'https://img.heroui.chat/image/avatar?w=40&h=40&u=user2',
  },
  {
    id: 3,
    name: 'Olivia Martinez',
    email: 'olivia@example.com',
    status: 'inactive',
    plan: 'Premium',
    avatar: 'https://img.heroui.chat/image/avatar?w=40&h=40&u=user3',
  },
  {
    id: 4,
    name: 'William Chen',
    email: 'william@example.com',
    status: 'active',
    plan: 'Premium',
    avatar: 'https://img.heroui.chat/image/avatar?w=40&h=40&u=user4',
  },
]

const DashboardSummary = () => {
  const { dashboardStats } = useGetDashboardStats()
  console.log(dashboardStats)
  return (
    <div className='flex flex-col md:flex-row gap-4'>
      <Card className='flex-1'>
        <CardHeader className='flex justify-between'>
          <h3 className='text-lg font-semibold'>Recent Chapters</h3>
          <Button
            href='/admin/chapters'
            as={Link}
            variant='light'
            color='primary'
            size='sm'
            endContent={<ArrowRight size={18} />}
          >
            View All
          </Button>
        </CardHeader>
        <CardBody>
          <div className='space-y-4'>
            {dashboardStats ? (
              dashboardStats?.recentChapters.length > 0 ? (
                dashboardStats?.recentChapters.map((chapter, index) => (
                  <div
                    key={index}
                    className='flex justify-between items-center border-b border-divider pb-3 last:border-0 last:pb-0'
                  >
                    <div className='flex items-center gap-3'>
                      <div className='w-12 h-12 rounded bg-primary/20 flex items-center justify-center'>
                        <Image
                          src={chapter?.coverImage}
                          alt='chapter cover image'
                          width={80}
                          height={80}
                          className='size-12 rounded'
                        />
                      </div>
                      <div>
                        <p className='font-medium'>
                          Chapter {chapter?.number}: {chapter?.chapterLabel}
                        </p>
                        <p className='text-sm text-default-500'>
                          {chapter.wordCount} words • Last edited{' '}
                          {moment(chapter.dateUpdated).fromNow()}
                        </p>
                      </div>
                    </div>
                    <Button
                      href={`/admin/chapters/${chapter?.id}`}
                      as={Link}
                      size='sm'
                      variant='flat'
                      color='primary'
                      startContent={<Edit size={18} />}
                    >
                      Manage
                    </Button>
                  </div>
                ))
              ) : (
                <div className='grid place-items-center h-56'>
                  <div className='flex flex-col items-center gap-3 text-center'>
                    <FolderOpen className='text-foreground-300' size={50} />
                    <p>No chapters available</p>
                    <Button
                      size='sm'
                      as={Link}
                      href='/admin/chapters'
                      color='primary'
                      variant='flat'
                      endContent={<Plus size={15} />}
                    >
                      Add Chapter
                    </Button>
                  </div>
                </div>
              )
            ) : (
              Array(5)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className='flex justify-between items-center border-b border-divider pb-3 last:border-0 last:pb-0'
                  >
                    <div className='flex items-center gap-3'>
                      <div className='w-12 h-12 rounded bg-primary/20 flex items-center justify-center'>
                        <Skeleton className='size-12 rounded' />
                      </div>
                      <div className='space-y-3'>
                        <Skeleton className='w-56 h-5 rounded' />
                        <div className='flex gap-3'>
                          <Skeleton className='w-16 h-3 rounded' />
                          <Skeleton className='w-16 h-3 rounded' />
                        </div>
                      </div>
                    </div>
                    <Skeleton className='h-7 rounded w-28' />
                  </div>
                ))
            )}
          </div>
        </CardBody>
      </Card>

      <Card className='flex-1'>
        <CardHeader className='flex justify-between'>
          <h3 className='text-lg font-semibold'>Recent Users</h3>
          <Button
            href='/admin/users'
            as={Link}
            variant='light'
            color='primary'
            size='sm'
            endContent={<ArrowRight size={18} />}
          >
            View All
          </Button>
        </CardHeader>
        <CardBody>
          <div className='space-y-4'>
            {dashboardStats ? (
              dashboardStats?.recentUsers?.length > 0 ? (
                dashboardStats?.recentUsers.map((user, index) => (
                  <div
                    key={index}
                    className='flex justify-between items-center border-b border-divider pb-3 last:border-0 last:pb-0'
                  >
                    <div className='flex items-center gap-3'>
                      <Avatar
                        src={user.avatar || ''}
                        name={`${user?.firstName} ${user?.lastName}`}
                      />
                      <div>
                        <p className='font-medium'>
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className='text-sm text-default-500'>
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <Chip
                        color={
                          user?.plan === 'Premium' ? 'secondary' : 'default'
                        }
                        variant='flat'
                        size='sm'
                      >
                        {user?.plan}
                      </Chip>
                      <Chip
                        color={
                          user?.status === 'active' ? 'success' : 'warning'
                        }
                        variant='dot'
                        size='sm'
                      >
                        {user?.status === 'active' ? 'Active' : 'Inactive'}
                      </Chip>
                    </div>
                  </div>
                ))
              ) : (
                <div className='grid place-items-center h-56'>
                  <div className='flex flex-col items-center gap-3 text-center'>
                    <FolderOpen className='text-foreground-300' size={50} />
                    <p>No users available</p>
                  </div>
                </div>
              )
            ) : (
              Array(5)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className='flex justify-between items-center border-b border-divider pb-3 last:border-0 last:pb-0'
                  >
                    <div className='flex items-center gap-3'>
                      <div className='w-12 h-12 rounded bg-primary/20 flex items-center justify-center'>
                        <Skeleton className='size-12 rounded-full' />
                      </div>
                      <div className='space-y-3'>
                        <Skeleton className='w-56 h-5 rounded' />
                        <Skeleton className='w-44 h-3 rounded' />
                      </div>
                    </div>
                    <div className='flex gap-3'>
                      <Skeleton className='h-5 rounded-lg w-12' />
                      <Skeleton className='h-5 rounded-lg w-12' />
                    </div>
                  </div>
                ))
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default DashboardSummary
