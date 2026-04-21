import { z } from 'zod'
import { HazardType } from '../types/hazards.ts'
import { LocationSchema } from './hazards.ts'

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
