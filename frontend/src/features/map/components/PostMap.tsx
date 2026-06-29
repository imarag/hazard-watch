import { Typography, Box } from '@mui/material'
import Map from '@/features/map/components/Map'
import { formatCoordinates } from '@/shared/utils/geometry'
import type { HazardPosition } from '@/features/layers/types'
import { layerMeta } from '@/features/layers/constants'

interface PostMapProps {
  hazardPosition: HazardPosition | null
  setHazardPosition: React.Dispatch<React.SetStateAction<HazardPosition | null>>
}

export default function PostMap({
  hazardPosition,
  setHazardPosition,
}: PostMapProps) {
  
  function handleLocationFound(coords: { lat: number; lng: number }) {
    setHazardPosition({ longitude: coords.lng, latitude: coords.lat })
  }

  function handleMapClick(coords: { lat: number; lng: number }) {
    setHazardPosition({ longitude: coords.lng, latitude: coords.lat })
  }

  const hazardLocationExists =
    hazardPosition?.longitude && hazardPosition.latitude

  const mapMarkers = []

  if (hazardLocationExists) {
    const hazardMarker = {
      id: 'sdfs',
      coords: {
        lat: hazardPosition?.latitude,
        lng: hazardPosition.longitude,
      },
      draggable: false,
      color: layerMeta.post.backgroundColor,
      icon: layerMeta.post.muiIcon,
    }
    const group = [hazardMarker]
    mapMarkers.push(group)
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <Typography
          component='p'
          variant='body2'
          sx={{ margin: 0, fontSize: '', color: 'text.disabled' }}
        >
          Set the hazard location
        </Typography>
      </Box>
      <Typography variant='caption' color='text.secondary'>
        Click on the map to set the location
      </Typography>
      <Map
        height='240px'
        onLocationFound={handleLocationFound}
        onMapClick={handleMapClick}
        markers={mapMarkers}
        locateOnMount={true}
      />
      <Typography variant='caption' color='text.secondary'>
        {hazardLocationExists
          ? formatCoordinates(hazardPosition.longitude, hazardPosition.latitude)
          : 'You have not selected any location yet'}
      </Typography>
    </Box>
  )
}
