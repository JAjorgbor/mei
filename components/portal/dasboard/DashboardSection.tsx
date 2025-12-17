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
} from 'lucide-react'
import moment from 'moment'
import { useSession } from 'next-auth/react'

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
    <div className='relative'>
      <div className='bg-gradient-radial from-secondary/50 to-transparent to-40% h-[70vh] md:h-screen absolute top-0 left-0 w-full bg-cover' />
      <Container className='space-y-16 relative z-10'>
        <div className='space-y-16 '>
          <div className='text-xl flex items-start gap-3 font-playfair'>
            {portalUserLoading ? (
              <Skeleton className='h-7 rounded-md max-w-64 w-full' />
            ) : (
              <>
                {timeOfDay?.icon} Good {timeOfDay.greeting},{' '}
                {portalUser?.firstName}
              </>
            )}
          </div>
          <Progress
            value={portalUser?.stage?.currentExperience || 0}
            aria-label={`Stage ${portalUser?.stage?.currentStage || '-'}`}
            color='secondary'
            label={`Stage ${portalUser?.stage?.currentStage || '-'}`}
            showValueLabel
            formatOptions={{ style: 'percent' }}
            maxValue={100}
            classNames={{
              base: 'relative',
              value:
                'absolute -bottom-8 left-0 text-foreground-700 dark:text-foreground-400',
              label: 'text-foreground-700 dark:text-foreground-400',
            }}
          />

          <Card className='max-w-md mx-auto bg-background border border-foreground-200 dark:border-foreground-600'>
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
                <CardHeader className='text-2xl'>Chapter 1</CardHeader>
                <CardBody className='text-foreground-500'>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Inventore aliquid ad facilis voluptate omnis consequuntur
                  harum ea voluptas libero, assumenda aliquam, tenetur
                  temporibus. A, debitis.
                </CardBody>
                <CardFooter>
                  <Button color='secondary' className='w-full' radius='full'>
                    Continue Reading
                  </Button>
                </CardFooter>
              </>
            )}
          </Card>
        </div>

        <ContinueActivityTabs />
      </Container>
    </div>
  )
}

export default DashboardSection
