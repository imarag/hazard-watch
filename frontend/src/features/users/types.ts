export interface User {
  id: string
  email: string
  name: string
}

// Form types
export type UserLogin = Pick<User, 'email'> & { password: string }
export type UserRegister = Omit<User, 'id'> & { password: string }
export type UserForgotPassword = Pick<User, 'email'>
export type UserUpdateInformation = Partial<Pick<User, 'name'>>

export type UserChangePassword = {
  currentPassword: string
  newPassword: string
}

export type UserResetPassword = {
  token: string | null
  newPassword: string
}