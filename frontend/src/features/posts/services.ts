import { api } from '@/lib/api'
import type {
  Post,
  CreatePost,
  SearchParams,
  SearchResult,
} from '@/features/posts/types'

const baseUrl = '/posts'

export const searchPosts = async ({
  page,
  limit,
  q,
}: SearchParams): Promise<SearchResult> => {
  const res = await api.get(`${baseUrl}/search`, {
    params: { q, page, limit },
  })
  return res.data
}

export const getPostById = async (id: string): Promise<Post> => {
  const res = await api.get(`${baseUrl}/${id}`)
  return res.data
}

export const createPost = async (post: CreatePost): Promise<Post> => {
  const res = await api.post(baseUrl, post)
  return res.data
}

export const updatePost = async (
  id: string,
  post: CreatePost,
): Promise<Post> => {
  const res = await api.put(`${baseUrl}/${id}`, post)
  return res.data
}

export const deletePost = async (id: string): Promise<void> => {
  await api.delete(`${baseUrl}/${id}`)
}
