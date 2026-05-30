import Map from '@/features/map/components/Map'
import MapMarker from '@/features/map/components/MapMarker'
import MarkerClusterGroup from 'react-leaflet-cluster'
import type { Post } from '@/features/posts/types'
import { hazardMeta } from '@/features/hazards/constants'
import { postMeta } from '@/features/posts/constants'
import { useMapEvents } from 'react-leaflet'

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
  hazardsData: any[]
  posts: Post[]
  setHazardParams: any
}

export default function MainMap({
  hazardsData,
  posts,
  setHazardParams,
}: MainMapProps) {
  function handleBoundsChange(bounds: L.LatLngBounds) {
    setHazardParams((prev) => ({
      ...prev,
      global: {
        ...prev.global,
        bounds: {
          minLat: Math.max(bounds.getSouth(), -90),
          maxLat: Math.min(bounds.getNorth(), 90),
          minLng: Math.max(bounds.getWest(), -180),
          maxLng: Math.min(bounds.getEast(), 180),
        },
      },
    }))
  }
  return (
    <Map
      height='100%'
      zoom={3}
      zoomControl={false}
      attributionControl={false}
      buttonIconSize='large'
    >
      <MapBoundsListener onBoundsChange={handleBoundsChange} />
      {hazardsData.map(({ hazard, data }) => (
        <MarkerClusterGroup key={hazard}>
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
