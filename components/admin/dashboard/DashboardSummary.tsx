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
import { capitalCase } from 'change-case'
import { ArrowRight, BookOpen, Edit, FolderOpen, Plus } from 'lucide-react'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'

const DashboardSummary = () => {
  const { dashboardStats } = useGetDashboardStats()
  return (
    <div className='flex flex-col lg:flex-row gap-6'>
      <Card className='flex-1 bg-background/40 backdrop-blur-md border border-default-100 shadow-sm rounded-[2.5rem] overflow-hidden'>
        <CardHeader className='px-8 pt-8 flex justify-between items-center'>
          <div className='flex flex-col'>
            <h3 className='text-xl font-black tracking-tight'>
              Recent Chapters
            </h3>
            <p className='text-xs text-default-400 font-medium'>
              Latest content updates
            </p>
          </div>
          <Button
            href='/admin/chapters'
            as={Link}
            variant='light'
            color='primary'
            className='font-bold'
            size='sm'
            endContent={<ArrowRight size={16} />}
          >
            View All
          </Button>
        </CardHeader>
        <CardBody className='px-8 py-6 max-h-[500px] overflow-y-auto no-scrollbar'>
          <div className='space-y-4'>
            {dashboardStats ? (
              dashboardStats?.recentChapters.length > 0 ? (
                dashboardStats?.recentChapters.map((chapter, index) => (
                  <div
                    key={index}
                    className='flex justify-between items-center p-4 bg-default-50/50 rounded-3xl border border-default-100/50 hover:bg-default-50 transition-colors'
                  >
                    <div className='flex items-center gap-4'>
                      <div className='size-14 rounded-2xl bg-primary/10 flex items-center justify-center overflow-hidden border border-primary/20 shadow-inner'>
                        <img
                          src={
                            chapter?.coverImage ||
                            'https://dummyimage.com/80x80'
                          }
                          alt='chapter cover image'
                          className='object-cover size-full transition-transform duration-500 hover:scale-110'
                        />
                      </div>
                      <div className='flex flex-col'>
                        <p className='font-bold text-sm tracking-tight'>
                          Chapter {chapter?.number}: {chapter?.chapterLabel}
                        </p>
                        <p className='text-[10px] uppercase font-black text-default-400 tracking-widest mt-1'>
                          {chapter.wordCount} Pages •{' '}
                          {moment(chapter.dateUpdated).fromNow()}
                        </p>
                      </div>
                    </div>
                    <Button
                      href={`/admin/chapters/${chapter?.id}`}
                      as={Link}
                      isIconOnly
                      size='sm'
                      radius='full'
                      variant='flat'
                      color='primary'
                      className='bg-primary/10'
                    >
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                ))
              ) : (
                <div className='grid place-items-center h-56'>
                  <div className='flex flex-col items-center gap-3 text-center'>
                    <div className='p-4 bg-default-100 rounded-full'>
                      <FolderOpen className='text-default-400' size={32} />
                    </div>
                    <p className='text-sm font-bold text-default-500'>
                      No chapters available
                    </p>
                    <Button
                      size='sm'
                      as={Link}
                      href='/admin/chapters'
                      color='primary'
                      variant='flat'
                      className='rounded-xl'
                      endContent={<Plus size={14} />}
                    >
                      Add Chapter
                    </Button>
                  </div>
                </div>
              )
            ) : (
              Array(4)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className='flex justify-between items-center p-4 bg-default-50/50 rounded-3xl'
                  >
                    <div className='flex items-center gap-4'>
                      <Skeleton className='size-14 rounded-2xl' />
                      <div className='space-y-2'>
                        <Skeleton className='w-32 h-4 rounded-lg' />
                        <Skeleton className='w-24 h-2 rounded-lg' />
                      </div>
                    </div>
                    <Skeleton className='size-8 rounded-full' />
                  </div>
                ))
            )}
          </div>
        </CardBody>
      </Card>

      <Card className='flex-1 bg-background/40 backdrop-blur-md border border-default-100 shadow-sm rounded-[2.5rem] overflow-hidden'>
        <CardHeader className='px-8 pt-8 flex justify-between items-center'>
          <div className='flex flex-col'>
            <h3 className='text-xl font-black tracking-tight'>New Members</h3>
            <p className='text-xs text-default-400 font-medium'>
              Recently joined users
            </p>
          </div>
          <Button
            href='/admin/users'
            as={Link}
            variant='light'
            color='primary'
            className='font-bold'
            size='sm'
            endContent={<ArrowRight size={16} />}
          >
            View All
          </Button>
        </CardHeader>
        <CardBody className='px-8 py-6 max-h-[500px] overflow-y-auto no-scrollbar'>
          <div className='space-y-4'>
            {dashboardStats ? (
              dashboardStats?.recentUsers?.length > 0 ? (
                dashboardStats?.recentUsers.map((user, index) => (
                  <div
                    key={index}
                    className='flex justify-between items-center p-4 bg-default-50/50 rounded-3xl border border-default-100/50 hover:bg-default-50 transition-colors'
                  >
                    <div className='flex items-center gap-4'>
                      <Avatar
                        src={user.avatar || ''}
                        isBordered
                        className='bg-primary/10 ring-primary/20'
                        color='primary'
                        name={`${user?.firstName} ${user?.lastName}`}
                      />
                      <div className='flex flex-col'>
                        <p className='font-bold text-sm tracking-tight'>
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className='text-[10px] font-medium text-default-400'>
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <Chip
                      color={
                        user?.status?.toLocaleLowerCase() === 'active'
                          ? 'success'
                          : 'warning'
                      }
                      variant='flat'
                      size='sm'
                      className='font-black uppercase text-[9px] tracking-widest px-2 h-6'
                    >
                      {user?.status}
                    </Chip>
                  </div>
                ))
              ) : (
                <div className='grid place-items-center h-56'>
                  <div className='flex flex-col items-center gap-3 text-center'>
                    <div className='p-4 bg-default-100 rounded-full'>
                      <FolderOpen className='text-default-400' size={32} />
                    </div>
                    <p className='text-sm font-bold text-default-500'>
                      No users recently joined
                    </p>
                  </div>
                </div>
              )
            ) : (
              Array(4)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className='flex justify-between items-center p-4 bg-default-50/50 rounded-3xl'
                  >
                    <div className='flex items-center gap-4'>
                      <Skeleton className='size-10 rounded-full' />
                      <div className='space-y-2'>
                        <Skeleton className='w-24 h-3 rounded-lg' />
                        <Skeleton className='w-32 h-2 rounded-lg' />
                      </div>
                    </div>
                    <Skeleton className='w-14 h-6 rounded-full' />
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
