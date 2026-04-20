'use client'

import { IUser } from '@/api-utils/global-interfaces/user.interfaces'
import { getPortalUser } from '@/api-utils/portal/requests/user.requests'
import useSWR from 'swr'
import Cookies from 'js-cookie'
import { PORTAL_USER_ID } from '@/api-utils/portal/request-adapter'

export default function useGetPortalUser() {
  const userId = Cookies.get(PORTAL_USER_ID)
  const fetcher = async () => {
    const { data } = await getPortalUser()
    return data
  }
  const { data, error, mutate, isLoading } = useSWR<IUser>(
    userId ? `/api/portal/user/${userId}` : null,
    fetcher,
  )
  return {
    portalUser: data,
    portalUserError: error,
    portalUserLoading: isLoading,
    mutateUser: mutate,
  }
}
