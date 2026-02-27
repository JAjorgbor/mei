'use client'
import { IComment } from '@/api-utils/global-interfaces/comment.interfaces'
import { deleteChapterComment } from '@/api-utils/admin/requests/comment.requests'
import ModalWrapper, {
  BaseModalProps,
} from '@/components/admin/elements/ModalWrapper'
import useGetChapterComments from '@/hooks/requests/useGetChapterComments'
import { addToast, Button } from '@heroui/react'
import { useParams } from 'next/navigation'
import { useState, type FC } from 'react'

interface ConfirmDeleteCommentModalProps {
  comment: IComment
  mutate: () => void
}

const ConfirmDeleteCommentModal: FC<
  ConfirmDeleteCommentModalProps & BaseModalProps
> = ({ isOpen, setIsOpen, comment, mutate }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleDeleteComment = async () => {
    setIsLoading(true)
    try {
      await deleteChapterComment(comment?.id)
      mutate()
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
          <Button
            size='sm'
            color='primary'
            onPress={() => setIsOpen(false)}
            variant='light'
          >
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
      <div className='space-y-4'>
        <p className='text-default-500'>
          Are you sure you want to delete this comment? This action cannot be
          reversed.
        </p>
        <div className='p-4 rounded-2xl bg-default-50 border border-default-100 italic text-default-700'>
          &quot;{comment?.text}&quot;
        </div>
      </div>
    </ModalWrapper>
  )
}
export default ConfirmDeleteCommentModal
