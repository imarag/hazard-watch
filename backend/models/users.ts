import z from 'zod'
import mongoose from 'mongoose'
import type { UserInDb } from '../types/users.js'

export const UserLoginSchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(72, 'Password is too long'),
})

export const UserRegisterSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(80, 'Name is too long')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Name contains invalid characters'),

  email: z.email().trim().toLowerCase(),

  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(72, 'Password is too long')
    .regex(/[A-Z]/, 'Password must contain an uppercase letter')
    .regex(/[a-z]/, 'Password must contain a lowercase letter')
    .regex(/[0-9]/, 'Password must contain a number'),
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
