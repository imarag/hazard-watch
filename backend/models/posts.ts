import { z } from 'zod'
import { HazardType } from '../types/hazards.js'
import { LocationSchema } from './hazards.js'
import mongoose from 'mongoose'
import type { PostInDb } from '../types/posts.js'

export const CreatePostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title is too long'),

  description: z
    .string()
    .trim()
    .min(20, 'Description must be at least 20 characters')
    .max(5000, 'Description is too long'),

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
