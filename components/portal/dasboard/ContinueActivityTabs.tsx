'use client'
import { Card, CardBody, CardHeader, Tab, Tabs } from '@heroui/react'
import { Bookmark, MinusCircle, ThumbsUp } from 'lucide-react'
import React from 'react'

const ContinueActivityTabs = () => {
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
  )
}

export default ContinueActivityTabs
