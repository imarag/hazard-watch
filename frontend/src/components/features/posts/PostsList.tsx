import { Stack, Box, Typography, Button } from '@mui/material'
import { Link } from 'react-router'
import type { Post } from '@/types/posts'
import UserPost from './UserPost'

interface PostsListProps {
  posts: Post[]
}

export default function PostsList({ posts }: PostsListProps) {
  return (
    <Stack direction='column' spacing={2} sx={{ height: '100%' }}>
      {posts.length === 0 && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <Typography variant='h6' color='text.secondary' align='center'>
              No posts yet
            </Typography>
            <Typography variant='body2' color='text.secondary' align='center'>
              Create your first post to get started.
            </Typography>
            <Button
              component={Link}
              to='/posts/create'
              size='small'
              variant='outlined'
              sx={{ marginTop: 1 }}
            >
              Create Post
            </Button>
          </Box>
        </Box>
      )}
      {posts.map((post) => (
        <UserPost key={post.id} post={post} />
      ))}
    </Stack>
  )
}
