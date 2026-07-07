import { z } from 'zod'
import { HAZARD_TYPES } from './hazards.static.js'

const allLayers = [...HAZARD_TYPES, 'post'] as const satisfies readonly string[]
export type LayerType = (typeof allLayers)[number]

export const LongitudeSchema = z
  .number({ message: 'Longitude must be a number' })
  .min(-180, 'Longitude must be at least -180')
  .max(180, 'Longitude must be at most 180')

export const LatitudeSchema = z
  .number({ message: 'Latitude must be a number' })
  .min(-90, 'Latitude must be at least -90')
  .max(90, 'Latitude must be at most 90')

const CoordsSchema = z
  .tuple([LongitudeSchema, LatitudeSchema, LongitudeSchema, LatitudeSchema])
  .refine(
    ([minLng, _minLat, maxLng, _maxLat]) => minLng < maxLng,
    'minLng must be less than maxLng',
  )
  .refine(
    ([_minLng, minLat, _maxLng, maxLat]) => minLat < maxLat,
    'minLat must be less than maxLat',
  )

const BboxSchema = z
  .string()
  .default('-180,-90,180,90')
  .transform((val) => val.split(',').map(Number))
  .pipe(CoordsSchema)

const LayersSchema = z
  .string({
    message: 'layers is required. Valid values: ' + allLayers.join(', '),
  })
  .transform((val) => val.split(',').map((l) => l.trim().toLowerCase()))
  .pipe(
    z
      .array(
        z.enum(allLayers, {
          message: 'Invalid layer. Valid values: ' + allLayers.join(', '),
        }),
      )
      .min(1, 'At least one layer is required'),
  )

export const BaseHazardQueryParamsSchema = z
  .object({
    startDate: z.iso.datetime().optional(),
    endDate: z.iso.datetime().optional(),
    bbox: BboxSchema,
    layers: LayersSchema,
  })
  .refine(
    ({ startDate, endDate }) =>
      startDate === undefined ||
      endDate === undefined ||
      new Date(startDate) <= new Date(endDate),
    'startdate must be before enddate',
  )

export type BaseHazardQueryParams = z.infer<typeof BaseHazardQueryParamsSchema>

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

export const WildfireQueryParamsSchema = z.object({
  minFireRadiativePower: z.coerce.number().min(0).optional(),
  confidence: z
    .enum(['low', 'nominal', 'high'])
    .optional()
    .or(z.literal(''))
    .transform((v) => (v === '' ? undefined : v)),
  timeOfDay: z
    .enum(['day', 'night'])
    .optional()
    .or(z.literal(''))
    .transform((v) => (v === '' ? undefined : v)),
})

export type FIRMSWildfireRow = z.infer<typeof FIRMSWildfireRowSchema>
export type FIRMSWildfireResponse = z.infer<typeof FIRMSWildfireResponseSchema>
export type WildfireQueryParams = z.infer<typeof WildfireQueryParamsSchema>

export const TsunamiQueryParamsSchema = z.object({
  minMaxWaterHeight: z.coerce.number().min(0).optional(),
  minDeathsAmountOrder: z.coerce.number().int().min(0).max(4).optional(),
})

export type TsunamiQueryParams = z.infer<typeof TsunamiQueryParamsSchema>

export const EruptionQueryParamsSchema = z.object({
  minExplosivity: z.coerce.number().int().min(0).max(8).optional(),
  confirmedOnly: z.coerce.boolean().optional(),
})

export type EruptionQueryParams = z.infer<typeof EruptionQueryParamsSchema>

export const EarthquakeQueryParamsSchema = z
  .object({
    minMagnitude: z.coerce.number().min(-1).max(10).optional(),
    maxMagnitude: z.coerce.number().min(-1).max(10).optional(),
    minDepth: z.coerce.number().min(-100).max(1000).optional(),
    maxDepth: z.coerce.number().min(-100).max(1000).optional(),
  })
  .refine(
    ({ minMagnitude, maxMagnitude }) =>
      minMagnitude === undefined ||
      maxMagnitude === undefined ||
      minMagnitude < maxMagnitude,
    'minMagnitude must be less than maxMagnitude',
  )
  .refine(
    ({ minDepth, maxDepth }) =>
      minDepth === undefined || maxDepth === undefined || minDepth < maxDepth,
    'minDepth must be less than maxDepth',
  )

export type EarthquakeQueryParams = z.infer<typeof EarthquakeQueryParamsSchema>