import { api } from '@/services/api'
import type {
  User,
  UserRegister,
  UserForgotPassword,
} from '@/types/users.js'

const baseUrl = '/users'

const createUser = async (user: UserRegister): Promise<User> => {
  const res = await api.post(`${baseUrl}`, user)
  return res.data
}

const resetPassword = async (user: UserForgotPassword): Promise<User> => {
  const res = await api.post(`${baseUrl}/reset-password`, user)
  return res.data
}

export default {
  createUser,
  resetPassword,
}
