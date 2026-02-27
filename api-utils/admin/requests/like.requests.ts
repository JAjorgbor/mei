import axiosInstance from '@/api-utils/admin/request-adapter'

export const getChapterLikesAdmin = (chapterId: string) =>
  axiosInstance.get(`/like/get/${chapterId}`)
