import { AppError } from '../../lib/errors.js'
import type { Post, SearchResult } from './posts.types.js'
import type {
  CreatePostData,
  UpdatePostData,
  SearchParams,
  CreatePostDbData,
  PostQueryParams,
} from './posts.schemas.js'
import postRepo from './posts.repo.js'
import { type BaseHazardQueryParams } from '../hazards/index.js'

export const getPostsForMap = async (
  params: BaseHazardQueryParams & PostQueryParams,
): Promise<Post[]> => {
  return postRepo.getForMap(params)
}

export const searchPosts = async ({
  q,
  page,
  limit,
}: SearchParams): Promise<SearchResult> => {
  const trimmed = q?.trim() || undefined
  const offset = (page - 1) * limit

  const { posts, total } = await postRepo.search({ q: trimmed, limit, offset })

  return {
    posts,
    hasMore: total > offset + posts.length,
  }
}

export const createPost = async (data: CreatePostData): Promise<Post> => {
  const { latitude, longitude, ...rest } = data
  const dbData: CreatePostDbData = {
    ...rest,
    geom: `POINT(${longitude} ${latitude})`,
  }
  const createdPost = await postRepo.insert(dbData)
  if (!createdPost) {
    throw new AppError(500, 'Failed to create post')
  }
  return createdPost
}

export const updatePost = async (
  data: UpdatePostData,
  id: string,
): Promise<Post> => {
  const { latitude, longitude, ...rest } = data
  const dbData = {
    ...rest,
    geom: `POINT(${longitude} ${latitude})`,
  }
  const updatedPost = await postRepo.update(id, dbData)
  if (!updatedPost) {
    throw new AppError(404, 'Post cannot be updated.')
  }
  return updatedPost
}

export const deletePost = async (id: string): Promise<void> => {
  const rowCount = await postRepo.remove(id)
  if (!rowCount) {
    throw new AppError(404, 'Post not found')
  }
}

export const getPostById = async (id: string): Promise<Post> => {
  const post = await postRepo.getById(id)
  if (!post) {
    throw new AppError(404, 'Post not found')
  }
  return post
}