import { Box } from '@mui/material'
import { Marker } from 'react-leaflet'
import Map from '@/components/features/map/Map'
import { useState } from 'react'
import postsService from '@/services/posts'
import MarkerTooltip from '@/components/features/interactive-map/MarkerToolTip'
import { DateFilter, HazardType, type DateFilterValue } from '@/types/hazards'
import { filterDate } from '@/utils/date'
import { useQuery } from '@tanstack/react-query'
import { useNotification } from '@/contexts/NotificationContext'
import { getErrorMessage } from '@/utils/auth'
import MapLoading from '@/components/features/map/MapLoading'
import MapFilterPanel from '@/components/features/map/MapFilterPanel'
import MarkerClusterGroup from 'react-leaflet-cluster'
import OpenFilterPanelButton from '@/components/features/interactive-map/OpenFilterPanelButton'

export default function InteractiveMap() {
  const { createNotification, showNotification } = useNotification()

  const allHazards: HazardType[] = Object.values(HazardType)
  const [openFilterPanel, setOpenFilterPanel] = useState(false)
  const [hazardTypeSelected, setHazardTypeSelected] = useState<HazardType[]>(
    () => allHazards,
  )
  const [postDateSelected, setPostDateSelected] =
    useState<DateFilterValue>('all')
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      try {
        return await postsService.getAllPosts()
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(error)
        showNotification(
          createNotification(
            `Cannot fetch the posts: ${errorMessage}`,
            'error',
          ),
        )
        throw error
      }
    },
  })

  function handleClearFilters() {
    setHazardTypeSelected(allHazards)
    setPostDateSelected(DateFilter[DateFilter.length - 1].value)
  }

  const filteredPosts = posts.filter(
    (post) =>
      hazardTypeSelected.includes(post.hazardType) &&
      filterDate(post.createdAt, postDateSelected),
  )

  return (
    <Box sx={{ height: '100%', position: 'relative' }}>
      <Map
        height='100%'
        zoom={3}
        zoomControl={false}
        attributionControl={false}
        buttonIconSize='large'
      >
        <MapLoading text='Loading posts...' open={isLoading} />
        {!openFilterPanel && (
          <OpenFilterPanelButton
            position='centerright'
            onClick={() => setOpenFilterPanel(!openFilterPanel)}
          />
        )}

        {openFilterPanel && (
          <MapFilterPanel
            posts={filteredPosts}
            hazardTypeSelected={hazardTypeSelected}
            setHazardTypeSelected={setHazardTypeSelected}
            postDateSelected={postDateSelected}
            setPostDateSelected={setPostDateSelected}
            onClearFilters={handleClearFilters}
            onClosePanel={() => setOpenFilterPanel(false)}
          />
        )}
        <MarkerClusterGroup>
          {filteredPosts.map((post) => (
            <Marker
              key={post.id}
              position={[
                post.location.geometry.coordinates[1],
                post.location.geometry.coordinates[0],
              ]}
            >
              <MarkerTooltip post={post} />
            </Marker>
          ))}
        </MarkerClusterGroup>
      </Map>
    </Box>
  )
}
