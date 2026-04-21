import { Stack, Box, Typography, Button } from '@mui/material'
import { Link } from 'react-router'
import type { Post } from '@/types/posts'
import UserPost from './UserPost'
import postsService from '@/services/posts'
import { useNavigate } from 'react-router'

interface PostsListProps {
  posts: Post[]
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>
}

export default function PostsList({ posts, setPosts }: PostsListProps) {
  const navigate = useNavigate()

  async function handleDeletePost(id: string) {
    await postsService.deletePost(id)
    setPosts((prev) => prev.filter((post) => post.id !== id))
    navigate('/')
  }

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
        <UserPost onDelete={handleDeletePost} key={post.id} post={post} />
      ))}
    </Stack>
  )
}
