import z from 'zod'
import { LongitudeSchema, LatitudeSchema } from '../shared/schema.ts'

const GVPEruptionPropertiesSchema = z.object({
  Volcano_Name: z.string(),
  ActivityArea: z.string().nullable(),
  Activity_Type: z.string().nullable(),
  ExplosivityIndexMax: z.number().nullable(),
  StartDateYear: z.number().nullable(),
  EndDateYear: z.number().nullable(),
})

const GVPEruptionGeometrySchema = z.object({
  type: z.literal('Point'),
  coordinates: z.tuple([LongitudeSchema, LatitudeSchema]),
})

const GVPEruptionFeatureSchema = z.object({
  type: z.literal('Feature'),
  id: z.string(),
  properties: GVPEruptionPropertiesSchema,
  geometry: GVPEruptionGeometrySchema,
})

export const GVPEruptionResponseSchema = z.object({
  type: z.literal('FeatureCollection'),
  features: z.array(GVPEruptionFeatureSchema),
})

export const GVPEruptionQueryParamsSchema = z.object({
  maxFeatures: z.coerce.number().int().min(1).max(5000).default(500),
})

export type GVPEruptionResponse = z.infer<typeof GVPEruptionResponseSchema>
export type GVPEruptionQueryParams = z.infer<
  typeof GVPEruptionQueryParamsSchema
>
