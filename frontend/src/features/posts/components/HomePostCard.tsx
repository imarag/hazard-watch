import type { Post } from '@/types/posts'
import { Card, Divider, Box } from '@mui/material'
import HomePostCardActions from '@/features/posts/components/HomePostCardActions'
import HomePostCardBody from '@/features/posts/components/HomePostCardBody'
import HomePostCardTitle from '@/features/posts/components/HomePostCardTitle'

interface PostProps {
  post: Post
}

export default function HomePostCard({ post }: PostProps) {
  return (
    <Box sx={{ height: 'min-content' }}>
      <Card
        variant='outlined'
        sx={{
          borderColor: 'divider',
          borderRadius: 4,
          padding: { xs: 3, sm: 4 },
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <HomePostCardTitle user={post.author} post={post} />{' '}
        <Divider sx={{ borderColor: 'divider' }} />
        <HomePostCardBody post={post} />
        <HomePostCardActions post={post} />
      </Card>
    </Box>
  )
}
