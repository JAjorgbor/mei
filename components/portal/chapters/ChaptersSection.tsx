'use client'
import Container from '@/components/elements/Container'
import useGetPortalAllChapters from '@/hooks/requests/portal/useGetPortalAllChapters'
import useSetHeaderNavigation from '@/hooks/useSetHeaderNavigation'
import {
  Card,
  CardBody,
  Skeleton,
  Image as HeroUIImage,
  Button,
} from '@heroui/react'
import { Lock } from 'lucide-react'
import Link from 'next/link'
import moment from 'moment'

const ChaptersSection = () => {
  useSetHeaderNavigation({
    title: 'Chapters',
    backLink: '/portal/dashboard',
  })
  const { allChapters, allChaptersLoading } = useGetPortalAllChapters({
    start: 0,
    stop: 100,
  })
  return (
    <Container>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-12'>
        {allChaptersLoading
          ? Array(6)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className='flex flex-row md:flex-col items-stretch h-40 md:h-auto gap-4'
                >
                  <Skeleton className='w-1/3 md:w-full aspect-auto md:aspect-[4/3] rounded-[2rem]' />
                  <div className='w-2/3 md:w-full flex flex-col gap-2 justify-between px-2 '>
                    <div className='space-y-2'>
                      <Skeleton className='h-6 w-3/4 rounded-lg' />
                      <Skeleton className='h-4 w-1/2 rounded-lg' />
                    </div>
                    <Skeleton className='h-8 w-1/3 rounded-lg !mt-auto' />
                  </div>
                </div>
              ))
          : allChapters?.map((each, index) => (
              <Card
                key={index}
                className='group bg-background/40 backdrop-blur-md border border-foreground-100 dark:border-foreground-900 rounded-[2rem] md:rounded-[2.5rem] shadow-lg hover:shadow-2xl transition-all duration-500 md:hover:-translate-y-2 overflow-hidden cursor-pointer flex flex-row md:flex-col items-stretch h-36 md:h-auto'
                as={Link}
                href={`/portal/chapters/${each?.id}`}
              >
                <div className='relative w-1/3 md:w-full aspect-auto md:aspect-[4/3] overflow-hidden'>
                  <HeroUIImage
                    alt={each?.chapterLabel}
                    src={each?.coverImage}
                    // className='size-full transition-transform duration-700 group-hover:scale-110'
                    classNames={{
                      img: 'object-cover size-full',
                      wrapper:
                        '!size-full !max-w-full aspect-auto transition-transform duration-700 group-hover:scale-110 ',
                    }}
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity' />

                  {/* Status Badge - Hidden on mobile to save space */}
                  <div className='absolute top-2 right-2 md:top-4 md:right-4 z-10 hidden md:block'>
                    <div className='bg-background/80 backdrop-blur-md p-1.5 md:p-2 rounded-xl md:rounded-2xl border border-foreground-100 dark:border-foreground-800 shadow-xl'>
                      <Lock
                        size={14}
                        className='md:size-[16px] text-foreground-400'
                      />
                    </div>
                  </div>

                  {/* Chapter Number Badge */}
                  <div className='absolute bottom-2 left-2 md:bottom-4 md:left-4 z-10'>
                    <div className='bg-secondary text-white px-2 py-0.5 md:px-4 md:py-1 rounded-full text-[10px] md:text-xs font-black tracking-widest uppercase shadow-lg shadow-secondary/30'>
                      Ch. {each?.number}
                    </div>
                  </div>
                </div>

                <CardBody className='flex-1 px-4 md:px-6 py-3 md:py-5 flex flex-col justify-between md:space-y-4'>
                  <div className='space-y-0.5 md:space-y-1'>
                    <h3 className='text-lg md:text-xl font-black leading-tight group-hover:text-secondary transition-colors line-clamp-1 md:line-clamp-2'>
                      {each?.chapterLabel}
                    </h3>
                    <p className='text-[10px] md:text-tiny text-foreground-400 font-bold uppercase tracking-tighter'>
                      {moment().format('MMMM YYYY')}
                    </p>
                  </div>

                  <div className='flex justify-between items-center pt-1 md:pt-2'>
                    <div className='hidden sm:flex -space-x-2'>
                      <div className='w-6 h-6 md:w-7 md:h-7 rounded-full border-2 border-background bg-secondary/10 flex items-center justify-center'>
                        <span className='text-[8px] md:text-[10px] font-bold text-secondary'>
                          +1k
                        </span>
                      </div>
                    </div>
                    <Button
                      size='sm'
                      variant='light'
                      color='secondary'
                      className='font-bold h-7 md:h-9 group-hover:bg-secondary group-hover:text-white transition-all rounded-full min-w-unit-0 px-3 md:px-4'
                      endContent={<Lock size={12} className='md:size-[14px]' />}
                    >
                      Read
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
      </div>
    </Container>
  )
}

export default ChaptersSection
