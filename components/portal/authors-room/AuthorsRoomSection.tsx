'use client'
import Container from '@/components/elements/Container'
import useGetPortalUser from '@/hooks/requests/portal/useGetPortalUser'
import useSetHeaderNavigation from '@/hooks/useSetHeaderNavigation'
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Skeleton,
  Textarea,
  Image,
  Tooltip,
} from '@heroui/react'
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

interface IReaction {
  emoji: string
  count: number
  key: string
}

interface IAuthorPost {
  id: string
  content: string
  chapterNumber?: number
  dateCreated: string
  reactions: IReaction[]
}

const AuthorsRoomSection = () => {
  const { portalUser, portalUserLoading } = useGetPortalUser()
  const [posts, setPosts] = useState<IAuthorPost[]>([
    {
      id: '1',
      content:
        'Writing Chapter 15 was one of the most emotional experiences for me. Reliving those moments through ink and paper felt like opening an old wound, but one that was finally healing. I hope you guys felt the raw emotion in every word.',
      chapterNumber: 15,
      dateCreated: moment().subtract(2, 'days').toISOString(),
      reactions: [
        { emoji: '❤️', count: 24, key: 'heart' },
        { emoji: '🥺', count: 12, key: 'emotional' },
        { emoji: '✨', count: 8, key: 'sparkles' },
      ],
    },
    {
      id: '2',
      content:
        "I've been thinking a lot about the theme of 'Echoes'. How our past self speaks to us in the quiet moments. Do you ever feel like you're competing with a version of yourself that no longer exists?",
      dateCreated: moment().subtract(5, 'days').toISOString(),
      reactions: [
        { emoji: '🤔', count: 15, key: 'thinking' },
        { emoji: '🙌', count: 9, key: 'celebrate' },
      ],
    },
  ])

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
                  {post.chapterNumber && (
                    <div className='bg-default-100/50 px-3 py-1 rounded-full flex items-center gap-2 border border-foreground-50'>
                      <Sparkles className='text-secondary' size={14} />
                      <span className='text-xs font-bold'>
                        Chapter {post.chapterNumber}
                      </span>
                    </div>
                  )}
                </CardHeader>

                <CardBody className='px-8 py-6'>
                  <p className='text-xl font-medium leading-relaxed text-foreground-700 dark:text-foreground-300 font-playfair'>
                    &ldquo;{post.content}&rdquo;
                  </p>
                </CardBody>

                <Divider className='opacity-50 mx-8 w-auto' />

                <CardFooter className='px-8 py-6 flex flex-wrap gap-3 items-center'>
                  <div className='flex flex-wrap gap-2'>
                    {post.reactions.map((reaction) => (
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
                    <Tooltip content='Add reaction'>
                      <Button
                        isIconOnly
                        size='sm'
                        variant='light'
                        radius='full'
                        className='h-9 w-9 text-foreground-400 hover:text-secondary hover:bg-secondary/10'
                      >
                        <Smile size={20} />
                      </Button>
                    </Tooltip>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default AuthorsRoomSection
