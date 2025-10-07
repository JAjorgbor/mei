import axiosInstance from '@/api-utils/portal/request-adapter'

export const getPortalAllChapters = (bookId: string) =>
  axiosInstance.get(`/chapter/user/get/allChapters/${bookId}`)

export const getPortalChapter = (chapterId: string) =>
  axiosInstance.get(`chapter/user/get/chapterId/${chapterId}`)
