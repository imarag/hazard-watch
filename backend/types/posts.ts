import { CreatePostSchema, UpdatePostSchema } from '../models/posts.js'
import { z } from 'zod'
import { HazardType } from './hazards.js'

export type BasePost = {
  title: string
  description: string
  user: { name: string; email: string; id: string }
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
  user: string
}

export type SearchParams = {
  q?: string | undefined
  cursor?: string | undefined
  limit?: number | undefined
}

export type FeedResult = {
  data: PostInDb[]
  nextCursor: string | null
}
