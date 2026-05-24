import type { User } from '../generated/prisma/client.js'

export type UserPublic = Omit<User, 'password'> & {
  id: string
}