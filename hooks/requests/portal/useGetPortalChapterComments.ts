'use client'

import { IComment } from '@/api-utils/global-interfaces/comment.interfaces'
import { getChapterComments } from '@/api-utils/portal/requests/comment.requests'
import useSWR from 'swr'

export default function useGetPortalChapterComments(chapterId: string) {
  const fetcher = async () => {
    const { data } = await getChapterComments(chapterId)
    return data.reverse()
  }
  const { data, error, mutate, isLoading } = useSWR<IComment[]>(
    `/api/chapters/${chapterId}/comments`,
    fetcher
  )
  return {
    chapterComments: data,
    chapterCommentsError: error,
    chapterCommentsLoading: isLoading,
    mutateChapterComments: mutate,
  }
}
