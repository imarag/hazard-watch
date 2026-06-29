import type { SvgIconComponent } from '@mui/icons-material'
import type { ControlPosition } from 'leaflet'

export type CustomPosition =
  | 'centerleft'
  | 'centerright'
  | 'centertop'
  | 'centerbottom'
export type MapElementPosition = ControlPosition | CustomPosition

export type FlyTarget = {
  coords: { lat: number; lon: number }
  zoom?: number
  flyDurationSec?: number
}

export type MarkerType = {
  id: string
  coords: {
    lat: number
    lng: number
  }
  draggable?: boolean
  popup?: string
  tooltip?: Record<string, unknown>
  color?: string
  icon?: SvgIconComponent
}

export type LegendItem = {
  icon: string
  label: string
  count?: number
}
