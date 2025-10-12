'use client'

import { IPage } from '@/api-utils/global-interfaces/page.interface'
import { getPortalChapterPages } from '@/api-utils/portal/requests/chapter.requests'
import useSWR from 'swr'

export default function useGetPortalPagesForChapter(chapterId: string) {
  const fetcher = async () => {
    const { data } = await getPortalChapterPages(chapterId)
    return data
  }

  const { data, error, mutate, isLoading } = useSWR<IPage[]>(
    `/api/portal/chapter/${chapterId}/pages`,
    fetcher
  )

  return {
    pages: data,
    pagesError: error,
    pagesLoading: isLoading,
    mutatePages: mutate,
  }
}
