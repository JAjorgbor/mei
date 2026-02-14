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
        <div className='space-y-8 '>
          <div className='space-y-4'>
            <div className='flex items-start gap-3 '>
              {portalUserLoading ? (
                <Skeleton className='h-7 rounded-md max-w-64 w-full' />
              ) : (
                <>
                  {/* {timeOfDay?.icon} Good {timeOfDay.greeting},{' '}
                {portalUser?.firstName} */}
                  <span className='relative inline-block font-dancing-script text-3xl'>
                    My Life in Chapters
                    <svg
                      className='absolute -bottom-2 left-0 w-full h-[10px] text-secondary'
                      viewBox='0 0 100 20'
                      preserveAspectRatio='none'
                    >
                      {/* Base thick stroke */}
                      <path
                        d='M2 13C25 9 50 15 75 11C90 9 98 13 98 13'
                        stroke='currentColor'
                        strokeWidth='6'
                        strokeLinecap='round'
                        fill='none'
                        className='opacity-20'
                      />
                      {/* Main textured stroke */}
                      <path
                        d='M4 12C20 8 45 16 70 10C85 6 96 12 96 12'
                        stroke='currentColor'
                        strokeWidth='4'
                        strokeLinecap='round'
                        fill='none'
                        className='opacity-50'
                      />
                      {/* Fine bristle detail */}
                      <path
                        d='M8 15C30 11 55 18 80 12C90 10 94 14 94 14'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        fill='none'
                        className='opacity-40'
                      />
                    </svg>
                  </span>
                </>
              )}
            </div>
            <p className='text-foreground-700 dark:text-foreground-400 max-w-lg'>
              You are reading it now, my struggle, my life, my growth, my
              darkest moments, my story from childhood till now &mdash; raw,
              messy, unfiltered.
            </p>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch'>
            <div className='lg:col-span-2 relative group'>
              <div className='absolute -inset-0.5 bg-gradient-to-r from-secondary-500 to-primary-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200'></div>
              <Card className='relative bg-background/60 backdrop-blur-xl border border-foreground-100 dark:border-foreground-800 h-full overflow-hidden rounded-[2rem] shadow-2xl'>
                <div className='bg-secondary/10 px-6 py-3 border-b border-foreground-50 dark:border-foreground-900 flex justify-between items-center'>
                  <div className='flex items-center gap-2'>
                    <div className='w-2 h-2 rounded-full bg-secondary animate-pulse' />
                    <span className='text-[11px] font-bold uppercase tracking-[0.2em] text-secondary-600 dark:text-secondary-400'>
                      Resume your journey
                    </span>
                  </div>
                </div>
                {portalUserLoading ? (
                  <>
                    <CardHeader className='px-8 pt-8'>
                      <Skeleton className='h-10 w-64 rounded-lg' />
                    </CardHeader>
                    <CardBody className='px-8 space-y-4'>
                      <Skeleton className='w-full h-5 rounded' />
                      <Skeleton className='w-11/12 h-5 rounded' />
                      <Skeleton className='w-4/5 h-5 rounded' />
                    </CardBody>
                    <CardFooter className='px-8 pb-8'>
                      <Skeleton className='rounded-full h-12 w-48' />
                    </CardFooter>
                  </>
                ) : (
                  <>
                    <CardHeader className='px-4 md:px-8 md:pt-8 flex-col items-start gap-1'>
                      <p className='text-tiny uppercase text-foreground-400 font-medium tracking-wider'>
                        Current Progress
                      </p>
                      <h2 className='text-4xl font-black bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground-600'>
                        Chapter {portalUser?.stopped_reading?.chapterNumber}
                      </h2>
                    </CardHeader>
                    <CardBody className='px-4 md:px-8 text-foreground-500 text-lg italic font-medium leading-relaxed opacity-80'>
                      <div className='line-clamp-4'>
                        &ldquo;{portalUser?.stopped_reading?.chapterSnippet}
                        &rdquo;
                      </div>
                    </CardBody>
                    <CardFooter className='px-4 md:px-8 md:pb-8 justify-start'>
                      <Button
                        color='secondary'
                        className='text-md font-bold px-10 shadow-lg shadow-secondary/30 hover:shadow-secondary/40 transition-all hover:-translate-y-0.5'
                        radius='full'
                        size='lg'
                        as={Link}
                        href={`/portal/chapters/${portalUser?.stopped_reading?.chapterId}`}
                        endContent={
                          <ArrowRight
                            size={20}
                            className='group-hover:translate-x-1 transition-transform'
                          />
                        }
                      >
                        Continue Reading
                      </Button>
                    </CardFooter>
                  </>
                )}
              </Card>
            </div>

            <Card className='bg-gradient-to-br from-secondary/30 via-secondary/10 to-primary/20 border-secondary/20 relative overflow-hidden h-full flex flex-col rounded-[2rem] shadow-xl group/cta hover:border-secondary/40 transition-colors'>
              <div className='absolute -top-10 -right-10 p-4 opacity-[0.03] rotate-12 pointer-events-none group-hover/cta:scale-110 group-hover/cta:rotate-45 transition-transform duration-700'>
                <Sparkles size={240} />
              </div>
              <CardHeader className='px-4 pt-4 md:px-6 md:pt-8 flex gap-4 items-center'>
                <div className='bg-secondary shadow-lg shadow-secondary/40 p-2.5 rounded-2xl'>
                  <Sparkles className='text-white' size={24} />
                </div>
                <div className='flex flex-col'>
                  <p className='font-bold text-lg leading-tight'>Unlock All</p>
                  <p className='text-tiny text-foreground-500 font-semibold uppercase tracking-tighter'>
                    Premium Access
                  </p>
                </div>
              </CardHeader>
              <CardBody className='px-6 flex-grow flex items-center mb-4'>
                <p className='text-xl leading-tight font-medium'>
                  Ready to read beyond chapter 15? unlock the full{' '}
                  <span className='font-black text-secondary decoration-secondary/30 underline-offset-4 underline font-dancing-script text-xl ml-2 inline-block'>
                    My Echoes
                  </span>{' '}
                  experience.
                </p>
              </CardBody>
              <CardFooter className='px-3 md:px-6 md:pb-8 justify-start'>
                <Button
                  as={Link}
                  href='/pricing'
                  color='secondary'
                  variant='shadow'
                  radius='full'
                  className='font-bold px-8 h-12 bg-secondary text-white shadow-xl shadow-secondary/20'
                >
                  Get Full Access
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
