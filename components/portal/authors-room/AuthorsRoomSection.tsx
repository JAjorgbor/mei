'use client'
import Container from '@/components/elements/Container'
import useGetPortalUser from '@/hooks/requests/portal/useGetPortalUser'
import useSetHeaderNavigation from '@/hooks/useSetHeaderNavigation'
import useGetPortalAllAuthorPosts from '@/hooks/requests/portal/useGetPortalAllAuthorPosts'
import { IAuthorPost } from '@/api-utils/global-interfaces/author-room.interfaces'
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Pagination,
  Spinner,
  Textarea,
  Image,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  addToast,
} from '@heroui/react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { createReaction } from '@/api-utils/portal/requests/reactions.requests'
import {
  Heart,
  MessageCircle,
  PencilLine,
  Send,
  Sparkles,
  Star,
  Smile,
} from 'lucide-react'
import moment from 'moment'
import React, { useState } from 'react'

const AuthorsRoomSection = () => {
  const { portalUser, portalUserLoading } = useGetPortalUser()

  const [page, setPage] = useState(1)
  const rowsPerPage = 6

  const {
    allPosts: allPostsData,
    allPostsLoading,
    mutateAllPosts,
  } = useGetPortalAllAuthorPosts(rowsPerPage, page)
  const posts = allPostsData?.items || []

  const handleReaction = async (emoji: string, postId: string) => {
    console.log(emoji)
    try {
      await createReaction({ reaction: emoji, authorRoomId: postId })
      mutateAllPosts()
    } catch (error: any) {
      console.log(error)
      addToast({
        color: 'danger',
        title:
          error?.data?.message || error?.message || 'Something went wrong.',
      })
    }
  }

  const pages = Math.ceil((allPostsData?.meta?.total || 0) / rowsPerPage) || 1

  useSetHeaderNavigation({
    title: "Author's Room",
    backLink: '/portal/dashboard',
  })

  // Only mock author status for demonstration if needed
  // In a real app, this would be checked against user roles
  const isAuthor = portalUser?.email === 'author@example.com' || false

  return (
    <div className='relative min-h-screen pb-20 overflow-x-hidden'>
      {/* Decorative Background Elements */}
      <div className='bg-gradient-radial from-secondary/20 via-transparent to-transparent h-screen w-screen absolute -top-1/4 -right-1/4 rounded-full blur-3xl' />

      <Container className='relative z-10 space-y-12'>
        <div className='max-w-3xl mx-auto space-y-8'>
          {/* Header Section */}
          <div className='text-center space-y-4'>
            <div className='inline-block p-3 bg-secondary/10 rounded-2xl mb-2'>
              <PencilLine className='text-secondary' size={32} />
            </div>
            <h1 className='text-4xl font-black bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground-600'>
              The Author&apos;s Room
            </h1>
            <p className='text-foreground-500 max-w-lg mx-auto leading-relaxed'>
              Step into my creative sanctuary. Here, I share the whispers behind
              the words and the echoes of my journey.
            </p>
            <div className='flex justify-center'>
              <div className='h-1 w-20 bg-secondary/30 rounded-full' />
            </div>
          </div>

          {/* Post Creation (Only for Author) */}
          {isAuthor && (
            <Card className='bg-background/60 backdrop-blur-xl border border-secondary/20 rounded-[2rem] shadow-xl overflow-hidden'>
              <CardHeader className='px-6 pt-6 flex gap-3 items-center'>
                <Avatar
                  icon={<PencilLine size={20} />}
                  className='bg-secondary text-white'
                />
                <div>
                  <p className='font-bold'>Create a thought</p>
                  <p className='text-tiny text-foreground-400'>
                    Share your echoes with readers
                  </p>
                </div>
              </CardHeader>
              <CardBody className='px-6'>
                <Textarea
                  placeholder="What's on your mind today?"
                  variant='flat'
                  className='bg-default-100/50 rounded-2xl'
                  disableAnimation
                  disableAutosize
                  classNames={{
                    input: 'text-lg',
                  }}
                />
              </CardBody>
              <CardFooter className='px-6 pb-6 justify-end'>
                <Button
                  color='secondary'
                  radius='full'
                  endContent={<Send size={16} />}
                >
                  Post Echo
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Posts Feed */}
          {allPostsLoading ? (
            <div className='flex flex-col items-center justify-center py-20'>
              <Spinner
                label='Loading thoughts...'
                size='lg'
                color='secondary'
              />
            </div>
          ) : posts.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-20 bg-default-50 rounded-3xl border-2 border-dashed border-default-200'>
              <p className='text-default-400'>No thoughts posted yet.</p>
            </div>
          ) : (
            <div className='space-y-8'>
              {posts.map((post) => (
                <Card
                  key={post.id}
                  className='bg-background/40 backdrop-blur-md border border-foreground-100 dark:border-foreground-900 rounded-[2rem] shadow-lg hover:shadow-xl transition-all duration-300'
                >
                  <CardHeader className='px-8 pt-8 flex justify-between items-start'>
                    <div className='flex gap-4 items-center'>
                      <Avatar
                        src='/logo.png'
                        className='w-12 h-12 border-2 border-secondary/20'
                      />
                      <div>
                        <div className='flex items-center gap-2'>
                          <p className='font-black text-lg'>Mei</p>
                          <span className='px-2 py-0.5 bg-secondary/10 text-secondary text-[10px] font-bold rounded-full uppercase tracking-wider'>
                            Author
                          </span>
                        </div>
                        <p className='text-tiny text-foreground-400'>
                          {moment(post.dateCreated).fromNow()}
                        </p>
                      </div>
                    </div>
                    {post?.chapterSummary?.number && (
                      <div className='bg-default-100/50 px-3 py-1 rounded-full flex items-center gap-2 border border-foreground-50'>
                        <Sparkles className='text-secondary' size={14} />
                        <span className='text-xs font-bold'>
                          Chapter {post.chapterSummary.number}
                        </span>
                      </div>
                    )}
                  </CardHeader>

                  <CardBody className='px-8 py-6'>
                    <p className='text-xl font-medium leading-relaxed text-foreground-700 dark:text-foreground-300 font-playfair'>
                      &ldquo;{post.text}&rdquo;
                    </p>
                  </CardBody>

                  <Divider className='opacity-50 mx-8 w-auto' />

                  <CardFooter className='px-8 py-6 flex flex-wrap gap-3 items-center'>
                    <div className='flex flex-wrap gap-2'>
                      {post.reactions &&
                        post.reactions.length > 0 &&
                        post.reactions.map((reaction) => (
                          <Button
                            key={reaction.key}
                            size='sm'
                            variant='flat'
                            radius='full'
                            className='bg-default-100/80 hover:bg-secondary/10 hover:text-secondary group transition-all h-9 px-3 gap-2 border border-transparent hover:border-secondary/20'
                          >
                            <span className='text-lg'>{reaction.emoji}</span>
                            <span className='font-bold'>{reaction.count}</span>
                          </Button>
                        ))}
                      <Popover placement='top'>
                        <PopoverTrigger>
                          <Button
                            isIconOnly
                            size='sm'
                            variant='light'
                            radius='full'
                            className='h-9 w-9 text-foreground-400 hover:text-secondary hover:bg-secondary/10'
                          >
                            <Smile size={20} />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className='p-0 border-none bg-transparent shadow-none'>
                          <Picker
                            data={data}
                            onEmojiSelect={(emoji: any) =>
                              handleReaction(emoji.native, post.id)
                            }
                            theme='auto'
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          <div className='flex w-full justify-center pt-4'>
            <Pagination
              isCompact
              showControls
              showShadow
              page={page}
              total={pages}
              color='secondary'
              onChange={(page) => setPage(page)}
              className='text-white'
            />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default AuthorsRoomSection
