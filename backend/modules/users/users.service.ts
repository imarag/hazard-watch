import type { UserRegister } from '../auth/index.js'
import * as usersRepo from './users.repo.js'
import type { UserInDb } from './users.types.js'

export const getUserByEmail = async (email: string) => {
  const existingUser = await usersRepo.getByEmail(email)
  return existingUser ?? null
}

export const getUserById = async (userId: string) => {
  const existingUser = await usersRepo.getById(userId)
  return existingUser ?? null
}

export const createUser = async (data: UserRegister) => {
  const createdUser = await usersRepo.createOne(data)
  return createdUser
}

export const updateUser = async (userId: string, data: Partial<UserInDb>) => {
  const updatedUser = await usersRepo.updateOne(userId, data)
  return updatedUser
}
