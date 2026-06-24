import { Typography, Box } from '@mui/material'
import { useEffect, useRef, useMemo, useState } from 'react'
import Map from '@/features/map/components/Map'
import { formatCoordinates } from '@/shared/utils/geometry'
import type { HazardPosition } from '@/features/layers/types'
import { useMapEvents } from 'react-leaflet'

function GetCurrentPosition() {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })
  return <></>
}

interface PostMapProps {
  hazardPosition: HazardPosition | null
  flyToLocation: boolean
  setHazardPosition: React.Dispatch<React.SetStateAction<HazardPosition | null>>
}

export default function PostMap({
  hazardPosition,
  flyToLocation,
  setHazardPosition,
}: PostMapProps) {
  const markerRef = useRef(null)

  useEffect(() => {
    if (currPosition) {
      setHazardPosition(currPosition)
    }
  }, [setHazardPosition, currPosition])

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setHazardPosition(marker.getLatLng())
        }
      },
    }),
    [],
  )

  const hazardLocationExists =
    hazardPosition?.longitude && hazardPosition.latitude
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
      <Map height='240px'>
        <GetCurrentPosition />
        {hazardLocationExists && (
          <>
            <MapMarker
              eventHandlers={eventHandlers}
              draggable={true}
              lat={hazardPosition?.latitude}
              lon={hazardPosition?.longitude}
            />
          </>
        )}
      </Map>
      <Typography variant='caption' color='text.secondary'>
        {hazardLocationExists
          ? formatCoordinates(hazardPosition.longitude, hazardPosition.latitude)
          : 'You have not selected any location yet'}
      </Typography>
    </Box>
  )
}
