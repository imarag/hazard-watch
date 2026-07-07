import { logger } from '../../../lib/logger.js'
import { epochToIsoDate } from '../../../lib/utils.js'

export const getMagnitudeType = (
  magType: string | null | undefined,
): string | null => (magType ? magType.toUpperCase() : null)

export const getOccurredAt = (
  time: number | null | undefined,
): string | null => {
  if (!time) return null
  try {
    return epochToIsoDate(time, 'ms')
  } catch {
    logger.warn('Invalid epoch time from USGS')
    return null
  }
}

export const getDepthClass = (
  depth: number | null | undefined,
): 'shallow' | 'intermediate' | 'deep' | null => {
  if (depth === null || depth === undefined) {
    return null
  }
  if (depth < 70) return 'shallow'
  if (depth <= 300) return 'intermediate'
  return 'deep'
}

export const getTsunamiInfo = (
  tsunami: number | null | undefined,
): 'yes' | 'no' | null => {
  if (tsunami === null || tsunami === undefined) {
    return null
  }
  return tsunami === 1 ? 'yes' : 'no'
}

const ALERT_LABELS = {
  green: 'Low impact',
  yellow: 'Local impact',
  orange: 'Serious — significant damage likely',
  red: 'Major disaster',
} as const

export const getAlertInfo = (
  alert: string | null | undefined,
): string | null => {
  if (!alert) {
    return null
  }
  return ALERT_LABELS[alert.toLowerCase() as keyof typeof ALERT_LABELS] ?? null
}
