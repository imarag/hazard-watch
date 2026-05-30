import Map from '@/features/map/components/Map'
import MapMarker from '@/features/map/components/MapMarker'
import MarkerClusterGroup from 'react-leaflet-cluster'
import type { Post } from '@/features/posts/types'
import { hazardMeta } from '@/features/hazards/constants'
import { postMeta } from '@/features/posts/constants'
import { useMapEvents } from 'react-leaflet'
import type { FilterParamsDefaults } from '@/shared/types/config'
import type { HazardType } from '@/features/hazards/types'
import { useRef, useCallback } from 'react'
import { Box } from '@mui/material'
import MapSpinner from './MapSpinner'

function MapBoundsListener({
  onBoundsChange,
}: {
  onBoundsChange: (bounds: L.LatLngBounds) => void
}) {
  useMapEvents({
    moveend: (e) => onBoundsChange(e.target.getBounds()),
    zoomend: (e) => onBoundsChange(e.target.getBounds()),
  })
  return null
}

interface MainMapProps {
  hazardsData: {
    hazard: HazardType
    data: any
  }[]
  posts: Post[]
  setFilterParamsDefaults: React.Dispatch<
    React.SetStateAction<FilterParamsDefaults>
  >
  loading: boolean
}

export default function MainMap({
  hazardsData,
  posts,
  setFilterParamsDefaults,
  loading,
}: MainMapProps) {
  const boundsTimer = useRef<ReturnType<typeof setTimeout>>(null)

  const handleBoundsChange = useCallback(
    (bounds: L.LatLngBounds) => {
      if (boundsTimer.current) {
        clearTimeout(boundsTimer.current)
      }

      boundsTimer.current = setTimeout(() => {
        setFilterParamsDefaults((prev) => ({
          ...prev,
          global: {
            ...prev.global,
            // round in order not to cache every decimal of coords
            minLat: Math.max(Math.round(bounds.getSouth()), -90),
            maxLat: Math.min(Math.round(bounds.getNorth()), 90),
            minLng: Math.max(Math.round(bounds.getWest()), -180),
            maxLng: Math.min(Math.round(bounds.getEast()), 180),
          },
        }))
      }, 500)
    },
    [setFilterParamsDefaults],
  )
  return (
    <Map
      height='100%'
      zoom={3}
      zoomControl={false}
      attributionControl={false}
      buttonIconSize='large'
    >
      {loading && <MapSpinner />}
      <MapBoundsListener onBoundsChange={handleBoundsChange} />
      {hazardsData.map(({ hazard, data }) => (
        <MarkerClusterGroup key={hazard} chunkedLoading>
          {data.features.map((feature) => {
            const [lon, lat] = feature.geometry.coordinates
            return (
              <MapMarker
                key={feature.properties?.id}
                lat={lat}
                lon={lon}
                color={hazardMeta[hazard]['backgroundColor']}
                icon={hazardMeta[hazard]['muiIcon']}
                tooltip={feature.properties}
              />
            )
          })}
        </MarkerClusterGroup>
      ))}
      <MarkerClusterGroup>
        {posts.map((post) => (
          <MapMarker
            key={post.id}
            lat={post.latitude}
            lon={post.longitude}
            color={postMeta['backgroundColor']}
            icon={postMeta['muiIcon']}
            tooltip={post}
          />
        ))}
      </MarkerClusterGroup>
    </Map>
  )
}
