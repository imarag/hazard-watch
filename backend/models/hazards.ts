import { z } from 'zod'

export const LongitudeSchema = z
  .number({ message: 'Longitude must be a number' })
  .min(-180, 'Longitude must be at least -180')
  .max(180, 'Longitude must be at most 180')

export const LatitudeSchema = z
  .number({ message: 'Latitude must be a number' })
  .min(-90, 'Latitude must be at least -90')
  .max(90, 'Latitude must be at most 90')

export const LocationSchema = z.tuple([LongitudeSchema, LatitudeSchema])

export type Location = z.infer<typeof LocationSchema>