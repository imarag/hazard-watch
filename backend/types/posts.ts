import { CreatePostSchema, UpdatePostSchema } from '../models/posts.ts'
import { z } from 'zod'
import { HazardType } from './hazards.ts'

export type BasePost = {
  title: string
  description: string
  userId: string
  userName: string
  hazardType: HazardType
  location: Location
  createdAt: string
}

export type PostInDb = BasePost & {
  id: string
}

// what UI sends for create and update
export type CreatePostInput = z.infer<typeof CreatePostSchema>
export type UpdatePostInput = z.infer<typeof UpdatePostSchema>

// what server saves to DB
export type PostPayload = CreatePostInput & {
  userId: string
  userName: string
  createdAt: string
}
