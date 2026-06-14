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
