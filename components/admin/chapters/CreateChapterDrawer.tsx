'use client'
import { createChapter } from '@/api-utils/admin/requests/chapter.requests'
import { uploadToCloudinary } from '@/api-utils/general.requests'
import DrawerWrapper, {
  BaseDrawerProps,
} from '@/components/admin/elements/DrawerWrapper'
import InputField from '@/components/elements/InputField'
import useGetAllChapters from '@/hooks/requests/useGetAllChapters'
import { addToast, Button } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CameraIcon } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState, type FC } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  coverImage: z
    .any()
    .refine((file) => file && file.length > 0, 'Cover image is required'),
  bookId: z.any(),
  chapterLabel: z
    .string({ required_error: 'Chapter title is required' })
    .min(1, 'Chapter title is required'),
  status: z
    .string({ required_error: 'Status is required' })
    .min(1, 'Status is required'),
})

type FormFields = z.infer<typeof schema>

const BOOK_ID = process.env.NEXT_PUBLIC_BOOK_ID

const CreateChapterDrawer: FC<BaseDrawerProps> = ({ isOpen, setIsOpen }) => {
  const formMethods = useForm<FormFields>({ resolver: zodResolver(schema) })
  const { mutateAllChapters } = useGetAllChapters()
  const fileInputRef = useRef<any>(null)
  const watchAvatar = formMethods.watch('coverImage')
  const [imagePreview, setImagePreview] = useState('')
  useEffect(() => {
    if (watchAvatar && watchAvatar[0]) {
      const file = watchAvatar[0]
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)
    } else {
      setImagePreview('')
    }
  }, [watchAvatar])

  const handleSubmit = async (formData: FormFields) => {
    try {
      const { data } = await uploadToCloudinary({
        file: formData.coverImage,
        folder: `mie-novel/admin/chapters/cover-images/`,
      })

      formData.bookId = BOOK_ID
      formData.coverImage = data.secure_url

      await createChapter({ ...formData, bookId: BOOK_ID })

      setIsOpen(false)
      mutateAllChapters()
      addToast({
        title: 'Chapter created successfully',
        severity: 'success',
        color: 'success',
      })
      formMethods.reset()
    } catch (error: any) {
      addToast({
        title:
          error?.data?.message ||
          error?.message ||
          'Something went wrong. Please try again later.',
        color: 'danger',
      })
    }
  }

  return (
    <DrawerWrapper
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title='Create Chapter'
      footer={
        <div className='flex gap-4 justify-end'>
          <Button
            onPress={() => {
              formMethods.reset({ status: '', chapterLabel: '' })
              setIsOpen(false)
            }}
            size='sm'
            color='danger'
            variant='ghost'
          >
            Cancel
          </Button>
          <Button
            size='sm'
            type='submit'
            form='create-chapter-form'
            color='primary'
            isLoading={formMethods.formState.isSubmitting}
          >
            Create
          </Button>
        </div>
      }
    >
      <form
        id='create-chapter-form'
        onSubmit={formMethods.handleSubmit(handleSubmit)}
      >
        <div className='grid md:grid-cols-2 gap-3'>
          <div className='md:col-span-2 flex gap-4 justify-center'>
            <label className='flex flex-col gap-3 items-center'>
              <input
                accept='image/*'
                type='file'
                {...formMethods.register('coverImage')}
                className='hidden'
                ref={(e) => {
                  const { ref: registerRef } =
                    formMethods.register('coverImage')
                  registerRef(e)
                  fileInputRef.current = e
                }}
              />
              <img
                src={imagePreview || 'https://dummyimage.com/300x400'}
                alt='chapter-cover-image'
                className='object-cover h-80'
                height={400}
                width={300}
              />
              <button
                className='p-1 py-0.5 text-sm rounded-md bg-secondary text-white flex gap-2 items-center'
                type='button'
                onClick={() => fileInputRef.current?.click()}
              >
                Upload Image
                <CameraIcon size={18} />
              </button>
              {formMethods.formState.errors.coverImage && (
                <p className='text-sm text-red-400'>
                  {String(formMethods.formState.errors.coverImage?.message)}
                </p>
              )}
            </label>
          </div>

          <InputField
            type='text'
            label='Chapter Title'
            placeholder='The beginning'
            className='md:col-span-2'
            isRequired
            register={formMethods.register('chapterLabel')}
            errorMessage={formMethods.formState.errors.chapterLabel?.message}
          />
          <InputField
            type='select'
            label='Status'
            isRequired
            className='md:col-span-2'
            onChange={(value) => formMethods.setValue('status', value)}
            value={formMethods.watch('status')}
            errorMessage={formMethods.formState.errors.status?.message}
            placeholder='Select Status'
            options={[
              { value: 'draft', label: 'Draft' },
              { value: 'published', label: 'Published' },
            ]}
          />
        </div>
      </form>
    </DrawerWrapper>
  )
}
export default CreateChapterDrawer
