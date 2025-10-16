'use client'

import { ILike } from '@/api-utils/global-interfaces/like.interface'
import { getPortalUserLikes } from '@/api-utils/portal/requests/like.requests'
import useSWR from 'swr'

export default function useGetPortalUserLikes() {
  const fetcher = async () => {
    const { data } = await getPortalUserLikes()
    return data
  }
  const { data, error, mutate, isLoading } = useSWR<ILike[]>(
    `/api/portal/likes/users`,
    fetcher
  )
  return {
    userLikes: data,
    userLikesError: error,
    userLikesLoading: isLoading,
    mutateUserLikes: mutate,
  }
}
