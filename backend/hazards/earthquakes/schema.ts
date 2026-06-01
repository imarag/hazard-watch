import { z } from 'zod'
import { GlobalHazardParamsSchema } from '../shared/schema.ts'

export const EarthquakeQueryParamsSchema = z.object({
  ...GlobalHazardParamsSchema.shape,
  minmagnitude: z.coerce.number().min(-1).max(10).default(3),
  maxmagnitude: z.coerce.number().min(-1).max(10).optional(),
  mindepth: z.coerce.number().min(-100).max(1000).default(0),
  maxdepth: z.coerce.number().min(-100).max(1000).optional(),
})

export type EarthquakeQueryParams = z.infer<typeof EarthquakeQueryParamsSchema>

export type USGSEarthquakeResponse = {
  type: 'FeatureCollection'
  features: {
    type: 'Feature'
    id: string
    properties: Record<string, unknown>
    geometry: {
      type: 'Point'
      coordinates: number[]
    }
  }[]
}

export const EarthquakeDisplaySchema = z.object({
  id: z.string(),
  magnitude: z.number().nullable(),
  place: z.string().nullable(),
  date: z.string(),
  depth: z.number().nullable(),
  tsunami: z.boolean(),
  status: z.string(),
  alert: z.enum(['green', 'yellow', 'orange', 'red']).nullable(),
})

export type EarthquakeDisplayProperties = z.infer<
  typeof EarthquakeDisplaySchema
>
