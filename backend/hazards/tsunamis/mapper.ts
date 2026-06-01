import type { FeatureCollection, Point, Feature } from 'geojson'
import { TsunamiDisplaySchema } from './schema.ts'
import type { TsunamiDisplayProperties } from './schema.ts'

type NOAATsunamiResponse = {
  items: Record<string, unknown>[]
}

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

export const mapTsunami = (
  raw: NOAATsunamiResponse,
): FeatureCollection<Point, TsunamiDisplayProperties> => ({
  type: 'FeatureCollection',
  features: raw.items
    .filter((item) => item['latitude'] != null && item['longitude'] != null)
    .map(
      (item): Feature<Point, TsunamiDisplayProperties> => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
            item['longitude'] as number,
            item['latitude'] as number,
          ],
        },
        properties: TsunamiDisplaySchema.parse({
          location: item['locationName'] ?? null,
          country: item['country'] ?? null,
          year: item['year'],
          maxWaveHeight: item['maxWaterHeight'] ?? null,
          deaths: item['deathsTotal'] ?? item['deaths'] ?? null,
          deathsScale: item['deathsAmountOrder'] ?? null,
          earthquakeMagnitude: item['eqMagnitude'] ?? null,
          cause: CAUSE_CODE_MAP[item['causeCode'] as number] ?? 'Unknown',
          validity: item['eventValidity'],
        }),
      }),
    ),
})
