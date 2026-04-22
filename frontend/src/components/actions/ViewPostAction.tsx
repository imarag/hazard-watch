import { Button } from '@mui/material'
import { Link } from 'react-router'
import VisibilityIcon from '@mui/icons-material/Visibility'

interface ViewPostActionProps {
  postId: string
}

export default function ViewPostAction({ postId }: ViewPostActionProps) {
  return (
    <Button
      component={Link}
      to={`/posts/${postId}`}
      size='small'
      variant='outlined'
      startIcon={<VisibilityIcon fontSize='small' />}
      sx={{
        color: 'text.secondary',
      }}
    >
      View
    </Button>
  )
}
