import { api } from '@/services/api'
import type {
  Post,
  CreatePost,
  SearchParams,
  SearchResult,
} from '@/types/posts'

const baseUrl = '/posts'

const getAllPosts = async (): Promise<Post[]> => {
  const res = await api.get(baseUrl)
  return res.data
}
const searchPosts = async ({
  page,
  q,
}: SearchParams): Promise<SearchResult> => {
  const res = await api.get(`${baseUrl}/search`, {
    params: { q, page },
  })
  return res.data
}

const getPostById = async (id: string): Promise<Post> => {
  const res = await api.get(`${baseUrl}/${id}`)
  return res.data
}

const createPost = async (post: CreatePost): Promise<Post> => {
  const res = await api.post(baseUrl, post)
  return res.data
}

const updatePost = async (post: CreatePost, id: string): Promise<Post> => {
  const res = await api.put(`${baseUrl}/${id}`, post)
  return res.data
}

const deletePost = async (id: string): Promise<void> => {
  await api.delete(`${baseUrl}/${id}`)
}

export default {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  searchPosts,
}
