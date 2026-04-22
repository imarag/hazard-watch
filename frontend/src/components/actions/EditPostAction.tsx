import { Button } from '@mui/material'
import { Link } from 'react-router'
import EditIcon from '@mui/icons-material/Edit'

interface EditPostActionProps {
  postId: string
}

export default function EditPostAction({ postId }: EditPostActionProps) {
  return (
    <Button
      component={Link}
      to={`/posts/${postId}/edit`}
      startIcon={<EditIcon />}
      size='small'
      variant='outlined'
    >
      Edit post
    </Button>
  )
}
