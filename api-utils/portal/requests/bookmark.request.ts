import axiosInstance from '@/api-utils/portal/request-adapter'

export const getPortalUserBookmarks = (userId: string) =>
  axiosInstance.get(`/bookmark/get/${userId}`)
