import type { DateFilterValue } from '@/types/hazards'

const filterDurationMs: Record<Exclude<DateFilterValue, 'all'>, number> = {
  '1h': 60 * 60 * 1000,
  '1d': 24 * 60 * 60 * 1000,
  '7d': 7 * 24 * 60 * 60 * 1000,
  '30d': 30 * 24 * 60 * 60 * 1000,
  '3m': 90 * 24 * 60 * 60 * 1000,
}

export const filterDate = (
  date: string | Date,
  filter: DateFilterValue,
): boolean => {
  if (filter === 'all') return true
  const diffMs = Date.now() - new Date(date).getTime()
  return diffMs <= filterDurationMs[filter]
}
