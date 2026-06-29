import { z } from 'zod'
import { HazardType } from '../hazards/shared/types.ts'
import { LongitudeSchema, LatitudeSchema } from '../hazards/shared/schema.ts'

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
  HazardType.ERUPTION,
  HazardType.WILDFIRE,
])

export const CreatePostPayloadSchema = z.object({
  title: titleField,
  description: descriptionField,
  hazardType: hazardTypeField,
  longitude: LongitudeSchema,
  latitude: LatitudeSchema,
})

export const UpdatePostPayloadSchema = CreatePostPayloadSchema

export const SearchParamsSchema = z.object({
  q: z.string().trim().min(1).optional(),
  page: z.coerce.number().int().gte(1).optional().default(1),
  limit: z.coerce.number().int().gt(0).max(100).optional().default(10),
})

// what UI sends for create and update
export type CreatePostPayload = z.infer<typeof CreatePostPayloadSchema>
export type UpdatePostPayload = z.infer<typeof UpdatePostPayloadSchema>

// what server saves to DB
export type CreatePostData = CreatePostPayload & {
  author_id: string
}

export type UpdatePostData = UpdatePostPayload

export type SearchParams = z.infer<typeof SearchParamsSchema>