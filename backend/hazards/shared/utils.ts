import type { Layer } from './types.ts'
import {
  getEarthquakes,
  getWildfires,
  getEruptions,
  getTsunamis,
} from './services.ts'
import type { GlobalHazardParams } from './schema.ts'
import { getAllPosts } from '../../posts/services.ts'
import type { LayerResult } from './types.ts'

export const layerFetchMapping: Record<
  Layer,
  (params: GlobalHazardParams) => Promise<LayerResult>
> = {
  post: getAllPosts,
  earthquake: getEarthquakes,
  wildfire: getWildfires,
  eruption: getEruptions,
  tsunami: getTsunamis,
}
