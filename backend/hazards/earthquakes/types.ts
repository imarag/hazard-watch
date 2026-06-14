import type { FeatureCollection, Point } from 'geojson'

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
