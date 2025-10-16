'use client'

import { IUser } from '@/api-utils/global-interfaces/user.interfaces'
import { getPortalUser } from '@/api-utils/portal/requests/user.requests'
import useSWR from 'swr'

export default function useGetPortalUser() {
  const fetcher = async () => {
    const { data } = await getPortalUser()
    return data
  }
  const { data, error, mutate, isLoading } = useSWR<IUser>(
    `/api/portal/user`,
    fetcher
  )
  return {
    portalUser: data,
    portalUserError: error,
    portalUserLoading: isLoading,
    mutateUser: mutate,
  }
}
