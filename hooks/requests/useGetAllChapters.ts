'use client'

import { IChapter } from '@/api-utils/admin/interfaces/chapter.interfaces'
import { getAllChapters } from '@/api-utils/admin/requests/chapter.requests'
import useGetBook from '@/hooks/requests/useGetBook'
import useSWR from 'swr'

export default function useGetAllChapters() {
  const { book } = useGetBook()

  const fetcher = async () => {
    if (book?.id) {
      const { data } = await getAllChapters(book?.id)
      return data
    }
  }
  const { data, error, mutate, isLoading } = useSWR<IChapter[]>(
    `/api/chapters/${book?.id}`,
    fetcher
  )
  return {
    allChapters: data,
    allChaptersError: error,
    allChaptersLoading: isLoading,
    mutateAllChapters: mutate,
  }
}
