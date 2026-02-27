'use client'

import { getAllUsers } from '@/api-utils/admin/requests/user.requests'
import { IUser } from '@/api-utils/global-interfaces/user.interfaces'
import useSWR from 'swr'

export default function useGetAllUsers() {
  const fetcher = async () => {
    const { data } = await getAllUsers()
    return data
  }
  const { data, error, mutate, isLoading } = useSWR<IUser[]>(
    `/api/users/all`,
    fetcher,
  )
  return {
    allUsers: data,
    allUsersError: error,
    allUsersLoading: isLoading,
    mutateAllUsers: mutate,
  }
}
