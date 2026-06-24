import { z } from 'zod'

export const EruptionQueryParamsSchema = z.object({
  minExplosivity: z.coerce.number().int().min(0).max(8).optional(),
  confirmedOnly: z.coerce.boolean().optional(),
})

export type EruptionQueryParams = z.infer<typeof EruptionQueryParamsSchema>
