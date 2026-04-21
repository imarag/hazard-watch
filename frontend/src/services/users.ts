import { api } from '@/services/api'
import type { UserPublic, UserRegister } from '@/types/users.ts'

const baseUrl = '/users'

const getAllUsers = async (): Promise<UserPublic[]> => {
  const res = await api.get(baseUrl)
  return res.data
}

const getUserById = async (id: string): Promise<UserPublic> => {
  const res = await api.get(`${baseUrl}/${id}`)
  return res.data
}

const getUserByEmail = async (email: string): Promise<UserPublic> => {
  const res = await api.get(`${baseUrl}?email=${email}`)
  return res.data[0]
}

const createUser = async (user: UserRegister): Promise<UserPublic> => {
  const res = await api.post(`${baseUrl}`, user)
  return res.data
}

export default {
  getAllUsers,
  getUserByEmail,
  getUserById,
  createUser,
}
