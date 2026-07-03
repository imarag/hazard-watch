import { HAZARDS_REGISTRY } from '../hazards/index.js'
import { getPostsForMap } from '../posts/index.js'

export const LAYERS_REGISTRY = {
  ...HAZARDS_REGISTRY,
  post: {
    name: 'Community Post',
    icon: 'message-square',
    table: 'posts',
    externalIdColumn: null,
    provider: {
      name: 'Hazard Watch Community',
      url: null,
      description: 'User-submitted hazard reports and observations',
    },
    fetchFn: getPostsForMap
  },
} as const

export type LayerType = keyof typeof LAYERS_REGISTRY
export const allLayers = Object.keys(LAYERS_REGISTRY) as LayerType[]
export type Layer = (typeof LAYERS_REGISTRY)[LayerType]
