import { z } from 'zod'

export const LongitudeSchema = z
  .number({ message: 'Longitude must be a number' })
  .min(-180, 'Longitude must be at least -180')
  .max(180, 'Longitude must be at most 180')

export const LatitudeSchema = z
  .number({ message: 'Latitude must be a number' })
  .min(-90, 'Latitude must be at least -90')
  .max(90, 'Latitude must be at most 90')

export const LocationSchema = z.tuple([LongitudeSchema, LatitudeSchema])

export type Location = z.infer<typeof LocationSchema>

const USGSEarthquakePropertiesSchema = z.object({
  mag: z.number().nullable(),
  place: z.string().nullable(),
  time: z.number(),
  tsunami: z.number(),
  sig: z.number().nullable(), // ← add
  status: z.string(),
  url: z.url(),
  alert: z.enum(['green', 'yellow', 'orange', 'red']).nullable(),
})

const USGSEarthquakeGeometrySchema = z.object({
  type: z.literal('Point'),
  coordinates: z.tuple([z.number(), z.number(), z.number()]),
})

const USGSEarthquakeFeatureSchema = z.object({
  type: z.literal('Feature'),
  id: z.string(),
  properties: USGSEarthquakePropertiesSchema,
  geometry: USGSEarthquakeGeometrySchema,
})

export const USGSEarthquakeResponseSchema = z.object({
  type: z.literal('FeatureCollection'),
  metadata: z.any(),
  features: z.array(USGSEarthquakeFeatureSchema),
})

export type USGSEarthquakeFeature = z.infer<typeof USGSEarthquakeFeatureSchema>
export type USGSEarthquakeResponse = z.infer<
  typeof USGSEarthquakeResponseSchema
>

const GVPEruptionPropertiesSchema = z.object({
  Volcano_Number: z.number(),
  Volcano_Name: z.string(),
  Eruption_Number: z.number(),
  Activity_Type: z.string().nullable(),
  ExplosivityIndexMax: z.number().nullable(),
  ExplosivityIndexModifier: z.string().nullable(),
  StartDateYear: z.number().nullable(),
  StartDateYearUncertainty: z.number().nullable(),
  StartDateYearModifier: z.string().nullable(), // ← added
  EndDateYear: z.number().nullable(),
  StartEvidenceMethod: z.string().nullable(),
  ActivityArea: z.string().nullable(),
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

export type GVPEruptionFeature = z.infer<typeof GVPEruptionFeatureSchema>
export type GVPEruptionResponse = z.infer<typeof GVPEruptionResponseSchema>

export const earthquakeQueryParamsSchema = z.object({
  starttime: z.iso.datetime().optional(),
  minmagnitude: z.coerce.number().min(-1).max(10).optional(),
  endtime: z.iso.datetime().optional(),
  maxmagnitude: z.coerce.number().min(-1).max(10).optional(),
  mindepth: z.coerce.number().min(-100).max(1000).optional(),
  maxdepth: z.coerce.number().min(-100).max(1000).optional(),
  minlatitude: z.coerce.number().min(-90).max(90).optional(),
  maxlatitude: z.coerce.number().min(-90).max(90).optional(),
  minlongitude: z.coerce.number().min(-360).max(360).optional(),
  maxlongitude: z.coerce.number().min(-360).max(360).optional(),
})

export const eruptionQueryParamsSchema = z.object({
  maxFeatures: z.coerce.number().int().min(1).max(5000).default(500),
})

const FIRMSWildfireRowSchema = z
  .object({
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
    bright_ti4: z.coerce.number(),
    bright_ti5: z.coerce.number(),
    acq_date: z.string(),
    acq_time: z.string(),
    satellite: z.string(),
    instrument: z.enum(['VIIRS', 'MODIS']),
    confidence: z.string(),
    frp: z.coerce.number(),
    daynight: z.enum(['D', 'N']),
  })
  .loose()

export const FIRMSWildfireResponseSchema = z.array(FIRMSWildfireRowSchema)
export type FIRMSWildfireRow = z.infer<typeof FIRMSWildfireRowSchema>
export type FIRMSWildfireResponse = z.infer<typeof FIRMSWildfireResponseSchema>

export const wildfireQueryParamsSchema = z.object({
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
    .optional(),
  area: z.string().optional(), // "world" or "west,south,east,north"
  dayRange: z.coerce.number().int().min(1).max(5).optional(),
  date: z.iso.date().optional(),
})

export type EarthquakeQueryParams = z.output<typeof earthquakeQueryParamsSchema>
export type EruptionQueryParams = z.output<typeof eruptionQueryParamsSchema>
export type WildfireQueryParams = z.output<typeof wildfireQueryParamsSchema>
