import { Typography, Box } from '@mui/material'
import { useMapEvents } from 'react-leaflet'
import type { Location } from '@/types/hazards'
import type { Feature, Point, Coords, Properties } from '@/types/hazards'
import Map from '@/components/features/map/Map'
import { formatCoordinates } from '@/utils/geometry'
import MapMarker from '@/components/features/map/MapMarker'
import FlyToLocation from '@/components/features/map/FlyToLocation'

function LocationPicker({
  onLocationSelect,
}: {
  onLocationSelect: (loc: Coords) => void
}) {
  useMapEvents({
    click(e) {
      onLocationSelect({ latitude: e.latlng.lat, longitude: e.latlng.lng })
    },
  })
  return null
}

export default function HazardMap({
  location,
  setLocation,
  isLoading,
}: {
  location: Location | null
  setLocation: React.Dispatch<React.SetStateAction<Location | null>>
  isLoading: boolean
}) {
  return (
    <Box>
      <Typography variant='caption' color='text.secondary'>
        Click on the map to set the location
      </Typography>
      <Map height='240px'>
        <LocationPicker
          onLocationSelect={(loc) => {
            if (isLoading) return
            const point: Point = {
              type: 'Point',
              coordinates: [loc.longitude, loc.latitude],
            }
            const feature: Feature<Point, Properties> = {
              type: 'Feature',
              geometry: point,
              properties: {},
            }
            setLocation(feature)
          }}
        />
        {location && (
          <>
            <MapMarker
              lat={location.geometry.coordinates[1]}
              lon={location.geometry.coordinates[0]}
            />
            <FlyToLocation
              lat={location.geometry.coordinates[1]}
              lon={location.geometry.coordinates[0]}
            />
          </>
        )}
      </Map>
      <Typography variant='caption' color='text.secondary'>
        {location
          ? formatCoordinates(
              location.geometry.coordinates[0],
              location.geometry.coordinates[1],
            )
          : 'You have not selected any location yet'}
      </Typography>
    </Box>
  )
}
