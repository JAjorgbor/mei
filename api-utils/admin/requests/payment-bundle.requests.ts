import axiosInstance from '@/api-utils/admin/request-adapter'

export const createPaymentBundle = (data: any) =>
  axiosInstance.post(`payment/create-payment-bundle`, data)

export const getPaymentBundles = () =>
  axiosInstance.get(`payment/get-payment-bundles`)
