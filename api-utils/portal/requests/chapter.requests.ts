import axiosInstance from '@/api-utils/portal/request-adapter'

export const getAllChapters = (bookId: string) =>
  axiosInstance.get(`/chapter/user/get/allChapters/${bookId}`)
