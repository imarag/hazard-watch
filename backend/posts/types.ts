import { HazardType } from '../hazards/shared/types.ts'

export type Post = {
  id: string
  created_at: Date
  updated_at: Date
  title: string
  hazard_type: HazardType
  description: string
  author_id: string
  geom: string
}

export type SearchResult = {
  posts: Post[]
  hasMore: boolean
}
