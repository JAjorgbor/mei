'use client'

import { getChapter } from '@/api-utils/admin/requests/chapter.requests'
import { IChapter } from '@/api-utils/global-interfaces/chapter.interfaces'
import useSWR from 'swr'

export default function useGetChapter(chapterId: string) {
  const fetcher = async () => {
    const { data } = await getChapter(chapterId)
    return data
  }
  const { data, error, mutate, isLoading } = useSWR<IChapter>(
    `/api/chapters/${chapterId}`,
    fetcher
  )
  return {
    chapter: data,
    chapterError: error,
    chapterLoading: isLoading,
    mutateChapter: mutate,
  }
}
