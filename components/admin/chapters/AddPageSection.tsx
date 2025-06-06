'use client'
import { addNewPage } from '@/api-utils/admin/requests/page.requests'
import InputField from '@/components/elements/InputField'
import useGetBook from '@/hooks/requests/useGetBook'
import {
  addToast,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  Tab,
  Tabs,
} from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import dynamicImport from 'next/dynamic'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import 'react-quill/dist/quill.snow.css'
import { z } from 'zod'

const ReactQuill = dynamicImport(() => import('react-quill'), { ssr: false })

const schema = z.object({
  textContent: z
    .string({ required_error: 'Page content is required' })
    .min(1, 'Page content is required'),
  status: z
    .string({ required_error: 'Status is required' })
    .min(1, 'Status is required'),
})

type FormFields = z.infer<typeof schema>

const AddPageSection = () => {
  const defaultValues = {
    status: 'published',
    textContent: '<h1>Story content goes here</h1>',
  }
  const formMethods = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const [isHydrated, setIsHydrated] = useState(false)

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  }

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'indent',
    'script',
    'direction',
    'size',
    'color',
    'background',
    'font',
    'align',
    'link',
    'image',
    'video',
  ]
  useEffect(() => {
    const subscribe = formMethods.watch((values) => console.log(values))
    return () => subscribe.unsubscribe()
  }, [])

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const { chapterId } = useParams()
  const [activeTab, setActiveTab] = useState('content')
  const { book } = useGetBook()

  const handleSubmit = async (formData: FormFields) => {
    try {
      const res = await addNewPage(book?.id as string, formData)
      console.log(res)
      addToast({
        title: 'Page created succesfully',
        color: 'success',
        severity: 'success',
      })
      formMethods.reset(defaultValues)
    } catch (error: any) {
      console.error(error)
      addToast({
        severity: 'danger',
        title: error?.data?.detail
          ? JSON.stringify(error?.data?.detail)
          : error?.message || 'Something went wrong. Please try again later.',
        color: 'danger',
      })
    }
  }
  return (
    <form
      className='space-y-6'
      onSubmit={formMethods.handleSubmit(handleSubmit)}
    >
      <div className='flex justify-between items-center'>
        <Breadcrumbs>
          <BreadcrumbItem href='/admin/dashboard'>Dashboard</BreadcrumbItem>
          <BreadcrumbItem href='/admin/chapters'>Chapters</BreadcrumbItem>
          <BreadcrumbItem href={`/admin/chapters/${chapterId}/`}>
            Chapter Name
          </BreadcrumbItem>
          <BreadcrumbItem href={`/admin/chapters/${chapterId}/add-page`}>
            Add Page
          </BreadcrumbItem>
        </Breadcrumbs>

        <InputField
          type='select'
          className='w-44'
          label='status'
          value={formMethods.watch('status')}
          onChange={(value) => formMethods.setValue('status', value)}
          options={[
            { value: 'draft', label: 'Draft' },
            { value: 'published', label: 'Published' },
          ]}
        />
      </div>
      <div className='flex justify-center  w-4/5 mx-auto'>
        <Button
          className={`p-3 py-5 text-center flex-1 bg-transparent ${
            activeTab == 'content'
              ? 'text-primary border-b border-b-primary'
              : ''
          }`}
          radius='none'
          onPress={() => setActiveTab('content')}
        >
          Content
        </Button>
        <Button
          radius='none'
          className={`p-3 py-5 text-center flex-1 bg-transparent ${
            activeTab == 'likes' ? 'text-primary border-b border-b-primary' : ''
          }`}
          onPress={() => setActiveTab('likes')}
        >
          Likes
        </Button>
      </div>

      <Tabs classNames={{ tab: 'hidden' }} selectedKey={activeTab}>
        <Tab key='content' title='Content'>
          <div>
            <Tabs aria-label='Options'>
              <Tab key='editor' title='Editor'>
                <Card>
                  <CardBody>
                    {' '}
                    <div className='min-h-96'>
                      {isHydrated && (
                        <ReactQuill
                          theme='snow'
                          value={formMethods.watch('textContent')}
                          onChange={(value) =>
                            formMethods.setValue('textContent', value)
                          }
                          modules={modules}
                          formats={formats}
                          className='h-80'
                        />
                      )}
                    </div>
                  </CardBody>
                </Card>
              </Tab>
              <Tab key='preview' title='Preview'>
                <Card>
                  <CardBody>
                    <div className='min-h-80'>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: formMethods.watch('textContent'),
                        }}
                        className='content-renderer'
                      />
                    </div>
                  </CardBody>
                </Card>
              </Tab>
            </Tabs>
            <div className='flex gap-4 justify-end w-full mt-6'>
              <Button
                color='danger'
                disabled={formMethods.formState.isSubmitting}
              >
                Cancel
              </Button>
              <Button
                color='primary'
                type='submit'
                isLoading={formMethods.formState.isSubmitting}
              >
                Save
              </Button>
            </div>
          </div>
        </Tab>
        <Tab key='likes' title='Likes'>
          Likes
        </Tab>
      </Tabs>
    </form>
  )
}

export default AddPageSection
