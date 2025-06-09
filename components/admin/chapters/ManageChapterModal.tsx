'use client'
import { IChapter } from '@/api-utils/admin/interfaces/chapter.interfaces'
import {
  createChapter,
  updateChapter,
} from '@/api-utils/admin/requests/chapter.requests'
import { uploadToCloudinary } from '@/api-utils/general.requests'
import { urlToFile } from '@/app/utils/urlToFile'
import ModalWrapper, {
  BaseModalProps,
} from '@/components/admin/elements/ModalWrapper'
import InputField from '@/components/elements/InputField'
import useGetAllChapters from '@/hooks/requests/useGetAllChapters'
import useGetBook from '@/hooks/requests/useGetBook'
import useGetChapter from '@/hooks/requests/useGetChapter'
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
  chapterLabel: z
    .string({ required_error: 'Chapter title is required' })
    .min(1, 'Chapter title is required'),
  bookId: z.any(),
  status: z
    .string({ required_error: 'Status is required' })
    .min(1, 'Status is required'),
})

type FormFields = z.infer<typeof schema>

const ManageChapterModal: FC<BaseModalProps & { chapter: IChapter }> = ({
  isOpen,
  setIsOpen,
  chapter,
}) => {
  const formMethods = useForm<FormFields>({ resolver: zodResolver(schema) })
  const { book } = useGetBook()
  const { mutateAllChapters } = useGetAllChapters()
  const { mutateChapter } = useGetChapter(chapter.id)

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
        public_id: `mie-novel/admin/chapters/cover-images/${chapter.id}`,
      })

      formData.bookId = book?.id
      formData.coverImage = data.secure_url
      await updateChapter(chapter.id, formData)

      setIsOpen(false)
      mutateAllChapters()
      mutateChapter()
      addToast({ title: 'Chapter updated successfully', severity: 'success' })
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
  useEffect(() => {
    if (chapter) {
      formMethods.reset({
        chapterLabel: chapter.chapterLabel,
        status: chapter.status,
      })
      ;(async () => {
        const file = await urlToFile(
          chapter.coverImage,
          'cover-image',
          'image/jpeg'
        )
        formMethods.setValue('coverImage', [file])
        const previewUrl = URL.createObjectURL(file)
        setImagePreview(previewUrl)
      })()
    }
  }, [chapter])
  return (
    <ModalWrapper
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title='Manage Chapter'
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
            color='secondary'
            isLoading={formMethods.formState.isSubmitting}
          >
            Update
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
              <Image
                src={imagePreview || 'https://dummyimage.com/300x500'}
                alt='chapter-cover-image'
                className='object-cover h-80'
                height={500}
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
            onChange={(value) => formMethods.setValue('status', value)}
            value={formMethods.watch('status')}
            errorMessage={formMethods.formState.errors.status?.message}
            placeholder='Select Status'
            options={[
              { value: 'draft', label: 'Draft' },
              { value: 'published', label: 'Published' },
            ]}
          />
          <InputField
            type='text'
            label='Chapter Number'
            isRequired
            disabled
            register={{ value: chapter.number }}
          />
        </div>
      </form>
    </ModalWrapper>
  )
}
export default ManageChapterModal
