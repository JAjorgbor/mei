import axios from 'axios'
import Cookies from 'js-cookie'
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
  const storedAccessToken = sessionStorage.getItem('accessToken')
  const storedRefreshToken = sessionStorage.getItem('refreshToken')
  const accessToken = storedAccessToken || session?.accessToken
  const refreshToken = storedRefreshToken || session?.refreshToken

  if (!storedAccessToken) {
    sessionStorage.setItem('accessToken', accessToken)
  }
  if (!storedRefreshToken) {
    sessionStorage.setItem('refreshToken', refreshToken)
  }

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

      const refreshToken =
        sessionStorage.getItem('refreshToken') || session?.refreshToken

      console.log('refreshing token', refreshToken)

      try {
        const { data } = await axiosInstance.post('admin/refresh', {
          refreshToken,
        })
        console.log(data)
        // TEMPORARILY store the new token for retry

        sessionStorage.setItem('accessToken', data.accessToken)
        sessionStorage.setItem('refreshToken', data.refreshToken)
        // Update Auth.js session with new token

        await signIn('credentials', {
          redirect: false,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          userData: JSON.stringify({
            ...session?.user,
          }),
        })
        axiosInstance.defaults.headers.Authorization = `Bearer ${data?.accessToken}`

        originalConfig.headers.Authorization = `Bearer ${data?.accessToken}`

        return axiosInstance(originalConfig) // Retry original request with new token
      } catch (error) {
        Promise.reject(error)
        const whiteListedAdminRoutes = [
          '/admin',
          '/admin/verify-access',
          '/admin/verify-email',
          '/admin/verify-access',
          '/admin/verify-email',
        ]
        console.log(error)
        sessionStorage.clear()
        await signOut({ redirect: false })
        const cookieJar = Cookies.get() // Get all existing cookies
        for (const cookieName in cookieJar) {
          Cookies.remove(cookieName) // Remove each cookie
        }
        window.location.href = '/admin'
      }
    }

    return Promise.reject(error.response)
  }
)

export default axiosInstance
