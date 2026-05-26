import { Marker } from 'react-leaflet'
import Map from '@/components/features/map/Map'
import MarkerTooltip from '@/components/features/interactive-map/MarkerToolTip'
import MapLoading from '@/components/features/map/MapLoading'
import MapFilterPanel from '@/components/features/map/MapFilterPanel'
import MarkerClusterGroup from 'react-leaflet-cluster'
import OpenFilterPanelButton from '@/components/features/interactive-map/OpenFilterPanelButton'

export default function MainMap() {
  return (
    <Map
      height='100%'
      zoom={3}
      zoomControl={false}
      attributionControl={false}
      buttonIconSize='large'
    >
      <></>
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
      {/* <MarkerClusterGroup>
        {filteredPosts.map((post) => (
          <Marker key={post.id} position={[post.latitude, post.longitude]}>
            <MarkerTooltip post={post} />
          </Marker>
        ))}
      </MarkerClusterGroup> */}
    </Map>
  )
}
