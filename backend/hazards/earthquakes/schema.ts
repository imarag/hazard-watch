import z from 'zod'
import { GlobalHazardParamsSchema } from '../shared/schema.ts'

const USGSEarthquakePropertiesSchema = z.object({
  mag: z.number().nullable(),
  place: z.string().nullable(),
  time: z.number(),
  tsunami: z.number(),
  status: z.string(),
  url: z.url(),
  alert: z.enum(['green', 'yellow', 'orange', 'red']).nullable(),
})

const USGSEarthquakeGeometrySchema = z.object({
  type: z.literal('Point'),
  coordinates: z.tuple([z.number(), z.number()]).rest(z.number()),
})

const USGSEarthquakeFeatureSchema = z.object({
  type: z.literal('Feature'),
  id: z.string(),
  properties: USGSEarthquakePropertiesSchema,
  geometry: USGSEarthquakeGeometrySchema,
})

export const USGSEarthquakeResponseSchema = z.object({
  type: z.literal('FeatureCollection'),
  metadata: z.any().optional(),
  features: z.array(USGSEarthquakeFeatureSchema),
})

export const EarthquakeQueryParamsSchema = z.object({
  ...GlobalHazardParamsSchema.shape,
  minmagnitude: z.coerce.number().min(-1).max(10).default(3),
  maxmagnitude: z.coerce.number().min(-1).max(10).optional(),
  mindepth: z.coerce.number().min(-100).max(1000).default(0),
  maxdepth: z.coerce.number().min(-100).max(1000).optional(),
})

export type EarthquakeQueryParams = z.infer<typeof EarthquakeQueryParamsSchema>
export type USGSEarthquakeResponse = z.infer<
  typeof USGSEarthquakeResponseSchema
>
