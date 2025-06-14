'use client'
import ManageChapterModal from '@/components/admin/chapters/ManageChapterModal'
import PagesTable from '@/components/admin/chapters/PagesTable'
import useGetChapter from '@/hooks/requests/useGetChapter'
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Skeleton,
  Tab,
  Tabs,
} from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit, Edit2 } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const chapterDetailsSchema = z.object({
  title: z
    .string({ required_error: 'Chapter title is required' })
    .min(1, { message: 'Chapter title is required' }),
  chapterNumber: z.number(),
  status: z.string(),
})

type FormFields = z.infer<typeof chapterDetailsSchema>

const ViewChapterSection = () => {
  const [showManageChapterModal, setShowManageChapterModal] = useState(false)
  const formMethods = useForm<FormFields>({
    resolver: zodResolver(chapterDetailsSchema),
    defaultValues: { status: 'published' },
  })
  const { chapterId } = useParams()
  const { chapter } = useGetChapter(chapterId as string)
  const [activeTab, setActiveTab] = useState('pages')
  return (
    <div className='space-y-4'>
      <h3 className='font-bold text-3xl'>
        Chapter {chapter?.number}: {chapter?.chapterLabel}
      </h3>
      <div className='space-y-6'>
        <div className='flex justify-between items-center flex-wrap gap-4'>
          <Breadcrumbs>
            <BreadcrumbItem href='/admin/dashboard'>Dashboard</BreadcrumbItem>
            <BreadcrumbItem href='/admin/chapters'>Chapters</BreadcrumbItem>
            <BreadcrumbItem href='#'>View Chapter</BreadcrumbItem>
          </Breadcrumbs>
          <Button
            color='secondary'
            startContent={<Edit size={15} />}
            onPress={() => setShowManageChapterModal(true)}
          >
            Manage
          </Button>
        </div>

        <div className='gap-3 w-3/5 mx-auto flex flex-col items-center'>
          {chapter ? (
            <Image
              src={chapter?.coverImage || 'https://dummyimage.com/300x500'}
              alt='chapter-cover-image'
              className='object-cover h-80'
              height={500}
              width={300}
            />
          ) : (
            <Skeleton className='h-80 w-64' />
          )}
          <h3 className='text-xl'>
            {chapter ? (
              <>
                Chapter {chapter?.number}: {chapter?.chapterLabel}
              </>
            ) : (
              <Skeleton className='h-8 w-48' />
            )}
          </h3>
        </div>
        <div className='flex justify-center  w-4/5 mx-auto border-t'>
          <Button
            className={`p-3 py-5 text-center flex-1 bg-transparent ${
              activeTab == 'pages'
                ? 'text-primary border-b border-b-primary'
                : ''
            }`}
            radius='none'
            onPress={() => setActiveTab('pages')}
          >
            Pages
          </Button>
          <Button
            radius='none'
            className={`p-3 py-5 text-center flex-1 bg-transparent ${
              activeTab == 'comments'
                ? 'text-primary border-b border-b-primary'
                : ''
            }`}
            onPress={() => setActiveTab('comments')}
          >
            Comments
          </Button>
        </div>
        <Tabs classNames={{ tab: 'hidden' }} selectedKey={activeTab}>
          <Tab key='pages' title='Pages'>
            <PagesTable />
          </Tab>
          <Tab key='comments' title='Comments'>
            Comments
          </Tab>
        </Tabs>
      </div>
      <ManageChapterModal
        isOpen={showManageChapterModal}
        chapter={chapter!}
        setIsOpen={setShowManageChapterModal}
      />
    </div>
  )
}

export default ViewChapterSection
