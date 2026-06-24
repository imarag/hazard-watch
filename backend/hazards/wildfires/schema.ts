import { z } from 'zod'

const FIRMSWildfireRowSchema = z.object({
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  bright_ti4: z.coerce.number(),
  frp: z.coerce.number(),
  acq_date: z.iso.date(),
  acq_time: z.coerce.number(),
  confidence: z.string(),
  daynight: z.enum(['D', 'N']),
  satellite: z.string().optional(),
})

export const FIRMSWildfireResponseSchema = z.array(FIRMSWildfireRowSchema)

export const WildfireQueryParamsSchema = z.object({})

export type FIRMSWildfireRow = z.infer<typeof FIRMSWildfireRowSchema>
export type FIRMSWildfireResponse = z.infer<typeof FIRMSWildfireResponseSchema>
export type WildfireQueryParams = z.infer<typeof WildfireQueryParamsSchema>
