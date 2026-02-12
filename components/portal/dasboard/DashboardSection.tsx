'use client'
import Container from '@/components/elements/Container'
import ContinueActivityTabs from '@/components/portal/dasboard/ContinueActivityTabs'
import useGetPortalBookmarks from '@/hooks/requests/portal/useGetPortalBookmarks'
import useGetPortalUser from '@/hooks/requests/portal/useGetPortalUser'
import useSetHeaderNavigation from '@/hooks/useSetHeaderNavigation'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Progress,
  Skeleton,
  Tab,
  Tabs,
} from '@heroui/react'
import {
  ArrowRight,
  Bookmark,
  MinusCircle,
  Moon,
  Sun,
  Sunrise,
  ThumbsUp,
  Sparkles,
} from 'lucide-react'
import moment from 'moment'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const DashboardSection = () => {
  const { portalUser, portalUserLoading } = useGetPortalUser()
  const { bookmarks } = useGetPortalBookmarks()

  console.log(portalUser)

  const timeOfDay =
    moment().hour() < 12
      ? { icon: <Sunrise className='inline-block' />, greeting: 'morning' }
      : moment().hour() < 17
        ? { icon: <Sun className='inline-block' />, greeting: 'afternoon' }
        : { icon: <Moon className='inline-block' />, greeting: 'evening' }
  useSetHeaderNavigation({
    title: undefined,
    backLink: `/`,
  })
  return (
    <div className='relative overflow-hidden'>
      <div className='bg-gradient-radial from-secondary/40 via-secondary-800/10 to-transparent h-screen w-screen absolute -top-1/4 -left-1/4 rounded-full blur-3xl animate-pulsate' />
      <div className='bg-gradient-radial from-secondary/40 via-secondary-800/10 to-transparent h-[80vh] w-[80vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl animate-pulsate [animation-delay:-2s]' />
      <Container className='space-y-16 relative z-10'>
        <div className='space-y-16 '>
          <div className='space-y-4'>
            <div className='text-xl flex items-start gap-3 font-dancing-script'>
              {portalUserLoading ? (
                <Skeleton className='h-7 rounded-md max-w-64 w-full' />
              ) : (
                <>
                  {/* {timeOfDay?.icon} Good {timeOfDay.greeting},{' '}
                {portalUser?.firstName} */}
                  My Life in Chapters
                </>
              )}
            </div>
            <p className='text-foreground-700 dark:text-foreground-400 max-w-lg'>
              You are reading it now, my struggle, my life, my growth, my
              darkest moments, my story from childhood till now &mdash; raw,
              messy, unfiltered.
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto'>
            <div className='relative w-full'>
              <Card className='bg-background border border-foreground-200 dark:border-foreground-600 h-full'>
                {portalUserLoading ? (
                  <>
                    <CardHeader>
                      <Skeleton className='h-6 w-48 rounded' />
                    </CardHeader>
                    <CardBody className='space-y-2'>
                      <Skeleton className='w-full h-5 rounded' />
                      <Skeleton className='w-4/5 h-5 rounded' />
                      <Skeleton className='w-full h-5 rounded' />
                      <Skeleton className='w-3/5 h-5 rounded' />
                    </CardBody>
                    <CardFooter>
                      <Skeleton className='rounded-xl h-10 w-full' />
                    </CardFooter>
                  </>
                ) : (
                  <>
                    <CardHeader className='text-2xl'>
                      Chapter {portalUser?.stopped_reading?.chapterNumber}
                    </CardHeader>
                    <CardBody className='text-foreground-500'>
                      {portalUser?.stopped_reading?.chapterSnippet}
                    </CardBody>
                    <CardFooter>
                      <Button
                        color='secondary'
                        className='w-full'
                        radius='full'
                        as={Link}
                        href={`/portal/chapters/${portalUser?.stopped_reading?.chapterId}`}
                      >
                        Continue Reading
                      </Button>
                    </CardFooter>
                  </>
                )}
              </Card>
            </div>

            <Card className='bg-gradient-to-br from-secondary/20 to-primary/10 border-secondary/30 relative overflow-hidden h-full'>
              <div className='absolute -top-4 -right-4 p-4 opacity-10 rotate-12'>
                <Sparkles size={120} />
              </div>
              <CardHeader className='flex gap-3 items-center'>
                <div className='bg-secondary/20 p-2 rounded-lg'>
                  <Sparkles className='text-secondary' size={20} />
                </div>
                <p className='font-semibold'>Exclusive Access</p>
              </CardHeader>
              <CardBody>
                <p className='text-lg leading-snug'>
                  Want to start reading beyond chapter 15? unlock the rest of{' '}
                  <span className='font-bold text-secondary italic'>
                    My Echoes
                  </span>
                </p>
              </CardBody>
              <CardFooter>
                <Button
                  as={Link}
                  href='/pricing'
                  color='secondary'
                  variant='shadow'
                  fullWidth
                  radius='full'
                >
                  Unlock Full Access
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        <ContinueActivityTabs />
      </Container>
    </div>
  )
}

export default DashboardSection
