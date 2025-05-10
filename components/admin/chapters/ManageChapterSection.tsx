'use client'
import InputField from '@/components/elements/InputField'
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardHeader,
} from '@heroui/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import PagesTable from '@/components/admin/chapters/PagesTable'

const chapterDetailsSchema = z.object({
  title: z
    .string({ required_error: 'Chapter title is required' })
    .min(1, { message: 'Chapter title is required' }),
  chapterNumber: z.number(),
  status: z.string(),
})

type FormFields = z.infer<typeof chapterDetailsSchema>

const ManageChapterSection = () => {
  const formMethods = useForm<FormFields>({
    resolver: zodResolver(chapterDetailsSchema),
    defaultValues: { status: 'published' },
  })
  return (
    <div className='space-y-6'>
      <Breadcrumbs>
        <BreadcrumbItem href='/admin/dashboard'>Dashboard</BreadcrumbItem>
        <BreadcrumbItem href='/admin/chapters'>Chapters</BreadcrumbItem>
        <BreadcrumbItem href='#'>Manage Chapter</BreadcrumbItem>
      </Breadcrumbs>

      <div className='grid lg:grid-cols-5 gap-6'>
        <div>
          <Card>
            <CardHeader>Chapter Details</CardHeader>
            <CardBody>
              <form>
                <div className='space-y-4'>
                  <InputField
                    type='text'
                    label='Title'
                    placeholder='Chapter Title'
                    register={formMethods.register('title')}
                    errorMessage={formMethods.formState.errors.title?.message}
                  />
                  <InputField
                    type='number'
                    label='Chapter Number'
                    register={formMethods.register('chapterNumber')}
                    value={4}
                  />
                  <InputField
                    type='select'
                    label='Status'
                    value={formMethods.watch('status')}
                    onChange={(value) => formMethods.setValue('status', value)}
                    options={[
                      { value: 'published', label: 'Published' },
                      { value: 'draft', label: 'Draft' },
                    ]}
                  />

                  <Button type='submit' className='w-full' color='primary'>
                    Update
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </div>
        <div className='lg:col-span-4 overflow-y-visible'>
          <PagesTable />
        </div>
      </div>
    </div>
  )
}

export default ManageChapterSection
