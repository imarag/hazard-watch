import FloodIcon from '@mui/icons-material/Flood'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import ThunderstormIcon from '@mui/icons-material/Thunderstorm'
import PublicIcon from '@mui/icons-material/Public'
import type { HazardType, HazardMeta } from '@/types/hazards'
import type { SortField } from '@/types/posts'

export const hazardMeta: Record<HazardType, HazardMeta> = {
  flood: {
    name: 'Flood',
    muiIcon: FloodIcon,
    backgroundColor: '#1e6091', // deeper blue
    color: '#ffffff',
  },
  earthquake: {
    name: 'Earthquake',
    muiIcon: PublicIcon, // ✅ globe cracks = earthquake
    backgroundColor: '#7d4e3a', // earthy brown
    color: '#ffffff',
  },
  wildfire: {
    name: 'Wildfire',
    muiIcon: LocalFireDepartmentIcon,
    backgroundColor: '#c0392b', // stronger red
    color: '#ffffff',
  },
  storm: {
    name: 'Storm',
    muiIcon: ThunderstormIcon,
    backgroundColor: '#4a3f6b', // deeper purple
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
  earthquake: PublicIcon, // ✅ consistent with hazardMeta
  storm: ThunderstormIcon,
  wildfire: LocalFireDepartmentIcon,
}
