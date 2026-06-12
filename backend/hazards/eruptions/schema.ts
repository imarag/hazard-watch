import { z } from 'zod'

export const EruptionQueryParamsSchema = z.object({
  minExplosivity: z.coerce.number().int().min(0).max(8).optional(),
  confirmedOnly: z.coerce.boolean().optional(),
})

export const EruptionDisplaySchema = z.object({
  id: z.number(),
  gvp_eruption_id: z.number(),
  gvp_volcano_id: z.number().nullable(),
  volcano_name: z.string(),
  eruption_area: z.string().nullable(),
  start_year: z.number().nullable(),
  start_year_uncertainty: z.number().nullable(),
  explosivity_index: z.number().nullable(),
  confirmed: z.boolean().nullable(),
})

export type EruptionQueryParams = z.infer<typeof EruptionQueryParamsSchema>
export type EruptionDisplay = z.infer<typeof EruptionDisplaySchema>
