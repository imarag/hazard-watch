export interface CurrentUser {
  id: string
  email: string
}

export type User = {
  id: string
  email: string
  name: string
}

export type UserLogin = Omit<User, 'name' | 'id'>

export type UserRegister = Omit<User, 'id'>

export type UserForgotPassword = Pick<User, 'email'>

export type UserResetPassword = {
  token: string | null
  newPassword: string
}

export type LoginResponse = {
  id: string
  email: string
  token: string
}
