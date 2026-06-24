import type { SvgIconComponent } from '@mui/icons-material'
import type { FeatureCollection, Point } from 'geojson'

export const HazardType = {
  EARTHQUAKE: 'earthquake',
  WILDFIRE: 'wildfire',
  ERUPTION: 'eruption',
  TSUNAMI: 'tsunami',
} as const

export type HazardType = (typeof HazardType)[keyof typeof HazardType]

export type Layer = HazardType | 'post'

type LayerMetaItem = {
  name: string
  muiIcon: SvgIconComponent
  color: string
  icon: string
  backgroundColor: string
}
export type LayerMeta = Record<Layer, LayerMetaItem>

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

export type GlobalHazardQueryParams = {
  startdate?: string
  enddate?: string
  bbox: string
  layers: string
}

export type EarthquakeQueryParams = {
  minmagnitude?: number
  maxmagnitude?: number
  mindepth?: number
  maxdepth?: number
  alertLevel?: 'green' | 'yellow' | 'orange' | 'red' | ''
  triggeredTsunami?: boolean | ''
}

export type EruptionQueryParams = {
  confirmedOnly?: boolean
  minExplosivity?: number
}

export type WildfireQueryParams = {
  minFireRadiativePower?: number
  confidence?: 'low' | 'nominal' | 'high' | ''
  timeOfDay?: 'day' | 'night' | ''
}

export type TsunamiQueryParams = {
  minMaxWaterHeight?: number
  minDeathsAmountOrder?: 0 | 1 | 2 | 3 | 4
  cause?: 'earthquake' | 'volcano' | 'landslide' | ''
}

export type EarthquakeDisplayProperties = {
  id: string
  usgs_id: string
  magnitude: number | null
  location: string | null
  occurred_at: string | null
  depth_km: number | null
  triggered_tsunami: boolean | null
  review_status: string | null
  alert_level: 'green' | 'yellow' | 'orange' | 'red' | null
  longitude: number
  latitude: number
}

export type EruptionDisplayProperties = {
  id: string
  gvp_eruption_id: number
  gvp_volcano_id: number | null
  volcano_name: string
  eruption_area: string | null
  start_year: number | null
  start_year_uncertainty: number | null
  explosivity_index: number | null
  confirmed: boolean
  longitude: number
  latitude: number
}

export type WildfireDisplayProperties = {
  id: string
  fire_radiative_power: number | null
  brightness_temp_k: number | null
  confidence: 'low' | 'nominal' | 'high' | null
  detected_at: string | null
  time_of_day: 'day' | 'night' | null
  satellite: string | null
  longitude: number
  latitude: number
}

export type TsunamiDisplayProperties = {
  id: string
  noaa_id: number
  location: string | null
  country: string | null
  year: number | null
  max_wave_height_m: number | null
  deaths: number | null
  deaths_severity: number | null
  earthquake_magnitude: number | null
  cause: string | null
  event_validity: number | null
  intensity: number | null
  region_code: number | null
  longitude: number
  latitude: number
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

export type HazardResponse<T> = {
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

export type LayersResponse = Partial<{
  earthquake: EarthquakeDisplayProperties[]
  eruption: EruptionDisplayProperties[]
  wildfire: WildfireDisplayProperties[]
  tsunami: TsunamiDisplayProperties[]
  post: any
}>
