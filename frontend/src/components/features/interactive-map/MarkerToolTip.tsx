import { Box, Stack, Typography, Chip, Divider } from '@mui/material'
import { Tooltip } from 'react-leaflet'
import type { Post } from '@/types/posts'
import { hazardMeta } from '@/constants/hazards'
import { formatDate } from '@/utils/typography'

export default function MarkerTooltip({ post }: { post: Post }) {
  const Icon = hazardMeta[post.hazardType].muiIcon

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
            sx={{ fontWeight: 'fontWeightBold' }}
            noWrap
          >
            {post.title}
          </Typography>
          <Chip
            icon={<Icon fontSize='small' />}
            label={post.hazardType}
            size='small'
            color='primary'
            sx={{ fontSize: 10, flexShrink: 0 }}
          />
        </Box>

        <Typography variant='caption' color='text.disabled'>
          {formatDate(post.createdAt)}
        </Typography>

        <Divider />

        <Typography variant='caption' color='text.secondary'>
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
            {post.userName}
          </Typography>
        </Box>
      </Stack>
    </Tooltip>
  )
}
