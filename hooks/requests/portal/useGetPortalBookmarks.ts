'use client'

import { IBookmark } from '@/api-utils/global-interfaces/bookmark.interfaces'
import { IList } from '@/api-utils/global-interfaces/lists.interace'
import { PORTAL_USER_ID } from '@/api-utils/portal/request-adapter'
import { getPortalUserBookmarks } from '@/api-utils/portal/requests/bookmark.requests'
import useSWR from 'swr'
import Cookies from 'js-cookie'

export default function useGetPortalBookmarks() {
  const userId = Cookies.get(PORTAL_USER_ID)

  const fetcher = async () => {
    const { data } = await getPortalUserBookmarks(userId as string)
    return data
  }

  const { data, error, mutate, isLoading } = useSWR<IList<IBookmark>>(
    `/api/user/bookmarks/${JSON.stringify(userId)}`,
    fetcher,
  )
  return {
    bookmarks: data,
    bookmarksError: error,
    bookmarksLoading: isLoading,
    mutateBookmarks: mutate,
  }
}
