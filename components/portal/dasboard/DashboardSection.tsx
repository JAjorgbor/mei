'use client'
import Container from '@/components/elements/Container'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Progress,
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

const DashboardSection = () => {
  const timeOfDay =
    moment().hour() < 12
      ? { icon: <Sunrise className='inline-block' />, greeting: 'morning' }
      : moment().hour() < 17
      ? { icon: <Sun className='inline-block' />, greeting: 'afternoon' }
      : { icon: <Moon className='inline-block' />, greeting: 'evening' }
  return (
    <div className='relative'>
      <div className='bg-gradient-radial from-secondary to-transparent to-60% h-screen absolute top-0 left-0 w-full' />
      <Container className='space-y-12 relative z-10'>
        <div className='space-y-10 '>
          <div className='text-xl flex items-start gap-3'>
            {timeOfDay?.icon} Good {timeOfDay.greeting}, Joshua
          </div>
          <Progress
            value={30}
            aria-label='Stage 1'
            color='secondary'
            label='Stage 1'
            showValueLabel
            formatOptions={{ style: 'percent' }}
            maxValue={100}
          />

          <Card className='md:w-1/2 lg:w-1/3 mx-auto'>
            <CardHeader className='text-2xl'>Chapter 1</CardHeader>
            <CardBody>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Inventore aliquid ad facilis voluptate omnis consequuntur harum ea
              voluptas libero, assumenda aliquam, tenetur temporibus. A,
              debitis.
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
          </Card>
        </div>

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
              <div className='space-y-4 divide-y divide-default-200'>
                {Array(4)
                  .fill(null)
                  .map((_, index) => (
                    <Card
                      key={index}
                      className='bg-background shadow-none'
                      radius='none'
                    >
                      <CardHeader>
                        <div className='flex items-center justify-between w-full'>
                          <h3 className='font-semibold text-lg'>
                            Chapter 1, Page 20
                          </h3>
                          <button className='text-danger'>
                            <MinusCircle />
                          </button>
                        </div>
                      </CardHeader>
                      <CardBody>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </CardBody>
                    </Card>
                  ))}
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
              {Array(2)
                .fill(null)
                .map((_, index) => (
                  <Card
                    key={index}
                    className='bg-background shadow-none'
                    radius='none'
                  >
                    <CardBody>
                      <div className='flex items-center justify-between w-full'>
                        <h3 className='font-semibold text-lg'>Chapter 1</h3>
                        <button className='text-danger'>
                          <MinusCircle />
                        </button>
                      </div>
                    </CardBody>
                  </Card>
                ))}
            </Tab>
          </Tabs>
        </div>
      </Container>
    </div>
  )
}

export default DashboardSection
