import axiosInstance from '@/api-utils/admin/request-adapter'

export const registerUser = (data: any) =>
  axiosInstance.post(`/user/sign-up`, data)

export const loginUser = (data: any) =>
  axiosInstance.post(`/user/sign-in`, data)
