import type { HazardType, Location } from './hazards'

type BasePost = {
  title: string
  description: string
  user: { name: string; id: string; email: string }
  userName: string
  hazardType: HazardType
  location: Location
  createdAt: string
}

export type Post = BasePost & {
  id: string
}

export type CreatePost = Omit<BasePost, 'createdAt' | 'user'>

export type SortField = 'createdAt' | 'hazardType' | 'title' | 'userName'
export type SortDirection = 'asc' | 'desc'
