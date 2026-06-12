import { z } from 'zod'

export const TsunamiQueryParamsSchema = z.object({
  minMaxWaterHeight: z.coerce.number().min(0).optional(),
  minDeathsAmountOrder: z.coerce.number().int().min(0).max(4).optional(),
})

export const TsunamiDisplaySchema = z.object({
  id: z.number(),
  noaa_id: z.number(),
  location: z.string().nullable(),
  country: z.string().nullable(),
  year: z.number().nullable(),
  max_wave_height_m: z.number().nullable(),
  deaths: z.number().nullable(),
  deaths_severity: z.number().nullable(),
  earthquake_magnitude: z.number().nullable(),
  cause: z.string().nullable(),
  event_validity: z.number().nullable(),
  intensity: z.number().nullable(),
  region_code: z.number().nullable(),
})

export type TsunamiQueryParams = z.infer<typeof TsunamiQueryParamsSchema>
export type TsunamiDisplay = z.infer<typeof TsunamiDisplaySchema>
