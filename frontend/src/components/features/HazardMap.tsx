import { Typography, Box } from '@mui/material'
import { Marker, useMapEvents } from 'react-leaflet'
import type { Location } from '@/types/hazards'
import type { Feature, Point, Coords, Properties } from '@/types/hazards'
import Map from '../features/Map'
import { formatCoordinates } from '@/utils/geometry'

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
}: {
  location: Location | null
  setLocation: React.Dispatch<React.SetStateAction<Location | null>>
}) {
  return (
    <Box>
      <Typography variant='caption' color='text.secondary'>
        Click on the map to set the location
      </Typography>
      <Box>
        <Map height='240px'>
          <LocationPicker
            onLocationSelect={(loc) => {
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
            <Marker
              position={[
                location.geometry.coordinates[1],
                location.geometry.coordinates[0],
              ]}
            />
          )}
        </Map>
      </Box>
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
