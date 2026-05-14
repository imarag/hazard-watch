import {
  CreatePostPayloadSchema,
  UpdatePostPayloadSchema,
  SearchParamsSchema,
} from '../models/posts.js'
import { z } from 'zod'
import { HazardType } from './hazards.js'
import type { Location } from './hazards.js'

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
export type CreatePostPayload = z.infer<typeof CreatePostPayloadSchema>
export type UpdatePostPayload = z.infer<typeof UpdatePostPayloadSchema>

// what server saves to DB
export type CreatePostData = CreatePostPayload & {
  user: string
}

export type UpdatePostData = UpdatePostPayload

export type SearchParams = z.infer<typeof SearchParamsSchema>

export type SearchResult = {
  posts: PostInDb[]
  hasMore: boolean
}
