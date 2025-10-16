import axiosInstance from '@/api-utils/portal/request-adapter'

export const likeChapter = (data: any) =>
  axiosInstance.post('/like/create', { likeType: 'Liked Chapter', ...data })

export const unlikeChapter = (likeId: string) =>
  axiosInstance.delete(`/like/remove/${likeId}`)

export const getPortalUserLikes = () => axiosInstance.get('/like/get')

export const getChapterLikes = (chapterId: string) =>
  axiosInstance.get(`/like/get/${chapterId}`)
