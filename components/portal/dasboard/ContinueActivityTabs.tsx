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
import moment from 'moment'

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
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {!bookmarks ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className='space-y-4'>
                  <Skeleton className='w-full h-32 rounded-[2rem]' />
                  <div className='space-y-2 px-2'>
                    <Skeleton className='h-5 w-2/3 rounded-lg' />
                    <Skeleton className='h-10 w-full rounded-full' />
                  </div>
                </div>
              ))
            ) : bookmarks.length === 0 ? (
              <div className='col-span-full flex flex-col items-center justify-center p-12 text-center bg-background/40 backdrop-blur-md border border-dashed border-foreground-200 dark:border-foreground-800 rounded-[2.5rem]'>
                <div className='bg-secondary/10 p-6 rounded-[2rem] mb-6'>
                  <BookOpen className='text-secondary' size={40} />
                </div>
                <h3 className='text-xl font-black mb-3'>No bookmarks yet</h3>
                <p className='text-foreground-500 max-w-xs mb-8 font-medium leading-relaxed'>
                  Start reading and bookmark your favorite chapters to quickly
                  access them here.
                </p>
                <Button
                  color='secondary'
                  radius='full'
                  size='lg'
                  className='font-bold shadow-lg shadow-secondary/20'
                  as={Link}
                  href='/portal/chapters'
                >
                  Browse Chapters
                </Button>
              </div>
            ) : (
              bookmarks?.map((each, index) => {
                return (
                  <Card
                    key={index}
                    className='group bg-background/60 backdrop-blur-xl border border-foreground-100 dark:border-foreground-900 rounded-[2rem] shadow-lg hover:shadow-xl transition-all duration-300'
                  >
                    <CardBody className='p-0'>
                      <div className='relative bg-gradient-to-br from-secondary/10 to-primary/5 h-32 rounded-t-[2rem] grid place-items-center overflow-hidden'>
                        <div className='absolute top-4 right-4 z-10'>
                          {bookmarkLoadingIndex == index ? (
                            <Spinner size='sm' color='secondary' />
                          ) : (
                            <button
                              className='p-2 bg-background/80 backdrop-blur-md rounded-xl text-foreground-400 hover:text-danger transition-colors border border-foreground-100 dark:border-foreground-800 shadow-xl'
                              onClick={() => handleBookmark(each?.id, index)}
                            >
                              <MinusCircle size={18} />
                            </button>
                          )}
                        </div>

                        <div className='p-4 bg-background/40 backdrop-blur-sm rounded-3xl border border-foreground-100/20 shadow-2xl group-hover:scale-110 transition-transform duration-500'>
                          <BookMarked
                            size={40}
                            strokeWidth={1.5}
                            className='text-secondary'
                          />
                        </div>
                      </div>

                      <div className='space-y-4 p-3 md:p-6'>
                        <div className='space-y-1'>
                          <h3 className='font-black text-xl line-clamp-1'>
                            {each?.chapterLabel}
                          </h3>
                          <p className='text-tiny font-bold text-foreground-400 uppercase tracking-tighter'>
                            Page {each?.pageNumber || '1'} &bull; Marked{' '}
                            {moment(each?.dateCreated).fromNow()}
                          </p>
                        </div>
                        <Button
                          radius='full'
                          size='lg'
                          variant='flat'
                          color='secondary'
                          className='w-full font-black text-md bg-secondary/10 group-hover:bg-secondary group-hover:text-white transition-all'
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
            <div className='flex gap-2 items-center font-bold'>
              Liked
              <ThumbsUp size={15} />
            </div>
          }
        >
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {!userLikes ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className='space-y-4'>
                  <Skeleton className='w-full h-32 rounded-[2rem]' />
                  <div className='space-y-2 px-2'>
                    <Skeleton className='h-5 w-2/3 rounded-lg' />
                    <Skeleton className='h-10 w-full rounded-full' />
                  </div>
                </div>
              ))
            ) : userLikes.length === 0 ? (
              <div className='col-span-full flex flex-col items-center justify-center p-12 text-center bg-background/40 backdrop-blur-md border border-dashed border-foreground-200 dark:border-foreground-800 rounded-[2.5rem]'>
                <div className='bg-secondary/10 p-6 rounded-[2rem] mb-6'>
                  <ThumbsUp className='text-secondary' size={40} />
                </div>
                <h3 className='text-xl font-black mb-3'>No liked chapters</h3>
                <p className='text-foreground-500 max-w-xs mb-8 font-medium leading-relaxed'>
                  Like chapters while you read to save them to your collection.
                </p>
                <Button
                  color='secondary'
                  radius='full'
                  size='lg'
                  className='font-bold shadow-lg shadow-secondary/20'
                  as={Link}
                  href='/portal/chapters'
                >
                  Explore Chapters
                </Button>
              </div>
            ) : (
              userLikes?.map((each: ILike, index: number) => {
                return (
                  <Card
                    key={index}
                    className='group bg-background/60 backdrop-blur-xl border border-foreground-100 dark:border-foreground-900 rounded-[2rem] shadow-lg hover:shadow-xl transition-all duration-300'
                  >
                    <CardBody className='p-0'>
                      <div className='relative bg-gradient-to-br from-primary/10 to-secondary/5 h-32 rounded-t-[2rem] grid place-items-center overflow-hidden'>
                        <div className='absolute top-4 right-4 z-10'>
                          {likeLoadingIndex == index ? (
                            <Spinner size='sm' color='secondary' />
                          ) : (
                            <button
                              className='p-2 bg-background/80 backdrop-blur-md rounded-xl text-foreground-400 hover:text-danger transition-colors border border-foreground-100 dark:border-foreground-800 shadow-xl'
                              onClick={() => handleUnlike(each?.id, index)}
                            >
                              <MinusCircle size={18} />
                            </button>
                          )}
                        </div>

                        <div className='p-4 bg-background/40 backdrop-blur-sm rounded-3xl border border-foreground-100/20 shadow-2xl group-hover:scale-110 transition-transform duration-500'>
                          <ThumbsUp
                            size={40}
                            strokeWidth={1.5}
                            className='text-secondary'
                          />
                        </div>
                      </div>

                      <div className='space-y-4 p-3 md:p-6'>
                        <div className='space-y-1'>
                          <h3 className='font-black text-xl'>
                            Chapter {index + 1}
                          </h3>
                          <p className='text-tiny font-bold text-foreground-400 uppercase tracking-tighter'>
                            Liked on{' '}
                            {moment(each.dateCreated).format('MMM DD, YYYY')}
                          </p>
                        </div>
                        <Button
                          radius='full'
                          size='lg'
                          variant='flat'
                          color='secondary'
                          className='w-full font-black text-md bg-secondary/10 group-hover:bg-secondary group-hover:text-white transition-all'
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
