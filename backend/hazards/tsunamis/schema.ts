import { z } from 'zod'
import { GlobalHazardParamsSchema } from '../shared/schema.ts'

export const TsunamiQueryParamsSchema = z.object({
  ...GlobalHazardParamsSchema.shape,
  minMaxWaterHeight: z.coerce.number().min(0).optional(),
  minDeathsAmountOrder: z.coerce.number().int().min(0).max(4).optional(),
})

export const TsunamiDisplaySchema = z.object({
  location: z.string().nullable(),
  country: z.string().nullable(),
  year: z.number(),
  maxWaveHeight: z.number().nullable(),
  deaths: z.number().nullable(),
  deathsScale: z.number().nullable(),
  earthquakeMagnitude: z.number().nullable(),
  cause: z.string(),
  validity: z.number(),
})

export type TsunamiQueryParams = z.infer<typeof TsunamiQueryParamsSchema>
export type TsunamiDisplayProperties = z.infer<typeof TsunamiDisplaySchema>
export type NOAATsunamiResponse = {
  items: Record<string, unknown>[]
  totalPages: number
  totalItems: number
}
