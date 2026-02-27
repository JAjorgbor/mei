import axiosInstance from '@/api-utils/admin/request-adapter'

export const getChapterComments = (chapterId: string) =>
  axiosInstance.get(`/comment/get/${chapterId}`)

export const deleteChapterComment = (commentId: string) =>
  axiosInstance.delete(`/comment/admin/remove/${commentId}`)

export const createAdminComment = (data: any) =>
  axiosInstance.post(`/comment/create`, data)
