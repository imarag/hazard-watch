import floodIcon from '@/assets/icons/tsunami.svg'
import earthquakeIcon from '@/assets/icons/soundwave.svg'
import wildfireIcon from '@/assets/icons/fire.svg'
import stormIcon from '@/assets/icons/cloud-rain-fill.svg'
import FloodIcon from '@mui/icons-material/Flood'
import LandslideIcon from '@mui/icons-material/Landslide'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import ThunderstormIcon from '@mui/icons-material/Thunderstorm'
import type { HazardType, HazardMeta } from '@/types/hazards'
import type { SortField } from '@/types/posts'

export const hazardMeta: Record<HazardType, HazardMeta> = {
  flood: {
    name: 'Flood',
    svgUrl: floodIcon,
    muiIcon: FloodIcon,
    color: '#0ea5e9',
  },
  earthquake: {
    name: 'Earthquake',
    svgUrl: earthquakeIcon,
    muiIcon: LandslideIcon,
    color: '#f87272',
  },
  wildfire: {
    name: 'Wildfire',
    svgUrl: wildfireIcon,
    muiIcon: LocalFireDepartmentIcon,
    color: '#fbbd23',
  },
  storm: {
    name: 'Storm',
    svgUrl: stormIcon,
    muiIcon: ThunderstormIcon,
    color: '#a855f7',
  },
}

export const sortOptions: { value: SortField; label: string }[] = [
  { value: 'createdAt', label: 'Date' },
  { value: 'hazardType', label: 'Hazard Type' },
  { value: 'title', label: 'Title' },
  { value: 'author', label: 'Author' },
]
