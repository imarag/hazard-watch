import MyLocationIcon from '@mui/icons-material/MyLocation'
import MapButton from '@/features/map/components/MapButton'
import type { MapElementPosition } from '@/features/map/types'
import { getPositionProps } from '@/features/map/constants'
import { Box } from '@mui/material'
import type { ElementSize } from '@/shared/types/form'
import { useMap } from 'react-leaflet'

interface GetCurrentPositionProps {
  position: MapElementPosition
  size?: ElementSize
}

export default function GetCurrentPositionButton({
  position,
  size,
}: GetCurrentPositionProps) {
  const map = useMap()

  function getCurrentLocation() {
    map.locate()
  }

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column' }}
      style={getPositionProps(position)}
    >
      <MapButton
        size={size}
        onClick={getCurrentLocation}
        icon={<MyLocationIcon />}
      />
    </Box>
  )
}
