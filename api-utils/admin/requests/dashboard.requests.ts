import axiosInstance from '@/api-utils/admin/request-adapter'

export const getDashboardStats = async () =>
  axiosInstance.get('/admin/dashboardAnalytics')
