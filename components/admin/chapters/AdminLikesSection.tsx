'use client'
import { ILike } from '@/api-utils/global-interfaces/like.interface'
import useGetChapterLikesAdmin from '@/hooks/requests/useGetChapterLikesAdmin'
import {
  Avatar,
  Card,
  CardBody,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react'
import moment from 'moment'
import { useParams } from 'next/navigation'

const AdminLikesSection = () => {
  const { chapterId } = useParams()
  const { chapterLikes: chapterLikesData, chapterLikesLoading } =
    useGetChapterLikesAdmin(chapterId as string)
  const items = chapterLikesData?.items || []

  if (chapterLikesLoading) {
    return (
      <div className='space-y-4'>
        {[1, 2, 3].map((each) => (
          <Skeleton key={each} className='h-16 w-full rounded-xl' />
        ))}
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <Card className='mt-8'>
        <CardBody className='py-20 flex flex-col items-center justify-center text-center'>
          <p className='text-default-500 font-medium text-lg'>
            No likes yet for this chapter.
          </p>
        </CardBody>
      </Card>
    )
  }

  return (
    <div className='mt-8'>
      <Table
        aria-label='Chapter likes table'
        className='bg-background/60 shadow-md backdrop-blur-md rounded-2xl'
      >
        <TableHeader>
          <TableColumn>USER</TableColumn>
          <TableColumn>TYPE</TableColumn>
          <TableColumn>DATE LIKED</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item: ILike) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className='flex items-center gap-3'>
                  <Avatar src={item?.userData?.avatar || ''} size='sm' />
                  <div className='flex flex-col'>
                    <span className='font-bold text-sm'>
                      {item?.userData?.firstName} {item?.userData?.lastName}
                    </span>
                    <span className='text-tiny text-default-400'>
                      {item?.userData?.email}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className='capitalize bg-secondary/10 text-secondary px-2 py-1 rounded-full text-xs font-bold'>
                  {item.likeType || 'Chapter'}
                </span>
              </TableCell>
              <TableCell>
                {moment(item.dateCreated).format('MMM DD, YYYY')}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default AdminLikesSection
