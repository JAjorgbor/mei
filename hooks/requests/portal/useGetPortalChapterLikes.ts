'use client'

import { ILike } from '@/api-utils/global-interfaces/like.interface'
import { IList } from '@/api-utils/global-interfaces/lists.interace'
import { getChapterLikes } from '@/api-utils/portal/requests/like.requests'
import useSWR from 'swr'

export default function useGetPortalChapterLikes(chapterId: string) {
  const fetcher = async () => {
    const { data } = await getChapterLikes(chapterId)
    return data
  }
  const { data, error, mutate, isLoading } = useSWR<IList<ILike>>(
    `/api/portal/chapter/${chapterId}/likes`,
    fetcher,
  )
  return {
    chapterLikes: data,
    chapterLikesError: error,
    chapterLikesLoading: isLoading,
    mutateChapterLikes: mutate,
  }
}
