import { z } from 'zod'
import { GlobalHazardParamsSchema } from '../shared/schema.ts'

export const EruptionQueryParamsSchema = z.object({
  ...GlobalHazardParamsSchema.shape,
  minExplosivity: z.coerce.number().int().min(0).max(8).optional(),
  confirmedOnly: z.coerce.boolean().default(true),
})

export type EruptionQueryParams = z.infer<typeof EruptionQueryParamsSchema>

export type GVPEruptionResponse = {
  type: 'FeatureCollection'
  features: {
    type: 'Feature'
    id: string
    properties: Record<string, unknown>
    geometry: {
      type: 'Point'
      coordinates: [number, number]
    }
  }[]
}

export const EruptionDisplaySchema = z.object({
  volcanoName: z.string(),
  activityArea: z.string().nullable(),
  startYear: z.number().nullable(),
  explosivityIndex: z.number().nullable(),
  confirmed: z.boolean(),
})

export type EruptionDisplayProperties = z.infer<typeof EruptionDisplaySchema>
