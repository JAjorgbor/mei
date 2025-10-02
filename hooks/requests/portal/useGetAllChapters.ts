'use client'

import { IChapter } from '@/api-utils/global-interfaces/chapter.interfaces'
import { getAllChapters } from '@/api-utils/portal/requests/chapter.requests'
import useSWR from 'swr'

const BOOK_ID = process.env.NEXT_PUBLIC_BOOK_ID

export default function useGetAllChapters() {
  const fetcher = async () => {
    if (BOOK_ID) {
      const { data } = await getAllChapters(BOOK_ID)
      return data
    }
  }
  const { data, error, mutate, isLoading } = useSWR<IChapter[]>(
    `/api/chapters/${BOOK_ID}`,
    fetcher
  )
  return {
    allChapters: data,
    allChaptersError: error,
    allChaptersLoading: isLoading,
    mutateAllChapters: mutate,
  }
}
