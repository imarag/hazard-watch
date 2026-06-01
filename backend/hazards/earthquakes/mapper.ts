import type { USGSEarthquakeResponse } from './schema.ts'
import { EarthquakeDisplaySchema } from './schema.ts'
import type { EarthquakeDisplayProperties } from './schema.ts'
import type { FeatureCollection, Point, Feature } from 'geojson'
import { epochToDate } from '../shared/utils.ts'

export const mapEarthquake = (
  raw: USGSEarthquakeResponse,
): FeatureCollection<Point, EarthquakeDisplayProperties> => ({
  type: 'FeatureCollection',
  features: raw.features.map(
    (f): Feature<Point, EarthquakeDisplayProperties> => ({
      type: 'Feature',
      geometry: f.geometry as Point,
      properties: EarthquakeDisplaySchema.parse({
        id: f.id,
        magnitude: f.properties['mag'] ?? null,
        place: f.properties['place'] ?? null,
        date: epochToDate(f.properties['time'] as number),
        depth: f.geometry.coordinates[2] ?? null,
        tsunami: f.properties['tsunami'] === 1,
        status: f.properties['status'] ?? '',
        alert: f.properties['alert'] ?? null,
      }),
    }),
  ),
})
