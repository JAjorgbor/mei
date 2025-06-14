'use client'
import { IPage } from '@/api-utils/admin/interfaces/page.interface'
import { deleteChapter } from '@/api-utils/admin/requests/chapter.requests'
import { deletePage } from '@/api-utils/admin/requests/page.requests'
import ModalWrapper, {
  BaseModalProps,
} from '@/components/admin/elements/ModalWrapper'
import useGetAllChapters from '@/hooks/requests/useGetAllChapters'
import useGetPagesForChapter from '@/hooks/requests/useGetPagesForChapter'
import { addToast, Button } from '@heroui/react'
import { useParams } from 'next/navigation'
import { useState, type FC } from 'react'

interface DeletePageModalProps {
  selectedPage: IPage
}

const DeletePageModal: FC<DeletePageModalProps & BaseModalProps> = ({
  isOpen,
  setIsOpen,
  selectedPage,
}) => {
  const { chapterId } = useParams()
  const { mutatePages } = useGetPagesForChapter(chapterId as string)
  const [isLoading, setIsLoading] = useState(false)
  const handleDelete = async () => {
    setIsLoading(true)
    try {
      await deletePage(selectedPage?.id)
      addToast({
        title: 'Page deleted succesfully',
        color: 'warning',
        severity: 'warning',
      })
      setIsOpen(false)
      mutatePages()
    } catch (error: any) {
      addToast({
        title: error?.data?.details
          ? JSON.stringify(error?.data?.details)
          : error?.message || 'Something went wrong. Please try again later.',
        color: 'danger',
        severity: 'danger',
      })
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <ModalWrapper
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title='Delete Page'
      footer={
        <div className='flex gap-3 justify-end'>
          <Button size='sm' color='danger' onPress={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            size='sm'
            color='danger'
            variant='ghost'
            onPress={handleDelete}
            isLoading={isLoading}
          >
            Delete
          </Button>
        </div>
      }
    >
      <div>
        <p>Are you sure you want to delete this page ?</p>
        <p>This action can not be undone.</p>
      </div>
    </ModalWrapper>
  )
}
export default DeletePageModal
