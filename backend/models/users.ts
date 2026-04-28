import z from 'zod'
import mongoose from 'mongoose'
import type { UserInDb } from '../types/users.js'

const emailField = z
  .string()
  .trim()
  .toLowerCase()
  .email('Please enter a valid email address')

const passwordField = z
  .string()
  .min(6, 'Password must be at least 6 characters long')
  .max(72, 'Password is too long, please use fewer than 72 characters')

const nameField = z
  .string()
  .trim()
  .min(2, 'Name must be at least 2 characters long')
  .max(80, 'Name is too long, please use fewer than 80 characters')
  .regex(
    /^[a-zA-ZÀ-ÿ\s'-]+$/,
    'Name can only contain letters, spaces, hyphens and apostrophes',
  )

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
        const id = ret['_id']
        if (id != null) {
          ret['id'] = String(id)
        }
        delete ret['_id']
        delete ret['__v']
        delete ret['password']
      },
    },
  },
)

export const UserModel = mongoose.model<UserInDb>('User', UserSchema)
