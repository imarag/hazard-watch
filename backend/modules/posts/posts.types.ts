import { type HazardType } from '../hazards/index.js'

export type PostInDb = {
  id: string
  created_at: Date
  updated_at: Date
  title: string
  hazard_type: HazardType
  description: string
  author_id: string
  geom: string
}

// What the API returns
export type Post = {
  id: string
  createdAt: Date
  updatedAt: Date
  title: string
  hazardType: HazardType
  description: string
  longitude: number
  latitude: number
  author: {
    id: string
    name: string
    email: string
  }
}

export type SearchResult = {
  posts: Post[]
  hasMore: boolean
}