import { z } from 'zod'

export const LongitudeSchema = z
  .number({ message: 'Longitude must be a number' })
  .min(-180, 'Longitude must be at least -180')
  .max(180, 'Longitude must be at most 180')

export const LatitudeSchema = z
  .number({ message: 'Latitude must be a number' })
  .min(-90, 'Latitude must be at least -90')
  .max(90, 'Latitude must be at most 90')

export const PositionSchema = z.tuple([LongitudeSchema, LatitudeSchema])

export const PointSchema = z.object({
  type: z.literal('Point', { message: 'Type must be Point' }),
  coordinates: PositionSchema,
})

const FeatureSchema = z.object({
  type: z.literal('Feature', { message: 'Type must be Feature' }),
  geometry: PointSchema,
  properties: z.unknown(),
})

export const LocationSchema = FeatureSchema
