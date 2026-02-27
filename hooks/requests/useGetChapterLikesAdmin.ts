'use client'

import { ILike } from '@/api-utils/global-interfaces/like.interface'
import { IList } from '@/api-utils/global-interfaces/lists.interace'
import { getChapterLikesAdmin } from '@/api-utils/admin/requests/like.requests'
import useSWR from 'swr'

export default function useGetChapterLikesAdmin(chapterId: string) {
  const fetcher = async () => {
    const { data } = await getChapterLikesAdmin(chapterId)
    return data
  }
  const { data, error, mutate, isLoading } = useSWR<IList<ILike>>(
    `/api/admin/chapter/${chapterId}/likes`,
    fetcher,
  )
  return {
    chapterLikes: data,
    chapterLikesError: error,
    chapterLikesLoading: isLoading,
    mutateChapterLikes: mutate,
  }
}
