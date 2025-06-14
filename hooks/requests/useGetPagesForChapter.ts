'use client'

import { IPage } from '@/api-utils/admin/interfaces/page.interface'
import { getPagesForChapter } from '@/api-utils/admin/requests/page.requests'
import useSWR from 'swr'

export default function useGetPagesForChapter(chapterId: string) {
  const fetcher = async () => {
    const { data } = await getPagesForChapter(chapterId)
    return data
  }
  const { data, error, mutate, isLoading } = useSWR<IPage[]>(
    `/api/pages/${chapterId}`,
    fetcher
  )
  return {
    pages: data,
    pagesError: error,
    pagesLoading: isLoading,
    mutatePages: mutate,
  }
}
