'use client'

import { IPage } from '@/api-utils/global-interfaces/page.interface'
import { getPagesForChapter } from '@/api-utils/admin/requests/page.requests'
import useSWR from 'swr'
import { IList } from '@/api-utils/global-interfaces/lists.interace'

export default function useGetPagesForChapter(chapterId: string) {
  const fetcher = async () => {
    const { data } = await getPagesForChapter(chapterId)
    return data
  }
  const { data, error, mutate, isLoading } = useSWR<IList<IPage>>(
    `/api/pages/${chapterId}`,
    fetcher,
  )
  return {
    pages: data,
    pagesError: error,
    pagesLoading: isLoading,
    mutatePages: mutate,
  }
}
