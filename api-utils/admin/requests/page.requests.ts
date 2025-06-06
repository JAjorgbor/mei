import axiosInstance from '@/api-utils/admin/request-adapter'

export const addNewPage = async (bookId: string, data: any) =>
  axiosInstance.post(`/page/create/${bookId}`, data)
