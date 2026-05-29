import type { FIRMSWildfireResponse } from './schema.ts'
import type { FeatureCollection, Point, Feature } from 'geojson'
import type { WildfireDisplayProperties } from './types.ts'

const CONFIDENCE_MAP = { l: 'low', n: 'nominal', h: 'high' } as const

const parseAcquiredAt = (date: string, time: number): number => {
  const padded = String(time).padStart(4, '0')
  return Date.parse(`${date}T${padded.slice(0, 2)}:${padded.slice(2, 4)}:00Z`)
}

const parseConfidence = (raw: string): 'low' | 'nominal' | 'high' => {
  if (raw in CONFIDENCE_MAP)
    return CONFIDENCE_MAP[raw as keyof typeof CONFIDENCE_MAP]
  const n = Number(raw)
  if (!Number.isFinite(n)) return 'nominal'
  if (n >= 80) return 'high'
  if (n >= 30) return 'nominal'
  return 'low'
}

export const mapWildfire = (
  raw: FIRMSWildfireResponse,
): FeatureCollection<Point, WildfireDisplayProperties> => ({
  type: 'FeatureCollection',
  features: raw.map(
    (r): Feature<Point, WildfireDisplayProperties> => ({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [r.longitude, r.latitude] },
      properties: {
        frp: r.frp,
        brightness: r.bright_ti4,
        confidence: parseConfidence(r.confidence),
        acquiredAt: parseAcquiredAt(r.acq_date, r.acq_time),
        daynight: r.daynight === 'D' ? 'day' : 'night',
        satellite: 'Suomi NPP', // VIIRS_SNPP_NRT is hardcoded as default source
      },
    }),
  ),
})
