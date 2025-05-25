import axiosInstance from '@/api/admin/request-adapter'

export const getAdmin = async () => {
  return axiosInstance.get('/user/details')
}
