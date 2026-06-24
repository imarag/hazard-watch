import z from 'zod'
import { type Layer, allLayers } from './types.ts'
import { EarthquakeQueryParamsSchema } from '../earthquakes/schema.ts'
import { WildfireQueryParamsSchema } from '../wildfires/schema.ts'
import { TsunamiQueryParamsSchema } from '../tsunamis/schema.ts'
import { EruptionQueryParamsSchema } from '../eruptions/schema.ts'

export const postQueryParamsSchema = z.object({
  hazardType: z.enum(allLayers)
    .optional()
    .or(z.literal(''))
    .transform((val) => (val === '' ? undefined : val)),
})
export type PostQueryParams = z.infer<typeof postQueryParamsSchema>

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

function transformBbox(val: string, ctx: z.RefinementCtx) {
  const parsed = val.split(',').map(Number)
  const result = CoordsSchema.safeParse(parsed)
  if (!result.success) {
    ctx.issues.push({
      code: 'custom',
      message: 'Invalid bbox: expected minLng,minLat,maxLng,maxLat',
      input: val,
    })
    return z.NEVER
  }
  return result.data
}

function transformLayers(val: string, ctx: z.RefinementCtx) {
  const layers = val.split(',').map((l) => l.trim().toLocaleLowerCase())
  const invalid = layers.filter((l) => !allLayers.includes(l as Layer))
  if (invalid.length > 0) {
    ctx.issues.push({
      code: 'custom',
      message: `Invalid layers: ${invalid.join(', ')}`,
      input: val,
    })
    return z.NEVER
  }
  return layers as Layer[]
}

export const GlobalHazardQueryParamsSchema = z
  .object({
    startDate: z.iso.datetime().optional(),
    endDate: z.iso.datetime().optional(),
    bbox: z.string().default('-180,-90,180,90').transform(transformBbox),
    layers: z
      .string({
        message: 'layers is required. Valid values: ' + allLayers.join(', '),
      })
      .transform(transformLayers),
    ...EarthquakeQueryParamsSchema.shape,
    ...EruptionQueryParamsSchema.shape,
    ...TsunamiQueryParamsSchema.shape,
    ...WildfireQueryParamsSchema.shape,
    ...postQueryParamsSchema.shape,
  })
  .refine(
    ({ startDate, endDate }) =>
      startDate === undefined ||
      endDate === undefined ||
      new Date(startDate) <= new Date(endDate),
    'startdate must be before enddate',
  )

export type GlobalHazardQueryParams = z.infer<
  typeof GlobalHazardQueryParamsSchema
>
