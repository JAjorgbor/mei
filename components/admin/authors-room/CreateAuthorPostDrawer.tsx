'use client'
import { createAuthorPost } from '@/api-utils/admin/requests/author-room.requests'
import DrawerWrapper, {
  BaseDrawerProps,
} from '@/components/admin/elements/DrawerWrapper'
import InputField from '@/components/elements/InputField'
import useGetAllChapters from '@/hooks/requests/useGetAllChapters'
import { addToast, Autocomplete, AutocompleteItem, Button } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, type FC } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  text: z
    .string({ required_error: 'Text is required' })
    .min(1, 'Text is required'),
  chapterId: z.string({ required_error: 'Chapter is required' }),
})

type FormFields = z.infer<typeof schema>

interface CreateAuthorPostDrawerProps extends BaseDrawerProps {
  mutate: () => void
}

const CreateAuthorPostDrawer: FC<CreateAuthorPostDrawerProps> = ({
  isOpen,
  setIsOpen,
  mutate,
}) => {
  const formMethods = useForm<FormFields>({ resolver: zodResolver(schema) })
  const { allChapters } = useGetAllChapters()

  const chapterOptions =
    allChapters?.items.map((chapter) => ({
      value: String(chapter.id),
      label: `Chapter ${chapter.number}: ${chapter.chapterLabel}`,
    })) || []

  useEffect(() => {
    const subscribe = formMethods.watch((values) => console.log(values))
    return () => subscribe.unsubscribe()
  }, [])

  const handleSubmit = async (formData: FormFields) => {
    try {
      await createAuthorPost(formData)
      formMethods.reset()
      addToast({
        title: 'Author thought posted successfully',
        severity: 'success',
        color: 'success',
      })
      mutate()
      setIsOpen(false)
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
      title='Create Author Thought'
      footer={
        <div className='flex gap-4 justify-end'>
          <Button
            onPress={() => {
              formMethods.reset()
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
            form='create-author-post-form'
            color='primary'
            isLoading={formMethods.formState.isSubmitting}
          >
            Post Thought
          </Button>
        </div>
      }
    >
      <form
        id='create-author-post-form'
        onSubmit={formMethods.handleSubmit(handleSubmit)}
      >
        <div className='grid gap-4'>
          <InputField
            type='autocomplete'
            label='Related Chapter'
            isRequired
            placeholder='Select a chapter'
            onChange={(value) => {
              formMethods.setValue('chapterId', value)
            }}
            value={formMethods.watch('chapterId')}
            options={chapterOptions}
            errorMessage={formMethods.formState.errors.chapterId?.message}
          />
          <InputField
            type='textarea'
            label='Content'
            placeholder="Share what's on your mind..."
            isRequired
            register={formMethods.register('text')}
            errorMessage={formMethods.formState.errors.text?.message}
          />
        </div>
      </form>
    </DrawerWrapper>
  )
}

export default CreateAuthorPostDrawer
