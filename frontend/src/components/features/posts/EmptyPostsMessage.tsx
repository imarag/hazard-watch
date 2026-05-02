import { Box, Typography, Button } from '@mui/material'
import { Link } from 'react-router'

interface EmptyPostsMessageProps {
  searchParam?: string
}

export default function EmptyPostsMessage({
  searchParam,
}: EmptyPostsMessageProps) {
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
          {searchParam ? `No posts found for ${searchParam}` : 'No posts found'}
        </Typography>
        <Typography variant='body2' color='text.disabled' align='center'>
          Try adjusting your search or create a new report.
        </Typography>
        <Button
          component={Link}
          to='/posts/create'
          size='small'
          variant='outlined'
          sx={{ mt: 1 }}
        >
          Create Report
        </Button>
      </Box>
    </Box>
  )
}
