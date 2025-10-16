import axiosInstance from '@/api-utils/portal/request-adapter'

export const createComment = (data: any) =>
  axiosInstance.post(`/comment/create`, data)

export const getChapterComments = (chapterId: string) =>
  axiosInstance.get(`/comment/get/${chapterId}`)

export const deleteChapterComment = (commentId: string) =>
  axiosInstance.delete(`/comment/user/remove/${commentId}`)
