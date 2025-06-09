'use client'
import { IChapter } from '@/api-utils/admin/interfaces/chapter.interfaces'
import { deleteChapter } from '@/api-utils/admin/requests/chapter.requests'
import ModalWrapper, {
  BaseModalProps,
} from '@/components/admin/elements/ModalWrapper'
import useGetAllChapters from '@/hooks/requests/useGetAllChapters'
import { addToast, Button } from '@heroui/react'
import { useState, type FC } from 'react'

interface DeleteChapterModalProps {
  selectedChapter: IChapter
}

const DeleteChapterModal: FC<DeleteChapterModalProps & BaseModalProps> = ({
  isOpen,
  setIsOpen,
  selectedChapter,
}) => {
  const { mutateAllChapters } = useGetAllChapters()
  const [isLoading, setIsLoading] = useState(false)
  const handleDelete = async () => {
    setIsLoading(true)
    try {
      await deleteChapter(selectedChapter?.id)
      addToast({
        title: 'Chapter deleted succesfully',
        color: 'warning',
        severity: 'warning',
      })
      setIsOpen(false)
      mutateAllChapters()
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
      title='Delete Chapter'
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
        <p>
          Are you sure you want to delete{' '}
          <strong className='font-semibold'>
            Chapter {selectedChapter?.number}: {selectedChapter?.chapterLabel}
          </strong>
          ?
        </p>
        <p>This action can not be undone.</p>
      </div>
    </ModalWrapper>
  )
}
export default DeleteChapterModal
