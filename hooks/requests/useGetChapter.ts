'use client'

import { IChapter } from '@/api-utils/admin/interfaces/chapter.interfaces'
import { getChapter } from '@/api-utils/admin/requests/chapter.requests'
import useGetBook from '@/hooks/requests/useGetBook'
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
