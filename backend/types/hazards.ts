export const HazardType = {
  EARTHQUAKE: 'earthquake',
  ERUPTION: 'eruption',
  WILDFIRE: 'wildfire',
} as const

export type HazardType = (typeof HazardType)[keyof typeof HazardType]

export interface EarthquakeDisplayProperties {
  magnitude: number | null
  place: string | null
  time: number
  depth: number
  tsunami: boolean
  alert: 'green' | 'yellow' | 'orange' | 'red' | null
  url: string
}

export interface EruptionDisplayProperties {
  volcanoName: string
  activityArea: string | null
  startYear: number | null
  startYearUncertainty: number | null
  startYearModifier: string | null
  explosivityIndex: number | null
  confirmed: boolean
}

export interface WildfireDisplayProperties {
  frp: number                                       // Fire Radiative Power, MW
  brightness: number                                // Kelvin
  confidence: 'low' | 'nominal' | 'high'
  acquiredAt: number                                // unix ms, UTC
  daynight: 'day' | 'night'
  satellite: string
  instrument: 'VIIRS' | 'MODIS'
}