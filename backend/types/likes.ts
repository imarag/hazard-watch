export type LikeInDb = {
  id: string
  user: string
  post: string
  createdAt: Date
  updatedAt: Date
}

export type NewLike = Omit<LikeInDb, 'id' | 'createdAt' | 'updatedAt'>
