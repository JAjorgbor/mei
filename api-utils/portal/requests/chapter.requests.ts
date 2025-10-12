import axiosInstance from '@/api-utils/portal/request-adapter'

export const getPortalAllChapters = (
  bookId: string,
  { start = 0, stop = 100 }: { start?: number; stop?: number }
) =>
  axiosInstance.get(`/chapter/user/get/allChapters/${bookId}`, {
    params: { start, stop },
  })

export const getPortalChapter = (chapterId: string) =>
  axiosInstance.get(`chapter/user/get/chapterId/${chapterId}`)

export const getPortalChapterPages = (chapterId: string) =>
  axiosInstance.get(`/page/get/${chapterId}`)
