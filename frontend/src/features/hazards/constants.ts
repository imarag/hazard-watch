import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import PublicIcon from '@mui/icons-material/Public'
import VolcanoIcon from '@mui/icons-material/Volcano'
import type { FormFieldProps } from '@/shared/types/form'
import type {
  HazardMeta,
  EarthquakeQueryParams,
  WildfireQueryParams,
  EruptionQueryParams,
  GlobalHazardParams,
} from '@/features/hazards/types'
import { daysAgo } from './utils'

export const hazardMeta: HazardMeta = {
  earthquake: {
    name: 'Earthquake',
    muiIcon: PublicIcon,
    backgroundColor: '#c08968',
    color: '#ffffff',
  },
  eruption: {
    name: 'Eruption',
    muiIcon: VolcanoIcon,
    backgroundColor: '#e8590c',
    color: '#ffffff',
  },
  wildfire: {
    name: 'Wildfire',
    muiIcon: LocalFireDepartmentIcon,
    backgroundColor: '#f03e3e',
    color: '#ffffff',
  },
}

type HazardFormConfig = {
  global: Record<keyof Omit<GlobalHazardParams, 'bounds'>, FormFieldProps>
  earthquake: Record<keyof EarthquakeQueryParams, FormFieldProps>
  wildfire: Record<keyof WildfireQueryParams, FormFieldProps>
  eruption: Record<keyof EruptionQueryParams, FormFieldProps>
}

export const hazardFormConfig = {
  global: {
    starttime: {
      id: 'start-time',
      type: 'date',
      label: 'Start date',
      value: daysAgo(3),
      size: 'small',
    },
    endtime: {
      id: 'end-time',
      type: 'date',
      label: 'End date',
      value: daysAgo(0),
      size: 'small',
    },
  },
  earthquake: {
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
      max: 1000,
      size: 'small',
    },
    maxdepth: {
      id: 'max-depth',
      type: 'number',
      label: 'Max depth (km)',
      value: 700,
      min: 1,
      max: 1000,
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
      id: 'day-range',
      type: 'number',
      label: 'Days back',
      value: 1,
      min: 1,
      max: 10,
      size: 'small',
    },
  },
  eruption: {},
} satisfies HazardFormConfig
