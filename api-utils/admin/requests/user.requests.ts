import axiosInstance from '@/api-utils/admin/request-adapter'

export const getAdmin = async () => {
  return axiosInstance.get('/user/details')
}
