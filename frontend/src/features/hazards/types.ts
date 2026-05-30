import type { SvgIconComponent } from '@mui/icons-material'

type HazardMetaItem = {
  name: string
  muiIcon: SvgIconComponent
  color: string
  backgroundColor: string
}
export type HazardMeta = Record<HazardType, HazardMetaItem>

export type HazardPositionMode = 'current' | 'map'

export type HazardPosition = {
  longitude: number
  latitude: number
}

export const HazardType = {
  EARTHQUAKE: 'earthquake',
  WILDFIRE: 'wildfire',
  ERUPTION: 'eruption',
} as const

export type HazardType = (typeof HazardType)[keyof typeof HazardType]

export type MapBounds = {
  minLat: number
  maxLat: number
  minLng: number
  maxLng: number
}

export type GlobalHazardParams = {
  starttime?: string
  endtime?: string
} & MapBounds

export type EarthquakeQueryParams = {
  minmagnitude: number
  maxmagnitude?: number
  mindepth?: number
  maxdepth?: number
}

export type EruptionQueryParams = Record<string, never>

export type WildfireQueryParams = Record<string, never>
