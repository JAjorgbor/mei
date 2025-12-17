'use client'

import { IBookmark } from '@/api-utils/global-interfaces/bookmark.interfaces'
import { getPortalUserBookmarks } from '@/api-utils/portal/requests/bookmark.requests'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'

export default function useGetPortalBookmarks() {
  const { data: session } = useSession()
  const fetcher = async () => {
    if (session?.user) {
      const { data } = await getPortalUserBookmarks(session?.user.userId)
      return data
    }
  }
  const { data, error, mutate, isLoading } = useSWR<IBookmark[]>(
    `/api/user/bookmarks/${JSON.stringify(session?.user)}`,
    fetcher
  )
  return {
    bookmarks: data,
    bookmarksError: error,
    bookmarksLoading: isLoading,
    mutateBookmarks: mutate,
  }
}
