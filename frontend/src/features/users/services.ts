import { api } from '@/lib/api'
import type { User, UserRegister, UserForgotPassword } from '@/features/users/types'

const baseUrl = '/users'

const createUser = async (data: UserRegister): Promise<User> => {
  const res = await api.post(baseUrl, data)
  return res.data
}

const resetPassword = async (data: UserForgotPassword): Promise<void> => {
  await api.post(`${baseUrl}/reset-password`, data)
}

export default {
  createUser,
  resetPassword,
}
