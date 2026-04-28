import { Box } from '@mui/material'
import Map from '@/components/features/map/Map'
import MapMarker from '@/components/features/map/MapMarker'
import FlyToLocation from '@/components/features/map/FlyToLocation'
import type { Post } from '@/types/posts'
import PostCardTitle from '@/components/features/view-post/PostCardTitle'

interface ViewMapProps {
  post: Post
}

export default function ViewMap({ post }: ViewMapProps) {
  const lat = post.location.geometry.coordinates[1]
  const lon = post.location.geometry.coordinates[0]
  return (
    <Box
      sx={{
        borderRadius: 4,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,

          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: { xs: 'none', lg: 'inline' } }}>
          <PostCardTitle label={'Location'} />
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Map height='100%'>
          <FlyToLocation lat={lat} lon={lon} />
          <MapMarker lat={lat} lon={lon} />
        </Map>
      </Box>
    </Box>
  )
}
