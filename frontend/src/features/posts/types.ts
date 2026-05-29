import { HazardType } from '@/features/hazards/types'
import type { SvgIconComponent } from '@mui/icons-material'

export type Post = {
  id: string
  createdAt: string
  updatedAt: string
  title: string
  hazardType: HazardType
  description: string
  author: { name: string; id: string; email: string; createdAt: string }
  authorId: string
  longitude: number
  latitude: number
}

export type CreatePost = Pick<
  Post,
  'title' | 'hazardType' | 'description' | 'longitude' | 'latitude'
>

export type SearchParams = {
  q?: string
  page: number
}

export type SearchResult = {
  posts: Post[]
  hasMore: boolean
}

export type PostMeta = {
  muiIcon: SvgIconComponent
  color: string
  backgroundColor: string
}
