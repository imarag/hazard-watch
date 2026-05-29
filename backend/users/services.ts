import { prisma } from '../lib/prisma.ts'
import type { User } from '../generated/prisma/index.js'
import type { UserRegister } from '../users/schema.ts'

const getUserByEmail = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({ where: { email: email } })
  return user
}

const createUser = async (user: UserRegister): Promise<User> => {
  const newUser = await prisma.user.create({ data: user })
  return newUser
}

export default {
  getUserByEmail,
  createUser,
}
