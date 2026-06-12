import type { SvgIconComponent } from '@mui/icons-material'
import type { ControlPosition } from 'leaflet'

export type CustomPosition =
  | 'centerleft'
  | 'centerright'
  | 'centertop'
  | 'centerbottom'
export type MapPosition = ControlPosition | CustomPosition

export type FlyTarget = {
  coords: { lat: number; lon: number }
  zoom?: number
}

export type MarkerType = {
  id: string
  coords: {
    lat: number
    lon: number
  }
  draggable?: boolean
  popup?: string
  tooltip?: Record<string, unknown>
  color?: string
  icon?: SvgIconComponent
}
