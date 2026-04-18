import z from 'zod'

export const UserLoginSchema = z.object({
  email: z.email(),
  password: z.string().min(5).max(12),
})

export const UserRegisterSchema = z.object({
  name: z.string().min(5).max(50),
  email: z.email(),
  password: z.string().min(5).max(12),
})
