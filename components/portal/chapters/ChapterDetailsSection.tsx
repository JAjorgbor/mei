'use client'
import Container from '@/components/elements/Container'
import useGetPortalAllChapters from '@/hooks/requests/portal/useGetPortalAllChapters'
import useGetPortalChapter from '@/hooks/requests/portal/useGetPortalChapter'
import useGetPortalPagesForChapter from '@/hooks/requests/portal/useGetPortalPagesForChapter'
import useSetHeaderNavigation from '@/hooks/useSetHeaderNavigation'
import htmlToText from '@/utils/htmlToText'
import { Button, Image as HeroUIImage, Skeleton } from '@heroui/react'
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  LockOpen,
  MessageSquare,
} from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { useMemo } from 'react'

const ChapterDetailsSection = () => {
  const pathname = usePathname()
  const params = useParams()
  const { chapter, chapterLoading } = useGetPortalChapter(
    params.chapterId as string,
  )

  const { pages: pagesData, pagesLoading } = useGetPortalPagesForChapter(
    params?.chapterId as string,
  )
  const pages = pagesData?.items
  useSetHeaderNavigation({
    title: `Chapter ${chapter?.number || 'Loading...'}`,
    backLink: '/portal/chapters',
  })
  const { allChapters: allChaptersData, allChaptersLoading } =
    useGetPortalAllChapters()
  const allChapters = allChaptersData?.items
  const prevChapter = useMemo(() => {
    if (!allChaptersLoading && allChapters && chapter) {
      return allChapters.find((c) => c.number < chapter.number) || undefined
    }
    return undefined
  }, [allChapters, allChaptersLoading, chapter])

  const nextChapter = useMemo(() => {
    if (!allChaptersLoading && allChapters && chapter) {
      return allChapters.find((c) => c.number > chapter.number) || undefined
    }
    return undefined
  }, [allChapters, allChaptersLoading, chapter])

  return (
    <div className='space-y-8'>
      <div
        className={`py-12 grid place-items-center relative bg-no-repeat`}
        style={{
          background: `url(${chapter?.coverImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className='absolute bg-transparent inset-0 backdrop-blur' />
        <HeroUIImage
          src={chapter?.coverImage}
          alt='chapter'
          height={300}
          width={300}
          className='object-cover object-center mx-auto z-10 shadow'
          classNames={{ wrapper: 'min-w-full' }}
        />
      </div>
      <Container className='space-y-5'>
        {/* Navigate to other chapters */}
        <div className='flex justify-between items-center max-w-xl mx-auto'>
          {allChaptersLoading ? (
            <Skeleton className='rounded-full p-4' />
          ) : prevChapter ? (
            <Link
              href={`/portal/chapters/${prevChapter?.id}`}
              type='button'
              aria-label='Previous Chapter'
              className='rounded-full hover:bg-foreground/10 p-1'
            >
              <ChevronLeft size={25} />
            </Link>
          ) : (
            <span />
          )}
          <div className='space-y-4 text-center'>
            {!chapterLoading ? (
              <>
                <h3 className='text-lg'>Chapter {chapter?.number}</h3>
                <h4 className='text-xl'>{chapter?.chapterLabel}</h4>
              </>
            ) : (
              <>
                <Skeleton className='w-48 h-8 rounded-lg mx-auto' />

                <Skeleton className='w-56 h-6 rounded-lg' />
              </>
            )}
          </div>
          {allChaptersLoading ? (
            <Skeleton className='rounded-full p-4' />
          ) : nextChapter ? (
            <Link
              href={`/portal/chapters/${nextChapter?.id}`}
              aria-label='Previous Chapter'
              className='rounded-full hover:bg-foreground/10 p-1'
            >
              <ChevronRight size={25} />
            </Link>
          ) : (
            <span />
          )}
        </div>
        {/* Chapter performance */}
        <div className='flex justify-center gap-6 text-sm text-foreground-500'>
          {chapterLoading ? (
            <>
              <Skeleton className='w-14 h-6 rounded-lg' />
              <Skeleton className='w-14 h-6 rounded-lg' />
              <Skeleton className='w-14 h-6 rounded-lg' />
            </>
          ) : (
            <>
              <span className='inline-flex items-center gap-2'>
                <MessageSquare size={15} /> {chapter?.commentsCount} Comments
              </span>
              <span className='inline-flex items-center gap-2'>
                <Heart size={15} /> {chapter?.likesCount} Likes
              </span>
              {/* <span className='inline-flex items-center gap-2'>
                <Eye size={15} /> [2.7k] Reads
              </span> */}
            </>
          )}
        </div>
        <div className='max-w-md mx-auto'>
          <Button
            fullWidth
            color='primary'
            variant='ghost'
            radius='none'
            as={Link}
            href={`${pathname}/read`}
          >
            Start Reading Now
          </Button>
        </div>
        <div className='space-y-6 max-w-3xl mx-auto'>
          <LockOpen size={25} className='text-foreground-500' />
          <div className='divide-y divide-foreground-600 '>
            {pagesLoading ? (
              Array(5)
                .fill(null)
                .map((_, index) => (
                  <div className='space-y-3 py-4' key={index}>
                    <h5 className='font-semibold'>
                      <Skeleton className='h-7 w-48 rounded-lg' />
                    </h5>
                    <div className='space-y-4'>
                      <Skeleton className='h-5 rounded-lg w-4/5' />
                      <Skeleton className='h-5 rounded-lg w-full' />
                    </div>
                  </div>
                ))
            ) : pages && pages?.length > 0 ? (
              pages.map((each, index) => (
                <div className='space-y-3 py-4' key={index}>
                  <h5 className='font-semibold'>Page {index + 1}</h5>
                  <p className='text-sm truncate'>
                    {htmlToText(each.textContent)}
                  </p>
                </div>
              ))
            ) : (
              <div className='p-5 text-center h-52 text-foreground-500'>
                No pages available for this chapter.
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default ChapterDetailsSection
