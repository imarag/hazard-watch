import type { GVPEruptionResponse } from './schema.ts'
import type { FeatureCollection, Point, Feature } from 'geojson'
import type { EruptionDisplayProperties } from './types.ts'

export const mapEruption = (
  raw: GVPEruptionResponse,
): FeatureCollection<Point, EruptionDisplayProperties> => ({
  type: 'FeatureCollection',
  features: raw.features.map(
    (f): Feature<Point, EruptionDisplayProperties> => ({
      type: 'Feature',
      geometry: f.geometry,
      properties: {
        volcanoName: f.properties.Volcano_Name,
        activityArea: f.properties.ActivityArea,
        startYear: f.properties.StartDateYear,
        explosivityIndex: f.properties.ExplosivityIndexMax,
        confirmed: f.properties.Activity_Type === 'Confirmed Eruption',
      },
    }),
  ),
})
