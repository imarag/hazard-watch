import z from 'zod'
import {
  EarthquakeQueryParamsSchema,
  WildfireQueryParamsSchema,
  TsunamiQueryParamsSchema,
  EruptionQueryParamsSchema,
  BaseHazardQueryParamsSchema,
} from '../hazards/index.js'
import { PostQueryParamsSchema } from '../posts/index.js'

export const HazardQueryParamsSchema = z.object({
  ...BaseHazardQueryParamsSchema.shape,
  ...EarthquakeQueryParamsSchema.shape,
  ...EruptionQueryParamsSchema.shape,
  ...TsunamiQueryParamsSchema.shape,
  ...WildfireQueryParamsSchema.shape,
  ...PostQueryParamsSchema.shape,
})

export type HazardQueryParams = z.infer<typeof HazardQueryParamsSchema>
