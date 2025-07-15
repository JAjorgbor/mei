'use client'
import Container from '@/components/elements/Container'
import { setHeaderNavigation } from '@/features/headerSlice'
import { useAppDispatch } from '@/features/store'
import useSetHeaderNavigation from '@/hooks/useSetHeaderNavigation'
import { Button } from '@heroui/react'
import {
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Heart,
  Eye,
  LockOpen,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

const ChapterDetailsSection = () => {
  useSetHeaderNavigation({
    title: 'Chapter Label',
    backLink: '/portal/chapters',
  })
  const pathname = usePathname()
  return (
    <div className='space-y-8'>
      <div
        className={`py-12 bg-[url(https://picsum.photos/800/500)] bg-cover bg-center grid place-items-center relative`}
      >
        <div className='absolute bg-transparent inset-0 backdrop-blur' />
        <img
          src='https://picsum.photos/800/500'
          alt='chapter'
          height={500}
          width={300}
          className='w-56 h-72 object-cover z-10'
        />
      </div>
      <Container className='space-y-5'>
        {/* Navigate to other chapters */}
        <div className='flex justify-between items-center max-w-xl mx-auto'>
          <button
            type='button'
            aria-label='Previous Chapter'
            className='rounded-full hover:bg-foreground/10 p-1'
          >
            <ChevronLeft size={25} />
          </button>
          <div className='space-y-4 text-center'>
            <h3>Chapter One</h3>
            <h4 className='text-xl'>Chapter Label</h4>
          </div>
          <button
            type='button'
            aria-label='Previous Chapter'
            className='rounded-full hover:bg-foreground/10 p-1'
          >
            <ChevronRight size={25} />
          </button>
        </div>
        {/* Chapter performance */}
        <div className='flex justify-center gap-6 text-sm text-foreground-500'>
          <span className='inline-flex items-center gap-2'>
            <MessageSquare size={15} /> 40 Comments
          </span>
          <span className='inline-flex items-center gap-2'>
            <Heart size={15} /> 300 Likes
          </span>
          <span className='inline-flex items-center gap-2'>
            <Eye size={15} /> 2.7k Reads
          </span>
        </div>
        <div className='max-w-md mx-auto'>
          <Button
            fullWidth
            color='primary'
            variant='ghost'
            radius='none'
            as={Link}
            href={`${pathname}/read`}
          >
            Start Reading Now
          </Button>
        </div>
        <div className='space-y-6 max-w-3xl mx-auto'>
          <LockOpen size={25} className='text-foreground-500' />
          <div className='divide-y divide-foreground-600 '>
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <div className='space-y-3 py-4'>
                  <h5 className='font-semibold'>Page {index + 1}</h5>
                  <p className='text-sm'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Provident, corporis iste nulla, omnis vel incidunt iure
                    velit consequuntur nemo, obcaecati voluptate? Magnam iste
                    neque quas...
                  </p>
                </div>
              ))}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default ChapterDetailsSection
