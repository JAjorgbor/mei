'use client'
import Container from '@/components/elements/Container'
import useGetPortalUser from '@/hooks/requests/portal/useGetPortalUser'
import useSetHeaderNavigation from '@/hooks/useSetHeaderNavigation'
import { Button, Skeleton } from '@heroui/react'
import Link from 'next/link'

const DashboardSection = () => {
  const { portalUser, portalUserLoading } = useGetPortalUser()
  console.log(portalUser)
  useSetHeaderNavigation({
    title: undefined,
    backLink: `/`,
  })
  console.log(portalUser)
  return (
    <div className='relative overflow-hidden min-h-[calc(100vh-140px)] flex flex-col items-center justify-center pb-20'>
      <div className='bg-gradient-radial from-secondary/40 via-secondary-800/10 to-transparent h-screen w-screen absolute -top-1/4 -left-1/4 rounded-full blur-3xl animate-pulsate pointer-events-none' />
      <div className='bg-gradient-radial from-secondary/40 via-secondary-800/10 to-transparent h-[80vh] w-[80vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl animate-pulsate [animation-delay:-2s] pointer-events-none' />

      <Container className='relative z-10 flex flex-col items-center justify-center max-w-4xl mx-auto px-4'>
        <div className='flex flex-col items-center space-y-12'>
          <div className='space-y-8 flex flex-col'>
            <div className='flex flex-col w-full'>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground'>
                This Is Not Fiction. This Is My Life.
              </h1>
              <div className='h-[3px] w-[90%] md:w-[85%] bg-gradient-to-r from-secondary-700 via-secondary to-transparent mt-4 opacity-90'></div>
            </div>

            <p className='text-foreground-300 max-w-3xl text-base md:text-lg leading-relaxed'>
              A living autobiography as my life unfolds &mdash; my childhood,
              family struggles, school years, love, relationships, hidden
              moments, and my journey to success.
            </p>
          </div>

          <div className='w-full max-w-lg mt-8'>
            {portalUserLoading ? (
              <div className='border border-foreground-100/20 bg-background/10 backdrop-blur-sm p-10 flex flex-col items-center justify-center space-y-8 rounded-sm'>
                <Skeleton className='h-6 w-32 rounded-lg' />
                <Skeleton className='h-12 w-full rounded-sm' />
              </div>
            ) : (
              <div className='border border-foreground-100/20 bg-background/10 backdrop-blur-sm p-8 md:p-10 flex flex-col items-center justify-center space-y-8 rounded-sm'>
                <div className='flex items-center w-full gap-4'>
                  <div className='h-px bg-foreground-100/20 flex-1'></div>
                  <span className='text-foreground font-bold text-xl'>
                    Chapter {portalUser?.stopped_reading?.chapterNumber || 1}
                  </span>
                  <div className='h-px bg-foreground-100/20 flex-1'></div>
                </div>

                <Button
                  as={Link}
                  href={
                    portalUser?.stopped_reading?.chapterId
                      ? `/portal/chapters/${portalUser.stopped_reading.chapterId}`
                      : '/portal/chapters'
                  }
                  color='secondary'
                  className='w-full text-lg font-bold py-6 bg-gradient-to-b from-secondary-500 to-secondary-800 shadow-lg shadow-secondary/20 hover:shadow-secondary/40 transition-all rounded-sm border border-secondary-600/30 text-white'
                  radius='none'
                >
                  {portalUser?.stopped_reading?.chapterId
                    ? 'Continue Reading'
                    : 'Start Reading'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default DashboardSection
