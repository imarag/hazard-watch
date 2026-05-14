import { api } from '@/services/api'
import type {
  UserPublic,
  UserRegister,
  UserForgotPassword,
} from '@/types/users.js'

const baseUrl = '/users'

const createUser = async (user: UserRegister): Promise<UserPublic> => {
  const res = await api.post(`${baseUrl}`, user)
  return res.data
}

const resetPassword = async (user: UserForgotPassword): Promise<UserPublic> => {
  const res = await api.post(`${baseUrl}/reset-password`, user)
  return res.data
}

export default {
  createUser,
  resetPassword,
}
