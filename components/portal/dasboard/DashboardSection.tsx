'use client'
import { currencyFormatter } from '@/app/utils/currencyFormatter'
import Container from '@/components/elements/Container'
import { Card, CardBody, CardHeader, Progress, Tab, Tabs } from '@heroui/react'
import {
  Bookmark,
  MinusCircle,
  Moon,
  Sparkle,
  Sun,
  Sunrise,
  ThumbsUp,
} from 'lucide-react'
import moment from 'moment'
import Link from 'next/link'
import React from 'react'

const DashboardSection = () => {
  const timeOfDay =
    moment().hour() < 12
      ? { icon: <Sunrise className='inline-block' />, greeting: 'morning' }
      : moment().hour() < 17
      ? { icon: <Sun className='inline-block' />, greeting: 'afternoon' }
      : { icon: <Moon className='inline-block' />, greeting: 'evening' }
  return (
    <>
      <Container className='space-y-10'>
        <div className='space-y-8'>
          <div className='text-xl flex items-start gap-3'>
            {timeOfDay?.icon} Good {timeOfDay.greeting}, Joshua
          </div>
          <Progress
            value={30}
            aria-label='Reading progress'
            label='Reading Progress'
            showValueLabel
            formatOptions={{ style: 'percent' }}
            maxValue={100}
          />

          <div className='py-4 px-3 bg-default-50 '>
            <div className='flex items-center gap-6'>
              <Sparkle size={35} className='text-yellow-500' />
              <div className='space-y-4'>
                <p>
                  Get Unlimited access to the best of Mie for less than{' '}
                  {currencyFormatter(10000)}
                </p>
                <p>
                  <Link
                    href='#'
                    className='border-b-2 border-dashed border-foreground'
                  >
                    Become a Member
                  </Link>
                </p>
              </div>
            </div>
          </div>
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
    </>
  )
}

export default DashboardSection
