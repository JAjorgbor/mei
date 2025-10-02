import axiosInstance from '@/api-utils/portal/request-adapter'

export const getPortalUser = () => axiosInstance.get('/user/details')
