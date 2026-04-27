import { api, plainAxios } from '@/services/api'
import type { UserLogin, UserRegister, LoginResponse } from '@/types/users'

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

export default {
  login,
  register,
  logout,
  refreshToken,
}
