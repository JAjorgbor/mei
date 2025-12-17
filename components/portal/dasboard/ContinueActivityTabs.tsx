'use client'
import { deletePortalUserBookmark } from '@/api-utils/portal/requests/bookmark.requests'
import { unlikeChapter } from '@/api-utils/portal/requests/like.requests'
import useGetPortalBookmarks from '@/hooks/requests/portal/useGetPortalBookmarks'
import useGetPortalUserLikes from '@/hooks/requests/portal/useGetPortalUserLikes'
import { ILike } from '@/api-utils/global-interfaces/like.interface'
import {
  addToast,
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
  Tab,
  Tabs,
} from '@heroui/react'
import {
  Bookmark,
  BookMarked,
  BookOpen,
  MinusCircle,
  Search,
  ThumbsUp,
} from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

const ContinueActivityTabs = () => {
  const { bookmarks, bookmarksLoading, mutateBookmarks } =
    useGetPortalBookmarks()
  const { userLikes, userLikesLoading, mutateUserLikes } =
    useGetPortalUserLikes()
  const [bookmarkLoadingIndex, setBookmarkLoadingIndex] = useState(-1)
  const [likeLoadingIndex, setLikeLoadingIndex] = useState(-1)

  const handleBookmark = async (bookmarkId: string, index: number) => {
    setBookmarkLoadingIndex(index)
    try {
      await deletePortalUserBookmark(bookmarkId as string)
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
      setBookmarkLoadingIndex(-1)
    }
  }

  const handleUnlike = async (likeId: string, index: number) => {
    setLikeLoadingIndex(index)
    try {
      await unlikeChapter(likeId)
      mutateUserLikes()
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
      setLikeLoadingIndex(-1)
    }
  }

  return (
    <div>
      <Tabs aria-label='Options' variant='underlined'>
        <Tab
          key='bookmarks'
          title={
            <div className='flex gap-2 items-center'>
              Bookmarks
              <Bookmark size={15} />
            </div>
          }
        >
          <div className='grid grid-cols-2 lg:grid-cols-3 gap-4'>
            {!bookmarks ? (
              Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className='rounded-xl overflow-hidden border border-foreground-100 dark:border-foreground-900'
                >
                  <Skeleton className='h-44 rounded-xl' />
                  <div className='p-3 space-y-3'>
                    <Skeleton className='h-5 rounded-md w-1/2 mx-auto' />
                    <Skeleton className='h-10 rounded-full w-full' />
                  </div>
                </div>
              ))
            ) : bookmarks.length === 0 ? (
              <div className='col-span-full flex flex-col items-center justify-center p-8 text-center border border-dashed border-foreground-200 rounded-xl'>
                <div className='bg-default-100 p-4 rounded-full mb-4'>
                  <BookOpen className='text-foreground-500' size={32} />
                </div>
                <h3 className='text-lg font-semibold mb-2'>No bookmarks yet</h3>
                <p className='text-foreground-500 max-w-xs mb-4'>
                  Start reading and bookmark your favorite chapters to quickly
                  access them here.
                </p>
                <Button color='primary' as={Link} href='/portal/chapters'>
                  Browse Chapters
                </Button>
              </div>
            ) : (
              bookmarks?.map((each, index) => {
                return (
                  <Card
                    key={index}
                    className='bg-background shadow-none border border-foreground-100 dark:border-foreground-900 p-0'
                  >
                    <CardBody className='p-0'>
                      <div className='relative bg-default-200 h-44 rounded-xl grid place-items-center'>
                        <div className='absolute top-4 right-4'>
                          {bookmarkLoadingIndex == index ? (
                            <Spinner size='sm' />
                          ) : (
                            <button
                              className='text-secondary'
                              onClick={() => handleBookmark(each?.id, index)}
                            >
                              <MinusCircle />
                            </button>
                          )}
                        </div>

                        <BookMarked size={45} strokeWidth={1} />
                      </div>

                      <div className='space-y-3 p-3'>
                        <h3 className='font-semibold text-lg text-center w-full'>
                          {each?.chapterLabel}
                        </h3>
                        <p className='text-center text-sm text-foreground-500'>
                          Page {each?.pageNumber || '[Number]'}
                        </p>
                        <Button
                          radius='full'
                          fullWidth
                          variant='ghost'
                          color='primary'
                          as={Link}
                          href={`/portal/chapters/${each?.chapterId}/read#${each.pageId}`}
                        >
                          Read Again
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                )
              })
            )}
          </div>
        </Tab>
        <Tab
          key='liked'
          title={
            <div className='flex gap-2 items-center'>
              Liked
              <ThumbsUp size={15} />
            </div>
          }
        >
          <div className='grid grid-cols-2 lg:grid-cols-3 gap-4'>
            {!userLikes ? (
              Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className='rounded-xl overflow-hidden border border-foreground-100 dark:border-foreground-900'
                >
                  <Skeleton className='h-44 rounded-xl' />
                  <div className='p-3 space-y-3'>
                    <Skeleton className='h-5 rounded-md w-1/2 mx-auto' />
                    <Skeleton className='h-10 rounded-full w-full' />
                  </div>
                </div>
              ))
            ) : userLikes.length === 0 ? (
              <div className='col-span-full flex flex-col items-center justify-center p-8 text-center border border-dashed border-foreground-200 rounded-xl'>
                <div className='bg-default-100 p-4 rounded-full mb-4'>
                  <ThumbsUp className='text-foreground-500' size={32} />
                </div>
                <h3 className='text-lg font-semibold mb-2'>
                  No liked chapters
                </h3>
                <p className='text-foreground-500 max-w-xs mb-4'>
                  Like chapters while you read to save them to your collection.
                </p>
                <Button color='primary' as={Link} href='/portal/chapters'>
                  Explore Chapters
                </Button>
              </div>
            ) : (
              userLikes?.map((each: ILike, index: number) => {
                return (
                  <Card
                    key={index}
                    className='bg-background shadow-none border border-foreground-100 dark:border-foreground-900 p-0'
                  >
                    <CardBody className='p-0'>
                      <div className='relative bg-default-200 h-44 rounded-xl grid place-items-center'>
                        <div className='absolute top-4 right-4'>
                          {likeLoadingIndex == index ? (
                            <Spinner size='sm' />
                          ) : (
                            <button
                              className='text-secondary'
                              onClick={() => handleUnlike(each?.id, index)}
                            >
                              <MinusCircle />
                            </button>
                          )}
                        </div>

                        <ThumbsUp size={45} strokeWidth={1} />
                      </div>

                      <div className='space-y-3 p-3'>
                        <h3 className='font-semibold text-lg text-center w-full'>
                          Chapter {index + 1}
                        </h3>
                        <p className='text-center text-sm text-foreground-500'>
                          Liked on{' '}
                          {new Date(each.dateCreated).toLocaleDateString()}
                        </p>
                        <Button
                          radius='full'
                          fullWidth
                          variant='ghost'
                          color='primary'
                          as={Link}
                          href={`/portal/chapters/${each?.chapterId}/read`}
                        >
                          Read Again
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                )
              })
            )}
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}

export default ContinueActivityTabs
