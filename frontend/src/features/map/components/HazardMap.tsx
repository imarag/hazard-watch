import { Typography, Box } from '@mui/material'
import { useMapEvents } from 'react-leaflet'
import Map from '@/components/features/map/Map'
import { formatCoordinates } from '@/utils/geometry'
import MapMarker from '@/components/features/map/MapMarker'
import FlyToLocation from '@/components/features/map/FlyToLocation'

function LocationPicker({
  onLocationSelect,
}: {
  onLocationSelect: (loc) => void
}) {
  useMapEvents({
    click(e) {
      onLocationSelect({ latitude: e.latlng.lat, longitude: e.latlng.lng })
    },
  })
  return null
}

interface HazardMapProps {
  longitude: number | null | undefined
  latitude: number | null | undefined
  onLocationSelect: (longitude: number, latitude: number) => void
  isLoading: boolean
  flyToLocation: boolean
}

export default function HazardMap({
  longitude,
  latitude,
  onLocationSelect,
  isLoading,
  flyToLocation,
}: HazardMapProps) {
  const hazardLocationExists = longitude && latitude
  return (
    <Box>
      <Typography variant='caption' color='text.secondary'>
        Click on the map to set the location
      </Typography>
      <Map height='240px'>
        <LocationPicker
          onLocationSelect={(loc) => {
            if (isLoading) {
              return
            }
            onLocationSelect(loc.longitude, loc.latitude)
          }}
        />
        {hazardLocationExists && (
          <>
            <MapMarker lat={latitude} lon={longitude} />
            {flyToLocation && <FlyToLocation lat={latitude} lon={longitude} />}
          </>
        )}
      </Map>
      <Typography variant='caption' color='text.secondary'>
        {hazardLocationExists
          ? formatCoordinates(longitude, latitude)
          : 'You have not selected any location yet'}
      </Typography>
    </Box>
  )
}
