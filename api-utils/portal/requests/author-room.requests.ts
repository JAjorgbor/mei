import axiosInstance from '@/api-utils/portal/request-adapter'

export const getPortalAllAuthorPosts = (limit = 6, page = 1) =>
  axiosInstance.get('/author_room/', { params: { limit, page } })
