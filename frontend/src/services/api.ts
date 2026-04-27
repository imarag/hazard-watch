import axios from 'axios'
import authService from '@/services/auth.ts'
import { appRoutes } from '@/constants/routes'

let accessToken: string | null = null

export const getToken = (): string | null => {
  return accessToken
}

export const setToken = (token: string | null): void => {
  accessToken = token
}

export const clearToken = (): void => {
  accessToken = null
}

export const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
})

export const plainAxios = axios.create({
  baseURL: '/api',
  withCredentials: true,
})

api.interceptors.request.use((request) => {
  const token = getToken()

  if (token) {
    request.headers.Authorization = `Bearer ${token}`
  }

  return request
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // skip refresh for auth routes
    const isAuthRoute =
      originalRequest?.url?.includes(appRoutes.login.path) ||
      originalRequest?.url?.includes(appRoutes.register.path)

    if (
      error.response?.status === 401 &&
      !originalRequest?._retry &&
      !isAuthRoute
    ) {
      originalRequest._retry = true
      try {
        const res = await authService.refreshToken()
        setToken(res.token)
        error.config.headers.Authorization = `Bearer ${res.token}`
        return api(originalRequest)
      } catch (refreshError) {
        clearToken()
        // window.location.href = '/auth/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)
