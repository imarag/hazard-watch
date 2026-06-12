import type { EarthquakeDisplay } from "../earthquakes/schema.ts"
import type { EruptionDisplay } from "../eruptions/schema.ts"
import type { WildfireDisplay } from "../wildfires/schema.ts"
import type { TsunamiDisplay } from "../tsunamis/schema.ts"
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
