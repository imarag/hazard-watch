import type { GVPEruptionResponse } from './schema.ts'
import { EruptionDisplaySchema } from './schema.ts'
import type { EruptionDisplayProperties } from './schema.ts'
import type { FeatureCollection, Point, Feature } from 'geojson'

export const mapEruption = (
  raw: GVPEruptionResponse,
): FeatureCollection<Point, EruptionDisplayProperties> => ({
  type: 'FeatureCollection',
  features: raw.features.map(
    (f): Feature<Point, EruptionDisplayProperties> => ({
      type: 'Feature',
      geometry: f.geometry as Point,
      properties: EruptionDisplaySchema.parse({
        volcanoName: f.properties['Volcano_Name'],
        activityArea: f.properties['ActivityArea'] ?? null,
        startYear: f.properties['StartDateYear'] ?? null,
        explosivityIndex: f.properties['ExplosivityIndexMax'] ?? null,
        confirmed: f.properties['Activity_Type'] === 'Confirmed Eruption',
      }),
    }),
  ),
})