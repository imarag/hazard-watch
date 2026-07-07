const CAUSE_CODE_MAP: Record<number, string> = {
  0: 'Unknown',
  1: 'Earthquake',
  2: 'Questionable earthquake',
  3: 'Earthquake and landslide',
  4: 'Volcano and earthquake',
  5: 'Volcano, earthquake, and landslide',
  6: 'Volcanic eruption',
  7: 'Volcano and landslide',
  8: 'Landslide',
  9: 'Meteorological',
  10: 'Explosion',
  11: 'Astronomical tide',
}

export const getCause = (code: number | null | undefined): string =>
  code != null ? (CAUSE_CODE_MAP[code] ?? 'Unknown') : 'Unknown'

// NOAA deathsAmountOrder: 0=none, 1=few(~1-50), 2=~51-100, 3=~101-1000, 4=1001+
export const getDeathsSeverityLabel = (
  order: number | null | undefined,
): string | null => {
  if (order === null || order === undefined) return null
  const labels = [
    'None reported',
    'Few (1–50)',
    'Some (51–100)',
    'Many (101–1,000)',
    'Very many (over 1,000)',
  ]
  return labels[order] ?? null
}