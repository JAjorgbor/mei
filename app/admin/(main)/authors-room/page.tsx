import AuthorsRoomSection from '@/components/admin/authors-room/AuthorsRoomSection'
import Container from '@/components/elements/Container'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Author Room Management',
}

const AuthorsRoomPage = () => {
  return (
    <Container>
      <div className='space-y-4'>
        <h3 className='text-3xl font-bold'>Author's Room</h3>

        <AuthorsRoomSection />
      </div>
    </Container>
  )
}

export default AuthorsRoomPage
