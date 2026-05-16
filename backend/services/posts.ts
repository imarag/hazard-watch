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
import { addLikedByUser } from '../utils/db.ts'

const getAllPosts = async (
  currentUserId: string | undefined,
): Promise<PostInDb[]> => {
  const posts = await PostModel.find().populate('user')
  return addLikedByUser(posts, currentUserId)
}

const searchPosts = async (
  { q, page, limit }: SearchParams,
  currentUserId: string | undefined,
): Promise<SearchResult> => {
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
  const postsWithLikes = await addLikedByUser(posts, currentUserId)
  return {
    posts: postsWithLikes,
    hasMore: totalPosts > offset + posts.length,
  }
}

const getPostById = async (
  id: string,
  currentUserId: string | undefined,
): Promise<PostInDb> => {
  const post = await PostModel.findById(id).populate('user')
  if (!post) throw new AppError(404, 'Post not found')

  const posts = await addLikedByUser([post], currentUserId)
  return posts[0]!
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
  const updatedPost = await PostModel.findByIdAndUpdate(id, post, {
    new: true,
  }).populate('user')
  if (!updatedPost) {
    throw new AppError(404, 'Post not found')
  }
  return updatedPost
}

const deletePost = async (id: string): Promise<void> => {
  const deletedPost = await PostModel.findByIdAndDelete(id)
  if (!deletedPost) {
    throw new AppError(404, 'Post not found')
  }
}

export default {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  searchPosts,
}
