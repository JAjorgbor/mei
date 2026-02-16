'use client'
import { IBookmark } from '@/api-utils/global-interfaces/bookmark.interfaces'
import {
  createPortalUserBookmark,
  deletePortalUserBookmark,
} from '@/api-utils/portal/requests/bookmark.requests'
import {
  likeChapter,
  unlikeChapter,
} from '@/api-utils/portal/requests/like.requests'
import Container from '@/components/elements/Container'
import CanvasPageRenderer from '@/components/portal/chapters/CanvasPageRenderer'
import CommentSection from '@/components/portal/chapters/CommentSection'
import useGetPortalAllChapters from '@/hooks/requests/portal/useGetPortalAllChapters'
import useGetPortalBookmarks from '@/hooks/requests/portal/useGetPortalBookmarks'
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
  Skeleton,
  Spinner,
  Tooltip,
} from '@heroui/react'
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  MessageSquareText,
} from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useMemo, useState } from 'react'

const ReadChapterSection = () => {
  const { chapterId } = useParams()
  const [showComments, setShowComments] = useState(false)
  const { chapter, chapterLoading } = useGetPortalChapter(chapterId as string)
  const { pages, pagesLoading } = useGetPortalPagesForChapter(
    chapterId as string,
  )

  useSetHeaderNavigation({
    title: '',
    backLink: `/portal/chapters/${chapterId}`,
    width: 'max-w-[700px]',
  })

  const { allChapters, allChaptersLoading } = useGetPortalAllChapters({
    start: chapter
      ? chapter?.number - 2 > 0
        ? chapter?.number - 2
        : 0
      : undefined,
    stop: chapter ? chapter?.number + 2 : undefined,
  })
  const prevChapter = useMemo(() => {
    if (!allChaptersLoading && allChapters && chapter) {
      return allChapters.find((c) => c.number < chapter.number) || undefined
    }
    return undefined
  }, [allChapters, allChaptersLoading, chapter])

  const nextChapter = useMemo(() => {
    if (!allChaptersLoading && allChapters && chapter) {
      return allChapters.find((c) => c.number > chapter.number) || undefined
    }
    return undefined
  }, [allChapters, allChaptersLoading, chapter])
  const { bookmarks } = useGetPortalBookmarks()
  return (
    <>
      <Container className='space-y-6 mb-16'>
        {chapter && (
          <div className='text-center space-y-2'>
            <h1 className='text-lg'>Chapter {chapter?.number}</h1>
            <h2 className='text-2xl font-semibold'>{chapter?.chapterLabel}</h2>
          </div>
        )}

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

        <div className='max-w-2xl mx-auto space-y-6 relative min-h-screen'>
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
              pages?.map((each, index) => {
                return (
                  <div key={each.id}>
                    <span className='text-secondary mr-2 text-xl inline-block font-bold'>
                      {index + 1}
                    </span>
                    <div
                      className='space-y-3 font-playfair [&>*:first-child]:!inline-block [&>*:last-child]:inline-block !pointer-events-none !select-none'
                      dangerouslySetInnerHTML={{ __html: each.textContent }}
                    />

                    {/* <CanvasPageRenderer
                      className='space-y-3 font-playfair [&>*:first-child]:!inline-block [&>*:last-child]:inline-block'
                      htmlContent={each.textContent}
                    /> */}
                    <BookmarkButton
                      bookmark={bookmarks?.find(
                        (bookmark) => bookmark.pageId == each.id,
                      )}
                      pageId={each.id}
                    />
                  </div>
                )
              })
            )}
          </div>
          {pages?.length && <ChapterStats setShowComments={setShowComments} />}
        </div>
      </Container>
      <div className='fixed bottom-3 w-full z-[300] px-4'>
        <div className='flex gap-1 max-w-sm mx-auto bg-background rounded-xl items-center border border-foreground-200 dark:border-foreground-900 justify-between h-11'>
          {allChaptersLoading ? (
            <Skeleton className='size-10 rounded-l-lg' />
          ) : prevChapter ? (
            <Button
              as={Link}
              className='border-0 hover:border !rounded-l-lg'
              variant='bordered'
              color='primary'
              radius='none'
              startContent={<ChevronLeft />}
              href={`/portal/chapters/${prevChapter?.id}/read`}
              aria-label='Previous Chapter'
              isIconOnly
            />
          ) : (
            <span className='size-10' />
          )}
          {!chapterLoading ? (
            <>Chapter {chapter?.number}</>
          ) : (
            'Chapter Loading...'
          )}
          {allChaptersLoading ? (
            <Skeleton className='size-10 !rounded-r-lg' />
          ) : nextChapter ? (
            <Button
              as={Link}
              className='border-0 hover:border !rounded-r-lg'
              variant='bordered'
              color='primary'
              radius='none'
              endContent={<ChevronRight />}
              href={`/portal/chapters/${nextChapter?.id}/read`}
              aria-label='Next Chapter'
              isIconOnly
            />
          ) : (
            <span className='size-10' />
          )}
        </div>
      </div>
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
    (each) => each.userId == portalUser?.userId,
  )

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
      <div className='flex justify-center gap-3 w-full'>
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

const BookmarkButton = ({
  bookmark,
  pageId,
}: {
  bookmark: IBookmark | undefined
  pageId: string
}) => {
  const { id: bookmarkId } = bookmark || {}
  const [isLoading, setIsLoading] = useState(false)
  const { portalUser } = useGetPortalUser()
  const { mutateBookmarks } = useGetPortalBookmarks()

  const handleBookmark = async () => {
    setIsLoading(true)
    try {
      if (bookmark) {
        await deletePortalUserBookmark(bookmarkId as string)
      } else {
        await createPortalUserBookmark(
          portalUser?.userId as string,
          pageId as string,
        )
      }
      mutateBookmarks()
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
      setIsLoading(false)
    }
  }

  return (
    <Tooltip content={bookmark ? 'Remove Bookmark' : 'Bookmark'} showArrow>
      <button type='button' className='inline-block' onClick={handleBookmark}>
        {isLoading ? (
          <Spinner size='sm' />
        ) : (
          <Bookmark
            size={20}
            className={`text-foreground-500 ${
              bookmark ? 'fill-foreground-500' : ''
            }`}
          />
        )}
      </button>
    </Tooltip>
  )
}
