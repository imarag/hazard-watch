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
  svgUrl: string
  muiIcon: SvgIconComponent
  color: string
}

export type Position = [number, number] // [lon, lat]

export type Coords = { latitude: number; longitude: number }

// Geometries
export type Point = {
  type: 'Point'
  coordinates: Position
}

export type LineString = {
  type: 'LineString'
  coordinates: Position[]
}

export type Polygon = {
  type: 'Polygon'
  coordinates: Position[][]
}

export type Geometry = Point | LineString | Polygon

export type Properties = unknown

export type Feature<G extends Geometry = Geometry, P = Properties> = {
  type: 'Feature'
  geometry: G
  properties: P
}

// Your Location type
export type Location = Feature<Point, Properties>
