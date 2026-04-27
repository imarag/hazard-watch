import type { UserInDb, UserRegister } from '../types/users.js'
import { UserModel } from '../models/users.js'

const getAllUsers = async (): Promise<UserInDb[]> => {
  const users = await UserModel.find()
  return users
}

const getUserById = async (id: string): Promise<UserInDb> => {
  const user = await UserModel.findById(id)
  if (!user) throw new Error('User not found')
  return user
}

const getUserByEmail = async (email: string): Promise<UserInDb | null> => {
  const user = await UserModel.findOne({ email })
  if (!user) return null
  return user
}

const createUser = async (user: UserRegister): Promise<UserInDb> => {
  const newUser = new UserModel(user)
  await newUser.save()
  return newUser.toJSON() as UserInDb
}

export default {
  getAllUsers,
  getUserByEmail,
  getUserById,
  createUser,
}
