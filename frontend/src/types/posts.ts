type BasePost = {
  title: string
  description: string
  userId: string
  createdAt: string
}

export type Post = BasePost & {
  id: string
}

export type NewPost = Omit<BasePost, 'createdAt' | 'userId'>
