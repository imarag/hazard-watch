import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import PublicIcon from '@mui/icons-material/Public'
import VolcanoIcon from '@mui/icons-material/Volcano'
import type { HazardType, HazardMeta } from '@/types/hazards'
import type { SortField } from '@/types/posts'

export const hazardMeta: Record<HazardType, HazardMeta> = {
  earthquake: {
    name: 'Earthquake',
    muiIcon: PublicIcon,
    backgroundColor: '#c08968', // warm tan-brown, much brighter
    color: '#ffffff',
  },
  eruption: {
    name: 'Eruption',
    muiIcon: VolcanoIcon,
    backgroundColor: '#e8590c', // vivid orange-red, lava-like
    color: '#ffffff',
  },
  wildfire: {
    name: 'Wildfire',
    muiIcon: LocalFireDepartmentIcon,
    backgroundColor: '#f03e3e', // saturated bright red
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
  earthquake: PublicIcon,
  eruption: VolcanoIcon,
  wildfire: LocalFireDepartmentIcon,
}
