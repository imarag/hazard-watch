import axios from 'axios'
import type { UserInDb, UserRegister } from '@/types/users.ts'

const baseUrl = '/users'

const getAllUsers = async (): Promise<UserInDb[]> => {
  const res = await axios.get(baseUrl)
  return res.data
}

const getUserById = async (id: string): Promise<UserInDb> => {
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data
}

const getUserByEmail = async (email: string): Promise<UserInDb> => {
  const res = await axios.get(`${baseUrl}?email=${email}`)
  return res.data[0]
}

const createUser = async (user: UserRegister): Promise<UserInDb> => {
  const res = await axios.post(`${baseUrl}`, user)
  return res.data
}

export default {
  getAllUsers,
  getUserByEmail,
  getUserById,
  createUser,
}
