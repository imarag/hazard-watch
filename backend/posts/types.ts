import { HazardType } from '../hazards/shared/types.ts'

export type Post = {
  id: string
  created_at: Date
  updated_at: Date
  title: string
  hazard_type: HazardType
  description: string
  author_id: string
  longitude: number
  latitude: number
  author_name: string
  author_email: string
}

export type SearchResult = {
  posts: Post[]
  hasMore: boolean
}
