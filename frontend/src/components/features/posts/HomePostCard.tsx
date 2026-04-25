import type { Post } from '@/types/posts'
import { Card, Divider } from '@mui/material'
import HomePostCardActions from '@/components/features/posts/HomePostCardActions'
import HomePostCardBody from '@/components/features/posts/HomePostCardBody'
import HomePostCardTitle from '@/components/features/posts/HomePostCardTitle'

interface PostProps {
  post: Post
}

export default function HomePostCard({ post }: PostProps) {
  return (
    <Card
      variant='outlined'
      sx={{
        borderColor: 'divider',
        borderRadius: 4,
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <HomePostCardTitle user={post.user} post={post} />{' '}
      <Divider sx={{ borderColor: 'divider' }} />
      <HomePostCardBody post={post} />
      <HomePostCardActions post={post} />
    </Card>
  )
}
