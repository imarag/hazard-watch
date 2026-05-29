import type {
  EarthquakeQueryParams,
  WildfireQueryParams,
  EruptionQueryParams,
} from '@/types/hazards'

import type { FormFieldProps } from '@/types/form'
import { HazardType } from '@/types/hazards'

export const daysAgo = (days: number): string => {
  const d = new Date()
  d.setUTCDate(d.getUTCDate() - days)
  return d.toISOString() // "2026-05-22T08:34:12.123Z"
}

export const hazardFormConfig = {
  earthquake: {
    starttime: {
      id: 'start-time',
      type: 'select',
      label: 'Date Range',
      value: daysAgo(3),
      options: [
        { label: 'Last 24 hours', value: daysAgo(1) },
        { label: 'Last 3 days', value: daysAgo(3) },
        { label: 'Last 7 days', value: daysAgo(7) },
        { label: 'Last 30 days', value: daysAgo(30) },
      ],
      size: 'small',
    },
    minmagnitude: {
      id: 'min-magnitude',
      type: 'number',
      label: 'Min magnitude',
      value: 4,
      min: 1,
      max: 10,
      size: 'small',
    },
    maxmagnitude: {
      id: 'max-magnitude',
      type: 'number',
      label: 'Max magnitude',
      value: 10,
      min: 2,
      max: 10,
      size: 'small',
    },
    mindepth: {
      id: 'min-depth',
      type: 'number',
      label: 'Min depth (km)',
      value: 0,
      min: 0,
      max: 9999,
      size: 'small',
    },
    maxdepth: {
      id: 'max-depth',
      type: 'number',
      label: 'Max depth (km)',
      value: 700,
      min: 1,
      max: 10000,
      size: 'small',
    },
  },
  wildfire: {
    source: {
      id: 'source',
      type: 'select',
      label: 'Source',
      value: 'VIIRS_SNPP_NRT',
      options: [
        { label: 'VIIRS Suomi-NPP (NRT)', value: 'VIIRS_SNPP_NRT' },
        { label: 'VIIRS NOAA-20 (NRT)', value: 'VIIRS_NOAA20_NRT' },
        { label: 'VIIRS NOAA-21 (NRT)', value: 'VIIRS_NOAA21_NRT' },
        { label: 'MODIS (NRT)', value: 'MODIS_NRT' },
      ],
      size: 'small',
    },
    dayRange: {
      id: 'days-back',
      type: 'number',
      label: 'Days back',
      value: 1,
      min: 1,
      max: 10,
      size: 'small',
    },
    date: {
      id: 'date',
      type: 'date',
      label: 'Date (optional)',
      value: '',
      size: 'small',
    },
  },
  eruption: {
    maxFeatures: {
      id: 'max-features',
      type: 'number',
      label: 'Max results',
      value: 500,
      min: 1,
      max: 5000,
      size: 'small',
    },
  },
} as const

function extractDefaults<T extends Record<string, FormFieldProps>>(
  config: T,
): Record<keyof T, string | number | null> {
  return Object.fromEntries(
    Object.entries(config).map(([k, v]) => [k, v.value]),
  ) as Record<keyof T, string | number | null>
}

export const hazardDefaults = {
  earthquake: extractDefaults(
    hazardFormConfig.earthquake,
  ) as EarthquakeQueryParams,
  wildfire: extractDefaults(hazardFormConfig.wildfire) as WildfireQueryParams,
  eruption: extractDefaults(hazardFormConfig.eruption) as EruptionQueryParams,
}
