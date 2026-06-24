import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import VolcanoIcon from '@mui/icons-material/Volcano'
import WaterIcon from '@mui/icons-material/Water'
import ForumIcon from '@mui/icons-material/Forum'
import LandslideIcon from '@mui/icons-material/Landslide'
import type { LayerMeta } from '@/features/layers/types'

export const layerMeta: LayerMeta = {
  earthquake: {
    name: 'Earthquake',
    muiIcon: LandslideIcon,
    icon: '🌍',
    backgroundColor: '#c08968',
    color: '#ffffff',
  },
  eruption: {
    name: 'Eruption',
    muiIcon: VolcanoIcon,
    icon: '🌋',
    backgroundColor: '#e8590c',
    color: '#ffffff',
  },
  wildfire: {
    name: 'Wildfire',
    muiIcon: LocalFireDepartmentIcon,
    icon: '🔥',
    backgroundColor: '#f03e3e',
    color: '#ffffff',
  },
  tsunami: {
    name: 'Tsunami',
    muiIcon: WaterIcon,
    icon: '🌊',
    backgroundColor: '#1c7ed6',
    color: '#ffffff',
  },
  post: {
    name: 'Posts',
    muiIcon: ForumIcon,
    icon: '💬',
    backgroundColor: '#845ef7',
    color: '#ffffff',
  },
}