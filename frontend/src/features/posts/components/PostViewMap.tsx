import { Box } from '@mui/material'
import Map from '@/features/map/components/Map'
import MapMarker from '@/features/map/components/MapMarker'
import FlyToLocation from '@/features/map/components/FlyToLocation'
import type { Post } from '@/features/posts/types'
import PostCardTitle from '@/features/posts/components/PostCardTitle'
import { createPostTooltip } from '../utils'

interface PostViewMapProps {
  post: Post
}

export default function PostViewMap({ post }: PostViewMapProps) {
  const lat = post.latitude
  const lon = post.longitude

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
          <MapMarker lat={lat} lon={lon} tooltip={createPostTooltip(post)} />
        </Map>
      </Box>
    </Box>
  )
}
