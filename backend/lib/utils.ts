export const toInt = (val: unknown): number | null => {
  const n = Number(val)
  return Number.isFinite(n) ? n : null
}

// Returns an ISO string for a date N days before today
export function datesBefore(days: number) {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d.toISOString()
}

export function getToday() {
  return new Date().toISOString()
}

export const epochToDate = (epoch: number, type: 'ms' | 's' = 'ms') => {
  const ms = type === 's' ? epoch * 1000 : epoch
  return new Date(ms).toLocaleString()
}

export const epochToIsoDate = (epoch: number, type: 'ms' | 's' = 'ms') => {
  const ms = type === 's' ? epoch * 1000 : epoch
  return new Date(ms).toISOString()
}

export const escapeRegex = (str: string) =>
  str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export function snakeToCamelCase(str: string) {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
}

export function camelToSnakeCase(str: string) {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
}
