import axiosInstance from '@/api-utils/admin/request-adapter'

export const createChapter = (data: any) =>
  axiosInstance.post('/chapter/create', data)

export const updateChapter = (chapterId: string, data: any) =>
  axiosInstance.patch(`/chapter/update/${chapterId}`, data)

export const getAllChapters = (bookId: string) =>
  axiosInstance.get(`chapter/get/allChapters/${bookId}`)

export const getChapter = (chapterId: string) =>
  axiosInstance.get(`chapter/get/chapterId/${chapterId}`)

export const deleteChapter = (chapterId: string) =>
  axiosInstance.delete(`chapter/delete/${chapterId}`)
