import type { Post } from '@/types/posts'
import { Stack, Chip, Avatar, Typography, Box } from '@mui/material'
import { hazardIconMapping } from '@/icons'
import { formatDate } from '@/utils/typography'
import type { UserPublic } from '@/types/users'

interface HomePostCardTitleProps {
  user: UserPublic | null
  post: Post
}

export default function HomePostCardTitle({
  user,
  post,
}: HomePostCardTitleProps) {
  const Icon = hazardIconMapping[post.hazardType]
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
            {post.userName}
          </Typography>
          <Typography variant='caption' sx={{ color: 'text.disabled' }}>
            {formatDate(post.createdAt)}
          </Typography>
        </Stack>
      </Box>
      <Box>
        <Chip
          label={post.hazardType}
          icon={<Icon style={{ fontSize: 14 }} />}
          color='primary'
          size='small'
        />
      </Box>
    </Box>
  )
}
