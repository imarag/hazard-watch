import { z } from 'zod'
import { HazardType } from '../types/hazards.js'
import { LocationSchema } from './hazards.js'
import mongoose from 'mongoose'
import type { PostInDb } from '../types/posts.js'

export const CreatePostSchema = z.object({
  title: z.string().min(3).max(30),
  description: z.string().min(5).max(500),
  hazardType: z.enum([
    HazardType.EARTHQUAKE,
    HazardType.FLOOD,
    HazardType.STORM,
    HazardType.WILDFIRE,
  ]),
  location: LocationSchema,
})

export const UpdatePostSchema = CreatePostSchema.partial()

const PostSchema = new mongoose.Schema<PostInDb>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: {
      type: String,
      ref: 'User',
      required: true,
    },
    hazardType: {
      type: String,
      enum: Object.values(HazardType),
      required: true,
    },
    location: { type: Object, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
    toJSON: {
      transform: (_, ret: Record<string, unknown>) => {
        const id = ret['_id']
        if (id != null) {
          ret['id'] = String(id)
        }
        delete ret['_id']
        delete ret['__v']
      },
    },
  },
)

export const PostModel = mongoose.model<PostInDb>('Post', PostSchema)
