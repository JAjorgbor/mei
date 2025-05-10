'use client'
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardFooter,
  Tab,
  Tabs,
} from '@heroui/react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const AddPageSection = () => {
  const formMethods = useForm()
  const [value, setValue] = useState('')

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
  const { chapterId } = useParams()
  return (
    <div className='space-y-6'>
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
      <Tabs aria-label='Options'>
        <Tab key='editor' title='Editor'>
          <Card>
            <CardBody>
              {' '}
              <div className='min-h-96'>
                <ReactQuill
                  theme='snow'
                  value={formMethods.watch('content')}
                  onChange={(value) => formMethods.setValue('content', value)}
                  modules={modules}
                  formats={formats}
                  className='h-80'
                />
              </div>
            </CardBody>
            <CardFooter>
              <div className='flex gap-4 justify-end w-full'>
                <Button color='danger'>Cancel</Button>
                <Button color='primary'>Save</Button>
              </div>
            </CardFooter>
          </Card>
        </Tab>
        <Tab key='preview' title='Preview'>
          <Card>
            <CardBody>
              <div className='min-h-80'>
                <div
                  dangerouslySetInnerHTML={{
                    __html: formMethods.watch('content'),
                  }}
                  className='content-renderer'
                />
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  )
}

export default AddPageSection
