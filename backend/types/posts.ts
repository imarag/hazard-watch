import { NewPostSchema } from '../models/posts.ts'
import { z } from 'zod'

export type Post = {
  title: string
  description: string
  userId: string
  createdAt: string
  updatedAt: string
  id: string
}

export type NewPost = z.infer<typeof NewPostSchema>
