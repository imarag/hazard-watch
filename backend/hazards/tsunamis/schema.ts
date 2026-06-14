import { z } from 'zod'

export const TsunamiQueryParamsSchema = z.object({
  minMaxWaterHeight: z.coerce.number().min(0).optional(),
  minDeathsAmountOrder: z.coerce.number().int().min(0).max(4).optional(),
})

export type TsunamiQueryParams = z.infer<typeof TsunamiQueryParamsSchema>