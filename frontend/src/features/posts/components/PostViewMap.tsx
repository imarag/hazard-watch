import { Box } from '@mui/material'
import Map from '@/features/map/components/Map'
import type { Post } from '@/features/posts/types'
import PostCardTitle from '@/features/posts/components/PostCardTitle'
import type { FlyTarget, MarkerType } from '@/features/map/types'
import { createPostTooltip } from '../utils'

interface PostViewMapProps {
  post: Post
}

export default function PostViewMap({ post }: PostViewMapProps) {
  const postMarker: MarkerType = {
    id: post.id,
    coords: { lat: post.latitude, lon: post.longitude },
    tooltip: createPostTooltip(post),
  }

  const flyTarget: FlyTarget = {
    coords: {
      lat: post.latitude,
      lon: post.longitude,
    },
    zoom: 13,
  }

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
        <Map markers={[[postMarker]]} height='100%' flyTarget={flyTarget} />
      </Box>
    </Box>
  )
}
