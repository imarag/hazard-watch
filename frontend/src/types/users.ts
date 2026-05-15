export interface CurrentUser {
  id: string
  email: string
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

export type UserForgotPassword = Pick<BaseUser, 'email'>
export type UserResetPassword = {
  token: string | null
  newPassword: string
}

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
