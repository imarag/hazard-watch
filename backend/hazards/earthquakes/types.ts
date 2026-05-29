export interface EarthquakeDisplayProperties {
  magnitude: number | null
  place: string | null
  time: number
  depth: number | null
  tsunami: boolean
  status: string
  alert: 'green' | 'yellow' | 'orange' | 'red' | null
  url: string
}
