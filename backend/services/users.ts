import axios from 'axios'
import { toPublicUser } from '../utils/auth.ts'
import type { UserInDb, UserRegister, UserPublic } from '../types/users.ts'

const baseUrl = 'http://localhost:3000/users'

const getAllUsers = async (): Promise<UserPublic[]> => {
  const res = await axios.get(baseUrl)
  const users: UserInDb[] = res.data
  const publicUsers = users.map((user) => toPublicUser(user))
  return publicUsers
}

const getUserById = async (id: string): Promise<UserPublic> => {
  const res = await axios.get(`${baseUrl}/${id}`)
  const user: UserInDb = res.data
  const publicUser = toPublicUser(user)
  return publicUser
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
