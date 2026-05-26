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

// ─── USGS Earthquakes ────────────────────────────────────────────────

const USGSEarthquakePropertiesSchema = z.object({
  mag: z.number().nullable(),
  place: z.string().nullable(),
  time: z.number(),
  tsunami: z.number(),
  status: z.enum(['reviewed', 'automatic']),
  url: z.string().url(),
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

// ─── GVP Volcanoes ───────────────────────────────────────────────────

const GVPVolcanoPropertiesSchema = z.object({
  Volcano_Number: z.number(),
  Volcano_Name: z.string(),
  Primary_Volcano_Type: z.string().nullable(),
  Country: z.string().nullable(),
  Region: z.string().nullable(),
  Subregion: z.string().nullable(),
  Elevation: z.number().nullable(),
  Dominant_Rock_Type: z.string().nullable(),
  Tectonic_Setting: z.string().nullable(),
  Last_Known_Eruption: z.string().nullable(),
})

const GVPVolcanoGeometrySchema = z.object({
  type: z.literal('Point'),
  coordinates: z.tuple([LongitudeSchema, LatitudeSchema]),
})

const GVPVolcanoFeatureSchema = z.object({
  type: z.literal('Feature'),
  id: z.string(),
  properties: GVPVolcanoPropertiesSchema,
  geometry: GVPVolcanoGeometrySchema,
})

export const GVPVolcanoResponseSchema = z.object({
  type: z.literal('FeatureCollection'),
  features: z.array(GVPVolcanoFeatureSchema),
})

export type GVPVolcanoFeature = z.infer<typeof GVPVolcanoFeatureSchema>
export type GVPVolcanoResponse = z.infer<typeof GVPVolcanoResponseSchema>

// ─── GVP Eruptions ───────────────────────────────────────────────────

const GVPEruptionPropertiesSchema = z.object({
  Volcano_Number: z.number(),
  Volcano_Name: z.string(),
  Eruption_Number: z.number(),
  Eruption_Category: z.string().nullable(),
  Start_Year: z.number().nullable(),
  End_Year: z.number().nullable(),
  VEI: z.number().nullable(), // Volcanic Explosivity Index 0–8
  VEI_Modifier: z.string().nullable(), // '>', '<', '~' etc.
  Evidence_Method_Dating: z.string().nullable(),
})

const GVPEruptionFeatureSchema = z.object({
  type: z.literal('Feature'),
  id: z.string(),
  properties: GVPEruptionPropertiesSchema,
  geometry: GVPVolcanoGeometrySchema, // same Point geometry
})

export const GVPEruptionResponseSchema = z.object({
  type: z.literal('FeatureCollection'),
  features: z.array(GVPEruptionFeatureSchema),
})

export type GVPEruptionFeature = z.infer<typeof GVPEruptionFeatureSchema>
export type GVPEruptionResponse = z.infer<typeof GVPEruptionResponseSchema>

// ─── Query parameter schemas ─────────────────────────────────────────

const num = z.coerce.number()
const int = z.coerce.number().int()

// ISO date (YYYY-MM-DD or full ISO datetime). USGS accepts both.
const isoDate = z
  .string()
  .regex(
    /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?Z?)?$/,
    'Must be ISO date like 2026-01-01 or 2026-01-01T00:00:00Z',
  )

const daysAgo = (n: number) =>
  new Date(Date.now() - n * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)

export const earthquakeParamsSchema = z.object({
  starttime: isoDate.default(() => daysAgo(30)),
  endtime: isoDate.optional(),
  minmagnitude: num.min(-1).max(10).default(4.5),
  maxmagnitude: num.min(-1).max(10).optional(),
  mindepth: num.min(-100).max(1000).optional(),
  maxdepth: num.min(-100).max(1000).optional(),
  minlatitude: num.min(-90).max(90).optional(),
  maxlatitude: num.min(-90).max(90).optional(),
  minlongitude: num.min(-360).max(360).optional(),
  maxlongitude: num.min(-360).max(360).optional(),
  latitude: num.min(-90).max(90).optional(),
  longitude: num.min(-180).max(180).optional(),
  maxradiuskm: num.min(0).max(20001.6).optional(),
  limit: int.min(1).max(20000).default(100),
  offset: int.min(1).optional(),
  orderby: z
    .enum(['time', 'time-asc', 'magnitude', 'magnitude-asc'])
    .default('time'),
})

export const volcanoParamsSchema = z.object({
  CQL_FILTER: z.string().max(500).optional(),
  maxFeatures: int.min(1).max(5000).default(1000),
  startIndex: int.min(0).optional(),
  sortBy: z.string().max(100).optional(),
})

export const eruptionParamsSchema = z.object({
  volcanoNumber: z
    .string()
    .regex(/^\d{6}$/, 'Volcano number must be 6 digits')
    .optional(),
  CQL_FILTER: z.string().max(500).optional(),
  maxFeatures: int.min(1).max(5000).default(500),
  startIndex: int.min(0).optional(),
  sortBy: z.string().max(100).optional(),
})

export type EarthquakeParamsInput = z.input<typeof earthquakeParamsSchema>
export type VolcanoParamsInput = z.input<typeof volcanoParamsSchema>
export type EruptionParamsInput = z.input<typeof eruptionParamsSchema>

export type EarthquakeParams = z.output<typeof earthquakeParamsSchema>
export type VolcanoParams = z.output<typeof volcanoParamsSchema>
export type EruptionParams = z.output<typeof eruptionParamsSchema>
