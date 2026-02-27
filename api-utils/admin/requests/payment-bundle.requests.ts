import axiosInstance from '@/api-utils/admin/request-adapter'

export const createPaymentBundle = (data: any) =>
  axiosInstance.post(`payment/create-payment-bundle`, data)

export const getPaymentBundles = (limit = 6, page = 1) =>
  axiosInstance.get(`payment/get-payment-bundles`, {
    params: { limit, page },
  })
export const updatePaymentBundle = (id: string, data: any) =>
  axiosInstance.patch(`payment/update-payment-bundle/${id}`, data)

export const deletePaymentBundle = (id: string) =>
  axiosInstance.delete(`payment/delete-payment-bundle/${id}`)
