import axios from 'axios'
import type { UserInDb, UserRegister } from '../types/user.ts'

const baseUrl = 'http://localhost:3000/users'

export const getAllUsers = async (): Promise<UserInDb[]> => {
  const res = await axios.get(baseUrl)
  return res.data
}

export const getUserById = async (id: string): Promise<UserInDb> => {
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data
}

export const getUserByEmail = async (email: string): Promise<UserInDb> => {
  const res = await axios.get(`${baseUrl}?email=${email}`)
  return res.data[0]
}

export const createUser = async (user: UserRegister): Promise<UserInDb> => {
  const res = await axios.post(`${baseUrl}`, user)
  return res.data
}
