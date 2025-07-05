'use client'

import { IUser } from '@/api-utils/admin/interfaces/user.interfaces'
import { getUser } from '@/api-utils/admin/requests/user.requests'
import useSWR from 'swr'

export default function useGetUser(userId: string) {
  const fetcher = async () => {
    if (userId) {
      const { data } = await getUser(userId)
      return data
    }
  }
  const { data, error, mutate, isLoading } = useSWR<IUser>(
    `/api/users/${userId}`,
    fetcher
  )
  return {
    user: data,
    userError: error,
    userLoading: isLoading,
    mutateUser: mutate,
  }
}
