import MapButton from '@/features/map/components/MapButton'
import { useMap } from 'react-leaflet'
import type { MapElementPosition } from '@/features/map/types'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { Box } from '@mui/material'
import { getPositionProps } from '@/features/map/constants'
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap'
import type { ElementSize } from '@/shared/types/form'

interface ZoomControlButtonsProps {
  position?: MapElementPosition
  size?: ElementSize
}

export default function ZoomControlButtons({
  position = 'topleft',
  size = 'medium',
}: ZoomControlButtonsProps) {
  const map = useMap()

  function handleZoomIn() {
    map.setZoom(map.getZoom() + 1)
  }

  function handleZoomOut() {
    map.setZoom(map.getZoom() - 1)
  }

  function handleZoomOutWorld() {
    map.setView([0, 0], 2)
  }

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
      style={getPositionProps(position)}
    >
      <MapButton size={size} icon={<AddIcon />} onClick={handleZoomIn} />
      <MapButton size={size} icon={<RemoveIcon />} onClick={handleZoomOut} />
      <MapButton
        size={size}
        icon={<ZoomOutMapIcon />}
        onClick={handleZoomOutWorld}
      />
    </Box>
  )
}
