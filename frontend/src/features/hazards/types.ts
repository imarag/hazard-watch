import type { SvgIconComponent } from '@mui/icons-material'


export type HazardMeta = {
  name: string
  muiIcon: SvgIconComponent
  color: string
  backgroundColor: string
}

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


export interface EruptionDisplayProperties {
  volcanoName: string
  activityArea: string | null
  startYear: number | null
  explosivityIndex: number | null
  confirmed: boolean
}

export interface WildfireDisplayProperties {
  frp: number           // Fire Radiative Power, MW
  brightness: number    // Kelvin
  confidence: 'low' | 'nominal' | 'high'
  acquiredAt: number    // unix ms, UTC
  daynight: 'day' | 'night'
  satellite: string
}