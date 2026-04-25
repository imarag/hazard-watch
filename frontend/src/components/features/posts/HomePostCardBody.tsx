import type { Post } from '@/types/posts'
import { Stack, Typography } from '@mui/material'
import RoomIcon from '@mui/icons-material/Room'
import { formatCoordinates } from '@/utils/geometry'

interface HomePostCardBodyProps {
  post: Post
}

export default function HomePostCardBody({ post }: HomePostCardBodyProps) {
  return (
    <Stack spacing={1}>
      <Typography
        variant='body2'
        gutterBottom
        sx={{
          fontWeight: 'fontWeightBold',
          color: 'text.primary',
          textTransform: 'capitalize',
        }}
      >
        {post.title}
      </Typography>
      <Typography
        sx={{
          color: 'text.secondary',
          fontWeight: 'fontWeightLight',
        }}
      >
        {post.description}
      </Typography>
      <Typography
        variant='caption'
        sx={{
          color: 'text.disabled',
          fontFamily: 'monospace',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <RoomIcon style={{ fontSize: 14 }} />
        {formatCoordinates(
          post.location.geometry.coordinates[0],
          post.location.geometry.coordinates[1],
        )}
      </Typography>
    </Stack>
  )
}
