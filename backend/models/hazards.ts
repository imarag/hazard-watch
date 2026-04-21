import { z } from 'zod'

export const PositionSchema = z.tuple([z.number(), z.number()])

export const PointSchema = z.object({
  type: z.literal('Point'),
  coordinates: PositionSchema,
})

export const LocationSchema = z.object({
  type: z.literal('Feature'),
  geometry: PointSchema,
  properties: z.unknown(),
})
