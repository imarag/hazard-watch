import axios from 'axios'
import type { Post, NewPost } from '../types/posts.ts'

const baseUrl = 'http://localhost:3000/posts'

const getAllPosts = async (): Promise<Post[]> => {
  const res = await axios.get(baseUrl)
  return res.data
}

const getPostById = async (id: string): Promise<Post> => {
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data
}

const createPost = async (post: NewPost): Promise<Post> => {
  const res = await axios.post(baseUrl, post)
  return res.data
}

const updatePost = async (post: NewPost, id: string): Promise<Post> => {
  const res = await axios.put(`${baseUrl}/${id}`, post)
  return res.data
}

const deletePost = async (id: string): Promise<void> => {
  await axios.delete(`${baseUrl}/${id}`)
}

export default { getAllPosts, getPostById, createPost, updatePost, deletePost }
