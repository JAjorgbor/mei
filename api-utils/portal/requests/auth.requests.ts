import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

axiosInstance.interceptors.response.use((response) => {
  return {
    ...response,
    data: response.data.data,
  }
})

export const registerUser = (data: any) =>
  axiosInstance.post(`/user/sign-up`, data)

export const loginUser = (data: any) =>
  axiosInstance.post(`/user/sign-in`, data)

export const forgotPassword = (data: { email: string }) =>
  axiosInstance.post(`/user/forgot-password`, data)

export const resetPassword = (data: any) =>
  axiosInstance.post(`/user/reset-password`, data)

export const googleExchange = (code: string) =>
  axiosInstance.post(`/user/google/exchange`, { code })
