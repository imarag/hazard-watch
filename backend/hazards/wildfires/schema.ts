import z from 'zod'

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
  source: z
    .enum([
      'LANDSAT_NRT',
      'MODIS_NRT',
      'MODIS_SP',
      'VIIRS_NOAA20_NRT',
      'VIIRS_NOAA20_SP',
      'VIIRS_NOAA21_NRT',
      'VIIRS_SNPP_NRT',
      'VIIRS_SNPP_SP',
    ])
    .default('VIIRS_SNPP_NRT'),
  dayRange: z.coerce.number().int().min(1).max(10).default(1),
})

export type FIRMSWildfireResponse = z.infer<typeof FIRMSWildfireResponseSchema>
export type WildfireQueryParams = z.infer<typeof WildfireQueryParamsSchema>
export type FIRMSWildfireRow = z.infer<typeof FIRMSWildfireRowSchema>
