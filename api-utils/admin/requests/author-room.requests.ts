import axiosInstance from '@/api-utils/admin/request-adapter'

export const createAuthorPost = (data: any) =>
  axiosInstance.post('/author_room/', data)

export const getAllAuthorPosts = (limit = 6, page = 1) =>
  axiosInstance.get('/author_room/', { params: { limit, page } })

export const deleteAuthorPost = (postId: string) =>
  axiosInstance.delete(`/author_room/${postId}`)
