'use client'
import axiosInstance from '@/api-utils/admin/request-adapter'
import { Avatar, Button, Card, CardBody, CardHeader, Chip } from '@heroui/react'
import { ArrowRight, BookOpen, Edit } from 'lucide-react'
import { useEffect } from 'react'

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
  useEffect(() => {
    ;(async () => {
      try {
        const res = await axiosInstance.get('/book/get')
        console.log(res)
      } catch (error) {
        console.error('Error fetching book data:', error)
      }
    })()
  }, [])
  return (
    <div className='flex flex-col md:flex-row gap-4'>
      <Card className='flex-1'>
        <CardHeader className='flex justify-between'>
          <h3 className='text-lg font-semibold'>Recent Chapters</h3>
          <Button
            href='/admin/chapters'
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
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className='flex justify-between items-center border-b border-divider pb-3 last:border-0 last:pb-0'
              >
                <div className='flex items-center gap-3'>
                  <div className='w-12 h-12 rounded bg-primary/20 flex items-center justify-center'>
                    <BookOpen className='text-primary' />
                  </div>
                  <div>
                    <p className='font-medium'>
                      Chapter {i}:{' '}
                      {
                        [
                          'The Beginning',
                          'The Journey',
                          'The Challenge',
                          'The Revelation',
                        ][i - 1]
                      }
                    </p>
                    <p className='text-sm text-default-500'>
                      {2500 + i * 300} words • Last edited 2 days ago
                    </p>
                  </div>
                </div>
                <Button
                  href={`/admin/editor/${i}`}
                  size='sm'
                  variant='flat'
                  color='primary'
                  startContent={<Edit size={18} />}
                >
                  Edit
                </Button>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <Card className='flex-1'>
        <CardHeader className='flex justify-between'>
          <h3 className='text-lg font-semibold'>Recent Users</h3>
          <Button
            href='/admin/users'
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
            {users.map((user) => (
              <div
                key={user.id}
                className='flex justify-between items-center border-b border-divider pb-3 last:border-0 last:pb-0'
              >
                <div className='flex items-center gap-3'>
                  <Avatar src={user.avatar} name={user.name} />
                  <div>
                    <p className='font-medium'>{user.name}</p>
                    <p className='text-sm text-default-500'>{user.email}</p>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <Chip
                    color={user.plan === 'Premium' ? 'secondary' : 'default'}
                    variant='flat'
                    size='sm'
                  >
                    {user.plan}
                  </Chip>
                  <Chip
                    color={user.status === 'active' ? 'success' : 'warning'}
                    variant='dot'
                    size='sm'
                  >
                    {user.status === 'active' ? 'Active' : 'Inactive'}
                  </Chip>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default DashboardSummary
