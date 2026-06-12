import { z } from 'zod'

export const EarthquakeQueryParamsSchema = z
  .object({
    minMagnitude: z.coerce.number().min(-1).max(10).optional(),
    maxMagnitude: z.coerce.number().min(-1).max(10).optional(),
    minDepth: z.coerce.number().min(-100).max(1000).optional(),
    maxDepth: z.coerce.number().min(-100).max(1000).optional(),
  })
  .refine(
    ({ minMagnitude, maxMagnitude }) =>
      minMagnitude === undefined ||
      maxMagnitude === undefined ||
      minMagnitude < maxMagnitude,
    'minMagnitude must be less than maxMagnitude',
  )
  .refine(
    ({ minDepth, maxDepth }) =>
      minDepth === undefined || maxDepth === undefined || minDepth < maxDepth,
    'minDepth must be less than maxDepth',
  )

export type EarthquakeQueryParams = z.infer<typeof EarthquakeQueryParamsSchema>

export const EarthquakeDisplaySchema = z.object({
  id: z.number(),
  usgs_id: z.string(),
  magnitude: z.number().nullable(),
  location: z.string().nullable(),
  occurred_at: z.coerce.date().nullable(),
  depth_km: z.number().nullable(),
  triggered_tsunami: z.boolean().nullable(),
  review_status: z.string().nullable(),
  alert_level: z.enum(['green', 'yellow', 'orange', 'red']).nullable(),
})

export type EarthquakeDisplay = z.infer<typeof EarthquakeDisplaySchema>