import z from 'zod'
import { emailField, nameField, passwordField } from '../users/index.ts'

export const UserLoginSchema = z.object({
  email: emailField,
  password: passwordField,
})

export const UserRegisterSchema = z.object({
  name: nameField,
  email: emailField,
  password: passwordField,
})

export const UserUpdatePasswordSchema = z.object({
  currentPassword: passwordField.optional(),
  newPassword: passwordField.optional(),
})

export const UserForgotPasswordSchema = z.object({
  email: emailField,
})

export const UserResetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  newPassword: passwordField,
})

export type UserLogin = z.infer<typeof UserLoginSchema>
export type UserUpdatePassword = z.infer<typeof UserUpdatePasswordSchema>
export type UserRegister = z.infer<typeof UserRegisterSchema>
export type UserForgotPassword = z.infer<typeof UserForgotPasswordSchema>
export type UserResetPassword = z.infer<typeof UserResetPasswordSchema>
