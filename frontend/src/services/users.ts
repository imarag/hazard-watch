import { api } from '@/services/api'
import type {
  UserPublic,
  UserRegister,
  UserForgotPassword,
} from '@/types/users.ts'

const baseUrl = '/users'

const getUserById = async (id: string): Promise<UserPublic> => {
  const res = await api.get(`${baseUrl}/${id}`)
  return res.data
}

const createUser = async (user: UserRegister): Promise<UserPublic> => {
  const res = await api.post(`${baseUrl}`, user)
  return res.data
}

const resetPassword = async (user: UserForgotPassword): Promise<UserPublic> => {
  const res = await api.post(`${baseUrl}`, user)
  return res.data
}

export default {
  getUserById,
  createUser,
  resetPassword,
}
