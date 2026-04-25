import type { ControlPosition } from 'leaflet'

export type CustomPosition =
  | 'centerleft'
  | 'centerright'
  | 'centertop'
  | 'centerbottom'
export type MapPosition = ControlPosition | CustomPosition
