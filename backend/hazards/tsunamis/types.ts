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