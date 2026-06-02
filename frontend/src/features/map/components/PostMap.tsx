import { ToggleButtonGroup, ToggleButton, Typography, Box } from '@mui/material'
import { useMapEvents } from 'react-leaflet'
import Map from '@/features/map/components/Map'
import { formatCoordinates } from '@/shared/utils/geometry'
import MapMarker from '@/features/map/components/MapMarker'
import FlyToLocation from '@/features/map/components/FlyToLocation'
import { useState } from 'react'
import type { HazardPositionMode, HazardPosition } from '@/features/hazards/types'
import useCurrentPosition from '@/hooks/useCurrentPosition'

function LocationPicker({
  onLocationSelect,
}: {
  onLocationSelect: (loc: { latitude: number; longitude: number }) => void
}) {
  useMapEvents({
    click(e) {
      onLocationSelect({ latitude: e.latlng.lat, longitude: e.latlng.lng })
    },
  })
  return null
}

interface PostMapProps {
  longitude: number | null | undefined
  latitude: number | null | undefined
  onLocationSelect: (longitude: number, latitude: number) => void
  isLoading: boolean
  flyToLocation: boolean
  setHazardPosition: React.Dispatch<React.SetStateAction<HazardPosition | null>>
}

export default function PostMap({
  longitude,
  latitude,
  onLocationSelect,
  isLoading,
  flyToLocation,
  setHazardPosition,
}: PostMapProps) {
  const currPosition = useCurrentPosition()
  const [selectLocationMode, setSelectLocationMode] =
    useState<HazardPositionMode>('current')

  function handleChangeSelectLocationMode(
    _event: React.MouseEvent<HTMLElement, MouseEvent>,
    newMode: HazardPositionMode,
  ) {
    if (!newMode) {
      setHazardPosition(null)
    }

    if (newMode === 'current') {
      setHazardPosition(currPosition)
    }

    setSelectLocationMode(newMode)
  }

  const hazardLocationExists = longitude && latitude
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

        <ToggleButtonGroup
          color='primary'
          value={selectLocationMode}
          exclusive
          onChange={handleChangeSelectLocationMode}
          aria-label='Location selection mode'
          size='small'
        >
          <ToggleButton value='current'>Use current location</ToggleButton>

          <ToggleButton value='map'>Select on map</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Typography variant='caption' color='text.secondary'>
        Click on the map to set the location
      </Typography>
      {selectLocationMode === 'map' && (
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
              {flyToLocation && (
                <FlyToLocation lat={latitude} lon={longitude} />
              )}
            </>
          )}
        </Map>
      )}
      <Typography variant='caption' color='text.secondary'>
        {hazardLocationExists
          ? formatCoordinates(longitude, latitude)
          : 'You have not selected any location yet'}
      </Typography>
    </Box>
  )
}
