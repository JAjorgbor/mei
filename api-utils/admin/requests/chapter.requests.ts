import axiosInstance from '@/api-utils/admin/request-adapter'

export const createChapter = (data: any) =>
  axiosInstance.post('/chapter/create', data)

export const updateChapter = (chapterId: string, data: any) =>
  axiosInstance.patch(`/chapter/update/${chapterId}`, data)

export const getAllChapters = (
  bookId: string,
  { limit, page }: { limit?: number; page?: number } = { limit: 100, page: 1 },
) =>
  axiosInstance.get(`chapter/admin/get/allChapters/${bookId}`, {
    params: { limit, page },
  })

export const getChapter = (chapterId: string) =>
  axiosInstance.get(`chapter/admin/get/chapterId/${chapterId}`)

export const deleteChapter = (chapterId: string) =>
  axiosInstance.delete(`chapter/delete/${chapterId}`)
