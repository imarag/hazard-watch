import type { SvgIconComponent } from '@mui/icons-material'
import type { FeatureCollection, Point } from 'geojson'

export const HazardType = {
  EARTHQUAKE: 'earthquake',
  WILDFIRE: 'wildfire',
  ERUPTION: 'eruption',
  TSUNAMI: 'tsunami',
} as const

export type HazardType = (typeof HazardType)[keyof typeof HazardType]

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

export type EruptionQueryParams = {
  confirmedOnly?: boolean
  minExplosivity?: number
}
export type WildfireQueryParams = Record<string, never>
export type TsunamiQueryParams = {
  minMaxWaterHeight?: number
  minDeathsAmountOrder?: number
}

export type EarthquakeDisplayProperties = {
  id: string
  magnitude: number | null
  place: string | null
  date: string
  depth: number | null
  tsunami: boolean
  status: string
  alert: 'green' | 'yellow' | 'orange' | 'red' | null
}
export type EruptionDisplayProperties = {
  volcanoName: string
  activityArea: string | null
  startYear: number | null
  explosivityIndex: number | null
  confirmed: boolean
}
export type WildfireDisplayProperties = {
  firepower: number
  brightnessTemp: number
  confidence: 'low' | 'nominal' | 'high'
  detectedAt: number
  timeOfDay: 'day' | 'night'
  satellite: string
}
export type TsunamiDisplayProperties = {
  location: string | null
  country: string | null
  year: number
  maxWaveHeight: number | null
  deaths: number | null
  deathsScale: number | null
  earthquakeMagnitude: number | null
  cause: string
  validity: number
}

export type HazardInfo = {
  source: string
  sourceUrl: string
  description: string
  totalFeatures: number
}

export const emptyInfo: HazardInfo = {
  source: '',
  sourceUrl: '',
  description: '',
  totalFeatures: 0,
}

type HazardResponse<T> = {
  data: FeatureCollection<Point, T>
  info: HazardInfo
}

export type EarthquakeResponse = HazardResponse<EarthquakeDisplayProperties>
export type EruptionResponse = HazardResponse<EruptionDisplayProperties>
export type WildfireResponse = HazardResponse<WildfireDisplayProperties>
export type TsunamiResponse = HazardResponse<TsunamiDisplayProperties>

export type HazardResponseMap = {
  earthquake: EarthquakeResponse
  eruption: EruptionResponse
  wildfire: WildfireResponse
  tsunami: TsunamiResponse
}
