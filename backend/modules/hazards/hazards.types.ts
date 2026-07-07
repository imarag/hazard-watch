import type { FeatureCollection, Point } from 'geojson'

// ---------- shared ----------

export type ToDisplay<T extends { geom: string }> = Omit<T, 'geom'> & {
  longitude: number
  latitude: number
}

// ---------- earthquakes ----------

export type USGSEarthquakeResponse = FeatureCollection<Point>

export type DepthClass = 'shallow' | 'intermediate' | 'deep'

export type EarthquakeDB = {
  id: string
  usgs_id: string
  magnitude: number | null
  magnitude_type: string | null
  location: string | null
  occurred_at: string | null
  depth_km: number | null
  depth_class: DepthClass | null
  triggered_tsunami: 'yes' | 'no' | null
  alert: string | null
  geom: string
}

export type EarthquakeTransformResult = Omit<EarthquakeDB, 'id'>
export type EarthquakeDisplay = ToDisplay<EarthquakeDB>

// ---------- eruptions ----------

export type GVPEruptionResponse = FeatureCollection<Point>

export type EruptionDB = {
  id: string
  gvp_eruption_id: number
  gvp_volcano_id: number | null
  volcano_name: string | null
  eruption_area: string | null
  start_year: number | null
  start_year_display: string | null
  start_year_uncertainty: number | null
  explosivity_index: number | null
  explosivity_label: string | null
  confirmed: boolean
  geom: string
}

export type EruptionTransformResult = Omit<EruptionDB, 'id'>
export type EruptionDisplay = ToDisplay<EruptionDB>

// ---------- tsunamis ----------

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
  deaths_severity_label: string | null
  earthquake_magnitude: number | null
  cause: string
  geom: string
}

export type TsunamiTransformResult = Omit<TsunamiDB, 'id'>
export type TsunamiDisplay = ToDisplay<TsunamiDB>

// ---------- wildfires ----------

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
export type WildfireDisplay = ToDisplay<WildfireDB>