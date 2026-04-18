export type Point = {
  type: 'Point'
  coordinates: [number, number]
}

export type LineString = {
  type: 'LineString'
  coordinates: Point[]
}

export type Polygon = {
  type: 'Polygon'
  coordinates: LineString[]
}

export type Feature = {
  type: 'Feature'
  geometry: Point | LineString | Polygon
  properties?: Record<string, unknown>
}

export type FeatureCollection = {
  type: 'FeatureCollection'
  features: Feature[]
}
