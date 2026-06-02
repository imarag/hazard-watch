import { api, plainAxios } from '@/lib/api'
import type {
  UserLogin,
  UserRegister,
  LoginResponse,
  UserForgotPassword,
  UserResetPassword,
} from '@/features/users/types'

const baseUrl = '/auth'

const login = async (user: UserLogin): Promise<LoginResponse> => {
  const res = await api.post(`${baseUrl}/login`, user)
  return res.data
}

const register = async (user: UserRegister) => {
  const res = await api.post(`${baseUrl}/register`, user)
  return res.data
}

const logout = async () => {
  const res = await api.post(`${baseUrl}/logout`)
  return res.data
}

const refreshToken = async () => {
  const res = await plainAxios.post(`${baseUrl}/refresh`)
  return res.data
}

const sendResetLink = async (payload: UserForgotPassword) => {
  const res = await api.post(`${baseUrl}/forgot-password`, payload)
  return res.data
}

const resetPassword = async (payload: UserResetPassword) => {
  const res = await api.post(`${baseUrl}/reset-password`, payload)
  return res.data
}

const changePassword = async (data: {
  currentPassword: string
  newPassword: string
}) => {
  const res = await api.put(`${baseUrl}/change-password`, data)
  return res.data
}

const updateInformation = async (data: { name?: string }) => {
  const res = await api.put(`${baseUrl}/update-information`, data)
  return res.data
}

export default {
  login,
  register,
  logout,
  refreshToken,
  resetPassword,
  sendResetLink,
  changePassword,
  updateInformation,
}
