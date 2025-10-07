'use client'

import { IChapter } from '@/api-utils/global-interfaces/chapter.interfaces'
import { getPortalChapter } from '@/api-utils/portal/requests/chapter.requests'
import useSWR from 'swr'

export default function useGetPortalChapter(chapterId: string) {
  const fetcher = async () => {
    const { data } = await getPortalChapter(chapterId)
    return data
  }
  const { data, error, mutate, isLoading } = useSWR<IChapter>(
    `/api/portal/chapters/${chapterId}`,
    fetcher
  )
  return {
    chapter: data,
    chapterError: error,
    chapterLoading: isLoading,
    mutateChapter: mutate,
  }
}
