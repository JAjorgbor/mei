'use client'

import { IAdmin } from '@/api-utils/admin/interfaces/admin.interface'
import { getAdminTeam } from '@/api-utils/admin/requests/admin.requests'
import useSWR from 'swr'

export default function useGetAdminTeam() {
  const fetcher = async () => {
    const { data } = await getAdminTeam()
    return data
  }
  const { data, error, mutate, isLoading } = useSWR<IAdmin[]>(
    `/api/endpoint`,
    fetcher
  )
  return {
    adminTeam: data,
    adminTeamError: error,
    adminTeamLoading: isLoading,
    mutateAdminTeam: mutate,
  }
}
