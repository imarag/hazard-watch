import { z } from 'zod'

export const NewPostSchema = z.object({
  title: z.string().min(3).max(30),
  description: z.string().min(5).max(500),
  createdAt: z.string(),
  userId: z.string(),
})
