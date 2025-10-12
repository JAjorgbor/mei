'use client'

import { IChapter } from '@/api-utils/global-interfaces/chapter.interfaces'
import { getPortalAllChapters } from '@/api-utils/portal/requests/chapter.requests'
import useSWR from 'swr'

const BOOK_ID = process.env.NEXT_PUBLIC_BOOK_ID

export default function useGetPortalAllChapters() {
  const fetcher = async () => {
    if (BOOK_ID) {
      const { data } = await getPortalAllChapters(BOOK_ID, {
        start: 0,
        stop: 100,
      })
      return data
    }
  }
  const { data, error, mutate, isLoading } = useSWR<IChapter[]>(
    `/api/portal/chapters/${BOOK_ID}`,
    fetcher
  )
  return {
    allChapters: data,
    allChaptersError: error,
    allChaptersLoading: isLoading,
    mutateAllChapters: mutate,
  }
}
