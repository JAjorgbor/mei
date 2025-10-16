'use client'
import { IComment } from '@/api-utils/global-interfaces/comment.interfaces'
import { deleteChapterComment } from '@/api-utils/portal/requests/comment.requests'
import ModalWrapper, {
  BaseModalProps,
} from '@/components/admin/elements/ModalWrapper'
import useGetPortalChapter from '@/hooks/requests/portal/useGetPortalChapter'
import useGetPortalChapterComments from '@/hooks/requests/portal/useGetPortalChapterComments'
import { addToast, Button } from '@heroui/react'
import { useParams } from 'next/navigation'
import { useState, type FC } from 'react'

interface ConfirmDeleteCommentModalProps {
  comment: IComment
}

const ConfirmDeleteCommentModal: FC<
  ConfirmDeleteCommentModalProps & BaseModalProps
> = ({ isOpen, setIsOpen, comment }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { chapterId }: { chapterId: string } = useParams()
  const { mutateChapter } = useGetPortalChapter(chapterId)
  const { mutateChapterComments } = useGetPortalChapterComments(chapterId)

  const handleDeleteComment = async () => {
    setIsLoading(true)
    try {
      await deleteChapterComment(comment?.id)
      mutateChapter()
      mutateChapterComments()
      addToast({ title: 'Comment deleted successfully', color: 'success' })
      setIsOpen(false)
    } catch (error: any) {
      console.error(error)
      addToast({
        color: 'danger',
        title:
          error?.data?.message ||
          error?.message ||
          'Something went wrong. Please try again later.',
      })
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <ModalWrapper
      title='Delete Comment'
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      footer={
        <div className='flex justify-end gap-4'>
          <Button size='sm' color='primary' onPress={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            size='sm'
            color='danger'
            onPress={handleDeleteComment}
            isLoading={isLoading}
          >
            Delete
          </Button>
        </div>
      }
    >
      <div>
        <p>
          Are you sure you want to delete this comment? This action cannot be
          reversed.
        </p>
        <blockquote className='mt-2 p-2 border-l-4 border-foreground-300 bg-foreground/10 text-sm text-foreground'>
          &quot;{comment?.text}&quot;
        </blockquote>
      </div>
    </ModalWrapper>
  )
}
export default ConfirmDeleteCommentModal
