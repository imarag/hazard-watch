import { z } from 'zod'
import { GlobalHazardParamsSchema } from '../shared/schema.ts'

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

export const WildfireQueryParamsSchema = z.object({
  ...GlobalHazardParamsSchema.shape,
})

export const WildfireDisplaySchema = z.object({
  firepower: z.number(), // Fire Radiative Power in MW
  brightnessTemp: z.number(), // Kelvin
  confidence: z.enum(['low', 'nominal', 'high']),
  detectedAt: z.number(), // unix ms UTC
  timeOfDay: z.enum(['day', 'night']),
  satellite: z.string(),
})

export type FIRMSWildfireRow = z.infer<typeof FIRMSWildfireRowSchema>
export type FIRMSWildfireResponse = z.infer<typeof FIRMSWildfireResponseSchema>
export type WildfireQueryParams = z.infer<typeof WildfireQueryParamsSchema>
export type WildfireDisplayProperties = z.infer<typeof WildfireDisplaySchema>
