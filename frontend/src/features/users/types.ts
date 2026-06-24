export interface User {
  id: string
  email: string
  name: string
}

export type UserLogin = {
  email: string
  password: string
}

export type UserRegister = {
  email: string
  name: string
  password: string
}

export type UserForgotPassword = {
  email: string
}

export type UserUpdateInformation = {
  name?: string
}

export type UserChangePassword = {
  currentPassword: string
  newPassword: string
}

export type UserResetPassword = {
  token: string | null
  newPassword: string
}