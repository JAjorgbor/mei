'use client'
import Container from '@/components/elements/Container'
import useGetRandomPeople from '@/hooks/requests/useGetRandomPeople'
import { Avatar, Button, Input, Skeleton } from '@heroui/react'
import { MessageSquare, Send, XCircle } from 'lucide-react'
import React, { useEffect } from 'react'

const CommentSection = ({
  showComments,
  setShowComments,
}: {
  showComments: boolean
  setShowComments: (showComment: boolean) => void
}) => {
  const { randomPeople, randomPeopleLoading } = useGetRandomPeople()
  useEffect(() => {
    if (showComments) document.body.style.overflowY = 'hidden'
    else document.body.style.overflowY = 'auto'
  }, [showComments])
  return (
    <div
      className={`w-dvw px-0 h-screen overflow-y-hidden bg-background fixed top-16 space-y-8 transform transition-all duration-700 flex justify-center ${
        showComments
          ? 'translate-x-0 opacity-100 z-[310]'
          : 'left-0 translate-x-full opacity-0 -z-50'
      }`}
    >
      <Container className={`  h-screen bg-background fixed`} width='3xl'>
        <div className='relative pb-8 overflow-y-auto max-h-screen space-y-5 divide-y-foreground-200'>
          <form className='flex gap-3 items-center sticky top-0 left-0 bg-background z-10 p-2'>
            <Button
              isIconOnly
              type='button'
              onPress={() => setShowComments(false)}
              radius='full'
              variant='light'
              color='primary'
            >
              <XCircle size={25} />
            </Button>
            <Input
              fullWidth
              radius='full'
              variant='bordered'
              placeholder='Write a comment'
              size='sm'
              endContent={
                <button type='submit'>
                  <Send size={16} />
                </button>
              }
            />
          </form>

          {randomPeopleLoading
            ? Array(5)
                .fill(null)
                .map((_, index) => (
                  <div key={index} className='space-y-4'>
                    <div className='flex items-center gap-4'>
                      <Skeleton className='size-12 rounded-full' />
                      <Skeleton className='w-48 rounded-lg h-6' />
                    </div>
                    <div className='space-y-3'>
                      <Skeleton className='w-full rounded-lg h-4' />
                      <Skeleton className='w-1/2 rounded-lg h-4' />
                      <Skeleton className='w-1/3 rounded-lg h-4' />
                    </div>
                  </div>
                ))
            : randomPeople?.map((each: any, index: number) => (
                <div key={index} className='space-y-4'>
                  <div className='flex gap-4 items-center'>
                    <Avatar
                      size='sm'
                      alt={`${each.name.first} ${each.name.last}`}
                      src={each.picture.thumbnail}
                    />
                    <h5 className='font-semibold'>
                      {each.name.first} {each.name.last}
                    </h5>
                  </div>
                  <p className='text-sm'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ratione modi dolorem dolore, optio deleniti necessitatibus
                    iure, repellendus possimus, dolores culpa soluta itaque vel?
                    Amet.
                  </p>
                </div>
              ))}
          <div className='h-24' />
        </div>
      </Container>
    </div>
  )
}

export default CommentSection
