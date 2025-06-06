'use client'

import { IAdmin } from '@/api-utils/admin/interfaces/admin.interface'
import { getAdmin } from '@/api-utils/admin/requests/admin.requests'
import useSWR from 'swr'

export default function useGetAdmin() {
  const fetcher = async () => {
    const { data } = await getAdmin()
    return data
  }
  const { data, error, mutate, isLoading } = useSWR<IAdmin>(
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
