import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import PublicIcon from '@mui/icons-material/Public'
import VolcanoIcon from '@mui/icons-material/Volcano'
import type { HazardMeta } from '@/features/hazards/types'
import { daysAgo } from './utils'
import type { FilterParamsConfig } from '@/shared/types/config'

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

export const filterParamsConfig = {
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
  wildfire: {},
  eruption: {},
  posts: {
    hazardType: {
      id: 'hazard-type',
      type: 'select',
      label: 'Hazard Type',
      value: '',
      options: [
        { label: 'All', value: '' },
        ...Object.entries(hazardMeta).map(([value, { name }]) => ({
          label: name,
          value,
        })),
      ],
      size: 'small',
    },
  },
} satisfies FilterParamsConfig
