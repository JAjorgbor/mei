'use client'

import { IChapter } from '@/api-utils/global-interfaces/chapter.interfaces'
import { getPortalAllChapters } from '@/api-utils/portal/requests/chapter.requests'
import useSWR from 'swr'

const BOOK_ID = process.env.NEXT_PUBLIC_BOOK_ID

export default function useGetPortalAllChapters({ start = 0, stop = 100 }) {
  const fetcher = async () => {
    if (BOOK_ID) {
      const { data } = await getPortalAllChapters(BOOK_ID, {
        start,
        stop,
      })
      return data
    }
  }
  const { data, error, mutate, isLoading, isValidating } = useSWR<IChapter[]>(
    `/api/portal/chapters/${BOOK_ID}?start=${start}&stop=${stop}`,
    fetcher,
    { revalidateOnFocus: false }
  )
  return {
    allChapters: data,
    allChaptersError: error,
    allChaptersLoading: isLoading,
    allChaptersValidating: isValidating,
    mutateAllChapters: mutate,
  }
}
