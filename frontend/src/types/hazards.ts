import type { SvgIconComponent } from '@mui/icons-material'

export const HazardType = {
  FLOOD: 'flood',
  EARTHQUAKE: 'earthquake',
  WILDFIRE: 'wildfire',
  STORM: 'storm',
} as const

export type HazardType = (typeof HazardType)[keyof typeof HazardType]

export type HazardMeta = {
  name: string
  muiIcon: SvgIconComponent
  color: string
  backgroundColor: string
}

export type Location = [number, number]

export const DateFilter = [
  { label: 'Last hour', value: '1h' },
  { label: 'Last 24 hours', value: '1d' },
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last 3 months', value: '3m' },
  { label: 'All', value: 'all' },
] as const

export type DateFilterOption = (typeof DateFilter)[number]

export type DateFilterValue = DateFilterOption['value']

export type HazardPositionMode = 'current' | 'map'
export type HazardPosition = {
  longitude: number
  latitude: number
}
