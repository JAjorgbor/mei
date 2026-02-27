'use client'
import { IAuthorPost } from '@/api-utils/global-interfaces/author-room.interfaces'
import { deleteAuthorPost } from '@/api-utils/admin/requests/author-room.requests'
import ModalWrapper, {
  BaseModalProps,
} from '@/components/admin/elements/ModalWrapper'
import { addToast, Button } from '@heroui/react'
import { useState, type FC } from 'react'

interface ConfirmDeleteAuthorPostModalProps {
  post: IAuthorPost
  mutate: () => void
}

const ConfirmDeleteAuthorPostModal: FC<
  ConfirmDeleteAuthorPostModalProps & BaseModalProps
> = ({ isOpen, setIsOpen, post, mutate }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleDeletePost = async () => {
    setIsLoading(true)
    try {
      await deleteAuthorPost(post.id)
      mutate()
      addToast({ title: 'Thought deleted successfully', color: 'success' })
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
      title='Delete Thought'
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
            onPress={handleDeletePost}
            isLoading={isLoading}
          >
            Delete
          </Button>
        </div>
      }
    >
      <div className='space-y-4 pt-4'>
        <p className='text-default-500'>
          Are you sure you want to delete this thought? This action cannot be
          reversed.
        </p>
        <div className='p-4 rounded-2xl bg-default-50/50 border border-default-100/50 italic text-default-700 text-sm'>
          &quot;{post?.text}&quot;
        </div>
      </div>
    </ModalWrapper>
  )
}
export default ConfirmDeleteAuthorPostModal
