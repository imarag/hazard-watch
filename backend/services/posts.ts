import type {
  PostInDb,
  PostPayload,
  UpdatePostInput,
  SearchParams,
  SearchResult,
} from '../types/posts.js'
import { PostModel } from '../models/posts.js'
import { escapeRegex } from '../utils/route.js'

const getAllPosts = async (): Promise<PostInDb[]> => {
  const posts = await PostModel.find().populate('user')
  return posts
}

const searchPosts = async ({
  q,
  page,
  limit,
}: SearchParams): Promise<SearchResult> => {
  const query: Record<string, unknown> = {}

  const trimmed = q?.trim()
  if (trimmed) {
    const regex = new RegExp(escapeRegex(trimmed), 'i')
    query['$or'] = [
      { title: regex },
      { description: regex },
      { hazardType: regex },
    ]
  }
  const offset = (page - 1) * limit
  const [posts, totalPosts] = await Promise.all([
    PostModel.find(query)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate('user'),
    PostModel.countDocuments(query),
  ])

  return {
    posts,
    hasMore: totalPosts > offset + posts.length,
  }
}

const getPostById = async (id: string): Promise<PostInDb> => {
  const post = await PostModel.findById(id).populate('user')
  if (!post) throw new Error('Post not found')
  return post
}

const createPost = async (post: PostPayload): Promise<PostInDb> => {
  console.log(post, '****888')
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
  const deleted = await PostModel.findByIdAndDelete(id)
  if (!deleted) throw new Error('Post not found')
}

export default {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  searchPosts,
}
