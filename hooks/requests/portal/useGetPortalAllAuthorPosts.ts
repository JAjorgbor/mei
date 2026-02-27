'use client'

import { getPortalAllAuthorPosts } from '@/api-utils/portal/requests/author-room.requests'
import { IAuthorPost } from '@/api-utils/global-interfaces/author-room.interfaces'
import { IList } from '@/api-utils/global-interfaces/lists.interace'
import useSWR from 'swr'

export default function useGetPortalAllAuthorPosts(limit = 6, page = 1) {
  const fetcher = async () => {
    const { data } = await getPortalAllAuthorPosts(limit, page)
    return data
  }

  const { data, error, mutate, isLoading } = useSWR<IList<IAuthorPost>>(
    `/api/portal/author-room/get-all?limit=${limit}&page=${page}`,
    fetcher,
  )

  return {
    allPosts: data,
    allPostsError: error,
    allPostsLoading: isLoading,
    mutateAllPosts: mutate,
  }
}
