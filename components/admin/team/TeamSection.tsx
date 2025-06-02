'use client'
import InviteTeamMemberModal from '@/components/admin/team/InviteTeamMemberModal'
import {
  Avatar,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  Chip,
} from '@heroui/react'
import { MoreVerticalIcon, PlusCircleIcon } from 'lucide-react'
import { useState } from 'react'

const TeamSection = () => {
  const [showInviteModal, setShowInviteModal] = useState(false)

  return (
    <>
      <div className='space-y-4'>
        <h1 className='text-2xl font-semibold'>Team</h1>
        <div className='flex justify-between'>
          <Breadcrumbs>
            <BreadcrumbItem href='/admin/dashboard'>Dashboard</BreadcrumbItem>
            <BreadcrumbItem href='/admin/dashboard/team'>Team</BreadcrumbItem>
          </Breadcrumbs>
          <Button
            color='secondary'
            endContent={<PlusCircleIcon size={15} />}
            size='sm'
            onPress={() => setShowInviteModal(true)}
          >
            Add Team Member
          </Button>
        </div>

        <div className='grid grid-cols-3'>
          <Card>
            <CardBody>
              <div className='flex gap-3 items-center'>
                <Avatar size='lg' />
                <div className='flex justify-between items-start flex-grow'>
                  <div className='space-y'>
                    <p className='text-lg capitalize font-semibold'>
                      Joshua Ajorgbor
                    </p>
                    <Chip
                      color='success'
                      title='Active'
                      size='sm'
                      variant='dot'
                    >
                      Active
                    </Chip>
                  </div>
                  <button>
                    <MoreVerticalIcon size={18} />{' '}
                  </button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
      <InviteTeamMemberModal
        isOpen={showInviteModal}
        setIsOpen={setShowInviteModal}
      />
    </>
  )
}

export default TeamSection
