import FloodIcon from '@mui/icons-material/Flood'
import LandslideIcon from '@mui/icons-material/Landslide'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import TsunamiIcon from '@mui/icons-material/Tsunami'
import ThunderstormIcon from '@mui/icons-material/Thunderstorm'
import type { HazardType, HazardMeta } from '@/types/hazards'
import type { SortField } from '@/types/posts'

export const hazardMeta: Record<HazardType, HazardMeta> = {
  flood: {
    name: 'Flood',
    muiIcon: FloodIcon,
    backgroundColor: '#0ea5e9',
    color: '#ffffff',
  },
  earthquake: {
    name: 'Earthquake',
    muiIcon: LandslideIcon,
    backgroundColor: '#dc2626',
    color: '#ffffff',
  },
  wildfire: {
    name: 'Wildfire',
    muiIcon: LocalFireDepartmentIcon,
    backgroundColor: '#ea580c',
    color: '#ffffff',
  },
  storm: {
    name: 'Storm',
    muiIcon: ThunderstormIcon,
    backgroundColor: '#7c3aed',
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
  flood: TsunamiIcon,
  earthquake: FloodIcon,
  storm: ThunderstormIcon,
  wildfire: LocalFireDepartmentIcon,
}
