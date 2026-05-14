import type {
  PostInDb,
  CreatePostData,
  UpdatePostData,
  SearchParams,
  SearchResult,
} from '../types/posts.js'
import { PostModel } from '../models/posts.js'
import { escapeRegex } from '../utils/route.js'
import { AppError } from '../errors.js'

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
  if (!post) {
    throw new AppError(404, 'Post not found')
  }
  return post
}

const createPost = async (post: CreatePostData): Promise<PostInDb> => {
  const newPost = new PostModel(post)
  await newPost.save()
  return newPost.populate('user')
}

const updatePost = async (
  post: UpdatePostData,
  id: string,
): Promise<PostInDb> => {
  const existingPost = await PostModel.findById(id)

  if (!existingPost) {
    throw new AppError(404, 'Post not found')
  }

  Object.assign(existingPost, post)

  await existingPost.save()

  return existingPost.populate('user')
}

const deletePost = async (id: string): Promise<void> => {
  const existingPost = await PostModel.findById(id)

  if (!existingPost) {
    throw new AppError(404, 'Post not found')
  }

  await existingPost.deleteOne()
}

export default {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  searchPosts,
}
