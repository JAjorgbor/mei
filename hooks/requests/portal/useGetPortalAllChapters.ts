'use client'

import { IChapter } from '@/api-utils/global-interfaces/chapter.interfaces'
import { IList } from '@/api-utils/global-interfaces/lists.interace'
import { getPortalAllChapters } from '@/api-utils/portal/requests/chapter.requests'
import useSWR from 'swr'

const BOOK_ID = process.env.NEXT_PUBLIC_BOOK_ID

export default function useGetPortalAllChapters() {
  const fetcher = async () => {
    if (BOOK_ID) {
      const { data } = await getPortalAllChapters(BOOK_ID)
      return data
    }
  }
  const { data, error, mutate, isLoading, isValidating } = useSWR<
    IList<IChapter>
  >(`/api/portal/chapters/${BOOK_ID}`, fetcher, {
    revalidateOnFocus: false,
  })
  return {
    allChapters: data,
    allChaptersError: error,
    allChaptersLoading: isLoading,
    allChaptersValidating: isValidating,
    mutateAllChapters: mutate,
  }
}
