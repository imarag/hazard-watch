import type { USGSEarthquakeResponse } from './schema.ts'
import type { FeatureCollection, Point, Feature } from 'geojson'
import type { EarthquakeDisplayProperties } from './types.ts'

export const mapEarthquake = (
  raw: USGSEarthquakeResponse,
): FeatureCollection<Point, EarthquakeDisplayProperties> => ({
  type: 'FeatureCollection',
  features: raw.features.map(
    (f): Feature<Point, EarthquakeDisplayProperties> => ({
      type: 'Feature',
      geometry: f.geometry,
      properties: {
        magnitude: f.properties.mag,
        place: f.properties.place,
        time: f.properties.time,
        depth: f.geometry.coordinates[2] ?? null,
        tsunami: f.properties.tsunami === 1,
        status: f.properties.status,
        alert: f.properties.alert,
        url: f.properties.url,
      },
    }),
  ),
})
