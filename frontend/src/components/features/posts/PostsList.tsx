import { Stack } from '@mui/material'
import EmptyPostsMessage from './EmptyPostsMessage'
import type { Post } from '@/types/posts'
import HomePostCard from '@/components/features/posts/HomePostCard'

interface PostsListProps {
  posts: Post[]
}

export default function PostsList({ posts }: PostsListProps) {
  return (
    <Stack direction='column' spacing={2} sx={{ height: '100%' }}>
      {posts.length === 0 ? (
        <EmptyPostsMessage />
      ) : (
        posts.map((post) => <HomePostCard key={post.id} post={post} />)
      )}
    </Stack>
  )
}
