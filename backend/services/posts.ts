import type { PostInDb, PostPayload } from '../types/posts.js'
import type { UpdatePostInput } from '../types/posts.js'
import { PostModel } from '../models/posts.js'

const getAllPosts = async (): Promise<PostInDb[]> => {
  const posts = await PostModel.find().populate('user')
  return posts
}

const getPostById = async (id: string): Promise<PostInDb> => {
  const post = await PostModel.findById(id).populate('user')
  if (!post) throw new Error('Post not found')
  return post
}

const createPost = async (post: PostPayload): Promise<PostInDb> => {
  const newPost = new PostModel(post)
  await newPost.save()
  return newPost.populate('user')
}

const updatePost = async (
  post: UpdatePostInput,
  id: string,
): Promise<PostInDb> => {
  const updated = await PostModel.findByIdAndUpdate(
    id,
    { $set: post },
    { new: true },
  )
  if (!updated) throw new Error('Post not found')
  return updated.populate('user')
}

const deletePost = async (id: string): Promise<void> => {
  await PostModel.findByIdAndDelete(id)
}

export default { getAllPosts, getPostById, createPost, updatePost, deletePost }
