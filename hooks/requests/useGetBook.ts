'use client'

import { IBook } from '@/api-utils/admin/interfaces/book.interface'
import { getAllBooks } from '@/api-utils/admin/requests/book.requests'
import useSWR from 'swr'

export default function useGetBook() {
  const fetcher = async () => {
    const { data } = await getAllBooks()
    return data?.[0]
  }
  const { data, error, mutate, isLoading } = useSWR<IBook>(
    `/api/admin/book`,
    fetcher
  )
  return {
    book: data,
    bookError: error,
    bookLoading: isLoading,
    mutateBook: mutate,
  }
}
