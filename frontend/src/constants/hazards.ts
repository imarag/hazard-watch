import FloodIcon from '@mui/icons-material/Flood'
import LandslideIcon from '@mui/icons-material/Landslide'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import ThunderstormIcon from '@mui/icons-material/Thunderstorm'
import type { HazardType, HazardMeta } from '@/types/hazards'
import type { SortField } from '@/types/posts'

export const hazardMeta: Record<HazardType, HazardMeta> = {
  flood: {
    name: 'Flood',
    muiIcon: FloodIcon,
    backgroundColor: '#3b6c8a',
    color: '#ffffff',
  },
  earthquake: {
    name: 'Earthquake',
    muiIcon: LandslideIcon,
    backgroundColor: '#8c4a3f',
    color: '#ffffff',
  },
  wildfire: {
    name: 'Wildfire',
    muiIcon: LocalFireDepartmentIcon,
    backgroundColor: '#b8693a',
    color: '#ffffff',
  },
  storm: {
    name: 'Storm',
    muiIcon: ThunderstormIcon,
    backgroundColor: '#5a4e7a',
    color: '#ffffff',
  },
}

export const sortOptions: { value: SortField; label: string }[] = [
  { value: 'createdAt', label: 'Date' },
  { value: 'hazardType', label: 'Hazard Type' },
  { value: 'title', label: 'Title' },
  { value: 'author', label: 'Author' },
]

export const hazardIconMapping = {
  flood: FloodIcon,
  earthquake: LandslideIcon,
  storm: ThunderstormIcon,
  wildfire: LocalFireDepartmentIcon,
}
