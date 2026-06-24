import type { Layer } from './types.ts'
import {
  getEarthquakes,
  getWildfires,
  getEruptions,
  getTsunamis,
} from './services.ts'
import type { GlobalHazardQueryParams } from './schema.ts'
import { getAllPosts } from '../../posts/services.ts'
import type { LayerResult } from './types.ts'

export const layerFetchMapping: Record<
  Layer,
  (params: GlobalHazardQueryParams) => Promise<LayerResult>
> = {
  post: getAllPosts,
  earthquake: getEarthquakes,
  wildfire: getWildfires,
  eruption: getEruptions,
  tsunami: getTsunamis,
}
