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

// Login to admin
export const login = async (data: any) =>
  axiosInstance.post(`admin/sign-in`, data)

export const verifyAccess = async (data: any) =>
  axiosInstance.post(`admin/verify`, data)
