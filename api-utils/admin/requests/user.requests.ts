import axiosInstance from '@/api-utils/admin/request-adapter'

export const getAllUsers = async () =>
  axiosInstance.get(`user/all/user-details`)

export const getUser = async (userId: string) =>
  axiosInstance.get(`user/user-details/${userId}`)
