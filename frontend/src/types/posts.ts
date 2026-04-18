import type { HazardType, Location } from './hazards'

type BasePost = {
  title: string
  description: string
  userId: string
  hazardType: HazardType
  location: Location
  createdAt: string
}

export type Post = BasePost & {
  id: string
}

export type NewPost = Omit<BasePost, 'createdAt' | 'userId'>
