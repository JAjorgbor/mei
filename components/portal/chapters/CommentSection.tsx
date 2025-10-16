'use client'
import { IComment } from '@/api-utils/global-interfaces/comment.interfaces'
import { createComment } from '@/api-utils/portal/requests/comment.requests'
import Container from '@/components/elements/Container'
import InputField from '@/components/elements/InputField'
import ConfirmDeleteCommentModal from '@/components/portal/chapters/ConfirmDeleteCommentModal'
import useGetPortalChapter from '@/hooks/requests/portal/useGetPortalChapter'
import useGetPortalChapterComments from '@/hooks/requests/portal/useGetPortalChapterComments'
import useGetPortalUser from '@/hooks/requests/portal/useGetPortalUser'
import { addToast, Avatar, Button, Skeleton, Spinner } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send, Trash2Icon, XCircle } from 'lucide-react'
import moment from 'moment'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
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

const CommentSection = ({
  showComments,
  setShowComments,
}: {
  showComments: boolean
  setShowComments: (showComment: boolean) => void
}) => {
  const { chapterId }: { chapterId: string } = useParams()
  const defaultValues = { chapterId, commentType: 'Reply To Chapter', text: '' }
  const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false)
  const [selectedComment, setSelectedComment] = useState<IComment>()
  const { mutateChapter } = useGetPortalChapter(chapterId)
  const { portalUser } = useGetPortalUser()
  const { chapterComments, chapterCommentsLoading, mutateChapterComments } =
    useGetPortalChapterComments(chapterId)
  const formMethods = useForm<CreateCommentPayload>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  useEffect(() => {
    if (showComments) document.body.style.overflowY = 'hidden'
    else document.body.style.overflowY = 'auto'
  }, [showComments])

  console.log(chapterComments)

  const handleSubmit = async (formData: CreateCommentPayload) => {
    try {
      await createComment(formData)
      addToast({
        title: 'Comment sent successfully',
        color: 'success',
      })
      formMethods.reset(defaultValues)
      mutateChapter()
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
    <>
      <div
        className={`w-dvw px-0 h-screen overflow-y-hidden bg-background fixed top-16 space-y-8 transform transition-all duration-700 flex justify-center ${
          showComments
            ? 'translate-x-0 opacity-100 z-[100]'
            : 'left-0 translate-x-full opacity-0 -z-50'
        }`}
      >
        <Container className={`h-screen bg-background fixed`} width='3xl'>
          <div className='relative pb-8 overflow-y-auto max-h-screen space-y-5 divide-y divide-foreground-300 dark:divide-foreground-50 px-4'>
            <form
              className='flex gap-3 items-center sticky top-0 left-0 bg-background z-10 p-2'
              onSubmit={formMethods.handleSubmit(handleSubmit)}
            >
              <Button
                isIconOnly
                type='button'
                onPress={() => setShowComments(false)}
                radius='full'
                variant='light'
                color='primary'
              >
                <XCircle size={25} />
              </Button>
              <InputField
                type='text'
                register={formMethods.register('text')}
                placeholder='Write a comment'
                className='w-full rounded-xl bg-transparent'
                errorMessage={formMethods?.formState?.errors?.text?.message}
                endContent={
                  <button
                    type='submit'
                    disabled={formMethods.formState.isSubmitting}
                    className='pr-2'
                  >
                    {formMethods.formState.isSubmitting ? (
                      <Spinner size='sm' />
                    ) : (
                      <Send size={16} />
                    )}
                  </button>
                }
              />
            </form>

            {chapterCommentsLoading ? (
              Array(5)
                .fill(null)
                .map((_, index) => (
                  <div key={index} className='space-y-4'>
                    <div className='flex items-center gap-4'>
                      <Skeleton className='size-12 rounded-full' />
                      <Skeleton className='w-48 rounded-lg h-6' />
                    </div>
                    <div className='space-y-3'>
                      <Skeleton className='w-full rounded-lg h-4' />
                      <Skeleton className='w-1/2 rounded-lg h-4' />
                      <Skeleton className='w-1/3 rounded-lg h-4' />
                    </div>
                  </div>
                ))
            ) : chapterComments?.length ? (
              chapterComments?.map((each, index: number) => (
                <div key={index} className='space-y-4 pt-4'>
                  <div className='flex justify-between items-start w-full'>
                    <div className='flex gap-4 items-center'>
                      <Avatar
                        size='sm'
                        alt={`${each.firstName} ${each.lastName}`}
                        src={each.avatar || ''}
                      />
                      <div className='space-y-0 5'>
                        <h5 className='font-semibold'>
                          {each.firstName} {each.lastName}
                        </h5>
                        <p className='text-xs text-foreground-500'>
                          {moment(each.dateCreated).format('MMM Do, YYYY')}
                        </p>
                      </div>
                    </div>
                    {each.userId == portalUser?.userId && (
                      <Button
                        isIconOnly
                        onPress={() => {
                          setShowDeleteCommentModal(true)
                          setSelectedComment(each)
                        }}
                        size='sm'
                        variant='light'
                      >
                        <Trash2Icon size={15} />
                      </Button>
                    )}
                  </div>
                  <p className='text-sm'>{each.text}</p>
                </div>
              ))
            ) : (
              <div className='h-44 px-5 grid place-items-center text-center text-foreground-700'>
                <div>
                  <p>No comments available for this chapter.</p>
                  <p>Be the first to leave a comment.</p>
                </div>
              </div>
            )}
            <div className='h-24' />
          </div>
        </Container>
      </div>

      <ConfirmDeleteCommentModal
        isOpen={showDeleteCommentModal}
        setIsOpen={setShowDeleteCommentModal}
        comment={selectedComment!}
      />
    </>
  )
}

export default CommentSection
