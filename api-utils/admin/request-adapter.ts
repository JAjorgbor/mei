import axios from 'axios'
import { getSession, signIn, signOut } from 'next-auth/react'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  headers: {
    common: {
      'Content-Type': 'application/json',
    },
  },
})

axiosInstance.interceptors.request.use(async (config) => {
  const session: any = await getSession()
  const accessToken = session?.accessToken

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const session: any = await getSession()
    const originalConfig = error.config

    if (
      error.response &&
      error.response.status === 401 &&
      !originalConfig._retry
    ) {
      originalConfig._retry = true // Mark as retried

      const refreshToken = session?.refreshToken

      try {
        const { data } = await axiosInstance.post('admin/refresh', {
          refreshToken,
        })
        const newRefreshToken = data.refresh.token

        // Update Auth.js session with new token
        await signIn('credentials', {
          redirect: false,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          userData: JSON.stringify(session?.user),
        })

        axiosInstance.defaults.headers.Authorization = `Bearer ${data?.accessToken}`

        originalConfig.headers.Authorization = `Bearer ${data?.accessToken}`

        return axiosInstance(originalConfig) // Retry original request with new token
      } catch (error) {
        const whiteListedAdminRoutes = [
          '/admin',
          '/admin/verify-access',
          '/admin/verify-email',
          '/admin/verify-access',
          '/admin/verify-email',
        ]

        signOut()
        return Promise.reject(error)
      }
    }

    return Promise.reject(error.response)
  }
)

export default axiosInstance
