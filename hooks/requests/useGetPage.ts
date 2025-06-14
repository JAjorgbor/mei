'use client'

import { IPage } from '@/api-utils/admin/interfaces/page.interface'
import { getPage } from '@/api-utils/admin/requests/page.requests'
import useSWR from 'swr'

export default function useGetPage(pageId: string) {
  const fetcher = async () => {
    const { data } = await getPage(pageId)
    return data
  }
  const { data, error, mutate, isLoading } = useSWR<IPage>(
    `/api/page/${pageId}`,
    fetcher
  )
  return {
    page: data,
    pageError: error,
    pageLoading: isLoading,
    mutatePage: mutate,
  }
}
