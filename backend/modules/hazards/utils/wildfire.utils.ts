const SATELLITE_NAMES: Record<string, string> = {
  N: 'Suomi NPP',
  N20: 'NOAA-20',
  N21: 'NOAA-21',
  T: 'Terra',
  A: 'Aqua',
}

export const getSatelliteName = (
  code: string | null | undefined,
): string | null => {
  if (!code) return null
  return SATELLITE_NAMES[code] ?? code // unknown codes pass through
}

export const parseDetectedAt = (date: string, time: number): string | null => {
  if (!Number.isInteger(time) || time < 0 || time > 2359) return null
  const padded = String(time).padStart(4, '0')
  return `${date}T${padded.slice(0, 2)}:${padded.slice(2, 4)}:00Z`
}

const CONFIDENCE_MAP = { l: 'low', n: 'nominal', h: 'high' } as const

export const parseConfidence = (raw: string): 'low' | 'nominal' | 'high' => {
  if (raw in CONFIDENCE_MAP)
    return CONFIDENCE_MAP[raw as keyof typeof CONFIDENCE_MAP]
  const n = Number(raw)
  if (!Number.isFinite(n)) return 'nominal'
  if (n >= 80) return 'high'
  if (n >= 30) return 'nominal'
  return 'low'
}