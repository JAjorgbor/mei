import axiosInstance from '@/api-utils/portal/request-adapter'

export const getPortalAllChapters = (bookId: string) =>
  axiosInstance.get(`/chapter/user/get/allChapters/${bookId}`, {
    params: { limit: 1000 },
  })

export const getPortalChapter = (chapterId: string) =>
  axiosInstance.get(`chapter/user/get/chapterId/${chapterId}`)

export const getPortalChapterPages = (chapterId: string) =>
  axiosInstance.get(`/page/get/${chapterId}`)
