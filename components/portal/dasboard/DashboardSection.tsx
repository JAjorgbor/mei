'use client'
import Container from '@/components/elements/Container'
import ContinueActivityTabs from '@/components/portal/dasboard/ContinueActivityTabs'
import useGetPortalBookmarks from '@/hooks/requests/portal/useGetPortalBookmarks'
import useGetPortalUser from '@/hooks/requests/portal/useGetPortalUser'
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
  const { data: session } = useSession()

  const timeOfDay =
    moment().hour() < 12
      ? { icon: <Sunrise className='inline-block' />, greeting: 'morning' }
      : moment().hour() < 17
      ? { icon: <Sun className='inline-block' />, greeting: 'afternoon' }
      : { icon: <Moon className='inline-block' />, greeting: 'evening' }
  return (
    <div className='relative'>
      <div className='bg-gradient-radial from-secondary to-transparent to-50% h-screen absolute top-0 left-0 w-full' />
      <Container className='space-y-12 relative z-10'>
        <div className='space-y-10 '>
          <div className='text-xl flex items-start gap-3'>
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
            value={0}
            aria-label='Stage 1'
            color='secondary'
            label='Stage 1'
            showValueLabel
            formatOptions={{ style: 'percent' }}
            maxValue={100}
          />

          <Card className='md:w-1/2 lg:w-1/3 mx-auto'>
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
                <CardBody>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Inventore aliquid ad facilis voluptate omnis consequuntur
                  harum ea voluptas libero, assumenda aliquam, tenetur
                  temporibus. A, debitis.
                </CardBody>
                <CardFooter>
                  <Button
                    color='secondary'
                    endContent={<ArrowRight size={20} />}
                    className='w-full'
                  >
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
