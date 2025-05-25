import axiosInstance from '@/api/admin/request-adapter'
import axios from 'axios'

// Login to admin
export const login = async (data: any) =>
  axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/sign-in`, data)

export const verifyAccess = async (data: any) =>
  axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/verify`, data)
