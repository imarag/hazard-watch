import z from 'zod'
import mongoose from 'mongoose'
import type { UserInDb } from '../types/users.ts'

export const UserLoginSchema = z.object({
  email: z.email(),
  password: z.string().min(5).max(12),
})

export const UserRegisterSchema = z.object({
  name: z.string().min(5).max(50),
  email: z.email(),
  password: z.string().min(5).max(12),
})

const UserSchema = new mongoose.Schema<UserInDb>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
  },
  {
    toJSON: {
      transform: (_, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
        delete ret.password
      },
    },
  },
)

export const UserModel = mongoose.model<UserInDb>('User', UserSchema)
