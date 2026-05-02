import z from 'zod'
import mongoose from 'mongoose'
import type { UserInDb } from '../types/users.js'

const emailField = z
  .email('Please enter a valid email address')
  .trim()
  .toLowerCase()

const passwordField = z
  .string()
  .min(6, 'Password must be at least 6 characters long')
  .max(72, 'Password is too long, please use fewer than 72 characters')

const nameField = z
  .string()
  .trim()
  .min(2, 'Name must be at least 2 characters long')
  .max(80, 'Name is too long, please use fewer than 80 characters')
  .regex(/^[a-zA-Z\s-]+$/, 'Name can only contain letters, spaces and hyphens')

export const UserLoginSchema = z.object({
  email: emailField,
  password: passwordField,
})

export const UserRegisterSchema = z.object({
  name: nameField,
  email: emailField,
  password: passwordField,
})

export const UserForgotPasswordSchema = z.object({
  email: emailField,
})

export const UserResetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  newPassword: passwordField,
})

const UserSchema = new mongoose.Schema<UserInDb>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
  },
  {
    toJSON: {
      transform: (_, ret: Record<string, unknown>) => {
        ret['id'] = String(ret['_id'])
        delete ret['_id']
        delete ret['__v']
        delete ret['password']
      },
    },
  },
)

export const UserModel = mongoose.model<UserInDb>('User', UserSchema)
