import AcceptInviteSection from '@/components/admin/auth/AcceptInviteSection'
import Container from '@/components/elements/Container'
import React from 'react'

export const metadata = {
  title: 'Accept Invite',
}

const AcceptInvitePage = () => {
  return (
    <Container>
      <div className='w-full h-screen grid place-items-center'>
        <div className='max-w-sm w-full'>
          <AcceptInviteSection />
        </div>
      </div>
    </Container>
  )
}

export default AcceptInvitePage
