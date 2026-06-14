import type { USGSEarthquakeResponse } from './types.ts'
import { epochToIsoDate } from '../../lib/utils.ts'
import type { EarthquakeTransformResult } from './types.ts'

export function transformEarthquakes(
  data: USGSEarthquakeResponse,
): EarthquakeTransformResult[] {
  return data.features
    .filter((f) => f.properties !== null)
    .map((f) => {
      const [lon, lat, depth] = f.geometry.coordinates
      const props = f.properties!
      return {
        usgs_id: String(f.id),
        magnitude: props['mag'] ?? null,
        location: props['place'] ?? null,
        occurred_at: props['time'] ? epochToIsoDate(props['time'], 'ms') : null,
        depth_km: depth ?? null,
        triggered_tsunami: props['tsunami'] === 1,
        review_status: props['status'] ?? null,
        alert_level: props['alert'] ?? null,
        geom: `SRID=4326;POINT(${lon} ${lat})`,
      } satisfies EarthquakeTransformResult
    })
}
