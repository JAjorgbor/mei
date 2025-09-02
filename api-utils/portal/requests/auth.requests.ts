import axiosInstance from '@/api-utils/admin/request-adapter'

export const signUp = (data: any) => axiosInstance.post(`/user/sign-up`, data)
