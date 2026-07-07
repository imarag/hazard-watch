import { HAZARD_FETCHERS } from '../hazards/index.js'
import { getPostsForMap } from '../posts/index.js'

export const LAYERS_REGISTRY = {
  ...HAZARD_FETCHERS,
  post: getPostsForMap,
} as const

export type LayerType = keyof typeof LAYERS_REGISTRY
export const allLayers = Object.keys(LAYERS_REGISTRY) as LayerType[]
export type Layer = (typeof LAYERS_REGISTRY)[LayerType]
