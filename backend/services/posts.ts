import axios from 'axios'
import type { PostInDb, PostPayload } from '../types/posts.ts'
import type { UpdatePostInput } from '../types/posts.ts'

const baseUrl = 'http://localhost:3000/posts'

const getAllPosts = async (): Promise<PostInDb[]> => {
  const res = await axios.get(baseUrl)
  return res.data
}

const getPostById = async (id: string): Promise<PostInDb> => {
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data
}

const createPost = async (post: PostPayload): Promise<PostInDb> => {
  const res = await axios.post(baseUrl, post)
  return res.data
}

const updatePost = async (
  post: UpdatePostInput,
  id: string,
): Promise<PostInDb> => {
  const res = await axios.patch(`${baseUrl}/${id}`, post)
  return res.data
}

const deletePost = async (id: string): Promise<void> => {
  await axios.delete(`${baseUrl}/${id}`)
}

export default { getAllPosts, getPostById, createPost, updatePost, deletePost }
