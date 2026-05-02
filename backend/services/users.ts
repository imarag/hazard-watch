import type { UserInDb, UserRegister } from '../types/users.js'
import { UserModel } from '../models/users.js'

const getUserById = async (id: string): Promise<UserInDb> => {
  const user = await UserModel.findById(id)
  if (!user) throw new Error('User not found')
  return user
}

const getUserByEmail = async (email: string): Promise<UserInDb | null> => {
  const user = await UserModel.findOne({ email })
  return user
}

const createUser = async (user: UserRegister): Promise<UserInDb> => {
  const newUser = new UserModel(user)
  await newUser.save()
  return newUser as UserInDb
}

export default {
  getUserByEmail,
  getUserById,
  createUser,
}
