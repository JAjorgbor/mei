import { getChapterComments } from '@/api-utils/admin/requests/comment.requests'
import { IComment } from '@/api-utils/global-interfaces/comment.interfaces'
import useSWR from 'swr'

export default function useGetChapterComments(chapterId: string) {
  const fetcher = async () => {
    const { data } = await getChapterComments(chapterId)
    return data
  }

  const { data, error, mutate, isLoading } = useSWR<IComment[]>(
    chapterId ? `/api/comments/${chapterId}` : null,
    fetcher,
  )

  return {
    chapterComments: data,
    chapterCommentsLoading: isLoading,
    mutateChapterComments: mutate,
    chapterCommentsError: error,
  }
}
