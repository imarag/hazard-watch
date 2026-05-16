import type { PostInDb } from '../types/posts.ts'
import { LikeModel } from '../models/likes.ts'
import type { HydratedDocument } from 'mongoose'

export async function addLikedByUser(
  posts: HydratedDocument<PostInDb>[],
  currentUserId: string | undefined,
): Promise<PostInDb[]> {
  const plainPosts = posts.map((p) => p.toJSON() as unknown as PostInDb)
  console.log(currentUserId, '***')
  if (!currentUserId) {
    return plainPosts.map((post) => ({ ...post, likedByCurrentUser: false }))
  }

  const postIds = plainPosts.map((p) => p.id)
  const likes = await LikeModel.find({
    user: currentUserId,
    post: { $in: postIds },
  }).lean()

  const likedPostIds = new Set(likes.map((l) => l.post.toString()))

  return plainPosts.map((post) => ({
    ...post,
    likedByCurrentUser: likedPostIds.has(post.id.toString()),
  }))
}
