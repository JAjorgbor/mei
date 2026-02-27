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

// === Refresh Token Lock Logic ===
let isRefreshing = false
let failedQueue: any[] = []

export const PORTAL_REFRESH_KEY = 'portalRefreshToken'
export const PORTAL_ACCESS_KEY = 'portalAccessToken'

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

// === Request Interceptor ===
axiosInstance.interceptors.request.use(async (config) => {
  const session: any = await getSession()
  const storedAccessToken = sessionStorage.getItem(PORTAL_ACCESS_KEY)
  const storedRefreshToken = sessionStorage.getItem(PORTAL_REFRESH_KEY)
  const accessToken =
    storedAccessToken && storedAccessToken !== 'undefined'
      ? storedAccessToken
      : session?.accessToken
  const refreshToken =
    storedRefreshToken && storedRefreshToken !== 'undefined'
      ? storedRefreshToken
      : session?.refreshToken
  sessionStorage.setItem(PORTAL_ACCESS_KEY, accessToken)
  sessionStorage.setItem(PORTAL_REFRESH_KEY, refreshToken)

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
      data: response.data.data,
    }
  },
  async (error) => {
    const session: any = await getSession()
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
              reject(err)
            },
          })
        })
      }

      originalConfig._retry = true
      isRefreshing = true

      try {
        const refreshToken =
          sessionStorage.getItem(PORTAL_REFRESH_KEY) || session?.refreshToken

        const { data } = await axiosInstance.post(
          'user/refresh',
          { refreshToken },
          { headers: { Authorization: null } }, // prevent stale token usage
        )

        sessionStorage.setItem(PORTAL_ACCESS_KEY, data.accessToken)
        sessionStorage.setItem(PORTAL_REFRESH_KEY, data.refreshToken)

        await signIn('credentials', {
          redirect: false,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          userData: JSON.stringify({
            ...session?.user,
          }),
        })

        axiosInstance.defaults.headers.Authorization = `Bearer ${data.accessToken}`
        processQueue(null, data.accessToken)

        originalConfig.headers.Authorization = `Bearer ${data.accessToken}`
        return axiosInstance(originalConfig)
      } catch (err) {
        console.log(error)
        sessionStorage.clear()
        await signOut({ redirect: false })
        const cookieJar = Cookies.get() // Get all existing cookies
        for (const cookieName in cookieJar) {
          Cookies.remove(cookieName) // Remove each cookie
        }
        window.location.href = '/portal'
        return processQueue(err, null)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)

export default axiosInstance
