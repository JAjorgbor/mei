'use client'
import { IComment } from '@/api-utils/global-interfaces/comment.interfaces'
import { createAdminComment } from '@/api-utils/admin/requests/comment.requests'
import InputField from '@/components/elements/InputField'
import ConfirmDeleteCommentModal from '@/components/admin/chapters/ConfirmDeleteCommentModal'
import useGetChapterComments from '@/hooks/requests/useGetChapterComments'
// import useGetAdmin from '@/hooks/requests/useGetAdmin' // Assuming similar to portal's useGetPortalUser
import {
  addToast,
  Avatar,
  Button,
  Skeleton,
  Spinner,
  Card,
  CardBody,
} from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send, Trash2Icon } from 'lucide-react'
import moment from 'moment'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  text: z
    .string({ required_error: 'Please provide a comment' })
    .min(1, 'Please provide a comment'),
  chapterId: z.string(),
  commentType: z.string(),
})

type CreateCommentPayload = z.infer<typeof schema>

const AdminCommentSection = () => {
  const { chapterId }: { chapterId: string } = useParams()
  const defaultValues = { chapterId, commentType: 'Reply To Chapter', text: '' }
  const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false)
  const [selectedComment, setSelectedComment] = useState<IComment>()

  const { chapterComments, chapterCommentsLoading, mutateChapterComments } =
    useGetChapterComments(chapterId)

  const formMethods = useForm<CreateCommentPayload>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const handleSubmit = async (formData: CreateCommentPayload) => {
    try {
      await createAdminComment(formData)
      addToast({
        title: 'Comment posted successfully',
        color: 'success',
      })
      formMethods.reset(defaultValues)
      mutateChapterComments()
    } catch (error: any) {
      addToast({
        color: 'danger',
        title:
          error?.data?.message ||
          error?.message ||
          'Something went wrong. Please try again later.',
      })
    }
  }

  return (
    <div className='max-w-4xl mx-auto space-y-6 pt-6'>
      <Card className='bg-default-50/50 shadow-none border border-default-100 rounded-[2rem]'>
        <CardBody className='p-6 pb-4'>
          <form
            className='flex gap-3 items-start'
            onSubmit={formMethods.handleSubmit(handleSubmit)}
          >
            <InputField
              type='textarea'
              register={formMethods.register('text')}
              placeholder='Post an official update or reply...'
              className='w-full'
              errorMessage={formMethods?.formState?.errors?.text?.message}
            />
            <Button
              isIconOnly
              type='submit'
              color='primary'
              className='mt-2'
              isLoading={formMethods.formState.isSubmitting}
            >
              <Send size={18} />
            </Button>
          </form>
        </CardBody>
      </Card>

      <div className='space-y-4'>
        <div className='flex items-center justify-between px-4'>
          <h4 className='font-bold text-lg'>
            Comments ({chapterComments?.length || 0})
          </h4>
        </div>

        <div className='space-y-4 px-2 pb-10'>
          {chapterCommentsLoading ? (
            Array(3)
              .fill(null)
              .map((_, i) => (
                <div key={i} className='flex gap-4 p-4'>
                  <Skeleton className='size-10 rounded-full' />
                  <div className='space-y-2 flex-grow'>
                    <Skeleton className='h-4 w-1/4 rounded-lg' />
                    <Skeleton className='h-3 w-full rounded-lg' />
                  </div>
                </div>
              ))
          ) : chapterComments && chapterComments.length > 0 ? (
            chapterComments.map((comment) => (
              <Card
                key={comment.id}
                className='shadow-sm border-none bg-background/60 backdrop-blur-sm rounded-[1.5rem] p-2 hover:shadow-md transition-shadow'
              >
                <CardBody className='flex flex-row gap-4 items-start p-4'>
                  <Avatar
                    size='sm'
                    alt={comment.firstName}
                    src={comment.avatar || ''}
                    className='mt-1'
                  />
                  <div className='flex-grow space-y-1'>
                    <div className='flex justify-between items-center'>
                      <div>
                        <h5 className='text-sm font-bold'>
                          {comment.firstName} {comment.lastName}
                          {comment.role === 'admin' && (
                            <span className='ml-2 text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase font-black'>
                              Admin
                            </span>
                          )}
                        </h5>
                        <p className='text-[10px] text-default-400'>
                          {moment(comment.dateCreated).fromNow()}
                        </p>
                      </div>
                      <Button
                        isIconOnly
                        size='sm'
                        variant='light'
                        color='danger'
                        onPress={() => {
                          setSelectedComment(comment)
                          setShowDeleteCommentModal(true)
                        }}
                      >
                        <Trash2Icon size={14} />
                      </Button>
                    </div>
                    <p className='text-sm text-default-700 leading-relaxed'>
                      {comment.text}
                    </p>
                  </div>
                </CardBody>
              </Card>
            ))
          ) : (
            <div className='py-20 text-center space-y-2 bg-default-50 rounded-[2.5rem] border-2 border-dashed border-default-200'>
              <p className='text-default-400'>No comments yet.</p>
            </div>
          )}
        </div>
      </div>

      <ConfirmDeleteCommentModal
        isOpen={showDeleteCommentModal}
        setIsOpen={setShowDeleteCommentModal}
        comment={selectedComment!}
        mutate={mutateChapterComments}
      />
    </div>
  )
}

export default AdminCommentSection
