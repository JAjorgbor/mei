'use client'
import UserUnlockedChapters from '@/components/admin/users/UserUnlockedChapters'
import InputField from '@/components/elements/InputField'
import {
  Avatar,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  Chip,
} from '@heroui/react'
import { CirclePower, Edit, Mail, User } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const ManageUserSection = () => {
  const [showEditStatus, setShowEditStatus] = useState(false)
  const { userId } = useParams()
  const statusFormMethods = useForm()
  //   const { user } = useGetUser(userId as string)
  return (
    <>
      <Breadcrumbs>
        <BreadcrumbItem href='/admin/dashboard'>Dashboard</BreadcrumbItem>
        <BreadcrumbItem href='/admin/users'>Users</BreadcrumbItem>
        <BreadcrumbItem href={`/admin/users/${userId}`}>
          Manage User
        </BreadcrumbItem>
      </Breadcrumbs>
      <div className='grid md:grid-cols-6 gap-4'>
        <Card className='md:col-span-2'>
          <CardBody>
            <div className='space-y-4'>
              <div className='flex justify-center'>
                <Avatar
                  src={'https://dummyimage.com/200x200'}
                  alt='User avatar'
                  className='size-56'
                />
              </div>
              <div className='flex gap-3 items-center text-sm'>
                <User />
                <div className='space-y'>
                  <p className='font-semibold text-xs'>Name</p>
                  <p>Joshua Example</p>
                </div>
              </div>
              <div className='flex gap-3 items-center text-sm'>
                <Mail />
                <div className='space-y'>
                  <p className='font-semibold text-xs'>eMail Address</p>
                  <p>joshua@example.com</p>
                </div>
              </div>
              <div className='flex justify-between items-center'>
                {showEditStatus ? (
                  <form className='flex gap-3 flex-grow justify-between items-end'>
                    <InputField
                      type='select'
                      label='Status'
                      className='w-32'
                      value={statusFormMethods.watch('status')}
                      onChange={(value) =>
                        statusFormMethods.setValue('status', value)
                      }
                      options={[
                        { value: 'active', label: 'Active' },
                        { value: 'inactive', label: 'Inactive' },
                      ]}
                    />
                    <div className='flex gap-2'>
                      <Button
                        type='button'
                        color='danger'
                        size='sm'
                        onClick={() => setShowEditStatus(false)}
                      >
                        Cancel
                      </Button>
                      <Button type='button' color='primary' size='sm'>
                        Save
                      </Button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className='flex gap-3 items-center text-sm'>
                      <CirclePower />
                      <div className='space-y-1.5'>
                        <p className='font-semibold text-xs'>Status</p>
                        <Chip color='success' size='sm' variant='flat'>
                          Active
                        </Chip>
                      </div>
                    </div>
                    <button
                      className='rounded-lg p-1 bg-primary/10'
                      onClick={() => setShowEditStatus(true)}
                    >
                      <Edit size={17} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
        <div className='md:col-span-4'>
          <UserUnlockedChapters />
        </div>
      </div>
    </>
  )
}

export default ManageUserSection
