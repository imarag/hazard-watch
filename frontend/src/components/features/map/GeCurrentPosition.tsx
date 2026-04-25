import MyLocationIcon from '@mui/icons-material/MyLocation'
import { useMapEvents } from 'react-leaflet'
import { useState } from 'react'
import MapButton from '@/components/features/map/MapButton'
import type { MapPosition } from '@/types/map'
import type { LatLngExpression } from 'leaflet'
import { getPositionProps } from '@/constants/map'
import { Box } from '@mui/material'

interface GetCurrentPositionProps {
  position: MapPosition
}

export default function GetCurrentPosition({
  position,
}: GetCurrentPositionProps) {
  const [location, setLocation] = useState<LatLngExpression | null>(null)
  const map = useMapEvents({
    locationfound(e) {
      setLocation(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  function getCurrentLocation() {
    map.locate()
  }
  const positionProps = getPositionProps(position)
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column' }}
      className={positionProps.className}
      style={positionProps.style}
    >
      <MapButton onClick={getCurrentLocation} icon={<MyLocationIcon />} />
    </Box>
  )
}
