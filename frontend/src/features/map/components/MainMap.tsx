import Map from '@/features/map/components/Map'
import MapMarker from '@/features/map/components/MapMarker'
import MarkerClusterGroup from 'react-leaflet-cluster'
import type { Post } from '@/features/posts/types'
import { hazardMeta } from '@/features/hazards/constants'
import { postMeta } from '@/features/posts/constants'

interface MainMapProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hazardsData: any[]
  posts: Post[]
}

export default function MainMap({ hazardsData, posts }: MainMapProps) {
  return (
    <Map
      height='100%'
      zoom={3}
      zoomControl={false}
      attributionControl={false}
      buttonIconSize='large'
    >
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
      {/* <MapLoading text='Loading posts...' open={isLoading} />
      {!openFilterPanel && (
        <OpenFilterPanelButton
          position='centerright'
          onClick={() => setOpenFilterPanel(!openFilterPanel)}
        />
      )} */}

      {/* {openFilterPanel && (
        <MapFilterPanel
          posts={filteredPosts}
          hazardTypeSelected={hazardTypeSelected}
          setHazardTypeSelected={setHazardTypeSelected}
          postDateSelected={postDateSelected}
          setPostDateSelected={setPostDateSelected}
          onClearFilters={handleClearFilters}
          onClosePanel={() => setOpenFilterPanel(false)}
        />
      )} */}
    </Map>
  )
}
