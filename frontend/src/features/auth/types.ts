import type { User } from '@/features/users/types'

export type LoginResponse = {
  accessToken: string
  user: User
}

export type RefreshResponse = {
  accessToken: string
  user: User
}

export type UpdateInformationResponse = {
  user: User
}
