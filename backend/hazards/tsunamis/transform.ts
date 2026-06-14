import type { TsunamiTransformResult } from './types.ts'
import type { NOAATsunamiResponse } from './types.ts'

const CAUSE_CODE_MAP: Record<number, string> = {
  0: 'Unknown',
  1: 'Earthquake',
  2: 'Questionable Earthquake',
  3: 'Earthquake and Landslide',
  4: 'Volcano and Earthquake',
  5: 'Volcano, Earthquake, and Landslide',
  6: 'Volcano',
  7: 'Volcano and Landslide',
  8: 'Landslide',
  9: 'Meteorological',
  10: 'Explosion',
  11: 'Astronomical Tide',
}

export function transformTsunamis(
  items: Record<string, unknown>[],
): TsunamiTransformResult[] {
  return items
    .filter((item) => item['latitude'] != null && item['longitude'] != null)
    .filter((item) => item['latitude'] != null && item['longitude'] != null)
    .map((item) => ({
      noaa_id: item['id'] as number,
      location: (item['locationName'] as string) ?? null,
      country: (item['country'] as string) ?? null,
      year: (item['year'] as number) ?? null,
      max_wave_height_m: (item['maxWaterHeight'] as number) ?? null,
      deaths:
        (item['deathsTotal'] as number) ?? (item['deaths'] as number) ?? null,
      deaths_severity: (item['deathsAmountOrder'] as number) ?? null,
      earthquake_magnitude: (item['eqMagnitude'] as number) ?? null,
      cause: CAUSE_CODE_MAP[item['causeCode'] as number] ?? 'Unknown',
      event_validity: (item['eventValidity'] as number) ?? null,
      intensity: (item['tsIntensity'] as number) ?? null,
      region_code: (item['regionCode'] as number) ?? null,
      geom: `SRID=4326;POINT(${item['longitude']} ${item['latitude']})`,
    }))
}
