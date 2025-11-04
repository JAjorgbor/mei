'use client'
import Container from '@/components/elements/Container'
import useGetPortalAllChapters from '@/hooks/requests/portal/useGetPortalAllChapters'
import useSetHeaderNavigation from '@/hooks/useSetHeaderNavigation'
import { Card, CardBody, Skeleton, Image as HeroUIImage } from '@heroui/react'
import { Lock } from 'lucide-react'
import Link from 'next/link'

const ChaptersSection = () => {
  useSetHeaderNavigation({
    title: 'Chapters',
    backLink: '/portal/dashboard',
  })
  const { allChapters, allChaptersLoading } = useGetPortalAllChapters({
    start: 0,
    stop: 100,
  })
  console.log(allChapters)
  return (
    <Container>
      <div className='grid md:grid-cols-3 gap-4'>
        {allChaptersLoading
          ? Array(5)
              .fill(null)
              .map((_, index) => (
                <Card
                  className='flex flex-row md:flex-col items-stretch h-36 md:h-auto'
                  key={index}
                >
                  <CardBody className='p-0 w-1/2 md:w-full'>
                    <Skeleton className='w-full h-full  md:h-48' />
                  </CardBody>
                  <CardBody className='w-1/2 md:w-full  space-y-3'>
                    <div className='flex flex-row justify-between items-center'>
                      <Skeleton className='h-7 rounded-xl w-full max-w-44' />
                    </div>
                    <div className='space-y-2'>
                      <Skeleton className='h-5 rounded-xl w-full max-w-full' />
                      <Skeleton className='h-5 rounded-xl w-full max-w-32' />
                      <Skeleton className='h-5 rounded-xl w-full max-w-48' />
                    </div>
                  </CardBody>
                </Card>
              ))
          : allChapters?.map((each, index) => (
              <Card
                className='flex flex-row md:flex-col items-stretch h-36 md:h-auto'
                key={index}
                as={Link}
                href={`/portal/chapters/${each?.id}`}
              >
                <CardBody className='p-0 w-1/2 md:w-full'>
                  <div className='h-full w-full flex flex-col'>
                    <HeroUIImage
                      alt='cover image'
                      src={each?.coverImage}
                      className='size-full object-cover object-center md:h-48'
                      classNames={{
                        wrapper: 'min-w-full h-fit flex-1 overflow-hidden',
                        // img: 'size-full object-cover',
                      }}
                      // classNames={{ wrapper: 'min-w-full max-h-min' }}
                    />
                  </div>
                </CardBody>
                <CardBody className='w-1/2 md:w-full  space-y-3'>
                  <div className='flex flex-row justify-between items-center'>
                    <h3 className='text-lg md:text-xl'>
                      Chapter {each?.number}: {each?.chapterLabel}
                    </h3>
                    <button>
                      <Lock size={18} />
                    </button>
                  </div>
                </CardBody>
              </Card>
            ))}
      </div>
    </Container>
  )
}

export default ChaptersSection
