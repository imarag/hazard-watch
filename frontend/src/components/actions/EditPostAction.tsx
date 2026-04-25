import { Button } from '@mui/material'
import { Link } from 'react-router'
import EditIcon from '@mui/icons-material/Edit'
import { appRoutes } from '@/constants/routes'

interface EditPostActionProps {
  postId: string
}

export default function EditPostAction({ postId }: EditPostActionProps) {
  return (
    <Button
      component={Link}
      to={appRoutes.editPost.path.replace(':id', postId)}
      startIcon={<EditIcon />}
      size='small'
      variant='outlined'
      color='secondary'
    >
      Edit post
    </Button>
  )
}
