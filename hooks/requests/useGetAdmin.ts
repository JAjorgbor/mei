'use client'

import { getAdmin } from '@/api-utils/admin/requests/user.requests'
import useSWR from 'swr'

export default function useGetAdmin() {
  const fetcher = async () => {
    const { data } = await getAdmin()
    return data
  }
  const { data, error, mutate, isLoading } = useSWR(
    `/api/admin/details`,
    fetcher
  )
  return {
    admin: data,
    adminError: error,
    adminLoading: isLoading,
    mutateAdmin: mutate,
  }
}
