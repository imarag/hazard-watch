import type { Post } from '@/features/posts/types'

export const createPostTooltip = (post: Post) => ({
  Title: post.title,
  'Hazard Type': post.hazardType,
  Description: post.description,
  Longitude: post.longitude,
  Latitude: post.latitude,
  'Reported by': post.author.name,
  'Reported at': new Date(post.createdAt).toLocaleDateString(),
})
