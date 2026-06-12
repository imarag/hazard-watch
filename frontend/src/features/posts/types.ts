import { HazardType } from '@/features/hazards/types'
import type { SvgIconComponent } from '@mui/icons-material'

export type Post = {
  id: string
  created_at: string
  updated_at: string
  title: string
  hazard_type: HazardType
  description: string
  author: { name: string; id: string; email: string; createdAt: string }
  author_id: string
  longitude: number
  latitude: number
}

export type CreatePost = Pick<
  Post,
  'title' | 'hazard_type' | 'description' | 'longitude' | 'latitude'
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

export type PostQueryParams = {
  hazardType: HazardType
}
