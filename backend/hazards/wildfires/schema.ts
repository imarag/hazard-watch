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
})

export const FIRMSWildfireResponseSchema = z.array(FIRMSWildfireRowSchema)

export const WildfireQueryParamsSchema = z.object({})

export const WildfireDisplaySchema = z.object({
  id: z.number(),
  fire_radiative_power: z.number().nullable(),
  brightness_temp_k: z.number().nullable(),
  confidence: z.enum(['low', 'nominal', 'high']).nullable(),
  detected_at: z.coerce.date().nullable(),
  time_of_day: z.enum(['day', 'night']).nullable(),
  satellite: z.string().nullable(),
})

export type FIRMSWildfireRow = z.infer<typeof FIRMSWildfireRowSchema>
export type FIRMSWildfireResponse = z.infer<typeof FIRMSWildfireResponseSchema>
export type WildfireQueryParams = z.infer<typeof WildfireQueryParamsSchema>
export type WildfireDisplay = z.infer<typeof WildfireDisplaySchema>