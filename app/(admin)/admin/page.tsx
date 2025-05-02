'use client'
import Container from '@/components/elements/Container'
import { Button } from '@heroui/react'
import React from 'react'

const Page = () => {
  return (
    <Container>
      <h1>Admin Page</h1>
      <p>This is the admin page.</p>
      <p>Only accessible to users with admin privileges.</p>
      <Button color='primary'>hello</Button>
    </Container>
  )
}

export default Page
