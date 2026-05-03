import { z } from 'zod'
import { HazardType } from '../types/hazards.js'
import { LocationSchema } from './hazards.js'
import mongoose from 'mongoose'
import type { PostInDb } from '../types/posts.js'

const titleField = z
  .string()
  .trim()
  .min(5, 'Title must be at least 5 characters')
  .max(100, 'Title is too long. Must be up to 100 characters.')

const descriptionField = z
  .string()
  .trim()
  .min(10, 'Description must be at least 10 characters')
  .max(5000, 'Description is too long')

const hazardTypeField = z.enum([
  HazardType.EARTHQUAKE,
  HazardType.FLOOD,
  HazardType.STORM,
  HazardType.WILDFIRE,
])

export const CreatePostSchema = z.object({
  title: titleField,
  description: descriptionField,
  hazardType: hazardTypeField,
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
    location: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
    toJSON: {
      transform: (_, ret: Record<string, unknown>) => {
        ret['id'] = String(ret['_id'])
        delete ret['_id']
        delete ret['__v']
      },
    },
  },
)

export const PostModel = mongoose.model<PostInDb>('Post', PostSchema)

export const SearchParamsSchema = z.object({
  q: z.string().trim().min(1).optional(),
  page: z.coerce.number().int().gte(1).optional().default(1),
  limit: z.coerce.number().int().gt(0).max(100).optional().default(10),
})
