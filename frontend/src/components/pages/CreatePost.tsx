import {
  TextField,
  Button,
  Stack,
  Container,
  MenuItem,
  Typography,
  Box,
} from '@mui/material'
import { Marker, useMapEvents } from 'react-leaflet'
import postsService from '@/services/posts'
import { useNavigate } from 'react-router'
import useField from '@/hooks/useField'
import { useState } from 'react'
import Title from '@/components/ui/Title'
import type { Location } from '@/types/hazards'
import { HazardType } from '@/types/hazards'
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

function HazardMap({
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
      <Map>
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

export default function CreatePost() {
  const title = useField('')
  const description = useField('')
  const hazardType = useField<HazardType>('earthquake')
  const [location, setLocation] = useState<Location | null>(null)

  const navigate = useNavigate()

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!location) {
      return
    }

    await postsService.createPost({
      title: title.value,
      description: description.value,
      hazardType: hazardType.value,
      location: location,
    })
    navigate('/')
  }

  return (
    <Container
      maxWidth='sm'
      sx={{
        mt: 4,
        backgroundColor: 'background.paper',
        paddingBlock: 4,
      }}
    >
      <Stack component='form' onSubmit={handleSubmit} spacing={2}>
        <Title>Report a hazard</Title>
        <TextField label='Title' size='small' {...title} required />
        <TextField
          size='small'
          label='Description'
          {...description}
          required
          multiline
          rows={3}
        />
        <TextField
          size='small'
          select
          label='Category'
          {...hazardType}
          fullWidth
        >
          {Object.values(HazardType).map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>
        <HazardMap location={location} setLocation={setLocation} />
        <Button
          disabled={!location || !title.value || !description.value}
          type='submit'
          variant='contained'
          fullWidth
        >
          Report
        </Button>
      </Stack>
    </Container>
  )
}
