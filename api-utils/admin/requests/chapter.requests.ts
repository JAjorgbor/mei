import axiosInstance from '@/api-utils/admin/request-adapter'

export const createChapter = (data: any) =>
  axiosInstance.post('/chapter/create', data)

export const getAllChapters = (bookId: string) =>
  axiosInstance.get(`chapter/get/${bookId}`)
