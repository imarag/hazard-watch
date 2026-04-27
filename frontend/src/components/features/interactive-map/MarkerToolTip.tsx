import { Box, Stack, Typography, Divider } from '@mui/material'
import { Tooltip } from 'react-leaflet'
import type { Post } from '@/types/posts'
import { formatDate } from '@/utils/typography'
import HazardChip from '@/components/features/posts/HazardChip'

export default function MarkerTooltip({ post }: { post: Post }) {
  return (
    <Tooltip direction='bottom' offset={[0, 20]} opacity={1}>
      <Stack spacing={0.5} sx={{ padding: 1.5, minWidth: 300, maxWidth: 360 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
          }}
        >
          <Typography
            variant='body2'
            sx={{ fontWeight: 'fontWeightBold', textWrap: 'wrap' }}
            noWrap
          >
            {post.title}
          </Typography>
          <HazardChip hazard={post.hazardType} />
        </Box>

        <Typography variant='caption' color='text.disabled'>
          {formatDate(post.createdAt)}
        </Typography>

        <Divider />

        <Typography
          variant='caption'
          color='text.secondary'
          sx={{ textWrap: 'wrap' }}
        >
          {post.description}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography variant='caption' sx={{ fontStyle: 'italic' }}>
            {post.user.name}
          </Typography>
        </Box>
      </Stack>
    </Tooltip>
  )
}
