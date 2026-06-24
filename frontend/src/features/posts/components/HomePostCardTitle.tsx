import type { Post } from '@/features/posts/types'
import { Stack, Avatar, Typography, Box } from '@mui/material'
import { formatDate } from '@/shared/utils/typography'
import type { User } from '@/features/users/types'
import HazardChip from '@/features/layers/components/HazardChip'

interface HomePostCardTitleProps {
  user: User | null
  post: Post
}

export default function HomePostCardTitle({
  user,
  post,
}: HomePostCardTitleProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Avatar
          sx={{
            bgcolor: 'primary',
            color: 'secondary.contrastText',
            width: 40,
            height: 40,
            fontSize: 'h6',
            display: { xs: 'none', sm: 'flex' },
          }}
        >
          {user ? user.name[0].toUpperCase() : ''}
        </Avatar>
        <Stack direction='column'>
          <Typography
            variant='body1'
            sx={{
              color: 'text.primary',
            }}
          >
            {post.author.name}
          </Typography>
          <Typography variant='caption' sx={{ color: 'text.disabled' }}>
            {formatDate(post.createdAt)}
          </Typography>
        </Stack>
      </Box>
      <Box>
        <HazardChip hazard={post.hazardType} />
      </Box>
    </Box>
  )
}
