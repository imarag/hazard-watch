export interface CurrentUser {
  id: string
  email: string
  name: string
}

export type User = {
  id: string
  email: string
  name: string
}

export type UserLogin = Omit<User, 'name' | 'id'> & {
  password: string
}

export type UserRegister = Omit<User, 'id'> & {
  password: string
}

export type UserChangePassword = {
  currentPassword: string
  newPassword: string
}

export type UserUpdateInformation = {
  name?: string
}

export type UserForgotPassword = Pick<User, 'email'>

export type UserResetPassword = {
  token: string | null
  newPassword: string
}

export type LoginResponse = {
  id: string
  email: string
  name: string
  token: string
}
