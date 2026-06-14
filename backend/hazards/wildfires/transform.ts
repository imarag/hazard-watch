// transform.ts
import type { FIRMSWildfireResponse } from './schema.ts'
import type { WildfireTransformResult } from './types.ts'

const CONFIDENCE_MAP = { l: 'low', n: 'nominal', h: 'high' } as const

const parseConfidence = (raw: string): 'low' | 'nominal' | 'high' => {
  if (raw in CONFIDENCE_MAP)
    return CONFIDENCE_MAP[raw as keyof typeof CONFIDENCE_MAP]
  const n = Number(raw)
  if (!Number.isFinite(n)) return 'nominal'
  if (n >= 80) return 'high'
  if (n >= 30) return 'nominal'
  return 'low'
}

const parseDetectedAt = (date: string, time: number): string => {
  const padded = String(time).padStart(4, '0')
  return `${date}T${padded.slice(0, 2)}:${padded.slice(2, 4)}:00Z`
}

export function transformWildfires(raw: FIRMSWildfireResponse): WildfireTransformResult[] {
  return raw.map((r) => ({
    fire_radiative_power: r.frp ?? null,
    brightness_temp_k: r.bright_ti4 ?? null,
    confidence: parseConfidence(r.confidence),
    detected_at: parseDetectedAt(r.acq_date, r.acq_time),
    time_of_day: r.daynight === 'D' ? 'day' : 'night',
    satellite: r.satellite ?? null,
    geom: `SRID=4326;POINT(${r.longitude} ${r.latitude})`,
  }))
}