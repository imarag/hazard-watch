export const getExplosivityLabel = (
  vei: number | null | undefined,
): string | null => {
  if (vei === null || vei === undefined) return null
  if (vei <= 1) return 'Gentle'
  if (vei === 2) return 'Explosive'
  if (vei === 3) return 'Severe'
  if (vei === 4) return 'Cataclysmic'
  if (vei === 5) return 'Paroxysmal'
  if (vei === 6) return 'Colossal'
  if (vei === 7) return 'Super-colossal'
  return 'Mega-colossal'
}

// GVP years can be negative (BCE) — make that readable
export const getEraYear = (year: number | null | undefined): string | null => {
  if (year === null || year === undefined) return null
  return year < 0 ? `${Math.abs(year)} BCE` : `${year} CE`
}