import { LikeModel } from '../models/likes.ts'
import { PostModel } from '../models/posts.ts'
import { AppError } from '../errors.ts'

export const createLike = async (
  postId: string,
  userId: string,
): Promise<void> => {
  await LikeModel.create({ post: postId, user: userId })
  await PostModel.findByIdAndUpdate(postId, { $inc: { likeCount: 1 } })
}

export const deleteLike = async (
  postId: string,
  userId: string,
): Promise<void> => {
  const existingLike = await LikeModel.findOneAndDelete({
    post: postId,
    user: userId,
  })

  if (!existingLike) {
    throw new AppError(404, 'Like not found')
  }

  await PostModel.findByIdAndUpdate(postId, { $inc: { likeCount: -1 } })
}
