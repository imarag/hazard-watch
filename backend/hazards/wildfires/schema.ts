import z from 'zod'
import { GlobalHazardParamsSchema } from '../shared/schema.ts'

const FIRMSWildfireRowSchema = z.object({
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  bright_ti4: z.coerce.number(),
  frp: z.coerce.number(),
  acq_date: z.iso.date(),
  acq_time: z.coerce.number(),
  confidence: z.enum(['l', 'n', 'h']),
  daynight: z.enum(['D', 'N']),
})

export const FIRMSWildfireResponseSchema = z.array(FIRMSWildfireRowSchema)

export const WildfireQueryParamsSchema = z.object({
  ...GlobalHazardParamsSchema.shape,
})

export type FIRMSWildfireResponse = z.infer<typeof FIRMSWildfireResponseSchema>
export type WildfireQueryParams = z.infer<typeof WildfireQueryParamsSchema>
export type FIRMSWildfireRow = z.infer<typeof FIRMSWildfireRowSchema>
