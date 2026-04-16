import axios from 'axios'
import type { UserLogin, UserRegister, LoginResponse } from '@/types/user'

const baseUrl = 'http://localhost:3001/auth'

const login = async (user: UserLogin): Promise<LoginResponse> => {
  const res = await axios.post(`${baseUrl}/login`, user)
  return res.data
}

const register = async (user: UserRegister) => {
  const res = await axios.post(`${baseUrl}/register`, user)
  return res.data
}

const logout = async () => {
  const res = await axios.post(`${baseUrl}/logout`)
  return res.data
}

export default {
  login,
  register,
  logout,
}
