import z from 'zod'
import { type LayerType, allLayers } from './layers.registry.ts'
import {
  EarthquakeQueryParamsSchema,
  WildfireQueryParamsSchema,
  TsunamiQueryParamsSchema,
  EruptionQueryParamsSchema,
} from '../hazards/index.js'
import { LongitudeSchema, LatitudeSchema } from '../hazards/index.js'

export const postQueryParamsSchema = z.object({
  hazardType: z
    .enum(allLayers)
    .optional()
    .or(z.literal(''))
    .transform((val) => (val === '' ? undefined : val)),
})
export type PostQueryParams = z.infer<typeof postQueryParamsSchema>

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
  const invalid = layers.filter((l) => !allLayers.includes(l as LayerType))
  if (invalid.length > 0) {
    ctx.issues.push({
      code: 'custom',
      message: `Invalid layers: ${invalid.join(', ')}`,
      input: val,
    })
    return z.NEVER
  }
  return layers as LayerType[]
}

export const MainHazardQueryParamsSchema = z
  .object({
    startDate: z.iso.datetime().optional(),
    endDate: z.iso.datetime().optional(),
    bbox: z.string().default('-180,-90,180,90').transform(transformBbox),
    layers: z
      .string({
        message: 'layers is required. Valid values: ' + allLayers.join(', '),
      })
      .transform(transformLayers),
  })
  .refine(
    ({ startDate, endDate }) =>
      startDate === undefined ||
      endDate === undefined ||
      new Date(startDate) <= new Date(endDate),
    'startdate must be before enddate',
  )

export const GlobalHazardQueryParamsSchema = z.object({
  ...MainHazardQueryParamsSchema.shape,
  ...EarthquakeQueryParamsSchema.shape,
  ...EruptionQueryParamsSchema.shape,
  ...TsunamiQueryParamsSchema.shape,
  ...WildfireQueryParamsSchema.shape,
  ...postQueryParamsSchema.shape,
})

export type MainHazardQueryParams = z.infer<typeof MainHazardQueryParamsSchema>

export type GlobalHazardQueryParams = z.infer<
  typeof GlobalHazardQueryParamsSchema
>
