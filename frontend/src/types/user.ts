export interface CurrentUser {
  id: string
  email: string
}

export type CurrentUserContextType = {
  currentUser: CurrentUser | null
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>
}

type BaseUser = {
  email: string
  password: string
  name: string
}

export type UserInDb = BaseUser & {
  id: string
}

export type UserPublic = Omit<BaseUser, 'password'> & {
  id: string
}

export type UserLogin = Omit<BaseUser, 'name'>

export type UserRegister = BaseUser

export type UserPayload = {
  id: string
  email: string
  tokenType: 'access' | 'refresh'
}

export type LoginResponse = {
  id: string
  email: string
  token: string
}
