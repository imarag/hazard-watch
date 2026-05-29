import type {
  CreatePostData,
  UpdatePostData,
  SearchParams,
} from '../posts/schema.ts'
import type { SearchResult } from '../posts/types.ts'
import { AppError } from '../errors.js'
import { prisma } from '../lib/prisma.ts'
import type { Post } from '../generated/prisma/client.js'

const getAllPosts = async (): Promise<Post[]> => {
  const posts = await prisma.post.findMany({ include: { author: true } })
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
    query['OR'] = [
      { title: { contains: trimmed, mode: 'insensitive' } },
      { description: { contains: trimmed, mode: 'insensitive' } },
      { hazardType: { contains: trimmed, mode: 'insensitive' } },
    ]
  }
  const offset = (page - 1) * limit
  const [posts, totalPosts] = await Promise.all([
    prisma.post.findMany({
      where: query,
      orderBy: { createdAt: 'desc' },
      skip: offset,
      take: limit,
      include: { author: true },
    }),
    prisma.post.count({ where: query }),
  ])
  return {
    posts: posts,
    hasMore: totalPosts > offset + posts.length,
  }
}

const getPostById = async (id: string): Promise<Post> => {
  const post = await prisma.post.findUnique({
    where: { id: id },
    include: { author: true },
  })
  if (!post) throw new AppError(404, 'Post not found')
  return post
}

const createPost = async (post: CreatePostData): Promise<Post> => {
  const newPost = await prisma.post.create({
    data: post,
    include: { author: true },
  })
  return newPost
}

const updatePost = async (post: UpdatePostData, id: string): Promise<Post> => {
  try {
    const updatedPost = await prisma.post.update({
      where: { id },
      data: post,
      include: { author: true },
    })
    return updatedPost
  } catch {
    throw new AppError(404, 'Post not found')
  }
}

const deletePost = async (id: string): Promise<void> => {
  try {
    await prisma.post.delete({ where: { id } })
  } catch {
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
