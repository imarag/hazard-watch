import type { Post } from '../generated/prisma/client.js'

export type SearchResult = {
  posts: Post[]
  hasMore: boolean
}
