import axiosInstance from '@/api-utils/portal/request-adapter'

export const getPortalUserBookmarks = (userId: string) =>
  axiosInstance.get(`/bookmark/get/${userId}`)

export const createPortalUserBookmark = (userId: string, pageId: string) =>
  axiosInstance.post(`/bookmark/create`, { userId, pageId })

export const deletePortalUserBookmark = (bookmarkId: string) =>
  axiosInstance.delete(`/bookmark/remove/${bookmarkId}`)
