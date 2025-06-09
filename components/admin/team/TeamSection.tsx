'use client'
import InviteTeamMemberModal from '@/components/admin/team/InviteTeamMemberModal'
import useGetAdminTeam from '@/hooks/requests/useGetAdminTeam'
import {
  Avatar,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  Chip,
  Skeleton,
} from '@heroui/react'
import { MoreVerticalIcon, PlusCircleIcon } from 'lucide-react'
import { useState } from 'react'

const TeamSection = () => {
  const [showInviteModal, setShowInviteModal] = useState(false)
  const { adminTeam } = useGetAdminTeam()
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

        <div className='grid grid-cols-3 gap-4'>
          {adminTeam
            ? adminTeam.map((each, index) => (
                <Card key={index}>
                  <CardBody>
                    <div className='flex gap-3 items-center'>
                      <Avatar size='lg' src={each?.avatar} />
                      <div className='flex justify-between items-start flex-grow'>
                        <div className='space-y'>
                          <p className='text-lg capitalize font-semibold'>
                            {each?.firstName} {each?.lastName}
                          </p>
                          <p className='text-sm text-foreground-500'>
                            {each?.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))
            : Array(5)
                .fill(null)
                .map((_, index) => (
                  <Card key={index}>
                    <CardBody>
                      <div className='flex gap-3 items-center'>
                        <Skeleton className='rounded-full size-20' />
                        <div className='flex justify-between items-start flex-grow'>
                          <div className='space-y-3'>
                            <Skeleton className='h-5 w-36 rounded-lg' />
                            <Skeleton className='h-3 w-48 rounded-lg' />
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
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
