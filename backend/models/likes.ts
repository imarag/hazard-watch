import mongoose from 'mongoose'
import type { LikeInDb } from '../types/likes.ts'

const likeSchema = new mongoose.Schema<LikeInDb>(
  {
    user: {
      type: String,
      ref: 'User',
      required: true,
    },
    post: {
      type: String,
      ref: 'Post',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret: Record<string, unknown>) => {
        ret['id'] = String(ret['_id'])
        delete ret['_id']
        delete ret['__v']
      },
    },
  },
)

likeSchema.index({ post: 1, user: 1 }, { unique: true })

export const LikeModel = mongoose.model<LikeInDb>('Like', likeSchema)
