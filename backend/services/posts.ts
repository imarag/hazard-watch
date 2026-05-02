import type { PostInDb, PostPayload } from '../types/posts.js'
import type { UpdatePostInput } from '../types/posts.js'
import { PostModel } from '../models/posts.js'
import { ObjectId } from 'mongodb'
import type { SearchParams } from '../types/posts.js'
import { escapeRegex } from '../utils/route.js'

const getAllPosts = async (): Promise<PostInDb[]> => {
  const posts = await PostModel.find().populate('user')
  return posts
}

const searchPosts = async ({ q, cursor, limit = 20 }: SearchParams) => {
  const query: Record<string, unknown> = {}

  const trimmedQ = q?.trim()
  if (trimmedQ) {
    const regex = new RegExp(escapeRegex(trimmedQ), 'i')
    query['$or'] = [
      { title: regex },
      { description: regex },
      { hazardType: regex },
      { 'user.name': regex },
      { 'user.email': regex },
    ]
  }

  if (cursor) {
    query['_id'] = { $lt: new ObjectId(cursor) }
  }
  const posts = await PostModel.find(query)
    .sort({ _id: -1 })
    .limit(limit)
    .populate('user')

  const lastPost = posts[posts.length - 1]
  const nextCursor =
    posts.length === limit && lastPost ? lastPost._id.toString() : null

  return { data: posts, nextCursor }
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

export default {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  searchPosts,
}
