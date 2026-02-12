'use client'
import Container from '@/components/elements/Container'
import { Button } from '@heroui/react'
import Link from 'next/link'

export default function Home() {
  return (
    <Container>
      <div className='h-[84dvh] flex items-center'>
        <div className='space-y-5'>
          <h1 className='font-dancing-script text-8xl'>My Stories & ideas</h1>
          <p className='text-lg'>
            A place to read, Learn and deepen your understanding of conviction
          </p>
          <Button radius='full' color='primary' as={Link} href='/portal'>
            Start Reading
          </Button>
        </div>
      </div>
    </Container>
  )
}
