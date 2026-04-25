import { Box, Typography, Button } from '@mui/material'
import { Link } from 'react-router'

export default function EmptyPostsMessage() {
  return (
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
  )
}
