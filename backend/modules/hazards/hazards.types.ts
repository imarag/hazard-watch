import type { FeatureCollection, Point } from 'geojson'

export type MapQueryParams = {
  bbox: [number, number, number, number]
  startDate?: string
  endDate?: string
}

export type WildfireDB = {
  id: string
  fire_radiative_power: number | null
  brightness_temp_k: number | null
  confidence: 'low' | 'nominal' | 'high' | null
  detected_at: string | null
  time_of_day: 'day' | 'night' | null
  satellite: string | null
  geom: string
}

export type WildfireTransformResult = Omit<WildfireDB, 'id'>

export type WildfireDisplay = {
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

export type NOAATsunamiResponse = {
  items: Record<string, unknown>[]
  totalItems: number
  totalPages: number
  page: number
  itemsPerPage: number
}

export type TsunamiDB = {
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
  geom: string
}

export type TsunamiTransformResult = Omit<TsunamiDB, 'id'>

export type TsunamiDisplay = {
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

export type GVPEruptionResponse = FeatureCollection<Point>

// what goes INTO the database
export type EruptionDB = {
  id: string
  gvp_eruption_id: number
  gvp_volcano_id: number | null
  volcano_name: string
  eruption_area: string | null
  start_year: number | null
  start_year_uncertainty: number | null
  explosivity_index: number | null
  confirmed: boolean
  geom: string
}

export type EruptionTransformResult = Omit<EruptionDB, 'id'>

// what goes OUT to the frontend
export type EruptionDisplay = {
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

export type USGSEarthquakeResponse = FeatureCollection<Point>

export type EarthquakeDB = {
  id: string
  usgs_id: string
  magnitude: number | null
  location: string | null
  occurred_at: string | null
  depth_km: number | null
  triggered_tsunami: boolean | null
  review_status: string | null
  alert_level: 'green' | 'yellow' | 'orange' | 'red' | null
  geom: string
}

export type EarthquakeTransformResult = Omit<EarthquakeDB, 'id'>

// what goes OUT to the frontend
export type EarthquakeDisplay = {
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
