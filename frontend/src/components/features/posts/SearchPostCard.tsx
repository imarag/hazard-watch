import type { Post } from '@/types/posts'
import { Card, CardActionArea, Box, Typography } from '@mui/material'
import RoomIcon from '@mui/icons-material/Room'
import { Link as RouterLink } from 'react-router'
import { formatDate } from '@/utils/typography'
import { formatCoordinates } from '@/utils/geometry'
import HazardChip from '@/components/features/posts/HazardChip'

interface SearchPostCardProps {
  post: Post
}

export default function SearchPostCard({ post }: SearchPostCardProps) {
  return (
    <Card
      variant='outlined'
      sx={{ borderColor: 'divider', borderRadius: 2, minHeight: 'min-content' }}
    >
      <CardActionArea component={RouterLink} to={`/posts/${post.id}`}>
        <Box
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column-reverse', sm: 'row' },
              alignItems: { xs: 'start', sm: 'center' },
              gap: 1,
              justifyContent: 'space-between',
            }}
          >
            <Typography
              variant='subtitle1'
              sx={{
                fontWeight: 600,
              }}
            >
              {post.title}
            </Typography>
            <HazardChip hazard={post.hazardType} />
          </Box>

          <Typography
            variant='body2'
            sx={{
              color: 'text.secondary',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {post.description}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              flexWrap: 'wrap',
              color: 'text.disabled',
              mt: 0.5,
            }}
          >
            <Typography variant='caption'>{post.user.name}</Typography>
            <Typography variant='caption'>·</Typography>
            <Typography variant='caption'>
              {formatDate(post.createdAt)}
            </Typography>
            <Typography variant='caption'>·</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <RoomIcon sx={{ fontSize: 13 }} />
              <Typography variant='caption' sx={{ fontFamily: 'monospace' }}>
                {formatCoordinates(
                  post.location.geometry.coordinates[0],
                  post.location.geometry.coordinates[1],
                )}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  )
}
