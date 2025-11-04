'use client'
import {
  likeChapter,
  unlikeChapter,
} from '@/api-utils/portal/requests/like.requests'
import Container from '@/components/elements/Container'
import CommentSection from '@/components/portal/chapters/CommentSection'
import useGetPortalChapter from '@/hooks/requests/portal/useGetPortalChapter'
import useGetPortalChapterLikes from '@/hooks/requests/portal/useGetPortalChapterLikes'
import useGetPortalPagesForChapter from '@/hooks/requests/portal/useGetPortalPagesForChapter'
import useGetPortalUser from '@/hooks/requests/portal/useGetPortalUser'
import useGetPortalUserLikes from '@/hooks/requests/portal/useGetPortalUserLikes'
import useSetHeaderNavigation from '@/hooks/useSetHeaderNavigation'
import {
  addToast,
  Button,
  Card,
  CardBody,
  CardFooter,
  Navbar,
  NavbarContent,
  NavbarItem,
  Spinner,
} from '@heroui/react'
import { Eye, Heart, MessageSquareText } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

const ReadChapterSection = () => {
  const { chapterId } = useParams()
  const [showComments, setShowComments] = useState(false)
  const { chapter, chapterLoading } = useGetPortalChapter(chapterId as string)
  const { pages, pagesLoading } = useGetPortalPagesForChapter(
    chapterId as string
  )

  useSetHeaderNavigation({
    title: chapterLoading
      ? 'Chapter Loading...'
      : `Read Chapter ${chapter?.number}`,
    backLink: `/portal/chapters/${chapterId}`,
    width: 'max-w-[700px]',
  })

  return (
    <>
      <Container className='space-y-6'>
        <div className='text-center space-y-2'>
          <h1 className='text-lg'>Chapter {chapter?.number}</h1>
          <h2 className='text-2xl font-semibold'>{chapter?.chapterLabel}</h2>
        </div>

        <Navbar
          shouldHideOnScroll
          classNames={{
            base: 'bg-transparent top-[4.3rem] !backdrop-blur-0 z-10',
            wrapper: 'h-[45px]',
          }}
        >
          <NavbarContent
            justify='center'
            className='flex justify-center w-full'
          >
            <NavbarItem className='w-full'>
              <ChapterStats setShowComments={setShowComments} />
            </NavbarItem>
          </NavbarContent>
        </Navbar>

        <div className='max-w-2xl mx-auto space-y-6 relative'>
          <div className='space-y-6'>
            {pagesLoading ? (
              <div className='h-[80vh] grid place-items-center'>
                <Spinner label='Please wait...' color='primary' />
              </div>
            ) : pages?.length == 0 ? (
              <div className='h-[80vh] text-center grid place-items-center text-foreground-500'>
                No Pages available for this chapter.
              </div>
            ) : (
              pages?.map((each, index) => (
                <Card key={index} radius='none'>
                  <CardBody className='!pointer-events-none'>
                    <div
                      className='space-y-3'
                      dangerouslySetInnerHTML={{ __html: each?.textContent }}
                    />
                  </CardBody>
                  <CardFooter>
                    <div className='text-center text-sm text-foreground-600 w-full'>
                      {index + 1}
                    </div>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
          <ChapterStats setShowComments={setShowComments} />
        </div>
      </Container>
      <CommentSection
        showComments={showComments}
        setShowComments={setShowComments}
      />
    </>
  )
}

export default ReadChapterSection

const ChapterStats = ({
  setShowComments,
}: {
  setShowComments: (showComment: boolean) => void
}) => {
  const { chapterId }: { chapterId: string } = useParams()
  const { chapter, mutateChapter } = useGetPortalChapter(chapterId as string)
  const [loadingLike, setLoadingLike] = useState(false)
  const { chapterLikes, mutateChapterLikes } =
    useGetPortalChapterLikes(chapterId)
  const { portalUser } = useGetPortalUser()
  const existingLike = chapterLikes?.find(
    (each) => each.userId == portalUser?.userId
  )
  console.log(chapterLikes)

  const handleLikeChapter = async () => {
    setLoadingLike(true)
    try {
      if (existingLike) {
        await unlikeChapter(existingLike?.id)
      } else await likeChapter({ chapterId })
      mutateChapter()
      mutateChapterLikes()
    } catch (error: any) {
      console.log(error)
      addToast({
        color: 'danger',
        title:
          error?.data?.message ||
          error?.message ||
          'Something went wrong. Please try again later.',
      })
    } finally {
      setLoadingLike(false)
    }
  }
  return (
    chapter && (
      <div className='flex justify-center gap-4 w-full'>
        <Button
          size='sm'
          startContent={<MessageSquareText size={15} />}
          variant='bordered'
          className='bg-background'
          color='primary'
          radius='full'
          onPress={() => setShowComments(true)}
        >
          {chapter?.commentsCount}
        </Button>
        <Button
          size='sm'
          startContent={
            <Heart
              size={15}
              className={existingLike ? 'fill-foreground' : ''}
            />
          }
          variant='bordered'
          className='bg-background disabled:cursor-progress disabled:!opacity-80'
          color='primary'
          radius='full'
          onPress={handleLikeChapter}
          isLoading={loadingLike}
        >
          {!loadingLike && chapter?.likesCount}
        </Button>
        {/* <Button
          size='sm'
          startContent={<Eye size={15} />}
          variant='bordered'
          className='bg-background'
          color='primary'
          radius='full'
        >
          2.7K
        </Button> */}
      </div>
    )
  )
}
