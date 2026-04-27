import MapButton from '@/components/features/map/MapButton'
import { useMap } from 'react-leaflet'
import type { MapPosition } from '@/types/map'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { Box } from '@mui/material'
import { getPositionProps } from '@/constants/map'
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap'

interface ZoomControlButtonsProps {
  position?: MapPosition
  size?: 'small' | 'medium' | 'large'
}

export default function ZoomControlButtons({
  position = 'topleft',
  size = 'medium',
}: ZoomControlButtonsProps) {
  const map = useMap()

  function handleZoomIn() {
    map.zoomIn()
  }

  function handleZoomOut() {
    map.zoomOut()
  }

  function handleZoomOutWorld() {
    map.setView([0, 0], 2)
  }

  const positionProps = getPositionProps(position)
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column' }}
      className={positionProps.className}
      style={positionProps.style}
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
