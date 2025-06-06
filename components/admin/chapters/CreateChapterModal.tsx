'use client'
import { createChapter } from '@/api-utils/admin/requests/chapter.requests'
import ModalWrapper, {
  BaseModalProps,
} from '@/components/admin/elements/ModalWrapper'
import InputField from '@/components/elements/InputField'
import useGetAllChapters from '@/hooks/requests/useGetAllChapters'
import useGetBook from '@/hooks/requests/useGetBook'
import { addToast, Button } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  chapterLabel: z
    .string({ required_error: 'Chapter title is required' })
    .min(1, 'Chapter title is required'),
  bookId: z.any(),
  status: z
    .string({ required_error: 'Status is required' })
    .min(1, 'Status is required'),
})

type FormFields = z.infer<typeof schema>

const CreateChapterModal: FC<BaseModalProps> = ({ isOpen, setIsOpen }) => {
  const formMethods = useForm<FormFields>({ resolver: zodResolver(schema) })
  const { book } = useGetBook()
  const { mutateAllChapters } = useGetAllChapters()
  const handleSubmit = async (formData: FormFields) => {
    try {
      formData.bookId = book?.id
      await createChapter(formData)

      setIsOpen(false)
      mutateAllChapters()
      addToast({ title: 'Chapter created successfully', severity: 'success' })
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
    <ModalWrapper
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
            color='secondary'
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
        <div className='space-y-3'>
          <InputField
            type='text'
            label='Chapter Title'
            placeholder='The beginning'
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
        </div>
      </form>
    </ModalWrapper>
  )
}
export default CreateChapterModal
