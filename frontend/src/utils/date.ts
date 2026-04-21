import type { DateFilterValue } from '@/types/hazards'

export const filterDate = (
  date: string | Date,
  filter: DateFilterValue,
): boolean => {
  if (filter === 'all') return true

  const now = new Date()
  const itemDate = new Date(date)

  const diffMs = now.getTime() - itemDate.getTime()

  if (filter === '24h') {
    return diffMs <= 24 * 60 * 60 * 1000
  }

  if (filter === '7d') {
    return diffMs <= 7 * 24 * 60 * 60 * 1000
  }

  return true
}
