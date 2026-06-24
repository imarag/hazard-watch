import { api, plainAxios } from '@/lib/api'
import type {
  UserLogin,
  UserRegister,
  UserForgotPassword,
  UserResetPassword,
} from '@/features/users/types'
import type {
  LoginResponse,
  RefreshResponse,
  UpdateInformationResponse,
} from '@/features/auth/types'

const baseUrl = '/auth'

export const login = async (user: UserLogin): Promise<LoginResponse> => {
  const res = await api.post(`${baseUrl}/login`, user)
  return res.data
}

export const register = async (user: UserRegister) => {
  const res = await api.post(`${baseUrl}/register`, user)
  return res.data
}

export const logout = async () => {
  const res = await api.post(`${baseUrl}/logout`)
  return res.data
}

export const refreshToken = async (): Promise<RefreshResponse> => {
  const res = await plainAxios.post(`${baseUrl}/refresh`)
  return res.data
}

export const sendResetLink = async (payload: UserForgotPassword) => {
  const res = await api.post(`${baseUrl}/forgot-password`, payload)
  return res.data
}

export const resetPassword = async (payload: UserResetPassword) => {
  const res = await api.post(`${baseUrl}/reset-password`, payload)
  return res.data
}

export const changePassword = async (data: {
  currentPassword: string
  newPassword: string
}) => {
  const res = await api.put(`${baseUrl}/change-password`, data)
  return res.data
}

export const updateInformation = async (data: {
  name?: string
}): Promise<UpdateInformationResponse> => {
  const res = await api.put(`${baseUrl}/update-information`, data)
  return res.data
}
