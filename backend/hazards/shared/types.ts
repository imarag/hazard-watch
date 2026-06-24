import type { EarthquakeDisplay } from "../earthquakes/types.ts"
import type { EruptionDisplay } from "../eruptions/types.ts"
import type { WildfireDisplay } from "../wildfires/types.ts"
import type { TsunamiDisplay } from "../tsunamis/types.ts"
import type { Post } from "../../posts/types.ts"

export const HazardType = {
  EARTHQUAKE: 'earthquake',
  ERUPTION: 'eruption',
  WILDFIRE: 'wildfire',
  TSUNAMI: 'tsunami',
} as const

export const allLayers = [...Object.values(HazardType), 'post'] as const
export type Layer = (typeof allLayers)[number]
export type HazardType = (typeof HazardType)[keyof typeof HazardType]

export type LayerResult = Post[] | EarthquakeDisplay[] | EruptionDisplay[] | WildfireDisplay[] | TsunamiDisplay[]
