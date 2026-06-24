import type { FilterParams, FilterParamsValues } from '@/shared/types/config'
import type { Layer } from './types'

export function extractFormValues<T>(
  config: Record<string, Record<string, { value: unknown }>>,
) {
  return Object.fromEntries(
    Object.keys(config).map((key) => [
      key,
      Object.fromEntries(
        Object.keys(config[key]).map((option) => [
          option,
          config[key][option].value,
        ]),
      ),
    ]),
  ) as T
}

function timeRangeToStartDate(timeRange: string): string {
  const map: Record<string, number> = {
    '1h': 1,
    '6h': 6,
    '12h': 12,
    '24h': 24,
    '3d': 72,
    '7d': 168,
    '30d': 720,
  }
  const now = new Date()
  now.setUTCHours(now.getUTCHours() - (map[timeRange] ?? 72))
  return now.toISOString()
}

export function createQueryParams(
  filterParams: FilterParams,
  enabledLayers: Layer[],
) {
  const extractedValues: FilterParamsValues = extractFormValues(filterParams)
  const global = extractedValues.global

  const bbox = [global.minLng, global.minLat, global.maxLng, global.maxLat]

  const layerParams = enabledLayers.reduce(
    (acc, layer) => ({
      ...acc,
      ...extractedValues[layer],
    }),
    {} as Record<string, unknown>,
  )

  return {
    layers: enabledLayers.join(','),
    startDate: timeRangeToStartDate(global.timeRange),
    endDate: new Date().toISOString(),
    bbox: bbox.every((v) => v !== null) ? bbox.join(',') : undefined,
    ...layerParams,
  }
}

export const daysAgo = (days: number): string => {
  const d = new Date()
  d.setUTCDate(d.getUTCDate() - days)
  return d.toISOString().split('T')[0] // "2026-05-27"
}
