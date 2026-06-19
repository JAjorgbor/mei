import axios from 'axios'
import Cookies from 'js-cookie'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  headers: {
    common: {
      'Content-Type': 'application/json',
    },
  },
})

export const ADMIN_REFRESH_KEY = 'adminRefreshToken'
export const ADMIN_ACCESS_KEY = 'adminAccessToken'

// === Refresh Token Lock Logic ===
let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error.response)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

// === Request Interceptor ===
axiosInstance.interceptors.request.use(async (config) => {
  const accessToken = Cookies.get(ADMIN_ACCESS_KEY)

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

// === Response Interceptor ===
axiosInstance.interceptors.response.use(
  (response) => {
    return {
      ...response,
      data: response.data.data || response.data,
    }
  },
  async (error) => {
    const originalConfig = error.config

    if (error?.response?.status === 401 && !originalConfig._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalConfig.headers.Authorization = `Bearer ${token}`
              resolve(axiosInstance(originalConfig))
            },
            reject: (err: any) => {
              reject(err.response)
            },
          })
        })
      }

      originalConfig._retry = true
      isRefreshing = true

      try {
        const refreshToken = Cookies.get(ADMIN_REFRESH_KEY)

        if (!refreshToken) throw new Error('No refresh token available')

        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}user/refresh`,
          { refreshToken },
          { headers: { 'Content-Type': 'application/json' } },
        )

        const newAccessToken = data.data.accessToken
        const newRefreshToken = data.data.refreshToken

        Cookies.set(ADMIN_ACCESS_KEY, newAccessToken)
        Cookies.set(ADMIN_REFRESH_KEY, newRefreshToken, { expires: 60 })

        axiosInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`
        processQueue(null, newAccessToken)

        originalConfig.headers.Authorization = `Bearer ${newAccessToken}`
        return axiosInstance(originalConfig)
      } catch (err) {
        console.log('Refresh failed', err)
        const cookieJar = Cookies.get()
        for (const cookieName in cookieJar) {
          if (cookieName.startsWith('admin')) {
            Cookies.remove(cookieName)
          }
        }
        window.location.href = '/admin'
        return processQueue(err, null)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error.response)
  },
)

export default axiosInstance
