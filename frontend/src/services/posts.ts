import { api } from '@/services/api'
import type { Post, NewPost } from '@/types/posts'

const baseUrl = '/posts'

const getAllPosts = async (): Promise<Post[]> => {
  const res = await api.get(baseUrl)
  return res.data
}

const getPostById = async (id: string): Promise<Post> => {
  console.log('Fetching post with id:', id, `${baseUrl}/${id}`)
  const res = await api.get(`${baseUrl}/${id}`)
  return res.data
}

const createPost = async (post: NewPost): Promise<Post> => {
  const res = await api.post(baseUrl, post)
  return res.data
}

const updatePost = async (post: NewPost, id: string): Promise<Post> => {
  const res = await api.put(`${baseUrl}/${id}`, post)
  return res.data
}

const deletePost = async (id: string): Promise<void> => {
  await api.delete(`${baseUrl}/${id}`)
}

export default { getAllPosts, getPostById, createPost, updatePost, deletePost }
