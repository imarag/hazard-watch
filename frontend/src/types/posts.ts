import type { HazardType, Location } from '@/types/hazards'

type BasePost = {
  title: string
  description: string
  user: { name: string; id: string; email: string }
  hazardType: HazardType
  location: Location
  createdAt: string
}

export type Post = BasePost & {
  id: string
}

export type CreatePost = Omit<BasePost, 'createdAt' | 'user'>

export type SortField = 'createdAt' | 'hazardType' | 'title' | 'author'
export type SortDirection = 'asc' | 'desc'

export type SearchParams = {
  q?: string
  page: number
}

export type SearchResult = {
  posts: Post[]
  hasMore: boolean
}
