import axiosInstance from '@/api-utils/admin/request-adapter'

export const getAdmin = async () => {
  return axiosInstance.get('/admin/details')
}

export const getAdminTeam = async () => {
  return axiosInstance.get('/admin/all/details/')
}
export const updateAdmin = async (data: any) => {
  return axiosInstance.patch('/admin/update', data)
}
